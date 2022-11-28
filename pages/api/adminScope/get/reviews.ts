// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"; 


const reviews: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reviews = await prisma.evaluation.findMany();
    prisma.$disconnect();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener reviews" });
  }
};

export default reviews;
