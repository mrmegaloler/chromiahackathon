import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainApiModule } from './blockchain-api/blockchain-api.module';
import { BlockchainApiService } from './blockchain-api/blockchain-api.service';

@Module({
  imports: [BlockchainApiModule],
  controllers: [AppController],
  providers: [AppService, BlockchainApiService],
})
export class AppModule {}
