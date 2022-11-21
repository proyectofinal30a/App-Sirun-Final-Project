
import React from "react";
import styles from "../../styles/Profile.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { Ireducers } from "../../../lib/types";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";


const Profile = () => {
  const dispatch: Function = useDispatch();

  const myStateForm = {
    image: "",
    name: "",
    status: true,
  };

  const [imageUser, setImageUser] = useState(null);
  const [previewForm, setPreviewFrom] = useState(myStateForm);

  type valueForm =
    | React.FormEvent<HTMLFormElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;
    

  const myProfide = useSelector((state: Ireducers) => state.reducerUser.user);
  if (!myProfide) return <div className={styles.loading}>Loading...</div>;

  const { name, email, image, direcciones } = myProfide;

  const myimage = cloudinaryOrUrl(image, "client");


  const handleOnFile = (event: any) => {
    const imageFile = event.target.files;

    setImageUser(imageFile[0]);
    if (!imageFile || !imageFile[0]) return;
    const imgURL: any = URL.createObjectURL(imageFile[0]);
    setPreviewFrom({ ...previewForm, image: imgURL });
  };


  const handleOnchage = (event: any) => {
    const { value } = event.target;
    setPreviewFrom({ ...previewForm, name: value });
  };



  const handleOnsubmit = async (event: valueForm) => {
    event.preventDefault();
    const packFormUserUpdate = {
      name: previewForm.name,
      newImage: imageUser,
      email,
      deleteImage: image,
    };

    await postImageServerUsert(packFormUserUpdate);
    setPreviewFrom(myStateForm);
    dispatch(getUserDetail(email));
  };


  const myImage: any = previewForm.image || myimage;
  const myName: string = previewForm.name || name;


  const handleOnclikSwich = () => {
    setPreviewFrom({
      image: "",
      name: "",
      status: !previewForm.status,
    });
  };


  const myForm = (
    <form className={styles.form__container} onSubmit={handleOnsubmit}>
      <label className={styles.form__label}>Enter your name</label>
      <input
        className={styles.form__input}
        type="text"
        placeholder="Enter your name"
        value={previewForm.name}
        onChange={handleOnchage}
      />

      <label className={styles.form__label}>Choose your profile picture</label>
      <input
        className={styles.btn__img}
        type="file"
        accept=".jpg , .png , .jpeg"
        onChange={handleOnFile}
        name="image"
        required
      />

      <div className={styles.election__btn}>
        <button className={styles.btn} onClick={handleOnclikSwich}>
          Revert changes
        </button>
        <input 
          className={styles.btn__submit} 
          type="submit" 
          value="Change profile"
        />
      </div>
    </form>
  );

  const myButtonSwith = previewForm.status ? (
    <button className={styles.switch__btn} onClick={handleOnclikSwich}>
      Edit profile
    </button>
  ) : (
    myForm
  );

  const myAdress = direcciones?.map((ele, index: number) => (
    <div className={styles.address} key={index}>
      <p>
        Address {index + 1}: {ele.dir.toLowerCase()}{" "}
      </p>
    </div>
  ));

  
  return (
    <div className={styles.profile__general_container}>
      <div className={styles.profile__container}>
        <Image
          src={myImage || "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"}
          width="200"
          height="200"
          alt={name}
          className={myImage ? styles.avatar__image : styles.avatar__loader}
        />
        <h1 className={styles.profile__title}>{myName.toUpperCase()}</h1>
      </div>

      <div className={styles.email__container}>
        <span>Email</span>
        <p>{email}</p>
      </div>
      <div className={styles.addresses_container}>
        <span>Addresses</span>
        <div className={styles.addresses}>{myAdress}</div>
      </div>
     

      <div className={styles.btn__aling}>{myButtonSwith}</div>
    </div>
  );
};

export default Profile;

