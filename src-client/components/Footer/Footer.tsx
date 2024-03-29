import { FloatingWhatsApp } from "react-floating-whatsapp";
import React from "react";
import {BsInstagram, BsWhatsapp, BsFacebook, BsFillTelephoneFill} from "react-icons/bs";
import { FaTiktok, FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IconContext } from "react-icons";
import styles from "../../styles/Footer.module.css";
//import Logo from '../../images/sirun_logo.png'
import Image from "next/image";
import Link from "next/link";

export interface FloatingButton {
  phoneNumber: number;
  accoutnName: string;
  chatMessage: string;
  showPopup: boolean;
}

function Footer() {


  return (
    <div>
      <footer className={styles.footer__distributed}>
        {/* ZONA IZQUIERDA */}
        <div className={styles.footer__left}>
          <h3 className={styles.footer__title}>Navigation</h3>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="#" className={styles.nav__link}>
                Home
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/about" className={styles.nav__link}>
                About
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/products" className={styles.nav__link}>
                Products
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/contact" className={styles.nav__link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

      {/* COLUMNA ANEXADA */}
        <div className={styles.footer__plus}>
          <h3 className={styles.footer__title}>My account</h3>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="/user/profile" className={styles.nav__link}>
                My Profile
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/user/whishlist" className={styles.nav__link}>
                My Wishlist
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/user/reviews" className={styles.nav__link}>
                My Reviews
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/user/order" className={styles.nav__link}>
                My Orders
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/cart" className={styles.nav__link}>
                My Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* ZONA CENTRO */}
        <div className={styles.footer__center}>
        <h3 className={styles.footer__title}>Contact Us</h3>
          <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
            <div >
              <Link className={styles.footer__icons} href="https://www.google.com/maps/place/Sirun+Patisserie/@-34.6297476,-58.4646269,15.28z/data=!4m5!3m4!1s0x0:0xf912710b6a7e163d!8m2!3d-34.6304833!4d-58.4632808" target={"_blank"}>
                <FaMapMarkerAlt />
                <p className={styles.footer__icons_text}>
                  <span>Ramon L. Falcon 2484</span> <br/> Flores, CABA, Bs. As.
                </p>
              </Link>
            </div>
            <div >
              <Link className={styles.footer__icons} href="https://api.whatsapp.com/send/?phone=5491146122637&text&type=phone_number&app_absent=0" target={"_blank"}>
                <BsFillTelephoneFill />
                <p className={styles.footer__icons_text}>+54 9 11 46122637</p>
              </Link>
            </div>
            <div className={styles.footer__icons}>
              <SiGmail />
              <p className={styles.footer__icons_text}>
                <a href="mailto:sirun_patisserie@sirun.com">
                  sirun.patisserie@gmail.com
                </a>
              </p>
            </div>
          </IconContext.Provider>
        </div>


        {/* ZONA DERECHA */}
        <div className={styles.footer__right}>
        <h3 className={styles.footer__title}>About Sirun Pâtisserie</h3>
          <p className={styles.footer__about}>
            Hi, I&apos;m Nati! I&apos;m the founder of Sirun Pâtisserie. 
            I make artisan and professional pastry for all kinds of events, 
            snacks and other special occasions. 
            We would be extremely happy to make your next event a very special occasion!
            Do not hesitate to contact us!
          </p>

          <div className={styles.footer__rrssicons}>
            <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
              <Link href="https://www.facebook.com/SirunPatisserie/" target={"_blank"}>
                <BsFacebook />
              </Link>
              <Link href="https://api.whatsapp.com/send/?phone=5491146122637&text&type=phone_number&app_absent=0" target={"_blank"}>
                <BsWhatsapp />
              </Link>
              <Link href="https://www.tiktok.com/@sirun_patisserie" target={"_blank"}>
                <FaTiktok />
              </Link>
              <Link href="https://www.instagram.com/sirun_patisserie/" target={"_blank"}>
                <BsInstagram />
              </Link>
            </IconContext.Provider>
          </div>

          <FloatingWhatsApp
            phoneNumber=""
            accountName="Sirun Pâtisserie"
            chatMessage="Hello, how can we help you?"
           // avatar= {Logo}
            avatar = "https://res.cloudinary.com/dvopyvz7r/image/upload/v1669086063/logo/lfxxgs5kihpdq7026hdw.png"
            allowClickAway
            notification
            notificationSound
          />
        </div>
      </footer>
      <p className={styles.footer__copyrigth}>
        Copyright&copy;2022. Sirun Pâtisserie. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;




