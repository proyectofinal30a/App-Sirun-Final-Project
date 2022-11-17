import { StatusType } from "@prisma/client";

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
// import { isArray } from "util";
import userVerification from '../../../controllers/userVerification-controller'
import { Iproduct } from "../../../../lib/types";



export interface IactionPayload2 {
    id: string,
    name: string,
    price: number,
    image: string[],
}
export interface Iuser {
    name: string,
    email: string,
    phone: string,
    areaCode: string,
    zipCode: string,
    streetName: string,
    streetNumber: string,
}
type quantityy = {
    product: IactionPayload2,
    quantity: number,
    subTotal: number,
    infoUser: any
}
interface Iproducts {
    products: quantityy[]
}

const initialState: Iproducts = {
    //products: [{objeto completo 1}, quantity:2, subtotal: 600}, {{obejto completo 2 }, quantity:1, subtotal: 900}]
    products: []
}


export const reducerCart = createSlice({
    name: 'reducerCart',
    initialState: initialState,
    reducers: {
        actionAddToCart: (state: Iproducts, action) => {
            if (!state.products[0]) {
                state.products.push({ product: action.payload, quantity: 1, subTotal: action.payload.price, infoUser: {} })
                return
            }
            const { id, price } = action.payload
            const itemInCart: any = state.products.find((item) => item.product.id === id);


            if (itemInCart) {
                itemInCart.quantity++;
                itemInCart.subTotal += price
            } else {
                state.products.push({ product: action.payload, quantity: 1, subTotal: price, infoUser: {} });
            }
        },
        actionAddOne: (state: Iproducts, action) => {
            const { id, price } = action.payload
            const itemInCart: any = state.products.find((item) => item.product.id === id);

            if (itemInCart) {
                itemInCart.quantity++;
                itemInCart.subTotal += price
            }
        },
        actionRemoveOne: (state: Iproducts, action) => {
            const { id, price } = action.payload
            // parseInt(price)
            const itemInCart: any = state.products.find((item) => item.product.id === id);
            // parseInt(itemInCart.subTotal)

            if (itemInCart.quantity === 1) {
                itemInCart.quantity = 0
                itemInCart.subTotal = 0
            } else {
                itemInCart.quantity--;
                itemInCart.subTotal -= price
            }
        },
        actionTrashItem: (state: Iproducts, action) => {
            const { id } = action.payload
            state.products = state.products.filter((elem) => elem.product.id !== id)
        }
    }
})

export const addToCart = (objeto: IactionPayload2) => (dispatch: Function) => {
    return dispatch(reducerCart.actions.actionAddToCart(objeto));
}

export const addOne = (objeto: IactionPayload2) => (dispatch: Function) => {
    return dispatch(reducerCart.actions.actionAddOne(objeto));
}

export const removeOne = (objeto: IactionPayload2) => (dispatch: Function) => {
    return dispatch(reducerCart.actions.actionRemoveOne(objeto));
}

export const trashItem = (id: string) => (dispatch: Function) => {
    return dispatch(reducerCart.actions.actionTrashItem(id));
}

export const sendOrderDetail = async (infoProductsAndBuyer: any) => {
    console.log(infoProductsAndBuyer)
    // const info = await axios({
    //     method: "post",
    //     url: '/api/adminScope/post/productPostAdm',
    //     data: infoProductsAndBuyer,
    // })
}


export const selectCart = (state: any) => console.log(state.products); // exporto opcion de ver que hay en el carrito 




export default reducerCart.reducer;
