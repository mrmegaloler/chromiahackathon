import { Link } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import MyTicket from "./MyTicket/MyTicket";
import "./myTickets.css";

const MyTickets = () => {
  return (
    <div className="myTickets">
      <div className="topNav">
        <Link className="backButton" to="/">
          <BackArrowIcon />
        </Link>
        <h1>My Tickets</h1>
      </div>
      <MyTicket
        artist="Beyoncé"
        eventName="Renaissance World Tour"
        location="Avicii Arena"
        date="May 9th"
        price={790}
        timeLeft="5 days"
      />
      <MyTicket
        artist="Beyoncé"
        eventName="Renaissance World Tour"
        location="Avicii Arena"
        date="May 9th"
        price={790}
        timeLeft="5 days"
      />
      <h2>Expired tickets</h2>
      <MyTicket
        artist="Beyoncé"
        eventName="Renaissance World Tour"
        location="Avicii Arena"
        date="May 9th"
        price={790}
        timeLeft="5 days"
        disabled
      />
    </div>
  );
};

export default MyTickets;
