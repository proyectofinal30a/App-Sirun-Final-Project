import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import styles from "../../styles/EmailNotification.module.css";
import Image from "next/image";


const EmailNotification = () => {
  useEffect(() => {}, []);

  
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