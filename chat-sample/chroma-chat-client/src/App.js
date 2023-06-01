import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.scss";

import { BlockchainContext } from "blockchain/BlockchainContext";
import { AuthContext } from "blockchain/AuthContext";

import Login from "./screens/Login";
import ChatRooms from "./screens/ChatRooms";
import PopUp from "./components/PopUp";

const App = () => {
  const [toastList, setToastList] = useState([]);
  const toastListRef = useRef(toastList);
  toastListRef.current = toastList;

  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const initializeApp = async () => {
      await blockchain.init();
    };
    initializeApp();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      if (blockchain.gtx) {
        await auth.loginFromSession(blockchain.gtx);
      }
    };
    initializeApp();
    // eslint-disable-next-line
  }, [blockchain]);

  const showToast = (header, body) => {
    if (toastList.length < 10) {
      setToastList(toastList.concat({ header, body }));
      setTimeout(() => {
        setToastList(toastListRef.current.slice(1));
      }, 20000);
    }
  };

  return (
    <>
      {auth.isLoggedIn ? (
        <ChatRooms showToast={(header, body) => showToast(header, body)} />
      ) : (
        <Login />
      )}
      <div
        className="position-absolute"
        style={{ bottom: "10px", right: "10px", color: "black" }}
      >
        <div className="col" style={{ width: "18em" }}>
          {toastList.map((toast, index) => (
            <PopUp key={index} header={toast.header} body={toast.body}></PopUp>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
