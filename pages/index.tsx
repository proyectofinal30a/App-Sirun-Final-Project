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

export default function Home() {
  const dispatch: Function = useDispatch();

  const { data, status } = useSession<boolean>();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, status, data]);

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
