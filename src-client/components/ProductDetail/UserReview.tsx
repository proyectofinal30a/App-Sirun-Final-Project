import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTimes, FaUserCheck, FaStar } from "react-icons/fa";
import { IReview, Ireducers } from '../../../lib/types'
import { getAllReviews, addReview } from '../../redux/slice/user-review/user-review-redux'
import styles from "../../styles/UserReview.module.css";
import Image from "next/image"
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
export const UserReview = () => {


  const myReview: any = {
    review: "",
    rating: 0,
  }

  const { query } = useRouter();
  const productId: any = query.id;
  const { data, status }: any = useSession<boolean>();
  const [evaluation, setEvaluation] = useState<IReview>(myReview);
  const [hoverValue, setHoverValue] = useState(null)
  const listOfReviews = useSelector((state: Ireducers) => state.reducerUserReview.allReviews)

  const dispatch: Function = useDispatch();



  console.log(productId);

  useEffect(() => {
    dispatch(getAllReviews(productId))
  }, [productId, dispatch])




  const handleMouseOver = (value: any) => {
    setHoverValue(value)
  }


  const handleOnClick = (value: number) => {
    setEvaluation({ ...evaluation, rating: value })
  }


  const handleOnChangeText = (e: any) => {
    const { value, name } = e.target
    setEvaluation({ ...evaluation, [name]: value })
  }


  const handleOnSubmit = async (e: any) => {
    e.preventDefault()
    const userId = data?.user.email;

    const allData = {
      idUser: userId,
      idProduct: productId,
      review: evaluation.review,
      rating: evaluation.rating,
    }

    await addReview(allData)
    dispatch(getAllReviews(productId))
    setEvaluation(myReview)

  }


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
        disabled={evaluation.rating === 0 || evaluation.review === ""}
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
            Array(5).fill(0).map((star: number, index: number) => {
              const ratingValue = index + 1
              return (
                <div key={index}>
                  <input

                    type="radio"
                    name="rating"
                    value={ratingValue}
                    className={styles.rating__star_input}
                  />
                  <FaStar
                    onClick={() => handleOnClick(ratingValue)}
                    onMouseOver={() => handleMouseOver(ratingValue)}
                    onMouseLeave={() => setHoverValue(null)}
                    className={ratingValue <= (hoverValue || evaluation.rating) ? styles.rating__star : styles.rating__star_hover}
                  />
                </div>
              )
            })
          }
        </div>
      </div>

      <div className={styles.review__container_text}>
        <div className={styles.review__icon}>{userIcon}</div>
        <textarea
          name='review'
          value={evaluation.review}
          onChange={(e: any) => handleOnChangeText(e)}
          className={styles.review__description}
          placeholder={placeholder[evaluation.rating]}
          required
        ></textarea>
      </div>
      {signOrAddReview}



      {listOfReviews && listOfReviews?.map((elem, index: number) => {
        return (

          <div key={index} className={styles.listReviews__container}>
            <Image src={cloudinaryOrUrl(elem.user.image, 'client') || "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"} className={styles.listReviews__avatar} alt="" width={200} height={200} />

            <div className={styles.listReview__info}>
              <p>{elem.user.name.toUpperCase()}</p>
              <p>{elem.review}</p>
            </div>

            <div className={styles.listReviews__rating_container}>


              {
                Array(5).fill(0).map((star: number, index: number) => {
                  const ratingValue = index + 1
                  return (
                    <div key={index}>
                      <FaStar
                        className={ratingValue <= (elem.rating) ? styles.stars__filled : styles.stars__empthy}
                      />

                    </div>

                  )
                })

              }





            </div>

          </div>
        )
      })}

    </div>
  );
};