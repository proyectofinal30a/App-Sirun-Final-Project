import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma';
import { orderToSales } from '../../../../src-back/admin-graphs/controllers';

const salesGraph: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const orders: any = await prisma.order.findMany()

        
        const order = await orderToSales(orders)

        
        return res.status(200).json(order)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

export default salesGraph

