import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as nodemailer from "nodemailer";
import { prisma } from "../../../../lib/prisma";
import CreationInTransitEmail from "../../../../src-client/controllers/email-in-transit-order";

const updateOrderStatus: Function = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId, orderStatus } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });

    if (order.status === "fulfilled") {
      interface responseMP { data: { results: [{ status: string, id: string }] } }
  
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.API_KEY_EMAIL
          }
      });
  
      const requestOrder: responseMP = await axios({
          method: 'get',
          url: `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${orderId}`,
          headers: {
              'Content-Type': "application/json",
              Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
          }
      })
  
      const updatedOrder = await prisma.order.findFirst({
        where: { id: orderId },
        select: {
          user: {
            select: {
              name: true,
              email: true,
            }
          },
          addressOrder: {
            select: {
              street_name: true,
              street_number: true,
              zip_code: true,
            }
          },
          delivery_time: true,
        }
      })
      
      const idPurchaseMP = requestOrder.data.results[0].id;
  
      const resEmail = { ...updatedOrder, idPurchaseMP };
  
      const emailCreation = CreationInTransitEmail(resEmail);
  
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: updatedOrder?.user.email || "",
        subject: `Sirun Pâtisserie - Order ${idPurchaseMP}`,
        html: emailCreation,
      };
  
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default updateOrderStatus;
