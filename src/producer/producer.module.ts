import { Global, Module } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Global()
@Module({
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
