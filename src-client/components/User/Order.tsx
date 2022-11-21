import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Ireducers } from "../../../lib/types";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import formatDate from "../../controllers/format-date";
import styles from "../../styles/Order.module.css";


export default function Orders(): JSX.Element {
  const router = useRouter()
  const dispatch: Function = useDispatch();
  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);


  useEffect(() => {
    if (myProfile?.email) dispatch(getUserDetail(myProfile.email));
  }, [dispatch, myProfile]);


  if (!myProfile) return <div className={styles.order__loading}>Loading...</div>;


  return (
    <div className={styles.order__container}>
      <h3 className={myProfile.orders[0] ? styles.order__title : styles.order_title_hidden}>My Orders</h3>
      {myProfile.orders[0] ?
        myProfile.orders?.map((elem) => {
          const { product } = elem;

          const myProductOrder = product?.map((elem) => {
            const myImage: string = typeof elem?.image?.[0].image === "string" ? elem.image[0].image : "loading";

            return (
              <div key={elem.id} className={styles.order__product_container}>
                <div className={styles.order__img_container}>
                  <Image 
                      src={myImage} 
                      width="300" 
                      height="300" 
                      alt={elem.name} 
                      className={styles.order__img}
                  />
                </div>
                <div className={styles.order__product_info}>
                  <h3 className={styles.order__product_name}>{elem.name.toLowerCase()}</h3>

                  <Link href={`/productDetail/${elem.id}`} className={styles.order__product_details}>
                      View product details
                  </Link>
                </div>
              </div>
            );
          });

          const mydate = `The purchase was made on the day ${formatDate(elem.date)}`;

          return (
            <div key={elem.date} className={styles.order__info_container}>
              <h3 className={styles.order__description}>{elem.description}</h3>

              <div className={styles.order__status}>
                  <span className={styles.order__span}>Status: </span>
                  {elem.status}
              </div>

              <div className={styles.order__date}>
                  <span className={styles.order__span}>Date: </span>
                  {mydate}
              </div>
              
              <div className={styles.order__total}>
                  <span className={styles.order__span}>Total: </span>
                  ${elem.total}
              </div>

              <div className={styles.order__product_center}>
                {myProductOrder}
              </div>
            </div>
          );
        })

        : 
        <div className={styles.empty_cart__container}>
          <p className={styles.empty_cart__message}>You haven&apos;t made a purchase yet.</p>
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
}
