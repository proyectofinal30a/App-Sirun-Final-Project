import React from "react";
import Image from "next/image";
import styles from "../../styles/AdminProfile.module.css";


const AdminProfile = () => {
  return (
    <div className={styles.profile__container}>
        <h1 className={styles.profile__title}>Administration profile</h1>
        <Image 
          src="https://www.genusdei.it/wp-content/uploads/2019/04/Coming-Soon.jpg"
          alt="Coming soon"
          width="300"
          height="300"
        />
    </div>
  );
};

export default AdminProfile;