import Image from "next/image";
import styles from "../../../styles/AdminManageReviews.module.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as acction from "../../../redux/slice/admi-review-redux/all-review-adm-redux";
import { Ireducers } from "../../../../lib/types";
import cloudinaryOrUrl from "../../../controllers/detectionOfImage";
import Modal from "react-modal";


export default function AdminReviews(): JSX.Element {
  const dispatch: Function = useDispatch();
  const [modalUser, setModalUser] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);

  async function isOpenModalUser() {
    await dispatch(acction.cleanReviewUserAndProduc());
    setModalUser(!modalUser);
  }

  function isOpenModalInputUser() {
    setModalUser(!modalUser);
  }

  async function isOpenModalProduc() {
    await dispatch(acction.cleanReviewUserAndProduc());
    setModalProduct(!modalProduct);
  }


  useEffect(() => {
    dispatch(acction.getReviewAll());
    return () => reviewReact && dispatch(acction.cleanReviewAll());
  }, []);


  const { reviewReact, userReview, productReview } = useSelector((state: Ireducers) => state.reducerAdminReview);

  if (!reviewReact)
    return (
      <div className={styles.reviews_management__container}>
        <h1 className={styles.reviews_management__title}>Loading...</h1>
      </div>
    );


  const handleOnclikUser = (e: any) => {
    const name = e.target.name;
    dispatch(acction.getUserReview(name));
    isOpenModalInputUser();
  };


  const handleOnclickProduct = (e: any) => {
    const name = e.target.name;
    dispatch(acction.getProductReview(name));
    setModalProduct(!modalProduct);
  };


  return (
    <div className={styles.reviews_management__container}>
      <h1 className={styles.reviews_management__title}>Reviews management</h1>
      <input
        type="search"
        placeholder="Search by product or username"
        autoComplete="on"
        name="name"
        className={styles.reviews_management__search_input}
        onChange={(e) => {
          dispatch(acction.searchNameReviews(e.target.value));
        }}
      />
      {reviewReact?.[0] ? (
        reviewReact.map((review, index) => (
          <div key={index} className={styles.reviews_management__review_container}>

            <div className={styles.reviews_management__sub_container}>
              <h4 className={styles.reviews_management__sub_title}>Product</h4>
              <input
                type="button"
                name={review.product.id}
                value="View all reviews from this product"
                className={styles.input_btn}
                onClick={handleOnclickProduct}
              />

              <p className={styles.name_capitalize}>{review.product.name.toLowerCase()}</p>
              <p>ID: {review.product.id}</p>

              <div className={styles.reviews_management__img_container}>
                <Image
                  src={review.product.image[0].image}
                  width="100"
                  height="100"
                  alt={review.product.name}
                  className={styles.reviews_management__img}
                />
              </div>
            </div>

            <div className={styles.reviews_management__sub_container}>

              <p className={styles.reviews_management__sub_title}>Evaluation</p>
              <input
                type="button"
                value="X"
                name={review.id}
                className={styles.input_close_btn}
                onClick={(e: any) =>
                  dispatch(acction.removeReview(e.target.name))
                }
              />

              <p className={styles.space_top}>Review: {review.review}</p>
              <p>Rating: {review.rating} ☆</p>
            </div>

            <div className={styles.reviews_management__sub_container}>
              <p className={styles.reviews_management__sub_title}>User</p>

              <input
                type="button"
                name={review.user.id}
                value="View all reviews from this user"
                className={styles.input_btn}
                onClick={handleOnclikUser}
              />

              <p>Name: {review.user.name}</p>
              <p>Email: {review.user.email}</p>
              <p>ID: {review.user.email}</p>

              <div className={styles.reviews_management__img_container}>
                <Image
                  src={cloudinaryOrUrl(review.user.image, "client") || ""}
                  width="100"
                  height="100"
                  alt={review.user.name}
                  className={styles.reviews_management__img}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.reviews_management__container}>
          <h1 className={styles.reviews_management__title}>
            No products or users found
          </h1>
        </div>
      )}

      {/* REVIEWS MODAL FROM SPECIFIC USER */}
      <Modal
        isOpen={modalUser}
        onRequestClose={() => isOpenModalUser()}
        className={styles.modal}
        contentLabel="UserReview"
        ariaHideApp={false}
      >
        <div className={styles.modal_content_container}>
          <input 
            type="button" 
            value="X" 
            onClick={isOpenModalUser} 
            className={styles.modal_input_close_btn}
          />
          {userReview?.name && (
            <div className={styles.modal__info_container}>
              <h4 className={styles.reviews_management__sub_title}>
                Username: {userReview.name}
              </h4>

              <div className={styles.reviews_management__img_container_modal}>
                <Image
                  src={cloudinaryOrUrl(userReview.image, "client") || ""}
                  width="100"
                  height="100"
                  alt={userReview.name}
                  className={styles.reviews_container__img_modal}
                />
              </div>

              {userReview.evaluations?.[0] ? (
                userReview.evaluations.map((evalu, index) => (
                  <div key={index} className={styles.modal__user_info}>
                    <p className={styles.modal_username}>
                      Product: {evalu.product.name}
                    </p>

                    <div className={styles.reviews_management__img_container_modal}>
                      <Image
                        src={cloudinaryOrUrl(evalu.product.image, "client") || ""}
                        width="100"
                        height="100"
                        alt={userReview.name}
                        className={styles.reviews_container__img_modal}
                      />
                    </div>

                    <p className={styles.space_top}>Rating: {evalu.rating}</p>
                    <p>Review: {evalu.review}</p>
                  </div>
                ))
              ) : (
                <div className={styles.loading}>Loading..</div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* REVIEWS MODAL FROM SPECIFIC PRODUCT */}
      <Modal
        isOpen={modalProduct}
        onRequestClose={() => isOpenModalProduc()}
        className={styles.modal}
        contentLabel="ProductReview"
        ariaHideApp={false}
      >
        <div className={styles.modal_content_container}>
          <input 
            type="button" 
            value="X" 
            className={styles.modal_input_close_btn}
            onClick={isOpenModalProduc} 
          />

          {productReview?.name && (
            <div className={styles.modal__info_container}>
              <p className={styles.reviews_management__sub_title}>
                Product: {productReview.name}
              </p>

                <div className={styles.reviews_management__img_container_modal}>
                  <Image
                    src={cloudinaryOrUrl(productReview.image, "client") || ""}
                    width="100"
                    height="100"
                    alt={productReview.name}
                    className={styles.reviews_management__img_modal}
                  />
                </div>
            
              {productReview.evaluation.map((elem, index) => (
                <div key={index} className={styles.modal__user_info}>
                  <p className={styles.modal_username}>
                    Username: {elem.user.name}
                  </p>

                  <div className={styles.reviews_management__img_container_modal}>
                    <Image
                      src={cloudinaryOrUrl(elem.user.image, "client") || ""}
                      width="100"
                      height="100"
                      alt={elem.user.name}
                      className={styles.reviews_management__img_modal}
                    />
                  </div>

                  <p className={styles.space_top}>Rating: {elem.rating}</p>
                  <p>Review: {elem.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
