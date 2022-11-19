import styles from "../../styles/Account.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Ireducers } from "../../../lib/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
export default function Orders(): JSX.Element {
    const dispatch: Function = useDispatch()


    const myProfide = useSelector((state: Ireducers) => state.reducerUser.user)
    if (!myProfide) return <div>Loading</div>
    const { orders }: any = myProfide
    useEffect(() => {
        if (myProfide.email) {
            dispatch(getUserDetail(myProfide.email))
        }

    }, [dispatch])
    if (!orders) return <div>Loading</div>
    console.log(orders, 'asdadads');


    const myOrder = orders?.map((elem: any) => {
        const { products } = elem

        const myProductOrder = products?.map((elem: any) => {
            console.log(elem, '213213');

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
        console.log(myProductOrder, '12321dff34213asd');


        return (
            <div key={elem.id}>
                <h3>{elem.description}</h3>
                <p>{elem.total}</p>
                <p>{elem.status}</p>
                <div>
                    {myProductOrder}
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
