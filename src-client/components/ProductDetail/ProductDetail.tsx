import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getProductDetail, cleanProductDetail } from "../../redux/slice/products-client/Product-detail";
import { addToCart } from "../../redux/slice/cart-redux/cart";
import { Iproduct, IallProducts, Ireducers } from "../../../lib/types";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/ProductDetail.module.css";
import { readFileSync } from "fs";

const ProductDetail = () => {
  // const router = useRouter()
  // const id = router.query.id as string
  const { query } = useRouter();
  const id = query.id;

  const dispatch: Function = useDispatch();
  const product: any = useSelector<Ireducers>(
    (state) => state.reducerProductDetail.productDetail
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(cleanProductDetail());
    };
  }, [dispatch, id]);

  const handlerAdd = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name }: any = product;
    dispatch(addToCart(id));
    alert(`Se agrego el producto ${name} asu carrito`);
  };


 const [activeImage, setActiveImage] = useState("");
   const handleMouseOver = (url: string, index: number) => {
     setActiveImage(url)
  }

 


  return (
    <div>
      {product && (
        <div className={styles.detail__container}>

          {/*//zona izquierda// */}
          <div className={styles.detail__container__image}>
            <div className={styles.image__secondary }>
            {product.image?.map((url: string, index: number) => {
              return (
                <div key ={url} className={styles.individuals__image}> 
                  <Image
                  key ={url}
                  src={url}
                  width={250}
                  alt={product.name}
                  height={250}
                  onMouseOver ={()=>handleMouseOver(url, index)}
                  />
                  </div>
              );})}
            </div>

            <div className={styles.image__main}>
              <Image src={activeImage}  width={500} alt={product.name} height={500} />
            </div>
          </div>
       
  

          {/* //zona derecha// */}
          <div className={styles.detail__info}>
            <h1 className={styles.detail__info_title}>{product.name}</h1>
            <p className={styles.detail__info_price}>$ {product.price}</p>

            <div className={styles.detail__info_extra}>
              <p className={styles.detail__info_extras}>{product.type}</p>
              <p className={styles.detail__info_extras}>{product.category}</p>
            </div>

            <p className={styles.detail_info_description}>Description:<br></br>{product.description}</p>
            <button className={styles.add_to_cart__btn} onClick={(e: any) => handlerAdd(e, product)}>Add to cart</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProductDetail;
