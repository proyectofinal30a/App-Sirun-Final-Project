import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import styles from "../../src-client/styles/DeactivatedAccount.module.css";

export default function DeactivatedAccount() {
  return (
    <div className={styles.deactivated__container}>
      <h1 className={styles.deactivated__title}>Your account has been deactivated.</h1>

      <p className={styles.deactivated__message}>
        If you think this was a mistake please send an email to:
        {" "}
        <a href="mailto:sirun.patisserie@gmail.com" className={styles.deactivated__message_span}>
          sirun.patisserie@gmail.com
        </a>
        {" "}
      </p>
      
      <Link 
        href="/" 
        className={styles.deactivated__home_link} 
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        Return to home
      </Link>
    </div>
  );
}
