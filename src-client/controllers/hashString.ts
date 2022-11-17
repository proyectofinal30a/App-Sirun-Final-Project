
export default function hashString(string: string) {
    let miarry = string.split('')
    let aUniCode = miarry.map((valor: string) => valor.charCodeAt(0))
    let sumaDelArry = Math.floor(aUniCode.reduce((acc: number, valor: number) => acc += valor) * 1231231312321112)
    return miarry[3] + sumaDelArry + miarry[0]
}