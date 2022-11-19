import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iuser } from "../../../../lib/types";
import userVerification from "../../../controllers/userVerification-controller";


const template: Iuser = {
  user: {
    id: "",
    name: "",
    image: "",
    email: "",
    evaluations: [],
    orders: [],
    favorites: [],
    direcciones: [],
  },
};


export const reducerUser = createSlice({
  name: "reducerUser",
  initialState: template,
  reducers: {
    getProducts: (state: Iuser, action: any) => {
      state.user = action.payload;
      return;
    },

    addToFavorites: (state: Iuser, action) => {
      const foundProduct = state.user.favorites.find(product => product.id === action.payload.idProduct);
      if (foundProduct) return;
      state.user.favorites = action.payload;
    },

    removeFromFavorites: (state: Iuser, action) => {
      const foundProduct = state.user.favorites.find(product => product.id === action.payload.idProduct);
      if (!foundProduct) return;
      state.user.favorites = state.user.favorites.filter(product => product.id !== action.payload.idProduct);
    },
  },
});


export const getUserDetail = (email: any) => async (dispatch: Function) => {
  const { data }: any = await axios({
    method: "get",
    url: `/api/userScope/get/userAll/${email}`,
  });

  dispatch(reducerUser.actions.getProducts(data));
};


export const addToFavorites = async (idUser: string, idProduct: string) => {
  try {
    const myToken: any = userVerification("client");
    const { data }: any = await axios({
      method: "post",
      url: "/api/userScope/post/productAddFav",
      data: { idUser, idProduct },
      headers: { Authorization: myToken },
    });

    console.log(data)

  } catch (error) {
    console.log(error);
  }
};


export const removeFromFavorites = async (idUser: string, idProduct: string) => {
  console.log({ userId: idUser, productId: idProduct });
  try {
    const myToken: any = userVerification("client");
    const { data } =  await axios({
      method: "delete",
      url: "/api/userScope/delete/productLessFav",
      data: { idUser, idProduct },
      headers: { Authorization: myToken },
    });

    console.log(data) 
  } catch (error) {
    console.log(error);
  }
};


export default reducerUser.reducer;
