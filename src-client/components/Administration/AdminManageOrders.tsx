import styles from "../../styles/AdminManageOrders.module.css";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../redux/slice/admin-management-redux/admin-management";
import { getAllUsers } from "../../redux/slice/user-detail-redux/all-users";
import { Ireducers } from "../../../lib/types";


const AdminManageOrders = () => {
  const dispatch: Function = useDispatch();
  
  useEffect(() => {
    dispatch(getUsersOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  
  const usersOrders = useSelector((state: Ireducers) => state.reducerAdminManagement.usersOrders);
  const users = useSelector((state: Ireducers) => state.reducerAllUsers.allUsers);
  if (!usersOrders[0] || !users[0]) return <div className={styles.loading}>Loading...</div>

  // console.log(usersOrders)
  // console.log(users)
  // const usersIds = usersOrders?.map(order => order.id_user);
  // console.log(usersIds)

  // const userOfTheOrder = users.filter(user => user.id !== order.id_user);
  // console.log(userOfTheOrder)

  return (
    <div className={styles.orders_management__container}>
      <h1 className={styles.orders_management__title}>Orders management</h1>
  
      {usersOrders[0] &&
      usersOrders?.map(order => {
        return (
          <div key={order.date} className={styles.orders_management__order_container}>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Costumer:{" "}</span>
              {order.id_user}
            </p>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Date:{" "}</span>
              {order.date.toLocaleString()}
            </p>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Delivery time:{" "}</span>
              {order.delivery_time}
            </p>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Description:{" "}</span>
              {order.description}
            </p>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Status:{" "}</span>
              {order.status}
            </p>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Delivery address:{" "}</span>
              {/* {order.address} */}
            </p>
            <p className={styles.orders_management__order_info}>
              <span className={styles.orders_management__order_span}>Total:{" "}</span>
              ${order.total}
            </p>
            {order.purchasedProducts?.map(product => {
              return (
                <div key={product.id}>
                  <div className={styles.orders_management__product_img_container}>
                    <Image 
                      src={product.picture_url}
                      alt={product.title}
                      height="200"
                      width="200"
                      className={styles.orders_management__product_img}
                    />
                  </div>
                  <div className={styles.orders_management__product_info_container}>
                    <p className={styles.orders_management__product_info}>{product.title}</p>
                    <p className={styles.orders_management__product_info}>Quantity: {product.quantity}</p>
                    <p className={styles.orders_management__product_info}>Unit price: ${product.unit_price}</p>
                    <p className={styles.orders_management__product_info}>Subtotal: ${product.subTotal}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
};

export default AdminManageOrders;
