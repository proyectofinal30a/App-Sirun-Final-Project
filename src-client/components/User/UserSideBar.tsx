import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Ireducers } from "../../../lib/types";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import styles from "../../styles/AdminSideBar.module.css";


const UserSideBar = () => {
  const { data, status }: any = useSession<boolean>();
  const dispatch: Function = useDispatch();

  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);

  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));
    }
  }, [dispatch, data]);

  console.log(myInfUser);


  return (
    <div className={styles.nav__container}>

      {/* Fullscreen */}
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <Link href="/user/profile" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Profile</span>
            </li>
          </Link>
          <Link href="/user/wishlist" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>My wishlist</span>
            </li>
          </Link>
          <Link href="/user/order" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>My orders</span>
            </li>
          </Link>
          <Link href="/user/review" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>My reviews</span>
            </li>
          </Link>
        </ul>
      </nav>


      {/* Mobile sizes */}
      <div className={styles.mobile_nav__container}>

        <div className={styles.mobile_nav__dropdown}>
          <button className={styles.mobile_nav__dropdown_btn}>Account</button>

          <div className={styles.mobile_nav__dropdown_content}>
            <Link href="/user/profile" className={styles.mobile_nav__link}>Profile</Link>
            <Link href="/user/wishlist" className={styles.mobile_nav__link}>My wishlist</Link>
            <Link href="/user/order" className={styles.mobile_nav__link}>My orders</Link>
            <Link href="/user/review" className={styles.mobile_nav__link}>My reviews</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserSideBar;
