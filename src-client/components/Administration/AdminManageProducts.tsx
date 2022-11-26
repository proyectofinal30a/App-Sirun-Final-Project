import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEyeInvisible, AiFillEye, AiFillEdit } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { Iproduct, Ireducers } from "../../../lib/types";
import { getProducts, updateProduct, changeAvailability, requestUpdateStatusProducts, clean, setProduct, updateAllPrices } from "../../redux/slice/product-Admin-redux/GetProAdm-Redux"
import SearchBar from "../SearchBar/SearchBar";
import { current } from "@reduxjs/toolkit";
import Modal from "react-modal";
import styles from "../../styles/AdminManageProducts.module.css";
import Validation from "../Administration/ProductCreationForm/Validation"
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";
// import { useRouter } from "next/router";


const AdminManageProducts = () => {
  const myForm = {
    price: 0,
    image: [],
    description: "",
  };
  const [formProduct, setFormProduct] = useState(myForm);
  const [percent, setPercent] = useState("")

  const myErr = {
    price: "",
    description: "",
  };
  const [formErrors, setFormErrors] = useState(myErr);

  useEffect(() => {
    dispatch(clean())
    dispatch(getProducts())
    return () => dispatch(clean())
  }, [])

  const allProducts = useSelector((state: Ireducers) => state.reducerAdmin.products)
  const dispatch: Function = useDispatch()
  const filteredProducts = useSelector((state: Ireducers) => state.reducerAdmin.productsToFilter)
  const productModal = useSelector((state: Ireducers) => state.reducerAdmin.productEdit)
  const productsToUpdate = useSelector((state: Ireducers) => state.reducerAdmin.productsUpdate)




  let currentProducts: Iproduct[] = allProducts;
  // let currentProduct: Iproduct;


  if (filteredProducts?.length >= 1) {
    currentProducts = filteredProducts
  } else {
    currentProducts = allProducts
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUpdateIsOpen, setmodalUpdateIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalUpdate() {
    setmodalUpdateIsOpen(false)
  }

  // MODAL- MASIVE prices UPDATE
  const openMasiveModal = (e: Event) => {
    e.preventDefault()
    setmodalUpdateIsOpen(true);
  }

  const handlerInput = (e: any) => {
    const { value } = e.target
    setPercent(value)
  }

  const submitUpdateAllPrices = async (e: Event, percent) => {
    e.preventDefault()
    // alert(percent)
    await updateAllPrices(percent)
    await dispatch(getProducts())
    setmodalUpdateIsOpen(false)
  }
  //END MODAL UPDATE PRODUCTS

  //Visibilidad
  const handleVisibility = (e, product) => {
    e.preventDefault()
    const { id } = product
    dispatch(changeAvailability(id))
  }


  const aplicarCambios = async () => {
    if (!productsToUpdate.length) return alert('Please select product to change')
    await requestUpdateStatusProducts(productsToUpdate)
    alert(`Se actualizo: ${productsToUpdate.map((p) => p.name).reduce((e, acc) => e + " & " + acc)}`)
  }


  //end visibilidad

  //MODAL - EDIT ONE PRODUCT
  const editOpenModal = (e: Event, product: Iproduct) => {
    e.preventDefault()
    setIsOpen(true);
    dispatch(setProduct(product))
  }


  const submitHandler = (e, product: any) => {
    e.preventDefault()
    const { id, name } = product
    const newPrice = Number(formProduct.price)
    const newDescription = formProduct.description

    const prouctToUpdate = {
      id: id,
      price: newPrice,
      description: newDescription
      //faltan las imagenes
    }
    updateProduct(prouctToUpdate)
    setIsOpen(false)
    alert(`se actualizo el producto ${name}`)
    dispatch(getProducts())
  }
  //END EDICT PRODUCT 



  const handleOnChangeInput = (event: any) => {
    const { name, value } = event.target;

    if (name === "textarea") {
      return setFormProduct({
        ...formProduct,
        [name]: value.charAt(0).toUpperCase() + value.slice(1),
      });
    }
    if (name === "text") {
      return setFormProduct({
        ...formProduct,
        [name]: value.charAt(0).toUpperCase() + value.slice(1),
      });
    }

    setFormProduct({ ...formProduct, [name]: value });
    // setFormErrors(Validation({ ...formProduct, [name]: value }));
  };


  const handleOnChangeNumber = (event: any) => {
    const { name, value } = event.target;
    setFormProduct({ ...formProduct, [name]: value });
    // setFormErrors(Validation({ ...formProduct, [name]: value }));
  };

  const handleOnFile = (event: any) => {
    const imageFile: any = event.target.files;
    if (!imageFile || !imageFile[0]) return;

    if (formProduct.image.length >= 4) return alert('Only four images per product')

    const myTO: any = [...formProduct.image]

    imageFile[0] && myTO.push({
      image: URL.createObjectURL(imageFile[0]),
      imageCloudinary: imageFile[0]
    })

    imageFile[1] && myTO.push({
      image: URL.createObjectURL(imageFile[1]),
      imageCloudinary: imageFile[1]
    })

    imageFile[2] && myTO.push({
      image: URL.createObjectURL(imageFile[2]),
      imageCloudinary: imageFile[2]
    })

    imageFile[3] && myTO.push({
      image: URL.createObjectURL(imageFile[3]),
      imageCloudinary: imageFile[3]
    })
    setFormProduct({ ...formProduct, image: myTO });
  };


  // const handleOnClickReset = () => {
  //   setFormProduct({ ...formProduct, image: [] });
  // };

  //permite borrar la foto que se selecciono por error 
  // const handleOnClickDelete = ({ target }: any) => {
  //   const { name } = target;
  //   const [...myPrevurl] = formProduct.image
  //   const myFilter = myPrevurl.filter(e => e.image !== name)
  //   setFormProduct({ ...formProduct, image: myFilter });
  // };

  return (
    <div className={styles.products_manage__container}>
      <h1 className={styles.products_manage__title}>Administration Product Managing</h1>

      <div className={styles.product__manage_search_and_change}>
        <SearchBar />
        <button className={styles.change__price__btn} onClick={(e: any) => openMasiveModal(e)}>Update masive prices</button>
        <input type="button" value="Aplicar Cambios de visibilidad" onClick={aplicarCambios} />
      </div>

      {/* onClick={(e: any) => editOpenModal(e, product)} */}

      {currentProducts?.map((product: any, index: number) => {
        return (
          <div className={styles.product__card_container} key={index}>
            <div className={styles.product_card__img_container}>
              <Image
                key={index}
                src={product.image?.[0]?.image}
                width={200}
                alt={product.name}
                height={200}
                priority
                className={styles.product_card__img}
              />
            </div>
            <div className={styles.product__card__info_container}>
              <p>{product.name.toUpperCase()}</p>
              <p>${product.price}</p>
            </div>
            <div className={styles.product__card__icons}>
              <button className={styles.product__card__icon_edit} onClick={(e: any) => editOpenModal(e, product)} >  <AiFillEdit /></button>

              <div className={styles.wishlist_fav_btn_container} onClick={(e: any) => handleVisibility(e, product)} >
                <p className={styles.wishlist_fav_btn}>
                  {product.available ? <AiFillEye /> : <AiFillEyeInvisible />}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <form className={styles.modal__container} onSubmit={(e) => submitHandler(e, productModal)}>
          <div className={styles.modal__btn_right_container}>
            <button className={styles.modal__close_modal_btn} onClick={closeModal}>x</button>
          </div>
          <h2>Edit Product</h2>

          <div className={styles.creation_form__section_container}>
            <p>Current Price: ${productModal.price}</p>

            <label className={styles.creation_form__label}>New Price: $</label>
            <input
              type="number"
              onChange={handleOnChangeNumber}
              name="price"
              value={formProduct.price}
              placeholder={"Price"}
              className={styles.creation_form__input}
              required
            />
            <span className={styles.creation_form__error_message}>{formErrors.price}</span>
          </div>

          <div className={styles.creation_form__section_container}>
            <p>Current Description: ${productModal.description}</p>
            <label className={styles.creation_form__label}>New Description:</label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleOnChangeInput}
              value={formProduct.description}
              className={styles.creation_form__textarea}
              required
            />
            <span className={styles.creation_form__error_message}>{formErrors.description}</span>
          </div>


          <div className={styles.creation_form__section_container}>
            <p>Current Images:</p>
            <div>{productModal.image?.map((img) =>
              <Image
                key={img.id}
                src={img.image}
                width={200}
                alt={productModal.name}
                height={200}
                priority
                className={styles.product_card__img}
              />

            )}
            </div>

            <label className={styles.creation_form__label}>Images</label>
            <input
              type="file"
              accept=".jpg , .png , .jpeg"
              onChange={handleOnFile}
              name="image"
              className={styles.creation_form__img_input}
              required
              multiple
            />
          </div>

          <button type="submit" className={styles.modal__start_purchase_btn}>Confirm Changes</button>
        </form>
      </Modal>


      {/* //MODAL -UPDATE MASIVE PRICES */}
      <Modal
        ariaHideApp={false}
        isOpen={modalUpdateIsOpen}
        onRequestClose={closeModalUpdate}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <form className={styles.modal__container} onSubmit={(e: any) => submitUpdateAllPrices(e, percent)}>
          <div className={styles.modal__btn_right_container}>
            <button className={styles.modal__close_modal_btn} onClick={closeModalUpdate}>x</button>
          </div>
          <h2>Edit ALL Products</h2>

          <input value={percent} onChange={handlerInput} placeholder="Add percent to update all products"></input>
          <button type="submit" className={styles.modal__start_purchase_btn}>Confirm Changes</button>
        </form>
      </Modal>


    </div >
  );
};

export default AdminManageProducts;