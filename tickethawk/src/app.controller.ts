import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockchainApiService } from './blockchain-api/blockchain-api.service';
import { create } from 'domain';

type ChangeNameDto = {
  name: string;
};

type CreateEventDto = {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventTimestamp: number;
  amount: number;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly blockchainApi: BlockchainApiService,
  ) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<void> {
    return await this.blockchainApi.createEventOperation(
      createEventDto.eventName,
      createEventDto.eventDescription,
      createEventDto.eventLocation,
      createEventDto.eventTimestamp,
      createEventDto.amount,
    );
  }

  @Post('/createUser')
  async createUser(): Promise<void> {
    return await this.blockchainApi.createUserAdminOperation(
      'Victor',
      'victor@lagerfor.com',
    );
  }

  @Get()
  async getEvents(): Promise<any> {
    return await this.blockchainApi.getEvents();
  }

  @Get('/ticketsForEvent/:eventId')
  async getConcerts(@Param('eventId') eventId: string): Promise<any> {
    return await this.blockchainApi.getAvailableTicketsForEvent(
      Number(eventId),
    );
  }
}
