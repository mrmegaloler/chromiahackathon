import { Link } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import "./transfer.css";
import { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "../blockchain/BlockchainContext";
import { AuthContext } from "../blockchain/AuthContext";
import { transferTicketOperation } from "../blockchain/new_api";

const Transfer = () => {
  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const transferTicket = async () => {
    try {
      console.log(
        blockchain.gtx,
        auth.sessionTokenGtv,
        auth?.disposableKeyPair,
        Buffer.from(address, "hex")
      );
      const events = await transferTicketOperation(
        blockchain.gtx,
        auth.sessionTokenGtv,
        auth?.disposableKeyPair,
        Buffer.from(address, "hex"),
        5 //Ellen fixa så att du får id som input här
      );

      // If successful, display a success message
      setMessage("Ticket transfer was successful!");
    } catch (error: any) {
      // If an error occurs, display the error message
      setMessage(`Ticket transfer failed: ${error.message}`);
    }
  };

  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
    console.log(address);
  };

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
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        onInput={handleAddressChange}
        placeholder="Enter address"
      />
      <button onClick={transferTicket}>Transfer Ticket</button>
      {message && <p>{message}</p>}
      Transfer 123
    </div>
  );
};

export default Transfer;
