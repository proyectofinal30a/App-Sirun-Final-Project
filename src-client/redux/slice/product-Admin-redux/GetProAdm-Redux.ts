import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Iproduct } from "../../../../lib/types";
import userVerification from '../../../controllers/userVerification-controller'



interface Iproducts {
  products: Iproduct[],
  productsToFilter: Iproduct[],
  productEdit: any,
  productsUpdate: any
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
  productsUpdate: []
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
    confirmEdit: (state, action) => {
      state.productEdit = action.payload;
    },
    updateProduct: (state, action) => {
      state.productEdit = action.payload;
    },
    updateAvailability: (state: any, action) => {
      state.productsUpdate = state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (product.available === true) { product.available === false }
          product.available === true
        }
      })
    },
    updateProducts: (state, action) => { }

    // cleanState: (state, action) => {
    //   console.log(action.payload)
    // }
  },
});

//updateAllproduts
export const updateAll = (product: any) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateProducts(product));
};


//Disponibilidad de productos
export const changeAvailability = (obj) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateAvailability(obj));
};
//

export const editProduct = (object: Iproduct) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.confirmEdit(object))
}

export const setProduct = (object: Iproduct) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateProduct(object))
}

// const obj = {
//   productsToFilter: [],
//   productEdit: {
//     id: "",
//     name: "",
//     price: 0,
//     dimension: 0,
//     available: false,
//     type: "vegan",
//     category: "cakes",
//     image: [],
//     description: "",
//     evaluation: [],
//   }
// }

// export const cleanRedux: any = () => (dispatch: Function) => {
//   return dispatch(reducerAdmin.actions.cleanState(obj))
// }


export const getProductByName: any = (objeto: any) => async (dispatch: Function) => {
  const arr = filteredByName(objeto)
  dispatch(reducerAdmin.actions.getByName(arr))
}

const filteredByName = (objeto) => {
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

    dispatch(reducerAdmin.actions.getAllProducts(allProducts));
  } catch (error) {
    console.log(error)
  }
};

export const updateProduct: Function = async (dataForm) => {
  console.log(dataForm)
  try {
    // const myToken: any = await userVerification('client')
    await axios({
      method: 'post',
      url: '/api/adminScope/put/updateProduct',
      data: dataForm
      // headers: {
      //   "Authorization": myToken
      // }
    });

  } catch (error) {
    console.log(error)
  }
};




export default reducerAdmin.reducer;