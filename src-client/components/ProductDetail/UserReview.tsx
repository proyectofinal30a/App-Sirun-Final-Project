import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTimes, FaUserCheck, FaStar } from "react-icons/fa";
import {getReviews, addReview, IReview} from '../../redux/slice/user-review/user-review'
import styles from "../../styles/UserReview.module.css";


export const UserReview = () => {
    const { query } = useRouter();
    const producId = query.id;
    const { data: session, status }: any = useSession<boolean>();
    const userId = session?.user.id;

    const myReview : any  = {
      description : "",
      rating : 0,
      }

    const [review, setReview] = useState<IReview>(myReview);
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)
    
    console.log(review);
    
    // const listOfReviews : any = useSelector((state : any) => state.reducerUserReview.allreviews)
    // console.log(listOfReviews);
    const dispatch: Function = useDispatch();
    const stars = Array(5).fill(0);




const handleOnClick = (value : number) =>{
  setCurrentValue(value)
}

const handleMouseOver= (value : any) => {
  setHoverValue(value)
}

const handleMouseLeave = (undefiend : any) => {
  setHoverValue(undefined)
}

const handleOnChange = (e: any) => {
  const {value, name} = e.target
  setReview({...review, [name] : value})
}


const signOrAddReview: any =
    status === "unauthenticated" ? (
      <button onClick={() => signIn("auth0")} className={styles.review__btn}>
        Sign In
      </button>
    ) : (
      <button
        type="submit"
        onSubmit={(e) => handleOnSubmit(e)}
        className={styles.review__btn}
      >
        Send
      </button>
    );
    
    const userIcon: any =
    status === "authenticated" ? <FaUserTimes /> : <FaUserCheck />;
    
      const handleOnSubmit = (e: any) => {
          e.preventDefault()
          const allData = {
            description: myReview.description,
            rating : myReview.rating,
            productId : producId,
            userId : userId
          }

          console.log(allData);
          alert("Your review was succefully send")
    
         // dispatch(addReview(allData))
          setReview(myReview)
      };

  return (
    <div className={styles.review__container}>
      <h2 className={styles.review__title}>Reviews</h2>

  <div className={styles.rating__container}>
      {!session 
        ? <p className={styles.review__alert}>Please login to add a review</p>
        : <p className={styles.review__alert__ok}>Add your review!</p>
      }

 
 {/* // no me setea el estado de raiting
 // no puedo poner value en la tag del icono 
 // para eso uso la tag input extra que esta abajo
 // pero no me setea el estado de rating el onChange de la tag input 
 //porque esta en el icono */}


        <div className={styles.rating__stars_container} >
          {stars.map((_, index : number)=>{
            const value = index + 1
            return(
              <label htmlFor="rating" key ={index}>
                <input 
                type="radio" 
                id="rating" 
                name="rating" 
                value={value} 
                className={styles.rating__star_input}  
                />
                <FaStar 
                  name= "rating"
                  onChange = {(e: any)=> handleOnChange(index)}
                  onClick = { ()=> handleOnClick(value)}
                  onMouseOver ={()=>handleMouseOver(value)}
                  onMouseLeave = {()=>handleMouseLeave(undefined)}
                  className={(hoverValue || currentValue) > index ? styles.rating__star : styles.rating__star_hover}
                />
              </label>
            )
          })}

          </div>
        </div>
      <div className={styles.review__container_text}>
        <div className={styles.review__icon}>{userIcon}</div>
        <textarea
          name='description'
          value={review.description}
          onChange = {(e: any)=> handleOnChange(e)}
          className={styles.review__description}
          placeholder="Write your review..."
          required
        ></textarea>
        </div>    
        {signOrAddReview}
   

      {/* ZONA PARA RENDERIZAR CADA REVIEW */}
      {/* { listOfReviews && (listOfReviews.map((elem : any) => {
        return (
          <div key ={elem.id}>
          <p>{elem.review}</p>
          <p>{elem.raiting}</p>
          </div>

        )
      }) : (<p>No reviews for this product </p>)} */}

    </div>
  );
};
