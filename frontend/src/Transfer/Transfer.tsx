import { Link } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import "./transfer.css";

const Transfer = () => {
  return (
    <div className="transferTickets">
      <div className="topTicketSection">
        <Link to="/ticket">
          <BackArrowIcon />
        </Link>
        <p>Second hand market</p>
      </div>
      <h3>Select the ticket(s) you would like to sell</h3>
      <h3>Set a price for your ticket</h3>
      Transfer 123
    </div>
  );
};

export default Transfer;
