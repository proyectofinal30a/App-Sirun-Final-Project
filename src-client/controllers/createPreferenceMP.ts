
import { IUserBuyer, IproductModelCart, Ipreference, } from '../../lib/types'
export default async function createPreferenceMP(user: IUserBuyer, productArray: IproductModelCart[]): Promise<Ipreference> {
    console.log(user, 'estoy en usecreate');
    console.log(productArray, "es el array");

    return {
        payer: user,
        items: productArray,
        back_urls: {
            success: process.env.NODE_ENN !== 'production'
                ? `http://localhost:3000/purchase/`
                : `https://sirunnpatisserie.vercel.app/purchase/`,
            failure: process.env.NODE_ENN !== 'production'
                ? 'https://sirunnpatisserie.vercel.app'
                : 'http://localhost:3000',
            pending: process.env.NODE_ENN !== 'production'
                ? 'https://sirunnpatisserie.vercel.app'
                : 'http://localhost:3000',
        },
    }
}


