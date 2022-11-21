import React from "react";
import Image from "next/image";
import styles from "../../styles/AdminManageUsers.module.css";


const AdminManageUsers = () => {
  return (
    <div className={styles.users_form__container}>
        <h1 className={styles.users_form__title}>Administration user managing form</h1>
        <Image 
          src="https://www.genusdei.it/wp-content/uploads/2019/04/Coming-Soon.jpg"
          alt="Coming soon"
          width="300"
          height="300"
        />
    </div>
  );
};

export default AdminManageUsers;