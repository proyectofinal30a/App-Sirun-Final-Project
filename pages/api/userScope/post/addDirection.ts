// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
// import { IUserBuyer } from '../../../../lib/types'  //importo prisma del lib del root 
// export default async function productAddFav(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         interface direccion {
//             idUser: string
//             dir: string
//         }


//         id            String  @id @unique @default(uuid())
//         id_user       String
//         name_address  String  @default("my Address")
//         zip_code      Int
//         street_name   String
//         street_number Int
//         user          User    @relation(fields: [id_user], references: [id])
//         phone         Phone?
//         order         Order[]
//       }
      
//       model Phone {
//         area_code     Int
//         number        Int
//         id_address    String  @unique
//         addressFather Address @relation(fields: [id_address], references: [id])
//       }



//         const   user : IUserBuyer = req.body



//         await prisma.address.create({
//             data: {
//                zip_code:Number(user.address.zip_code),
//                 street_name:user.address.street_name,
//                 street_number:Number(user.address.street_number),

//                 user: {
//                     connect: {
//                         id: idUser
//                     }
//                 }
//             }
//         })

//         res.status(200).json({ msg: 'La direccion se ha agregado correctamente' })

//         prisma.$disconnect()
//     } catch (error) {
//         console.log(error);

//         res.status(404).json({ msg: "No se ha podido subir la direccion" })
//     }

// }
