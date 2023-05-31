import React, { useContext } from "react";
import { Button, Col } from "reactstrap";

import { AuthContext } from "blockchain/AuthContext";

const TopNav = ({ tokenAmount }) => {
  const auth = useContext(AuthContext);

  const truncatedUsername =
    auth.currentUser.username.substring(0, 5) +
    "..." +
    auth.currentUser.username.substring(auth.currentUser.username.length - 4);

  return (
    <Col className="chatroom-topnav py-2 d-flex justify-content-between align-items-baseline">
      <div className="d-flex align-items-baseline">
        Remaining tokens: {tokenAmount}
      </div>
      <div className="d-flex align-items-baseline">
        <span>Signed in as: {truncatedUsername}</span>
        <Button color="outline-dark" className="ml-3" onClick={auth.logout}>
          Logout
        </Button>
      </div>
    </Col>
  );
};

export default TopNav;
