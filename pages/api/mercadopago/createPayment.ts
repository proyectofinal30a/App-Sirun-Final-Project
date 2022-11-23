import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
export default async function createPayment(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { products, infoBuyer } = req.body
        const url = 'https://api.mercadopago.com/checkout/preferences'
        const preference = {
            external_reference:new Date(),
            payer: {
                email: infoBuyer.email,
                name: infoBuyer.name,
                address: {
                    street_name: infoBuyer.streetName,
                    street_number: infoBuyer.streetNumber,
                    zip_code: infoBuyer.zipCode
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
                    picture_url: prod.product.image[0].image,
                    currency_id: "ARS",
                    quantity: prod.quantity
                }
            }),
            back_urls: {
                success: 'http://localhost:3000/',
                failure: 'http://localhost:3000/',
                pending: 'http://localhost:3000/'
            },
        }
        const response = await axios.post(url, preference, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })
        console.log(response.data);
        return res.status(200).json({ info: response.data.init_point, state: true })
    } catch (error) {
        res.status(400).json({ msg: 'Error formProduct' })

    }
}



