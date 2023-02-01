import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userVerification from "../../../controllers/userVerification-controller";
import { Iproduct, PackProducDetailRating } from '../../../lib/types'



const stateInit: PackProducDetailRating = {
  detail: {
    id: '',
    name: '',
    price: 0,
    dimension: 0,
    available: true,
    type: 'none',
    category: 'others',
    image: [],
    description: '',
    evaluation: []
  },
  rating: 0
};




// interface Iarray {
//   productDetail.image : string[]
// }
interface IpayloaReating {
  payload: number,
}

interface IpayloaProduc {
  payload: PackProducDetailRating,
}

interface IpayloaProducDeta {
  payload: Iproduct,
}


export const reducerProductDetail = createSlice({
  name: "rootReducer",
  initialState: stateInit,
  reducers: {
    getProductDetail: (state: PackProducDetailRating, action: IpayloaProducDeta) => {
      state.detail = action.payload;
    },
    cleanProductDetail: (state: PackProducDetailRating, action: IpayloaProduc) => {
      state = action.payload;
    },
    reducerRatingNumber: (state: PackProducDetailRating, action: IpayloaReating) => {
      state.rating = action.payload
    }
  },
});


export const getProductDetail = (id: string) => async (dispatch: Function) => {
  const myToken: any = userVerification("client");
  const data = await axios({
    method: "get",
    url: `/api/product/gets/detailById/${id}`,
    headers: {
      Authorization: myToken,
    },
  });
  const myDatailProdut: Iproduct = data.data

  myDatailProdut && dispatch(reducerProductDetail.actions.getProductDetail(myDatailProdut));

};


export const cleanProductDetail = () => (dispatch: Function) => {
  dispatch(reducerProductDetail.actions.cleanProductDetail(stateInit));
};


export const addReview = async (objectReview: any) => {
  try {
    const myToken: any = userVerification("client");
    await axios({
      method: "post",
      url: "/api/userScope/post/reviewRating",
      data: objectReview,
      headers: {
        Authorization: myToken,
      },
    });

  } catch (error) {
    console.log(error);

  }
}

export const getRatingNumber = (number: number) => (dispatch: Function) => {
  dispatch(reducerProductDetail.actions.reducerRatingNumber(number))
}



export default reducerProductDetail.reducer;
