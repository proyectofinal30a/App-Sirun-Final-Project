import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { userData, IUserDetail } from "../../../../lib/types";
import userVerification from "../../../controllers/userVerification-controller";
import swal from 'sweetalert'

const template: IUserDetail = {
    user: {
        id: "",
        name: "",
        image: "",
        email: "",
        evaluations: [],
        orders: [],
        favorites: [],
        addresses: [],
        role: '',
    }
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

export const reducerUser = createSlice({
    name: "reducerUser",
    initialState: template,
    reducers: {
        getUserDetaill: (state: IUserDetail, action: IpayloadUserdata) => {
            state.user = action.payload;
            return;
        },
        addToFavorites: (state: IUserDetail, action: any) => {
            console.log(action)
            if (!state.user) return
            const foundProduct = state.user.favorites.find(product => product.id === action.payload.id);
            if (foundProduct) {
                const newState = state.user.favorites.filter((fav) => fav.id !== action.payload.id);
                state.user.favorites = newState
                return
            };
            state.user.favorites.push(action.payload);
        },
        deleteOneReview: (state: IUserDetail, action: IidString) => {
            state.user.evaluations = state.user.evaluations.filter((elem) => elem.id !== action.payload)
        },
        deleteAddress: (state: IUserDetail, action: IidString) => {
            state.user.addresses = state.user.addresses.filter((elem) => elem.id !== action.payload)
        },
    },
});


export const getUserDetail = (email: string | undefined) => async (dispatch: Function) => {
    try {
        if (email === undefined) return
        const data = await axios({
            method: "get",
            url: `/api/userScope/get/userAll/${email}`,
        });
        const myUser: userData = data.data

        interface myPending {
            idReferenceArray: string[]
            email: string
            name: string
        }

        const myPending: myPending = {
            idReferenceArray: [],
            email: myUser.email,
            name: myUser.name
        }
        const myStatus = myUser && myUser.orders.map((ele) => {
            if (ele.status === 'pending') {
                myPending.idReferenceArray.push(ele.id)
                return ele
            }

            return { ...ele, purchase_link: '' }
        })

        myPending.idReferenceArray[0] && myPending.idReferenceArray.forEach(async (id) => {
            const mypack = {
                idReference: id,
                email: myUser.email,
                name: myUser.name
            }

    const myResponse =     await axios({
                method: "post",
                url: '/api/userScope/post/email-back-order/request-status-order',
                data: mypack,
            })

            console.log(myResponse.data);
        
        })



        const myUserOrder = { ...myUser, orders: myStatus }
        dispatch(reducerUser.actions.getUserDetaill(myUserOrder));
    } catch (error) {
        console.log(error);

    }


};

interface parameter {
    idAdress: string
    idUser: string
}
export const deleteAddress = (id: string) => async (dispatch: Function) => {
    try {

        await axios({
            method: 'delete',
            url: `/api/userScope/delete/deleteAddress`,
            data: { id }
        })
        dispatch(reducerUser.actions.deleteAddress(id))
    } catch (error) {
        console.log(error);


    }

}


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


export const addToFavorites = (productToAdd: any) => (dispatch: Function) => {
    return dispatch(reducerUser.actions.addToFavorites(productToAdd));
};


export const requestAddToFavorites = async (idUser: string, favorites: any) => {
    try {
        const myToken: any = userVerification("client");
        await axios({
            method: "post",
            url: "/api/userScope/post/productAddFav",
            data: { idUser, favorites },
            headers: { Authorization: myToken },
        });

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
export const changePassword = (email: string) => async (dispatch: Function) => {
    try {
        const user: any = await axios.post('/api/adminScope/put/changePassword', {
            email,
        })
        swal('Success', 'Check your email inbox to reset your password', 'success')
    } catch (error) {
        return error
    }
}


export default reducerUser.reducer;
