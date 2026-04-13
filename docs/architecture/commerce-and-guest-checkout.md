# Commerce And Guest Checkout

## Overview

Commerce checkout is a **parallel subsystem** to account-bound billing.

- `lib/payments/*` remains focused on subscription and workspace billing tied to `BillingReference` (`user | organization`).
- `lib/commerce/*` owns guest one-time checkout, local checkout/order records, claim-later linking, and fulfillment state.
- Payment providers (Stripe/Polar) are still the payment rails, but checkout and order state is mirrored in local Postgres tables for idempotent server-side processing.

## Invariants

- Guest checkout does not require a Better Auth session.
- A local checkout draft is created before redirecting to provider-hosted checkout.
- Order finalization happens from webhooks, not from browser return URLs.
- Webhook processing is idempotent through existing billing event dedupe plus local checkout/order idempotency checks.
- Claiming a guest order requires a claim token and a signed-in user; email must match the original buyer email.
- Fulfillment state is tracked separately from payment status (`paid` does not imply fulfilled/shipped).

## Entry Points

| Concern | Location |
| ------- | -------- |
| Public guest checkout API | `app/api/commerce/checkout/route.ts` |
| Claim guest order API | `app/api/commerce/claim/route.ts` |
| Guest checkout orchestration | `lib/commerce/service.ts` |
| Provider checkout adapter (Stripe/Polar) | `lib/commerce/provider-checkout.ts` |
| Claim token/linking flow | `lib/commerce/claims.ts` |
| Catalog and SKU mapping | `lib/commerce/catalog.ts` |
| Persistence layer | `lib/commerce/repository.ts` |
| DB schema | `lib/db/schema/commerce.ts` |
| Provider webhook bridge | `lib/payments/stripe/webhook.ts`, `lib/payments/polar/webhook.ts` |

## Data Flow

1. Guest client posts cart + buyer data to `POST /api/commerce/checkout`.
2. Server validates SKU/cart, creates `commerce_checkout`, and creates provider-hosted checkout with `commerceCheckoutId` metadata.
3. Provider webhook is verified by existing payments webhook routes.
4. On successful checkout events, webhook code resolves `commerceCheckoutId` (or provider checkout id), finalizes `commerce_order`, copies `commerce_order_item` rows, and creates `commerce_order_claim`.
5. Signed-in users claim ownership by posting token to `POST /api/commerce/claim`; system links order to `buyerUserId`.
6. Fulfillment workflows consume `commerce_order_item.fulfillmentStatus`.

## Delta: 2026-04-13 - Guest checkout foundation

- What changed:
  - Added dedicated commerce tables (`commerce_checkout`, `commerce_order`, `commerce_order_item`, `commerce_order_claim`).
  - Added public guest checkout and claim APIs.
  - Extended Stripe/Polar webhook handling to finalize guest orders from checkout metadata.
- Why:
  - `BillingReference`-based billing is optimized for signed-in SaaS billing, not anonymous e-commerce style one-time purchases.
- Impact:
  - Enables guest checkout for one-time SKUs with claim-later account linking.
  - Preserves existing subscription/workspace billing paths under `lib/payments/*`.
- Entry points:
  - `app/api/commerce/checkout/route.ts`
  - `app/api/commerce/claim/route.ts`
  - `lib/commerce/service.ts`
  - `lib/payments/stripe/webhook.ts`
  - `lib/payments/polar/webhook.ts`
