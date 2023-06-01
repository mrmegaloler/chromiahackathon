import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

const chains = [mainnet];

// Wagmi client
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: "f6033953b278fbc5cc1a59ce45440cb7" }),
]);

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    version: 1,
    projectId: "f6033953b278fbc5cc1a59ce45440cb7",
  }),
  publicClient,
});

// Web3Modal Ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
