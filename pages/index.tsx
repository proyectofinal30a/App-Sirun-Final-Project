import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Slider from "../src-client/components/Home/Slider";
import HomeInfo from "../src-client/components/Home/HomeInfo";
import Footer from "../src-client/components/Footer/Footer";
import { getAllProducts } from "../src-client/redux/slice/products-client/Products-all-redux";
import { getUserDetail } from "../src-client/redux/slice/user-detail-redux/user-redux";
import styles from "../src-client/styles/Home.module.css";

export default function Home() {
  const dispatch: Function = useDispatch();
  const { data, status } = useSession<boolean>();
  useEffect(() => {
    dispatch(getAllProducts());
    status === "authenticated" && dispatch(getUserDetail(data?.user.email));
  }, []);





  return (
    <>
      {status === "loading" ? (
        <div className={styles.admin__loader}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.container}>
          <HEAD />
          <Nav />

          <main>
            <div className={styles.slider__container}>
              <Slider />
            </div>
            <HomeInfo />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
