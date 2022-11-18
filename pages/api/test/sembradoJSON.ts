import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { unstable_getServerSession } from "next-auth/next"

const createProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const myPRod: any = req.body
        myPRod.forEach(async (element: any) => {
            element.evaluation = { create: [] }
            await prisma.product.create({
                data: element
            })

        });

        return res.status(200).json({ msg: `Se creo el producto con nombre:` })

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: `se ha producido un error` })
    }
}

export default createProduct