# Payments And Billing

## Overview

Billing is **provider-agnostic** at the application layer: choose Stripe or Polar via `PAYMENT_PROVIDER`. Identity and authorization stay in **Better Auth**; normalized subscription and customer state live in **Postgres** (`lib/db/schema/billing.ts`) and are updated by **webhooks** and **explicit sync**.

## Invariants

- **Better Auth** owns sessions, org membership, and who may act on billing (`lib/payments/authorize.ts`).
- **`lib/payments/*`** owns provider clients, checkout/portal creation, webhook verification, sync into local tables, and the billing read model.
- **Local billing tables** are the source of truth for **entitlements and UI** (plan, status, limits), not raw Stripe/Polar objects in the client.
- **Webhooks** are triggers: each event is stored idempotently in `billing_event` before sync; duplicate deliveries are ignored.
- **Config-time** provider selection only (`stripe` | `polar`); no runtime multi-provider routing.

## Entry Points

| Concern | Location |
| -------- | -------- |
| Plan catalog & env-mapped price/product IDs | `lib/payments/plans.ts` |
| Payments service (checkout, portal, sync, webhooks) | `lib/payments/service.ts` |
| Read model (access state, subscription snapshot, limits) | `lib/payments/read-model.ts` |
| HTTP: checkout, portal, access, sync | `app/api/billing/*/route.ts` |
| HTTP: Stripe webhook | `app/api/payments/webhooks/stripe/route.ts` |
| HTTP: Polar webhook | `app/api/payments/webhooks/polar/route.ts` |
| Thin browser helper | `lib/billing-client.ts` |

## Data Flow

1. **Checkout**: authenticated user/org admin calls `POST /api/billing/checkout` → `createCheckoutSession` → provider-hosted checkout URL.
2. **Portal**: `POST /api/billing/portal` → provider customer portal / Polar customer session URL.
3. **Webhooks**: provider posts to `/api/payments/webhooks/{stripe|polar}` → signature verification → `billing_event` dedupe → `sync*` into `billing_subscription` / related rows.
4. **Post-checkout**: client or server may call `POST /api/billing/sync` to reconcile if webhooks are delayed.
5. **Gating**: server/UI uses `BillingReadModel` (`getAccessState`, `getPlanLimits`) keyed by `BillingReference` (`user` or `organization`).

## Environment

See root `.env.example` for `PAYMENT_PROVIDER`, Stripe keys, Polar token, webhook secrets, and plan price/product variables.

## Manual Validation (sandboxes)

- Stripe: checkout, portal, cancel, renew, failed payment, replay same webhook payload.
- Polar: checkout, `customer.state_changed`, duplicate webhook id / body hash idempotency.

## Boundary: billing vs usage / credits

**`lib/payments` answers:** who paid, through which provider, what plan/subscription state is, and what the **plan catalog** says (caps, features, optional *grant rules*). It syncs money-adjacent state into `billing_*` tables and exposes `BillingReadModel` for plan-based gating.

**A future `lib/usage`, `lib/credits`, or similar answers:** consumable balance, meters, debits, top-ups after use, overdraft, per-user vs org pools — anything that **counts down or accrues over time**. That is a **ledger / accounting** concern, not a payment-rail concern.

| Concern | Lives in billing | Lives in usage/credits (future) |
| --- | --- | --- |
| Subscription active, plan key, period | Yes | No (may *trigger* grants) |
| Max seats / storage / feature flags from catalog | Declared in `PlanLimits` / catalog | Enforcement uses **counts** (members, bytes) vs those limits |
| “Included N credits per month” on a tier | Optional field on plan definition only | **Balance**, grants, consumption, policy |
| One-time credit top-up purchased | Order + payment in billing | Credits **credited** when payment succeeds (event from billing → ledger) |

**How they connect (when you add credits):**

1. Billing remains the source of truth for **paid** state and **which** product/price was bought.
2. On `checkout.session.completed`, order paid, or subscription renewal, billing code (or a small integration hook) emits **grant** events to the credits module: e.g. “grant 10_000 credits to org `X` for period `Y`.”
3. Application features check credits via the credits API; they still check “has Pro” via `BillingReadModel` when the feature is plan-gated instead of metered.

Do **not** store live credit balances inside `PlanLimits` or only in `billing_subscription` rows — those stay **catalog-shaped** and **subscription-shaped**; balances belong in dedicated tables and transactions.

## Hosted billing UX (invoices, receipts)

Provider-hosted portals (Stripe Customer Portal, Polar customer portal) remain the default for payment methods, invoices, receipts, and subscription self-service. The app owns pricing CTAs, current-plan summary, and “Manage billing” entry; it does not need to rebuild full invoice UI in phase one.

## Related docs

- Deeper product/payment abstraction notes: `.cursor/research/payment-provider-abstraction-architecture.md` (research; cross-check with this file for current code paths).
- Guest checkout and commerce lifecycle: `docs/architecture/commerce-and-guest-checkout.md`.

## Delta: 2026-04-13 - Billing vs commerce split

- What changed:
  - Added a parallel `lib/commerce/*` subsystem and public `app/api/commerce/*` routes for guest one-time checkout and claim-later linking.
  - Stripe/Polar webhook handlers now also attempt guest-order finalization based on commerce checkout metadata before subscription synchronization.
- Why:
  - `BillingReference`-based flows are intentionally account-bound and do not map cleanly to anonymous storefront purchases.
- Impact:
  - `lib/payments/*` stays focused on subscriptions, portal, and billing read model for signed-in users/orgs.
  - Guest commerce now has dedicated local checkout/order lifecycle tracking and fulfillment state.
- Entry points:
  - `app/api/commerce/checkout/route.ts`
  - `app/api/commerce/claim/route.ts`
  - `lib/commerce/service.ts`
  - `lib/payments/stripe/webhook.ts`
  - `lib/payments/polar/webhook.ts`
