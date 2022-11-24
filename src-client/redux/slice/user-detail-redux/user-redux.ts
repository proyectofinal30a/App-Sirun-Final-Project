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

interface IidString {
    payload: string
}


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
        deleteOneReview: (state: Iuser, action: IidString) => {
            state.user.evaluations = state.user.evaluations.filter((elem) => elem.id !== action.payload)
        },

    },
});


export const getUserDetail = (email: string | undefined) => async (dispatch: Function) => {
    try {
        if (email === undefined) return
        const { data }: any = await axios({
            method: "get",
            url: `/api/userScope/get/userAll/${email}`,
        });

        dispatch(reducerUser.actions.getProducts(data));

    } catch (error) {
        console.log(error);

    }

};


export const deleteReview = (id: string) => async (dispatch: Function) => {
    try {
        const myToken: any = await userVerification('client')
        await axios({
            method: 'delete',
            url: `/api/userScope/delete/${id}`,
            headers: {
                "Authorization": myToken
            }
        });
        dispatch(reducerUser.actions.deleteOneReview(id))
    } catch (error) {
        console.log(error)
    }
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

    } catch (error) {
        console.log(error);
    }
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
    try {
        const myToken: any = userVerification("client");
        const { data } = await axios({
            method: "delete",
            url: "/api/userScope/delete/productLessFav",
            data: { idUser, idProduct },
            headers: { Authorization: myToken },
        });

    } catch (error) {
        console.log(error);
    }

};


export default reducerUser.reducer;
