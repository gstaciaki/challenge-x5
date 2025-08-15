import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProducerService } from './producer/producer.service';
import { ConsumerController } from './consumer/consumer.controller';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [NotificationModule, PrismaModule, ProducerModule],
  controllers: [AppController, NotificationController, ConsumerController],
  providers: [AppService, NotificationService, PrismaService, ProducerService],
})
export class AppModule {}
