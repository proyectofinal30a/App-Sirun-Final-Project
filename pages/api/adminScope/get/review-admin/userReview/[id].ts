import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../../lib/prisma";


export default async function userReview(req: NextApiRequest, res: NextApiResponse) {
    try {
        // interface IreviewId { idReview: string };
        const { id } = req.query;
        console.log(id);

        if (typeof id !== 'string') return;

        const resultUserRevier = await prisma.user.findFirst({
            where: { id },
            select: {
                name: true,
                image: true,
                evaluations: {
                    select: {
                        review: true,
                        rating: true,
                        product: {
                            select: {
                                name: true,
                                image: {
                                    select: {
                                        image: true
                                    }
                                },
                            }
                        }
                    }
                }
            }
        });

        const cleanImage = resultUserRevier?.evaluations.map(e => {

            const myImage = e.product.image.map(e => e.image)[0]

            return {
                product: { ...e.product, image: myImage },
                rating: e.rating,
                review: e.review
            }

        })

        const myUserAll = { ...resultUserRevier, evaluations: cleanImage }

        res.status(200).json(myUserAll);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "User Review could not be found" });
    }
}
