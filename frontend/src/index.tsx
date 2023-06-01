import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Web3Modal } from "@web3modal/react";
import { wagmiClient, ethereumClient } from "./walletconnect";
import { BlockchainProvider } from "./blockchain/BlockchainContext";
import { AuthProvider } from "./blockchain/AuthContext";
import { WagmiConfig } from "wagmi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BlockchainProvider>
    <AuthProvider>
      <WagmiConfig config={wagmiClient}>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </WagmiConfig>

      <Web3Modal
        projectId={"f6033953b278fbc5cc1a59ce45440cb7"}
        ethereumClient={ethereumClient}
      />
    </AuthProvider>
  </BlockchainProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
