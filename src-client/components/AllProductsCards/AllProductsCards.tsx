import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Iproduct, Ireducers } from "../../../lib/types";
import { addToCart, addOne, removeOne, trashItem } from "../../redux/slice/cart-redux/cart";
import { getAllProducts } from "../../redux/slice/products-client/Products-all-redux";
import styles from "../../styles/AllProductsCards.module.css";
import Modal from "react-modal";
import { BsFillTrashFill } from "react-icons/bs";


const AllProductsCards = () => {
  // GET ALL PRODUCTS
  const dispatch: Function = useDispatch();

  const allProducts: any = useSelector<Ireducers>(
    (state) => state.reducerProducts.products
  );
  const [...products]: any = allProducts;
  const cart: any = useSelector<Ireducers>(
    (state) => state.reducerCart.products
  );



  // FILTERS
  const filterProducts: any = useSelector<Ireducers>(
    (state) => state.reducerFilters.productsToFilter
  );

  let currentProducts = allProducts;
  if (filterProducts.length >= 1) {
    currentProducts = filterProducts;
  }


  // SHOPPING CART
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const addProductOpenModal = (e: Event, product: Iproduct) => {
    e.preventDefault();
    setIsOpen(true);
    const { id, name, price, image }: any = product;
    const productToAdd = {
      id: id,
      name: name,
      price: price,
      image: image,
    };
    dispatch(addToCart(productToAdd));
  };

  const handlerAddOne = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name, price, image }: any = product;

    const productToAdd = {
      id: id,
      name: name,
      price: price,
      image: image,
    };

    dispatch(addOne(productToAdd));
  };

  const handlerRemoveOne = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name, price, image }: any = product;
    const productToAdd = {
      id: id,
      name: name,
      price: price,
      image: image,
    };
    dispatch(removeOne(productToAdd));
  };

  const handlerTrash = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id }: any = product;
    dispatch(trashItem(id));
  };

  let total = 0;
  cart.map((elem: any) => {
    return (total += elem.subTotal);
  });



  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(16);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(currentProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleClick = (pageNumber: number) => {
    pagination(pageNumber);
    window.scrollTo({ top: 0 });
  };

  const getPreviousPage = () => {
    pagination(currentPage - 1 > 0 ? currentPage - 1 : 1);
    window.scrollTo({ top: 0 });
  };

  const getNextPage = () => {
    pagination(
      currentPage + 1 <= pageNumbers.length
        ? currentPage + 1
        : pageNumbers.length
    );
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (filterProducts[0]) setCurrentPage(1);
    dispatch(getAllProducts());
  }, [dispatch, filterProducts]);



  return (
    <div className={styles.general__container}>
      <div className={styles.products__container}>
        {paginatedProducts[0] ? (
          <>
            {paginatedProducts.map((product: any, index: number) => {
              return (
                <div
                  key={index}
                  className={styles.product_card__container}
                >
                  <Link
                    href={`/productDetail/${product.id}`}
                    className={styles.product_card__title}
                  >
                    <h1>{product.name.toLowerCase()}</h1>
                  </Link>
                  <Image
                    key={index}
                    src={product.image[0]}
                    width={250}
                    alt={product.name}
                    height={250}
                    priority
                    className={styles.product_card__img}
                  />

                  <div className={styles.product_card__info_container}>
                    <p>$ {product.price}</p>
                    <p>{product.type}</p>

                    <button
                      className={styles.add_to_cart__btn}
                      onClick={(e: any) => addProductOpenModal(e, product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              )
            })}


            {/* Shopping cart */}
            <Modal
              ariaHideApp={false}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className={styles.modal}
              contentLabel="Example Modal"
            >
              <form className={styles.modal__container}>
                <div className={styles.modal__btn_right_container}>
                  <button className={styles.modal__close_modal_btn} onClick={closeModal}>x</button>
                </div>

                <h2>Shopping Cart</h2>

                {cart?.map((elem: any, index: number) => {
                  return (
                    <div key={index} className={styles.modal__product_container}>
                      <p className={styles.modal__product_name}>
                        {elem.product.name.toLowerCase()}
                      </p>

                      <div className={styles.modal_info_container}>
                        <div className={styles.modal__product_img_container}>
                          <Image
                            key={index}
                            src={elem?.product?.image?.[0]}
                            width={400}
                            alt={elem.product.name}
                            height={400}
                            priority
                            className={styles.modal__product_img}
                          />
                        </div>

                        <div className={styles.modal__product_info}>
                          <p className={styles.modal__product_data}>Quantity: {elem.quantity}</p>
                          <p className={styles.modal__product_data}>Price: {elem.product.price}</p>
                          <p className={styles.modal__product_data}>Subtotal: {elem.subTotal}</p>
                        </div>

                        <div className={styles.modal__product_btns_container}>
                          <button 
                            className={styles.modal__product_btn}
                            onClick={(e: any) => handlerAddOne(e, elem.product)}
                          >
                            {" "}+{" "}
                          </button>
                          <button 
                            className={styles.modal__product_btn}
                            onClick={(e: any) => handlerRemoveOne(e, elem.product)}
                          >
                            {" "}-{" "}
                          </button>
                          <button
                            className={[styles.modal__product_btn, styles.modal__product_btn_trash].join(" ")}
                            onClick={(e: any) => handlerTrash(e, elem.product)}
                          >
                            <BsFillTrashFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className={styles.modal__total_container}>
                  <p className={styles.modal__total}>TOTAL: </p>
                  <p className={styles.modal__total}>${total}</p>
                </div>

                <Link href="/checkout" className={styles.modal__purchase_btn_container}>
                  <button className={styles.modal__start_purchase_btn}>Iniciar compra</button>
                </Link>

              </form>
            </Modal>
          </>
        ) : (
          <div className={styles.products__loader}>
            <p>Loading...</p>
          </div>
        )}
      </div>


      {/* Pagination */}
      {paginatedProducts[0] && pageNumbers.length > 1 && (
        <div className={styles.pagination__container}>
          <button
            className={
              currentPage === 1
                ? styles.pagination__prev_next_hidden
                : styles.pagination__prev_next
            }
            onClick={getPreviousPage}
          >
            <p>&#60;&#60;</p>
          </button>

          {pageNumbers &&
            pageNumbers.map((pageNumber) => {
              return (
                <div
                  key={pageNumber}
                  className={
                    currentPage !== pageNumber
                      ? styles.pagination__item
                      : styles.pagination__active
                  }
                  onClick={() => handleClick(pageNumber)}
                >
                  <p>{pageNumber}</p>
                </div>
              );
            })}

          <button
            className={
              currentPage === pageNumbers.length || !paginatedProducts[0]
                ? styles.pagination__prev_next_hidden
                : styles.pagination__prev_next
            }
            onClick={getNextPage}
          >
            <p>&#62;&#62;</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProductsCards;
