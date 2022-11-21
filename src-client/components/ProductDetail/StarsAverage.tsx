import React, { useState } from 'react'

import { FaStar } from "react-icons/fa";
import styles from "../../styles/UserReview.module.css";
import { Ievaluations } from '../../../lib/types';

interface IpropEva {
  evaluation: Ievaluations[]
  setActiveImage2: Function
  activeImage2: number
}


const Average = ({ evaluation, setActiveImage2, activeImage2 }: IpropEva) => {
  const [rating, setRating] = useState(0)

  if (!evaluation[0]) return (
    <div className={styles.average__container}>
      <p className={styles.review__average}>There are no reviews</p>
    </div>
  )

  const totalRating = evaluation.map((elem) => elem.rating).reduce((elem, acc: number) => elem + acc)
  console.log(totalRating, 'rating');


  setRating(Math.round(totalRating / evaluation.length))
  const averageTotal = Array(rating).fill(<FaStar key={Math.random()} className={styles.stars__filled} />)

  return (
    <div className={styles.average__container}>
      <p className={styles.review__average}>The rating average is {rating}</p>
      {averageTotal}

    </div>
  )
}

export default Average;


