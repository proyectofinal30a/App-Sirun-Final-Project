import { createSlice } from "@reduxjs/toolkit";
import { TypeDiet } from "@prisma/client";
import userVerification from '../../../controllers/userVerification-controller'
interface Iproduct {
  id?: string;
  name?: string;
  price?: number;
  dimension?: number;
  available?: boolean;
  type?: TypeDiet;
  category?: string;
  image?: string[];
  description?: string;
}

type IproductByName = {
  productsByName: Iproduct[];
};

const productsByName: IproductByName = {
  productsByName: [],
};


export const reducerProductsByName = createSlice({
  name: "reducerProductsByName",
  initialState: productsByName,
  reducers: {
    getProductByName: (state, action) => {
      state.productsByName = action.payload;
    },
  },
});



export const getProductsByName = (name: any, allProducts: any) => async (dispatch: Function) => {
  let filterSearchedProduct = allProducts.map((product: any) => {
    if (product.name.toLowerCase().includes(name.toLowerCase())) return product;
  });
  filterSearchedProduct = filterSearchedProduct.filter((product: any) => product !== undefined);

  dispatch(reducerProductsByName.actions.getProductByName(filterSearchedProduct));
};


export default reducerProductsByName.reducer;
