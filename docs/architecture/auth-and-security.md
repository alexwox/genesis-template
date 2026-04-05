# Auth And Security

## Overview

Genesis uses Better Auth as the system of record for authentication and organization membership.
The auth layer covers:

- email/password sign-in
- email verification and password reset
- organization creation and switching
- invitation delivery and acceptance
- org-scoped static roles and permission checks

## Entry Points

- `lib/auth.ts`
- `lib/auth/permissions.ts`
- `lib/auth-client.ts`
- `lib/organization-server.ts`
- `app/api/auth/[...all]/route.ts`
- `app/accept-invitation/[invitationId]/page.tsx`
- `server/trpc/context.ts`
- `server/trpc/init.ts`
- `server/trpc/routers/organization.ts`
- `server/trpc/routers/dashboard.ts`

## Flow

1. Better Auth handles identity, sessions, organization membership, invitations, and role checks.
2. `lib/auth/permissions.ts` defines the static org role model and the custom dashboard resources.
3. `server/trpc/context.ts` reads the authenticated session and, when present, resolves the active organization and active member.
4. `server/trpc/init.ts` exposes `protectedProcedure`, `organizationProcedure`, and `permissionedProcedure` for auth-aware server APIs.
5. `lib/organization-server.ts` is used by App Router pages to fetch org membership and permission state for workspace routes.

## Security Boundaries

- `organizationId` is the tenant boundary for application data.
- Dashboard access is enforced on the server through membership lookup plus Better Auth permission checks.
- Invitation acceptance requires an authenticated user and can require verified email through the Better Auth organization plugin.
- Cross-organization dashboard sharing is intentionally unsupported.

## Role Model

Static roles:

- `owner`
- `admin`
- `editor`
- `viewer`
- `member` as a compatibility alias with viewer-level permissions

Custom resources layered onto Better Auth:

- `dashboard`
- `dashboardShare`
