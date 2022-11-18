
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { StatusType } from '@prisma/client'
export default async function Order(req: NextApiRequest, res: NextApiResponse) {
    try {
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

        const { idUser, idArrayProduct, description, status, delivery_time, total }: order = req.body

        const myOrder = await prisma.order.create({
            data: {
                description,
                total,
                status,
                delivery_time,
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