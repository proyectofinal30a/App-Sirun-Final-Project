
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import { IReview } from '../../../../lib/types'
import { StatusType } from '@prisma/client'
export default async function Order(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { idUser, purchasedProducts, address, status, delivery_time, total } = req.body



//         external_reference String              @id @unique
//         id_user            String
//         description        String
//         total              Int
//         status             StatusType
//         date               DateTime            @default(now())
//         delivery_time      String
//         user               User                @relation(fields: [id_user], references: [id])
//         product            Product[]
//         purchasedProducts  purchasedProducts[]
//         id_address         String
//         address            Address   
// const myDelivery = ''

const myTotal = purchasedProducts.map(elem => elem.unit_price).reducer((e,acc)=>  e + acc)


        interface id {
            id: string
        }
        interface order {
            idUser: string
            idArrayProduct: id[]
            description: string
            status: StatusType
            total: number
            delivery_time: string
        }


        const myOrder = await prisma.order.create({
            data: {
                external_reference:'s',
                description:'falta ver esto',
                total:myTotal,
                status,
                delivery_time:'falta ver esto',
                purchasedProducts:{
                    createMany:[{title:'d'}]
                },
                user: {
                    connect: {
                        id: idUser
                    }
                },
                product: {
                    connect: idArrayProduct
                }
            }
        })










        prisma.$disconnect()
        res.status(200).json({ msg: "Order se ha creado" })

    } catch (error) {
        console.log(error);

        res.status(404).json({ msg: "hay un error en Order" })
    }

}

// id            
// id_user       
// description   
// product       
// total        
// status       
// date         
// user          
// delivery_time 