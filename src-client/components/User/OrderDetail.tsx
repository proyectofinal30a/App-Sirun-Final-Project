import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Ireducers } from "../../../lib/types";
import { getOrder } from "../../redux/slice/payment/payment";
import styles from "../../styles/Order.module.css";


const OrderDetail = () => {
  const dispatch: Function = useDispatch();
  const { data, status } = useSession<boolean>();

  let idReference: string = window.location.pathname.split("/")[2];
  let email: string = typeof data?.user?.email === "string" ? data?.user?.email : "";
  let name: string = typeof data?.user?.name === "string" ? data?.user?.name : "";
  
  const orderInfo = useSelector<Ireducers>((state) => state.reducerAfterPayment.myOrder);

  
  useEffect(() => {
    if (idReference !== "" && email !== "") dispatch(getOrder({ idReference, email }));
  }, [email, idReference, dispatch]);

  console.log(orderInfo)
  if (!orderInfo) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.order__container}>
      <h3 className={orderInfo ? styles.order__title : styles.order_title_hidden}>
        Order <span>{idReference}</span>
      </h3>

      {/* {orderInfo &&
        <div>
          <div key={orderInfo.orders[0].id} className={styles.order__product_container}>
            <div className={styles.order__img_container}>
              <Image
                src={order.picture_url}
                width="300"
                height="300"
                alt={order.title}
                className={styles.order__img}
              />
            </div>
            <div className={styles.order__product_info_container}>
              <h3 className={styles.order__product_name}>
                {order.title.toLowerCase()}
              </h3>
              <p className={styles.order__product_info}>
                Quantity: {order.quantity}
              </p>
              <p className={styles.order__product_info}>
                Unit price: ${order.unit_price}
              </p>

            </div>
          </div>

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
              <span className={styles.order__span}>Total: </span>${elem.total}
            </div>

            <div className={styles.order__product_center}>{myProductOrder}</div>
          </div>
        </div>
      } */}
    </div>
  );
};

export default OrderDetail;
