import { IUpdateProduct } from "../redux/slice/product-Admin-redux/GetProAdm-Redux"
import axios from "axios"

export default async function imageFormat(dataForm: IUpdateProduct) {

  const mydata = dataForm.image.map(async (e) => {
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
    };
    return myData;
  });

  Promise.all(mydata)
    .then((newImageArray) => {
      console.log(newImageArray, "imagenes formateadas");
      return newImageArray;;
    })
    .catch((err) => {
      console.log(err);
    });
}