import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Ireducers } from "../../../lib/types";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import * as accion from "../../redux/slice/user-detail-redux/user-redux";
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";
import styles from "../../styles/Profile.module.css";

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
  
  const { name, email, image, addresses} = myProfide;

  const defaultImage = cloudinaryOrUrl(image, "client");


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
    dispatch(accion.getUserDetail(email));
  };


  interface myevent {
    target: {
      name: string;
    };
  }

  const handleOnclickDeleteaddress = (event: any) => {
    const { name } = event.target;
    dispatch(accion.deleteAddress(name));
  };

  const myImage: string | undefined | false = previewForm.image || defaultImage;
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

      <label className={styles.form__label}>Change password</label>
      <button className={styles.btn__change_password} onClick={() => dispatch(accion.changePassword(email))}>Change</button>

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


  const myAddress = addresses?.map((ele, index: number) => (
    <div className={styles.address} key={index}>
      {!previewForm.status && (
        <div className={styles.edition_close_btn_container}>
          <input
            type="button"
            value="X"
            name={ele.id}
            className={styles.edition_close_btn}
            onClick={handleOnclickDeleteaddress}
          />
        </div>
      )}

      <p className={styles.address_name}>
        <span className={styles.address_span}>Address {index + 1}:{" "}</span>
        <p className={styles.address_info}>{ele?.name_address.toLowerCase()}</p>
      </p>

      <p className={styles.address_street}>
        <span className={styles.address_span}>Street:{" "}</span>
        <p className={styles.address_info}>{ele?.street_name.toLowerCase()}{" "}{ele?.street_number}</p>
      </p>

      <p className={styles.address_phone}>
        <span className={styles.address_span}>Phone:{" "}</span>
        <p className={styles.address_info}>+{ele.phone.area_code}{" "}{ele.phone.number}</p>
      </p>
    </div>
  ));


  const emptyAddressesMessage = "There is no address associated with this account.";


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
        <div className={styles.addresses}>
          {addresses[0] ? myAddress : emptyAddressesMessage}
        </div>
      </div>

      <div className={styles.btn__aling}>{myButtonSwith}</div>
    </div>
  );
};

export default Profile;
