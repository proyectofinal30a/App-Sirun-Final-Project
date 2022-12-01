import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";


export default async function productAddFav(req: NextApiRequest, res: NextApiResponse) {
  try {
    interface IidUserIdPro {
      email: string;
      mypackIdFavo: { id: string }[] | []
    }

    const { email, mypackIdFavo }: IidUserIdPro = req.body;
    const myCheck = mypackIdFavo ? mypackIdFavo : [];
    if (!email || !mypackIdFavo) return res.status(200).json({})
    await prisma.user.update({
      where: { email },
      data: {
        favorites: { set: myCheck }
      }
    },
    );
    prisma.$disconnect()
    res.status(200).json({ msg: "El producto se ha agregado correctamente a favoritos" });
  } catch (error) {
    console.log(error)
    res.status(404).json({ msg: "No se pudo vincular el producto a favoritos" });
  }
}
