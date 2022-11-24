import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userData } from "../../../../lib/types";

interface IallUsers {
  allUsers: userData[];
  usersByName: userData[];
}

const initialState: IallUsers = {
  allUsers: [],
  usersByName: [],
};

export const reducerAllUsers = createSlice({
  name: "reducerAllUsers",
  initialState: initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    getUsersByName: (state, action) => {
      state.usersByName = action.payload;
    },

    clearUserSearch: (state, action) => {
      state.usersByName = action.payload;
    },
  },
});

export const getAllUsers = () => async (dispatch: Function) => {
  const { data } = await axios({
    method: "get",
    url: `/api/adminScope/get/users`,
  });

  dispatch(reducerAllUsers.actions.getAllUsers(data));
};

export const getUsersByName = (searchedString: string, allUsers: userData[]) => async (dispatch: Function) => {
  let filterSearchedUser = allUsers.map((user: userData) => {
    if (
      user.name.toLowerCase().includes(searchedString.toLowerCase()) || 
      user.role.toLowerCase().includes(searchedString.toLowerCase()) ||
      user.email.toLowerCase().includes(searchedString.toLowerCase()) ||
      user.id.toLowerCase().includes(searchedString.toLowerCase())
      ) return user;
  }
  );
  filterSearchedUser = filterSearchedUser.filter(user => user !== undefined);

  dispatch(reducerAllUsers.actions.getUsersByName(filterSearchedUser));
};

export const clearUserSearch = () => async (dispatch: Function) => {
  dispatch(reducerAllUsers.actions.clearUserSearch(initialState.usersByName));
};


export default reducerAllUsers.reducer;
