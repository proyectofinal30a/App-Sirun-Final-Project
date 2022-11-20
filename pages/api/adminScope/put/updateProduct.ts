// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { Iproduct } from '../../../../lib/types'

// en desarrollo
const updateProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, name, price, dimension, type, image, category, description } = req.body
    const categoryy: CategoryPro = category //Category Pro se importa desde el schema de tablas, esta definido
    try {
        const product: Iproduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: name,
                price: price,
                dimension: dimension,
                type: type,
                category: categoryy,
                image: image,
                description: description,
            }
        })
        prisma.$disconnect()
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({ msg: `Error al actualizar el producto con id: ${id}` })
    }
}


export default updateProduct


