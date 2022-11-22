import React, {useState} from 'react'
import validate from "./validateContact";
import styles from "../../styles/ContactUs.module.css"



const ContactUs = () => {

    interface contactData{
        name: string
        email : string
        message:string
    }

    const data : contactData = {
        name: '',
        email: '', 
        message: ''
    }

    const [input, setInput] =useState(data)
    const [errors, setErrors] = useState(data)


    const handleInputChange = (e : any) => {
        const {name, value} = e.target
        setInput({...input, [name] : value})
        setErrors(validate({...input, [name]: value}))
    }

    async function handleOnSubmit(e: Event) {
        e.preventDefault();
       // await sendContactInfo(input));
      }
    
    
  return (
    <div className={styles.contact__container} >
        <h2 className={styles.column__title}>Contact Us</h2>
        <div className={styles.form__column}>

     
     
        <div className={styles.container__row_column}>
          <label className={styles.form__label} htmlFor="name">
            Full Name
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
            type = "submit"
            className={styles.form__input_btn}
            disabled={Object.values(errors).length !== 0}
            onClick={(e: any) => handleOnSubmit(e)}
            > Send </button>
        </div>
            </div>
    </div>
  );
};


export default ContactUs