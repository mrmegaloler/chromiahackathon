import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../blockchain/AuthContext";
import { BlockchainContext } from "../blockchain/BlockchainContext";
import { transferTicketOperation } from "../blockchain/new_api";
import { TicketInfo } from "../Buy/TicketInfo";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import "./transfer.css";

type TransferProps = {
  id?: number;
};

const Transfer = ({ id }: TransferProps) => {
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
        id || 0
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
      <div className="content">
        <h3>Select the ticket(s) you would like to sell</h3>
        <TicketInfo title="Standing ticket" price={790} amount={1} />
        <div className="paddingSpace" />
        <h3>Address to which you would like to transfer</h3>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          onInput={handleAddressChange}
          placeholder="Enter address"
        />
        <button onClick={transferTicket} className="pinkBuyButton">
          Transfer Ticket
        </button>
        {message && <p>{message}</p>}
        Transfer 123
      </div>
    </div>
  );
};

export default Transfer;
