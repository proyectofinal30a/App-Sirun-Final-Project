import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { unstable_getServerSession } from "next-auth/next"

const createProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const myCheck = await prisma.product.findMany({
            include: {
                image: {
                    select: {
                        image: true
                    }
                }
            }
        })


        return res.status(200).json(myCheck)

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: `se ha producido un error` })
    }
}

export default createProduct