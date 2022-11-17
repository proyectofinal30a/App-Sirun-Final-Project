import { getSession } from "next-auth/react"
import hashString from "./hashString"
import hash from "./hash"

type sessionType = {
    user: {
        email: string
        role: string
        name: string
    }
    expires: string
} | null

export default async function userVerification(type: string, data: any = undefined) {
    if (type === 'server') {
        const mySession: any = data
        const mySecrete: any = process.env.HASH_AUT
        const myHash = mySession ? hash(mySession) : hashString('4ffgabbjh0365wfwsdasdasd')
        return myHash
    }
    if (type === 'client') {
        const mySession: any = await getSession();
        const mySecrete: any = process.env.HASH_AUT
        const myHash = mySession ? hash(mySession) : hashString('4ffgabbjh0365wfwsdasdasd')
        return myHash
    }
}