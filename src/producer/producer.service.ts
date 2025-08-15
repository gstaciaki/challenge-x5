import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/config/rabbitmq.options';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQConfig());
  }

  async sendMessage(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}
