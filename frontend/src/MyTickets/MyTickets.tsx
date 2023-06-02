import { Link } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import MyTicket, { MyTicketType } from "./MyTicket/MyTicket";
import "./myTickets.css";

type MyTicketProps = {
  tickets: MyTicketType[];
  setTicket: (ticket: MyTicketType) => void;
};

const MyTickets = ({ tickets, setTicket }: MyTicketProps) => {
  console.log(tickets);
  return (
    <div className="myTickets">
      <div className="topNav">
        <Link className="backButton" to="/">
          <BackArrowIcon />
        </Link>
        <h1>My Tickets</h1>
      </div>
      {tickets.map((ticket, index) => {
        return <MyTicket myTicket={ticket} setTicket={setTicket} key={index} />;
      })}
      <h2>Expired tickets</h2>
      <MyTicket
        myTicket={{
          artist: "Beyoncé",
          eventName: "Renaissance World Tour",
          location: "Avicii Arena",
          date: new Date(),
          id: 0,
        }}
        setTicket={setTicket}
        disabled
      />
    </div>
  );
};

export default MyTickets;
