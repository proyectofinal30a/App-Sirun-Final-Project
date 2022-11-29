
import Image from "next/image";
import styles from "../../../styles/AdminManageReviews.module.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as acction from '../../../redux/slice/admi-review-redux/all-review-adm-redux'
import { Ireducers } from '../../../../lib/types'
import cloudinaryOrUrl from '../../../controllers/detectionOfImage'
import Modal from 'react-modal'
export default function AdminReviews(): JSX.Element {
  const dispatch: Function = useDispatch()
  const [modalUser, setModalUser] = useState(false)
  const [modalProduct, setModalProduct] = useState(false)

  async function isOpenModalUser() {
    await dispatch(acction.cleanReviewUserAndProduc())
    setModalUser(!modalUser)
  }
  function isOpenModalInputUser() {
    setModalUser(!modalUser)
  }

  async function isOpenModalProduc() {
    await dispatch(acction.cleanReviewUserAndProduc())
    setModalProduct(!modalProduct)
  }

  useEffect(() => {
    dispatch(acction.getReviewAll())
    return () => reviewReact && dispatch(acction.cleanReviewAll())
  }, [])


  const { reviewReact, userReview, productReview } = useSelector((state: Ireducers) => state.reducerAdminReview)




  if (!reviewReact) return (
    <div className={styles.reviews_management__container}>
      <h1 className={styles.reviews_management__title}>Loading...</h1>
    </div>);


  const handleOnclikUser = (e: any) => {
    const name = e.target.name
    dispatch(acction.getUserReview(name))
    isOpenModalInputUser()
  }

  const handleOnclickProduct = (e: any) => {
    const name = e.target.name
    dispatch(acction.getProductReview(name))
    setModalProduct(!modalProduct)

  }


  return (

    <div className={styles.reviews_management__container}>
      <h1 className={styles.reviews_management__title}>Reviews management</h1>
      <input
        type="search"
        placeholder="Search by Product name or Username"
        autoComplete="on"
        name="name"
        onChange={(e) => { dispatch(acction.searchNameReviews(e.target.value)) }}
      />
      {reviewReact?.[0] ? reviewReact.map((review, index) => (
        <div key={index} >
          <div>
            <hr />
            <h4>Product</h4>
            <input type="button" name={review.product.id} value="view Product Reviews" onClick={handleOnclickProduct} />
            <p>{review.product.name}</p>
            <p>ID: {review.product.id}</p>
            <Image
              src={review.product.image[0].image}
              width='100'
              height='100'
              alt={review.product.name}
            />
          </div>
          <div>
            <h4>Evaluation</h4>
            <input
              type="button"
              value="x"
              name={review.id}
              onClick={(e: any) => dispatch(acction.removeReview(e.target.name))} />
            <p>Review: {review.review}</p>
            <p>Rating: {review.rating} ☆</p>
          </div>
          <div>
            <h4>User</h4>
            <input type="button" name={review.user.id} value="VIEW USER REVIEW ALL" onClick={handleOnclikUser} />
            <p>Name: {review.user.name}</p>
            <p>Email:  {review.user.email}</p>
            <p>ID:  {review.user.email}</p>
            <Image
              src={cloudinaryOrUrl(review.user.image, "client") || ''}
              width='100'
              height='100'
              alt={review.user.name}
            />
          </div>
          <hr />
        </div>

      )) : <div className={styles.reviews_management__container}>
        <h1 className={styles.reviews_management__title}>no products or users found</h1>
      </div>}

      <Modal
        isOpen={modalUser}
        onRequestClose={() => isOpenModalUser()}
        className={styles.modal}
        contentLabel="UserReview"
        ariaHideApp={false}

      >
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <input type="button" value="X" onClick={isOpenModalUser} />
        {userReview?.name &&
          <div>
            <h4>{userReview.name}</h4>
            <Image
              src={cloudinaryOrUrl(userReview.image, "client") || ''}
              width='100'
              height='100'
              alt={userReview.name}
            />
            {userReview.evaluations?.[0] ? userReview.evaluations.map((evalu, index) => (
              <div key={index}>
                <p>{evalu.product.name}</p>
                <Image
                  src={cloudinaryOrUrl(evalu.product.image, "client") || ''}
                  width='100'
                  height='100'
                  alt={userReview.name}
                />
                <p>Rating: {evalu.rating}</p>
                <p>Review: {evalu.review}</p>
              </div>
            )) : <div>Loading..</div>}
          </div>


        }

      </Modal>


      <Modal
        isOpen={modalProduct}
        onRequestClose={() => isOpenModalProduc()}
        className={styles.modal}
        contentLabel="ProductReview"
        ariaHideApp={false}

      >


        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <div>PADRE DAME MARGIN!!!!!</div>
        <input type="button" value="X" onClick={isOpenModalProduc} />
        {productReview?.name &&
          <div>
            <h4>{productReview.name}</h4>
            <Image
              src={cloudinaryOrUrl(productReview.image, "client") || ''}
              width='100'
              height='100'
              alt={productReview.name}
            />
            {productReview.evaluation.map((elem, index) => (
              <div key={index}>
                <p>{elem.user.name}</p>
                <Image
                  src={cloudinaryOrUrl(elem.user.image, "client") || ''}
                  width='100'
                  height='100'
                  alt={elem.user.name}
                />
                <p>Rating: {elem.rating}</p>
                <p>Reciew: {elem.review}</p>
              </div>

            ))}

          </div>


        }

      </Modal>

    </div>
  );
};

