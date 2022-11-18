import styles from "../../styles/Account.module.css";
import Image from 'next/image'
import { useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
export default function ProductFavorite() {

    const myProductFav = useSelector((state: Ireducers) => state.reducerUser?.user?.favorites)

    console.log(myProductFav, '================');



    return (
        <div className={styles.account__container}>
            <div>
                <h1>hols</h1>
                <h3>la</h3>
                {/* <Image
                        src={image}
                        width='100'
                        height='100'
                        alt={name}
                    /> */}
            </div>
        </div>
    );

};
