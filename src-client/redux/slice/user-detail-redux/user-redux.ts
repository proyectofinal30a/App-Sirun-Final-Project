import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface IIdProductFavo {
    id: string
    name: string
    image: string
}

type userData = {
    id?: number
    name?: string
    email?: string
    image?: string
    favorites?: IIdProductFavo[]
    direcciones?: []
    orders?: []
    evaluations?: []

}

interface IPayload {
    payload: userData
}

interface Iuser {
    user: userData
}

const template: Iuser = {
    user: {}
}

export const reducerUser = createSlice({
    name: 'reducerUser',
    initialState: template,
    reducers: {
        getProducts: (state: Iuser, action: any) => { return state.user = action.payload }
    }
})


export const getProducts = (email: string) => async (dispatch: Function) => {

    const { data }: any = await axios({
        method: 'get',
        url: `/api/get/${email}`,
    });

    console.log(data);


    dispatch(reducerUser.actions.getProducts(data));
}





export default reducerUser.reducer
