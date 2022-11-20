import { createSlice } from "@reduxjs/toolkit";
import userVerification from '../../../controllers/userVerification-controller'
import axios from "axios";





export interface IReview {
    idUser: string
    idProduct : string
    description: string
    rating : number
}

 interface Ireviews {
         allReviews: IReview[],
   }
  
   const reviews: Ireviews = {
     allReviews : [],
  }


export const reducerUserReview = createSlice({
    name: 'reducerUserReview',
    initialState: reviews,
    reducers: {
        getReviews : (state, action) => {
            state.allReviews = action.payload
        },
        deleteOneReview  : (state, action) => {
            state.allReviews = state.allReviews.filter((elem : any)=> elem.id !== action.payload)
        }
    }
})


export const getAllReviews = (id : string) => async (dispatch: Function) => {
    try{
      const myToken: any = await userVerification('client')
      const allReviews = await axios({
        method: 'get',
        url: `/api/userScope/get/productReview/${id}`,
        headers: {
          "Authorization": myToken
        }
    });

    dispatch(reducerUserReview.actions.getReviews(allReviews))

  } catch (error) {
    console.log(error);
    
}  
  }

    

  export const addReview = async (objectReview : any) => {
    try {
        const myToken: any = userVerification("client");
         const reviewData= await axios({
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

  export const deleteReview = (id : string) => async (dispatch: Function) => {
    
    try{
      console.log(id);
      const myToken: any = await userVerification('client')
    const deletedReview = await axios({
      method: 'post',
      url: `/api/userScope/delete/${id}`,
      headers: {
        "Authorization": myToken
      }
    });
    dispatch(reducerUserReview.actions.deleteOneReview(id))
    }catch(error){
    console.log(error)
    }
  };



export default reducerUserReview.reducer;