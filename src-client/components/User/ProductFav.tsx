import styles from "../../styles/Account.module.css";
import { useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import Link from "next/link";
import Image from "next/image";
export default function FavoriteProduct(): JSX.Element {

    const myProfide = useSelector((state: Ireducers) => state.reducerUser.user)
    if (!myProfide) return <div>Loading</div>
    const { favorites } = myProfide
    const myFavotite = favorites.map((elem) => {
        const myImage: string = typeof elem?.image?.[0].image === "string" ?
            elem.image[0].image : 'loading'
        return (
            <div>
                <Link href={`/productDetail/${elem.id}`}>details</Link>
                <h3>{elem.name}</h3>
                <Image
                    src={myImage}
                    width='100'
                    height='100'
                    alt={elem.name}
                />
            </div>
        )
    })

    return (
        <div className={styles.account__container}>
            <div>
                {myFavotite}
            </div>
        </div>
    );
}
