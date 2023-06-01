import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { mainnet } from "wagmi/chains";

const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "231f3bc1c83c542057f978616e0f66f6" }),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Chat Sample", chains }),
  provider,
});

// Web3Modal Ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
