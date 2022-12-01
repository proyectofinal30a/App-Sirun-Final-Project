import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Iproduct, Iproducts } from "../../../../lib/types";
import userVerification from '../../../controllers/userVerification-controller'


export interface Iimg {
  image: string
  imageCloudinary: File
}


export interface IUpdateProduct {
  price: number
  description: string
  image: Iimg[]
}


export interface IpriceEdit {
  quantity: number
  direction: string
  type: string
}


const stateInitial: Iproducts = {
  products: [],
  productsToFilter: [],
  productEdit: {
    id: "",
    name: "",
    price: 0,
    dimension: 0,
    available: false,
    type: "vegan",
    category: "cakes",
    image: [],
    description: "",
    evaluation: [],
  },
  productsUpdate: [],
  errorMessage: "",
}


export const reducerAdmin = createSlice({
  name: "reducerAdmin",
  initialState: stateInitial,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    getByName: (state, action) => {
      state.productsToFilter = action.payload
    },
    updateProduct: (state, action) => {
      state.productEdit = action.payload;
    },
    updateAvailability: (state: any, action) => {
      state.products = state.products.map((product: Iproduct) => {
        const { id } = product
        if (id === action.payload) {
          const produUpdateado = { ...product, available: !product.available }
          state.productsUpdate.push(produUpdateado)
          return produUpdateado
        }
        return product
      })
    },
    cleanState: (state, action) => {
      state.productsUpdate = []
      state.productsToFilter = []
    },
    errorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    cleanMessage: (state, action) => {
      state.errorMessage = " "
    }
  },
});






export const clean = () => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.cleanState([]));
};




export const updateAllPrices = (object: IpriceEdit) => async (disptach: Function) => {
  try {
    const myToken: any = await userVerification('server')
    const response = await axios({
      method: 'post',
      url: '/api/adminScope/put/updateAllPrices',
      data: { object },
      headers: {
        "Authorization": myToken
      }
    })

    disptach(reducerAdmin.actions.errorMessage(response.data.msg))
  } catch (error) {
    console.log(error);
  }
}


export const cleanMsg = () => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.cleanMessage(""));
};




export const changeAvailability = (id: string) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateAvailability(id));
};


export const requestUpdateStatusProducts = async (obj: any) => {
  try {
    const myToken: any = await userVerification('server')
    const productsUpdated = await axios({
      method: 'post',
      url: '/api/adminScope/put/updateAllProducts',
      data: { obj },
      headers: {
        "Authorization": myToken
      }
    });
  } catch (error) {
    console.log(error);
  }
}



export const setProduct = (object: Iproduct) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateProduct(object))
}

export const updateProduct = (dataForm: IUpdateProduct) => async (dispatch: Function) => {
  try {

    const myToken: any = await userVerification("client");
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

    const myData = await Promise.all(mydata)
      .then((newImageArray) => {
        return newImageArray;
      })
      .catch((err) => {
        console.log(err);
      });

    const myDataForm = { ...dataForm, image: myData }

    const response = axios({
      method: "post",
      url: "/api/adminScope/put/updateProduct",
      data: myDataForm,
      headers: {
        "Authorization": myToken
      }
    })

  } catch (error) {
    console.log(error)
  }
};


export const getProductByName: any = (objeto: any) => async (dispatch: Function) => {
  const arr = filteredByName(objeto)
  dispatch(reducerAdmin.actions.getByName(arr))
}

const filteredByName = (objeto: any) => {
  const { allProducts, name } = objeto
  let filteredSearchedProduct = allProducts?.map((product: any) => {
    let productName = product.name.toLowerCase()
    name.toLocaleLowerCase()
    if (productName.includes(name)) return product
  })
  return filteredSearchedProduct.filter((product: any) => product !== undefined);
}

export const getProducts: any = () => async (dispatch: Function) => {
  try {
    const myToken: any = await userVerification('client')
    const { data } = await axios({
      method: 'get',
      url: '/api/product/gets/products',
      headers: {
        "Authorization": myToken
      }
    });
    const allProducts = data
    
    return dispatch(reducerAdmin.actions.getAllProducts(allProducts));
  } catch (error) {
    console.log(error)
  }
};







export default reducerAdmin.reducer;