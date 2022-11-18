import Link from "next/link";
import styles from "../../styles/AdminSideBar.module.css";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Ireducers } from "../../../lib/types";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
const UserSideBar = () => {

  const { data, status }: any = useSession<boolean>()
  const dispatch: Function = useDispatch()

  const myNuEmail = data?.user?.email

  useEffect(() => {
    dispatch(getUserDetail(myNuEmail))
  }, [dispatch, data])

  const myInfUser = useSelector((state: Ireducers) => state.reducerUser)


  console.log(myInfUser);






  return (
    <div className={styles.nav__container}>

      {/* Fullscreen admin side bar */}
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <Link href={`/`} className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>back</span>
            </li>
          </Link>
          <Link href="/user/order" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>My Orders</span>
            </li>
          </Link>
          <Link href="/user/favoriteProduct" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Favorite Products</span>
            </li>
          </Link>
          <Link href="/user/review" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Reviews</span>
            </li>
          </Link>
          <Link href="/user/profile" className={styles.nav__link}>
            <li className={styles.nav__item}>
              <span className={styles.nav_span}>Profile</span>
            </li>
          </Link>
        </ul>
      </nav>


      {/* Mobile sizes admin side bar */}
      {/* <div className={styles.mobile_nav__container}>

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
      </div> */}

    </div>
  );
};

export default UserSideBar;
