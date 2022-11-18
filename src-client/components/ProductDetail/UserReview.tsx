import React, {useEffect} from 'react'
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import {useDispatch} from 'react-redux';
import {FaUserTimes, FaUserCheck} from "react-icons/fa";
//import {addReview} from ''

export const UserReview = () => {

    const { data: session, status } : any = useSession<boolean>();
    const dispatch : Function = useDispatch();

    const handleAddReview = (e : any) => {
        //dispatch(addReview)
    }

    const signOrAddReview: any = session ? (
          <button onClick={() => signIn("auth0")}>Sign In</button>
      ): (
        <button onClick={(e)=> handleAddReview(e)}></button>
      );

      const userIcon : any = session ? <FaUserTimes/> : <FaUserCheck/>

  return (
    <div>
        <h2>Reviews</h2>
        <p>Please login for add a review</p>
        <div>
            {userIcon}
            <textarea></textarea>
        </div>
       {signOrAddReview}
    </div>
  )
}
