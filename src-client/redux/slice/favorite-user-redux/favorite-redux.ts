import { createSlice, current } from "@reduxjs/toolkit";
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
            if (state.favoriteId.includes(action.payload)) {
                const myFilter = state.favoriteId.filter(e => e !== action.payload)
                state.favoriteId = myFilter
                return
            }
            const myNewArray = [...state.favoriteId, action.payload]
            state.favoriteId = myNewArray
        },
    },
});




export const updateFavorite = async (stringArray: string[], email: string) => {
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