import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConsumerController } from './consumer/consumer.controller';
import { ClientsModule } from '@nestjs/microservices';
import { queueOptions } from './config/rabbitmq.options';

@Module({
  imports: [
    NotificationModule,
    PrismaModule,
    ClientsModule.register([queueOptions.notification]),
  ],
  controllers: [AppController, NotificationController, ConsumerController],
  providers: [AppService, NotificationService, PrismaService],
})
export class AppModule {}
