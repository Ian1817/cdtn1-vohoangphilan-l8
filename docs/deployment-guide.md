# Deployment Guide - Smart CRM, flow L8 (track SE), tag v1.0

## 1. Requirements
- Docker Engine 24+ and Docker Compose v2 (check: `docker compose version`)
- Git 2.30+, about 2 GB free disk, port 3000 free.
- No Node.js or PostgreSQL needed (they run inside Docker).

## 2. Setup steps
1. `git clone --branch v1.0 https://github.com/Ian1817/cdtn1-vohoangphilan-l8.git`
2. `cd cdtn1-vohoangphilan-l8`
3. `cp .env.example .env`
4. `docker compose up -d --build` (first build takes about 2 minutes)

## 3. Environment variables
| Name | Meaning | Sample value | Required |
|---|---|---|---|
| DB_HOST | PostgreSQL host | db | yes |
| DB_PORT | PostgreSQL port | 5432 | yes |
| DB_NAME | Database name | cdtn1_smartcrm_l8 | yes |
| DB_USER | Database user | postgres | yes |
| DB_PASSWORD | Database password | 123456 | yes |
| PORT | App port | 3000 | no |

## 4. Sample data
Loaded automatically from `seeds/init-pg.js` on first start:
- 6 warranty tickets (PB-2-00001 to PB-2-00006)
- 7 survey responses (from previous tests)

## 5. Verify it works
`docker compose ps` → app and db are "healthy"
`curl http://localhost:3000/api/tickets/PB-2-00001/summary` → returns JSON with ticket info
`npm test` (run inside container: `docker compose exec app npm test`) → 19/19 tests passed