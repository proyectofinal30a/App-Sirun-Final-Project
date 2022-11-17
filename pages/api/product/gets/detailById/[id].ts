
import type { NextApiRequest, NextApiResponse, } from "next";
import prisma from "../../../../../lib/prisma";
import { Iproduct } from "../../../../../lib/types";


const getproductDetail: Function = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { id }: any = req.query
    const productDetail: Iproduct | null = await prisma.product.findUnique(
      {
        where: { id }
      }
    )
    res.status(200).json(productDetail);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener el producto" });
  }
};




export default getproductDetail;
