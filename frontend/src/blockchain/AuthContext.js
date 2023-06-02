import { createContext, useState } from "react";
import crypto from "crypto-browserify";
import * as pcl from "postchain-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [sessionTokenGtv, setSessionTokenGtv] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [disposableKeyPair, setDisposableKeyPair] = useState(null);

  const SESSION_LENGTH = 12000; // 20 minutes

  const loginFromSession = async (gtx) => {
    const session = JSON.parse(sessionStorage.getItem("session"));
    if (session) {
      return login(
        gtx,
        session.pubKey,
        session.sessionToken,
        pcl.encryption.makeKeyPair(session.disposablePrivKey)
      );
    } else return {};
  };

  const login = async (gtx, pubKey, newSessionToken, newDisposableKeyPair) => {
    try {
      let userResult = await gtx.query({ type: "get_user", pubkey: pubKey });
      const newSessionTokenGtv = sessionTokenToGtv(newSessionToken);

      if (!userResult) {
        const rq = gtx.newTransaction([newDisposableKeyPair.pubKey]);
        const username = "0x" + pubKey; // TODO: Add proper usernames?
        rq.addOperation("register", newSessionTokenGtv, username);
        rq.addOperation("nop", crypto.randomBytes(32));
        rq.sign(newDisposableKeyPair.privKey, newDisposableKeyPair.pubKey);
        await rq.postAndWaitConfirmation();
        userResult = await gtx.query({ type: "get_user", pubkey: pubKey });
      }

      setCurrentUser({
        id: userResult.id,
        username: userResult.username,
        pubKey,
      });
      setSessionToken(newSessionToken);
      setSessionTokenGtv(newSessionTokenGtv);
      setDisposableKeyPair(newDisposableKeyPair);

      sessionStorage.setItem(
        "session",
        JSON.stringify({
          pubKey: pubKey,
          sessionToken: newSessionToken,
          disposablePrivKey: Buffer.from(newDisposableKeyPair.privKey).toString(
            "hex"
          ),
        })
      );
      console.log("logging in");

      setIsLoggedIn(true);

      return currentUser;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setSessionToken(null);
    sessionStorage.removeItem("session");
    setIsLoggedIn(false);
    return currentUser;
  };

  const sessionTokenToGtv = (token) => {
    const tokenCopy = { ...token };
    return [Object.values(tokenCopy.message), tokenCopy.signedMessage];
  };

  const isSessionAlive = () => {
    const currentTime = Date.now();
    if (sessionToken.message.timestamp < currentTime - SESSION_LENGTH)
      return false;
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        loginFromSession,
        logout,
        isLoggedIn,
        isSessionAlive,
        currentUser,
        sessionToken,
        sessionTokenGtv,
        disposableKeyPair,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
