import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserBuyer, IitemForMercadoPago } from "../../../../lib/types";


interface ImyOrder {
  myOrder: {
    external_reference: string;
    total: string;
    status: string;
    date: string;
    delivery_time: string;
    user: IUserBuyer; 
    purchasedProducts: IitemForMercadoPago[];
  };
}


const initialState: ImyOrder = {
  myOrder: {
    external_reference: "",
    total: "",
    status: "",
    date: "",
    delivery_time: "",
    user: {
      email: "",
      name: "",
      address: {
        name_address: "",
        street_name: "",
        street_number: "",
        zip_code: "",
      },
      phone: {
        number: "",
        area_code: "",
      }
    },
    purchasedProducts: [],
  }
};


export const reducerAfterPayment = createSlice({
  name: "reducerAfterPayment",
  initialState: initialState,
  reducers: {
    getOrder: (state, action) => {
      state.myOrder = action.payload;
    },
  },
});


interface IidOrder {
  idReference: string;
  email: string;
}

export const getOrder = (orderInfo: IidOrder) => async (dispatch: Function) => {
  const { data } = await axios({
    method: "post",
    url: "api/userScope/post/email/searchReferencia",
    data: orderInfo,
  });

  dispatch(reducerAfterPayment.actions.getOrder(data));
};


export default reducerAfterPayment.reducer;
