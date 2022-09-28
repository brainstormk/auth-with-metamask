import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Web3ContextProvider } from "./context/web3Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </React.StrictMode>
);
