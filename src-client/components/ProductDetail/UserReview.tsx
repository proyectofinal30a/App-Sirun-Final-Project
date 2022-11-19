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
    
    const { data, status }: any = useSession<boolean>();
    console.log(data, status);


    const myReview : any  = {
      description : "",
      rating : 0,
      }

    const [review, setReview] = useState<IReview>(myReview);
    // const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(null)
    
    console.log(review);
    
    // const listOfReviews : any = useSelector((state : any) => state.reducerUserReview.allreviews)
    // console.log(listOfReviews);
    const dispatch: Function = useDispatch();
    const stars = [1, 2, 3, 4, 5]



    
    const handleMouseOver= (value : any) => {
      setHoverValue(value)
    }
    
    
    const handleOnClick = (value: number) =>{ 
      console.log(value);
      setReview({... review, rating : value})
    }


const handleOnChangeText = (e: any) => {
  const {value, name} = e.target
  setReview({...review, [name] : value})
}


const handleOnSubmit = async(e: any) => {
    e.preventDefault()
    const userId = data?.user.email;

    const allData = {
      idUser : userId,
      idProduct : producId,
      review: review.description,
      rating : review.rating,
    }

    console.log(allData);
    await addReview(allData)
    setReview(myReview)
};

const signOrAddReview: any =
    status === "unauthenticated" ? (
      <button onClick={() => signIn("auth0")} className={styles.review__btn}>
        Sign In
      </button>
    ) : (
      <button
        type="submit"
        onClick={(e) => handleOnSubmit(e)}
        className={styles.review__btn}
        // disabled={Object.values(myReview).length !== 0}
      >
        Send
      </button>
    );
    
    const userIcon: any =
    status === "authenticated" ? <FaUserTimes /> : <FaUserCheck />;
    

      const placeholder = [
        "Please select a rating",
        "Why did you give this product 1 star?",
        "What is wrong with this product?",
        "How could this product be improved?",
        "What is your opinion?",
        "Why are you still here? Go buy it!"
      ]


  return (
    <div className={styles.review__container}>
      <h2 className={styles.review__title}>Reviews</h2>

  <div className={styles.rating__container}>
      {!data
        ? <p className={styles.review__alert}>Please login to add a review</p>
        : <p className={styles.review__alert__ok}>Add your review!</p>
      }

        <div className={styles.rating__stars_container} >
        {
           stars.map((star : number, index : number)=>{
            const ratingValue = index + 1
            return(
              <>
                <input 
                 key ={star}
                  type="radio" 
                  name="rating" 
                  value={ratingValue} 
                  className={styles.rating__star_input}  
                />
                <FaStar
                  onClick = {()=>handleOnClick(ratingValue)}
                  onMouseOver ={()=>handleMouseOver(ratingValue)}
                  onMouseLeave = {()=>setHoverValue(null)}
                  className={ ratingValue <=  (hoverValue || review.rating) ? styles.rating__star : styles.rating__star_hover}
                   
                />
            
            </>
            )
          })
        }
    
         

          </div>
        </div>
      <div className={styles.review__container_text}>
        <div className={styles.review__icon}>{userIcon}</div>
        <textarea
          name='description'
          value={review.description}
          onChange = {(e: any)=> handleOnChangeText(e)}
          className={styles.review__description}
          placeholder={ placeholder[review.rating] }
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
