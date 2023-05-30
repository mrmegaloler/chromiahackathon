import { Module } from '@nestjs/common';
import { BlockchainApiService } from './blockchain-api.service';

@Module({
  providers: [BlockchainApiService],
})
export class BlockchainApiModule {}
