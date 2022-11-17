import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { unstable_getServerSession } from "next-auth/next"
import userVerification from '../../../../src-client/controllers/userVerification-controller'
import { authOptions } from '../../auth/[...nextauth]'
const createProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session: any = await unstable_getServerSession(req, res, authOptions)
        const myToken = await userVerification('server', session)
        const authorization: any = req.headers.authorization
        if (myToken === authorization) {

            const N = Number
            const { name, price, available, dimension, type, image, category, description } = req.body
            const myPriceNumber = N(price)
            const myDimension = N(dimension)
            const typeDiet: TypeDiet = type
            const typeCategory: CategoryPro = category
            await prisma.product.create({
                data: {
                    name,
                    price: myPriceNumber,
                    dimension: myDimension,
                    type: typeDiet,
                    category: typeCategory,
                    image: JSON.stringify(image),
                    description,
                    evaluation: { create: [] },
                    available

                }
            })
            return res.status(200).json({ msg: `Se creo el producto con nombre: ${name}` })
        }
        res.status(200).json({ msg: 'NO ESTAs AUTORIZADO' })
    } catch (error) {
        res.status(404).json({ msg: `se ha producido un error` })
    }
}

export default createProduct