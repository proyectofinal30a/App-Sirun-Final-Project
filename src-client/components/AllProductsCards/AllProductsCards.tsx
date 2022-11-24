import styles from "../../styles/AllProductsCards.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { IconContext } from "react-icons";
import { BsFillTrashFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Iproduct, Ireducers, IproductModelCart } from "../../../lib/types";
import { getAllProducts } from "../../redux/slice/products-client/Products-all-redux";
import { addToCart, addOne, removeOne, trashItem } from "../../redux/slice/cart-redux/cart-redux";
import { requestAddToFavorites, addToFavorites, getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";



const AllProductsCards = () => {
  // GET ALL PRODUCTS
  const dispatch: Function = useDispatch();


  // FAVORITE 
  const { data, status } = useSession<boolean>();
  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);

  useEffect(() => {
    data?.user && dispatch(getUserDetail(data?.user.email))
  }, [dispatch, data]);
  const allProducts = useSelector((state: Ireducers) => state.reducerProducts.products);
  const cart = useSelector((state: Ireducers) => state.reducerCart.products);



  // FILTERS
  const filterProducts: any = useSelector<Ireducers>(
    (state) => state.reducerFilters.productsToFilter
  );

  let currentProducts = allProducts;
  if (filterProducts.length >= 1) {
    currentProducts = filterProducts;
  }



  // SHOPPING CART
  const totalQuantity = cart[0] ? cart?.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc) : 0;

  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const addProductOpenModal = (product: Iproduct) => {
    setIsOpen(true);
    const { id, name, price, image } = product;
    const productToAdd: IproductModelCart = {
      id: id,
      title: name,
      unit_price: price,
      picture_url: image[0].image,
      quantity: 1,
      subTotal: 0,
      currency_id: 'ARS'
    };
    dispatch(addToCart(productToAdd));
  };


  const handlerTrash = (id: string) => {
    dispatch(trashItem(id));
    if (cart.length === 1 || cart.length === 0) { return setIsOpen(false); }
  };



  let total = 0;
  cart.map((elem) => {
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

  //request para guardar los nuevos favs que estan en el redux del user


  //check de favs
  interface IproduId {
    id: string
  }

  let favorites2: Array<IproduId> = []
  let biblioteca: any = {}

  if (myProfile) {
    favorites2 = myProfile.favorites.map((e) => { return { id: e.id } })
    favorites2.forEach(fav => {
      biblioteca[fav.id] = true;
    })
  }

  useEffect(() => {
    if (!myProfile) return
    (async () => { await requestAddToFavorites(myProfile.id, favorites2) })();
  })



  const handleFavorite = (id: string) => {
    status === "unauthenticated" && signIn("auth0");
    const productToAdd = {
      id: id
    }
    dispatch(addToFavorites(productToAdd));
  }


  return (
    <div className={styles.general__container}>
      <div className={styles.products__container}>
        {paginatedProducts[0] ? (
          <>
            {paginatedProducts.map((product, index: number) => {
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
                    <p>{product.type !== "none" ? product.type : ""}</p>
                    <p>$ {product.price}</p>
                  </div>

                  <button className={styles.add_to_cart__btn} onClick={() => addProductOpenModal(product)}>
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

                {cart?.map((elem, index: number) => {
                  if (!elem.title) return null

                  return (
                    <div key={index} className={styles.modal__product_container}>
                      <p className={styles.modal__product_name}>
                        {elem.title.toLowerCase()}
                      </p>

                      <div className={styles.modal_info_container}>
                        <div className={styles.modal__product_img_container}>
                          <Image
                            key={index}
                            src={elem.picture_url}
                            width={400}
                            alt={elem.picture_url}
                            height={400}
                            priority
                            className={styles.modal__product_img}
                          />
                        </div>

                        <div className={styles.modal__product_mobile_separator}>
                          <div className={styles.modal__product_info}>
                            <p className={styles.modal__product_data}>Quantity: {elem.quantity}</p>
                            <p className={styles.modal__product_data}>Price: {elem.unit_price}</p>
                            <p className={styles.modal__product_data}>Subtotal: {elem.subTotal}</p>
                          </div>

                          <div className={styles.modal__product_btns_container}>
                            <input
                              className={styles.modal__product_btn}
                              onClick={() => dispatch(addOne(elem.id))}
                              value='+'
                              type='button'
                            />
                            <input
                              className={styles.modal__product_btn}
                              onClick={() => dispatch(removeOne(elem.id))}
                              value='-'
                              type='button'
                            />
                            <button
                              className={[styles.modal__product_btn, styles.modal__product_btn_trash].join(" ")}
                              onClick={(e) => {
                                e.preventDefault()
                                handlerTrash(elem.id)
                              }}
                            >
                              <BsFillTrashFill />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <p className={styles.modal__quantity_total}>Items in shopping cart ({totalQuantity})</p>

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
