import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iuser } from "../../../../lib/types";
const template: Iuser = {
    user: {
        name: '',
        image: '',
        email: '',
        evaluations: [],
        orders: [],
        favorites: [],
        direcciones: [],
    }
}

export const reducerUser = createSlice({
    name: 'reducerUser',
    initialState: template,
    reducers: {
        getProducts: (state: Iuser, action: any) => {

            state.user = action.payload
            return
        }
    }
})


export const getUserDetail = (email: any) => async (dispatch: Function) => {
    const { data }: any = await axios({
        method: 'get',
        url: `/api/userScope/get/userAll/${email}`,
    });

    console.log(data);

    dispatch(reducerUser.actions.getProducts(data));
}

////edit user
interface IuserUpdate {
    email: string
    name: string
    newImage: unknown
}


export const postImageServerUsert = ({ email, name, newImage }: IuserUpdate) => async (dispatch: Function) => {
    const { data } = await axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/dqhbskhe7/image/upload",
        data: newImage,
    });

    const { public_id, secure_url } = data;
    const myFracmet: string = public_id.split("/")[1];

    const myPack = {
        email,
        name,
        image: 
}


    await axios({
        method: 'post',
        url: `/api/userScope/put/user/`,
        data:
    });
}





export default reducerUser.reducer
