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
            {ele.dir}
        </div>
    ))
    return (
        <div className={styles.account__container}>
            <div>
                <Image
                    src={image}
                    width='100'
                    height='100'
                    alt={name}
                    className={styles.avatar__image}
                    />
                    <h1>{name}</h1>
                    <h3>{email}</h3>
                {myAdress}
            </div>
        </div>
    );
}

