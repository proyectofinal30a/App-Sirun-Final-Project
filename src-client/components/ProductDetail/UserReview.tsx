import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { FaUserTimes, FaUserCheck } from "react-icons/fa";
//import {addReview} from ''
import styles from "../../styles/UserReview.module.css";

interface Iid {
  id: string;
}

export const UserReview = ({ id }: Iid) => {
  const { data: session, status }: any = useSession<boolean>();
  const dispatch: Function = useDispatch();

  const handleAddReview = (e: any) => {
    //dispatch(addReview)
  };

  const signOrAddReview: any =
    status === "unauthenticated" ? (
      <button onClick={() => signIn("auth0")} className={styles.review__btn}>
        Sign In
      </button>
    ) : (
      <button
        type="submit"
        onSubmit={(e) => handleAddReview(e)}
        className={styles.review__btn}
      >
        Send
      </button>
    );

  const userIcon: any =
    status === "authenticated" ? <FaUserTimes /> : <FaUserCheck />;

  return (
    <div className={styles.review__container}>
      <h2 className={styles.review__title}>Reviews</h2>

      {!session 
        ? <p className={styles.review__alert}>Please login to add a review</p>
        : <p className={styles.review__alert__ok}>Add your review!</p>
      }

      <div className={styles.review__container_text}>
        <div className={styles.review__icon}>{userIcon}</div>
        <textarea
          className={styles.review__description}
          placeholder="Write your review..."
          required
        ></textarea>
      </div>

      {signOrAddReview}
    </div>
  );
};
