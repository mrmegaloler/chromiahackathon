import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

import { AuthContext } from "./blockchain/AuthContext";
import { BlockchainContext } from "./blockchain/BlockchainContext";

import Login from "./Login";

import { Buy } from "./Buy";
import { DesktopView } from "./DesktopView";
import { Event } from "./Event";
import { Home } from "./Home";
import { MyTickets } from "./MyTickets";
import { Payment } from "./Payment";
import { Ticket } from "./Ticket";
import { Transfer } from "./Transfer";
import { EventType } from "./Home/EventCard/EventCard";
import { getEvents } from "./blockchain/new_api";

const App = () => {
  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);
  const [reqEvents, setReqEvents] = useState<EventType[]>([]);
  const [event, setEvent] = useState<EventType>();

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

  useEffect(() => {
    if (auth?.isLoggedIn) {
      const fetchData = async () => {
        const events = await getEvents(
          blockchain.gtx,
          auth?.disposableKeyPair?.pubkey
        );
        const eventsProps = events.map((tempEvent) => ({
          artist: tempEvent.name,
          date: new Date(tempEvent.date),
          eventTitle: tempEvent.name,
          location: tempEvent.location,
        }));
        setReqEvents(eventsProps);
        console.log(eventsProps);
      };

      fetchData();
    }
  }, [blockchain.gtx, auth?.disposableKeyPair?.pubkey, auth?.isLoggedIn]);

  return (
    <div>
      {window.innerWidth > 600 ? (
        <DesktopView />
      ) : auth.isLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<Home events={reqEvents} setEvent={setEvent} />}
          />
          <Route path="/event" element={<Event event={event} />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
