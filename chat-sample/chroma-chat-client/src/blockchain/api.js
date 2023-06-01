import crypto from "crypto-browserify";

export const createChannel = (
  gtx,
  sessionTokenGtv,
  disposableKeyPair,
  channelName
) => {
  const rq = gtx.newTransaction([disposableKeyPair.pubKey]);
  rq.addOperation("create_channel", sessionTokenGtv, channelName);
  rq.sign(disposableKeyPair.privKey, disposableKeyPair.pubKey);
  return rq.postAndWaitConfirmation();
};

export const postMessage = (
  gtx,
  sessionTokenGtv,
  disposableKeyPair,
  channelName,
  message
) => {
  const rq = gtx.newTransaction([disposableKeyPair.pubKey]);
  rq.addOperation("nop", crypto.randomBytes(32));
  rq.addOperation("post_message", sessionTokenGtv, channelName, message);
  rq.sign(disposableKeyPair.privKey, disposableKeyPair.pubKey);
  return rq.postAndWaitConfirmation();
};

export const inviteUserToChat = (
  gtx,
  sessionTokenGtv,
  disposableKeyPair,
  channelName,
  username
) => {
  const rq = gtx.newTransaction([disposableKeyPair.pubKey]);
  rq.addOperation("add_channel_member", sessionTokenGtv, channelName, username);
  rq.sign(disposableKeyPair.privKey, disposableKeyPair.pubKey);
  return rq.postAndWaitConfirmation();
};

export const getChannels = (gtx, userPubKey) => {
  return gtx.query({
    type: "get_channels",
    pubkey: userPubKey.toString("hex"),
  });
};

export const getMessages = (gtx, channelName) => {
  return gtx.query({
    type: "get_last_messages",
    channel_name: channelName,
  });
};

export const getBalance = (gtx, userPubKey) => {
  return gtx.query({
    type: "get_balance",
    pubkey: userPubKey.toString("hex"),
  });
};
