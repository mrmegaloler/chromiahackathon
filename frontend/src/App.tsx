import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import { BlockchainContext } from "./blockchain/BlockchainContext";
import { AuthContext } from "./blockchain/AuthContext";

import Login from "./Login";

import { Buy } from "./Buy";
import { DesktopView } from "./DesktopView";
import { Event } from "./Event";
import { Home } from "./Home";
import { MyTickets } from "./MyTickets";
import { Payment } from "./Payment";
import { Ticket } from "./Ticket";
import { Transfer } from "./Transfer";

const App = () => {
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
    console.log(auth.isLoggedIn);
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

  return (
    <div>
      {window.innerWidth > 600 ? (
        <DesktopView />
      ) : (auth as any).loggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
