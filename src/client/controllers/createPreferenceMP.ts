
import { IUserBuyer, IproductModelCart, Ipreference, } from '../lib/types'
export default async function createPreferenceMP(user: IUserBuyer, productArray: IproductModelCart[]): Promise<Ipreference> {

    return {
        payer: user,
        items: productArray,
        back_urls: {
            success: `https://sirunnpatisserie.vercel.app/purchase/`,
            failure: 'https://sirunnpatisserie.vercel.app',
            pending: 'https://sirunnpatisserie.vercel.app',
        },
        shipments: {
            cost: 0
        }
    }
}
