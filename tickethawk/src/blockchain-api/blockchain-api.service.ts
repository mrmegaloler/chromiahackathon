import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as pcl from 'postchain-client';
import { ChromiaClient } from 'postchain-client/built/src/chromia/interfaces';
import {
  GtxClient,
  Itransaction,
} from 'postchain-client/built/src/gtx/interfaces';

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
@Injectable()
export class BlockchainApiService implements OnModuleInit {
  private gtx: GtxClient;
  private chromiaClient: ChromiaClient; // Store the gtx client as an instance property
  //Key pair
  // private adminPubkey = Buffer.from(
  //   '031B84C5567B126440995D3ED5AABA0565D71E1834604819FF9C17F5E9D5DD078F',
  //   'hex',
  // );
  // private adminPrivkey = Buffer.from(
  //   '0101010101010101010101010101010101010101010101010101010101010101',
  //   'hex',
  // );

  // onModuleInit() {
  //   const nodeApiUrl = 'http://localhost:7740/'; //Using default postchain node REST API port
  //   const blockchainRID =
  //     '78481D05103C43E74ABACF7D0AB9F4DC046D73562B9251C8565E36DCADFB35CE'; //Dapp Blockchain RID
  //   const rest = pcl.restClient.createRestClient([nodeApiUrl], blockchainRID);
  //   this.gtx = pcl.gtxClient.createClient(rest, blockchainRID, ['set_name']); //gtx Client connection
  // }

  //Key pair
  private adminPubkey = Buffer.from(
    '0205837971A6B5DA4A6DE1F89579B219528EFF8BE5FFCFBA454EFE17BDDD57CF04',
    'hex',
  );
  private adminPrivkey = Buffer.from(
    'E3A2CFE30D21316051A5BECCAFD942B9B7C3F2B51BFF773592BE826B6787281D',
    'hex',
  );

  onModuleInit() {
    const nodeApiUrl = 'https://testnet2-dapps.chromia.dev:7740'; //Using default postchain node REST API port
    const blockchainRID =
      '60B01AD60DD4476E2DB5141B0848B9F350D4F6F7C7F6EE5421EFC9968FF5874C'; //Dapp Blockchain RID
    const rest = pcl.restClient.createRestClient(
      [nodeApiUrl],
      blockchainRID,
      5,
      1000,
    );
    this.chromiaClient = pcl.chromiaClient.chromiaClientProvider(
      blockchainRID,
      rest,
    ); //gtx Client connection
    this.gtx = pcl.gtxClient.createClient(rest, blockchainRID, ['set_name']); //gtx Client connection
  }

  async createUser(
    token: string,
    name: string,
    email: string,
  ): Promise<number> {
    const pubkey = await this.gtx.query('validate_session', { token: token });
    if (!pubkey) {
      throw new Error('Invalid session token');
    }
    const tx = this.gtx.newTransaction([pubkey]);
    tx.addOperation('create_user', pubkey, name, email);
    tx.addOperation('nop', randomBytes(12));
    tx.sign(this.adminPrivkey, this.adminPubkey); //Sign transaction
    await tx.postAndWaitConfirmation(); //Post to blockchain node

    return 0;
  }

  async setNameOperation(name: string): Promise<void> {
    const tx = this.gtx.newTransaction([this.adminPubkey]);
    console.log('adding name', name);
    tx.addOperation('set_name', name);
    tx.addOperation('nop', randomBytes(12));
  }

  async createEventOperation(
    eventName: string,
    eventDescription: string,
    eventLocation: string,
    eventTimestamp: number,
    amount: number,
  ): Promise<void> {
    const tx = this.gtx.newTransaction([this.adminPubkey]);

    tx.addOperation(
      'create_event',
      eventName,
      eventDescription,
      eventLocation,
      eventTimestamp,
      amount,
    );
    this.safeSignPostAndWaitConfirmation(tx);
  }

  async createUserAdminOperation(name: string, email: string): Promise<void> {
    const tx = this.gtx.newTransaction([this.adminPubkey]);
    tx.addOperation('create_user_admin', name, email);
    this.safeSignPostAndWaitConfirmation(tx);
  }

  async getEvents(): Promise<GetEventsReturnType[]> {
    return await this.gtx.query('get_events');
  }

  async getAvailableTicketsForEvent(event: number): Promise<number> {
    return await this.gtx.query('get_available_tickets_for_event', {
      event: event,
    });
  }

  async getUser(pubkey: Buffer): Promise<GetUserReturnType> {
    return await this.gtx.query('get_user', { pubkey: pubkey });
  }

  async getAllUsers(): Promise<GetAllUsersReturnType[]> {
    return await this.gtx.query('get_all_users');
  }

  async transferTicketOperation(
    receiver: Buffer,
    ticket: number,
  ): Promise<void> {
    const tx = this.gtx.newTransaction([this.adminPubkey]);
    tx.addOperation('transfer_ticket', receiver, ticket);
    this.safeSignPostAndWaitConfirmation(tx);
  }

  async getMyTickets(pubkey: Buffer): Promise<number[]> {
    return await this.gtx.query('get_my_tickets', { pubkey: pubkey });
  }

  async safeSignPostAndWaitConfirmation(tx: Itransaction) {
    try {
      tx.addOperation('nop', randomBytes(12));
      tx.sign(this.adminPrivkey, this.adminPubkey); //Sign transaction
      await tx.postAndWaitConfirmation(); //Post to blockchain node
    } catch (e) {
      console.log(e);
    }
  }
}
