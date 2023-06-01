import { createContext, useState } from "react";

import * as pcl from "postchain-client";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [gtx, setGtx] = useState();

  const init = async () => {
    try {
      const endpointPool = ["http://localhost:7740"];
      const blockchainRID = process.env.REACT_APP_BLOCKCHAIN_RID;
      const rest = pcl.restClient.createRestClient(
        endpointPool,
        blockchainRID,
        5
      );

      setGtx(pcl.gtxClient.createClient(rest, blockchainRID, []));

      console.log("Postchain client initialized.");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <BlockchainContext.Provider value={{ gtx, init }}>
      {children}
    </BlockchainContext.Provider>
  );
};
