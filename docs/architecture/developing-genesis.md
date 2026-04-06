# Developing Genesis (continuing from the template)

**Snapshot date:** 2026-04-06

This document is a **single entry point** for humans and AI agents who are turning the Genesis template into a real SaaS. It consolidates implementation cues that are otherwise spread across `architecture.md`, `docs/architecture/*`, `.cursor/rules/repo-rules.mdc`, code comments, and research notes.

**Important:** This snapshot reflects the **template as completed** on the date above. Once you fork or build a product on top of it, the codebase will diverge. Treat this file as orientation and boundaries—not a substitute for reading the current code and the **living** docs (`architecture.md`, `docs/architecture/*`). When behavior changes, follow the update protocol in `architecture.md` and keep subsystem docs in sync.

---

## 1. What Genesis provides (template scope)

- **App shell:** Next.js 16 App Router, React 19, TypeScript strict, Bun, Tailwind v4, shadcn/ui (New York).
- **Auth:** Better Auth — email/password, verification, password reset, sessions.
- **Multi-tenancy:** Organizations, invitations, org switching, static org roles and custom permission statements (`lib/auth/permissions.ts`).
- **API:** tRPC v11 + TanStack Query; procedures layered in `server/trpc/init.ts` (`publicProcedure`, `protectedProcedure`, `organizationProcedure`, `permissionedProcedure`).
- **Data:** Drizzle ORM on Neon Postgres; Better Auth tables + app tables (e.g. org-scoped `dashboard` / `dashboard_share` as a **reference** workspace feature).
- **Email:** Resend for transactional mail; signed webhook at `app/api/webhooks/resend/route.ts`.
- **Billing:** Config-time provider choice `PAYMENT_PROVIDER=stripe|polar`; canonical plans in `lib/payments/plans.ts`; local mirror in `lib/db/schema/billing.ts`; webhooks + sync in `lib/payments/*`; thin HTTP adapters under `app/api/billing/*` and `app/api/payments/webhooks/*`; browser helper `lib/billing-client.ts`.
- **Analytics:** PostHog (client via `instrumentation-client.ts` + `/ph` rewrite; server via `@/lib/analytics/posthog-server`); cookie consent for anonymous visitors; identify/group in `components/analytics/posthog-identify.tsx`.
- **Uploads:** R2/S3-compatible presigned URLs (`lib/uploads/r2.ts`).
- **SEO / discovery:** `metadataBase` via `getSiteUrl()`, `sitemap.ts`, `robots.ts`, JSON-LD on home, `noindex` on `/o/[orgSlug]`, optional `/llms.txt`.

---

## 2. Where to add new product features

| Kind of work | Prefer |
|--------------|--------|
| Reusable domain logic (rules, integrations, pure services) | `lib/<domain>/` (e.g. future `lib/credits/`, `lib/usage/`) |
| DB schema | `lib/db/schema/<area>.ts`, export from `lib/db/schema/index.ts` |
| Migrations | `bun run db:generate` after schema changes; apply with project scripts |
| Typed app API | New or extended routers under `server/trpc/routers/`; register in `server/trpc/router.ts` |
| Thin HTTP / webhooks | `app/api/.../route.ts` delegating to `lib/*` |
| UI | `components/`; use existing shadcn primitives under `components/ui/` |

Keep **Next.js and tRPC** as adapters: validation at the edge, orchestration in `lib/`.

---

## 3. Billing and payments: what to touch—and what not to

### What `lib/payments/*` is for

- **Who paid**, through **which** provider, **subscription / order** snapshots, and **plan catalog** resolution (`lib/payments/plans.ts`).
- **Normalized read model** for gating: `lib/payments/read-model.ts` (`getAccessState`, `getPlanLimits`, etc.) — **not** raw Stripe/Polar objects in the client.
- **Webhooks:** verify on **raw body**; **idempotent** storage in `billing_event` before sync (`lib/payments/repository.ts`).
- **Config:** one active provider at a time (`lib/payments/config.ts`); no runtime multi-provider routing.

### Plan catalog conventions

- **`PLAN_CATALOG`** in `lib/payments/plans.ts` is the app-canonical list of plans (`free`, `pro`, …).
- Map each plan to provider IDs via **env vars** (replace placeholder names per project).
- **`free`** has no provider price/product IDs — defaults for entitlements only.

### “Credits” in the template today

- Checkout supports a **one-time** line item kind `creditsTopUp` (mapped to env-backed Stripe price / Polar product lists). That is **payment + catalog** wiring, **not** an in-app credit ledger.

