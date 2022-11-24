type sessionType = {
    user: {
        email: string
        role: string
        name: string
    }
    expires: string
}



export default function hash(obj: sessionType) {
    const alf = obj.user.email
    let miarry = alf.split('')
    let aUniCode = miarry.map((valor: string) => valor.charCodeAt(0))
    let sumaDelArry = Math.floor(aUniCode.reduce((acc: number, valor: number) => acc += valor) * 152312312312213)
    return miarry[3] + sumaDelArry + miarry[0]
}






// export default function hash(obb) {

//     let miarry = obb.split('')
//     let aUniCode = miarry.map((valor) => valor.charCodeAt(0))
//     let sumaDelArry = Math.floor(aUniCode.reduce((acc, valor) => acc += valor) * 152312312312213)
//     return miarry[3] + sumaDelArry + miarry[0]
// }