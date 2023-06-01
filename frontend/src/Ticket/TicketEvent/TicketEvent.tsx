import "./ticketEvent.css";

type TicketEventProp = {
  event: string;
  date: string;
};

const Ticket = ({ event, date }: TicketEventProp) => {
  return (
    <div className="ticketEvent">
      <div className="dot" />
      <div className="text">
        <p>{event}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Ticket;
