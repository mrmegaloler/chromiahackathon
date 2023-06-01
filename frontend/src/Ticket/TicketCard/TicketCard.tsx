import "./ticketCard.css";
import qrCode from "../../images/QRcode.png";
import { ReactComponent as ChromiaLogo } from "../../images/chromia-logo.svg";
import { ReactComponent as InfoIcon } from "../../icons/info.svg";

type TicketCardProp = {
  artist: string;
  eventName: string;
  location: string;
  date: string;
  price: number;
};

const TicketCard = ({
  artist,
  eventName,
  location,
  date,
  price,
}: TicketCardProp) => {
  return (
    <div className="ticketCard">
      <InfoIcon className="infoIcon" />
      <div className="details">
        <h2>
          {artist}
          <br />
          {eventName}
        </h2>
        <p>
          {location}, {date}, {price} SEK
        </p>
      </div>
      <hr />
      <div className="qrWrapper">
        <div className="qr">
          <img src={qrCode} alt="qr code" />
        </div>
        <div className="powered">
          <p>powered by</p>
          <ChromiaLogo />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
