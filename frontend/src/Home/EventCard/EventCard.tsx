import { Link } from "react-router-dom";
import beyonce from "../../images/Beyonce.jpeg";
import "./eventCard.css";

export type EventType = {
  artist: string;
  date: Date;
  eventTitle: string;
  location: string;
};

type EventCardProps = {
  event: EventType;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link className="eventCard" to="/event">
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
