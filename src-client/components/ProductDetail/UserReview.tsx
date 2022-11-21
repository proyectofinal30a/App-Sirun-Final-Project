import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTimes, FaUserCheck, FaStar } from "react-icons/fa";
import { Ireducers } from '../../../lib/types'
import styles from "../../styles/UserReview.module.css";
import Image from "next/image"
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import { getProductDetail, addReview } from "../../redux/slice/products-client/Product-detail-redux";
export const UserReview = () => {

  interface review {
    review: string,
    rating: number,
  }


  const myReview: review = {
    review: "",
    rating: 0,
  }

  const { data, status } = useSession<boolean>();
  const [input, setInput] = useState<review>(myReview);
  const [hoverValue, setHoverValue] = useState(null)
  const listOfReviews = useSelector((state: Ireducers) => state.reducerProductDetail.detail)


  if (!listOfReviews) return <div>loading...</div>

  const { id, evaluation } = listOfReviews

  const dispatch: Function = useDispatch();

  const handleMouseOver = (value: any) => {
    setHoverValue(value)
  }


  const handleOnClick = (value: number) => {
    setInput({ ...input, rating: value })
  }


  const handleOnChangeText = (e: any) => {
    const { value, name } = e.target
    setInput({ ...input, [name]: value })
  }


  const handleOnSubmit = async (e: any) => {
    e.preventDefault()
    const userId = data?.user.email;

    const allData = {
      idUser: userId,
      idProduct: id,
      review: input.review,
      rating: input.rating,
    }

    await addReview(allData)

    typeof id === 'string' && dispatch(getProductDetail(id))
    setInput(myReview)

  }


  const signOrAddReview = status === "unauthenticated" ? (
    <button onClick={() => signIn("auth0")} className={styles.review__btn}>
      Sign In
    </button>
  ) : (
    <button
      type="submit"
      onClick={(e) => handleOnSubmit(e)}
      className={styles.review__btn}
      disabled={input.rating === 0 || input.review === ""}
    >
      Send
    </button>
  );


  const userIcon =
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
                    className={ratingValue <= (hoverValue || input.rating) ? styles.rating__star : styles.rating__star_hover}
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
          value={input.review}
          onChange={(e: any) => handleOnChangeText(e)}
          className={styles.review__description}
          placeholder={placeholder[input.rating]}
          required
        ></textarea>
      </div>
      {signOrAddReview}



      {evaluation && evaluation?.map((elem, index: number) => {
        return (

          <div key={index} className={styles.listReviews__container}>
            <Image src={cloudinaryOrUrl(elem.user.image, 'client') || "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"} className={styles.listReviews__avatar} alt={elem.user.name} width={200} height={200} />

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