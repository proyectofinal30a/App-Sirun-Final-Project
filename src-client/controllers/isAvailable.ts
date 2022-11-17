

export default function isAvailable(array: any) {
    const productsAvailables = array.filter((product: any) => product.available)
    return productsAvailables
}