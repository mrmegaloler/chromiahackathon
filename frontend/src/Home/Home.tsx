import "./home.css";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as HamburgerIcon } from "../icons/Hamburger.svg";
import { ReactComponent as TicketIcon } from "../icons/Ticket.svg";
import { EventCard } from "./EventCard";

const Home = () => {
  return (
    <div className="homeBackground">
      <div className="topInteractions">
        <div className="searchWrapper">
          <input className="searchBar" placeholder="Search" />
          <SearchIcon className="magnifying" />
        </div>
        <button className="hamburgerButton">
          <HamburgerIcon className="hamburger" />
        </button>
      </div>
      <div className="dayButtons">
        <button className="dayButton leftButton">
          <TicketIcon />
          <p>my tickets</p>
        </button>
        <button className="dayButton rightButton">
          <TicketIcon />
          <p>my listings</p>
        </button>
      </div>
      <h2 className="exploreTitle">Explore events</h2>
      <div className="eventList">
        <div className="eventColumn">
          <EventCard
            artist="Beyoncé"
            date="May 9th"
            eventTitle="Renaissance World Tour"
            height="medium"
            location="Avicii Arena"
            image="../../images/Beyonce.jpeg"
          />
          <EventCard
            artist="Beyoncé"
            date="May 9th"
            eventTitle="Renaissance World Tour"
            height="small"
            location="Avicii Arena"
            image="../../images/Beyonce.jpeg"
          />
          <EventCard
            artist="Beyoncé"
            date="May 9th"
            eventTitle="Renaissance World Tour"
            height="large"
            location="Avicii Arena"
            image="../../images/Beyonce.jpeg"
          />
        </div>
        <div className="eventColumn">
          <EventCard
            artist="Beyoncé"
            date="May 9th"
            eventTitle="Renaissance World Tour"
            height="small"
            location="Avicii Arena"
            image="../../images/Beyonce.jpeg"
          />
          <EventCard
            artist="Beyoncé"
            date="May 9th"
            eventTitle="Renaissance World Tour"
            height="large"
            location="Avicii Arena"
            image="../../images/Beyonce.jpeg"
          />
          <EventCard
            artist="Beyoncé"
            date="May 9th"
            eventTitle="Renaissance World Tour"
            height="medium"
            location="Avicii Arena"
            image="../../images/Beyonce.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
