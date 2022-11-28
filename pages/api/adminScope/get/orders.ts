// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"; 


const orders: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const orders = await prisma.order.findMany();
    prisma.$disconnect();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener orders" });
  }
};

export default orders;
