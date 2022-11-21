import React from "react";
import Image from "next/image";
import styles from "../../styles/AdminManageProducts.module.css";


const AdminManageProducts = () => {
  return (
    <div className={styles.products_form__container}>
        <h1 className={styles.products_form__title}>Administration product managing form</h1>
        <Image 
          src="https://www.genusdei.it/wp-content/uploads/2019/04/Coming-Soon.jpg"
          alt="Coming soon"
          width="300"
          height="300"
        />
    </div>
  );
};

export default AdminManageProducts;