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
            let newPrice = Math.round(price + Number(quantity))
            await prisma.product.update({
                where: { id: p.id },
                data: {
                    price: newPrice
                }
            })
            return res.status(200).json({ msg: `The price was increase by $${quantity}` })

            }else if(type === "fixed" && direction === 'decrease' && price > Number(quantity)){
                let newPrice = Math.round(price - Number(quantity))
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        price: newPrice
                    }
                })
                return res.status(200).json({ msg: `Already applied a disconunt of $${quantity}` })

            }else if(type === "fixed" && direction === 'decrease' && price <= Number(quantity)){
               return res.status(200).json({msg:"You can't decrease the price of the product to a negative number or zero"})

            } else if (type === "percent" && direction === 'increase') {
                let newPrice = Math.round(price + (price * Number(quantity) / 100))
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        price: newPrice
                    }
                })
                return res.status(200).json({ msg: `The increment of ${quantity}% was applied` })
             
            } else if (type === "percent" && direction === 'decrease' && price > Number(quantity)) {
                let newPrice = Math.round(price - (price * Number(quantity) / 100))
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        price: newPrice
                    }
        }) 
            return res.status(200).json({ msg: `The discount of ${quantity}% was applied` })

            }else if (type === "percent" && direction === 'decrease' && price <= Number(quantity)) {
                res.status(200).json({msg:`You can't decrease 100% or more of the price of the product and you choose a discount of ${quantity}%. Please sleect a lower percentage`})
            }
        })
            prisma.$disconnect() 
          // res.status(200).json({ msg: "The prices were updated" })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: "Error updating the prices"
        })
    }
}

export default updatePrices





