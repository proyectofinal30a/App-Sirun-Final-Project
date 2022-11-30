// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";


const ordersGet: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        idPurchase: true,
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        purchasedProducts: {
          select: {
            title: true,
            picture_url: true,
            unit_price: true,
            quantity: true,
            id: true,
          }
        },
        addressOrder: {
          select: {
            phone: {
              select: {
                area_code: true,
                number: true,
              }
            },
            street_name: true,
            street_number: true,
            zip_code: true,
          }
        },
        date: true,
        total: true,
        delivery_time: true,
        status: true,
        id: true,
      }
    });
    prisma.$disconnect();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener orders" });
  }
};

export default ordersGet;
