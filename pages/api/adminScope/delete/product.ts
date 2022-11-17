// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet } from '@prisma/client'
import { Iproduct } from '../../../../lib/types'

const deleteProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    // const { id } = req.body

    // try {
    //     const product: any = await prisma.product.delete({
    //         where: { id: id }
    //     })
    //     res.status(200).json(product)
    // } catch (error) {
    //     res.status(404).json({ msg: `Se creo el producto con nombre: ${name}` })
    // }
}

export default deleteProduct