import React, { useState } from "react";
import Image from "next/image";
import {
  uploadFormNoRedux,

} from "../../redux/slice/product-Admin-redux/ProAdm-Redux";
import { IproductSumbit, Ierror } from "../../../lib/types";
import validation from "./Validation";
import styles from "../../styles/ProductCreationForm.module.css";


export default function FormProduct(): JSX.Element {
  const N = Number;
  type valueSelec = React.ChangeEvent<HTMLSelectElement>;
  type valueForm =
    | React.FormEvent<HTMLFormElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;




  const myForm: IproductSumbit = {
    name: "",
    price: 0,
    dimension: 0,
    available: true,
    type: "none",
    image: [],
    description: "",
    category: "others",
  };
  const [formProduct, setFormProduct] = useState(myForm);

  const myErr: Ierror = {
    name: "",
    price: "",
    dimension: "",
    description: "",
  };
  const [formErrors, setFormErrors] = useState(myErr);


  const handleOnChangeInput = (event: any) => {
    const { name, value } = event.target;

    if (name === "available") {
      const myBolean: boolean = N(value) ? true : false;
      return setFormProduct({
        ...formProduct,
        [name]: myBolean,
      });
    }
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
    setFormErrors(validation({ ...formProduct, [name]: value }));
  };



  const handleOnChangeNumber = (event: any) => {
    const { name, value } = event.target;
    setFormProduct({ ...formProduct, [name]: value });
    setFormErrors(validation({ ...formProduct, [name]: value }));
  };



  const handelOnSelectCategory = ({ target }: valueSelec) => {
    const { name, value } = target;

    setFormProduct({ ...formProduct, [name]: value });
    setFormErrors(validation({ ...formProduct, [name]: value }));  // Form validation
  };



  const handelOnSelectType = ({ target }: valueSelec) => {
    const { name, value } = target;

    setFormProduct({ ...formProduct, [name]: value });
    setFormErrors(validation({ ...formProduct, [name]: value }));  // Form validation
  };



  const handleOnFile = (event: any) => {
    const imageFile: any = event.target.files;
    if (!imageFile || !imageFile[0]) return;
    const [...myPrevurl] = formProduct.image
    const myPack = {
      image: URL.createObjectURL(imageFile[0]),
      imageCloudinary: imageFile[0]
    }
    myPrevurl.push(myPack)
    setFormProduct({ ...formProduct, image: myPrevurl });

  };


  const handleOnClickReset = () => {
    setFormProduct({ ...formProduct, image: [] });
  };



  const handleOnClickDelete = ({ target }: any) => {
    const { name } = target;
    const [...myPrevurl] = formProduct.image
    const myFilter = myPrevurl.filter(e => e.image !== name)
    setFormProduct({ ...formProduct, image: myFilter });
  };



  const handleOnSubmit = async (event: valueForm) => {
    event.preventDefault();
    await uploadFormNoRedux(formProduct);
    setFormProduct({
      name: "",
      price: 0,
      dimension: 0,
      available: true,
      type: "none",
      image: [],
      description: "",
      category: "others",
    });
    alert("New product added.");
  };



  return (
    <div className={styles.creation_form__container}>
      <h1>Product Creation Form</h1>

      <div className={styles.creation_form__separator}>
        <form onSubmit={handleOnSubmit} className={styles.creation_form}>

          <div className={styles.creation_form__section_container}>
            <label className={styles.creation_form__label}>Name</label>
            <input
              type="text"
              onChange={handleOnChangeInput}
              value={formProduct.name}
              name="name"
              placeholder="Name"
              className={styles.creation_form__input}
              required
            />
            <span className={styles.creation_form__error_message}>{formErrors.name}</span>
          </div>


          <div className={styles.creation_form__section_container}>
            <label className={styles.creation_form__label}>Price</label>
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
            <label className={styles.creation_form__label}>Dimention</label>
            <input
              type="number"
              onChange={handleOnChangeNumber}
              name="dimension"
              value={formProduct.dimension}
              placeholder="Dimention"
              className={styles.creation_form__input}
              required
            />
            <span className={styles.creation_form__error_message}>{formErrors.dimension}</span>
          </div>


          <div className={styles.creation_form__section_container}>
            <p className={styles.creation_form__label}>Availability</p>
            <div className={styles.creation_form__available_container}>
              <label htmlFor="availabe">
                {formProduct.available ? "Disponible" : "No Disponible"}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                onChange={handleOnChangeInput}
                defaultChecked={formProduct.available}
                name="available"
                className={styles.creation_form__available_btn}
              />
            </div>
          </div>


          <div className={styles.creation_form__section_container}>
            <label className={styles.creation_form__label}>Description</label>
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


          <label className={styles.creation_form__label}>Category</label>
          <select
            name="category"
            // value={select.selectCategory}
            onChange={handelOnSelectCategory}
            className={styles.creation_form__select}
          >
            <option value="" disabled>Select category</option>
            <option value="others">Others</option>
            <option value="cakes">Cakes</option>
            <option value="muffins">Muffins</option>
            <option value="cookies">Cookies</option>
            <option value="bakery">Bakery</option>
            <option value="desserts">Desserts</option>
            <option value="pies">Pies</option>
          </select>


          <label className={styles.creation_form__label}>Type of diet</label>
          <select
            name="type"
            // value={select.selectType}
            onChange={handelOnSelectType}
            className={styles.creation_form__select}
          >
            <option value="" disabled>Select type of diet</option>
            <option value="none">Without type of diet</option>
            <option value="celiac">Celiac</option>
            <option value="vegan_celiac">Vegan and celiac</option>
            <option value="vegan">Vegan</option>
          </select>


          <div className={styles.creation_form__section_container}>
            <label className={styles.creation_form__label}>Images</label>
            <input
              type="file"
              accept=".jpg , .png , .jpeg"
              onChange={handleOnFile}
              name="image"
              className={styles.creation_form__img_input}
              required
            />
          </div>


          <button
            type="submit"
            className={[styles.creation_form__input_btn, styles.creation_form__submit_btn].join(" ")}
          >
            Add new product
          </button>
        </form>


        <div className={styles.creation_form__images_container}>

          {formProduct.image[0] &&
            <>
              <p className={styles.creation_form__images_container__title}>Images control</p>
              <button
                onClick={handleOnClickReset}
                className={[styles.creation_form__input_btn, styles.creation_form__reset_btn].join(" ")}
              >
                Reset all image/s
              </button>
            </>
          }

          {formProduct.image[0] && formProduct.image.map((e, index) => {
            return (
              <div key={index} className={styles.creation_form__img_show_container}>
                <div className={styles.creation_form__img_container}>
                  <Image
                    src={e.image}
                    alt=""
                    width="1000"
                    height="300"
                    className={styles.creation_form__img}
                  />
                </div>

                <input
                  type={"button"}
                  name={e.image}
                  onClick={handleOnClickDelete}
                  value={"Delete"}
                  className={styles.creation_form__input_btn_delete}
                />
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}