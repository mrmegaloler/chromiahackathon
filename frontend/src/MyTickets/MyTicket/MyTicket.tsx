import "./myTicket.css";
import beyonce from "../../images/Beyonce.jpeg";
import { ReactComponent as TicketIcon } from "../../icons/bigTicket.svg";
import { Link } from "react-router-dom";

type MyTicketProp = {
  artist: string;
  eventName: string;
  location: string;
  date: string;
  price: number;
  timeLeft: string;
  disabled?: boolean;
};

const MyTicket = ({
  artist,
  eventName,
  location,
  date,
  price,
  timeLeft,
  disabled,
}: MyTicketProp) => {
  return (
    <Link
      className={`myTicket ${disabled && "disabled"}`}
      to={disabled ? "" : "/ticket"}
    >
      <div className="image">
        <div
          className="picture"
          style={{ backgroundImage: `url(${beyonce})` }}
        />
        {!disabled && <div className="pink" />}
        <TicketIcon />
        <p>1</p>
      </div>
      <div className="eventInfo">
        <h2>
          {artist}
          <br />
          {eventName}
        </h2>
        <p>
          {location}, {date}, {price} SEK
        </p>
        <p className="pinkText">Starts in {timeLeft}</p>
      </div>
    </Link>
  );
};

export default MyTicket;
