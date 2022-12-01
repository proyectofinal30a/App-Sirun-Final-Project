import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IadminManagement, Iorder } from "../../../../lib/types";

const initialState: IadminManagement = {
  usersOrders: [],
  usersOrdersAutoSave: [],
};

export const reducerAdminManagement = createSlice({
  name: "reducerAdminManagement",
  initialState: initialState,
  reducers: {
    getUsersOrders: (state, action) => {
      state.usersOrders = action.payload;
      state.usersOrdersAutoSave = action.payload;
    },
    autoSaveOrders: (state, action) => {
      state.usersOrdersAutoSave = action.payload;
      state.usersOrders = state.usersOrdersAutoSave;
    },
    filterOrders: (state, action) => {
      if (state.usersOrders.length === state.usersOrdersAutoSave.length) {
        state.usersOrders = state.usersOrders.filter(order => order.status === action.payload);
        return;
      }
      state.usersOrders = state.usersOrdersAutoSave;
      state.usersOrders = state.usersOrders.filter(order => order.status === action.payload);
    },
    restoreAllOrders: (state) => {
      state.usersOrders = state.usersOrdersAutoSave;
    },
    sortOrders: (state, action) => {
      if (action.payload === "asc") state.usersOrders.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0);
      if (action.payload === "desc") state.usersOrders.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
    },
    changeOrderStatus: (state, action) => {
      const ordersUpdated = state.usersOrdersAutoSave.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload;
        }
        return order;
      })
      state.usersOrdersAutoSave = ordersUpdated;
      state.usersOrders = ordersUpdated;
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
    data = data.sort((a: Iorder, b: Iorder) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

    dispatch(reducerAdminManagement.actions.getUsersOrders(data));


  } catch (error) {
    console.log(error);
  }
};

export const restoreAllOrders = () => (dispatch: Function) => {
  dispatch(reducerAdminManagement.actions.restoreAllOrders());
}

export const filterOrders = (value: string) => (dispatch: Function) => {
  dispatch(reducerAdminManagement.actions.filterOrders(value));
}

export const sortOrders = (value: string) => (dispatch: Function) => {
  dispatch(reducerAdminManagement.actions.sortOrders(value));
}

interface Ipayload {
  orderId: string;
  orderStatus: string;
}

export const changeOrderStatus = (orderInfo: Ipayload) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: "put",
      url: "/api/adminScope/put/updateOrderStatus",
      data: orderInfo,
    });

    dispatch(reducerAdminManagement.actions.changeOrderStatus(data));

    if (orderInfo.orderStatus === 'in_transit') {
      const { data } = await axios({
        method: "post",
        url: "/api/adminScope/post/send-email-status-in-proccess",
        data: { orderId: orderInfo.orderId }
      })
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}


export default reducerAdminManagement.reducer;
