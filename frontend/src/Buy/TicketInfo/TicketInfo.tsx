import { ReactComponent as AddIcon } from "../../icons/Add.svg";
import { ReactComponent as RemoveIcon } from "../../icons/Remove.svg";
import "../buy.css";

type TicketInfoProps = {
  title: string;
  price: number;
  amount: 0 | 1;
};

const TicketInfo = ({ title, price, amount }: TicketInfoProps) => {
  return (
    <div className="ticketType">
      <div>
        <p>{title}</p>
        <p className="price">{price} SEK</p>
      </div>
      <div className="numberSelection">
        <button disabled={amount === 0}>
          <RemoveIcon />
        </button>
        <p>{amount}</p>
        <button>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default TicketInfo;
