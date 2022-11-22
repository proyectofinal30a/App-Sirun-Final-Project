import axios from "axios";
import { IproductSumbit } from "../../../../lib/types";
import userVerification from "../../../controllers/userVerification-controller";
type imageAddId = {
  id: string;
  image: string;
};

export const uploadFormNoRedux = async (dataForm: IproductSumbit) => {
  const myToken: any = await userVerification("client");
  const mydata= dataForm.image.map(async (e) => {

    const formData = new FormData();
    formData.append("file", e.imageCloudinary);
    formData.append("upload_preset", `${process.env.CLOUDINARY_PRODUCTS}`);
    const { data } = await axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload`,
      data: formData,

    });
    const { public_id, secure_url } = data;
    const myFracmet: string = public_id.split("/")[1];
    const myData = {
      id: myFracmet,
      image: secure_url,
    }
    return myData
  })

  Promise.all(mydata).then((data) => {
    const myNewProduct = { ...dataForm, image: data }
    axios({
      method: "post",
      url: "/api/adminScope/post/productPostAdm",
      data: myNewProduct,
      headers: {
        Authorization: myToken,
      },
    });

  }).catch((error) => {
    console.log(error)
  })







}




