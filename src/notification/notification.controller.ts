import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  sendNotification(@Body() data: any) {
    this.notificationService.sendNotification(data);
  }
}
