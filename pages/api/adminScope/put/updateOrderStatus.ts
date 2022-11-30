import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
const updateOrderStatus: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId, orderStatus } = req.body;
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });
    const newCompleteOrder = await prisma.order.findFirst({
      where: { id: orderId },
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
    })
    return res.status(200).json(newCompleteOrder);
  } catch (error) {
    return res.status(400).json(error.message);
  }

}

export default updateOrderStatus;
