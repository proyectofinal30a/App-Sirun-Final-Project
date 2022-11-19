import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTimes, FaUserCheck, FaStar } from "react-icons/fa";
import {getAllReviews, addReview, IReview} from '../../redux/slice/user-review/user-review'
import styles from "../../styles/UserReview.module.css";
import Image from "next/image"

export const UserReview = () => {
    
    const myReview : any  = {
      description : "",
      rating : 0,
    }

    const { query } = useRouter();
    const productId : any = query.id;    
    const { data, status }: any = useSession<boolean>();
    const [review, setReview] = useState<IReview>(myReview);
    const [hoverValue, setHoverValue] = useState(null)
    const listOfReviews : any = useSelector((state : any) => state.reducerUserReview.allReviews)
    console.log(listOfReviews)
console.log(Array.isArray(listOfReviews));


    const dispatch: Function = useDispatch();
    const stars = [1, 2, 3, 4, 5]

    useEffect(()=>{
      dispatch(getAllReviews(productId))
    },[dispatch, productId])


    
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
          idProduct : productId,
          review: review.description,
          rating : review.rating,
        }
       await addReview(allData)
       dispatch(getAllReviews(productId))
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
                  key ={index}
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
   
    
     { listOfReviews?.evaluation && listOfReviews.evaluation?.map((elem : any, index : number) => {
        return (
          <div key ={index}>
            <div className={styles.avatar__img_container}>
              <Image src={elem.user.image} alt="" width={200} height={200}/>
            </div>
            <div className={styles.review__info}>
              <p>{elem.user.name}</p>
              <p>{elem.review}</p>
            </div>
              <p>Rating: {elem.rating}</p>
            </div>
        )})}

      
    

    </div>
  );
};
