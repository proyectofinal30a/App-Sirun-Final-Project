import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import validate from "./validateContact";
import MessageResult from "./MessageResult";
import styles from "../../styles/ContactUs.module.css";

const ContactUs = () => {
  interface contactData {
    name: string;
    email: string;
    message: string;
  }

  const data: contactData = {
    name: "",
    email: "",
    message: "",
  };

  const [input, setInput] = useState(data);
  const [errors, setErrors] = useState(data);
  const [result, showResult] = useState(false);

  const form = useRef();


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (typeof process.env.EMAILJS_SERVICE_ID_2 !== "string") return;

    emailjs.sendForm(
      process.env.EMAILJS_SERVICE_ID_2,
      "template_diqzxgu", 
      form.current,
      process.env.EMAILJS_PUBLIC_KEY_2
    ).then(
      (result) => console.log("SUCCESS!", result.status, result.text),
      (error) => console.log("FAILED...", error.text)
    );

    e.target.reset();
    showResult(true);
  };

  setTimeout(() => showResult(false), 10000);

  return (
    <div className={styles.contact__container}>
      <h2 className={styles.column__title}>Contact Us</h2>
      <form ref={form} className={styles.form__column} onSubmit={sendEmail}>
        <div className={styles.container__row_column}>
          <label className={styles.form__label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.form__input}
            type="text"
            name="name"
            value={input.name}
            onChange={(e: any) => handleInputChange(e)}
            placeholder="Name"
            autoComplete="on"
            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.container__row_column}>
          <label className={styles.form__label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.form__input}
            type="email"
            name="email"
            value={input.email}
            onChange={(e: any) => handleInputChange(e)}
            placeholder="Email"
            autoComplete="on"
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.container__row_column}>
          <label className={styles.form__label} htmlFor="message">
            Message
          </label>
          <textarea
            className={styles.textarea}
            name="message"
            value={input.message}
            onChange={(e: any) => handleInputChange(e)}
            placeholder="Message"
            required
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <div className={styles.btn__align}>
          <button
            type="submit"
            className={styles.form__input_btn}
            disabled={Object.values(errors).length !== 0}
          >
            {" "}
            Send{" "}
          </button>
        </div>
        {result ? <MessageResult /> : null}
      </form>
    </div>
  );
};

export default ContactUs;
