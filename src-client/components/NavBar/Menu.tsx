import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "../../styles/Menu.module.css";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const { data: session, status }: any = useSession<boolean>();

  const handleNavToggle = () => {
    setIsActive((current) => !current);
  };

  const signOrNoSing: any = session ? (
    <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className={styles.nav_sign_btn}>Sign Out</button>
  ) : (
    <button onClick={() => signIn("auth0")} className={styles.nav_sign_btn}>Sign In</button>
  );


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
            {signOrNoSing}
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
            <Link href="/userAccount" className={styles.nav__link}>
              <span className={styles.nav_span}>Account</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/wishlist" className={styles.nav__link}>
              <span className={styles.nav_span}>Wishlist</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/cart" className={styles.nav__link}>
              <span className={styles.nav_span}>Shopping Cart</span>
            </Link>
          </li>
          {session?.user?.role === 'admin' &&
          <li className={styles.nav__item}>
            <Link href="/administration" className={styles.nav__link}>
              <span className={styles.nav_span}>Administration</span>
            </Link>
          </li>}
        </ul>
      </nav>
    </>
  );
};

export default Menu;
