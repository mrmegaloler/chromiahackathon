import { Link } from "react-router-dom";
import beyonce from "../../images/Beyonce.jpeg";
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
};

const EventCard = ({ event, setEvent }: EventCardProps) => {
  return (
    <Link className="eventCard" to="/event" onClick={() => setEvent(event)}>
      <div
        className={`eventImage ${"medium"}`}
        style={{ backgroundImage: `url(${beyonce})` }}
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
