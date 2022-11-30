import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'
import axios from 'axios'
import * as nodemailer from 'nodemailer'
import CreationOfHTML from '../../../../../src-client/controllers/email-Order-html'
export default async function requestStatusOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface body {
            email: string
            idReference: string
            name: string
        }
        interface responseMP { data: { results: [{ status: string, id: string }] } }
        const { email, idReference, name }: body = req.body


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.API_KEY_EMAIL
            }
        });


        const requestOrder: responseMP = await axios({
            method: 'get',
            url: `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${idReference}`,
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })
        if (requestOrder.data?.results?.[0]?.status !== 'approved') return res.status(200).json({ msg: "hasn't paid yet" })


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
                        date: true,
                        delivery_time: true,
                        total: true,
                    }
                }
            }
        })

        const statusConfirmation = await prisma.order.findFirst({
            where: { id: idReference },
            select: { status: true }
        });

        if (statusConfirmation?.status === "confirmed") return res.status(200).json({ msg: "Order is already confirmed" });

        const myHtml = CreationOfHTML(responseforEmail, email, name, requestOrder.data?.results?.[0]?.id)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Sirun Pâtisserie - Order ${requestOrder.data?.results?.[0]?.id}`,
            html: myHtml
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json({ msg: info.response })
                console.log('Email sent: ' + info.response);
            }
        });

        await prisma.order.update({
            where: {
                id: idReference
            },
            data: {
                idPurchase: String(requestOrder.data.results[0].id),
                status: "confirmed"
            }
        })


    } catch (error) {
        console.log(error);
        res.status(200).json({ msg: error.message || error})
    }

}
