import type { NextApiRequest, NextApiResponse } from 'next'
 //importo prisma del lib del root 
import prisma from '../../../../lib/prisma'
import { Iproduct } from '../../../../lib/types'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]'
import userVerification from '../../../../src-client/controllers/userVerification-controller'
const products: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session: any = await unstable_getServerSession(req, res, authOptions)
    const myToken = await userVerification('server', session)
    const authorization = req.headers?.authorization
    if (myToken === authorization) {
      const products: Array<Iproduct> = await prisma.product.findMany();
      return res.status(200).json(products)
    }
    res.status(200).json({ msj: 'NO ESTAS AUTORIZADO' })
  } catch (error) {
     console.log(error)
    res.status(404).json({ msg: "Error al obtener Products" })
  }
}


export default products;



