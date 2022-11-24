
import { IUserBuyer } from '../../lib/types'


export default function vericationSubminObj(obj: IUserBuyer) {
    const myArrayValuesObj = Object.values(obj)
    return myArrayValuesObj.map(e => typeof e === 'object' ? Object.values(e) : e)
        .flatMap(e => e).filter(e => e !== '')
}