// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  



const updateProducts: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const arrProducts = req.body
   
    try {
        const productsUpdates = arrProducts.obj.forEach(async (p: any) => {
            await prisma.product.update({
                where: { id: p.id },
                data: {
                    available: p.available
                }
            })
        })
        prisma.$disconnect()
        res.status(200).json(productsUpdates)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: "Error al actualizar los productos"
        })
    }
}


export default updateProducts


