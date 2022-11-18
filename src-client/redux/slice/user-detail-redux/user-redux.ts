import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iuser } from "../../../../lib/types";
const template: Iuser = {
    user: {}
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
        url: `/api/userScope/get/${email}`,
    });

    console.log(data);

    const myImage = { ...data, image: pars }


    dispatch(reducerUser.actions.getProducts(data));
}





export default reducerUser.reducer
