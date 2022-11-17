import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iproduct } from "../../../../lib/types";
import userVerification from "../../../controllers/userVerification-controller";


type imageAddId = {
  id: string;
  image: string;
};

interface IproductPack {
  productsPreview: Iproduct[];
  imageUrlProd: imageAddId[];
}

const stateInit: IproductPack = {
  productsPreview: [],
  imageUrlProd: [],
};

interface IpayloadDeletePrev {
  payload: string;
}

interface IPayloadImage {
  payload: imageAddId;
}

interface IPayloadReset {
  payload: [];
}

export const reducerProductAdm = createSlice({
  name: "reducerProducAdm",
  initialState: stateInit,
  reducers: {
    previewProduc: () => {
      "PROXIMAMENTE";
    },
    afterSubmit: (state: IproductPack, action: IPayloadReset) => {
      state.imageUrlProd = action.payload;
    },
    postImage: (state: IproductPack, action: IPayloadImage) => {
      state.imageUrlProd.push(action.payload);
    },
    resetImage: (state: IproductPack, action: IPayloadReset) => {
      state.imageUrlProd = action.payload;
    },
    deleteImagePrev: (state: IproductPack, action: IpayloadDeletePrev) => {
      state.imageUrlProd = state.imageUrlProd.filter(
        (image: imageAddId) => image.id !== action.payload
      );
    },
  },
});


/// authenticacion
export const previewProduc = (data: Iproduct) => async (dispatch: Function) => {
  return "PROXIMAMENTE... ";
};

export const alfterOnsumbit = () => async (dispatch: Function) => {
  dispatch(reducerProductAdm.actions.afterSubmit([]));
};

export const uploadFormNoRedux = async (dataForm: Iproduct, image: any) => {
  const myToken: any = await userVerification("client");
  dataForm.image = image;
  const hola = await axios({
    method: "post",
    url: "/api/adminScope/post/productPostAdm",
    data: dataForm,
    headers: {
      Authorization: myToken,
    },
  });
};

export const allDeleteImg = (id: any) => async (dispatch: Function) => {
  const myToken: any = await userVerification("client");
  await axios({
    method: "post",
    url: "/api/adminScope/delete/admImgPrev/all",
    data: id,
    headers: {
      Authorization: myToken,
    },
  });

  dispatch(reducerProductAdm.actions.resetImage([]));
};

export const deleteImagePreview = (id: string) => async (dispatch: Function) => {
  const myToken: any = await userVerification("client");
  await axios({
    method: "post",
    url: `/api/adminScope/delete/admImgPrev/${id}`,
    headers: {
      Authorization: myToken,
    },
  });
  dispatch(reducerProductAdm.actions.deleteImagePrev(id));
};

export const postImageServer = (newImage: unknown) => async (dispatch: Function) => {
  const { data } = await axios({
    method: "post",
    url: "https://api.cloudinary.com/v1_1/dqhbskhe7/image/upload",
    data: newImage,
  });

  const { public_id, secure_url } = data;
  const myFracmet: string = public_id.split("/")[1];
    const myPackImage: imageAddId = {
    id: myFracmet,
    image: secure_url,
  };

  return dispatch(reducerProductAdm.actions.postImage(myPackImage));
};

export default reducerProductAdm.reducer;
