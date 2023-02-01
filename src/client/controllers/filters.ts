import axios from "axios"

export function uniNames(argument: string) {
    return argument.toLowerCase()
}


interface Parameters {
    type?: string,
    category?: string,
    dimensionOrder?: string,
    name?: string,
    price?: any
}

export async function filters({ name, dimensionOrder, category, type, price }: Parameters) {
    try {
        const { data } = await axios.get('/api/product/gets/products')
        let arrayFiltered = data

        if (name) {
            arrayFiltered = arrayFiltered.map((prod: any) => {
                if (uniNames(prod.name).includes(uniNames(name))) return prod;
            })
            arrayFiltered = arrayFiltered.filter((prod: any) => prod !== undefined)
        }

        if (type) {
            arrayFiltered = arrayFiltered.map((prod: any) => {
                if (uniNames(prod.type).includes(uniNames(type))) return prod;
            })
            arrayFiltered = arrayFiltered.filter((prod: any) => prod !== undefined)
        }
        if (category) {
            arrayFiltered = arrayFiltered.map((prod: any) => {
                if (prod.category.includes(category)) return prod;
            })
            arrayFiltered = arrayFiltered.filter((prod: any) => prod !== undefined)
        }
        if (dimensionOrder) {
            switch (dimensionOrder) {
                case 'more dimension':
                    arrayFiltered = arrayFiltered.sort((a: any, b: any) => {
                        return a.dimension - b.dimension
                    })
                    break;
                case 'less dimension':
                    arrayFiltered = arrayFiltered.sort((a: any, b: any) => {
                        return b.dimension - a.dimension
                    })
                    break;
                default:
                    return arrayFiltered
            }
            arrayFiltered = arrayFiltered.filter((prod: any) => prod !== undefined)
        }
        if (price) {

            arrayFiltered = arrayFiltered.filter((prod: any) => {
                if (prod.price <= price[1] && prod.price >= price[0]) return prod
            })
        }
        if (arrayFiltered.length > 0) {
            return arrayFiltered
        } else {
            throw new Error('No existen coincidencias')
        }
    } catch (error: any) {
        return error.message
    }
}