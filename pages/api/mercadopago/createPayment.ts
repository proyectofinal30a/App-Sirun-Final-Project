import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { Ipreference, IbodoyPreferenceLink } from '../../../lib/types'
export default async function createPayment(req: NextApiRequest, res: NextApiResponse) {
    try {
        const myPreference: Ipreference = req.body
        const response = await axios({
            method: 'post',
            url: 'https://api.mercadopago.com/checkout/preferences',
            data: myPreference,
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })

        const mydata: IbodoyPreferenceLink = {
            order: myPreference,
            purchase_link: response.data.init_point
        }
        const myUrl = process.env.NODE_ENV !== 'production' ?
            'http://localhost:3000/api/userScope/post/order' :
            'https://sirunnpatisserie.vercel.app/api/userScope/post/order'
        await axios({
            method: "post",
            url: myUrl,
            data: mydata
        })
        return res.status(200).json({ url: response.data.init_point })
    } catch (error) {
        res.status(400).json({ msg: 'Error formProduct' })
    }
}



