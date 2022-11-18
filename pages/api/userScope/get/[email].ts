import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
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
                            image: true,

                        }
                    },
                    orders: true,
                    evaluations: true,
                    direcciones: true
                },
            })

            res.status(200).json(myUser)
        }

    } catch (error) {
        res.status(404).json({ msg: "usuario no encontrado" })
    }

}
