import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { Web3ContextProvider } from "./context/web3Context";
import store from "./state";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </Web3ContextProvider>
  </React.StrictMode>
);
