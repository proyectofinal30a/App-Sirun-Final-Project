//Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 


// updatea la visibilidad del producto desde el dashboard del admin.
const updatePrices: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const { percent } = req.body
    const percent2 = percent / 100


    try {
        const allProducts = await prisma.product.findMany()
        allProducts.forEach(async (p) => {
            const price = Number(p.price)
            let newPrice = Math.round(price + (price * percent2))

            await prisma.product.update({
                where: { id: p.id },
                data: {
                    price: newPrice
                }
            })
            prisma.$disconnect()
            res.status(200).json({ msg: "ha sido todo actualizado" })
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: "Error al actualizar los productos"
        })
    }
}

export default updatePrices





