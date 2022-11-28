import "../src-client/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../src-client/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../src-client/redux/store";
import { SessionProvider } from "next-auth/react";
import { Storage } from "redux-persist";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
