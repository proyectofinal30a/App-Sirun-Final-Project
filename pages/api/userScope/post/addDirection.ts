// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
export default async function productAddFav(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface direccion {
            idUser: string
            dir: string
        }

        const { idUser, dir }: direccion = req.body

        await prisma.direccion.create({
            data: {
                dir,
                user: {
                    connect: {
                        id: idUser
                    }
                }
            }
        })

        res.status(200).json({ msg: 'La direccion se ha agregado correctamente' })

        prisma.$disconnect()
    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: "No se ha podido subir la direccion" })
    }

}
