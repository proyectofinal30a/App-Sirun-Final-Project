import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { unstable_getServerSession } from "next-auth/next"

const createProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const N = Number
        const myPRod: any = req.body
        myPRod.forEach(async (element: any) => {
            const { name, price, available, dimension, image, type, category, description } = element
            const myPriceNumber = N(price)
            const myDimension = N(dimension)
            const typeDiet: TypeDiet = type
            const typeCategory: CategoryPro = category
            await prisma.product.create({
                data: {
                    name,
                    price: myPriceNumber,
                    available,
                    type: typeDiet,
                    description,
                    dimension: myDimension,
                    category: typeCategory,
                    image: {
                        create: image
                    },
                    evaluation: {
                        create: []
                    }
                },

            })
            prisma.$disconnect()
        });

        return res.status(200).json({ msg: `Se creo el producto con nombre:` })

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: `se ha producido un error` })
    }
}

export default createProduct