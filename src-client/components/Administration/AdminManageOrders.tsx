import styles from "../../styles/AdminManageOrders.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { filterOrders, getUsersOrders, Ipayload } from "../../redux/slice/admin-management-redux/admin-management";
import { getAllUsers } from "../../redux/slice/user-detail-redux/all-users";
import { Ireducers, Iorder } from "../../../lib/types";


const AdminManageOrders = () => {
  const dispatch: Function = useDispatch();
  const [selectedValue, setSelectedValue] = useState({
    statusSelection: "",
    dateSort: "",
  });
  
  useEffect(() => {
    dispatch(getUsersOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  
  const usersOrders = useSelector((state: Ireducers) => state.reducerAdminManagement.usersOrders);
  // console.log(usersOrders)
  const usersOrdersToFilter = useSelector((state: Ireducers) => state.reducerAdminManagement.usersOrdersToFilter);
  // console.log(usersOrdersFilter) 
  const users = useSelector((state: Ireducers) => state.reducerAllUsers.allUsers);

  if (!usersOrders[0] || !users[0]) return <div className={styles.loading}>Loading...</div>


  let currentOrders: Iorder[];
  if (usersOrdersToFilter[0]) {
    currentOrders = usersOrdersToFilter;
  } else {
    currentOrders = usersOrders;
  }
  // console.log(currentOrders)

  const handleStatusSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedValue({
      statusSelection: value,
      dateSort: "",
    });
    if (value === "") return dispatch(getUsersOrders());

    const o: Ipayload = {
      state: currentOrders,
      value: value,
    }
    return filterOrders(o);
  }



  // const handleDateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  //   setSelectedValue({
  //     ...selectedValue,
  //     dateSort: value,
  //   });

  // }

  return (
    <div className={styles.orders_management__container}>
      <h1 className={styles.orders_management__title}>Orders management</h1>

      <div>
        <select name="statusSelection" defaultValue={selectedValue.statusSelection} onChange={handleStatusSelection}>
          <option value="" disabled>Filter by status</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_process">In process</option>
          <option value="canceled">Canceled</option>
          <option value="fulfilled">Fulfilled</option>
        </select>

        <select name="dateSort" defaultValue={selectedValue.dateSort}>
          <option value="" disabled>Order by date</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {/* <button className={styles.clear_filters_btn} onClick={clearFilters}>Clear filters</button> */}
      </div>

      <div className={styles.orders_management__orders_container}>
        {usersOrders[0] &&
          usersOrders?.map((order: Iorder) => {

            let userId = order.id_user;
            let userOfTheOrder = users.filter(user =>{ 
              if (user.id !== userId) return user;
            }); 
            let userName = userOfTheOrder[0].name;
            let userEmail = userOfTheOrder[0].email;

            return (
              <div key={order.id} className={styles.orders_management__order_container}>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Order id:{" "}</span>
                  {order.id}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Costumer name:{" "}</span>
                  {userName}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Costumer email:{" "}</span>
                  {userEmail}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Costumer phone:{" "}</span>
                  +{order.addressOrder?.phone?.area_code}{" "}{order.addressOrder?.phone?.number}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Order date:{" "}</span>
                  {order.date.toLocaleString().split("T")[0]}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Delivery time:{" "}</span>
                  {order.delivery_time}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Order description:{" "}</span>
                  {order.description}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Order status:{" "}</span>
                  {order.status}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Delivery address:{" "}</span>
                  {order.addressOrder?.street_name}{" "}{order.addressOrder?.street_number}{", "}{order.addressOrder?.zip_code}
                </p>
                <p className={styles.orders_management__order_info}>
                  <span className={styles.orders_management__order_span}>Total:{" "}</span>
                  ${order.total}
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
    </div>
  );
};

export default AdminManageOrders;
