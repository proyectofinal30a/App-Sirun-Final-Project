import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Iproduct } from "../../../../lib/types";
import userVerification from '../../../controllers/userVerification-controller'



interface Iproducts {
  products: Iproduct[],
  productsToFilter: any
}


const stateInitial: Iproducts = {
  products: [],
  productsToFilter: [],
}


export const reducerAdmin = createSlice({
  name: "reducerAdmin",
  initialState: stateInitial,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    getByName: (state, action) => {
      state.productsToFilter = filteredByName(state.products, action.payload)
    }
  },
});

//functions para el reducer - pasar a un controller. 
const filteredByName = (state, name) => {
  let arr = state.map((product) => {
    if (product.name.toLowerCase().includes(name.toLowerCase())) return product
  })
  return arr.filter((product: any) => product !== undefined);
}
//end functions


export const getProducts: any = () => async (dispatch: Function) => {
  try {
    const myToken: any = await userVerification('client')
    const { data } = await axios({
      method: 'get',
      url: '/api/product/gets/products',
      headers: {
        "Authorization": myToken
      }
    });
    const allProducts = data

    dispatch(reducerAdmin.actions.getAllProducts(allProducts));
  } catch (error) {
    console.log(error)
  }
};

export const getProductByName: any = (name: string) => (dispatch: Function) => {
  console.log(name)
  return dispatch(reducerAdmin.actions.getByName(name))
}


export default reducerAdmin.reducer;