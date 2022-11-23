import React from "react";
import HomeInfo from "../Home/HomeInfo";
import styles from "../../styles/About.module.css";

const About = () => {

  const handleSubscription = (e) => {
    e.preventDefault();

  }

  return (
    <div className={styles.about__container}>
      <div className={styles.newsletter__container}>
        <h1 className={styles.newsletter__title}>Newsletter</h1>
        <p>Be a part of the dreamy world of Sirun Pâtisserie.</p>
        <p>Sign up to be kept in the know with all our launches, keep up with our latests news and get exclusive offers!</p>
        <form className={styles.newsletter__form}>
          <input type="text" placeholder="Email address" className={styles.newsletter__form_input} />
          <button onClick={handleSubscription}  className={styles.newsletter__form_btn}>Subscribe</button>
        </form>
      </div>

      
      <div className={styles.about_us__container}>
        <h1 className={styles.about__title}>About us</h1>
        <HomeInfo />
      </div>


      <div className={styles.shipping__container}>
        <h1 className={styles.shipping__title}>Delivery & shipping</h1>
        <p>At Sirun Pâtisserie we use a professional courier delivery service which can be booked online during checkout.</p>
        <div className={styles.shipping_dates__container}>
          <p className={styles.shipping_dates__title}>Shipping dates</p>
          <p className={styles.shipping_dates}>For personalized cakes: 14 working days.</p>  
          <p className={styles.shipping_dates}>For catering: 14 working days.</p>
          <p className={styles.shipping_dates}>For others: 7 working days.</p>
        </div>
      </div>

    </div>
  );
};

export default About;
