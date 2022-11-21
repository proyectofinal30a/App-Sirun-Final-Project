import React from "react";
import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";


const AdminDashboard = () => {
  return (
    <div className={styles.dashboard__container}>
        <h1 className={styles.dashboard__title}>Administration dashboard</h1>
        <Image 
          src="https://www.genusdei.it/wp-content/uploads/2019/04/Coming-Soon.jpg"
          alt="Coming soon"
          width="300"
          height="300"
        />
    </div>
  );
};

export default AdminDashboard;
