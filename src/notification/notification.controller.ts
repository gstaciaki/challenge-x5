import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendNotification(@Body() data: any) {
    await this.notificationService.sendNotification(data);
  }

  @Get()
  async showNotifications() {
    return this.notificationService.showNotifications();
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    return this.notificationService.getNotification(id);
  }

  @Get('status/:id')
  async getNotificationStatus(@Param('id') id: string) {
    return this.notificationService.getNotificationStatus(id);
  }
}
