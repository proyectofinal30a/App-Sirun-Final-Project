import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Ireducers } from "../../../lib/types";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import formatDate from "../../controllers/format-date";
import styles from "../../styles/Order.module.css";
import { useSession } from "next-auth/react";

export default function Orders(): JSX.Element {
  const router = useRouter()
  const dispatch: Function = useDispatch();
  const orderAll = useSelector((state: Ireducers) => state.reducerUser.user.orders);
  const { data, status } = useSession()

  useEffect(() => {
    data?.user.email && dispatch(getUserDetail(data?.user.email));
  }, []);

  if (status === 'unauthenticated') router.push('/')
  console.log(orderAll);

  if (!Array.isArray(orderAll) ||   !orderAll[0]) return <div className={styles.order__loading}>Loading...</div>;


  return (
    <div className={styles.order__container}>
      <h3 className={orderAll?.[0] ? styles.order__title : styles.order_title_hidden}>My Orders</h3>
      {orderAll ?
        orderAll?.map((elem) => {
          const { purchasedProducts } = elem;

          const myProductOrder = purchasedProducts?.map((item) => {
            return (
              <div key={item.id} className={styles.order__product_container}>
                <div className={styles.order__img_container}>
                  <Image
                    src={item.picture_url}
                    width="300"
                    height="300"
                    alt={item.title}
                    className={styles.order__img}
                  />
                </div>
                <div className={styles.order__product_info_container}>
                  <h3 className={styles.order__product_name}>{item.title.toLowerCase()}</h3>
                  <p className={styles.order__product_info}>Quantity: {item.quantity}</p>
                  <p className={styles.order__product_info}>Unit price: ${item.unit_price}</p>

                  <Link href={`/productDetail/${item.id}`} className={styles.order__product_details}>
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
