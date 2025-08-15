import {
  ClientProviderOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

const notificationQueue = 'notification';

const rmqOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
  },
};

const notification: ClientProviderOptions = {
  ...rmqOptions,
  name: notificationQueue,
  options: {
    ...rmqOptions.options,
    queue: notificationQueue,
  },
};

export const queueOptions = {
  notification,
};
