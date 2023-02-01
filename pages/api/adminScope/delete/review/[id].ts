import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../src/server/lib/prisma";


export default async function deleteAddress(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id } = req.query;

        if (typeof id !== 'string') return res.status(404).json({ msg: "The review could not be removed" });;

        await prisma.evaluation.delete({ where: { id } });

        res.status(200).json({ msg: "The review has been removed successfully" });
        prisma.$disconnect()
    } catch (error) {

        console.log(error);

        res.status(404).json({ msg: "The review could not be removed" });
        prisma.$disconnect()

    }
}
