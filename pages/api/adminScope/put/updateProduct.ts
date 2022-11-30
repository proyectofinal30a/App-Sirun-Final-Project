// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'
import { Iproduct } from '../../../../lib/types'

// en desarrollo
const updateProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    //Category Pro se importa desde el schema de tablas, esta definido
    const { id, price, description, image } = req.body
    try {      
        console.log(image, "imagenes que llegan al back")
        
   
         const productUpdated = await prisma.product.update({
            where: { 
                id: id
             },
            data: {
                price: price,
                description : description,
            }
        })
 
        // imagenes qye ya tiene el producto (antes)
        const imageToUpdate = await prisma.imageProdu.findMany({  
            where : {
                id_product : id
            }
        })

        console.log(imageToUpdate, "imagenes encontradas");

    
        if(image.length > imageToUpdate.length){
            for(let i = 0; i < image.length; i++){
                if(imageToUpdate[i].image){ 
                    const imageUpdated = await prisma.imageProdu.update({
                        where: {
                            id: imageToUpdate[i].id
                        },
                        data: {
                            image: image[i].image
                        }
                    })
                }else if (!imageToUpdate[i]){ 
                    const imageCreated = await prisma.imageProdu.create({
                        data: {
                            image: image[i].image,
                            id_product: id
                        }
                    })
                }
            }
        }
    //     } else if (image.length < imageToUpdate.length){
    //         for(let i = 0; i < imageToUpdate.length; i++){
    //             if(image[i]){
    //                 await prisma.imageProdu.update({
    //                     where : {
    //                         id : imageToUpdate[i].id
    //                     },
    //                      data : {
    //                         image : image[i].image
    //                      }
    //                 })
    //             } else {
    //                 await prisma.imageProdu.delete({
    //                     where : {
    //                         id : imageToUpdate[i].id
    //                     }
    //                 })
    //             }
    //         }
    //     } else if (image.length === imageToUpdate.length){
    //         for(let i = 0; i < image.length; i++){
    //             await prisma.imageProdu.update({
    //                 where : {
    //                     id : imageToUpdate[i].id
    //                 },

    //                 data : {
    //                     image : image[i].image
    //                 }
    //             })
    //         }
    //  } 

        prisma.$disconnect()
        res.status(200).json({ message: "Producto actualizado" })


    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `Error al actualizar el producto con id: ${id}` })
    }
}


export default updateProduct


