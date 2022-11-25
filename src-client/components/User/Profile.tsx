
import React from "react";
import styles from "../../styles/Profile.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { Ireducers } from "../../../lib/types";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";
import { useSession } from "next-auth/react"

const Profile = () => {
  const dispatch: Function = useDispatch();

  const myStateForm = {
    image: "",
    name: "",
    status: true,
  };

  const [imageUser, setImageUser] = useState(null);
  const [previewForm, setPreviewFrom] = useState(myStateForm);

  //CHANGE PASSWORD
  const {data} = useSession()
  const [newPassword, setNewPassword] = useState({
    original: '',
    repeat: ''
  })
  const [equal, setEqual] = useState(false)
  const [permited, setPermited] = useState(false)


  const userEmail: string | undefined = data?.user?.email
  const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{7,15}$/
  
  
  const handlerChangePassword = (e: any) => {
    if(e.target.name === 'original'){
    setNewPassword({
      original: e.target.value.toString(),
      repeat: newPassword.repeat
    })
    console.log(regPassword.test(newPassword.original), '!!!!!!!!!!!!!!!!!!!!!!!');
    
    if(regPassword.test(newPassword.original) && newPassword.original === newPassword.repeat){
      setPermited(true)
    } else {
      setPermited(false)
    }
  
  } else {
      setNewPassword(
        {
        original:newPassword.original,
        repeat: e.target.value.toString()
        })
        if(regPassword.test(newPassword.original) && newPassword.original === newPassword.repeat){
          setPermited(true)
        } else {
          setPermited(false)
        }
    }
  }

  type valueForm =
    | React.FormEvent<HTMLFormElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;


  const myProfide = useSelector((state: Ireducers) => state.reducerUser.user);

  if (!myProfide) return <div className={styles.loading}>Loading...</div>;

  const { name, email, image, addresses } = myProfide;

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
    dispatch(getUserDetail(email));
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
      <input
        className={permited ? styles.form__input : styles.form__input__error }
        type="text"
        name="original"
        placeholder="Enter new password"
        value={newPassword.original}
        onChange={(e) => handlerChangePassword(e)}
      />
      <input
        className={styles.form__input}
        type="text"
        name="repeat"
        placeholder="Repeat new password"
        value={newPassword.repeat}
        onChange={(e) => handlerChangePassword(e)}
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

  const myAdress = addresses?.map((ele, index: number) => (
    <div className={styles.address} key={index}>
      <p>
        Address {index + 1}: {ele?.name_address.toLowerCase()}{" "}
      </p>
      <p>
        Streer Number {index + 1}: {ele?.street_number}{" "}
      </p>
      <p>
        Streer Name {index + 1}: {ele?.street_name.toLowerCase()}{" "}
      </p>
      <p>
        Phone
      </p>
      <p>
        Area Code {index + 1}: {ele.phone.area_code}{" "}
      </p>
      <p>
        Number {index + 1}: {ele.phone.number}{" "}
      </p>
    </div>
  ));


  const emptyAddresses = "There is no address associated with this account.";

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
        <div className={styles.addresses}>{myAdress ? myAdress : emptyAddresses}</div>
      </div>


      <div className={styles.btn__aling}>{myButtonSwith}</div>
    </div>
  );
};

export default Profile;

