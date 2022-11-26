import React from "react"
import Image from "next/image"
import { IproductModelCart } from "../../../../lib/types"

interface prop {
    arrayCard: IproductModelCart[]
    total: number
    styles: any
    totalQuantity: number
}

export default function CardCart({ arrayCard, total, styles, totalQuantity }: prop) {
    return (
        <div className={styles.second__column} >
            <h2 className={styles.column__title}>Order Summary</h2>
            {arrayCard.map((elem, index) => (
                <div className={styles.item} key={index}>
                    <div className={styles.product__img_container}>
                        <Image
                            src={elem.picture_url}
                            alt={elem.title}
                            width='100'
                            height='100'
                        />
                    </div>
                    <div className={styles.item__info}>
                        <h3>{elem.title.toLowerCase()}</h3>
                        <p>Quantity: {elem.quantity}</p>
                        <p>Price x 1: ${elem.unit_price}</p>
                    </div>

                    <h2 className={styles.item__info}>
                        Subtotal: <br /> ${elem.subTotal}
                    </h2>
                </div>

            ))}

            <div className={styles.total__container}>
                <p className={styles.__shipping}>Items in shopping cart ({totalQuantity})</p>
                <div className={styles.__shipping_line}>
                    <p className={styles.__shipping}>Shipping cost</p>
                    <p className={styles.__shipping}>$...</p>
                </div>
                <div className={styles.__total_line}>
                    <h2 className={styles.__total}>TOTAL </h2>
                    <h2 className={styles.__total}>${total}</h2>
                </div>
            </div>
        </div>
    )
} 