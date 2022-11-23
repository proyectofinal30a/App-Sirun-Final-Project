import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


const OrderAdmin: any = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const requestOrder = await axios({
            method: 'get',
            url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=2022-11-22T20:31:58.556Z',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })


        res.status(200).json(requestOrder.data)
    } catch (error) {
        res.status(404).json({ msg: "Error al obtener Order" })
    }
}

export default OrderAdmin
















