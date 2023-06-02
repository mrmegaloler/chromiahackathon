import { Link } from "react-router-dom";
import { ReactComponent as TicketIcon } from "../../icons/bigTicket.svg";
import beyonce from "../../images/Beyonce.jpeg";
import concert from "../../images/concert.jpg";
import "./myTicket.css";

export type MyTicketType = {
  artist: string;
  eventName: string;
  location: string;
  date: Date;
  id: number;
};

type MyTicketProps = {
  myTicket: MyTicketType;
  disabled?: boolean;
  setTicket: (ticket: MyTicketType) => void;
};

const MyTicket = ({ myTicket, disabled, setTicket }: MyTicketProps) => {
  const getTimeLeft = () => {
    const today = new Date();
    const timeLeft = today.getTime() - (myTicket?.date || new Date()).getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 3600 * 24));
    return daysLeft;
  };

  return (
    <Link
      className={`myTicket ${disabled && "disabled"}`}
      to={disabled ? "" : "/ticket"}
      onClick={() => setTicket(myTicket)}
    >
      <div className="image">
        <div
          className="picture"
          style={
            myTicket.artist === "Beyoncé" || myTicket.artist === "Beyonce"
              ? { backgroundImage: `url(${beyonce})` }
              : { backgroundImage: `url(${concert})` }
          }
        />
        {!disabled && <div className="pink" />}
        <TicketIcon />
        <p>1</p>
      </div>
      <div className="eventInfo">
        <h2>
          {myTicket?.artist}
          <br />
          {myTicket?.eventName}
        </h2>
        <p>
          {myTicket?.location},{" "}
          {myTicket?.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          , 790 SEK
        </p>
        {!disabled && (
          <p className="pinkText">Starts in {getTimeLeft()} days</p>
        )}
      </div>
    </Link>
  );
};

export default MyTicket;
