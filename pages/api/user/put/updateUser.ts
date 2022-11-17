import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 
const updateUser: any = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email } = req.body
  //permitir cambiar pw con auth0
  try {
    const user: any = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      }
    })

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ msg: "Error al actualizar User" })
  }
}

export default updateUser



