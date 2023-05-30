import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockchainApiService } from './blockchain-api/blockchain-api.service';

type ChangeNameDto = {
  name: string;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly blockchainApi: BlockchainApiService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.blockchainApi.helloWorld();
  }

  @Post()
  async setName(@Body() changeNameDto: ChangeNameDto): Promise<void> {
    return await this.blockchainApi.setNameOperation(changeNameDto.name);
  }
}
