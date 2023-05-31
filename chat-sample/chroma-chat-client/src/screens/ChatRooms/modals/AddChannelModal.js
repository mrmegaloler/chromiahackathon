import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  FormGroup,
  ModalBody,
  ModalHeader,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Input,
  Button,
} from "reactstrap";

import { AuthContext } from "blockchain/AuthContext";
import { BlockchainContext } from "blockchain/BlockchainContext";
import * as api from "../../../blockchain/api";

const AddChannelModal = (props) => {
  const [channelName, setChannelName] = useState("");
  const [updating, setUpdating] = useState(false);

  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setChannelName("");
  }, [props.isOpen]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!channelName) return;
    setUpdating(true);
    try {
      await api.createChannel(
        blockchain.gtx,
        auth.sessionTokenGtv,
        auth.disposableKeyPair,
        channelName
      );
      setUpdating(false);
      props.closeModal();
      props.onChannelAdded();
    } catch (error) {
      props.errorHandler(error);
      setUpdating(false);
    }
  };

  const onChannelNameChanged = (e) => {
    const value =
      e.target.value.length > 0 && e.target.value[0] === "#"
        ? e.target.value.slice(1)
        : e.target.value;
    setChannelName(value);
  };
  return (
    <Modal isOpen={props.isOpen} toggle={props.closeModal}>
      <Form onSubmit={onSubmit}>
        <ModalHeader>Add Channel</ModalHeader>
        <ModalBody>
          <FormGroup className="mb-0">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>#</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                autoComplete="message"
                placeholder="Channel Name..."
                value={channelName}
                onChange={onChannelNameChanged}
              />
            </InputGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="text-right">
          <Button
            type="button"
            color="outline-secondary"
            onClick={props.closeModal}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={updating || !channelName}
          >
            Add
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
export default AddChannelModal;
