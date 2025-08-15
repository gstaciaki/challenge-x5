import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Paginated, PaginatorDto } from 'src/shared/dto/paginator.dto';
import { Notification } from '@prisma/client';
import { queueOptions } from 'src/config/rabbitmq.options';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(queueOptions.notification.name)
    private readonly client: ClientProxy,
  ) {}
  async sendNotification(data: CreateNotificationDto) {
    return this.client.emit('notifications', data);
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

  async processNotification(data: CreateNotificationDto) {
    try {
      await new Promise((r) => setTimeout(r, Math.random() * 3000 + 2000));

      const randomFail = Math.random() < 0.5;

      if (randomFail) throw new Error('Error while processing');

      await this.prisma.notification.create({
        data: { ...data, status: 'PROCESSED' },
      });
    } catch {
      await this.prisma.notification.create({
        data: { ...data, status: 'FAILED' },
      });
    }
  }
}
