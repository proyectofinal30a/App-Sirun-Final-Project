import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface IIdProductFavo {
    id: string
}

type userData = {
    id?: number
    name: string
    email: string
    image: string
    favorites_products_id: IIdProductFavo[]
    direcciones?: JSON
    orders?: JSON
    evaluations?: JSON

}

interface IPayload {
    payload: userData[]
}

type user = {
    users: userData[]
}

const template: user = {
    users: []
}

export const reducerUser = createSlice({
    name: 'reducerUser',
    initialState: template,
    reducers: {
        getProducts: (state: user, action: IPayload) => { state.users = action.payload }
    }
})



//FUNCIONES ACA ABAJO!!!!!!!!!!!
export const getProducts = () => async (dispatch: Function) => {
    const { data } = await axios({
        method: 'get',
        url: 'https://ruta-apiiii/1/posts',
    });

    dispatch(reducerUser.actions.getProducts(data));
}

// export const findOrCreateUser = (email:string, full_name:string) => async(dispatch:Function) => {
//     try {       
//         const user:any = await axios.post('/api/users/posts/verifyOrCreate', {email})
//         dispatch(rootReducer.actions.findOrCreateUser(user))
//     } catch (error:any) {
//         alert(error.message)
//     }
// }



export default reducerUser.reducer
