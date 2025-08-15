import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ClientsModule } from '@nestjs/microservices';
import { queueOptions } from 'src/config/rabbitmq.options';

@Module({
  imports: [ClientsModule.register([queueOptions.notification])],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
