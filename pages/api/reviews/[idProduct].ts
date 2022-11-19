import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
export default async function getAllReviews(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { idProduct } = req.query
        if (typeof idProduct === 'string') {
            const allReviews = await prisma.product.findFirst({
                where: {
                    id: idProduct
                },
                select: {
                    evaluation: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    image: true
                                }
                            },
                            rating: true,
                            review: true,
                            id: true
                        }
                    }
                },
            })
            prisma.$disconnect()
            res.status(200).json(allReviews)
        }

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: "no se ha encontrado el Producto" })
    }

}
