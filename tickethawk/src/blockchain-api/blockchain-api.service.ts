import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as pcl from 'postchain-client';
import { GtxClient } from 'postchain-client/built/src/gtx/interfaces';

// @Injectable()
export class BlockchainApiService implements OnModuleInit {
  private gtx: GtxClient; // Store the gtx client as an instance property
  //Key pair
  private adminPubkey = Buffer.from(
    '031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f',
    'hex',
  );
  private adminPrivkey = Buffer.from(
    '0101010101010101010101010101010101010101010101010101010101010101',
    'hex',
  );

  onModuleInit() {
    const nodeApiUrl = 'http://localhost:7740/'; //Using default postchain node REST API port
    const blockchainRID =
      'BA111FA5A710E923989A09E56A2F9029016A5E677B43467BB3FC267A55A31B13'; //Dapp Blockchain RID
    const rest = pcl.restClient.createRestClient([nodeApiUrl], blockchainRID);
    this.gtx = pcl.gtxClient.createClient(rest, blockchainRID, ['set_name']); //gtx Client connection
  }

  async helloWorld(): Promise<string> {
    return await this.gtx.query('hello_world');
  }

  async getNames(): Promise<string[]> {
    return await this.gtx.query('get_names');
  }

  async getUser(pubkey: Buffer): Promise<any> {
    return await this.gtx.query('get_user', { pubkey: pubkey });
  }

  async createUser(token: string, name: string, email: string): Promise<number> {
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
    tx.sign(this.adminPrivkey, this.adminPubkey); //Sign transaction
    await tx.postAndWaitConfirmation(); //Post to blockchain node
  }
}
