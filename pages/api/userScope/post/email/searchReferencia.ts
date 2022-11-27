import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';
import axios from 'axios';

export default async function findReference(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface body {
            email: string
            idReference: string
        }
        interface responseMP {
            data: {
                results: [
                    { status: string }
                ]
            }
        }
        const { email, idReference }: body = req.body

        const requestOrder: responseMP = await axios({
            method: 'get',
            url: `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${idReference}`,
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })


        if (requestOrder.data?.results?.[0]?.status !== 'approved') return res.status(404).json({ msg: "No estas en la lista de Mercado Pago" })

        await prisma.order.update({
            where: { id: idReference },
            data: { status: "confirmed" }
        })

        const responseforEmail = await prisma.user.findFirst({
            where: { email },
            select: {
                orders: {
                    where: { id: idReference },
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
        res.status(200).json(responseforEmail)
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Error al buscar OrderEmail" })
    }

}
