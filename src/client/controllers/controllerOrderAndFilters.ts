import { Iproduct } from "../lib/types";


export const orderPriceAndDimension = (obje: any) => {
    const { state, order } = obje
    const stateArr = [...state]


    if (order === "asc" || order === "desc") {
        let arr: any = stateArr.sort((product1: Iproduct, product2: Iproduct) => {
            return product1.price - product2.price
        })

        if (order === "desc") {
            return arr.reverse()
        }
        return arr
    }

    let arr: any = stateArr.sort((product1: Iproduct, product2: Iproduct) => {
        return product1.dimension - product2.dimension
    })

    if (order === "+") {
        return arr.reverse()
    }
    return arr
}




export const arrfilterCategoryOrType = (obje: any) => {
    const { state, order } = obje


    const stateArr = [...state]

    let arrTypes: any = []

    stateArr.map((e) => {
        if (!arrTypes.includes(e.type)) { arrTypes.push(e.type) }
    })


    if (arrTypes.includes(order)) {
        return stateArr.filter((product) => product.type === order);
    }

    const arrCategoryFiltred = stateArr.filter((product) => product.category === order);


    return arrCategoryFiltred
}



