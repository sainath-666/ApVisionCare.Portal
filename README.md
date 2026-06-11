# AP Vision Care Portal

Next.js 14 frontend for the **Andhra Pradesh Digital Vision Care & Public Health Intelligence Platform**.

Aligned with `AP_Vision_Care_Deployment.md` Section 5 — four role-based portals, Keycloak auth (next-auth v5), BFF API routes, ABHA enrollment UI, offline PWA for screening team, and EMR with prior-records pre-fill.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Shadcn/UI (`components.json`)
- next-auth v5 (Keycloak provider + demo credentials fallback)
- TanStack React Query (server state)
- Zustand (local state)
- React Hook Form + Zod (EMR forms)
- Leaflet + react-leaflet (district heatmaps)
- Recharts (analytics dashboards)
- next-pwa (screening team offline support)

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3100](http://localhost:3100)

### Keycloak (production auth)

Set in `.env.local`:

```
KEYCLOAK_ISSUER=http://localhost:8080/realms/ap-vision-care
KEYCLOAK_CLIENT_ID=apvc-web
KEYCLOAK_CLIENT_SECRET=...
AUTH_SECRET=...
NEXT_PUBLIC_AUTH_MODE=keycloak
```

### Demo Login

1. Go to `/login`
2. Select a role (when `NEXT_PUBLIC_AUTH_MODE=demo`)

## Portal Routes

| Portal         | Key Routes                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Super Admin    | `/portal/super-admin/dashboard`, `districts`, `users`, `camps`, `vendors`, `ai-insights`, `reports`, `audit`, `settings` |
| Nodal Officer  | `/portal/nodal-officer/dashboard`, `teams`, `camps`, `approvals`, `referrals`, `spectacles`, `vendors`                   |
| Screening Team | `/portal/screening-team/dashboard`, `register`, `patients`, `emr/[patientId]`, `teleconsult/[sessionId]`                 |
| Patient        | `/portal/patient/dashboard`, `prescriptions`, `spectacles`, `referrals`, `teleconsult`                                   |

## Public Pages

- `/` — Landing page (`app/(public)/`)
- `/register` — Citizen registration + ABHA enrollment (M1)
- `/login` — Keycloak or demo role login (`app/(auth)/`)

## API / BFF

- `app/api/auth/[...nextauth]` — next-auth handlers
- `app/api/v1/[...path]` — proxies to API Gateway (`API_GATEWAY_URL`)
- `app/api/abha/[...path]` — proxies ABHA service routes

Client: `lib/api-client.ts` — typed API client (falls back to mock data when gateway is down).

## Docker

```bash
docker build -t apvc-web .
docker run -p 3100:3100 -e AUTH_SECRET=... apvc-web
```

## Project Structure

```
app/
  (public)/          # Landing, citizen registration
  (auth)/            # Login (Keycloak redirect)
  portal/            # 4 role portals
  api/               # BFF routes (auth, v1, abha)
components/
  ui/ emr/ maps/ charts/ abha/
lib/
  keycloak.ts api-client.ts stores/ hooks/
middleware.ts        # JWT + role guard
auth.ts              # next-auth v5 config
```
