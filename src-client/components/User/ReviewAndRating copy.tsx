import styles from "../../styles/Account.module.css";
import { useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import Link from "next/link";
import Image from "next/image";
export default function ReciewAndRating(): JSX.Element {
    const myProfide = useSelector((state: Ireducers) => state.reducerUser.user)
    if (!myProfide) return <div>Loading</div>
    const { evaluations } = myProfide
    console.log(evaluations);
    if (!evaluations) return <div>Loading</div>
    const myEvaluations = evaluations?.map((elem) => {
        const { product } = elem
        const { image } = product.image[0]

        return (
            <div>
                <Link href={`/productDetail/${elem.id}`}>details</Link>
                <h3>{elem.review}</h3>
                <p>{elem.rating}</p>
                <div>
                    <p>{product.name}</p>
                    <Link href={`/productDetail/${product.id}`}>details</Link>
                    <Image
                        src={image}
                        width='100'
                        height='100'
                        alt={product.name}
                    />
                </div>
            </div>
        )
    })

    return (
        <div className={styles.account__container}>

            {myEvaluations}

        </div>
    );
}
