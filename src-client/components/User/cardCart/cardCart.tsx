import React from "react";
import Image from "next/image";
import { IproductModelCart } from "../../../../lib/types";

interface prop {
  arrayCard: IproductModelCart[];
  total: number;
  styles: any;
  totalQuantity: number;
}

export default function CardCart({
  arrayCard,
  total,
  styles,
  totalQuantity,
}: prop) {
  const shippingCost = Math.round(total * 0.1);
  const totalBuy = Math.round(total + shippingCost)
  return (
    <div className={styles.second__column}>
      <h2 className={styles.column__title}>Order Summary</h2>

      <div className={styles.item__container}>
        {arrayCard.map((elem) => (
          <div className={styles.item} key={elem.id}>
            <div className={styles.product__img_container}>
              <Image
                src={elem.picture_url}
                alt={elem.title}
                width="200"
                height="200"
                className={styles.product__img}
              />
            </div>

            <div className={styles.item__info_container}>
              <div className={styles.item__info}>
                <h3>{elem.title.toLowerCase()}</h3>
                <p>Quantity: {elem.quantity}</p>
                <p>Price x 1: ${elem.unit_price}</p>
              </div>

              <h2 className={[styles.item__info, styles.item__info_product_total].join(" ")}>
                Product total: ${elem.subTotal}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total__container}>
        <p className={styles.__shipping}>
          Items in shopping cart ({totalQuantity})
        </p>
        <div className={styles.__shipping_line}>
          <p className={styles.__shipping}>Shipping cost</p>
          <p className={styles.__shipping}>${shippingCost}</p>
        </div>
        <div className={styles.__total_line}>
          <h2 className={styles.__total}>TOTAL</h2>
          <h2 className={styles.__total}>${totalBuy}</h2>
        </div>
      </div>
    </div>
  );
}
