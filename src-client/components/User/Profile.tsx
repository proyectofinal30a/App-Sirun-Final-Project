import styles from "../../styles/Account.module.css";
import Image from 'next/image'
import { useSession } from "next-auth/react";
export default function Profile() {
    const { data } = useSession()

    if (data) {
        const { name, email, image } = data.user
        return (
            <div className={styles.account__container}>
                <div>
                    <h1>{name}</h1>
                    <h3>{email}</h3>
                    <Image
                        src={image}
                        width='100'
                        height='100'
                        alt={name}
                    />
                </div>
            </div>
        );
    }
    return <div>NO ESTAS LOOGEADO</div>
};
