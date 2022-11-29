import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

const updateOrderStatus: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId, orderStatus } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default updateOrderStatus;
