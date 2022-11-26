import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'


const updateUser: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id, role} = req.body

    
try {
    const user: any = await prisma.user.update({
        where:{
            id,
        },
        data:{
            role,
        }
    })
    return res.status(200).json(user)
} catch (error) {
    return res.status(400).json(error.message)
}
}
export default updateUser