// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 


// updatea la visibilidad del producto desde el dashboard del admin.
const updatePrices: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const { percentage } = req.body.percent     
    try {
        await prisma.product.updateMany({
            data: {
                price: {
                    multiply: Math.round(1 * percentage)
                }
            }
        })
        prisma.$disconnect()
        res.status(200).json({ msg: "ha sido todo actualizado" })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: "Error al actualizar los productos"
        })
    }
}

export default updatePrices







