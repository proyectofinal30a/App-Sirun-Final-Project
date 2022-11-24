import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Iproduct } from "../../../../lib/types";
import userVerification from '../../../controllers/userVerification-controller'



interface Iproducts {
  products: Iproduct[],
  productsToFilter: Iproduct[],
  productEdit : any
}


const stateInitial: Iproducts = {
  products: [],
  productsToFilter: [],
  productEdit : {
    id: "",
    name: "",
    price: 0,
    dimension: 0,
    available: false,
    type: "vegan",
    category: "cakes",
    image: [],
    description: "",
    evaluation: [],
  },
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
    },
    confirmEdit : (state, action)=>{
      state.productEdit = action.payload;
    },
    updateProduct : (state, action)=> {
      state.productEdit = action.payload;
    }
  },
});

export const editProduct = (object : Iproduct) => (dispatch: Function)=>{
  return dispatch(reducerAdmin.actions.confirmEdit(object))
}

export const setProduct = (object : Iproduct)=> (dispatch : Function) => {
  return dispatch(reducerAdmin.actions.updateProduct(object))
}

//functions para el reducer - pasar a un controller. 
const filteredByName = (state, name) => {
  console.log(current(state));
  
  let arr = state?.map((product) => {
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