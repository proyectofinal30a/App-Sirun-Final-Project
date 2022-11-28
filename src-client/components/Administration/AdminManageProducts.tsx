import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEyeInvisible, AiFillEye, AiFillEdit } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { Iproduct, Ireducers } from "../../../lib/types";
import { getProducts, updateProduct, changeAvailability, requestUpdateStatusProducts, clean, setProduct, updateAllPrices, cleanMsg } from "../../redux/slice/product-Admin-redux/GetProAdm-Redux"
import SearchBar from "../SearchBar/SearchBar";
import Modal from "react-modal";
import styles from "../../styles/AdminManageProducts.module.css";
import masiveValidate from "../../controllers/masiveValidation"
import { current } from "@reduxjs/toolkit";
import Validation from "../Administration/ProductCreationForm/Validation"
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";
import { stat } from "fs";
// import { useRouter } from "next/router";


const AdminManageProducts = () => {
  const myForm = {
    price: 0,
    image: [],
    description: "",
  };


  const [formProduct, setFormProduct] = useState(myForm);
  
  const myErr = {
    price: "",
    description: "",
  };
  const [formErrors, setFormErrors] = useState(myErr);

  useEffect(() => {
    dispatch(clean())
    dispatch(getProducts())
    return () => {
      dispatch(clean())
      }
  }, [])

  const {products : allProducts, productsToFilter : filteredProducts, productEdit : productModal, productsUpdate : productsToUpdate, errorMessage : backMessage } = useSelector((state: Ireducers) => state.reducerAdmin)
 

  const dispatch: Function = useDispatch()

  let currentProducts: Iproduct[] = allProducts;
  // let currentProduct: Iproduct;
  
  if (filteredProducts?.length >= 1) {
    currentProducts = filteredProducts
  } else {
    currentProducts = allProducts
  }

  const masiveData = {
    quantity : "",
    direction : "", 
    type: ""
  }
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUpdateIsOpen, setmodalUpdateIsOpen] = useState(false);
  const [modalForm, setmodalForm] = useState(masiveData)
  const [modalError, setmodalError] = useState(masiveData)

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

 

  const handlerInputQuantity = (e: any) => {
    const { value } = e.target
    console.log(value, "value");
    setmodalForm({...modalForm, quantity : value})
    setmodalError(masiveValidate({...modalForm, quantity : value}))
  }

  
  const handlerInputDirection = (e: any) => {
    const { value } = e.target
    console.log(value);
    setmodalForm({...modalForm, direction : value})
    setmodalError(masiveValidate({...modalForm, direction : value}))
  }

  const handlerInputType = (e: any) => {
    const { value } = e.target
    console.log(value);
    setmodalForm({...modalForm, type : value})
    setmodalError(masiveValidate({...modalForm, type : value}))
  }

  const submitUpdateAllPrices = (e: Event, modalForm) => {
    e.preventDefault()
      console.log(modalForm, "data a enviar")
    if (modalError.quantity || modalError.direction || modalError.type) return alert("Please fill all the fields correctly")
    dispatch(updateAllPrices(modalForm))
      console.log(backMessage, "mensaje de back"); 
    backMessage.length && alert(backMessage)
    dispatch(cleanMsg())
    setmodalForm(masiveData)
    setmodalUpdateIsOpen(false) 
    dispatch(getProducts()) 
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
    //setFormErrors(Validation({ ...formProduct, [name]: value }));
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
      <SearchBar/>

      {/* onClick={(e: any) => editOpenModal(e, product)} */}
      
      <div className={styles.products__map_container}>
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
                <button className={styles.product__card__icon_edit} onClick={(e: any) => handleVisibility(e, product)} >
                  {product.available ? <AiFillEye /> : <AiFillEyeInvisible />}</button>
            </div>

          </div>
        )
      })}
      </div>

      <input className={styles.visibility__btn} type="button" value="Apply visibility changes" onClick={aplicarCambios} />
      <button className={styles.change__price__btn} onClick={(e: any) => openMasiveModal(e)}>Update All Prices</button>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Modal1"
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
        contentLabel="Modal2"
      >
        <form className={styles.modal__container} onSubmit={(e: any) => submitUpdateAllPrices(e, modalForm)}>
          <div className={styles.modal__btn_right_container}>
            <button className={styles.modal__close_modal_btn} onClick={closeModalUpdate}>x</button>
          </div>
          <h2>Edit ALL Products</h2>
          <input name="quantity" value={modalForm.quantity} onChange={handlerInputQuantity} placeholder="Add a quantity to update all products"></input>
          {modalError.quantity && <p className={styles.modal__error}>{modalError.quantity}</p>}
           <select name="direction" onChange={handlerInputDirection} value={modalForm.direction}>
            <option value="">Choose</option>
            <option value="increase">Plus(+)</option>
            <option value="decrease">Less(-)</option>
          </select>
          {modalError.direction && <p className={styles.modal__error}>{modalError.direction}</p>}
          <select name="type" onChange={handlerInputType} value={modalForm.type}> 
            <option value="">Choose</option>
            <option value="percent">Per Percent</option>
            <option value="fixed">Per Fixed Amount</option>
          </select>
          {modalError.type && <p className={styles.modal__error}>{modalError.type}</p>}
          {/* // alert: useSelector agregar un estado para el error */}
          <button type="submit" className={styles.modal__start_purchase_btn}>Confirm Changes</button>
        </form>
      </Modal>
    </div >
  );
};

export default AdminManageProducts;




