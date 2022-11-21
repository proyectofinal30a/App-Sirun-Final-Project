import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Ireducers } from "../../../lib/types";
import { deleteReview } from "../../redux/slice/user-review/user-review-redux"
import { getUserDetail } from '../../redux/slice/user-detail-redux/user-redux'
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/ReviewAndRating.module.css";


const ReviewAndRating = () => {
  const router = useRouter();
  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);

  const dispatch: Function = useDispatch()
  useEffect(() => {
    myProfile?.email && dispatch(getUserDetail(myProfile.email));
  }, []);

  if (!myProfile) return <div className={styles.loading}>Loading...</div>;
  const { email } = myProfile;

  const { evaluations } = myProfile;
  if (!evaluations) return <div className={styles.loading}>Loading...</div>;


  const handleDelete = (id: string, email: string) => {
    dispatch(deleteReview(id));
    dispatch(getUserDetail(email))
  };


  return (
    <div className={styles.reviews__container}>
      <h1 className={evaluations[0] ? styles.reviews__title : styles.reviews__title_hidden}>My reviews</h1>

      {evaluations[0] ?
        evaluations?.map((elem) => {
          const { product } = elem;
          const { image } = product.image[0];
          const { id } = elem;
          return (
            <div className={styles.review__container} key={id}>
              <div key={elem.id} className={styles.reviews__review_container}>
                <div className={styles.reviews__img_container}>
                  <Image
                    src={image}
                    width="500"
                    height="500"
                    alt={product.name}
                    className={styles.reviews__img}
                  />
                </div>

                <div className={styles.reviews__info_container}>


                  <div className={styles.reviews__info}>
                    <div className={styles.first__line_container}>
                      <p className={styles.reviews__name}>
                        {product.name.toLowerCase()}
                      </p>
                      <button className={styles.delete__review} onClick={() => handleDelete(id, email)}>x</button>
                    </div>

                    <Link href={`/productDetail/${product.id}`} className={styles.reviews__details}>
                      View product details
                    </Link>
                  </div>

                  <p className={styles.reviews__review_message}>
                    <span className={styles.reviews__span}>Review message:</span>
                    {elem.review}
                  </p>


                  <div className={styles.reviews__rating_container}>
                    <span className={styles.reviews__span}>Rating:   </span>
                    <div className={styles.reviews__rating_value_container}>

                      {Array(5).fill(0).map(
                        (star: number, index: number) => {
                          const ratingValue = index + 1;
                          return (
                            <div key={index}>
                              <FaStar
                                className={
                                  ratingValue <= elem.rating
                                    ? styles.stars__filled
                                    : styles.stars__empthy
                                }
                              />
                            </div>
                          );
                        })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
        :
        <div className={styles.empty_cart__container}>
          <p className={styles.empty_cart__message}>You haven&apos;t made a review yet.</p>
          <button
            onClick={() => router.push("/products")}
            className={styles.empty_cart__btn}
          >
            View products
          </button>
        </div>
      }
    </div>
  );
};

export default ReviewAndRating;