import { createSlice } from "@reduxjs/toolkit";
import { Iproduct } from "../../../../lib/types";
import { orderPriceAndDimension, arrfilterCategoryOrType } from "../../../controllers/controllerOrderAndFilters";

interface Iproducts {
  productsToFilter: Iproduct[]
  productPrevState: Iproduct[]
}

const stateInitial: Iproducts = {
  productsToFilter: [],
  productPrevState: [],
}

export interface IactionPayload {
  order: string,
  state: Iproduct[]
}

export const reducerFilters = createSlice({
  name: "reducerProducts",
  initialState: stateInitial,
  reducers: {
    orderByAscDesc: (state, action) => {
      state.productsToFilter = orderPriceAndDimension(action.payload);
    },
    filterByCategoryOrType: (state, action) => {
      state.productsToFilter = action.payload;
    },
    cleanFilters: (state, action) => {
      state.productsToFilter = action.payload;
    },
    prevState: (state, action) => {
      state.productPrevState = action.payload;
    },
    getProductByName: (state, action) => {
      state.productsToFilter = action.payload;
    },
  }
});


export const getProductsByName = (name: any, allProducts: any) => async (dispatch: Function) => {
  let filterSearchedProduct = allProducts.map((product: any) => {
    if (product.name.toLowerCase().includes(name.toLowerCase())) return product;
  });
  filterSearchedProduct = filterSearchedProduct.filter((product: any) => product !== undefined);

  dispatch(reducerFilters.actions.getProductByName(filterSearchedProduct));
};

export const prepState = (objeto: IactionPayload) => (dispatch: Function) => {
  const o = arrfilterCategoryOrType(objeto);
  dispatch(reducerFilters.actions.prevState(o));
}

export const orderByAscDesc = (objeto: IactionPayload) => (dispatch: Function) => {
  dispatch(reducerFilters.actions.orderByAscDesc(objeto));
}

export const actionFilterByCategoryOrType = (objeto: IactionPayload) => (dispatch: Function) => {
  const o = arrfilterCategoryOrType(objeto);
  dispatch(reducerFilters.actions.filterByCategoryOrType(o));
}

export const cleanFilters = () => (dispatch: Function) => {
  dispatch(reducerFilters.actions.cleanFilters([]));
}


export default reducerFilters.reducer;
