
import { IUserBuyer, IproductModelCart, Ipreference, } from '../../lib/types'
export default async function createPreferenceMP(user: IUserBuyer, productArray: IproductModelCart[]): Promise<Ipreference> {
    console.log(user, 'estoy en usecreate');
    console.log(productArray, "es el array");

    return {
        payer: user,
        items: productArray,
        back_urls: {
            success: `https://sirunnpatisserie.vercel.app/purchase/`,
            failure: 'https://sirunnpatisserie.vercel.app',
            pending: 'https://sirunnpatisserie.vercel.app',
        },
    }
}
