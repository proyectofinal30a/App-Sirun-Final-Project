// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'  //importo prisma del lib del root 

const users: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  const {id} = req.body
  try {
    const user: any = await prisma.account.findFirst({
      where:{
        id,
      }
    })    
    const listUsers: any = await axios.get('https://sirunnpatisserie.us.auth0.com/api/v2/users',
    {
      headers:{
        "Content-Type": "application/json",
      authorize: `Bearer ${user.access_token}`
      }
    })

    res.status(200).json(listUsers)
  } catch (error) {
    res.status(404).json(error)
  }
}

export default users;



