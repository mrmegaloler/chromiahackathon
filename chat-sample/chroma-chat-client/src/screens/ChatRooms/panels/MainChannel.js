import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Col,
  FormGroup,
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { isEmpty } from "lodash";

import * as api from "../../../blockchain/api";
import { BlockchainContext } from "blockchain/BlockchainContext";
import { AuthContext } from "blockchain/AuthContext";

import TimeStamp from "../components/TimeStamp";

const MainChannel = ({
  messages,
  currentChannel,
  openInviteUserModal,
  onMessageSent,
  errorHandler,
}) => {
  const [message, setMessage] = useState("");
  const messagesRef = useRef(null);

  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!messagesRef) {
      setTimeout(
        () =>
          (messagesRef.current.scrollTop = messagesRef.current.scrollHeight),
        0
      );
    }
  }, [messages]);

  const postMessage = async (e) => {
    e.preventDefault();
    const messageTrim = message.trim();
    if (!!messageTrim && !!currentChannel.name) {
      setMessage("");
      try {
        await api.postMessage(
          blockchain.gtx,
          auth.sessionTokenGtv,
          auth.disposableKeyPair,
          currentChannel.name,
          messageTrim
        );
        onMessageSent();
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  const onMessageChanged = (e) => {
    setMessage(e.target.value);
  };

  const renderChannelInfo = () => {
    const buttonVisibility =
      !!currentChannel.name &&
      currentChannel.admin === auth.currentUser.username
        ? "visible"
        : "hidden";

    return (
      <h5 className="d-flex justify-content-between align-items-baseline">
        <span>#{currentChannel.name}</span>
        {
          <Button
            color={messages.length > 0 ? "outline-primary" : "primary"}
            className="ml-3"
            onClick={openInviteUserModal}
            style={{
              visibility: buttonVisibility,
            }}
          >
            Invite
          </Button>
        }
      </h5>
    );
  };

  const renderChannelMessages = () => {
    return (
      <div
        className="flex-grow-1 d-flex flex-column justify-content-end"
        style={{ overflow: "hidden" }}
      >
        <div style={{ overflow: "auto" }} ref={messagesRef}>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <p
                style={{
                  wordBreak: "break-word",
                }}
                key={index}
              >
                <TimeStamp timestamp={message.timestamp} />{" "}
                <b
                  className={
                    message.poster === auth.currentUser.username
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  {" "}
                  {message.poster}
                </b>
                :<br />
                {message.text}
              </p>
            ))
          ) : (
            <div className="text-muted">
              Say something nice e.g. "Do you like spinach?"
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChatInputForm = () => {
    return (
      <Form className="flex-grow-0 mt-3" onSubmit={postMessage}>
        <FormGroup className="mb-0">
          <InputGroup>
            <Input
              type="text"
              autoComplete="message"
              placeholder="Chat..."
              value={message}
              onChange={onMessageChanged}
            />
            <InputGroupAddon addonType="append">
              <Button
                className="btn-block"
                style={{ zIndex: "0" }}
                color="primary"
                type="submit"
                disabled={!currentChannel.name}
              >
                Send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  };

  return (
    <Col
      id="main-channel"
      className="chatroom-main-channel d-flex flex-column justify-content-end py-3"
    >
      {!isEmpty(currentChannel) && (
        <>
          {renderChannelInfo()}
          {renderChannelMessages()}
          {renderChatInputForm()}
        </>
      )}
    </Col>
  );
};
export default MainChannel;
