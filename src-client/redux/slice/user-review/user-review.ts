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
         reviewDetail : {},
   }
  
   const reviews: Ireviews = {
     allReviews : [],
    reviewDetail : {},
  }


export const reducerUserReview = createSlice({
    name: 'reducerUserReview',
    initialState: reviews,
    reducers: {
        getAllReviews : (state, action) => {
            state.allReviews = action.payload
        },
        getOneReview : (state, action) => {
            state.reviewDetail = action.payload
        },
        deleteOneReview  : (state, action) => {
            state.allReviews = state.allReviews.filter((elem : any)=> elem.id !== action.payload)
        }
    }
})


export const getReviews = () => async (dispatch: Function) => {
    try{
      const myToken: any = await userVerification('client')
    const allReviews = await axios({
      method: 'get',
      url: '/api/userScope/reviewRatingLess/',
      headers: {
        "Authorization": myToken
      }
    });
    //console.log(allReviews.data);
    
         dispatch(reducerUserReview.actions.getAllReviews(allReviews));
    }catch(error){
    console.log(error)
    }
  };




  export const getReviewDetail = (id : string) => async (dispatch: Function) => {
    try{
      const myToken: any = await userVerification('client')
    const oneReview = await axios({
      method: 'get',
      url: `/api/reviews/${id}`,
      headers: {
        "Authorization": myToken
      }
    });
    //console.log(oneReview.data);
    
         dispatch(reducerUserReview.actions.getOneReview(oneReview));
    }catch(error){
    console.log(error)
    }
  };


  export const addReview = async (objectReview : any) => {
    console.log(objectReview);
    try {
        const myToken: any = await userVerification("client");
         const reviewData= await axios({
            method: "post",
            url: "/api/userScope/post/reviewRaiting",
            data: objectReview,
            headers: {
            Authorization: myToken,
    },
  });

    } catch (error) {
        console.log(error);
        
    }
  } 




//   export const deleteReview = (id : string) => async (dispatch: Function) => {
//     try{
//       const myToken: any = await userVerification('client')
//     const deletedReview = await axios({
//       method: 'post',
//       url: `/api/userScope/reviewRaitinfLess/${id}`,
//       headers: {
//         "Authorization": myToken
//       }
//     });

//          dispatch(reducerUserReview.actions.deleteOneReview(id));
//     }catch(error){
//     console.log(error)
//     }
//   };








// {
//     "evaluation": [
//       {
//         "user": {
//           "name": "mailin",
//           "image": "https://s.gravatar.com/avatar/c8ce5d850ee98d51b3b2c8ac5bb5ff0c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png"
//         },
//         "rating": 10,
//         "review": "ESTA MALISIMA"
//       },
//       {
//         "user": {
//           "name": "userexample",
//           "image": "https://s.gravatar.com/avatar/a91c0e3b6069ef0acbf5e93cab76f81b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fus.png"
//         },
//         "rating": 1,
//         "review": "ESTA MALISIMA"
//       }
//     ]
//   }



export default reducerUserReview.reducer;