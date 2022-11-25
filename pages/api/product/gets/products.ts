import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]'
import userVerification from '../../../../src-client/controllers/userVerification-controller'
const products: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session: any = await unstable_getServerSession(req, res, authOptions)
    const myToken = await userVerification('server', session)
    const authorization = req.headers?.authorization
    if (myToken === authorization) {
      const products = await prisma.product.findMany({
        include: {
          image: {
            select: {
              image: true
            }
          }
        }

      });
      prisma.$disconnect()
      return res.status(200).json(products)
    }
    res.status(200).json({ msj: 'NO ESTAS AUTORIZADO_ ruta api' })
  } catch (error) {
    console.log(error)
    res.status(404).json({ msg: "Error al obtener Products" })
  }
}


export default products;



