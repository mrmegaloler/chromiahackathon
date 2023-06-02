import { Link } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import { ReactComponent as HandIcon } from "../icons/hand-right.svg";
import { ReactComponent as ArrowsIcon } from "../icons/CompareArrows.svg";
import "./ticket.css";
import { TicketCard } from "./TicketCard";
import { TicketEvent } from "./TicketEvent";
import { MyTicketType } from "../MyTickets/MyTicket/MyTicket";

type TicketProps = {
  myTickets: MyTicketType[];
};

const Ticket = ({ myTickets }: TicketProps) => {
  return (
    <div className="ticket">
      <div className="topTicketSection">
        <Link to="/my-tickets">
          <BackArrowIcon />
        </Link>
        <p>My tickets</p>
      </div>
      <div className="ticketScroll">
        {myTickets.map((ticket) => (
          <TicketCard
            artist={ticket.artist}
            eventName={ticket.eventName}
            location={ticket.location}
            date={ticket.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            price={790}
          />
        ))}
        <TicketCard
          artist="Beyoncé"
          eventName="Renaissance World Tour"
          location="Avicii Arena"
          date="May 9th"
          price={790}
        />
      </div>
      <div className="history">
        <h3>Ticket history</h3>
        <TicketEvent event="Ticket created" date="2023-05-01" />
        <TicketEvent event="Bought for 790 SEK" date="2023-05-01" />
      </div>
      <hr />
      <Link className="pinkButton" to="/">
        <p>Sell ticket(s)</p>
        <HandIcon />
      </Link>
      <Link className="pinkButton" to="/transfer">
        <p>Transfer ticket(s)</p>
        <ArrowsIcon />
      </Link>
    </div>
  );
};

export default Ticket;
