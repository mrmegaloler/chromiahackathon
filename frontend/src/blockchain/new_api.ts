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

export enum TICKETSTATUS {
  CREATED,
  TRANSFERRED,
  REDEEMED,
}

export type GetMyTicketsReturnType = {
  ticket_id: number;
  user_pubkey: Buffer;
  ticket_status: TICKETSTATUS;
  ticket_description: string;
  event_id: number;
  event_name: string;
  event_description: string;
  event_date: number;
  event_location: string;
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
): Promise<GetMyTicketsReturnType[]> {
  // implementation here
  const sessionStored = sessionStorage.getItem("session");
  const session = JSON.parse(sessionStored || "");

  const tickets = await gtx.query("get_my_tickets", {
    pubkey: Buffer.from(session.pubKey, "hex"),
  });
  return tickets;
}

export async function getUnsoldTickets(
  gtx: GtxClient,
  pubkey: Buffer
): Promise<GetMyTicketsReturnType[]> {
  const tickets = await gtx.query("get_my_tickets", {
    pubkey: Buffer.from(
      "0205837971A6B5DA4A6DE1F89579B219528EFF8BE5FFCFBA454EFE17BDDD57CF04",
      "hex"
    ),
  });
  return tickets;
}
