import styles from "../../styles/Account.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { Ireducers } from "../../../lib/types";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";

export default function Profile(): JSX.Element {
  const myStateForm = {
    image: "",
    name: "",
    status: true,
  };
  const [imageUser, setImageUser] = useState(null);
  const dispatch: Function = useDispatch();
  const [previewForm, setPreviewFrom] = useState(myStateForm);

  type valueForm =
    | React.FormEvent<HTMLFormElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;
  const myProfide = useSelector((state: Ireducers) => state.reducerUser.user);
  if (!myProfide) return <div>Loading</div>;
  const { name, email, image, direcciones } = myProfide;

  const myimage = cloudinaryOrUrl(image, "client");

  const handleOnFile = (event: any) => {
    const imageFile = event.target.files;
    // const formData: any = new FormData();
    // formData.append("file", imageFile[0]);
    // formData.append("upload_preset", process.env.CLOUDINARY_USER_PROFILE);

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

    const handleOnchage = (event: any) => {
        const { value } = event.target
        setPreviewFrom({ ...previewForm, name: value })
    }

    const handleOnsubmit = async (event: valueForm) => {
        event.preventDefault()
        const packFormUserUpdate = {
            name: previewForm.name,
            newImage: imageUser,
            email,
            deleteImage: image
        }
        await postImageServerUsert(packFormUserUpdate)
        setPreviewFrom(myStateForm)

        dispatch(getUserDetail(email))

    }


    const myImage: any = previewForm.image || myimage
    const myName: string = previewForm.name || name
    
    const handleOnclikSwich = () => {
        setPreviewFrom({
            image: '',
            name: '',
            status: !previewForm.status
        })
    }

    const myForm = (
        <form className={styles.form__container} onSubmit={handleOnsubmit} >
            <input className={styles.form__input} type="text" placeholder=" My Name" value={previewForm.name} onChange={handleOnchage} />
            <input
                className={styles.btn__img} 
                type="file"
                accept=".jpg , .png , .jpeg"
                onChange={handleOnFile}
                name="image"
                required
            />
            <div className={styles.election__btn}>
                <button   className={styles.btn} onClick={handleOnclikSwich}>Revert</button>
                <input   className={styles.btn__submit} type="submit" />
            </div>
        </form>
    )



    const myButtonSwith = previewForm.status ?
        <button  className={styles.switch__btn} onClick={handleOnclikSwich}>Profile Edition</button> :
        myForm;

    const myAdress = direcciones?.map((ele, index :number) => (
        <div className={styles.adress} key={index}>
            <p>Direccion {index + 1}:  {ele.dir} </p>
        </div>
    ))
    return (

        <div>
            <div className={styles.profile__container}>

                <Image
                    src={myImage || " "}
                    width='100'
                    height='100'
                    alt={name}
                    className={styles.avatar__image}
                    />
                    <h1 className={styles.profile__title}>{myName.toUpperCase()}</h1>
            </div>
                    
            <div className={styles.adress__container}>
                <p>Email: {email}</p>
                {myAdress}
            </div>
            
            <div className={styles.btn__aling}>
                {myButtonSwith}
            </div>  
        </div>
        <div>{myButtonSwith}</div>
        {myAdress}
      </div>
    </div>
  );
}
