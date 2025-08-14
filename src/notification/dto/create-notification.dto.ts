import { NotificationType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  message: string;

  @IsEnum(NotificationType, {
    message: `type must be one of: ${Object.values(NotificationType).join(', ')}`,
  })
  type: NotificationType;
}
