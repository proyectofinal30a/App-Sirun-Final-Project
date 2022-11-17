import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducerUser from "./slice/cliente-redux/Users";
import reducerProductAdm from "./slice/product-Admin-redux/ProAdm-Redux";
import reducerProducts from "./slice/products-client/Products-all-redux";
import reducerProductDetail from "./slice/products-client/Product-detail";
import reducerFilters from "./slice/filter-product-client/filters-redux";
import reducerProductsByName from "./slice/products-client/ProductByName-redux";
import reducerCart from "./slice/cart-redux/cart";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["reducerCart", "reducerProducts"]  //es una lista de reducers, es para elegir CUALES reducers guardar.
}

const myReducers = combineReducers({
  reducerProductAdm,
  reducerUser,
  reducerProducts,
  reducerProductDetail,
  reducerProductsByName,
  reducerCart,
  reducerFilters,
})


const persistedReducer = persistReducer(persistConfig, myReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
