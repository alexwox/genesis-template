# Data Model And Storage

## Overview

Genesis stores auth, organization, and application data in Postgres through Drizzle ORM.

- Better Auth-managed identity and organization tables
- Application-managed dashboard and dashboard share tables
- Application-managed billing mirror tables (customers, subscriptions, orders, documents, webhook events)

## Tables

### Better Auth Core

- `user`
- `session`
- `account`
- `verification`

### Better Auth Organization Layer

- `organization`
- `member`
- `invitation`
- `session.activeOrganizationId`

### Application Workspace Layer

- `dashboard`
- `dashboard_share`

### Billing (payments mirror)

- `billing_customer` — maps a `user` or `organization` to a provider customer id
- `billing_subscription` — normalized subscription snapshot for entitlements
- `billing_order` — one-time purchases where synced
- `billing_document` — optional invoice/receipt summaries
- `billing_event` — idempotent webhook event log

## Storage Invariants

- Every dashboard row belongs to exactly one organization via `organizationId`.
- Every explicit dashboard share belongs to one organization and references a member of that same organization.
- Session state can persist the active organization through `session.activeOrganizationId`.
- Organization slugs are globally unique and dashboard slugs are unique per organization.
- Every tenant-owned transactional row should carry `organizationId`.

## Entry Points

- `lib/db/index.ts`
- `lib/db/schema/auth.ts`
- `lib/db/schema/dashboard.ts`
- `lib/db/schema/billing.ts`
- `lib/db/schema/index.ts`
