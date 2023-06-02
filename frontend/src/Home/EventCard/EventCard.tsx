import { Link } from "react-router-dom";
import beyonce from "../../images/Beyonce.jpeg";
import concert from "../../images/concert.jpg";
import "./eventCard.css";

export type EventType = {
  artist: string;
  date: Date;
  eventTitle: string;
  location: string;
  id: number;
};

type EventCardProps = {
  event: EventType;
  setEvent: (event: EventType) => void;
  number: number;
};

const EventCard = ({ event, setEvent, number }: EventCardProps) => {
  return (
    <Link className="eventCard" to="/event" onClick={() => setEvent(event)}>
      <div
        className={`eventImage ${number % 3 === 0 && "medium"} ${
          number % 3 === 1 && "small"
        } ${number % 3 === 0 && "large"}`}
        style={
          number === 0
            ? { backgroundImage: `url(${beyonce})` }
            : { backgroundImage: `url(${concert})` }
        }
      />
      <div className="eventInfo">
        <h3>
          {event?.artist} <br />
          {event?.eventTitle}
        </h3>
        <p>
          {event?.location},{" "}
          {event?.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          th
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
