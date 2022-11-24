import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserBuyer, IitemForMercadoPago } from "../../../../lib/types";
import userVerification from "../../../controllers/userVerification-controller";

interface IidOrder {
  orderId: string;
  userEmail: string;
}

interface ImyOrder {
  myOrder: {
    external_reference: string;
    total: string;
    status: string;
    date: string;
    delivery_time: string;
    user: IUserBuyer; // revisar type
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
        streetName: "",
        streetNumber: 0,
        zipCode: 0,
      },
      phone: {
        number: 0,
        area_code: 0,
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


export const getOrder = (orderInfo: IidOrder) => async (dispatch: Function) => {
  const { data } = await axios({
    method: "get",
    url: "/userScope/get/order", // revisar url cuando Eze termine
    data: orderInfo,
  });
  console.log(data);
  dispatch(reducerAfterPayment.actions.getOrder(data));
};


export default reducerAfterPayment.reducer;
