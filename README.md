# Expense Control Backend

Backend con NestJS + Prisma + PostgreSQL para la app de control de gastos.

## Stack
- NestJS
- Prisma
- PostgreSQL
- Docker Compose
- JWT Auth

## Ejecutar con Docker

```bash
docker compose up --build
```

API: `http://localhost:3000`
Swagger: `http://localhost:3000/docs`

## Ejecutar local (sin Docker para API)

1. Levantar Postgres:
```bash
docker compose up -d postgres
```

2. Instalar deps:
```bash
pnpm install
```

3. Migrar Prisma:
```bash
pnpm prisma migrate dev --name init
```

4. Levantar API:
```bash
pnpm start:dev
```

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (Bearer token)

## Recursos protegidos por usuario
- `GET/POST/PATCH/DELETE /accounts`
- `GET/POST/PATCH/DELETE /cards`
- `GET/POST/PATCH/DELETE /expenses`

Cada endpoint usa el `userId` del JWT, por lo que un usuario no puede ver/modificar datos de otro.
