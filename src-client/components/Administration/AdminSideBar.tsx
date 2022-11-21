import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/AdminSideBar.module.css";
import axios from "axios";


const AdminSideBar = () => {

  async function handleUsers(){
  }
  return (
    <div className={styles.nav__container}>

      {/* Fullscreen admin side bar */}
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <Link href="/administration" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Dashboard</span>
            </li>
          </Link>
          <Link href="/admin/productCreationForm" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Add new product</span>
            </li>
          </Link>
          <Link href="/admin/adminProducts" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Manage existing products</span>
            </li>
          </Link>
          <Link href="/admin/adminUsers" onClick={() => handleUsers()} className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Manage users</span>
            </li>
          </Link>
          <Link href="/admin/adminProfile" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Profile</span>
            </li>
          </Link>
        </ul>
      </nav>
      

      {/* Mobile sizes admin side bar */}
      <div className={styles.mobile_nav__container}>

        <div className={styles.mobile_nav__dropdown}>
          <button className={styles.mobile_nav__dropdown_btn}>Administrate site</button>

          <div className={styles.mobile_nav__dropdown_content}>
            <Link href="/administration" className={styles.mobile_nav__link}>Dashboard</Link>
            <Link href="/admin/productCreationForm" className={styles.mobile_nav__link}>Add new product</Link>
            <Link href="/admin/adminProducts" className={styles.mobile_nav__link}>Manage existing products</Link>
            <Link href="/admin/adminUsers" className={styles.mobile_nav__link}>Manage users</Link>
            <Link href="/admin/adminProfile" className={styles.mobile_nav__link}>Profile</Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminSideBar;
