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

interface IpriceEdit {
  quantity: string,
  direction: string
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

    //  },
    cleanState: (state, action) => {
      state.productsUpdate = []
      state.productsToFilter = []
    }
  },
});



//cleanstate
export const clean = () => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.cleanState([]));
};



//Change all prices
export const updateAllPrices = async (object : IpriceEdit) => {
  console.log(object);

  try {
    const myToken: any = await userVerification('server')
    await axios({
      method: 'post',
      url: '/api/adminScope/put/updateAllPrices',
      data: {object},
      headers: {
      "Authorization": myToken
      }
    })

  } catch (error) {
    console.log(error);
  }
};


//availability 
export const changeAvailability = (id: string) => (dispatch: Function) => {
  return dispatch(reducerAdmin.actions.updateAvailability(id));
};


//envio de availability a la api
export const requestUpdateStatusProducts: any = async (obj: any) => {
  try {
    const myToken: any = await userVerification('server')
    await axios({
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
export const updateProduct: Function = async (dataForm) => {
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

//END EDIT PRODUCT

//Get by name
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