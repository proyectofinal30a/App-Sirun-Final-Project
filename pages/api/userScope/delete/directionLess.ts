import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
export default async function reviewRating(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface IreRA {
            idUser: string
            idDirection: string
        }
        const { idUser, idDirection }: IreRA = req.body
        await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                direcciones: {
                    disconnect: {
                        id: idDirection
                    }
                }


            },
        })

        await prisma.direccion.delete({
            where: {
                id: idDirection
            }
        })
        res.status(200).json({ msg: "se ha eliminado la dirreccion correctamente" })
    } catch (error) {
        res.status(404).json({ msg: "no se ha podido eliminar la direccion" })
    }

}
