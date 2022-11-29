import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import axios from "axios";
import CreationOfHTML from "../../../../../src-client/controllers/email-Order-html";
import * as nodemailer from "nodemailer";

export default async function findReference(req: NextApiRequest, res: NextApiResponse) {
  try {
    interface body {
      email: string;
      name: string;
      idReference: string;
      idPurchase: string;
    }
    interface responseMP {
      data: {
        results: [{ status: string }];
      };
    }
    const { email, name, idReference, idPurchase }: body = req.body;

    await prisma.order.update({
      where: { id: idReference },
      data: { status: "confirmed" },
    });

    const statusConfirmation = await prisma.order.findFirst({
      where: { id: idReference },
      select: { status: true }
    });

    if (statusConfirmation?.status === "confirmed") return res.status(200).json({ msg: "Order is already confirmed" });

    const responseforEmail = await prisma.user.findFirst({
      where: { email },
      select: {
        orders: {
          where: {
            id: idReference,
          },
          select: {
            addressOrder: {
              select: {
                zip_code: true,
                street_name: true,
                street_number: true,
                phone: {
                  select: {
                    number: true,
                    area_code: true,
                  },
                },
              },
            },
            purchasedProducts: {
              select: {
                title: true,
                unit_price: true,
                picture_url: true,
                quantity: true,
              },
            },
            status: true,
            delivery_time: true,
            total: true,
          },
        },
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.API_KEY_EMAIL,
      },
    });

    const myHtml = CreationOfHTML(responseforEmail, email, name, idPurchase);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Sirun Pâtisserie - Order ${idPurchase}`,
      html: myHtml,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ msg: "the order status check was successful" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error while searching for OrderEmail" });
  }
}
