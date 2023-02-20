import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'
export default async function userFavorite(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.query
        if (typeof email === 'string') {
            const userFavorite = await prisma.user.findFirst({
                where: { email },
                select: {
                    favorites: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            const mydataFavorite = userFavorite?.favorites.map(e => e.id)
            return res.status(200).json(mydataFavorite)
        }
        res.status(200).json([])
    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: `error when searching favorites ` })
    }

}
