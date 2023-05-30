import { Injectable } from '@nestjs/common';
import { GtxClient } from "postchain-client/built/src/gtx/interfaces";
import { Itransaction } from "postchain-client/built/src/gtx/interfaces";

@Injectable()
export class AppService {
  async helloWorld(gtxClient: GtxClient): Promise<string> {
    return await gtxClient.query("hello_world")
  }

  async setNameOperation(tx: Itransaction,
    name: string): Promise<void> {
    tx.addOperation("set_name", name)
  }
}