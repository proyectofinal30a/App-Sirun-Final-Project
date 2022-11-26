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
  const dispatch: Function = useDispatch();

  const { query } = useRouter();
  let idReference: string = typeof query.external_reference === "string" ? query.external_reference : "";

  const { data, status } = useSession<boolean>();
  let email: string = typeof data?.user?.email === "string" ? data?.user?.email : "";
  let name: string = typeof data?.user?.name === "string" ? data?.user?.name : "";

  const orderInfo: any = useSelector<Ireducers>((state) => state.reducerAfterPayment.myOrder);


  useEffect(() => {
    if (idReference !== "" && email !== "") dispatch(getOrder({ idReference, email }));
  }, [email, idReference, dispatch]);


  if (orderInfo) {
    let templateParams = {
      client_name: name,
      client_email: email,
      client_phone: orderInfo.orders[0].addressOrder.phone.area_code + "-" + orderInfo.orders[0].addressOrder.phone.number,
      client_address: orderInfo.orders[0].addressOrder.street_name + " " + orderInfo.orders[0].addressOrder.street_number,
      client_zip_code: orderInfo.orders[0].addressOrder.zip_code,
      order_number: idReference,
      order_status: orderInfo.orders[0].status,
      order_date: new Date().toLocaleString(), 
      order_delivery_time: orderInfo.orders[0].delivery_time,
      order_detail_url: `https://sirunnpatisserie.vercel.app/order/${idReference}`,
      order_total: orderInfo.orders[0].total,
    }

    console.log(templateParams)

    if (typeof process.env.EMAILJS_SERVICE_ID !== "string") return;

    // emailjs.send(
    //   process.env.EMAILJS_SERVICE_ID,
    //   "template_rsukkck",
    //   templateParams,
    //   process.env.EMAILJS_PUBLIC_KEY
    // ).then(
    //   (result) => console.log("Email successfully sent!: " + result.text),
    //   (error) => console.log("There's been an error while sending the email: " + error.text)
    // );
  }


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
        </div>
      </main>

      <Footer />
    </div>
  );
}