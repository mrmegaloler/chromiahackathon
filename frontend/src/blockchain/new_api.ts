import { GtxClient } from "postchain-client/built/src/gtx/interfaces";
import { Itransaction } from "postchain-client/built/src/gtx/interfaces";
import { SessionMessage } from "../auth/auth";
import { SessionToken } from "../auth/auth";
import { Signature } from "../auth/auth";

export enum TICKETSTATUS {
  CREATED,
  TRANSFERRED,
  REDEEMED,
}

export async function getTicketOwner(
  gtxClient: GtxClient,
  id: number
): Promise<string> {
  return await gtxClient.query("get_ticket_owner", { id: id });
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
export async function getMyTickets(
  gtxClient: GtxClient,
  pubkey: Buffer
): Promise<GetMyTicketsReturnType[]> {
  return await gtxClient.query("get_my_tickets", { pubkey: pubkey });
}

export type GetEventsReturnType = {
  id: number;
  name: string;
  description: string;
  date: number;
  location: string;
};
export async function getEvents(
  gtxClient: GtxClient
): Promise<GetEventsReturnType[]> {
  return await gtxClient.query("get_events");
}

export async function getAvailableTicketsForEvent(
  gtxClient: GtxClient,
  event: number
): Promise<number> {
  return await gtxClient.query("get_available_tickets_for_event", {
    event: event,
  });
}

export type GetUserReturnType = {
  id: number;
  name: string;
  email: string;
};
export async function getUser(
  gtxClient: GtxClient,
  pubkey: Buffer
): Promise<GetUserReturnType | null> {
  return await gtxClient.query("get_user", { pubkey: pubkey });
}

export type GetAllUsersReturnType = {
  id: number;
  name: string;
  email: string;
};
export async function getAllUsers(
  gtxClient: GtxClient
): Promise<GetAllUsersReturnType[]> {
  return await gtxClient.query("get_all_users");
}

export function createEventOperation(
  tx: Itransaction,
  eventName: string,
  eventDescription: string,
  eventLocation: string,
  eventTimestamp: number,
  amount: number
): void {
  tx.addOperation(
    "create_event",
    eventName,
    eventDescription,
    eventLocation,
    eventTimestamp,
    amount
  );
}

export function registerOperation(
  tx: Itransaction,
  token: SessionToken,
  username: string
): void {
  tx.addOperation("register", token, username);
}

export function transferTicketOperation(
  tx: Itransaction,
  receiver: Buffer,
  ticket: number
): void {
  tx.addOperation("transfer_ticket", receiver, ticket);
}

export function redeemTicketOperation(tx: Itransaction, ticket: number): void {
  tx.addOperation("redeem_ticket", ticket);
}

export function createUserOperation(
  tx: Itransaction,
  token: SessionToken,
  name: string,
  email: string
): void {
  tx.addOperation("create_user", token, name, email);
}

export function createUserAdminOperation(
  tx: Itransaction,
  name: string,
  email: string
): void {
  tx.addOperation("create_user_admin", name, email);
}
