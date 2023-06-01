import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button, Spinner, Alert } from "reactstrap";
import { useAccount, useSignMessage } from "wagmi";
import { splitSignature } from "ethers/lib/utils.js";
import { Web3Button } from "@web3modal/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as pcl from "postchain-client";

import { AuthContext } from "blockchain/AuthContext";
import { BlockchainContext } from "blockchain/BlockchainContext";

const Login = () => {
  const [disposableKeyPair, setDisposableKeyPair] = useState();
  const [truncatedAddress, setTruncatedAddress] = useState("");
  const { address, isConnected } = useAccount();
  const { signMessage, isLoading, isError, error } = useSignMessage({
    onSuccess(data) {
      const signature = splitSignature(data);
      const sessionToken = {
        message: messageRef.current,
        signedMessage: [signature.r, signature.s, signature.v],
      };

      auth.login(
        blockchain.gtx,
        address.substring(2),
        sessionToken,
        disposableKeyPair
      );
    },
  });
  const messageRef = useRef();
  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const generatedKeyPair = pcl.encryption.makeKeyPair();
    setDisposableKeyPair(generatedKeyPair);
    messageRef.current = {
      prompt:
        "Sign this message to prove that you have access to this wallet to sign in. This operation is off-chain and free of cost.",
      disposable_pubkey: generatedKeyPair.pubKey.toString("hex"),
      timestamp: Date.now(), // temporary timestamp to showcase message
    };
  }, []);

  useEffect(() => {
    isConnected &&
      setTruncatedAddress(
        address.substring(0, 5) + "..." + address.substring(address.length - 4)
      );
  }, [address, isConnected]);

  const loginHandler = async () => {
    messageRef.current = { ...messageRef.current, timestamp: Date.now() };
    signMessage({ message: JSON.stringify(messageRef.current) });
  };

  return (
    <Container fluid>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col
          className="m-auto"
          style={{ paddingBottom: "20vh" }}
          sm="10"
          md="6"
          lg="5"
          xl="4"
        >
          {isConnected ? (
            <>
              <h1>Hello {truncatedAddress}!</h1>
              <p>Sign the following message to sign in.</p>
              <SyntaxHighlighter
                language="json"
                style={anOldHope}
                wrapLongLines={true}
                customStyle={{ borderRadius: "5px", padding: "1em" }}
              >
                {JSON.stringify(messageRef.current, null, 4)}
              </SyntaxHighlighter>

              <Button
                style={{ minWidth: "7em" }}
                className="btn-block"
                color="primary"
                type="submit"
                disabled={isLoading}
                onClick={() => loginHandler()}
              >
                <span>Sign message</span>
                {isLoading ? (
                  <Spinner
                    size="sm"
                    type="grow"
                    color="light"
                    style={{ marginLeft: "1em" }}
                  />
                ) : null}
              </Button>

              {isError && (
                <Alert color="danger" style={{ marginTop: "1em" }}>
                  Error when signing message: "{error.message}"
                </Alert>
              )}
            </>
          ) : (
            <>
              <h1>Welcome!</h1>
              <p>Connect your wallet to continue.</p>
              <Web3Button />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
