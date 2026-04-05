# Genesis

A multi-tenant SaaS template with authentication, organizations, and a typed API layer.

## Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Language:** TypeScript (strict)
- **Package Manager:** Bun
- **Styling:** Tailwind CSS v4, shadcn/ui (New York)
- **Auth:** Better Auth (email/password, orgs, invitations, RBAC)
- **Database:** Drizzle ORM on Neon PostgreSQL (serverless)
- **API:** tRPC v11 with TanStack Query
- **Email:** Resend (verification, password reset, org invitations)
- **Uploads:** R2/S3-compatible object storage with presigned URLs
- **DX:** Husky pre-commit (lint-staged + ESLint + typecheck)

## What's Included

- Email/password auth with verification, password reset, and sign-out
- Multi-organization workspaces with roles (owner, admin, editor, viewer)
- Organization creation, switching, invitation, and settings
- Org-scoped dashboards with member-level sharing (reference feature)
- Active-organization session sync across routes
- Dark/light theme with `next-themes`
- Structured logger with levels and child scopes
- Result-style error handling (`tryCatch`) and user-safe error formatting
- Resend webhook verification
- R2/S3 presigned upload/download URL helpers
- Architecture docs with update protocol

## Getting Started

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Fill in DATABASE_URL, BETTER_AUTH_SECRET, RESEND_API_KEY, etc.

# Run database migrations
bun run db:migrate

# Start development server
bun run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server with Turbopack |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript strict type-check |
| `bun run db:generate` | Generate Drizzle migration |
| `bun run db:migrate` | Apply migrations |
| `bun run db:push` | Push schema directly (dev) |
| `bun run db:studio` | Open Drizzle Studio |

## Project Structure

```
app/                    # Next.js App Router pages and API routes
  o/[orgSlug]/          # Org-scoped workspace routes
  api/auth/             # Better Auth handler
  api/trpc/             # tRPC handler
  api/webhooks/resend/  # Resend webhook
components/             # React components
  ui/                   # shadcn/ui primitives
server/trpc/            # tRPC routers, context, middleware
lib/                    # Shared utilities and services
  auth.ts               # Better Auth server config
  auth-client.ts        # Better Auth client
  auth/permissions.ts   # Org roles and permission statements
  db/                   # Drizzle ORM setup and schema
  email/                # Resend delivery and HTML templates
  uploads/              # R2/S3 object storage helpers
  logger.ts             # Structured logger
  error-utils.ts        # User-safe error formatting
  try-catch.ts          # Result-style async helper
trpc/                   # tRPC client wiring and React Query provider
drizzle/                # Generated SQL migrations
docs/architecture/      # Subsystem documentation
```

## Environment Variables

See `.env.example` for the full list. Required:

- `DATABASE_URL` — Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Auth secret (`openssl rand -base64 32`)
- `BETTER_AUTH_URL` — App URL for auth callbacks
- `RESEND_API_KEY` — Resend API key for email delivery

## Pre-commit

Husky runs on every commit:

1. `lint-staged` — ESLint fix on staged files
2. `lint` — Full ESLint pass
3. `typecheck` — TypeScript strict check
