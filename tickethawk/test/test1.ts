import { BlockchainApiService } from '../src/blockchain-api/blockchain-api.service';

async function testHelloWorld() {
  try {
    const service = new BlockchainApiService();
    await service.onModuleInit();
    const result = await service.helloWorld();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

testHelloWorld();