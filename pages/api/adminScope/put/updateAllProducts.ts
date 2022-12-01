// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 


// updatea la visibilidad del producto desde el dashboard del admin.
const updateProducts: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const arrProducts = req.body
    console.log(arrProducts, "productos llegando a la api") 
    
    try {
        
        const productsUpdates = arrProducts.obj.forEach(async (p: any) => {  
            await prisma.product.update({
                where: { 
                    id: p.id 
                },
                data: {
                    available: p.available
                }
            })
        })
    
        
        console.log(productsUpdates, "productos actualizados hacia el front") // con forEach da undefined  y con map da un array de promesas
        prisma.$disconnect()
        res.status(200).json({ msg: "Productos actualizados" })
       
    
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: "Error al actualizar los productos"
        })
    }
}


export default updateProducts


