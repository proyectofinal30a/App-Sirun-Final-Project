// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { createCipheriv } from 'crypto';
// import type { NextApiRequest, NextApiResponse } from 'next'
// import{ prisma }from '../../../../lib/prisma'  //importo prisma del lib del root 
// import {CategoryPro  } from '@prisma/client'
// import {  } from '../../../../lib/types'

// const createProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { name, price, dimension, type, image, category, description } = req.body
//     const categoryy: CategoryPro = category //product_category se importa desde el schema de tablas, esta definido

//     try {
//         const product: productt = await prisma.product.create({
//             data: {
//                 name: name,
//                 price: price,
//                 dimension: dimension,
//                 type: type,
//                 category: categoryy,
//                 image: image,
//                 description: description,
//                 evaluation: { create: [] }
//             }
//         })
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(404).json({ msg: `Se creo el producto con nombre: ${name}` })
//     }
// }

// export default createProduct

export { }