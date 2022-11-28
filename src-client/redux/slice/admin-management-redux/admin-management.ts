import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { IadminManagement } from "../../../../lib/types";

const initialState: IadminManagement = {
  usersOrders: [],
  usersReviews: [],
};

export const reducerAdminManagement = createSlice({
  name: "reducerAdminManagement",
  initialState: initialState,
  reducers: {
    getUsersOrders: (state, action) => {
      state.usersOrders = action.payload;
    },
    getUsersReviews: (state, action) => {
      state.usersOrders = action.payload;
    },
    // deleteReview: (state, action) => {
    //   state.usersReviews = state.usersReviews.filter((review) => review.id !== action.payload);
    // },
    // changeOrderStatus: (state, action) => {
    //   state.usersOrders = action.payload;
    // },
  },
});

export const getUsersOrders = () => async (dispatch: Function) => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/api/adminScope/get/orders",
      });
    //   console.log(data)

      dispatch(reducerAdminManagement.actions.getUsersOrders(data));
    } catch (error) {
      console.log(error);
    }
  };


export const getUsersReviews = () => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: "get",
      url: "/api/adminScope/get/reviews",
    });
    console.log(data)

    dispatch(reducerAdminManagement.actions.getUsersReviews(data));
  } catch (error) {
    console.log(error);
  }
};

// export const deleteReview = (id: string) => async (dispatch: Function) => {
//   try {
//     const { data } = await axios({
//       method: "delete",
//       url: `/api/adminScope/delete/orders/${id}`,
//     });
//     console.log(data)

//     dispatch(reducerAdminManagement.actions.deleteReview(id));
//   } catch (error) {
//     console.log(error);
//   }
// };

export default reducerAdminManagement.reducer;
