import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";


export default async function deleteAddress(req: NextApiRequest, res: NextApiResponse) {
    try {
        // interface IreviewId { idReview: string };
        const { id } = req.query;

        if (typeof id !== 'string') return;

        await prisma.evaluation.delete({
            where: { id }
        });

        res.status(200).json({ msg: "The review has been removed successfully" });
    } catch (error) {
   
        res.status(404).json({ msg: "The review could not be removed" });
    }
}
