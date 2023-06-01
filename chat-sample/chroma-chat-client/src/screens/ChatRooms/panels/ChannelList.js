import React from "react";
import { Button, Col } from "reactstrap";
import { isEmpty } from "lodash";

const ChannelList = (props) => {
  return (
    <Col className="py-3 chatroom-channel-list" id="channel-list">
      <h5 className="d-flex justify-content-between align-items-baseline">
        <span>Channel List</span>
        <Button
          color={isEmpty(props.channels) ? "primary" : "outline-light"}
          onClick={props.addChannel}
        >
          +
        </Button>
      </h5>
      {(props.channels || []).map((channel) => (
        <div
          key={channel.name}
          className={`channel-list-item hand ${
            channel.name === props.currentChannel.name ? "active" : ""
          }`}
          onClick={() => props.composeSwitchChannel(channel.name)}
        >
          #{channel.name}
        </div>
      ))}
    </Col>
  );
};

export default ChannelList;
