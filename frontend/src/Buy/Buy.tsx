import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import { ReactComponent as ChevronDownIcon } from "../icons/chevronDown.svg";
import { ReactComponent as ChevronUpIcon } from "../icons/chevronUp.svg";
import "./buy.css";
import { TicketInfo } from "./TicketInfo";

const Buy = () => {
  const [openAccordion, setOpenAccordion] = useState(false);

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
            Beyoncé
            <br />
            Renaissance World Tour
          </h1>
          <p>Avicii Arena, May 9th</p>
        </div>
        <hr />
        <div className="selection">
          <h2>Select your ticket type</h2>
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
