import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { NotificationService } from 'src/notification/notification.service';

@Controller()
export class ConsumerController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('notifications')
  async handleMessage(data: CreateNotificationDto) {
    this.notificationService.processNotification(data);
  }
}
