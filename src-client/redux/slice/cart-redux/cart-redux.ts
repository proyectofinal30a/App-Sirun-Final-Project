import axios from "axios";
import { IproductsCardModel, IproductModelCart, IUserBuyer } from "../../../../lib/types";
import { createSlice } from "@reduxjs/toolkit";
import createPreferenceMP from "../../../controllers/createPreferenceMP";
const initialState: IproductsCardModel = {
  products: [],
  confirmed: false,
  payLink: '',
}

interface IpayloadProcuct {
  payload: IproductModelCart
}

interface IpayloadSubmit {
  payload: {
    confirmed: boolean
    payLink: string
  }
}

interface IresetForm {
  payload: {
    confirmed: boolean
    payLink: string
  }
}

interface IpaylodId {
  payload: string
}

export const reducerCart = createSlice({
  name: "reducerCart",
  initialState: initialState,
  reducers: {
    actionAddToCart: (state: IproductsCardModel, action: IpayloadProcuct) => {
      let mySwitch = true
      state.products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1
          item.subTotal = item.subTotal += item.unit_price
          mySwitch = false
        }
        return item
      });

      mySwitch && state.products.push({ ...action.payload, subTotal: action.payload.unit_price })

    },

    actionAddOne: (state: IproductsCardModel, action: IpaylodId) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          item.quantity = item.quantity + 1
          item.subTotal = item.subTotal += item.unit_price
        }
        return item
      });
    },
    actionRemoveOne: (state: IproductsCardModel, action: IpaylodId) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity <= 1) return item
          item.quantity = item.quantity - 1
          item.subTotal = item.subTotal -= item.unit_price
        }
        return item
      });
    },
    actionTrashItem: (state: IproductsCardModel, action: IpaylodId) => {
      state.products = state.products.filter((elem) => elem.id !== action.payload);
    },
    actionConfirmedCart: (state: IproductsCardModel, action: IpayloadSubmit) => {
      state.confirmed = action.payload.confirmed;
      state.payLink = action.payload.payLink;
    },
    actionResetCart: (state: IproductsCardModel, action: IresetForm) => {
      state.confirmed = action.payload.confirmed;
      state.payLink = action.payload.payLink;
    },
    accionResetProduct: (state: IproductsCardModel) => {
      state.products = []
    }
  },
});

export const addToCart = (objeto: IproductModelCart) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionAddToCart(objeto));
};

export const addOne = (objeto: string) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionAddOne(objeto));
};

export const removeOne = (objeto: string) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionRemoveOne(objeto));
};

export const trashItem = (id: string) => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionTrashItem(id));
};

export const sendOrderDetail = (user: IUserBuyer, productArray: IproductModelCart[]) => async (dispatch: Function) => {
  try {

    const myPrerencia = await createPreferenceMP(user, productArray)
    const request = await axios({
      method: 'post',
      url: '/api/userScope/post/createOrder',
      data: myPrerencia
    })

    const myData: string = request.data.url
    return dispatch(reducerCart.actions.actionConfirmedCart({ payLink: myData, confirmed: true }));
  } catch (error) {
    console.log(error);

    const myMessageError = process.env.STATUS === 'production' ?
      'https://sirunnpatisserie.vercel.app/' :
      'http://localhost:3000/';
    return dispatch(reducerCart.actions.actionConfirmedCart({ payLink: myMessageError, confirmed: true }));
  }
};

export const resetCart = () => (dispatch: Function) => {
  return dispatch(reducerCart.actions.actionResetCart({ confirmed: false, payLink: '' }));
};

export const resetProduct = () => (dispatch: Function) => {
  return dispatch(reducerCart.actions.accionResetProduct());
};


export default reducerCart.reducer;
