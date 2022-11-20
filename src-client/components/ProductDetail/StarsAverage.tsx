import React from 'react'
import { useSelector } from "react-redux";
import {FaStar } from "react-icons/fa";
import styles from "../../styles/UserReview.module.css";

const Average = () => {
  const listOfReviews : any = useSelector((state : any) => state.reducerUserReview.allReviews)

 
 let totalRating = 0
  listOfReviews?.evaluation?.map((elem : any)=>{
      totalRating = elem.rating + totalRating;
  })

  const reviewsAlreadyFind = listOfReviews?.evaluation?.length ? Math.round(totalRating / listOfReviews?.evaluation?.length) : 0



 const averageTotal = Array(reviewsAlreadyFind)?.fill(<FaStar key={Math.random()} className={styles.stars__filled}/>)
 
  return (
    <div className={styles.average__container}>
      <p className={styles.review__average}>The rating average is {reviewsAlreadyFind}</p> 
      {averageTotal} 
  
    </div>
  )
}

export default Average;


