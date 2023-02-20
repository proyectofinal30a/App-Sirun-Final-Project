import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Menu.module.css";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const handleNavToggle = () => {
    setIsActive((current) => !current);
  };

  return (
    <>
      <button
        onClick={handleNavToggle}
        className={
          isActive
            ? [styles.nav_toggle, styles.nav_open].join(" ")
            : styles.nav_toggle
        }
        aria-label="toggle navigation"
      >
        <span
          className={
            isActive
              ? [styles.hamburger, styles.nav_open].join(" ")
              : styles.hamburger
          }
        ></span>
      </button>

      <nav
        id="nav"
        className={
          isActive
            ? [styles.nav, styles.nav_open].join(" ")
            : [styles.nav, styles.nav_close].join(" ")
        }
      >
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <button onClick={() => {}} className={styles.nav_sign_btn}>
              Sign in
            </button>
          </li>
          <li className={styles.nav__item}>
            <Link href="/" className={styles.nav__link}>
              <span className={styles.nav_span}>Home</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/products" className={styles.nav__link}>
              <span className={styles.nav_span}>Pâtisserie</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/about" className={styles.nav__link}>
              <span className={styles.nav_span}>About</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/user/profile"
              className={styles.nav__link}
              // onClick={handleClick}
            >
              <span className={styles.nav_span}>Account</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/user/wishlist"
              className={styles.nav__link}
              // onClick={handleClick}
            >
              <span className={styles.nav_span}>Wishlist</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/cart" className={styles.nav__link}>
              <span className={styles.nav_span}>Shopping Cart</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
