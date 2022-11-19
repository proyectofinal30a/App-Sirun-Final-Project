// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 

const users: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users: object[] = await prisma.user.findMany();
    prisma.$disconnect()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener Users" })
  }
}

export default users;



