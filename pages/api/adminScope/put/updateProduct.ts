// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { Iproduct } from '../../../../lib/types'

// en desarrollo
const updateProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    //Category Pro se importa desde el schema de tablas, esta definido
    const { id, price, description, image } = req.body
    try {      
        console.log(image, "imagenes que llegan al back")
        
   
         const productUpdated = await prisma.product.update({
            where: { 
                id: id
             },
            data: {
                price: price,
                description : description,
                // image: {
                //     update: {
                //         where: { 
                //             id: id
                //          },
                //         data: {
                //             image : image.image
                //         }
                //     }
                // }
            }
        })
    
        prisma.$disconnect()
        console.log(productUpdated, "producto actualizado")
        
        return res.status(200).json(productUpdated)  
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `Error al actualizar el producto con id: ${id}` })
    }
}


export default updateProduct


