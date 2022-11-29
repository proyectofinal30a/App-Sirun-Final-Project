import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IreviewAll, IreviewRedux, IuserReview, IProductReview } from "../../../../lib/types";

const initialState: IreviewRedux = {
    reviewSave: [],
    reviewReact: [],
    userReview: null,
    productReview: null
}

interface IpayloandSave {
    payload: IreviewAll[]
}

interface IpayloadString {
    payload: string
}

interface IpayloandUserReview {
    payload: IuserReview
}

interface IpayloandProductReview {
    payload: IProductReview
}
export const reducerAdminReview = createSlice({
    name: "reducerAdminReview",
    initialState: initialState,
    reducers: {
        getReviewAllAccion: (state: IreviewRedux, action: IpayloandSave) => {
            state.reviewSave = action.payload;
            state.reviewReact = action.payload;
        },
        cleanReviewAllAccion: (state: IreviewRedux) => {
            state = initialState;
        },
        removeReviewAccion: (state: IreviewRedux, action: IpayloadString) => {
            const filterState = state.reviewSave.filter(e => e.id !== action.payload)
            state.reviewReact = filterState;
            state.reviewSave = filterState;
        },
        getUserReviewAccion: (state: IreviewRedux, action: IpayloandUserReview) => {
            state.userReview = action.payload;

        },
        getProductReviewAccion: (state: IreviewRedux, action: IpayloandProductReview) => {
            state.productReview = action.payload;

        },
        cleanReviewUserAndProducAcccion: (state: IreviewRedux) => {
            state.userReview = null;
            state.productReview = null;
        },
        getByName: (state: IreviewRedux, action: IpayloadString) => {
            if (action.payload !== '') {
                const filterStateProducts = state.reviewSave.filter(e => e.product.name.toLowerCase().includes(action.payload))
                const filterStateUsers = state.reviewSave.filter(e => e.user.name.toLowerCase().includes(action.payload))
                const filterStater = filterStateProducts[0] ? filterStateProducts : filterStateUsers
                state.reviewReact = filterStater;
                return
            }
            state.reviewReact = state.reviewSave;
        },
    },
});



export const getReviewAll = () => async (dispatch: Function) => {
    try {
        const data = await axios({
            method: "get",
            url: "/api/adminScope/get/review-admin/reviews-all",
        });
        if (!data.data) return
        const reviewAll: IreviewAll[] = data.data;

        dispatch(reducerAdminReview.actions.getReviewAllAccion(reviewAll));
    } catch (error) {
        console.log(error);
    }
};


export const getUserReview = (id: string) => async (dispatch: Function) => {
    try {
        const data = await axios({
            method: "get",
            url: `/api/adminScope/get/review-admin/userReview/${id}`,
        });
        if (!data.data) return
        const userReview: IuserReview = data.data
        dispatch(reducerAdminReview.actions.getUserReviewAccion(userReview));
    } catch (error) {
        console.log(error);
    }
};



export const getProductReview = (id: string) => async (dispatch: Function) => {
    try {


        const data = await axios({
            method: "get",
            url: `/api/adminScope/get/review-admin/productReviewAll/${id}`,
        });
        if (!data.data) return
        const userReview: IProductReview = data.data

        dispatch(reducerAdminReview.actions.getProductReviewAccion(userReview));
    } catch (error) {
        console.log(error);
    }
};

export const cleanReviewAll = () => async (dispatch: Function) => {
    dispatch(reducerAdminReview.actions.cleanReviewAllAccion())
}

export const cleanReviewUserAndProduc = () => (dispatch: Function) => {
    dispatch(reducerAdminReview.actions.cleanReviewUserAndProducAcccion())
}

export const removeReview = (id: string) => async (dispatch: Function) => {
    try {
        await axios({
            method: "delete",
            url: `/api/adminScope/delete/review/${id}`,
        });

        dispatch(reducerAdminReview.actions.removeReviewAccion(id))

    } catch (error) {
        console.log(error);
    }

}


export const searchNameReviews = (string: string) => async (dispatch: Function) => {
    dispatch(reducerAdminReview.actions.getByName(string.toLowerCase()))
}







export default reducerAdminReview.reducer;
