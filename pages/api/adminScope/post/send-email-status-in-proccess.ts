import type { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";
import { prisma } from "../../../../lib/prisma";
import CreationInTransitEmail from "../../../../src/client/controllers/email-in-transit-order";

const sendEmaiStatusInProccess: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const { orderId } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.API_KEY_EMAIL
            }
        });

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
                idPurchase: true,
            }
        })


        if (!updatedOrder) return res.status(200).json({ msg: "Cannot send email without data" });

        const emailCreation = CreationInTransitEmail(updatedOrder);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: updatedOrder?.user.email || "",
            subject: `Sirun Pâtisserie - Order ${updatedOrder.idPurchase}`,
            html: emailCreation,
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ msg: info.response });
            }
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

export default sendEmaiStatusInProccess;
