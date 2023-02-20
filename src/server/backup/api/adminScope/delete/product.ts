// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"; //importo prisma del lib del root
import { TypeDiet } from "@prisma/client";
import { Iproduct } from "../../../../../../lib/types";

const deleteProduct: Function = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // const { id } = req.body
  // try {
  //     const product: any = await prisma.product.delete({
  //         where: { id: id }
  //     })
  //     res.status(200).json(product)
  // } catch (error) {
  //     res.status(404).json({ msg: `Se creo el producto con nombre: ${name}` })
  // }
};

export default deleteProduct;
//PROXIMAMENTE....
// import { v2 as cloudinary } from 'cloudinary'
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { unstable_getServerSession } from "next-auth/next"
// import { authOptions } from '../../../auth/[...nextauth]'
// import userVerification from '../../../../../src-client/controllers/userVerification-controller'
// const deleteImageAll = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const session: any = await unstable_getServerSession(req, res, authOptions)
//         const myToken = await userVerification('server', session)
//         const authorization: any = req.headers.authorization
//         if (myToken === authorization) {
//             const file: any = process.env.NAME_FILE_CLOUDINARY
//             const arrayIds = req.body
//             arrayIds.forEach(async (element: any) => {
//                 const { id } = element
//                 const id_public: string = file + id
//                 await cloudinary.uploader.destroy(id_public)
//             });

//             return res.status(200).json({ response: "Se ha eliminado todas las preview image" })
//         }
//         return res.status(200).json({ msj: 'NO ESTAS AUTORIZADO' })
//     } catch (error) {
//         return res.status(404).json({ msj: 'ERROR EN cloudinary all delete' })
//     }
// }
// export default deleteImageAll
