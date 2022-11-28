import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getOrder } from "../src-client/redux/slice/payment/payment";
import { Ireducers } from "../lib/types";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import styles from "../src-client/styles/ApprovedPayment.module.css";


export default function ApprovedPayment() {
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const { query } = useRouter();
  const { data, status } = useSession<boolean>();

  const email: string = typeof data?.user?.email === "string" ? data?.user?.email : "";
  const name: string = typeof data?.user?.name === "string" ? data?.user?.name : "";
  const idReference: string = typeof query.external_reference === "string" ? query.external_reference : "";
  let idPurchase: string = typeof query.collection_id  === "string" ? query.collection_id : "";
  const orderInfo: any = useSelector<Ireducers>((state) => state.reducerAfterPayment.myOrder);
 
  useEffect(() => {
    if(email && name && idReference && idPurchase) {
      dispatch(getOrder({ email, name, idReference, idPurchase }));
      setTimeout(() => {
        router.push('/')
      }, 7000);
    }
  }, [dispatch, email]);


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
          <p className={styles.approved_payment__message}>Payment was approved.</p>
          <p className={styles.approved_payment__sub_message}>Your order will be processed shortly.</p>
          <br />
          <p className={styles.approved_payment__sub_message}>Check your inbox to see the details of your order #{idPurchase}.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}