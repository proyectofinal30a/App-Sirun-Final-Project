import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iproduct } from "../../../lib/types";
import fromJsonToArray from '../../../controllers/imageJson'
import userVerification from '../../../controllers/userVerification-controller'
import isAvailable from '../../../controllers/isAvailable'

interface Iproducts {
  products: Iproduct[],
}

const stateInitial: Iproducts = {
  products: [],
}


export const reducerProducts = createSlice({
  name: "reducerProducts",
  initialState: stateInitial,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    cleanProductsAction: (state) => {
      state.products = [];
    },
  },
});


export const getAllProducts = () => async (dispatch: Function) => {
  try {
    const myToken: any = await userVerification('client')
    const { data } = await axios({
      method: 'get',
      url: '/api/product/gets/products',
      // headers: {
      //   "Authorization": myToken
      // }
    });
    const allProducts = isAvailable(data)


    dispatch(reducerProducts.actions.getAllProducts(allProducts));
  } catch (error) {
    console.log(error)
  }
};

export const cleanProducts = () => (dispatch: Function) => {
  dispatch(reducerProducts.actions.cleanProductsAction)
}

export default reducerProducts.reducer;
