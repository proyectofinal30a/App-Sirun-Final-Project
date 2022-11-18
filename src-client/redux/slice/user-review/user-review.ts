import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const reviews = {

}

export const reducerUserReview = createSlice({
    name: 'reducerUserReview',
    initialState: reviews,
    reducers: {
    
    }
})



// api/userScope/reviewRatingLess/${id}
// api/reviews/${id}
// ruta para el post por query
//   {data} data.evaluation
//   /api/userScope/delete/reviewRatingLess/${id}


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