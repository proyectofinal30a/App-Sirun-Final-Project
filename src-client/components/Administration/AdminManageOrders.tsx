import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Ireducers, Iorder } from "../../../lib/types";
import formatDate from "../../controllers/format-date";
import { filterOrders, getUsersOrders, restoreAllOrders, sortOrders, changeOrderStatus } from "../../redux/slice/admin-management-redux/admin-management";
import styles from "../../styles/AdminManageOrders.module.css";


const AdminManageOrders = () => {
  const dispatch: Function = useDispatch();
  const usersOrders = useSelector((state: Ireducers) => state.reducerAdminManagement.usersOrders);
  const [selectedValue, setSelectedValue] = useState({
    statusSelection: "",
    dateSort: "",
  });


  useEffect(() => {
    dispatch(getUsersOrders());
  }, []);
  

  const handleStatusSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedValue({
      statusSelection: value,
      dateSort: "",
    });
    if (value === "") {
      return dispatch(restoreAllOrders());
    };
    dispatch(filterOrders(value));
  }


  const handleDateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue({
      ...selectedValue,
      dateSort: value,
    });
    dispatch(sortOrders(value));
  }


  const clearFilters = () => {
    dispatch(restoreAllOrders());
    setSelectedValue({
      statusSelection: "",
      dateSort: "",
    })
  }


  // const changeStatus = (e) => {
  //   const { value } = e.target;
  //   dispatch(changeOrderStatus());
  //   dispatch(getUsersOrders());
  // }


  return (
    <div className={styles.orders_management__container}>
      <h1 className={styles.orders_management__title}>Orders management</h1>

      <div className={styles.orders_management__select_container}>
        <select 
          name="statusSelection" 
          value={selectedValue.statusSelection} 
          onChange={handleStatusSelection} 
          className={styles.orders_management__select}
        >
          <option value="" disabled>Filter by status</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_process">In process</option>
          <option value="canceled">Canceled</option>
          <option value="fulfilled">Fulfilled</option>
        </select>

        <select 
          name="dateSort" 
          value={selectedValue.dateSort} 
          onChange={handleDateSort} 
          className={styles.orders_management__select}
        >
          <option value="" disabled>Order by date</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button className={styles.clear_filters_btn} onClick={clearFilters}>Clear filters</button>
      </div>

      <div className={styles.orders_management__orders_container}>
        {usersOrders[0] &&
          usersOrders?.map((order: Iorder) => {
            return (
              <div key={order.id} className={styles.orders_management__order_container}>
                <p className={styles.orders_management__order_identifier}>
                  <span className={styles.orders_management__order_span}>Order reference id:{" "}</span>
                  {order.id}
                </p>

                <div className={styles.orders_management__order_status_container}>
                  <div className={styles.orders_management__order_status}>
                    <span className={styles.orders_management__order_span}>Order status:{" "}</span>
                    <p className={styles.status}>{order.status}</p>
                  </div>
                  <button className={styles.change_status_btn}>Change status</button>
                </div>

                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Costumer name:{" "}</span>
                  {order.user?.name}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Costumer email:{" "}</span>
                  {order.user?.email}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Costumer phone:{" "}</span>
                  +{order.addressOrder?.phone?.area_code}{" "}{order.addressOrder?.phone?.number}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Order date:{" "}</span>
                  {formatDate(order.date)}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Delivery time:{" "}</span>
                  {order.delivery_time}
                </p>

                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Delivery address:{" "}</span>
                  {order.addressOrder?.street_name}{" "}{order.addressOrder?.street_number}{", "}{order.addressOrder?.zip_code}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Total:{" "}</span>
                  ${order.total}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Products: </span>
                </p>

                {order.purchasedProducts?.map(product => {
                  return (
                    <div key={product.id} className={styles.orders_management__product_container}>
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
                        <p className={[styles.orders_management__product_info, styles.product_title].join(" ")}>
                          {product.title.toLowerCase()}
                        </p>
                        <p className={styles.orders_management__product_info}>
                          Quantity: {product.quantity}
                        </p>
                        <p className={styles.orders_management__product_info}>
                          Unit price: ${product.unit_price}
                        </p>
                        <p className={styles.orders_management__product_info}>
                          Subtotal: ${product.unit_price * product.quantity}
                        </p>
                      </div>
                    </div>
                  )
               })}

            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AdminManageOrders;
