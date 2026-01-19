# Backend ASF7 Admin

Backend em **NestJS + PostgreSQL + Prisma** para o portal administrativo do ASF7 e APIs públicas.

## ✅ Requisitos
- Node.js 18+
- Docker + Docker Compose

## 🚀 Como rodar

### 1) Variáveis de ambiente
Crie um arquivo `.env` baseado no exemplo:

```bash
cp .env.example .env
```

### 2) Subir com Docker Compose
```bash
docker compose up --build
```

### 3) Rodar migrations e seed
Em outro terminal:

```bash
docker compose exec api npm run prisma:migrate

docker compose exec api npm run seed
```

## 📚 Swagger
Após subir a API:
- **Swagger:** http://localhost:3001/swagger

## 🔐 Autenticação
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me`

JWT retorna **access + refresh**.

## 👮 Portal Admin
Todas as rotas administrativas usam prefixo `/admin`.
Somente usuários **ADMIN** têm acesso.

Exemplos:
- `/admin/news`
- `/admin/banners`
- `/admin/championships`
- `/admin/teams`
- `/admin/players`
- `/admin/matches`
- `/admin/fantasy/config`

## 🌍 Rotas Públicas
Preparadas para o aplicativo do usuário:
- `/home`
- `/news`
- `/banners`
- `/championships`
- `/matches`
- `/fantasy`

## 📦 Uploads
Imagens via multipart são salvas em `/uploads`.
Exemplo de campo:
- News: `images`
- Banners: `image`
- Teams: `crest`
- Players: `photo`

## 🌱 Seed inicial
O seed cria:
- 1 ADMIN (`admin@asf7.com` / `admin123`)
- 1 campeonato com times e jogadores
- notícias, banners e configurações do fantasy

---
Código simples e comentado para facilitar manutenção.
