import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iuser } from "../../../../lib/types";
// import userVerification from "../../../controllers/userVerification-controller";


interface IallUsers {
  allUsers: Iuser[];
  usersByName: Iuser[];
}

const initialState: IallUsers = {
  allUsers: [],
  usersByName: []
};


export const reducerAllUsers = createSlice({
  name: "reducerAllUsers",
  initialState: initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    getUserByName: (state, action) => {
      const foundUser = state.allUsers.find((user) => user.user.name === action.payload.name);
      if (!foundUser) return;
      state.allUsers = action.payload;
    },
  },
});


export const getAllUsers = () => async (dispatch: Function) => {
  const { data }: any = await axios({
    method: "get",
    url: `/api/adminScope/get/users`,
  });

  console.log(data)
  dispatch(reducerAllUsers.actions.getAllUsers(data));
};


export const getUserByName = (name: string) => async (dispatch: Function) => {
  try {
    const { data }: any = await axios({
      method: "get",
      url: `/api/adminScope/get/usersByName/${name}`,
    });

    console.log(data)
    dispatch(reducerAllUsers.actions.getUserByName(name));
  } catch (error) {
    console.log(error);
  }
};


export default reducerAllUsers.reducer;
