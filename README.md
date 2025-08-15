# Notifications System

Este é um sistema básico de notificações com uso de Nest.js e RabbitMQ como message broker. No sistema, é possível enviar requests para a API, que por sua vez envia a notificação para a fila, onde ela aguardará até ser processada. 

## Dependências
- Docker compose
- Node.js (Versão 20 ou superior)
- Yarn

## Para Rodar

### Definir Variáveis de Ambiente

```bash
cp .env.example .env
```

### Levantar Containers

```bash
docker compose up -d
```

### Instalar dependências
```bash
yarn install

ou

npm install
```

### Gerar Prisma Client e Rodar Migrations

```bash
yarn prisma generate
yarn prisma migrate dev
```

### Iniciar a aplicação
```bash
yarn start:dev
```

## Arquitetura utilizada

O sistema utiliza a arquitetura padrão do Nest para sua organização. Para as validações de Inputs, foi utilizado o ```class-validator``` e ```class-transform``` para realizar as validações automaticamente. 

Para tratamento de erros, foi utilizado as próprias exceptions do Nest.

Para a publicação e consumo das mensagens, é utilizado a biblioteca do rabbitMQ ```amqplib``` junto com a estrutura de microsservices do próprio nest ```@nestjs/microservices```.

## Dificuldade encontradas

Encontrei uma grande dificuldade ao tentar implementar um mecanismo de retry e dead-letter queue, onde a forma em que a estrutura do ```@nestjs/microservices``` acabava gerando as filas sem a possibilidade de realizar o accept e reject das mensagens manualmente. Este problema foi apontado nesta issue do Nest: https://github.com/nestjs/nest/issues/11966#issuecomment-1619735777, porém o workaround não funcionou. 

Por questões de data limite de entrega, não foi possível implementar os diferencias do teste.