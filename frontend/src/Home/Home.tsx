import { Link } from "react-router-dom";
import { ReactComponent as HamburgerIcon } from "../icons/Hamburger.svg";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as TicketIcon } from "../icons/Ticket.svg";
import { ReactComponent as Logo } from "../images/Logotype.svg";
import { EventCard } from "./EventCard";
import { EventType } from "./EventCard/EventCard";
import "./home.css";

type HomeProps = {
  events: EventType[];
  setEvent: (event: EventType) => void;
};

const Home = ({ events, setEvent }: HomeProps) => {
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
        {events.map((eventProps: any, index: any) => (
          <EventCard key={index} event={eventProps} />
        ))}
      </div>
    </div>
  );
};

export default Home;
