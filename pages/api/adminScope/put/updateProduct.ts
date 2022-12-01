// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { Iproduct } from '../../../../lib/types'

const updateProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, price, description, image } = req.body
    try {      
        const imageIds = await prisma.product.findFirst({ 
            where : {
                id,
            },
            select : {
                image : {
                    select : {
                        id : true
                    }
                }
            }
        })

      imageIds && imageIds.image.forEach(async(e)=>{
            await prisma.imageProdu.delete({
                        where : {
                            id  : e.id,
                        },
                    })
        })


        image && image.forEach(async(e)=>{
            await prisma.imageProdu.create({
                        data :{
                            id : e.id,
                            image : e.image,
                            product : {
                                connect : {
                                    id : id,
                                }
                            }
                        }

                    })
        })

        
        await prisma.product.update({
            where: { 
                id: id
             },
            data: {
                price: price,
                description : description,        
            }
        })
        

        prisma.$disconnect()
        res.status(200).json({ message: "Producto actualizado" })


    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `Error al actualizar el producto con id: ${id}` })
    }
}


export default updateProduct


