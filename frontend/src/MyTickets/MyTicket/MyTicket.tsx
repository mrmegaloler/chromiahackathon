import { Link } from "react-router-dom";
import { ReactComponent as TicketIcon } from "../../icons/bigTicket.svg";
import beyonce from "../../images/Beyonce.jpeg";
import "./myTicket.css";

export type MyTicketType = {
  artist: string;
  eventName: string;
  location: string;
  date: Date;
};

type MyTicketProps = {
  myTicket: MyTicketType;
  disabled?: boolean;
};

const MyTicket = ({ myTicket, disabled }: MyTicketProps) => {
  const getTimeLeft = () => {
    const today = new Date();
    const timeLeft = (myTicket?.date || new Date()).getTime() - today.getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 3600 * 24));
    return daysLeft;
  };

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
        <p className="pinkText">Starts in </p>
        {/* {getTimeLeft.toLocaleString} */}
      </div>
    </Link>
  );
};

export default MyTicket;
