import "./desktopView.css";
import { ReactComponent as Phones } from "../images/phones.svg";

const DesktopView = () => {
  return (
    <div className="desktopBackground">
      <div className="info">
        <div className="textInfo">
          <h1>TicketHawk</h1>
          <h2>
            Please visit us on a mobile phone to access our amazing ticket
            portal
          </h2>
          <h3>www.tickethawk.com</h3>
        </div>
        <Phones />
      </div>
    </div>
  );
};

export default DesktopView;
