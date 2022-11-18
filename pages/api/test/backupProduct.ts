// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'  //importo prisma del lib del root 
const siembraDatos: any = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const product: object = await prisma.product.findMany({
      select: {
        name: true,
        image: true,
        price: true,
        dimension: true,
        category: true,
        type: true,
        description: true,
        available: true
      }
    })

    res.status(200).json(product)
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error al obtener Users" })
  }
}

export default siembraDatos