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


    const dispatch: Function = useDispatch();


    useEffect(()=>{
      dispatch(getAllReviews(productId))
    },[dispatch, productId])


    
    const handleMouseOver= (value : any) => {
      setHoverValue(value)
    }
    
    
    const handleOnClick = (value: number) =>{ 
      // console.log(value);
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
      
      >
        Send
      </button>
    );
    
    const userIcon: any =
    status === "authenticated" ? <FaUserCheck /> : <FaUserTimes />;
    

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
           Array(5).fill(0).map((star : number, index : number)=>{
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
          <div key ={index} className={styles.listReviews__container}>
              <Image src={elem.user.image} className={styles.listReviews__avatar} alt="" width={200} height={200}/>
  
            <div className={styles.listReview__info}>
              <p>{elem.user.name.toUpperCase()}</p>
              <p>{elem.review}</p>
            </div>
            
            <div className={styles.listReviews__rating_container}>
          
           { elem.rating === 0 ?
            Array(1)?.fill(<FaStar className={styles.stars__empthy}/>)
             : Array(elem.rating).fill(<FaStar className={styles.stars__filled}/>)}
        


        </div>

            </div>
        )})}

      
    

    </div>
  );
};
