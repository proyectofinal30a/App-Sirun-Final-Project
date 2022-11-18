import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
export default async function reviewRating(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface IreRA {
            idUser: string
            idReview: string
            idProduct: string
        }
        const { idReview, idProduct, idUser }: IreRA = req.body
        await prisma.product.update({
            where: {
                id: idProduct
            },
            data: {
                evaluation: {
                    disconnect: {
                        id: idReview
                    }
                }
            }

        })
        await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                evaluations: {
                    disconnect: {
                        id: idReview
                    }
                }
            }

        })
        await prisma.evaluation.delete({
            where: {
                id: idReview
            }
        })

        res.status(200).json({ msg: 'la review  se ha  eliminado correctamente' })
    } catch (error) {
        res.status(404).json({ msg: "usuario no encontrado" })
    }

}