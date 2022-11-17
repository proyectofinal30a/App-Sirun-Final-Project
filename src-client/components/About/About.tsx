import React from "react";
import HomeInfo from "../Home/HomeInfo";
import styles from "../../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.about__container}>
      <h1 className={styles.about__title}>About us</h1>
      <HomeInfo />
    </div>
  );
};

export default About;
