// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { Iproduct } from '../../../../lib/types'

// en desarrollo
const updateProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, price, description, image } = req.body

    //Category Pro se importa desde el schema de tablas, esta definido
    try {
 
        
        const product = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                price: Number(price),
                description: description,
                image : image.image 
                // image: {
                //     create: {
                //         image: image.image

                //     }
                // }

            }
        })
        prisma.$disconnect()
        return res.status(200).json(product)  
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `Error al actualizar el producto con id: ${id}` })
    }
}


export default updateProduct


