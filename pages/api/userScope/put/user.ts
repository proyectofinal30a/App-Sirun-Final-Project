import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary'
import cloudinaryOrUrl from '../../../../src-client/controllers/detectionOfImage'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 
export default async function UpdateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface IuserUpdate {
            email: string
            name: string
            image: string
            deleteImage: string
        }
        const { email, name, image, deleteImage }: IuserUpdate = req.body
        const packImage = cloudinaryOrUrl(deleteImage, 'server')
        if (packImage) {
            const file: any = 'user_profile/'
            const id_public: string = file + packImage
            await cloudinary.uploader.destroy(id_public)
        }

        console.log('dasdadasdasdadadadadadadasdadas');

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                name,
                image,
            },
        })
        prisma.$disconnect()
        res.status(200).json({ msg: 'el usuario se ha actulizado correctamente' })

    } catch (error) {
        res.status(404).json({ msg: "no se ha podido actulializar el usuario" })
    }

}



