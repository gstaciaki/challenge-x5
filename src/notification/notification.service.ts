import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Paginated, PaginatorDto } from 'src/shared/dto/paginator.dto';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  sendNotification(data: CreateNotificationDto) {
    return this.prisma.notification.create({ data });
  }

  async showNotifications(
    query: PaginatorDto,
  ): Promise<Paginated<Notification>> {
    const { page, limit } = query;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.notification.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count(),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getNotification(id: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async getNotificationStatus(id: string) {
    const notification = await this.getNotification(id);
    return {
      status: notification.status,
    };
  }
}
