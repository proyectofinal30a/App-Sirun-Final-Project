import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../src-client/redux/slice/products-client/Products-all-redux";
import Nav from "../src-client/components/NavBar/Nav";
import HEAD from "../src-client/components/HEAD";
import Slider from "../src-client/components/Home/Slider";
import HomeInfo from "../src-client/components/Home/HomeInfo";
import Footer from "../src-client/components/Footer/Footer";
import styles from "../src-client/styles/Home.module.css";
import React from "react";
import { getUserDetail } from "../src-client/redux/slice/user-detail-redux/user-redux";
import {signOut} from "next-auth/react";


export default function Home() {
  const dispatch: Function = useDispatch();

  const { data, status } = useSession<boolean>();
  useEffect(() => {
    dispatch(getAllProducts());
    status === "authenticated" && dispatch(getUserDetail(data.user.email))
  }, [dispatch, status, data]);

  return (
    <>
      
      {status === "loading" ? (
        <div className={styles.admin__loader}>
          <h1>Loading...</h1>
        </div>
      ) : (
        data?.user.role === 'inactive' ? 
        (
          <div>
            <h1>Tu cuenta ha sido suspendida</h1>
            <button onClick={()=> signOut()}>Sign out</button>
          </div>
        )
        :
        (<div className={styles.container}>
          <HEAD />
          <Nav />

          <main>
            <div className={styles.slider__container}>
              <Slider />
            </div>
            <HomeInfo />
            <Footer />
          </main>
        </div>)
      )}
    </>
  );
}
