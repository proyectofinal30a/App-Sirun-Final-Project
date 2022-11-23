import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userVerification from "../../../controllers/userVerification-controller";


interface ImyOrder {
  myOrder: {
    
  },
};

const initialState: ImyOrder = {
  myOrder: {},
};


export const reducerAfterPayment = createSlice({
  name: "reducerUser",
  initialState: initialState,
  reducers: {
    getOrder: (state, action) => {},
  },
});

export const getOrder = (id) => async (dispatch: Function) => {
  const { data }: any = await axios.get(`/${id}`);
  console.log(data)
  dispatch(reducerAfterPayment.actions.getOrder(data));
};

export default reducerAfterPayment.reducer;