import { v2 as cloudinary } from 'cloudinary'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import userVerification from '../../../../../src-client/controllers/userVerification-controller'
import { authOptions } from '../../../auth/[...nextauth]'
const deleteImage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session: any = await unstable_getServerSession(req, res, authOptions)
        const myToken = await userVerification('server', session)
        const authorization: any = req.headers.authorization
        if (myToken === authorization) {
            const file: any = process.env.NAME_FILE_CLOUDINARY
            const { id } = req.query
            const id_public: string = file + id
            const response = await cloudinary.uploader.destroy(id_public)
            return res.status(200).json(response)
        }
        res.status(200).json({ msj: 'NO ESTAS AUTORIZADO' })
    } catch (error) {
        return res.status(404).json({ error: 'error en el la ruta admimgPrev' })
    }
}
export default deleteImage