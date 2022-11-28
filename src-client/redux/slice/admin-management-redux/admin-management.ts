import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IadminManagement, Iorder } from "../../../../lib/types";

const initialState: IadminManagement = {
  usersOrders: [],
  usersOrdersToFilter: [],
  usersReviews: [],
};

export const reducerAdminManagement = createSlice({
  name: "reducerAdminManagement",
  initialState: initialState,
  reducers: {
    getUsersOrders: (state, action) => {
      state.usersOrders = action.payload;
      state.usersOrdersToFilter = action.payload;
    },
    filterOrders: (state, action) => {
      state.usersOrdersToFilter = action.payload;
    },
    sortOrders: (state, action) => {
      state.usersOrdersToFilter = action.payload;
    },
    // changeOrderStatus: (state, action) => {
    //   state.usersOrders = action.payload;
    // },

    getUsersReviews: (state, action) => {
      state.usersOrders = action.payload;
    },
    deleteReview: (state, action) => {
      state.usersReviews = state.usersReviews.filter((review) => review.id !== action.payload);
    },
  },
});


export const getUsersOrders = () => async (dispatch: Function) => {
  try {
    let { data } = await axios({
      method: "get",
      url: "/api/adminScope/get/orders",
    });
    data = data.filter((order: Iorder) => order.status !== "pending");

    dispatch(reducerAdminManagement.actions.getUsersOrders(data));
  } catch (error) {
    console.log(error);
  }
};

export interface Ipayload {
  state: Iorder[],
  value: string
}

export const filterOrders = (o: Ipayload) => {
  const data = o.state.filter((order: Iorder) => order.status !== o.value);
  console.log(data)
  reducerAdminManagement.actions.getUsersOrders(data);
}

export const getUsersReviews = () => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: "get",
      url: "/api/adminScope/get/reviews",
    });
    // console.log(data)
    dispatch(reducerAdminManagement.actions.getUsersReviews(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `/api/adminScope/delete/review/${id}`,
    });
    // console.log(data)
    dispatch(reducerAdminManagement.actions.deleteReview(id));
  } catch (error) {
    console.log(error);
  }
};

export default reducerAdminManagement.reducer;
