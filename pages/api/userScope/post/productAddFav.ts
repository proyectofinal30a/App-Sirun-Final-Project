import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";


export default async function productAddFav(req: NextApiRequest, res: NextApiResponse) {
  try {
    interface IidUserIdPro {
      idUser: string;
      favorites: any;
    }
    //{ idUser, [{},{},{}]}
    const { idUser, favorites }: IidUserIdPro = req.body;

    await prisma.user.update({
      where: { id: idUser },
      data: {
        favorites: { set: favorites }
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
