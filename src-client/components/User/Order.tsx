import styles from "../../styles/Account.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Ireducers } from "../../../lib/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import formatDate from "../../controllers/format-date";
export default function Orders(): JSX.Element {
    const dispatch: Function = useDispatch()
    useEffect(() => {
        if (myProfide.email) {
            dispatch(getUserDetail(myProfide.email))
        }
    }, [dispatch])
    const myProfide = useSelector((state: Ireducers) => state.reducerUser.user)
    if (!myProfide) return <div>Loading</div>
    const { orders } = myProfide;
    const myOrder = orders?.map((elem) => {
        const { product } = elem;
        const myProductOrder = product?.map((elem) => {
            const myImage: string = typeof elem?.image?.[0].image === "string" ?
                elem.image[0].image : 'loading'
            return (
                <div key={elem.id}>
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
        const mydate = `The purchase was made on the day ${formatDate(elem.date)} `
        return (
            <div key={elem.date}>
                <h3>{elem.description}</h3>
                <p>{elem.status}</p>
                {myProductOrder}
                <p>{mydate}</p>
                <h1>Total</h1>
                <p>{elem.total}</p>
                <div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.account__container}>
            {myOrder}
        </div>
    );
}
