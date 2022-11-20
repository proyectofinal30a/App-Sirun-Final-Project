import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma"; //importo prisma del lib del root
import { Iproduct } from "../../../lib/types";

const productDetail: Function = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { id }: any = req.query
        // const myNumberId = parseInt(id)
        const productDetail: any = await prisma.product.findFirst(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(productDetail);
    } catch (error) {
        res.status(404).json({ msg: "Error al obtener el producto" });
    }
};




export default productDetail;