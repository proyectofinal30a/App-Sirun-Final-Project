// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCipheriv } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'  //importo prisma del lib del root 
import { TypeDiet, CategoryPro } from '@prisma/client'

// en desarrollo
const updateProduct: Function = async (req: NextApiRequest, res: NextApiResponse) => {
    //Category Pro se importa desde el schema de tablas, esta definido
    const { id } = req.query
    try {      
        // const newImageId = image.map((e)=>{
        //     return e.id
        // })

        // Array.isArray(newImageId)  &&  newImageId.forEach(async (element) => { 
        //     await prisma.imageProdu.delete({
        //         where : {
        //             id  : "a1ba0179-de89-4850-85a7-ef3d448edc84",
        //         },
        //         data : {
        //             image : {
        //                disconnect : {
        //                 id : 
        //                }
        //             }
        //         }
        //     })
        // });


        const  searchIdImage = await prisma.product.findFirst({
            where : {
                id : id,
            },
            select : {
                image : {
                    select : {
                        id : true,
                    }
                }
            }
        })

        searchIdImage.image.forEach(async(e)=>{
            await prisma.imageProdu.delete({
                        where : {
                            id  : e.id,
                        },
                    })
        })


        // if(typeof image.id === "string" && typeof image.image === "string"){
        //     Array.isArray(image)  &&  image.forEach(async (element) => { 
        //         await prisma.imageProdu.create({
        //             data : {
        //                 id : element.id,
        //                 image  : element.image,
        //                 product : {
        //                     connect : {
        //                         id,
        //                     }
        //                 }
        //             },
                    
        //         })
        //     });
            
        // }

      
   
     


        // const imageId = await prisma.product.findFirst({ 
        //     where : {
        //         id,
        //     },
        //     select : {
        //         image : {
        //             select : {
        //                 id : true
        //             }
        //         }
        //     }
        // })
        
        // await prisma.product.update({
        //     where: { 
        //         id: id
        //      },
        //     data: {
        //         price: price,
        //         description : description,        
        //     }
        // })
        

        // Array.isArray(imageId)  &&  imageId.forEach(async (element) => {
        //     await prisma.imageProdu.delete({
        //         where : {
        //             id : element,
        //         }
        //     })
        // });


        prisma.$disconnect()
        res.status(200).json(searchIdImage)


    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `Error al actualizar el producto con id: ${id}` })
    }
}


export default updateProduct


