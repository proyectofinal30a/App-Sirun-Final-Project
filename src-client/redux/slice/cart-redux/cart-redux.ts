import { StatusType } from "@prisma/client";
import axios from "axios";
import userVerification from "../../../controllers/userVerification-controller";
import { Iproduct } from "../../../../lib/types";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createPayment } from "../../../controllers/controllerMP";

export interface IactionPayload2 {
  id: string;
  name: string;
  price: number;
  image: string[];
}
export interface Iuser {
  name: string;
  email: string;
  phone: string;
  areaCode: string;
  zipCode: string;
  streetName: string;
  streetNumber: string;
}


type quantityy = {
  product: IactionPayload2;
  quantity: number;
  subTotal: number;
  infoUser: any;
};

interface Iproducts {
  products: quantityy[];
  confirmed: Boolean;
  payLink: string;
  image:string
}

const initialState: Iproducts = {
  products: [],
  confirmed: false,
  payLink: '',
  image:''
}



export const reducerCart = createSlice({
  name: "reducerCart",
  initialState: initialState,
  reducers: {
    actionAddToCart: (state: Iproducts, action) => {
      if (!state.products[0]) {
        state.products.push({
          product: action.payload,
          quantity: 1,
          subTotal: action.payload.price,
          infoUser: {},
        });
        return;
      }
      const { id, price } = action.payload;
      const itemInCart: any = state.products.find(
        (item) => item.product.id === id
      );

      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.subTotal += price;
      } else {
        state.products.push({
          product: action.payload,
          quantity: 1,
          subTotal: price,
          infoUser: {},
        });
      }
    },
    actionAddOne: (state: Iproducts, action) => {
      const { id, price } = action.payload;
      const itemInCart: any = state.products.find(
        (item) => item.product.id === id
      );

      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.subTotal += price;
      }
    },
    actionRemoveOne: (state: Iproducts, action) => {
      const { id, price } = action.payload;
      const itemInCart: any = state.products.find(
        (item) => item.product.id === id
      );

      if (itemInCart.quantity <= 1) {
        itemInCart.quantity = 0;
        itemInCart.subTotal = 0;
      } else {
        itemInCart.quantity--;
        itemInCart.subTotal -= price;
      }
    },
    actionTrashItem: (state: Iproducts, action) => {
      state.products = state.products.filter(
        (elem) => elem.product.id !== action.payload
      );
    },
    actionConfirmedCart: (state: any, action) => {
      state.confirmed = action.payload.state;
      state.payLink = action.payload.info;
    },
    actionResetCart: (state: any, action) => {
      state.confirmed = action.payload;
    },
  },
});

export const addToCart = (objeto: IactionPayload2) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionAddToCart(objeto));
};

export const addOne = (objeto: IactionPayload2) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionAddOne(objeto));
};

export const removeOne = (objeto: IactionPayload2) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionRemoveOne(objeto));
};

export const trashItem = (id: string) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionTrashItem(id));
};

export const sendOrderDetail = (infoProductsAndBuyer: any) => async (dispatch: Function) => {
  try {
    const request = await axios({
      method: 'post',
      url: '/api/mercadopago/createPayment',
      data: infoProductsAndBuyer
    })


    return dispatch(reducerCart.actions.actionConfirmedCart(request.data));
  } catch (error) {
    const myMessageError = process.env.NODE_ENN === 'production' ?
      'https://sirunnpatisserie.vercel.app/error' :
      'http://localhost:3000/error';
    return dispatch(reducerCart.actions.actionConfirmedCart({ info: myMessageError }));
  }
};

export const resetCart = () => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionResetCart(false));
};



export default reducerCart.reducer;