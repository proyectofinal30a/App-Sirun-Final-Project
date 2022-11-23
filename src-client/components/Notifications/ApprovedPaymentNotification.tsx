import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useRouter } from "next/router";
import { getOrder } from "../../redux/slice/payment/payment";
// import { useDispatch } from "react-redux";
import styles from "../../styles/EmailNotification.module.css";
import Image from "next/image";


const EmailNotification = () => {
  // const dispatch = useDispatch();

  const { query } = useRouter();
  const id = query.id;

  // const initialInfo = {
  //   client_name: "",
  //   client_address: "",
  //   client_zipcode: "",
  //   client_city: "",
  //   client_country: "Argentina",
  //   order_number: "",
  //   order_composition: [],
  //   order_total: "",
  // }

  // const [orderInfo, setOrderInfo] = useState(initialInfo);

  useEffect(() => {
    
  }, []);

  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "template_iegi35c", e.target, "6kBWW7c7buxjytyG6")
      .then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );
      // e.target.reset();
  };

  return (
    <form className={styles.notification__container} onSubmit={sendEmail}>
      <Image src="cid:logo.png" alt="Logo" />
      {/* <input type="text" name="name" value={} /> */}

    </form>
  );
};

export default EmailNotification;