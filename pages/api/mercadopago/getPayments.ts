import type {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios';
export default async function getPayments(req:NextApiRequest, res: NextApiResponse){
    const url='https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID'
    try {
        const response = await axios.get(url ,{
            headers:{
                'Content-Type':"application/json",
                Authorization: `Bearer APP_USR-1385912062963638-111422-e1e1168b94be269d55d7cbca8fcaf186-1239200986`
            }
        })
        return res.status(200).json(response.data)
    } catch (error) {
        
    }
}