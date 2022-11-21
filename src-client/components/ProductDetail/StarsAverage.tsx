import React, { useState } from 'react'

import { FaStar } from "react-icons/fa";
import styles from "../../styles/UserReview.module.css";
import { Ievaluations } from '../../../lib/types';

interface IpropEva {
  evaluation: Ievaluations[]
}


const Average = ({ evaluation }: IpropEva) => {

  if (!evaluation[0]) return (
    <div className={styles.average__container}>
      <p className={styles.review__average}>There are no reviews</p>
    </div>
  )

  const totalRating = evaluation.map((elem) => elem.rating).reduce((elem, acc: number) => elem + acc)
  console.log(totalRating, 'rating');

  const myRating = (Math.round(totalRating / evaluation.length))
  console.log(myRating);
  const myArray: any = []

  for (let i = 0; i < myRating; i++) {
    myArray.push(<FaStar key={i} className={styles.stars__filled} />)
  }

  return (
    <div className={styles.average__container}>
      {myArray}

    </div>
  )
}

export default Average;


