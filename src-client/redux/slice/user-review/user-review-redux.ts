import { createSlice } from "@reduxjs/toolkit";
import userVerification from '../../../controllers/userVerification-controller'
import axios from "axios";
import { IReview } from '../../../../lib/types'




interface Ireviews {
  allReviews: IReview[],
}
const reviews: Ireviews = {
  allReviews: [],
}

interface Ipayload {
  payload: string,
}
interface IpayloadAll {
  payload: IReview[],
}

export const reducerUserReview = createSlice({
  name: 'reducerUserReview',
  initialState: reviews,
  reducers: {
    getReviews: (state: Ireviews, action: IpayloadAll) => {
      state.allReviews = action.payload
    },
    deleteOneReview: (state: Ireviews, action: Ipayload) => {
      state.allReviews = state.allReviews.filter((elem) => elem.id !== action.payload)
    }
  }
})


export const getAllReviews = (id: string) => async (dispatch: Function) => {
  try {
    const myToken: any = await userVerification('client')
    const data = await axios({
      method: 'get',
      url: `/api/userScope/get/productReview/${id}`,
      headers: {
        "Authorization": myToken
      }
    });
    const myData: IReview[] = data.data
    dispatch(reducerUserReview.actions.getReviews(myData))
  } catch (error) {
    console.log(error);

  }
}



export const addReview = async (objectReview: any) => {
  try {
    const myToken: any = userVerification("client");
    await axios({
      method: "post",
      url: "/api/userScope/post/reviewRating",
      data: objectReview,
      headers: {
        Authorization: myToken,
      },
    });

  } catch (error) {
    console.log(error);

  }
}

export const deleteReview = (id: string) => async (dispatch: Function) => {

  try {
    const myToken: any = await userVerification('client')
    const deletedReview = await axios({
      method: 'post',
      url: `/api/userScope/delete/${id}`,
      headers: {
        "Authorization": myToken
      }
    });
    dispatch(reducerUserReview.actions.deleteOneReview(id))
  } catch (error) {
    console.log(error)
  }
};



export default reducerUserReview.reducer;