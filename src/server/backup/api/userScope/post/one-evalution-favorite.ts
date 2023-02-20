// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"; //importo prisma del lib del root


export default async function addOneReview(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, id } = req.body;

        if (typeof email === "string" && typeof id === "string") {
            await prisma.user.update({
                where: { email },
                data: {
                    favorites: {
                        connect: { id },
                    },
                },
            });

            res.status(200).json({ msg: "review has been added successfully" });
        }
    } catch (error) {
        res.status(404).json({ msg: "The review has not been added" });
    }
}
