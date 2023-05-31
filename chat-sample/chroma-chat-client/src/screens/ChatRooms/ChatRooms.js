import { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";

import { BlockchainContext } from "blockchain/BlockchainContext";
import { AuthContext } from "blockchain/AuthContext";
import * as api from "../../blockchain/api";

import TopNav from "./panels/TopNav";
import ChannelList from "./panels/ChannelList";
import MainChannel from "./panels/MainChannel";
import AddChannelModal from "./modals/AddChannelModal";
import InviteChannelModal from "./modals/InviteChannelModal";

const ChatRooms = ({ showToast }) => {
  const [currentChannel, setCurrentChannel] = useState("");
  const [channels, setChannel] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tokenAmount, setTokenAmount] = useState("");
  const [isAddChannelModalVisible, setIsAddChannelModalVisible] =
    useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

  const blockchain = useContext(BlockchainContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const isSessionAliveInterval = setInterval(logoutIfSessionExpired, 2000);
    const fetchChannelsInterval = setInterval(fetchChannelList, 2000);
    const fetchMessagesInterval = setInterval(fetchMessages, 2000);
    return () => {
      if (isSessionAliveInterval !== null)
        clearInterval(isSessionAliveInterval);
      if (fetchChannelsInterval !== null) clearInterval(fetchChannelsInterval);
      if (fetchMessagesInterval !== null) clearInterval(fetchMessagesInterval);
    };
  });

  useEffect(() => {
    fetchUserBalance();
    // eslint-disable-next-line
  }, []);

  const logoutIfSessionExpired = () => {
    if (!auth.isSessionAlive()) {
      showToast("Info", "You have been logged out due to expired session.");
      auth.logout();
    }
  };

  const fetchChannelList = async () => {
    try {
      const result = await api.getChannels(
        blockchain.gtx,
        auth.currentUser.pubKey
      );
      if (result.length > 0 && isEmpty(channels)) {
        setChannel(result);
        setCurrentChannel(result[0]);
      } else {
        setChannel(result);
      }
    } catch (e) {
      showToast("Error", e.message);
      console.error(e);
    }
  };

  const fetchMessages = async () => {
    try {
      if (currentChannel.name) {
        const channelName = currentChannel.name;
        const result = await api.getMessages(
          blockchain.gtx,
          currentChannel.name
        );
        if (channelName === currentChannel.name) {
          setMessages(result);
        }
      }
    } catch (e) {
      showToast("Error", e.message);
      console.error(e);
    }
  };

  const fetchUserBalance = async () => {
    try {
      const balance = await api.getBalance(
        blockchain.gtx,
        auth.currentUser.pubKey
      );
      setTokenAmount(balance);
    } catch (e) {
      showToast("Error", e.message);
      console.error(e);
    }
  };

  const composeSwitchChannel = (channelName) => {
    const newChannel = channels.find((chan) => chan.name === channelName);
    if (newChannel) {
      setCurrentChannel(newChannel);
      setMessages([]);
    }
  };

  const toggleAddChannelModal = () => {
    setIsAddChannelModalVisible(!isAddChannelModalVisible);
  };
  const toggleInviteModal = () => {
    setIsInviteModalVisible(!isInviteModalVisible);
  };

  return (
    <>
      <div className="chatroom-wrapper">
        <TopNav tokenAmount={tokenAmount} />
        <MainChannel
          messages={messages}
          currentChannel={currentChannel}
          openInviteUserModal={toggleInviteModal}
          onMessageSent={fetchUserBalance}
          errorHandler={(error) => showToast("Error", error.message)}
        />
        <ChannelList
          addChannel={toggleAddChannelModal}
          composeSwitchChannel={composeSwitchChannel}
          channels={channels}
          currentChannel={currentChannel}
        />
      </div>
      <AddChannelModal
        isOpen={isAddChannelModalVisible}
        closeModal={toggleAddChannelModal}
        onChannelAdded={fetchUserBalance}
        errorHandler={(error) => showToast("Error", error.message)}
      />
      <InviteChannelModal
        isOpen={isInviteModalVisible}
        closeModal={toggleInviteModal}
        channelName={currentChannel.name}
        errorHandler={(error) => showToast("Error", error.message)}
      />
    </>
  );
};

export default ChatRooms;
