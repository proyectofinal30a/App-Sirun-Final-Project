import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserBuyer, IitemForMercadoPago } from "../../../../lib/types";
// import userVerification from "../../../controllers/userVerification-controller";


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
  idReference: string | string[] | undefined;
  email: string;
}

export const getOrder = (orderInfo: IidOrder) => async (dispatch: Function) => {
  const { data } = await axios({
    method: "get",
    url: "api/userScope/get/email/searchReferencia",
    data: orderInfo,
  });
  
  console.log(data);

  dispatch(reducerAfterPayment.actions.getOrder(data));
};


export default reducerAfterPayment.reducer;
