import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getOrder } from "../../src-client/redux/slice/payment/payment";
import { Ireducers, IitemForMercadoPago } from "../../lib/types";
// import SirunLogo from "../../src-client/images/sirun_logo.png";
import emailjs from "emailjs-com";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import styles from "../../src-client/styles/ApprovedPayment.module.css";


export default function ApprovedPayment() {
  const { query } = useRouter();
  const orderId: any = query.id;


  const { data, status }: any = useSession<boolean>();
  const userEmail: string = data.email;

  console.log(data, status); // null --> el usuario tiene que iniciar sesión si o si para poder pagar (hay que corregirlo)
  console.log(query);


  const orderInfo: any = useSelector<Ireducers>((state) => state.reducerAfterPayment.myOrder);
  console.log(orderInfo);


  // EmailJS for approved payment
  if (orderInfo) {
    let templateParams = {
      // sirun_logo: btoa(SirunLogo), // ver como subir imagenes
      client_name: orderInfo.user.name,
      client_email: orderInfo.user.email,
      client_phone: orderInfo.phone.area_code + "-" + orderInfo.phone.number,
      client_address: orderInfo.address.streetName + " " + orderInfo.address.streetNumber,
      client_zipcode: orderInfo.address.zipCode,
      order_number: orderInfo.external_reference,
      order_date: orderInfo.date,
      order_delivery_time: orderInfo.delivery_time,
      order_products: orderInfo.purchasedProducts.map((product: IitemForMercadoPago) => {
        return {
          product_image: product.image,
          product_name: product.name,
          product_quantity: product.quantity,
          product_price: product.price,
        }
      }),
      order_total: orderInfo.total,
    }

    emailjs
      .send("service_59eb21u", "template_r17yb7u", templateParams, "6kBWW7c7buxjytyG6")
      .then(
        (result) => console.log("Email successfully sent!: " + result.text),
        (error) => console.log("There's been an error while sending the email: " + error.text)
      );
  }

  useEffect(() => {
    getOrder({ orderId, userEmail });
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