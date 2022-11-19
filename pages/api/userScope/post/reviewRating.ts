import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
export default async function reviewRating(req: NextApiRequest, res: NextApiResponse) {
    try {

        interface IreRA {
            idUser: string
            dir: string
            review: string
            rating: number
            idProduct: string
        }
        const { idUser, idProduct, review, rating }: IreRA = req.body
        await prisma.evaluation.create({
            data: {
                review,
                rating: Number(rating),
                user: {
                    connect: {
                        email: idUser
                    }
                },
                product: {
                    connect: {
                        id: idProduct
                    }
                }

            },
        })
        prisma.$disconnect()
        res.status(200).json({ msg: "la review se ha cargado correctamente" })
    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: "no de ha podido subir el la review" })
    }

}
