import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
export default async function reviewRating(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface IreRA {
            idReview: string

        }
        const { idReview } = req.query

        if (typeof idReview !== 'string') return
        await prisma.evaluation.delete({
            where: {
                id: idReview
            }
        })

        res.status(200).json({ msg: 'la review  se ha  eliminado correctamente' })
    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: "usuario no encontrado" })
    }

}