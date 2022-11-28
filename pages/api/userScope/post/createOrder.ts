import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { nanoid } from 'nanoid'
import { prisma } from '../../../../lib/prisma'
import { Ipreference } from '../../../../lib/types'
export default async function CreateOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        const idAddress = nanoid()
        const idOrder = nanoid()
        const myPreference: Ipreference = req.body
        const myTotal = myPreference.items.map(elem => elem.subTotal).reduce((e, acc) => e + acc)
        const idProduct = myPreference.items.map(elem => {
            return { id: elem.id }
        })


        const myItems = await myPreference.items.map(product => {
            return {
                id: product.id,
                title: product.title,
                picture_url: product.picture_url,
                unit_price: product.unit_price,
                quantity: product.quantity
            }
        })


        if (!myPreference.payer.address.id) {
            await prisma.user.update({
                where: {
                    email: myPreference.payer.email
                },
                data: {
                    addresses: {
                        create: {
                            name_address: myPreference.payer.address.name_address,
                            id: idAddress,
                            zip_code: Number(myPreference.payer.address.zip_code),
                            street_name: myPreference.payer.address.street_name,
                            street_number: Number(myPreference.payer.address.street_number),
                            phone: {
                                create: {
                                    number: Number(myPreference.payer.phone.number),
                                    area_code: Number(myPreference.payer.phone.area_code)
                                }
                            },

                        }
                    }
                },

            })

            const OrderUser = await prisma.order.create({
                data: {
                    id: idOrder,
                    total: myTotal,
                    status: "pending",
                    delivery_time: 'falta ver esto',
                    purchase_link: "",
                    purchasedProducts: {
                        createMany: {
                            data: myItems
                        }
                    },
                    addressOrder: {
                        connectOrCreate: {
                            where: {
                                id: `@${idAddress}@`
                            },
                            create: {
                                id: `@${idAddress}@`,
                                zip_code: Number(myPreference.payer.address.zip_code),
                                street_name: myPreference.payer.address.street_name,
                                street_number: Number(myPreference.payer.address.street_number),
                                phone: {
                                    create: {
                                        number: Number(myPreference.payer.phone.number),
                                        area_code: Number(myPreference.payer.phone.area_code)
                                    }
                                },
                            }
                        }
                    },

                    user: {
                        connect: {
                            email: myPreference.payer.email
                        }
                    },
                    product: {
                        connect: idProduct
                    }

                }
            })

            const preferenceAddReference = await { ...myPreference, external_reference: OrderUser.id }

            const response = await axios({
                method: 'post',
                url: 'https://api.mercadopago.com/checkout/preferences',
                data: preferenceAddReference,
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
                }
            })

            await prisma.order.update({
                where: {
                    id: idOrder
                },
                data: {
                    purchase_link: response.data.init_point
                }
            })
            return res.status(200).json({ url: response.data.init_point })
        }



        const OrderUser = await prisma.order.create({
            data: {
                id: idOrder,
                total: myTotal,
                status: "pending",
                delivery_time: 'falta ver esto',
                purchase_link: "",
                purchasedProducts: {
                    createMany: {
                        data: myItems
                    }
                },
                addressOrder: {
                    connectOrCreate: {
                        where: {
                            id: `@${myPreference.payer.address.id}@`
                        },
                        create: {
                            id: `@${myPreference.payer.address.id}@`,
                            zip_code: Number(myPreference.payer.address.zip_code),
                            street_name: myPreference.payer.address.street_name,
                            street_number: Number(myPreference.payer.address.street_number),
                            phone: {
                                create: {
                                    number: Number(myPreference.payer.phone.number),
                                    area_code: Number(myPreference.payer.phone.area_code)
                                }
                            },
                        }
                    }
                },

                user: {
                    connect: {
                        email: myPreference.payer.email
                    }
                },
                product: {
                    connect: idProduct
                }

            }
        })

        const preferenceAddReference = await { ...myPreference, external_reference: OrderUser.id }

        const response = await axios({
            method: 'post',
            url: 'https://api.mercadopago.com/checkout/preferences',
            data: preferenceAddReference,
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })

        await prisma.order.update({
            where: {
                id: idOrder
            },
            data: {
                purchase_link: response.data.init_point
            }
        })


        return res.status(200).json({ url: response.data.init_point })
    } catch (error) {
        console.log(error);

        res.status(400).json({ msg: 'Error formProduct' })

    }


}






























