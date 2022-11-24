import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import FormProduct from "../../src-client/components/Administration/ProductCreationForm/ProductCreationForm";
import AdminSideBar from "../../src-client/components/Administration/AdminSideBar";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import React from "react";

export default function ProductCreationFormPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <AdminSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <FormProduct />
        </div>
      </main>

      <Footer />
    </div>
  );
}
