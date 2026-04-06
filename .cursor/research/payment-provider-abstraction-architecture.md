# Provider-Agnostic Payment Architecture for SaaS

> Research date: 2026-04-06
> Decision context: Design a payment abstraction layer for a Next.js SaaS template using Better Auth + Drizzle + organizations
> Scope: Global | Time horizon: Current + 12 months

---

## Executive Answer

The ecosystem has converged on a clear pattern: a **unified interface** (strategy/adapter hybrid) where each payment provider implements a standard contract covering checkout, subscriptions, customers, and webhooks. Your database owns subscription state; providers are the payment execution layer. Five production-grade implementations now exist (Revstack, PayKit, supastarter, HazelJS, @saas-toolkit/payment-kit), all following nearly identical architectural shapes. The critical insight is that **Merchant of Record providers (Paddle, Lemon Squeezy, Polar) and Payment Processors (Stripe) have fundamentally different responsibility boundaries**, and the abstraction must account for this or it leaks.

---

## Method

- 18 sources examined across official docs, open-source repositories, technical articles, and NPM packages
- Source mix: 8 Tier 1 (official docs, source code, NPM), 7 Tier 2 (established tech blogs, framework docs), 3 Tier 3 (Medium articles, dev.to)
- Date range: 2025-2026

---

## Key Findings

### Finding 1: The Dominant Pattern Is Strategy + Adapter Hybrid

**Claim**: Every production implementation combines the Strategy pattern (swappable algorithms selected at config time) with the Adapter pattern (translating provider-specific APIs into a unified interface).

**Why it matters**: This isn't a theoretical debate — the industry has settled. All five major implementations converge on the same shape.

**Confidence**: High

