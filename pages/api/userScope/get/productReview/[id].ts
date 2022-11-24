import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'
export default async function findUser(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id } = req.query

        if (typeof id === 'string' && id !== 'undefined') {
            const myProductReview = await prisma.product.findFirst({
                where: {
                    id
                },
                select: {
                    evaluation: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    name: true,
                                    image: true,
                                }
                            },
                            review: true,
                            rating: true,
                        }
                    }
                }
            })



            res.status(200).json(myProductReview?.evaluation)
        }

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: `Error al buscar review ` })
    }

}
