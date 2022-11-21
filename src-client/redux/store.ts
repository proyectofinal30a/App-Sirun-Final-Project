import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducerUser from "./slice/user-detail-redux/user-redux";
import reducerProductAdm from "./slice/product-Admin-redux/ProAdm-Redux";
import reducerProducts from "./slice/products-client/Products-all-redux";
import reducerProductDetail from "./slice/products-client/Product-detail-redux";
import reducerFilters from "./slice/filter-product-client/filters-redux";
import reducerProductsByName from "./slice/products-client/ProductByName-redux";
import reducerCart from "./slice/cart-redux/cart";



const persistConfig = {
  key: 'rooyu',
  storage,
  whilelist: ['reducerCart']
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
