import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userVerification from "../../../controllers/userVerification-controller";
import fromJsonToArray from '../../../controllers/imageJson'
import { TypeDiet } from '@prisma/client'
//import switchIndex from '../../../controllers/switchIndex'

type Iproduct = {
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

interface IDetail {
  productDetail: Iproduct
}

const stateInit: IDetail = {
  productDetail: {}
}

// interface Iarray {
//   productDetail.image : string[]
// }



export const reducerProductDetail = createSlice({
  name: "rootReducer",
  initialState: stateInit,
  reducers: {
    getProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    cleanProductDetail: (state: any) => {
      state.productDetail = {};
    },
   
  },
});


export const getProductDetail = (id: string | string[] | undefined) => async (dispatch: Function) => {

  const myToken: any = userVerification('client')
  const { data } = await axios({
    method: 'get',
    url: `/api/product/gets/detailById/${id}`,
    headers: {
      "Authorization": myToken
    }
  });
  if(data){
    const lessJson = fromJsonToArray([data])[0]
    dispatch(reducerProductDetail.actions.getProductDetail(lessJson));
  }

};


export const cleanProductDetail = () => async (dispatch: Function) => {
  dispatch(reducerProductDetail.actions.cleanProductDetail());

};





export default reducerProductDetail.reducer;