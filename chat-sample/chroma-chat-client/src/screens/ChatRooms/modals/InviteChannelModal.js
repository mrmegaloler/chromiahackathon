import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  FormGroup,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  Input,
  Button,
} from "reactstrap";

import { AuthContext } from "blockchain/AuthContext";
import { BlockchainContext } from "blockchain/BlockchainContext";
import * as api from "../../../blockchain/api";

const InviteChannelModal = ({
  isOpen,
  closeModal,
  channelName,
  errorHandler,
}) => {
  const [username, setUsername] = useState("");
  const [updating, setUpdating] = useState(false);

  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setUsername("");
  }, [isOpen]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!username) return;
    setUpdating(true);
    try {
      await api.inviteUserToChat(
        blockchain.gtx,
        auth.sessionTokenGtv,
        auth.disposableKeyPair,
        channelName,
        username
      );
      setUpdating(false);
      closeModal();
    } catch (error) {
      errorHandler(error);
      setUpdating(false);
    }
  }

  function onUserNameChanged(e) {
    setUsername(e.target.value);
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal}>
      <Form onSubmit={onSubmit}>
        <ModalHeader>Invite User to {channelName}</ModalHeader>
        <ModalBody>
          <FormGroup className="mb-0">
            <Input
              type="text"
              autoComplete="message"
              placeholder="Username"
              value={username}
              onChange={onUserNameChanged}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter className="text-right">
          <Button
            type="button"
            color="outline-secondary"
            onClick={closeModal}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={updating || !username}
          >
            Invite
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
export default InviteChannelModal;
