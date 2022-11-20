import styles from "../../styles/Account.module.css";
import Image from 'next/image'
import { useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";




export default function Profile(): JSX.Element {

    const myProfide = useSelector((state: Ireducers) => state.reducerUser.user)
    if (!myProfide) return <div>Loading</div>
    const { name, email, image, direcciones } = myProfide

    const myAdress = direcciones?.map((ele, index:number) => (
        <div key={index}>
            <p>Direccion{index}:  {ele.dir} </p>
        </div>
    ))
    return (
        <div className={styles.profile__container}>
            <h1 className={styles.profile__title}>My Profile</h1>
            <div className={styles.profile__data}>
                <Image
                    src={image}
                    width='100'
                    height='100'
                    alt={name}
                    className={styles.avatar__image}
                    />
                    <div className={styles.profile__info_container}>
                        <h1>FullName: {name.toUpperCase()}</h1>
                        <h3>Email: {email}</h3>
                        {myAdress}
                    </div>

                </div>
        </div>
    );
}

