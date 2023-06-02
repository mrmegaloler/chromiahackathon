import crypto from "crypto-browserify";
import { GtxClient } from "postchain-client/built/src/gtx/interfaces";

export type User = {
  pubkey: Buffer;
  name: string;
  email: string;
};

export type Event = {
  name: string;
  description: string;
  date: number;
  location: string;
};

export type GetEventsReturnType = {
  id: number;
  name: string;
  description: string;
  date: number;
  location: string;
};

export type GetUserReturnType = {
  id: number;
  name: string;
  email: string;
};

export type GetAllUsersReturnType = {
  id: number;
  name: string;
  email: string;
};

export async function getEvents(
  gtx: GtxClient,
  userPubKey: Buffer
): Promise<GetEventsReturnType[]> {
  // implementation here
  return await gtx.query("get_events");
}

export async function getAvailableTicketsForEvent(
  gtx: GtxClient,
  event: number
): Promise<number> {
  // implementation here
  return await gtx.query("get_available_tickets_for_event", { event: event });
}

export async function transferTicketOperation(
  gtx: GtxClient,
  sessionTokenGtv: any,
  disposableKeyPair: any,
  receiver: Buffer,
  ticket: number
): Promise<void> {
  console.log(disposableKeyPair);
  const tx = gtx.newTransaction([disposableKeyPair.pubKey]);
  tx.addOperation("transfer_ticket", receiver, ticket);
  tx.addOperation("nop", crypto.randomBytes(32));
  tx.sign(disposableKeyPair.privKey, disposableKeyPair.pubKey);
  tx.postAndWaitConfirmation();
}

export async function getMyTickets(
  gtx: GtxClient,
  pubkey: Buffer
): Promise<number[]> {
  // implementation here
  return await gtx.query("get_my_tickets", { pubkey: pubkey });
}
