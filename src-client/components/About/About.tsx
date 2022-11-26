import React, { useState } from "react";
import HomeInfo from "../Home/HomeInfo";
import emailjs from '@emailjs/browser';
import styles from "../../styles/About.module.css";


const About = () => {
  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");


  const handleChange = (e: any) => {
    setEmail(e.target.value);
  }


  const handleSubscription = (e: any) => {
    e.preventDefault();
    const emailValid = validEmail.test(email);
    if (!emailValid) return setEmailError("Email not valid");
    setEmailError("");

    if (typeof process.env.EMAILJS_SERVICE_ID !== "string") return;
    
    emailjs.sendForm(
      process.env.EMAILJS_SERVICE_ID, 
      "template_gpd7ahi", 
      e.target, 
      process.env.EMAILJS_PUBLIC_KEY,
    ).then(
      (result) => console.log("Email succesfully sent! " + result.text), 
      (error) => console.log("There's been an error while trying to send the confirmation email: " + error.text)
    );

    setEmail("");
  }
  

  return (
    <div className={styles.about__container}>

      <div className={styles.newsletter__container} id="newsletter">
        <h1 className={styles.newsletter__title}>Newsletter</h1>
        <p>Be a part of the dreamy world of Sirun Pâtisserie.</p>
        <p>Sign up to be kept in the know with all our launches, our latests news and get exclusive offers!</p>
        <form className={styles.newsletter__form} onSubmit={handleSubscription}>
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            name="email"
            required
            className={styles.newsletter__form_input} 
            onChange={handleChange}
          />
          <button 
            type="submit"
            className={styles.newsletter__form_btn}
          >
            Subscribe
          </button>
          <span className={styles.newsletter__form_error}>{emailError}</span>
        </form>
      </div>

      
      <div className={styles.about_us__container}>
        <h1 className={styles.about__title}>About us</h1>
        <HomeInfo />
      </div>


      <div className={styles.shipping__container} id="shipping">
        <h1 className={styles.shipping__title}>Delivery & shipping</h1>
        <p>At Sirun Pâtisserie we use a professional courier delivery service which can be booked online during checkout.</p>
        <div className={styles.shipping_dates__container}>
          <p className={styles.shipping_dates__title}>Shipping dates</p>
          <p className={styles.shipping_dates}>For personalized cakes: 14 working days.</p>  
          <p className={styles.shipping_dates}>For catering: 14 working days.</p>
          <p className={styles.shipping_dates}>For others: 3 working days.</p>
          <p className={[styles.shipping_dates, styles.shipping_dates_bold].join(" ")}>LAST ORDER DATE for Christmas is 22nd December. Last delivery date is 24th December.</p>
        </div>
      </div>

    </div>
  );
};

export default About;
