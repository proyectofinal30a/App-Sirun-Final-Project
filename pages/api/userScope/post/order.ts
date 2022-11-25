
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import { IbodoyPreferenceLink } from '../../../../lib/types'
export default async function Order(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { purchase_link, order }: IbodoyPreferenceLink = req.body
        const myTotal = order.items.map(elem => elem.subTotal).reduce((e, acc) => e + acc)
        const idProduct = order.items.map(elem => {
            return { id: elem.id }
        })
        const myItems = order.items.map(product => {
            return {
                id: product.id,
                title: product.title,
                picture_url: product.picture_url,
                unit_price: product.unit_price,
                quantity: product.quantity
            }
        })

        await prisma.order.create({
            data: {
                id: order.external_reference,
                purchase_link,
                total: myTotal,
                status: "pending",
                delivery_time: 'falta ver esto',
                purchasedProducts: {
                    createMany: {
                        data: myItems
                    }
                },
                addressOrder: {
                    connectOrCreate: {
                        where: {
                            idAdressDB: order.payer.address.id
                        },
                        create: {
                            id: order.payer.address.id,
                            zip_code: Number(order.payer.address.zip_code),
                            street_name: order.payer.address.street_name,
                            street_number: Number(order.payer.address.street_number),
                            phone: {
                                create: {
                                    number: Number(order.payer.phone.number),
                                    area_code: Number(order.payer.phone.area_code)
                                }
                            },
                        }
                    }
                },

                user: {
                    connect: {
                        email: order.payer.email
                    }
                },
                product: {
                    connect: idProduct
                }

            }
        })
        const myAdress = await prisma.address.findFirst({
            where: {
                id: order.payer.address.id
            },
            select: {
                id: true
            }
        })

        if (!myAdress) {
            await prisma.user.update({
                where: {
                    email: order.payer.email
                },
                data: {
                    addresses: {
                        create: {
                            id: order.payer.address.id,
                            zip_code: Number(order.payer.address.zip_code),
                            street_name: order.payer.address.street_name,
                            street_number: Number(order.payer.address.street_number),
                            phone: {
                                create: {
                                    number: Number(order.payer.phone.number),
                                    area_code: Number(order.payer.phone.area_code)
                                }
                            },

                        }
                    }
                }
            })
        }

        console.log('vamos!!');

        res.status(200).json({ msg: "se logro Subir Order a la base de datos" })
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "no se pudo subir Order" })

    }
}








