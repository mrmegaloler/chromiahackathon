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
import { getEvents, getMyTickets } from "./blockchain/new_api";
import { MyTicketType } from "./MyTickets/MyTicket/MyTicket";

const App = () => {
  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);
  const [reqEvents, setReqEvents] = useState<EventType[]>([]);
  const [event, setEvent] = useState<EventType>();
  const [myTickets, setMyTickets] = useState<MyTicketType[]>([]);

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
          auth?.disposableKeyPair?.pubKey
        );
        const eventsProps = events.map((tempEvent) => ({
          artist: tempEvent.name,
          date: new Date(tempEvent.date),
          eventTitle: tempEvent.description,
          location: tempEvent.location,
          id: tempEvent.id,
        }));
        setReqEvents(eventsProps);
      };

      fetchData();
    }
  }, [blockchain.gtx, auth?.disposableKeyPair?.pubKey, auth?.isLoggedIn]);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      const fetchData = async () => {
        const reqTickets = await getMyTickets(
          blockchain.gtx,
          auth?.disposableKeyPair?.pubKey
        );
        const fetchedTickets = reqTickets.map((tempTickets) => ({
          artist: tempTickets.event_name,
          eventName: tempTickets.event_description,
          location: tempTickets.event_location,
          date: new Date(tempTickets.event_date),
        }));
        setMyTickets(fetchedTickets);
        console.log(reqTickets);
      };

      fetchData();
    }
  }, [blockchain.gtx, auth?.disposableKeyPair?.pubKey, auth?.isLoggedIn]);

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
          <Route
            path="/my-tickets"
            element={<MyTickets tickets={myTickets} />}
          />
          <Route path="/buy" element={<Buy event={event} />} />
          <Route path="/ticket" element={<Ticket myTickets={myTickets} />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transfer" element={<Transfer id={event?.id} />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
