
import type { NextApiRequest, NextApiResponse, } from "next";
import prisma from "../../../../../lib/prisma";
import { Iproduct } from "../../../../../lib/types";


const getproductDetail: Function = async (req: NextApiRequest, res: NextApiResponse) => {

  interface Iid {
    id: string
  }
  try {
    const { id }: any = req.query
    const productDetail: any = await prisma.product.findUnique(
      {
        where: { id },
        include: {
          image: {
            select: {
              image: true
            }
          }
        }

      }
    )
    prisma.$disconnect()
    res.status(200).json(productDetail);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener el producto" });
  }
};




export default getproductDetail;
