import React, { useState } from "react";
import Image from "next/image";
import SabaCake from "../../images/saba-cake.png";
import PinkCupcakes from "../../images/pink-cupcakes.png";
import HappyCostumers from "../../images/happy-costumers.png";
import styles from "../../styles/HomeInfo.module.css";
import swal from "sweetalert";

const HomeInfo = () => {
  const [phoneToCopy, setPhoneToCopy] = useState("+54 9 11 4612-2637");

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneToCopy);
    swal("Phone number copied to clipboard.");
  };

  return (
    <div className={styles.home_info__container}>
      <div className={styles.home_info__content_container}>
        <div className={[styles.home_info__image_container, styles.home_info__first_img].join(" ")}>
          <Image
            src={SabaCake}
            alt="Pâtisserie product"
            className={styles.home_info__image}
          />
        </div>
        <div className={styles.home_info__text_container}>
          <h3>Specialists in personalized cakes</h3>
          <p>
            We&apos;ve been specialists in personalized cakes for 3 years now. If you want to order yours do not hesitate! Send us an email to:
            {" "}<a className={styles.home_info__a} href="mailto:sirun.patisserie@gmail.com">
              sirun.patisserie@gmail.com
            </a>{" "}
            telling us how you would like the cake of your next event to be and please don&apos;t forget to specify the date of the event!
            Please remember that the orders must be performed at least 7 days in advance.
          </p>
        </div>
      </div>

      <div
        className={[styles.home_info__content_container,styles.home_info__reverse].join(" ")}
      >
        <div className={styles.home_info__image_container}>
          <Image
            src={PinkCupcakes}
            alt="Pâtisserie product"
            className={styles.home_info__image}
          />
        </div>
        <div className={styles.home_info__text_container}>
          <h3>Catering: sweet little things</h3>
          <p>
          If you were looking for the perfect catering for your next event, 
          you don&apos;t have to look any further, you&apos;ve come to the right place. 
          Sirun Pâtisserie offers you different varieties of catering with products you see on this website!
          Just send us an email to:
          {" "}<a className={styles.home_info__a} href="mailto:sirun.patisserie@gmail.com">
            sirun.patisserie@gmail.com
          </a>{" "}
          and we&apos;ll plan together your catering. This way you&apos;ll treat your guests like no one has before!
          </p>
        </div>
      </div>

      <div className={styles.home_info__content_container}>
        <div className={styles.home_info__image_container}>
          <Image
            src={HappyCostumers}
            alt="Pâtisserie product"
            className={styles.home_info__image}
          />
        </div>
        <div className={styles.home_info__text_container}>
          <h3>Our customers are the most important thing</h3>
          <p>
            At Sirun Pâtisserie the priority is and always will be the customer. That&apos;s why
            we have excellent customer service. Through our automatic messaging we&apos;ll help you solve any
            problem you have while making online purchases of our products. You also can reach us by email:
            {" "}<a
              className={styles.home_info__a}
              href="mailto:sirun.patisserie@gmail.com"
            >
              sirun.patisserie@gmail.com
            </a>{" "}
            or by telephone:
            {" "}<span className={styles.home_info__span} onClick={handleCopyPhone}>
              +54 9 11 4612-2637
            </span>
            . There&apos;s always going to be someone at your disposal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
