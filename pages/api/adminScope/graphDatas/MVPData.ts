import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import { productMVP } from '../../../../src-back/admin-graphs/controllers'

const MVPData: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {type} = req.query
        const products: any = await prisma.product.findMany({
            include:{
                evaluation: true
            }
        })
        const fav: any = await productMVP(products, type)
        return res.status(200).json(fav)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export default MVPData