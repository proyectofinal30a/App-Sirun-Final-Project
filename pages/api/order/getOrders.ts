// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'  //importo prisma del lib del root 
// import { orderr } from '../../../lib/types';

const orders: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const orders: object[] = await prisma.order.findMany();
        res.status(200).json(orders)
        prisma.$disconnect()
    } catch (error) {
        res.status(404).json({ msg: "Error al obtener las ordenes" })
    }
}

export default orders;



