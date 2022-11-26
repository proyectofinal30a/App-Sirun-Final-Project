import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
export default async function deleteAddress(req: NextApiRequest, res: NextApiResponse) {
    try {
        interface body { id: string }
        const { id }: body = req.body

        await prisma.phone.delete({
            where: {
                id_address: id
            }
        })

        await prisma.address.delete({
            where: {
                id
            }
        })

        res.status(200).json({ msg: 'address has been removed successfully' })
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "address could not be removed" })
    }

}