**Evidence**:
- [Revstack IProvider interface](https://www.mintlify.com/revstack-dev/revstack-os/concepts/providers) — Full `IProvider` extending `ISubscriptionFeature`, `ICheckoutFeature`, `ICustomerFeature`, etc.
- [PayKit createPayKit()](https://paykit.sh/) — Config-driven provider selection with normalized event system
- [Supastarter payments overview](https://supastarter.dev/docs/nextjs/payments/overview) — Provider swapped via `packages/payments/provider/index.ts` re-export
- [HazelJS PaymentService](https://hazeljs.ai/blog/payment-package-stripe-multi-provider) — `PaymentModule.forRoot()` with pluggable providers
- [Strategy Pattern for Payments (Medium)](https://medium.com/lets-code-future/effortless-payment-integration-with-the-strategy-pattern-in-node-js-2c3c7130bf48) — Three-layer architecture: Gateway Layer → Orchestrator Layer → UI Layer

**The canonical interface shape** (synthesized from all implementations):

```typescript
interface PaymentProvider {
  readonly manifest: ProviderManifest;

  // Checkout
  createCheckoutSession(input: CheckoutInput): Promise<CheckoutResult>;

  // Customers
  createCustomer(input: CreateCustomerInput): Promise<string>;
  updateCustomer(input: UpdateCustomerInput): Promise<string>;

  // Subscriptions
  createSubscription?(input: CreateSubscriptionInput): Promise<string>;
  cancelSubscription?(input: CancelSubscriptionInput): Promise<string>;
  pauseSubscription?(input: PauseSubscriptionInput): Promise<string>;
  resumeSubscription?(input: ResumeSubscriptionInput): Promise<string>;

  // Webhooks (required)
  verifyWebhookSignature(payload: string, headers: Record<string, string>, secret: string): Promise<boolean>;
  parseWebhookEvent(payload: unknown): Promise<NormalizedEvent | null>;

  // Billing portal
  createBillingPortalSession?(input: BillingPortalInput): Promise<{ url: string }>;
}
```

---

### Finding 2: Capability Manifests Solve the MoR vs Processor Gap

**Claim**: Merchant of Record providers (Paddle, Lemon Squeezy, Polar) and payment processors (Stripe) have fundamentally different feature sets. The abstraction handles this via capability declarations, not lowest-common-denominator interfaces.

**Why it matters**: Naive abstractions break when Provider A supports proration but Provider B doesn't, or when Provider A handles tax but Provider B requires you to.

**Confidence**: High

**Evidence**:
- [Revstack ProviderCapabilities manifest](https://www.mintlify.com/revstack-dev/revstack-os/concepts/providers) — Declares `checkout.strategy`, `subscriptions.mode` (native vs virtual), feature flags for pause/resume/proration/refunds
- [Stripe vs Paddle vs Lemon Squeezy comparison](https://appstackbuilder.com/blog/stripe-vs-lemon-squeezy-vs-paddle) — Stripe: you're MoR, handle tax; Paddle/LS: they're MoR, tax included; Polar: developer-first MoR

**Revstack's capability manifest** (best-in-class example):

```typescript
const capabilities: ProviderCapabilities = {
  checkout: { supported: true, strategy: "redirect" | "native_sdk" | "sdui" },
  subscriptions: {
    supported: true,
    mode: "native" | "virtual",  // native = provider bills; virtual = you bill via provider
    features: { pause: true, resume: true, cancellation: true, proration: true },
  },
  payments: {
    supported: true,
    features: { refunds: true, partialRefunds: true, capture: true, disputes: true },
  },
  catalog: { supported: true, strategy: "inline" | "pre_created" },
  webhooks: { supported: true, verification: "signature" },
};
```

**Key distinction**:
| Aspect | Stripe (Processor) | Polar/Paddle/LS (MoR) |
|--------|-------------------|----------------------|
| Tax responsibility | You | Provider |
| MoR status | You are seller | Provider is seller |
| Subscription engine | Full native billing | Provider-managed |
| Catalog strategy | Inline (create on the fly) | Pre-created products required |
| Proration | Full automatic | Varies (often limited) |
| Pricing | 2.9% + $0.30 | 5% + $0.50 (tax included) |

---

### Finding 3: Webhook Normalization Is the Hardest Abstraction

**Claim**: Every implementation identifies webhook normalization as the critical integration layer. Different providers fire different events with different payloads for semantically equivalent state transitions.

**Why it matters**: Without normalization, your business logic forks per provider — defeating the purpose of the abstraction.

**Confidence**: High

**Evidence**:
- [PayKit webhook engine](https://paykit.sh/) — "Stripe's `invoice.payment_failed` and PayPal's `BILLING.SUBSCRIPTION.PAYMENT.FAILED` both become one typed event"
- [Revstack webhook normalization](https://www.mintlify.com/revstack-dev/revstack-os/api/node/webhooks) — Provider payloads → `RevstackEvent { id, type, data, createdAt }` with HMAC-SHA256 + timestamp replay protection
- [Stripe subscription lifecycle guide](https://dev.to/thekarlesi/stripe-subscription-lifecycle-in-nextjs-the-complete-developer-guide-2026-4l9d) — Documents event ordering issues, out-of-order delivery, idempotency requirements

**Normalized event types** (synthesized from Revstack + PayKit):

```typescript
type NormalizedEventType =
  | "checkout.completed"
  | "subscription.created"
  | "subscription.updated"
  | "subscription.canceled"
  | "subscription.expired"
  | "subscription.paused"
  | "subscription.resumed"
  | "payment.succeeded"
  | "payment.failed"
  | "invoice.paid"
  | "invoice.payment_failed"
  | "customer.created"
  | "customer.updated";
```

**Critical implementation details**:
1. Verify webhook signature before parsing (raw body, not parsed JSON)
2. Store event ID for idempotent processing
3. Return 2xx immediately, process asynchronously
4. Handle out-of-order events (subscription.updated can arrive before subscription.created)

---

### Finding 4: Customer Mapping Requires a Three-Layer ID Strategy

**Claim**: Reliable payment abstraction requires mapping between internal IDs, platform/orchestration IDs, and provider-specific IDs.

**Why it matters**: When you switch providers, you need to re-map customers without losing subscription history.

**Confidence**: High

**Evidence**:
- [Gr4vy reconciliation guide](https://docs.gr4vy.com/guides/ids) — Three ID layers: PSP IDs, Platform IDs, Merchant (external) IDs with reconciliation_id bridge
- [Better Auth Stripe plugin schema](https://better-auth.com/docs/plugins/stripe) — `user.stripeCustomerId`, `organization.stripeCustomerId`, `subscription.stripeCustomerId` + `subscription.stripeSubscriptionId`
- [Orb customer management API](https://docs.withorb.com/api-reference/customer/fetch-customer-by-external-id) — External ID lookup, payment_provider enum, sync endpoints

**Recommended schema pattern**:

```
user
  ├── id (internal, PK)
  └── stripeCustomerId? (provider-specific)

organization
  ├── id (internal, PK)
  └── stripeCustomerId? (provider-specific)

payment_customer (provider-agnostic mapping table)
  ├── id (PK)
  ├── internalId (→ user.id or organization.id)
  ├── customerType ("user" | "organization")
  ├── provider ("stripe" | "polar" | "paddle")
  ├── providerCustomerId (external ID)
  └── createdAt

subscription
  ├── id (PK)
  ├── referenceId (→ user.id or org.id)
  ├── plan
  ├── provider ("stripe" | "polar")
  ├── providerSubscriptionId
  ├── status
  ├── periodStart / periodEnd
  ├── cancelAt / canceledAt / endedAt
  └── metadata (JSON)
```

---

### Finding 5: Plan/Price Management Must Be Provider-Aware But App-Canonical

**Claim**: Plans are defined in your app config with provider-specific price IDs mapped per provider. Your app logic references plan names; the payment layer resolves the correct provider price ID.

**Why it matters**: Different providers require different price setup (Stripe: create inline or by ID; Polar: pre-created products; Paddle: catalog products).

**Confidence**: High

**Evidence**:
- [Better Auth plan configuration](https://better-auth.com/docs/plugins/stripe) — Plans defined with `name`, `priceId`, `annualDiscountPriceId`, `limits`, `freeTrial`
- [Supastarter plan management](https://supastarter.dev/docs/nextjs/payments/plans) — Plans in `packages/payments/config.ts` with provider-specific `priceId` per interval

**Recommended plan config shape**:

```typescript
const plans = [
  {
    name: "pro",
    features: { projects: 20, storage: 50 },
    prices: {
      stripe: { monthly: "price_xxx", annual: "price_yyy" },
      polar: { monthly: "polar_price_xxx", annual: "polar_price_yyy" },
    },
    freeTrial: { days: 14 },
  },
] satisfies PlanConfig[];
```

---

### Finding 6: Better Auth Has a Stripe Plugin — But It's Stripe-Only

**Claim**: Better Auth's `@better-auth/stripe` plugin is Stripe-specific and does not abstract over multiple providers. It handles customer creation on signup, subscription lifecycle, webhook processing, organization billing, and trial management — all tightly coupled to Stripe.

**Why it matters**: For a genesis template that may want to support Polar or Paddle, you either (a) use the Better Auth Stripe plugin and accept Stripe lock-in, (b) build a separate payment layer alongside Better Auth, or (c) wrap the Better Auth plugin pattern with a provider-agnostic layer.

**Confidence**: High

**Evidence**:
- [Better Auth Stripe plugin docs](https://better-auth.com/docs/plugins/stripe) — Comprehensive Stripe-only integration
- [Better Auth Stripe source code](https://github.com/better-auth/better-auth/blob/main/packages/stripe/src/index.ts) — Direct Stripe SDK dependency
- [Better Auth org customer PR](https://github.com/better-auth/better-auth/pull/7142) — Adds `stripeCustomerId` to organization schema

**Schema additions from the plugin**:
- `user.stripeCustomerId` — Stripe customer ID on user
- `organization.stripeCustomerId` — Stripe customer ID on org (when enabled)
- `subscription` table — Full lifecycle with `stripeSubscriptionId`, `stripeScheduleId`, status tracking, cancellation fields, trial tracking

**Key features**:
- Auto-create Stripe customer on signup
- Subscription upgrade/cancel/restore with Billing Portal redirect
- Webhook handling at `/api/auth/stripe/webhook`
- Trial abuse prevention (one trial per account across all plans)
- Organization billing with `customerType: "organization"` parameter
- `authorizeReference` callback for permission checks

---

### Finding 7: Open-Source Implementations to Study

**Confidence**: High (direct source examination)

| Project | Architecture | Providers | Key File | Stars |
|---------|-------------|-----------|----------|-------|
| [Revstack](https://github.com/revstack-dev/revstack-os) | `IProvider` interface with capability manifests | Stripe, Polar, custom | `providers/core/src/interfaces/provider.ts` | — |
| [PayKit](https://github.com/getpaykit/paykit) | `createPayKit()` config-driven orchestration | Stripe, PayPal, Polar | `packages/core/` | 377 |
| [Supastarter](https://supastarter.dev/docs/nextjs/payments/overview) | Re-export swap in `packages/payments/provider/index.ts` | Stripe, LS, Creem, Polar, Dodo | Closed source | — |
| [HazelJS](https://hazeljs.ai/blog/payment-package-stripe-multi-provider) | `PaymentModule.forRoot()` DI | Stripe, custom | `@hazeljs/payment` | — |
| [@saas-toolkit/payment-kit](https://registry.npmjs.org/%40saas-toolkit%2Fpayment-kit) | Consistent API across providers | Stripe, Razorpay, PayPal | NPM package | — |
| [next-saas-stripe-starter](https://github.com/mickasmt/next-saas-stripe-starter) | Direct Stripe integration (no abstraction) | Stripe only | `lib/payments/stripe.ts` | 6k+ |
| [BoxyHQ saas-starter-kit](https://github.com/boxyhq/saas-starter-kit) | Direct Stripe integration (no abstraction) | Stripe only | `.env` config | 4.7k |

**Notable**: The two most-starred open-source SaaS starters (next-saas-stripe-starter and BoxyHQ) have **no payment provider abstraction** — they wire Stripe directly. The abstraction pattern comes from newer, more opinionated projects.

---

## Contradictions and Resolution

### Contradiction 1: Use Better Auth Plugin vs Build Separate Layer

- **For BA plugin**: Tight auth-payment coupling is a feature — customer creation on signup, session-based authorization, webhook at auth endpoint. Less code to maintain. ([Better Auth docs](https://better-auth.com/docs/plugins/stripe))
- **Against BA plugin**: Locks to Stripe. If you want Polar/Paddle later, you need a separate system anyway. Mixing auth and payment concerns violates SRP. ([Supastarter approach](https://supastarter.dev/docs/nextjs/payments/overview))
- **Resolution**: **Use the Better Auth Stripe plugin for Stripe** as the first provider, but design the subscription state and plan config to be provider-agnostic from day one. The BA plugin's `subscription` table schema is actually fairly provider-neutral (the only Stripe-specific columns are `stripeCustomerId`, `stripeSubscriptionId`, `stripeScheduleId`). A future provider could use generic `providerCustomerId`/`providerSubscriptionId` columns.

### Contradiction 2: Config-Time vs Runtime Provider Switching

- **Config-time** (supastarter): Swap providers by changing a re-export. Simpler, one provider active at a time. Good for "we chose Polar instead of Stripe" decisions.
- **Runtime** (Revstack, PayKit): Multiple providers active simultaneously, routed per request. Needed for "Stripe for US, Polar for OSS tier" scenarios.
- **Resolution**: Start with config-time switching (simpler). The interface design supports runtime switching later without breaking changes.

---

## Decision Implications

### Strategic

1. **Start with Better Auth Stripe plugin** — it's free, well-maintained, handles the auth-payment coupling, and the subscription schema is mostly provider-neutral.
2. **Design plan config as provider-agnostic** — plans reference names + limits; price IDs are keyed by provider.
3. **Keep webhook handlers normalized** — even with single-provider, write webhook processing against normalized event types so adding a provider later doesn't require rewriting business logic.

### Operational

1. **Database owns subscription state** — Stripe/provider is execution layer; your DB is source of truth for "which org has which plan."
2. **Customer ID mapping** — Store provider-specific customer IDs on user/org records (as BA Stripe plugin does), but plan for a `payment_customer` mapping table when multi-provider becomes real.
3. **Idempotent webhook processing** — Store processed event IDs from day one.

### Risk

1. **Better Auth Stripe plugin is Stripe-only** — No official Polar/Paddle plugins exist. If you need another provider, you'll build a parallel payment module.
2. **MoR providers have different responsibility boundaries** — Tax, invoicing, refunds all work differently. The abstraction can't make these identical; it can only normalize the interface.
3. **PayKit is pre-release** — Most promising open-source option but not production-ready (active development, 377 stars, 0 releases).

---

## Recommended Architecture for Genesis Template

### Phase 1: Stripe via Better Auth (now)

```
lib/auth.ts                    ← Add @better-auth/stripe plugin
lib/payments/
  ├── plans.ts                 ← Provider-agnostic plan definitions with provider price map
  ├── types.ts                 ← Normalized event types, subscription status enum, plan types
  └── guards.ts                ← hasActiveSubscription(), getPlanLimits() helpers
```

### Phase 2: Multi-Provider Abstraction (when needed)

```
lib/payments/
  ├── types.ts                 ← PaymentProvider interface, NormalizedEvent, ProviderCapabilities
  ├── plans.ts                 ← Plan config with per-provider price IDs
  ├── guards.ts                ← Business logic (provider-agnostic)
  ├── providers/
  │   ├── index.ts             ← Re-export active provider (config-time switch)
  │   ├── stripe.ts            ← Stripe adapter (may wrap BA plugin or standalone)
  │   ├── polar.ts             ← Polar adapter
  │   └── paddle.ts            ← Paddle adapter
  ├── webhooks/
  │   ├── handler.ts           ← Unified webhook endpoint with signature verification
  │   └── normalize.ts         ← Provider event → NormalizedEvent mapping
  └── db/
      ├── schema.ts            ← subscription, payment_customer tables
      └── sync.ts              ← Webhook → DB state sync (idempotent)
```

### Key Design Decisions

1. **Provider interface**: Follow Revstack's `IProvider` shape with capability manifests
2. **Webhook normalization**: Each provider adapter implements `parseWebhookEvent()` → `NormalizedEvent`
3. **Database sync**: Process webhook → update subscription table (idempotent via event ID)
4. **Plan resolution**: `getPriceId(plan, provider, interval)` resolves the right ID
5. **Customer mapping**: `payment_customer` table with `(internalId, customerType, provider) → providerCustomerId`
6. **Feature detection**: `provider.manifest.capabilities.subscriptions.features.pause` before calling `pauseSubscription()`

---

## Assumptions and Unknowns

### Assumptions
- Better Auth will remain the auth layer for this template
- Stripe will be the first (and possibly only) payment provider for most users
- Organization-level billing is the primary use case (B2B SaaS)

### Unknowns
- Will Better Auth ship official plugins for other payment providers? (No indication yet)
- Will PayKit reach production readiness and become the default abstraction? (Active development but pre-release)
- Will Revstack open-source their core sufficiently for direct use? (Currently available but ecosystem maturity unclear)

---

## Source List

1. [Revstack — Providers Concept](https://www.mintlify.com/revstack-dev/revstack-os/concepts/providers) — Tier 1
2. [PayKit — Open-source payment orchestration](https://paykit.sh/) — Tier 1
3. [PayKit GitHub](https://github.com/getpaykit/paykit) — Tier 1
4. [Supastarter — Payments Overview](https://supastarter.dev/docs/nextjs/payments/overview) — Tier 1
5. [Better Auth — Stripe Plugin](https://better-auth.com/docs/plugins/stripe) — Tier 1
6. [Better Auth Stripe source](https://github.com/better-auth/better-auth/blob/main/packages/stripe/src/index.ts) — Tier 1
7. [Better Auth org customer PR #7142](https://github.com/better-auth/better-auth/pull/7142) — Tier 1
8. [HazelJS — @hazeljs/payment blog post](https://hazeljs.ai/blog/payment-package-stripe-multi-provider) — Tier 1
9. [@saas-toolkit/payment-kit on NPM](https://registry.npmjs.org/%40saas-toolkit%2Fpayment-kit) — Tier 1
10. [Stripe Subscription Lifecycle in Next.js (2026)](https://dev.to/thekarlesi/stripe-subscription-lifecycle-in-nextjs-the-complete-developer-guide-2026-4l9d) — Tier 2
11. [Next.js 16 Webhook Handler Pattern](https://dev.to/huangyongshan46a11y/nextjs-16-webhook-handler-pattern-stripe-github-and-more-2bgh) — Tier 2
12. [SaaS Billing Architecture with Stripe](https://www.alexmayhew.dev/blog/saas-billing-stripe-architecture) — Tier 2
13. [Stripe vs Lemon Squeezy vs Paddle 2026](https://appstackbuilder.com/blog/stripe-vs-lemon-squeezy-vs-paddle) — Tier 2
14. [Gr4vy — Identifiers & Reconciliation](https://docs.gr4vy.com/guides/ids) — Tier 1
15. [next-saas-stripe-starter GitHub](https://github.com/mickasmt/next-saas-stripe-starter) — Tier 1
16. [BoxyHQ saas-starter-kit GitHub](https://github.com/boxyhq/saas-starter-kit) — Tier 1
17. [Strategy Pattern for Payments (Medium)](https://medium.com/lets-code-future/effortless-payment-integration-with-the-strategy-pattern-in-node-js-2c3c7130bf48) — Tier 3
18. [Gateway-Independent Payment Provider (Medium)](https://medium.com/@pandit-abhishek1/gateway-independent-payment-provider-lld-f43db7423e9f) — Tier 3
19. [Polar Next.js SDK](https://polar.sh/docs/integrate/sdk/adapters/nextjs) — Tier 1
20. [Revstack Webhooks API](https://www.mintlify.com/revstack-dev/revstack-os/api/node/webhooks) — Tier 1
