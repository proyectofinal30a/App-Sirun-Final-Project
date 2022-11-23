import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import userVerification from "../../../controllers/userVerification-controller";


interface Istate {
  myOrder: {},
}

interface ImyOrder {
  myOrder: {
    external_reference: "", // necesario // nanoid() que recibimos por query
    id_user: "",            
    description: "",        
    total: "", // necesario              
    status: "", // necesario     
    date: "", // necesario       
    delivery_time: "", // necesario     
    user: Iuser,       
    product: [],   
    purchasedProducts: IpurchasedProducts[], // necesario     
    id_address: "",   
    address: Iaddress, // necesario     
  },
};

interface Iuser {
  user: {
    id: "",
    name: "", // necesario
    email: "", // necesario
    emailVerified: "",
    image: "",
    role: "",
    accounts: [],
    addresses: [],
    evaluations: [],
    orders: [],
    sessions: "",
    favorites: [],
  }
}

interface IpurchasedProducts {
  purchasedPorducts: {
    title: "", // necesario
    picture_url: "", // necesario
    unit_price: number, // necesario
    quantity: number, // necesario
    id_order: "",
    order: ImyOrder,
  }
}

interface Iaddress {
  address: {
    id: "",
    id_user: "",
    name_address: "", 
    zip_code: number, // necesario
    street_name: "", // necesario
    street_number: number, // necesario
    user: Iuser, 
    phone: number, // necesario
    order: ImyOrder,
  }
}


const initialState: ImyOrder = {
  myOrder: {},
};


export const reducerAfterPayment = createSlice({
  name: "reducerAfterPayment",
  initialState: initialState,
  reducers: {
    getOrder: (state, action) => {},
  },
});

export const getOrder = (id) => async (dispatch: Function) => {
  const { data }: any = await axios.get(`/${id}`);
  console.log(data);
  dispatch(reducerAfterPayment.actions.getOrder(data));
};

export default reducerAfterPayment.reducer;