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
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { removeFromFavorites, addToFavorites } from "../../redux/slice/user-detail-redux/user-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { useSession } from "next-auth/react";



const AllProductsCards = () => {
  // GET ALL PRODUCTS
  const dispatch: Function = useDispatch();
  // FAVORITE 
  const { data } = useSession();
  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);
  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);


  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));
    }
  }, [dispatch, data, myInfUser?.user?.id, myNuEmail]);
  const allProducts: any = useSelector<Ireducers>((state) => state.reducerProducts.products);
  const cart: any = useSelector<Ireducers>((state) => state.reducerCart.products);



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

  let pageNumbers: number[] = [];
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
  }, [filterProducts, dispatch]);



  const biblioteca: any = {};
  myProfile?.favorites.forEach(fav => {
    if (fav.id) biblioteca[fav.id] = true;
  })

  const handleFavorite = (id: any) => {
    const userId: string = myProfile?.id;
    const productId: string = id;

    if (biblioteca[productId]) {
      removeFromFavorites(userId, productId);
      return dispatch(getUserDetail(myNuEmail));
    };
    addToFavorites(userId, productId);
    dispatch(getUserDetail(myNuEmail));
  }

  return (
    <div className={styles.general__container}>
      <div className={styles.products__container}>
        {paginatedProducts[0] ? (
          <>
            {paginatedProducts.map((product: any, index: number) => {
              return (
                <div key={index} className={styles.product_card__container}>

                  <div className={styles.wishlist_fav_btn_container} onClick={() => handleFavorite(product.id)}>
                    <IconContext.Provider value={{ color: "red", size: "1.5em" }}>
                      <p className={styles.wishlist_fav_btn}>
                        {biblioteca[product.id] ? <FaHeart /> : <FiHeart />}
                      </p>
                    </IconContext.Provider>
                  </div>

                  <Link href={`/productDetail/${product.id}`} className={styles.product_card__link}>
                    <h1 className={styles.product_card__title}>{product.name.toLowerCase()}</h1>

                    <div className={styles.product_card__img_container}>
                      <Image
                        key={index}
                        src={product.image?.[0]?.image}
                        width={1000}
                        alt={product.name}
                        height={1000}
                        priority
                        className={styles.product_card__img}
                      />
                    </div>

                  </Link>


                  <div className={styles.product_card__info_container}>
                    <p>{product.type}</p>
                    <p>$ {product.price}</p>
                  </div>

                  <button className={styles.add_to_cart__btn} onClick={(e: any) => addProductOpenModal(e, product)}>
                    Add to cart
                  </button>
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
                  const myUrl = elem.product?.image?.[0]?.image
                  return (
                    <div key={index} className={styles.modal__product_container}>
                      <p className={styles.modal__product_name}>
                        {elem.product.name.toLowerCase()}
                      </p>

                      <div className={styles.modal_info_container}>
                        <div className={styles.modal__product_img_container}>
                          <Image
                            key={index}
                            src={myUrl}
                            width={400}
                            alt={elem.product.name}
                            height={400}
                            priority
                            className={styles.modal__product_img}
                          />
                        </div>

                        <div className={styles.modal__product_mobile_separator}>
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
                    </div>
                  );
                })}

                <div className={styles.modal__total_container}>
                  <p className={styles.modal__total}>TOTAL </p>
                  <p className={styles.modal__total}>${total}</p>
                </div>

                <Link href="/checkout" className={styles.modal__purchase_btn_container}>
                  <button className={styles.modal__start_purchase_btn}>Checkout</button>
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
