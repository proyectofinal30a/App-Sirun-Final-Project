import HEAD from "../../src/client/components/HEAD";
import Nav from "../../src/client/components/NavBar/Nav";
import Footer from "../../src/client/components/Footer/Footer";
import styles from "../../src/styles/AdminSideBar.module.css";
import UserSideBar from "../../src/client/components/User/UserSideBar";
import Orders from "../../src/client/components/User/Order";
import React from "react";

export default function AdminProfilePage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <UserSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <Orders />
        </div>
      </main>

      <Footer />
    </div>
  );
}