### If you need usage metering, credit balances, or allowances

**Do not** implement consumable balances, meters, debits, top-ups-after-use, or per-user vs org pools inside `lib/payments` as if they were subscription rows. Those are **ledger / accounting** concerns.

- **Put new logic in** something like **`lib/credits/`** or **`lib/usage/`** (dedicated tables, transactions, idempotent grants/consumption).
- **Keep billing as:** source of truth for **paid state**, **which** product/price was purchased, and **subscription period**.
- **Connect the two with events:** on `checkout.session.completed`, order paid, or renewal, billing (or a small integration hook) emits **grant** events to your credits module (e.g. “grant N credits to org X for period Y”).
- **Feature checks:** plan-gated features still use `BillingReadModel`; metered/consumed resources use your credits/usage API.

| Concern | Billing (`lib/payments`) | Credits / usage (you add) |
|--------|---------------------------|----------------------------|
| Subscription active, plan key, period | Yes | No (may *trigger* grants) |
| Caps from catalog (`PlanLimits`) | Declared in catalog | Enforcement = **counts** vs limits |
| “Included N credits/month” on a tier | Optional field on plan only | **Balance**, grants, consumption |
| One-time credit purchase | Order + payment in billing | **Credit** the ledger when payment succeeds |

**Do not** store live balances only inside `PlanLimits` or solely on `billing_subscription` — those stay catalog-shaped and subscription-shaped.

### Hosted billing UX

- Default to **provider-hosted** portals (Stripe Customer Portal, Polar customer session) for payment methods, invoices, receipts.
- The app owns pricing CTAs, current-plan summary, and “Manage billing”; full invoice UI is optional (`billing_document` supports future UI/analytics).

### Deeper background

- `.cursor/research/payment-provider-abstraction-architecture.md` — industry patterns (strategy/adapter, MoR vs processor, webhook normalization). Cross-check with **this repo’s** actual paths in `docs/architecture/payments-and-billing.md`.

---

## 4. Auth and multi-tenancy

- **Tenant boundary:** `organizationId` on business data. No cross-org access unless you explicitly design and **enforce** it server-side.
- **Entry points:** `lib/auth.ts`, `lib/auth-client.ts`, `lib/auth/permissions.ts`, `lib/auth-session.ts`, `lib/organization-server.ts`, `app/api/auth/[...all]/route.ts`, tRPC `server/trpc/context.ts` + `init.ts`.
- **Layers:** `proxy.ts` (fast redirect for unauthenticated `/o/*`), server route / RSC validation, tRPC middleware (`protectedProcedure`, `organizationProcedure`, `permissionedProcedure`).
- **Roles:** `owner`, `admin`, `editor`, `viewer`; `member` as compatibility alias with viewer-level permissions. Custom resources include `dashboard`, `dashboardShare` (extend in `lib/auth/permissions.ts` in sync with Drizzle + server usage).
- **UX invariant:** Keep `/` aligned with Better Auth **active organization** so signed-in users land in their latest workspace (see `lib/organization-server.ts` — invalid active org is cleared when membership disappears).

---

## 5. Data model conventions

- **Org-owned rows:** include `organizationId` where the feature is tenant-scoped (see `docs/architecture/data-model-and-storage.md`).
- **Billing tables:** `billing_customer`, `billing_subscription`, `billing_order`, `billing_document`, `billing_event` — JSDoc on `lib/db/schema/billing.ts` describes intent (e.g. subscription snapshot as SoT after sync).
- **Migrations:** after `lib/db/schema/billing.ts` (or any schema) changes, run `bun run db:generate`, apply migrations, document new env vars in `.env.example`.
- **Early-stage DB:** if Neon is empty during bootstrap, prefer resetting Drizzle migration history and re-baselining from the Better Auth–aligned schema rather than stacking rename-only fix-up migrations (see repo rules).

---

## 6. Adding and structuring pages

### Public marketing pages

1. Add route under `app/` (e.g. `app/pricing/page.tsx`).
2. Export `metadata` or `generateMetadata` with unique `title` / `description`.
3. Set `alternates.canonical` (or relative `"./"` to `metadataBase`).
4. Append URL to `app/sitemap.ts` with sensible `changeFrequency` / `priority`.

### Private / authenticated areas

- Set `robots: { index: false, follow: false }` on the segment `layout.tsx` (pattern: `app/o/[orgSlug]/layout.tsx`).
- **Do not** add authenticated-only URLs to the sitemap unless you intend them to be indexed.

### Canonical URLs and env

