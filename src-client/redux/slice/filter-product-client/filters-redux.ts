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
    saveAccion: (state, action) => {
      state.productPrevState = action.payload;
      state.productsToFilter = action.payload
    },
    filterByCategoryAction: (state, action) => {
      const firstFilter = state.productPrevState.filter((produ) => produ.category === action.payload)
      state.productsToFilter = firstFilter;
    },
    filterByTypeAction: (state, action) => {
      const secondFilter = state.productPrevState.filter((produ) => produ.type === action.payload)
      state.productsToFilter = secondFilter;
    },
    prevState: (state, action) => {
      state.productPrevState = action.payload;
    },
    getProductByName: (state, action) => {
      state.productsToFilter = action.payload;
    },
    filterDoubleAction: (state, action) => {
      const firstFilter = state.productPrevState.filter((produ) => produ.category === action.payload.category)
      const secondFilter = firstFilter.filter((produ) => produ.type === action.payload.type)
      state.productsToFilter = secondFilter
    },
    cleanFilterAccion: (state, action) => {
      state.productsToFilter = action.payload
      state.productPrevState = action.payload
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


export const saveProductFilter = (objeto: any) => (dispatch: Function) => {
  dispatch(reducerFilters.actions.saveAccion(objeto));
}

export const filterByCategory = (string: string) => (dispatch: Function) => {
  dispatch(reducerFilters.actions.filterByCategoryAction(string));
}

export const filterByType = (string: string) => (dispatch: Function) => {
  dispatch(reducerFilters.actions.filterByTypeAction(string));
}

export const filterDouble = (object) => (dispatch: Function) => {
  dispatch(reducerFilters.actions.filterDoubleAction(object));
}

export const cleanFilters = (products) => (dispatch: Function) => {
  dispatch(reducerFilters.actions.cleanFilterAccion(products));
}


export default reducerFilters.reducer;
