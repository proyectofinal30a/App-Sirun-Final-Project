import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface IfavProduct {
  id: string;
  name: string;
  price: number;
  image: string[];
}

interface Iinfo {
  product: IfavProduct;
  userId: string;
};

interface Iproducts {
  products: Iinfo[];
}

const initialState: Iproducts = {
  products: [],
};


export const reducerFavorites = createSlice({
  name: "reducerFavorites",
  initialState: initialState,
  reducers: {
    addToFavorites: (state: Iproducts, action) => {
      state.products.push({ 
        product: action.payload.product, 
        userId: action.payload.id 
      });
    },
    
    removeFromFavorites: (state: Iproducts, action) => {
      state.products = state.products.filter((item) => item.product.id !== action.payload);
    },
  },
});


export const addToFavorites = (object: IfavProduct) => (dispatch: Function) => { 
  return dispatch(reducerFavorites.actions.addToFavorites(object));
};

export const removeFromFavorites = (id: string) => (dispatch: Function) => {
  return dispatch(reducerFavorites.actions.removeFromFavorites(id));
};


export default reducerFavorites.reducer;
