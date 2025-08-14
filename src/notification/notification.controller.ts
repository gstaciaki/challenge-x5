import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PaginatorDto } from 'src/shared/dto/paginator.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendNotification(@Body() data: CreateNotificationDto) {
    await this.notificationService.sendNotification(data);
  }

  @Get()
  async showNotifications(@Query() query: PaginatorDto) {
    return this.notificationService.showNotifications(query);
  }

  @Get(':id')
  async getNotification(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.notificationService.getNotification(id);
  }

  @Get('status/:id')
  async getNotificationStatus(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.notificationService.getNotificationStatus(id);
  }
}
