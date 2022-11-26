
import { IUserBuyer, IproductModelCart, Ipreference, } from '../../lib/types'
export default function createPreferenceMP(user: IUserBuyer, productArray: IproductModelCart[]): Ipreference {
   console.log(user,'estoy en usecreate');
   
    return {
        payer: user,
        items: productArray,
        back_urls: {
            success: process.env.NODE_ENN === 'production'
                ? `https://sirunnpatisserie.vercel.app/purchase/`
                : `http://localhost:3000/purchase/`,
            failure: process.env.NODE_ENN === 'production'
                ? 'https://sirunnpatisserie.vercel.app'
                : 'http://localhost:3000',
            pending: process.env.NODE_ENN === 'production'
                ? 'https://sirunnpatisserie.vercel.app'
                : 'http://localhost:3000',
        },
    }
}


