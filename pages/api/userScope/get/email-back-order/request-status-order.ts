import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'
import axios from 'axios'
import * as nodemailer from 'nodemailer'
export default async function requestStatusOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface body {
            email: string
            idReferenceArray: string[]
        }
        interface responseMP { data: { results: [{ status: string }] } }
        const { email, idReferenceArray }: body = req.body


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.API_KEY_EMAIL
            }
        });

        idReferenceArray.forEach(async (idReference) => {
            const requestOrder: responseMP = await axios({
                method: 'get',
                url: `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${idReference}`,
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
                }
            })
            if (requestOrder.data?.results?.[0]?.status !== 'approved') return res.status(200).json({ msg: "hasn't paid yet" })

            await prisma.order.update({
                where: {
                    id: idReference
                },
                data: {
                    status: "confirmed"
                }
            })

            const responseforEmail = await prisma.user.findFirst({
                where: { email },
                select: {
                    orders: {
                        where: {
                            id: idReference
                        },
                        select: {
                            addressOrder: {
                                select: {
                                    zip_code: true,
                                    street_name: true,
                                    street_number: true,
                                    phone: {
                                        select: {
                                            number: true,
                                            area_code: true
                                        }
                                    }
                                }
                            },
                            purchasedProducts: {
                                select: {
                                    title: true,
                                    unit_price: true,
                                    picture_url: true,
                                    quantity: true,

                                }
                            },
                            status: true,
                            delivery_time: true,
                            total: true,
                        }
                    }
                }
            })


            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'A ver si anda',
                html: ` <h1>${responseforEmail?.orders[0].status}</h1>`

            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        })


    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: `Error al buscar OrderEmail` })
    }

}
