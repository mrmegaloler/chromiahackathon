import "./eventCard.css";
import beyonce from "../../images/Beyonce.jpeg";
import { Link } from "react-router-dom";

type EventCardProps = {
  artist: string;
  date: string;
  eventTitle: string;
  height: "small" | "medium" | "large";
  location: string;
  image: string;
};

const EventCard = ({
  artist,
  date,
  eventTitle,
  height,
  location,
  image,
}: EventCardProps) => {
  return (
    <Link className="eventCard" to="/event">
      <div
        className={`eventImage ${height}`}
        style={{ backgroundImage: `url(${beyonce})` }}
      />
      <div className="eventInfo">
        <h3>
          {artist} <br />
          {eventTitle}
        </h3>
        <p>
          {location}, {date}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
