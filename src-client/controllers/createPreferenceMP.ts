import { nanoid } from 'nanoid';
import { IUserBuyer, IproductModelCart, Ipreference, } from '../../lib/types'


export default function createPreferenceMP(user: IUserBuyer, productArray: IproductModelCart[]): Ipreference {
    const myId = nanoid()
    return {
        external_reference: myId,
        payer: user,
        items: productArray,
        back_urls: {
            success: process.env.NODE_ENN === 'production'
                ? `https://sirunnpatisserie.vercel.app/purchase/${myId}`
                : `http://localhost:3000/purchase/${myId}`,
            failure: process.env.NODE_ENN === 'production'
                ? 'https://sirunnpatisserie.vercel.app'
                : 'http://localhost:3000',
            pending: process.env.NODE_ENN === 'production'
                ? 'https://sirunnpatisserie.vercel.app'
                : 'http://localhost:3000',
        },
    }
}


