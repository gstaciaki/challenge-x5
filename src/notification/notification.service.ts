import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  sendNotification(data: any) {
    return this.prisma.notification.create({ data });
  }

  showNotifications() {
    return this.prisma.notification.findMany();
  }

  getNotification(id: string) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async getNotificationStatus(id: string) {
    const notification = await this.getNotification(id);    
    return {
      status: notification?.status,
    };
  }
}
