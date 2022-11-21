
import type { NextApiRequest, NextApiResponse, } from "next";
import { prisma } from "../../../../../lib/prisma";
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
        select: {
          id: true,
          name: true,
          price: true,
          dimension: true,
          available: true,
          type: true,
          category: true,
          image: {
            select: {
              image: true,
            }
          },
          evaluation: {
            select: {
              id: true,
              rating: true,
              review: true,
              user: {
                select: {
                  name: true,
                  image: true,
                  role: true
                }
              }
            }
          },

        }
      }


    )
    prisma.$disconnect()
    res.status(200).json(productDetail);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener el producto" });
  }
};

// id: string;
// name: string;
// price: number;
// dimension: number;
// available: boolean;
// type: TypeDiet;
// category: CategoryPro;
// image: Iimage[];
// description: string;
// evaluation: Ievaluations[]



export default getproductDetail;
