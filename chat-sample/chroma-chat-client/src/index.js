import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { wagmiClient, ethereumClient } from "walletconnect";
import { BlockchainProvider } from "blockchain/BlockchainContext";
import { AuthProvider } from "blockchain/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BlockchainProvider>
    <AuthProvider>
      <WagmiConfig client={wagmiClient}>
        <App />
      </WagmiConfig>

      <Web3Modal
        projectId={process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </AuthProvider>
  </BlockchainProvider>
);
