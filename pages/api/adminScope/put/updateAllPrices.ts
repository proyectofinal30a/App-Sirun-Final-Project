//Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 


// updatea la visibilidad del producto desde el dashboard del admin.
const updatePrices: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { quantity, direction, type } = req.body.object
        console.log(quantity, direction, type)
        const allProducts = await prisma.product.findMany()
        allProducts.forEach(async (p) => {
            const price = Number(p.price)
            
            if(type === "fixed" && direction === 'increase'){
            let newPrice = Math.round(price +  Number(quantity))
            await prisma.product.update({
                where: { id: p.id },
                data: {
                    price: newPrice
                }
            })
      
            }else if(type === "fixed" && direction === 'decrease' && price > Number(quantity)){
                let newPrice = Math.round(price - Number(quantity))
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        price: newPrice
                    }
                })
          
            } else if (type === "percent" && direction === 'increase') {
                let newPrice = Math.round(price + (price * Number(quantity) / 100))
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        price: newPrice
                    }
                })
             
            } else if (type === "percent" && direction === 'decrease' && price > Number(quantity)) {
                let newPrice = Math.round(price - (price * Number(quantity) / 100))
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        price: newPrice
                    }
        }) 
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





