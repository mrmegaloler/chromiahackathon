import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../blockchain/BlockchainContext";
import { getAvailableTicketsForEvent } from "../blockchain/new_api";
import { EventType } from "../Home/EventCard/EventCard";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import { ReactComponent as ChevronDownIcon } from "../icons/chevronDown.svg";
import { ReactComponent as ChevronUpIcon } from "../icons/chevronUp.svg";
import "./buy.css";
import { TicketInfo } from "./TicketInfo";

type BuyProps = {
  event?: EventType;
};

const Buy = ({ event }: BuyProps) => {
  const [openAccordion, setOpenAccordion] = useState(false);
  const blockchain = useContext(BlockchainContext);
  const [availableTickets, setAvailableTickets] = useState<number>();
  const [soldTickets, setSoldTickets] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const ticketsGone = await getAvailableTicketsForEvent(
        blockchain.gtx,
        event?.id || 2
      );
      const ticketsLeft = 10 - ticketsGone;
      setAvailableTickets(ticketsLeft);
      setSoldTickets(ticketsGone);
    };

    fetchData();
  }, [blockchain.gtx, event?.id]);

  return (
    <div className="purchaseSelection">
      <div>
        <div className="topTicketSection">
          <Link to="/event">
            <BackArrowIcon />
          </Link>
          <p>Ticket selection</p>
        </div>
        <div className="eventInfo">
          <h1>
            {event?.artist}
            <br />
            {event?.eventTitle}
          </h1>
          <p>
            {event?.location},{" "}
            {event?.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            th
          </p>
        </div>
        <hr />
        <div className="selection">
          <h2>Select your ticket type</h2>
          <p className="amountOfTickets">
            {availableTickets} available tickets out of{" "}
            {(soldTickets || 0) + (availableTickets || 0)}
          </p>
          <TicketInfo title="Standing ticket" price={790} amount={1} />
          <TicketInfo title="Seated ticket" price={790} amount={0} />
          <div className="accordion">
            <button
              className="title"
              onClick={() => setOpenAccordion((prev) => !prev)}
            >
              <p className="accordionText">Explore second hand tickets</p>
              {openAccordion ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
            {openAccordion && (
              <div>
                <TicketInfo title="Standing ticket" price={750} amount={0} />
                <TicketInfo title="Standing ticket" price={700} amount={0} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bottomOverlay">
        <Link className="buyButton" to="/ticket">
          Buy 1 ticket
        </Link>
      </div>
    </div>
  );
};

export default Buy;
