import "./home.css";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as HamburgerIcon } from "../icons/Hamburger.svg";
import { ReactComponent as TicketIcon } from "../icons/Ticket.svg";
import { ReactComponent as Logo } from "../images/Logotype.svg";
import { EventCard } from "./EventCard";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "../blockchain/BlockchainContext";
import { AuthContext } from "../blockchain/AuthContext";
import { EventCardProps } from "./EventCard/EventCard";
import { getEvents } from "../blockchain/new_api";

const Home = () => {
  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);
  const [reqEvents, setReqEvents] = useState<EventCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents(
        blockchain.gtx,
        auth.disposableKeyPair.pubkey
      );
      const eventsProps = events.map((tempEvent) => ({
        artist: tempEvent.name,
        date: tempEvent.date.toString(),
        eventTitle: tempEvent.name,
        height: "small",
        location: tempEvent.location,
        image: "no",
      }));
      setReqEvents(eventsProps);
    };

    fetchData();
  }, [blockchain.gtx, auth.disposableKeyPair.pubkey]);

  return (
    <div className="homeBackground">
      <div className="topInteractions">
        <Logo />
        <div className="buttons">
          <button className="hamburgerButton">
            <SearchIcon className="hamburger" />
          </button>
          <button className="hamburgerButton">
            <HamburgerIcon className="hamburger" />
          </button>
        </div>
      </div>
      <div className="dayButtons">
        <Link className="dayButton leftButton" to="my-tickets">
          <TicketIcon />
          <p>my tickets</p>
        </Link>
        <button className="dayButton rightButton">
          <TicketIcon />
          <p>my listings</p>
        </button>
      </div>
      <h2 className="exploreTitle">Explore events</h2>
      <div className="eventList">
        <div className="eventColumn">
          {reqEvents.map((eventProps: any, index: any) => (
            <EventCard key={index} {...eventProps} />
          ))}
        </div>
        <div className="eventColumn"></div>
      </div>
    </div>
  );
};

export default Home;
