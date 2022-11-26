import React from "react";
import Link from "next/link";
// import Modal from "react-modal";
import { signOut } from "next-auth/react";
import styles from "../../src-client/styles/DeactivatedAccount.module.css";

export default function DeactivatedAccount() {
  // const [modalIsOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }

  return (
    // <Modal
    //   ariaHideApp={false}
    //   isOpen={modalIsOpen}
    //   onRequestClose={closeModal}
    //   className={styles.modal}
    //   contentLabel="Example Modal"
    // >
      <div className={styles.deactivated__container}>
        <h1 className={styles.deactivated__title}>Your account has been deactivated.</h1>

        <p className={styles.deactivated__message}>
          If you think this is a mistake please send an email to:
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
    // </Modal>
  );
}
