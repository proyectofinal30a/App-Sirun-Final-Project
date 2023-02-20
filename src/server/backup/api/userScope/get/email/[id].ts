import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
export default async function findReference(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query?.id ? req.query.id : ''
    if (typeof id !== 'string' || id === '') return res.status(200).json({ msg: "id order should be a string" })
    const myStatus = await prisma.order.findFirst({
      where: {
        id
      },
      select: {
        status: true
      }
    })

    return myStatus?.status === 'confirmed' ?
      res.status(200).json({ status: false }) :
      res.status(200).json({ status: true })


  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "could not set or lookup order id" });
  }
}
