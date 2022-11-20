import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  allDeleteImg,
  postImageServer,
  deleteImagePreview,
  uploadFormNoRedux,
  alfterOnsumbit,
} from "../../redux/slice/product-Admin-redux/ProAdm-Redux";
import { Iproduct, Ierror } from "../../../lib/types";
import validation from "./Validation";
import styles from "../../styles/ProductCreationForm.module.css";


export default function FormProduct(): JSX.Element {
  const dispatch: any = useDispatch();
  let myImage = useSelector((state: any) => state.reducerProductAdm.imageUrlProd);

  const N = Number;
  type valueSelec = React.ChangeEvent<HTMLSelectElement>;
  type valueForm =
    | React.FormEvent<HTMLFormElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;


  const myForm: Iproduct = {
    name: "",
    price: 0,
    dimension: 0,
    available: true,
    type: "none",
    image: [],
    description: "",
    category: "others",
  };
  const [formProduct, setFormProduct] = useState<Iproduct>(myForm);

  const myErr: Ierror = {
    name: "",
    price: "",
    dimension: "",
    description: "",
  };
  const [formErrors, setFormErrors] = useState(myErr);

  // const imagesArr: string[] = [];
  // const [imagesArray, setImagesArray] = useState(imagesArr);

  // const [select, setSelect] = useState({ selectType: "", selectCategory: "" });


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
    setFormErrors(validation({ ...formProduct, [name]: value }));  // Form validation
  };



  const handleOnChangeNumber = (event: any) => {
    const { name, value } = event.target;
    setFormProduct({ ...formProduct, [name]: value });
    setFormErrors(validation({ ...formProduct, [name]: value }));  // Form validation
  };



  const handelOnSelectCategory = ({ target }: valueSelec) => {
    const { name, value } = target;
    // setSelect({ ...select, selectCategory: name });
    setFormProduct({ ...formProduct, [name]: value });
    setFormErrors(validation({ ...formProduct, [name]: value }));  // Form validation
  };



  const handelOnSelectType = ({ target }: valueSelec) => {
    const { name, value } = target;
    // setSelect({ ...select, selectType: name });
    setFormProduct({ ...formProduct, [name]: value });
    setFormErrors(validation({ ...formProduct, [name]: value }));  // Form validation
  };



  const handleOnFile = (event: any) => {
    const imageFile: any = event.target.files;

    // setImagesArray([ ...imagesArray, imageFile ]);
    // if (imagesArray.length > 3) {
    //   alert("Cannot upload more than 4 photos per product.");
    // }

    const formData = new FormData();

    if (!imageFile[0]) return;
    formData.append("file", imageFile[0]);

    formData.append("upload_preset", `${process.env.CLOUDINARY_PRODUCTS}`);
    dispatch(postImageServer(formData));

  };



  const handleOnClickReset = () => {
    const myIds: any = myImage.map((packIgm: any) => {
      return { id: packIgm.id };
    });
    dispatch(allDeleteImg(myIds));
  };



  const handleOnClickDelete = ({ target }: any) => {
    const { name } = target;
    dispatch(deleteImagePreview(name));
  };



  const handleOnSubmit = (event: valueForm) => {
    event.preventDefault();
    uploadFormNoRedux(formProduct, myImage);
    dispatch(alfterOnsumbit());
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
    // setSelect({ selectType: "", selectCategory: "" });
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

          {myImage[0] &&
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

          {myImage[0] && myImage.map((e: any) => {
            return (
              <div key={e.id} className={styles.creation_form__img_show_container}>
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
                  name={e.id}
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