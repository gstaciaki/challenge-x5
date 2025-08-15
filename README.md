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