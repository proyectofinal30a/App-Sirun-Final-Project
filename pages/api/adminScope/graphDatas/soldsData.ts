import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import { MSProducts } from '../../../../src-back/admin-graphs/controllers'

const soldsData: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const products: any = await prisma.product.findMany({
            include:{
                order: true
            }
        })
        const ahoraChi = await MSProducts(products)
        return res.status(200).json(ahoraChi)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export default soldsData