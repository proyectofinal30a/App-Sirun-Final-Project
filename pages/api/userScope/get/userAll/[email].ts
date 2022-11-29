import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'
export default async function findUser(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query
    try {

        if (typeof email === 'string') {
            const myUser = await prisma.user.findFirst({
                where: {
                    email,
                },
                select: {
                    name: true,
                    email: true,
                    image: true,
                    id: true,
                    favorites: {
                        select: {
                            id: true,
                            name: true,
                            image: {
                                select: {
                                    image: true
                                }
                            },

                        }
                    },
                    orders: {
                        select: {
                            status: true,
                            idPurchase: true,
                            id: true,
                            purchase_link: true,
                            addressOrder: {
                                select: {
                                    id: true,
                                    zip_code: true,
                                    street_name: true,
                                    street_number: true,
                                    phone: {
                                        select: {
                                            number: true,
                                            area_code: true,
                                        }
                                    }
                                }
                            },
                            purchasedProducts: {
                                select: {
                                    id: true,
                                    title: true,
                                    unit_price: true,
                                    picture_url: true,
                                    quantity: true,
                                }
                            },
                            date: true,
                            total: true

                        }
                    },
                    evaluations: {
                        select: {
                            id: true,
                            product: {
                                select: {
                                    id: true,
                                    image: {
                                        select: {
                                            image: true
                                        }
                                    },
                                    name: true
                                }

                            },
                            review: true,
                            rating: true
                        }
                    },
                    addresses: {
                        select: {
                            id: true,
                            zip_code: true,
                            name_address: true,
                            street_name: true,
                            street_number: true,
                            phone: {
                                select: {
                                    number: true,
                                    area_code: true,
                                }
                            }
                        }
                    }
                },
            })

            res.status(200).json(myUser)
        }

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: `usuario no encontrado ${email}` })
    }

}
