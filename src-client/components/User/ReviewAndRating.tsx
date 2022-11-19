import React from "react";
import { useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import Link from "next/link";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import styles from "../../styles/ReviewAndRating.module.css";


const ReviewAndRating = () => {
  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);

  if (!myProfile) return <div className={styles.loading}>Loading...</div>;

  const { evaluations } = myProfile;

  if (!evaluations) return <div className={styles.loading}>Loading...</div>;


  return (
    <div className={styles.reviews__container}>
      <h1 className={styles.reviews__title}>My reviews</h1>

      {evaluations?.map((elem) => {
        const { product } = elem;
        const { image } = product.image[0];

        return (
          <div key={elem.id} className={styles.reviews__review_container}>
            <div className={styles.reviews__img_container}>
              <Image
                src={image}
                width="300"
                height="300"
                alt={product.name}
                className={styles.reviews__img}
              />
            </div>

            <div className={styles.reviews__info_container}>
              <div className={styles.reviews__info}>
                <p className={styles.reviews__name}>
                  {product.name.toLowerCase()}
                </p>

                <Link href={`/productDetail/${product.id}`} className={styles.reviews__details}>
                  View product details
                </Link>
              </div>

              <p className={styles.reviews__review_message}>
                <span className={styles.reviews__span}>Review message: </span>
                {elem.review}
              </p>

              <div className={styles.reviews__rating_container}>
                <span className={styles.reviews__span}>Rating: </span>
                <div className={styles.reviews__rating_value_container}>
                  <p className={styles.reviews__rating}>{elem.rating}</p>
                  <p className={styles.reviews_rating_star_icon}><AiFillStar /></p>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAndRating;
