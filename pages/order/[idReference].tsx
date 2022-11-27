import React from "react";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import UserSideBar from "../../src-client/components/User/UserSideBar";
import OrderDetail from "../../src-client/components/User/OrderDetail";
import Footer from "../../src-client/components/Footer/Footer";
import styles from "../../src-client/styles/AdminSideBar.module.css";


const OrderDetailPage = () => {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <UserSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <OrderDetail />
        </div>
      </main>

      <Footer />
    </div>
  )
};

export default OrderDetailPage;
