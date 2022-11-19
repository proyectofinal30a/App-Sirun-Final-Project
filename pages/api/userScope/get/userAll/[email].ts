import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
export default async function findUser(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { email } = req.query
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
                            total: true,
                            description: true,
                            delivery_time: true,
                            date: true,
                            status: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: {
                                        select: {
                                            image: true
                                        }
                                    },

                                }
                            }
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
                    direcciones: true
                },
            })

            res.status(200).json(myUser)
        }

    } catch (error) {
        res.status(404).json({ msg: "usuario no encontrado" })
    }

}
