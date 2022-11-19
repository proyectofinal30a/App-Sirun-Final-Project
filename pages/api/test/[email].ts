import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { PrismaClient, StatusType } from '@prisma/client'
export default async function reviewRating(req: NextApiRequest, res: NextApiResponse) {

    const myRevios = [
        "el producto me vino quemado!!! mas que pasteleria deberia ser centro de quemados!!!!",
        "me parecio una Delicia pero bajale el precio!!!!",
        "che todo bien con el producto pero mi amigo me cobra mas barato!!!!",
        "ESTE COMENTARIO HA SIDO BORRADO POR INCITAR LA VIOLENCIA CONTRA LOS PASTELES",
    ]

    const myRating = [1, 3, 2, 5]



    const adress = [
        'calle falsa 123',
        'calle cerro alto 123 ryuto rio gallego',
        'real 12 posada misiones'
    ]


    try {

        const { email } = req.query

        if (typeof email !== 'string') return
        //busco 5 productos random
        const myProduct = await prisma.product.findMany({
            take: 5,
            select: {
                id: true
            }
        })

        interface Iid {
            id: string
        }

        // lo vinculo con el user 
        myProduct.forEach(async (elem: Iid) => {
            await prisma.user.update({
                where: {
                    email
                },
                data: {

                    favorites: {
                        connect: {
                            id: elem.id
                        }
                    }
                }
            })
        })

        // agrego review y rating 

        myRevios.forEach(async (elem: string, index: number) => {
            await prisma.evaluation.create({
                data: {
                    review: elem,
                    rating: myRating[index],
                    user: {
                        connect: {
                            email
                        },

                    },
                    product: {
                        connect: {
                            id: myProduct[index].id
                        }
                    }
                }
            })
        })

        /// agrego direcciones 
        adress.forEach(async (elem: string) => {
            await prisma.direccion.create({
                data: {
                    dir: elem,
                    user: {
                        connect: {
                            email
                        }
                    }
                }
            })
        })

        const o = {
            "description": "una descripcion ramdom hahah",
            "delivery_time": "4 dias aprox",
            "total": 100
        }

        const myState: StatusType = 'pending'


        await prisma.order.create({
            data: {
                description: o.description,
                status: myState,
                delivery_time: o.delivery_time,
                total: o.total,
                user: {
                    connect: {
                        email
                    }
                },
                product: {
                    connect: myProduct
                }

            }
        })

        res.status(200).json({ msg: "el usuario ha sido actualizado" })
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "algo paso que no se pudo actualizar el usuario" })
    }

}
