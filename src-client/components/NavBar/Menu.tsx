import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "../../styles/Menu.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";


const Menu = () => {
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const { data: session, status } = useSession<boolean>();


  useEffect(() => {
    status === "authenticated" && session?.user.role === "inactive"
    ? router.push("/error/deactivated")
    : dispatch(getUserDetail(session?.user.email))
  }, [router, dispatch, session?.user.email, session?.user.role, status])
  

  const signOrNoSing: any = session ? (
    <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className={styles.nav_sign_btn_hidden}>Sign out</button>
  ) : (
    <button onClick={() => signIn("auth0")} className={styles.nav_sign_btn}>Sign in</button>
  );


  const handleNavToggle = () => {
    setIsActive((current) => !current);
  };

  const handleClick = () => {
    if (status === "unauthenticated") signIn("auth0");
  }


  return (
    <>
      <button
        onClick={handleNavToggle}
        className={isActive ? [styles.nav_toggle, styles.nav_open].join(" ") : styles.nav_toggle}
        aria-label="toggle navigation"
      >
        <span className={isActive ? [styles.hamburger, styles.nav_open].join(" ") : styles.hamburger}></span>
      </button>

      <nav id="nav" className={isActive ? [styles.nav, styles.nav_open].join(" ") : [styles.nav, styles.nav_close].join(" ")}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            {signOrNoSing}
          </li>
          <li className={session ? [styles.nav__item, styles.nav__item_home].join(" ") : styles.nav__item}>
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
            <Link href="/user/profile" className={styles.nav__link} onClick={handleClick}>
              <span className={styles.nav_span}>Account</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/user/wishlist" className={styles.nav__link} onClick={handleClick}>
              <span className={styles.nav_span}>Wishlist</span>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/cart" className={styles.nav__link}>
              <span className={styles.nav_span}>Shopping Cart</span>
            </Link>
          </li>
          {session?.user?.role === "admin" || session?.user?.role === 'super admin' ? (
            <li className={styles.nav__item}>
              <Link href="/admin/adminDashboard" className={styles.navlink}>
                <span className={styles.nav_span}>Administration</span>
              </Link>
            </li>
          ): (<></>)}
        </ul>
      </nav>
    </>
  );
};

export default Menu;
