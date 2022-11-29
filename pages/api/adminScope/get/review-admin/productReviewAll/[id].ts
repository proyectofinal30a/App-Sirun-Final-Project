import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../../lib/prisma";


export default async function ProducReview(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        console.log(id, 'adadasdasdasdasdasdasdasdasdasda11');
        console.log('VAAAAAAAAAAAAa');

        if (typeof id !== 'string') return res.status(200).json({ msg: "nop" });;
        console.log(id);
        const resultProductRevier = await prisma.product.findFirst({
            where: { id },
            select: {
                name: true,
                image: {
                    select: {
                        image: true
                    },
                },
                evaluation: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                image: true
                            }
                        },
                        review: true,
                        rating: true
                    }
                }
            }

        });

        console.log(resultProductRevier);


        const cleanImage = resultProductRevier?.image.map(e => e.image)[0]

        const myProductAll = { ...resultProductRevier, image: cleanImage }
        console.log(myProductAll);

        res.status(200).json(myProductAll);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "User Review could not be found" });
    }
}
