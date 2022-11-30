// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"; //importo prisma del lib del root


export default async function productLessFav(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, id } = req.body;

    if (typeof email === "string" && typeof id === "string") {
      await prisma.user.update({
        where: { email },
        data: {
          favorites: {
            disconnect: { id },
          },
        },
      });

      res.status(200).json({ msg: "El producto se ha quitado correctamente correctamente de favoritos" });
    }
  } catch (error) {
    res.status(404).json({ msg: "No se pudo desvincular el producto de favoritos" });
  }
}
