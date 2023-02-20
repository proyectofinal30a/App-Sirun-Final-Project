import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import HEAD from "../src-client/components/head";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import styles from "../src-client/styles/ApprovedPayment.module.css";

export default function ApprovedPayment() {
  const { query } = useRouter();

  let idPurchase: string =
    typeof query.collection_id === "string" ? query.collection_id : "";

  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <div className={styles.approved_payment__container}>
          <div className={styles.approved_payment__img_container}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"
              height="100"
              width="100"
              alt="OK"
              className={styles.approved_payment__img}
            />
          </div>
          <p className={styles.approved_payment__message}>
            Payment was approved.
          </p>
          <p className={styles.approved_payment__sub_message}>
            Your order will be processed shortly.
          </p>
          <br />
          <p className={styles.approved_payment__sub_message}>
            Check your inbox to see the details of your order #{idPurchase}.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
