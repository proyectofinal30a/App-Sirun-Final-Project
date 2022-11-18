import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 

export default async function UpdateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface email {
            email: string
            name: string
            image: string
        }
        const { email, name, image }: email = req.body

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                name,
                image,
            },
        })

        res.status(200).json({ msg: 'el usuario se ha actulizado correctamente' })

    } catch (error) {
        res.status(404).json({ msg: "no se ha podido actulializar el usuario" })
    }

}



