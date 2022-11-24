import React, { useEffect } from "react";
import { useRouter } from "next/router";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import { getOrder } from "../../src-client/redux/slice/payment/payment";
import styles from "../../src-client/styles/ApprovedPayment.module.css";

export default function ApprovedPayment() {
  const { query } = useRouter();
  const orderId = query.id;



  useEffect(() => {
    getOrder(orderId);
  });


  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <div className={styles.approved_payment__container}>
          <p className={styles.approved_payment__message}>Payment was approved.</p>
          <p className={styles.approved_payment__sub_message}>Your order will be processed shortly.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}