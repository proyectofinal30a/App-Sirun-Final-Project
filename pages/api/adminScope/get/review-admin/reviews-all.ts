// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";


export default async function reviewsAdm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reviewsAll = await prisma.evaluation.findMany({
      select: {
        product: {
          select: {
            id: true,
            name: true,
            image: {
              select: {
                image: true
              },
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          }
        },
        rating: true,
        id: true,
        review: true
      },

    });
    prisma.$disconnect();
    res.status(200).json(reviewsAll);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener reviewsAdm" });
  }
};


