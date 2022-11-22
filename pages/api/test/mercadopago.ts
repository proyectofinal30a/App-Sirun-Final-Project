// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import { prisma } from '../../../lib/prisma'  //importo prisma del lib del root 
const testMercadoPago = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { products, infoBuyer } = req.body
        const url = 'https://api.mercadopago.com/checkout/preferences'
        const preference = {
            external_reference: infoBuyer.email,
            payer: {
                email: infoBuyer.email,
                name: infoBuyer.name,
                adress: {
                    street_name: infoBuyer.streetName,
                    street_number: infoBuyer.streetNumber,
                    zipCode: infoBuyer.zipCode
                },
                phone: {
                    number: infoBuyer.phone,
                    area_code: infoBuyer.areaCode
                }
            },
            items: products.map((prod: any) => {
                return {
                    id: prod.product.id,
                    title: prod.product.name,
                    unit_price: prod.product.price,
                    currency_id: "ARS",
                    quantity: prod.quantity
                }
            }),
            back_urls: {
                success: 'http://localhost:3000/${id}',
                failure: 'http://localhost:3000/',
                pending: 'http://localhost:3000/'
            },
        }
        const response = await axios.post(url, preference, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer APP_USR-1385912062963638-111422-e1e1168b94be269d55d7cbca8fcaf186-1239200986`
            }
        })
        let responseData: any
        if (response.data.state) {
            responseData = {
                link: response.data.init_point,
                date: response.data.date_created,
                items: response.data.items,
                payer: response.data.payer
            }
        }
        console.log(response.data);

        return res.status(200).json({info:response.data.init_point,status:true})
    } catch (error) {
        res.status(400).json(error)

    }
}

export default testMercadoPago