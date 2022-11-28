import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEyeInvisible, AiFillEye, AiFillEdit } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { Iproduct, Ireducers } from "../../../lib/types";
import { getProductByName } from "../../redux/slice/product-Admin-redux/GetProAdm-Redux"
import { getProducts, updateProduct, changeAvailability, requestUpdateStatusProducts, clean, setProduct, updateAllPrices, cleanMsg } from "../../redux/slice/product-Admin-redux/GetProAdm-Redux"
import Modal from "react-modal";
import styles from "../../styles/AdminManageProducts.module.css";
import masiveValidate from "../../controllers/masiveValidation"

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

  const { products: allProducts, productsToFilter: filteredProducts, productEdit: productModal, productsUpdate: productsToUpdate, errorMessage: backMessage } = useSelector((state: Ireducers) => state.reducerAdmin)


  const dispatch: Function = useDispatch()

  let currentProducts: Iproduct[] = allProducts;
  // let currentProduct: Iproduct;

  if (filteredProducts?.length >= 1) {
    currentProducts = filteredProducts
  } else {
    currentProducts = allProducts
  }

  const masiveData = {
    quantity: "",
    direction: "",
    type: ""
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUpdateIsOpen, setmodalUpdateIsOpen] = useState(false);
  const [modalForm, setmodalForm] = useState(masiveData)
  const [modalError, setmodalError] = useState(masiveData)
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());


    const obj: any = {
      name: name,
      allProducts: allProducts,
    }
    dispatch(getProductByName(obj))
  };

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
    setmodalForm({ ...modalForm, quantity: value })
    setmodalError(masiveValidate({ ...modalForm, quantity: value }))
  }


  const handlerInputDirection = (e: any) => {
    const { value } = e.target
    setmodalForm({ ...modalForm, direction: value })
    setmodalError(masiveValidate({ ...modalForm, direction: value }))
  }

  const handlerInputType = (e: any) => {
    const { value } = e.target
    setmodalForm({ ...modalForm, type: value })
    setmodalError(masiveValidate({ ...modalForm, type: value }))
  }

  const submitUpdateAllPrices = (e: Event, modalForm) => {
    e.preventDefault()
    if (modalError.quantity || modalError.direction || modalError.type) return alert("Please fill all the fields correctly")
    dispatch(updateAllPrices(modalForm))
    // backMessage.length && alert(backMessage)
    //eze, perdon no pude resolver el delay del backMessage, creo que capaz la primera vez me trae undefined. pero se me quemaron los papeles..
    // la ruta funciona y la validacones tambien, es solo que el usuario no se entera porque no se realizo el cambio
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
    setActive(true)
  }


  const aplicarCambios = async () => {
    if (!productsToUpdate.length) return alert('Please select product to change')
    await requestUpdateStatusProducts(productsToUpdate)
    // ACA NO SOLAMENTE DEBERIA INFORMAR AL BACK DE LOS CAMBIOS
    // TAMBIEN DEBERIA ACTUALIZAR EL ESTADO DE LOS PRODUCTOS EN EL FRONT
    // porquela wishlist y el cart tomaron el producto de un estado viejo, de una request anterior
    //Y ASI FILTRAR EL ESTADO DEL CARRITO Y DE LA WHISLIST, eliminando los productos que no esten disponibles
    // deberia actualizar el estado de products y de favorites???
    // impedir que agregue al carrito si ya no esta disponible
    alert(` Products update: ${productsToUpdate.map((p) => p.name).reduce((e, acc) => e + " & " + acc)}`)
    setActive(false)
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
    setFormProduct(myForm)
    alert(`${name} is updated`)
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
    //setFormErrors(Validation({ ...formProduct, [name]: value }));
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



  const [active, setActive] = useState(false)



  return (
    <div className={styles.products_manage__container}>
      <h1 className={styles.products_manage__title}>Administration Product Managing</h1>

      <div className={styles.products_manage_comands}>
        <div className={styles.users_management__searchbar}>
          <input
            type="search"
            placeholder="Search product name"
            className={styles.search_bar__input}
            autoComplete="on"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <button className={styles.change__price__btn} onClick={(e: any) => openMasiveModal(e)}>Update All Prices</button>
      </div>
      {active ? <input className={styles.visibility__btn} type="button" value="Apply visibility changes" onClick={aplicarCambios} /> : null}

      {/* onClick={(e: any) => editOpenModal(e, product)} */}

      <div className={styles.products__map_container}>
        {currentProducts?.map((product: any, index: number) => {
          return (
            <div className={styles.product__card_container} key={index}>
              <div key={index + 123} className={styles.product_card__img_container}>
                <Image
                  key={index + 1}
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
                <button value={active} className={styles.product__card__icon_edit} onClick={(e: any) => handleVisibility(e, product)} > 
                  {// es por los tipos que no toma value eze?
                  product.available ? <AiFillEye /> : <AiFillEyeInvisible />}</button>
            </div>
          )
        })}
      </div>




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
            <p className={styles.current__data}>Current Price: ${productModal.price}</p>


            <input
              type="number"
              onChange={handleOnChangeNumber}
              name="price"
              value={formProduct.price}
              defaultValue={productModal.price}
              className={styles.new_price__input}
              placeholder="Add a new Price"
              required
            />
            <span className={styles.creation_form__error_message}>{formErrors.price}</span>
          </div>

          <div className={styles.creation_form__section_container}>
            <p className={styles.current__data}>Current Description: {productModal.description}</p>

            <textarea
              name="description"
              placeholder="Add a new Description"
              onChange={handleOnChangeInput}
              value={formProduct.description}
              className={styles.creation_form__textarea}
              required
            />
            <span className={styles.creation_form__error_message}>{formErrors.description}</span>
          </div>


          <div className={styles.creation_form__section_container}>
            <p className={styles.current__data}>Current Images:</p>
            <div className={styles.images__container}>
              {productModal.image?.map((img, index: number) =>
                <Image
                  key={index}
                  src={img.image}
                  width={200}
                  alt={productModal.name}
                  height={200}
                  priority
                  className={styles.product_card__img}
                />

              )}
            </div>

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
          <div className={styles.modal__purchase_btn_container}>
            <button type="submit" className={styles.modal__start_purchase_btn}>Confirm Changes</button>
          </div>
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
          <h2>Edit All Products</h2>
          <div className={styles.modal__selects__container}>
            <label className={styles.current__data}>How much do yo want you update your price product?</label>
            <input className={styles.search_bar__input} name="quantity" value={modalForm.quantity} onChange={handlerInputQuantity} placeholder="Add a quantity to update all products"></input>
            {modalError.quantity && <p className={styles.modal__error}>{modalError.quantity}</p>}
            <label className={styles.current__data}>Do you want to make a discount or an increase?</label>
            <select className={styles.filter__select} name="direction" onChange={handlerInputDirection} value={modalForm.direction}>
              <option value="">Choose</option>
              <option value="increase">Increase(+)</option>
              <option value="decrease">Discount(-)</option>
            </select>
            {modalError.direction && <p className={styles.modal__error}>{modalError.direction}</p>}
            <label className={styles.current__data}>How much do you want to update your price product? <br /> By percentage or by amount?</label>
            <select className={styles.filter__select} name="type" onChange={handlerInputType} value={modalForm.type}>
              <option value="">Choose</option>
              <option value="percent">Per Percent(%)</option>
              <option value="fixed">Per Fixed Amount($)</option>
            </select>
            {modalError.type && <p className={styles.modal__error}>{modalError.type}</p>}
          </div>
          <div className={styles.modal__purchase_btn_container}>
            <button type="submit" className={styles.modal__start_purchase_btn}>Confirm Changes</button>
          </div>
        </form>
      </Modal>
    </div >
  );
};

export default AdminManageProducts;







