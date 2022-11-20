import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary'
export default async function deleteImageCloudinaryUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { packImage } = req.body
        const file: any = 'user-image/'
        const id_public: string = file + packImage
        await cloudinary.uploader.destroy(id_public)
        res.status(200).json({ msg: 'la imagen se borro corectamente' })
    } catch (error) {
        res.status(404).json({ msg: "no se pudo borrar" })
    }
}



