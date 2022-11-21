import AdminSideBar from "../../src-client/components/Administration/AdminSideBar";
import Footer from "../../src-client/components/Footer/Footer";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import AdminDashboard from "../../src-client/components/Administration/Dashboard";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import React from "react";

export default function ProductsPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
      <div className={styles.general__container_first_col}>
          <AdminSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <AdminDashboard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
