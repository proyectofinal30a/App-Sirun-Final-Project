import type { NextApiRequest, NextApiResponse } from 'next'
import { getCsrfToken } from 'next-auth/react'
import hash from '../../../src-client/controllers/hash'
const siembraDatos: any = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const mySession = await getCsrfToken()
        const { authorization } = req.headers
        res.json({ toke: req.headers })
    } catch (error) {
        res.status(404).json({ msg: "Error al obtener Users" })
    }
}

export default siembraDatos