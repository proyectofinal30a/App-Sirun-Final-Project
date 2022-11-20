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
<<<<<<< HEAD
    name: "reducerUser",
    initialState: template,
    reducers: {
        getProducts: (state: Iuser, action: any) => {
            state.user = action.payload;
            return;
        },
=======
  name: "reducerUser",
  initialState: template,
  reducers: {
    getUserDetail: (state: Iuser, action: any) => {
      state.user = action.payload;
      return;
    },
>>>>>>> develop

        addToFavorites: (state: Iuser, action) => {
            const foundProduct = state.user.favorites.find(product => product.id === action.payload.idProduct);
            if (foundProduct) return;
            state.user.favorites = action.payload;
        },

        removeFromFavorites: (state: Iuser, action) => {
            const foundProduct = state.user.favorites.find(product => product.id === action.payload.idProduct);
            if (!foundProduct) return;
            state.user.favorites = state.user.favorites.filter(product => product.id !== action.payload.idProduct);
        }

    },
});


export const getUserDetail = (email: any) => async (dispatch: Function) => {
    const { data }: any = await axios({
        method: "get",
        url: `/api/userScope/get/userAll/${email}`,
    });

<<<<<<< HEAD
    dispatch(reducerUser.actions.getProducts(data));
=======
  dispatch(reducerUser.actions.getUserDetail(data));
>>>>>>> develop
};


export const addToFavorites = async (idUser: string, idProduct: string) => {
<<<<<<< HEAD
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
=======
  try {
    const myToken: any = userVerification("client");
    const { data }: any = await axios({
      method: "post",
      url: "/api/userScope/post/productAddFav",
      data: { idUser, idProduct },
      headers: { Authorization: myToken },
    });
    
  } catch (error) {
    console.log(error);
  }
>>>>>>> develop
};

////edit user
interface IuserUpdate {
    email: string
    name: string
    newImage: unknown
    deleteImage: string
}



export const postImageServerUsert = async ({ email, name, newImage, deleteImage }: IuserUpdate) => {
    try {
        const formData: any = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", process.env.CLOUDINARY_USER_PROFILE);
        const { data } = await axios({
            method: "post",
            url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload`,
            data: formData,
        });

        const { public_id, secure_url } = data;
        const myFracmet: string = public_id.split("/")[1];
        const myImage = `${myFracmet}<=>${secure_url}`
        const myPack = {
            email,
            name,
            image: myImage,
            deleteImage
        }
        await axios({
            method: 'post',
            url: `/api/userScope/put/user`,
            data: myPack
        });
    } catch (error) {
        console.log(error);

    }
}


export const removeFromFavorites = async (idUser: string, idProduct: string) => {
<<<<<<< HEAD
    console.log({ userId: idUser, productId: idProduct });
    try {
        const myToken: any = userVerification("client");
        const { data } = await axios({
            method: "delete",
            url: "/api/userScope/delete/productLessFav",
            data: { idUser, idProduct },
            headers: { Authorization: myToken },
        });

        console.log(data)
    } catch (error) {
        console.log(error);
    }
=======
  try {
    const myToken: any = userVerification("client");
    const { data } =  await axios({
      method: "delete",
      url: "/api/userScope/delete/productLessFav",
      data: { idUser, idProduct },
      headers: { Authorization: myToken },
    });

  } catch (error) {
    console.log(error);
  }
>>>>>>> develop
};


export default reducerUser.reducer;
