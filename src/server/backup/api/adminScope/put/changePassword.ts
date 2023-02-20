import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'


const changePassword = async (req:NextApiRequest, res: NextApiResponse) => {
    const CLIENT_ID = process.env.CLIENT_ID

    
    try {
        const {email} = req.body
        
        const user: any = await axios({
            method: 'POST',
            url: 'https://sirunnpatisserie.us.auth0.com/dbconnections/change_password',
            data: {
                client_id: CLIENT_ID,
                email: email,
                connection: 'Username-Password-Authentication'
            }
        })
        
        return res.status(200).json(user.data)
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default changePassword