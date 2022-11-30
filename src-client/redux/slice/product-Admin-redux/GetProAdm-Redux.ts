import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { Iproduct, Iproducts } from "../../../../lib/types";
import userVerification from '../../../controllers/userVerification-controller'
import imageFormat from "../../../controllers/imageFormat";

export interface Iimg {
  image : string
  imageCloudinary : File
}


export interface IUpdateProduct {
  price : number
  description : string
  image : Iimg[]
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
  // un nvo estado para errores (cambiar tipo del inicial state) msg : ""
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
    // updateProducts: (state, action) => {
    //   state.products = action.payload;
    //  },
    cleanState: (state, action) => {
      state.productsUpdate = []
      state.productsToFilter = []
    },
    errorMessage: (state, action) => {
      state.errorMessage = action.payload      
    },
    cleanMessage : (state, action) => {
      state.errorMessage = " "
    }
  },
});





//cleanstate
export const clean = () => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.cleanState([]));
};



//Change all prices
export const updateAllPrices =  (object : IpriceEdit) => async (disptach: Function) => {
  try {  
    const myToken: any = await userVerification('server')
    const response = await axios({
      method: 'post',
      url: '/api/adminScope/put/updateAllPrices',
      data: {object},
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



//availability 
export const changeAvailability = (id: string) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateAvailability(id));
};


//envio de availability a la api
export const requestUpdateStatusProducts = async(obj: any) =>{
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
//end availability

//setea producto en estado para verlo en el modal y editarlo. Posteriormente hacer la request a la api con la info.
export const setProduct = (object: Iproduct) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateProduct(object))
}


export const updateProduct = (dataForm : IUpdateProduct) => async(dispatch:Function) => {
  try {
    console.log(dataForm, "data que llega a redux");
    //const myToken: any = await userVerification('client')
    const productUpdated =  await axios({
      method: 'post',
      url: '/api/adminScope/put/updateProduct',
      data: dataForm
      // headers: {
      //   "Authorization": myToken
      // }
    });
    console.log(productUpdated, "PRODUCTO ACTUALIZADO desde el back"); 
    
    return dispatch(reducerAdmin.actions.updateProduct(productUpdated))
  } catch (error) {
    console.log(error)
  }
};

// export const updateProduct = (dataForm : IUpdateProduct) => async(dispatch:Function) => {
//   try {
//     const myToken: any = await userVerification("client");
//    const myData = imageFormat(dataForm)
//     const myDataForm = { ...dataForm, image: myData}
//     console.log(myDataForm, "datos para actualizar producto")
    
//     const response = await axios({
//       method: "post",
//       url: "/api/adminScope/put/updateProduct",
//       data: myDataForm,
//       headers: {
//         "Authorization" : myToken
//       }
//     })

//     console.log(response.data, "producto actualizado");
     
//     return dispatch(reducerAdmin.actions.updateProduct(response.data.product))
//   } catch (error) {
//     console.log(error)
//   }
// };

//END EDIT PRODUCT

//Get by name
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
//end get by name


//get all products
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

    dispatch(reducerAdmin.actions.getAllProducts(allProducts));
  } catch (error) {
    console.log(error)
  }
};
//end get all products






export default reducerAdmin.reducer;