import styles from "../../styles/Account.module.css";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { Ireducers } from "../../../lib/types";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import { postImageServerUsert } from "../../redux/slice/user-detail-redux/user-redux";
export default function Profile(): JSX.Element {
    const myStateForm = {
        image: '',
        name: '',
        status: true
    }
    const [imageUser, setImageUser] = useState(null)
    const dispatch: Function = useDispatch()
    const [previewForm, setPreviewFrom] = useState(myStateForm)

    type valueForm =
        | React.FormEvent<HTMLFormElement>
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>;
    const myProfide = useSelector((state: Ireducers) => state.reducerUser.user)
    if (!myProfide) return <div>Loading</div>
    const { name, email, image, direcciones, } = myProfide

    const myimage = cloudinaryOrUrl(image, 'client')

    const handleOnFile = (event: any) => {
        const imageFile = event.target.files;
        // const formData: any = new FormData();
        // formData.append("file", imageFile[0]);
        // formData.append("upload_preset", process.env.CLOUDINARY_USER_PROFILE);

        setImageUser(imageFile[0])
        if (!imageFile || !imageFile[0]) return;
        const imgURL: any = URL.createObjectURL(imageFile[0]);
        setPreviewFrom({ ...previewForm, image: imgURL })
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
        <form onSubmit={handleOnsubmit} >
            <input type="text" placeholder=" My Name" value={previewForm.name} onChange={handleOnchage} />
            <input
                type="file"
                accept=".jpg , .png , .jpeg"
                onChange={handleOnFile}
                name="image"
                className={styles.creation_form__img_input}
                required
            />
            <input type="submit" />
            <button onClick={handleOnclikSwich}>Revert</button>
        </form>
    )



    const myButtonSwith = previewForm.status ?
        <button onClick={handleOnclikSwich}>Profile Edition</button> :
        myForm;

    const myAdress = direcciones?.map((ele) => (
        <div>
            {ele.dir}
        </div>
    ))
    return (
        <div className={styles.account__container}>
            <div>
                <h1>{myName}</h1>
                <h3>{email}</h3>
                <Image
                    src={myImage || " "}
                    width='100'
                    height='100'
                    alt={myName}
                />
                <div>
                    {myButtonSwith}
                </div>
                {myAdress}
            </div>

        </div>
    );
}