- Set **`SITE_URL`** and **`NEXT_PUBLIC_APP_URL`** to the same production origin (no trailing slash) for OG, sitemap, robots, client billing URL (`lib/site-url.ts`).
- **`getSiteUrl()`** prefers env; falls back to `VERCEL_URL` / localhost for previews and dev.

### Internationalization (future)

- Root `app/layout.tsx` notes: use `generateMetadata` + `alternates.languages` on localized route segments when you add locales.

### LLM / crawler summary

- `/llms.txt` is an **emerging** convention (`app/llms.txt/route.ts`); not standardized; see `docs/architecture/seo-and-geo.md`.

---

## 7. Analytics (PostHog)

- **Client-only barrel:** `@/lib/analytics` exports `trackClientEvent` and `AnalyticsEvents` — **server code must import** `@/lib/analytics/posthog-server` directly so `posthog-node` is not bundled for the browser (`lib/analytics/index.ts`).
- **Server ingest:** use `POSTHOG_HOST` (e.g. `https://eu.i.posthog.com`) — **never** point the Node client at the `/ph` rewrite.
- **Events:** canonical names in `lib/analytics/event-names.ts` (`domain:action`). **Do not** put PII (email, name, tokens) in properties.
- **Consent:** anonymous users need cookie consent before tracking; logged-in users are opted in via identify flow (`components/analytics/posthog-identify.tsx`).
- **Sign-out:** call `posthog.reset()` after `authClient.signOut()` so the PostHog person clears with the session (`components/site-header.tsx`).

---

## 8. File uploads (R2)

- Helpers in `lib/uploads/r2.ts`: S3-compatible client, presigned upload/download, optional `readObjectBytes`.
- **Object keys** are org-scoped: `org/{organizationId}/{prefix}/{objectId}/{safeFileName}` — keep this pattern for isolation and cleanup.
- Requires `R2_*` env vars (see `.env.example`).

---

## 9. Logging and errors

- Use **`@/lib/logger`** with `logger.child({ scope: "feature.area" })`; avoid raw `console.*` in app code.
- Never log secrets, tokens, cookies, or full bodies that may contain sensitive data; use `LOG_LEVEL` for verbosity.
- **UI / thin adapters:** prefer `@/lib/try-catch` for result-style async handling.
- **User-facing errors:** prefer `@/lib/error-utils` over one-off `getErrorMessage` helpers.
- Use explicit `try/catch` when you need **transactional rollback** semantics.

---

## 10. Known quirks (don’t “fix” blindly)

- **`next-themes` + React 19 / Next 16:** mount-gate theme-dependent UI to avoid hydration mismatches; the React `<script>` warning from `next-themes` is treated as an upstream false positive until the package fixes it (`components/theme-provider.tsx`).
- **Auth client:** tuned for quieter dev behavior and fewer `/api/auth/get-session` calls on tab focus (`lib/auth-client.ts`).
- **Cookie consent:** initial `consent` is `pending` so the banner does not SSR with a storage mismatch (`components/analytics/cookie-consent-banner.tsx`).

---

## 11. Where to find more detail (living docs)

| Doc | Topics |
|-----|--------|
| [`architecture.md`](../../architecture.md) | System overview, routes, invariants, topology, source map, update protocol |
| [`auth-and-security.md`](./auth-and-security.md) | Auth flows, tRPC layering, security boundaries |
| [`data-model-and-storage.md`](./data-model-and-storage.md) | Tables, storage invariants |
| [`frontend-and-ux-flows.md`](./frontend-and-ux-flows.md) | Routes, org shell, UX guardrails |
| [`payments-and-billing.md`](./payments-and-billing.md) | Billing data flow, manual validation, billing vs usage |
| [`seo-and-geo.md`](./seo-and-geo.md) | SEO/GEO playbook, checklists |
| [`.cursor/research/payment-provider-abstraction-architecture.md`](../../.cursor/research/payment-provider-abstraction-architecture.md) | Research: provider patterns (verify against current code) |
| [`.cursor/research/posthog-b2b-saas-best-practices.md`](../../.cursor/research/posthog-b2b-saas-best-practices.md) | PostHog B2B notes (supplement to repo rules) |

---

## 12. After you change the system

1. Update [`architecture.md`](../../architecture.md) if overview, invariants, routes, or source map change.
2. Update or add focused files under `docs/architecture/` for subsystems you touch.
3. Record **what / why / impact / entry points** (see update protocol in `architecture.md`).
4. If this “Developing Genesis” snapshot becomes misleading, either revise this file with a new **Snapshot date** or rely on the subsystem docs as the source of truth.
