import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userData, IFavoriteUser } from "../../../../lib/types";
import userVerification from "../../../controllers/userVerification-controller";
import swal from 'sweetalert'

const favorite: IFavoriteUser = {
    favoriteId: [],
    saveFavorite: []
};

interface IidString {
    payload: string
}

interface IpayloadUserdata {
    payload: userData
}
interface IpayloadArrayIdfavorite {
    payload: string[]
}

export const reducerFavoriteUser = createSlice({
    name: "favoriteUser",
    initialState: favorite,
    reducers: {
        getFavoriteAccion: (state: IFavoriteUser, action: IpayloadArrayIdfavorite) => {
            state.favoriteId = action.payload
        },
        updateFavoriteAction: (state: IFavoriteUser, action: IidString) => {
            if (state.favoriteId?.includes(action.payload)) { //  aca 
                const myFilter = state.favoriteId.filter(e => e !== action.payload)
                state.favoriteId = myFilter
                return
            }
            const myNewArray = [...state.favoriteId, action.payload]
            state.favoriteId = myNewArray
        },
    },
});

export const deleteOneFavorite = (email: string, id: string) => async (dispatch: Function) => {
    try {
        if (typeof email !== 'string') return
        await axios({
            method: 'delete',
            url: `/api/userScope/delete/productLessFav`,
            data: { email, id }
        })

        dispatch(reducerFavoriteUser.actions.updateFavoriteAction(id))
    } catch (error) {
        console.log(error);


    }

}
export const updateFavorite = (stringArray: string[], email: string) => async (dispatch: Function) => {
    try {

        const mypackIdFavo = stringArray[0] ? stringArray.map(e => {
            return { id: e }
        }) : []
        const myToken: any = userVerification("client");
        await axios({
            method: "post",
            url: "/api/userScope/post/productAddFav",
            data: { email, mypackIdFavo },
            headers: { Authorization: myToken },
        });
        return

    } catch (error) {
        console.log(error);
    }
};


interface IuserUpdate {
    email: string
    name: string
    newImage: unknown
    deleteImage: string
}

export const addOneFavorite = (email: string, id: string) => async (dispatch: Function) => {
    try {
        if (typeof email !== 'string') return
        await axios({
            method: 'post',
            url: `/api/userScope/post/one-evalution-favorite`,
            data: { email, id }
        })

        dispatch(reducerFavoriteUser.actions.updateFavoriteAction(id))
    } catch (error) {
        console.log(error);
    }

}


export const addFavoriteRedux = (id: string) => (dispatch: Function) => {
    dispatch(reducerFavoriteUser.actions.updateFavoriteAction(id))
}


export const getfavoriteUser = (email: string) => async (dispatch: Function) => {
    try {
        if (typeof email !== 'string') return
        const myFavorite = await axios({
            method: 'get',
            url: `/api/userScope/get/favorite/${email}`,
        })
        const myArrayFavorite = myFavorite?.data ? myFavorite.data : []
        dispatch(reducerFavoriteUser.actions.getFavoriteAccion(myArrayFavorite))
    } catch (error) {
        console.log(error);


    }

}





export default reducerFavoriteUser.reducer