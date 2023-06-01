import { Buy } from "./Buy";
import { DesktopView } from "./DesktopView";
import { Event } from "./Event";
import { Home } from "./Home";
import { MyTickets } from "./MyTickets";
import { Payment } from "./Payment";
import { Routes, Route } from "react-router-dom";
import { Ticket } from "./Ticket";
import { Transfer } from "./Transfer";

const App = () => {
  return (
    <>
      {window.innerWidth > 600 ? (
        <DesktopView />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      )}
    </>
  );
};

export default App;
