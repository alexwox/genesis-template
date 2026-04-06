# PostHog Best Practices for Multi-Tenant B2B SaaS

## Executive Answer

PostHog has mature, well-documented support for multi-tenant B2B SaaS. The critical integration surface covers: (1) **Group analytics** as the foundation for tenant-level tracking — a paid add-on that bills on all identified events once enabled; (2) **Revenue analytics** (currently in beta, free) with native Stripe connector and webhook-based real-time sync; (3) **AARRR/activation/retention dashboards** available as pre-built templates; (4) **Anonymous vs identified event strategy** as the primary billing lever (up to 4x cost difference); and (5) the new `@posthog/next` package for first-class Next.js App Router integration. No documented Better Auth + PostHog or Drizzle + PostHog integrations exist yet — both require custom implementation following standard patterns.

## Decision Context

- **Decision to support:** Architecture and implementation plan for PostHog in a multi-tenant B2B SaaS template/boilerplate
- **Scope:** PostHog Cloud (US/EU), Next.js App Router, Better Auth, Drizzle ORM, Stripe billing
- **Time horizon:** Current state + 12 months

## Method

- **Research approach:** Multi-source web research with triangulation
- **Number of sources:** 28 unique sources consulted
- **Source mix:** 16 Tier 1 (official PostHog docs), 6 Tier 2 (reputable guides, GitHub PRs), 6 Tier 3 (community posts, opinion pieces)
- **Date range:** 2023–April 2026

---

## 1. Group Analytics for Multi-Tenancy

### Finding 1.1: Group analytics is the correct abstraction for tenant tracking

**Claim:** PostHog Group Analytics maps organizations/tenants as "group types" with individual companies as "groups." Up to 5 group types per project, unlimited groups per type. Events are linked to groups via `$groups` property.

**Confidence:** High

**Evidence:**
- [Group analytics docs](https://posthog.com/docs/user-guides/group-analytics) — Tier 1
- [Group Analytics product page](https://posthog.com/group-analytics) — Tier 1

**Setup pattern (Web SDK):**
```javascript
// Call once per session after user authenticates
posthog.group('company', organizationId, {
  name: organization.name,
  subscription: organization.plan,
  date_joined: organization.createdAt
});

// All subsequent events in this session automatically link to the group
posthog.capture('feature_used', { feature: 'dashboard' });
```

**Setup pattern (Node.js server-side):**
```javascript
posthog.groupIdentify({
  groupType: 'company',
  groupKey: organizationId,
  properties: {
    name: org.name,
    subscription: org.plan,
    member_count: org.members.length,
    date_joined: org.createdAt
  }
});

posthog.capture({
  event: 'invoice_paid',
  distinctId: userId,
  groups: { company: organizationId }
});
```

**Key limitations:**
- Max 5 group types per project
- Can't assign one event to multiple groups of the same type
- Group types not supported for lifecycle insights or user paths
- Must include at least one group property for a group to appear in People tab

### Finding 1.2: Group analytics pricing applies to ALL identified events

**Claim:** Once you subscribe to the group analytics add-on, billing applies to **all identified events** in your project — not just events with group properties attached. This is because it enables infrastructure that processes all identified events.

**Confidence:** High — explicitly stated in official docs

**Evidence:**
- [Group analytics billing section](https://posthog.com/docs/user-guides/group-analytics) — Tier 1
- [PostHog pricing guide (Userorbit)](https://userorbit.com/blog/posthog-pricing-guide) — Tier 2

**Pricing tiers (per event, on top of base product analytics):**

| Volume/month | Cost/event |
|---|---|
| First 1M | Free |
| 1–2M | $0.0000710 |
| 2–15M | $0.0000300 |
| 15–50M | $0.0000189 |
| 50–100M | $0.0000105 |
| 100–250M | $0.0000040 |
| 250M+ | $0.0000029 |

**Template implication:** At 1M events/month (realistic for early-stage SaaS with <50 tenants), group analytics is free. At 5M events, cost is ~$90/month. This is manageable but should be monitored.

### Finding 1.3: Customer Analytics preview is coming

**Claim:** PostHog is working on a "Customer Analytics" feature preview that reimagines group analytics. It's in early access.

**Confidence:** Medium — mentioned in docs banner, no details on timeline

**Evidence:**
- [Group analytics docs banner](https://posthog.com/docs/user-guides/group-analytics) — Tier 1: "Group analytics is getting a makeover! Sign up for the customer analytics feature preview."

---

## 2. Revenue Tracking / Attribution

### Finding 2.1: Revenue Analytics is in beta, free, and Stripe-native

**Claim:** PostHog's Revenue Analytics is currently in beta, free to use, and has a native Stripe integration. It automatically builds MRR, ARR, churn, ARPU, LTV, and subscription count dashboards from Stripe data.

**Confidence:** High

**Evidence:**
- [Revenue analytics start guide](https://posthog.com/docs/revenue-analytics/start-here) — Tier 1
- [Revenue analytics dashboard docs](https://posthog.com/docs/revenue-analytics/dashboard) — Tier 1
- [Stripe payment platform docs](https://posthog.com/docs/revenue-analytics/payment-platforms/stripe) — Tier 1

**What's available now:**
- MRR/ARR tracking with breakdown (New, Expansion, Contraction, Churn)
- Gross revenue (including one-time and refunds)
- Active subscriptions and customer counts
- ARPU and LTV calculations
- Top customers identification
- Revenue goals
- Revenue data usable in product analytics (funnels, journeys, SQL)
- Deferred revenue recognition
- Multi-currency support
- Filters/breakdowns by product, coupon, customer, amount

**Limitations:**
- Best for <20,000 transactions/month
- Optimized for subscription models (SaaS)
- Only Stripe fully supported (Chargebee, Polar, RevenueCat coming soon)

### Finding 2.2: Stripe webhook setup is now automated

**Claim:** PostHog can automatically create and register a Stripe webhook on your account for real-time data sync. Without webhooks, data syncs on a schedule only and doesn't update existing records.

**Confidence:** High

**Evidence:**
- [Stripe integration docs](https://posthog.com/docs/revenue-analytics/payment-platforms/stripe) — Tier 1

**Setup:** Go to data pipeline sources > your Stripe source > Webhook tab > Create webhook. PostHog handles registration.

**For the template:** The recommended approach is to use Stripe as a **data warehouse source** (not manual event capture), then enable webhooks for real-time sync. This eliminates the need to write webhook handler code for analytics.

### Finding 2.3: Custom subscription lifecycle events via manual capture

**Claim:** For granular subscription lifecycle tracking beyond what the Stripe connector provides, you can capture custom revenue events with specific properties.

**Confidence:** High

**Evidence:**
- [Capturing revenue events docs](https://posthog.com/docs/revenue-analytics/capture-revenue-events) — Tier 1
- [GitHub PR #36257 — subscription property](https://github.com/PostHog/posthog/pull/36257) — Tier 1

**Recommended event schema for SaaS template:**
```javascript
// From Stripe webhook handler (server-side, for events beyond what the connector provides)
posthog.capture({
  distinctId: userId,
  event: 'subscription_lifecycle',
  groups: { company: organizationId },
  properties: {
    revenue: amountInCents,       // Minor units recommended
    currency: 'USD',
    product: planName,
    subscription_id: stripeSubscriptionId,
    lifecycle_action: 'created',  // created | upgraded | downgraded | canceled | renewed | trial_started | trial_ended
    coupon: couponCode || null
  }
});
```

### Finding 2.4: First-touch UTM to revenue attribution is supported

**Claim:** PostHog automatically captures UTM parameters and sets "Initial UTM Source" / "Initial Referrer Domain" as person properties. You can break down revenue events by these initial properties to connect acquisition channel to payment.

**Confidence:** High

**Evidence:**
- [First and last touch attribution tutorial](https://posthog.com/tutorials/first-last-touch-attribution) — Tier 1
- [UTM segmentation docs](https://posthog.com/docs/data/utm-segmentation) — Tier 1
- [Multi-touch attribution PR #51481](https://github.com/PostHog/posthog/pull/51481) — Tier 1

**Key details:**
- All 5 UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) captured automatically
- Custom params configurable via `custom_campaign_params` array
- Initial values persisted as person properties (requires identified events)
- Channel auto-classification (Paid Search, Organic, Direct, etc.) via web analytics
- Multi-touch attribution (linear, time-decay, position-based) in development

**SQL example — first-touch to revenue:**
```sql
SELECT
  person.properties.$initial_utm_source AS source,
  sum(events.properties.revenue) / 100 AS total_revenue,
  count(DISTINCT events.distinct_id) AS customers
FROM events
LEFT JOIN persons ON events.distinct_id = persons.distinct_id
WHERE events.event = 'purchase_completed'
GROUP BY source
ORDER BY total_revenue DESC
```

---

## 3. Product Analytics Patterns for SaaS

### Finding 3.1: AARRR pirate metrics template exists and is recommended

**Claim:** PostHog offers a pre-built AARRR dashboard template covering Acquisition, Activation, Retention, Revenue, and Referral. PostHog uses it internally and recommends it for all teams.

**Confidence:** High

**Evidence:**
- [AARRR template page](https://posthog.com/templates/aarrr-dashboard) — Tier 1
- [PostHog activation docs](https://posthog.com/docs/new-to-posthog/activation) — Tier 1

### Finding 3.2: Activation tracking requires deliberate definition

**Claim:** Activation should be defined as the specific user behavior that correlates with long-term retention — not just signup or login. PostHog recommends testing 5–10 event combinations and comparing retention rates to find the strongest predictor.

**Confidence:** High

**Evidence:**
- [Measuring activation docs](https://posthog.com/docs/new-to-posthog/activation) — Tier 1
- [How PostHog found their activation metric](https://posthog.com/product-engineers/activation-metrics) — Tier 2
- [ProductQuant B2B setup guide](https://productquant.dev/blog/posthog-setup-guide/) — Tier 2

**Examples:**
- Dropbox: stored 1 file in first week
- Uber: took first ride
- PostHog Session Replay: watched 5+ replays AND set a filter

**Template approach:** Define activation as a configurable composite event. For a SaaS boilerplate, common activation candidates:
- Created first [core object]
- Invited first teammate
- Completed first [workflow]
- Connected first integration

### Finding 3.3: Retention analysis uses cohort-based approach

**Claim:** PostHog retention insights require defining a "start event" (cohort entry) and a "return event" (what counts as retained). Periods configurable as hours, days, weeks, or months. Two visualization formats: retention graph and cohort table.

**Confidence:** High

**Evidence:**
- [Retention docs](https://posthog.com/docs/user-guides/retention) — Tier 1
- [Stickiness docs](https://posthog.com/docs/user-guides/stickiness) — Tier 1
- [Feature retention tutorial](https://posthog.com/tutorials/feature-retention) — Tier 1

**Key distinction:** Retention = "did they come back at all?" vs Stickiness = "how many days within the period did they engage?" Both are valuable for SaaS.

### Finding 3.4: Feature usage tracking pattern

**Claim:** Track feature adoption with explicit events including the feature name as a property. This enables breakdown by feature in trends and funnels.

**Confidence:** High

**Evidence:**
- [ProductQuant setup guide](https://productquant.dev/blog/posthog-setup-guide/) — Tier 2
- [PostHog event tracking guide](https://posthog.com/tutorials/event-tracking-guide) — Tier 1

**Recommended pattern:**
```javascript
posthog.capture('feature_used', {
  feature: 'dashboard_builder',
  feature_category: 'analytics',
  is_first_use: true, // Track discovery vs repeat usage
});
```

### Finding 3.5: Onboarding funnel setup

**Claim:** Create funnel insights with sequential steps from signup through activation events. Filter each step by event/person/group properties. Use session replays to watch drop-off points, then test fixes with feature flags.

**Confidence:** High

**Evidence:**
- [Funnels docs](https://posthog.com/docs/features/funnels) — Tier 1
- [App onboarding drop-off blog](https://posthog.com/blog/how-to-find-and-fix-app-onboarding-drop-off) — Tier 2

---

## 4. Dashboard Templates

### Finding 4.1: 45+ templates available, several SaaS-specific

**Claim:** PostHog offers 45+ pre-built dashboard templates. The most relevant for early-stage B2B SaaS are:

| Template | What it tracks | SaaS relevance |
|---|---|---|
| **AARRR Pirate Metrics** | Full funnel: acquisition → referral | High — overall product health |
| **B2B Metrics** | DAU, MAU, DAU/MAU ratio, retention, conversion | High — built for B2B |
| **Product Health** | Sign-ups, feature adoption, session duration, retention | High — early warning system |
| **Product Analytics** | Active users, feature usage, growth accounting, churn | Medium — general purpose |
| **PostHog Billable Usage** | Event breakdown by type, SDK, product | High — cost management |
| **Landing Page Report** | Landing page performance | Medium — marketing |
| **NPS/CSAT/PMF Surveys** | Customer sentiment | Medium — qualitative layer |

**Confidence:** High

**Evidence:**
- [PostHog templates library](https://posthog.com/templates) — Tier 1
- [B2B metrics template](https://posthog.com/templates/b2b-dashboard) — Tier 1
- [Product health template](https://posthog.com/templates/health-dashboard) — Tier 1
- [ProductQuant dashboard templates article](https://productquant.dev/blog/posthog-dashboard-templates/) — Tier 2

### Finding 4.2: Dashboards are exportable/importable as JSON

**Claim:** Dashboards can be exported as JSON and imported via the templates system. API endpoints support full CRUD. Templates support variables with configurable defaults.

**Confidence:** High

**Evidence:**
- [Dashboard templates handbook](https://posthog.com/handbook/growth/marketing/templates) — Tier 1
- [Dashboard templates API](https://posthog.com/docs/api/dashboard-templates) — Tier 1
- [Templates repository](https://github.com/PostHog/templates-repository) — Tier 1

**Template implication:** A SaaS boilerplate could ship with pre-configured dashboard JSON that gets imported on setup. The API supports team-scoped templates.

---

## 5. Billing Optimization

### Finding 5.1: Anonymous events are up to 4x cheaper — the primary cost lever

**Claim:** Anonymous events (no person profile) cost up to 4x less than identified events due to reduced processing (no table JOINs). The default `person_profiles: 'identified_only'` mode is the recommended config.

**Confidence:** High

**Evidence:**
- [Anonymous vs identified events docs](https://posthog.com/docs/data/anonymous-vs-identified-events) — Tier 1
- [Cutting costs docs](https://posthog.com/docs/product-analytics/cutting-costs) — Tier 1

**Strategy for SaaS template:**
- **Marketing/landing pages:** Anonymous events (default behavior)
- **Post-login app:** Identified events (call `identify()` once on load + after login)
- **Backend server events:** Identified by default; use `$process_person_profile: false` for high-volume, non-user-specific events

### Finding 5.2: Call identify() and group() only once per session

**Claim:** Calling `identify()` or `group()` multiple times wastes events. Check `posthog._isIdentified()` before calling. Duplicate `$groupidentify` events are a common hidden cost driver.

**Confidence:** High

**Evidence:**
- [Cutting costs docs](https://posthog.com/docs/product-analytics/cutting-costs) — Tier 1
- [99Ways cost guide](https://99ways.io/how-to-reduce-your-posthog-costs/) — Tier 2

**Detection SQL for duplicate group events:**
```sql
SELECT properties.$lib AS lib, count() AS groupidentify_event_count
FROM events
WHERE event = '$groupidentify'
  AND $session_id IN (
    SELECT $session_id FROM events
    WHERE event = '$groupidentify'
      AND timestamp >= now() - INTERVAL 30 DAY
    GROUP BY $session_id HAVING count() > 1
  )
GROUP BY lib ORDER BY groupidentify_event_count DESC
```

### Finding 5.3: Configure autocapture carefully

**Claim:** Autocapture is powerful but noisy. Options: (a) set allow/ignore lists to reduce captured events, (b) disable entirely and track only custom events, (c) disable automatic pageview/pageleave and capture manually.

**Confidence:** High

**Evidence:**
- [Cutting costs docs](https://posthog.com/docs/product-analytics/cutting-costs) — Tier 1

**Template recommendation:** Enable autocapture with a focused allow-list for early discovery, then progressively tighten as the tracking plan matures. Disable automatic pageview/pageleave for SPAs and handle manually.

### Finding 5.4: Billing limits prevent runaway costs

**Claim:** PostHog supports per-product billing limits (including $0). Alerts are sent at 80% and 100% of limits. Data is dropped when limits are exceeded.

**Confidence:** High

**Evidence:**
- [Billing limits and alerts docs](https://posthog.com/docs/billing/limits-alerts) — Tier 1
- [Common billing questions](https://posthog.com/docs/billing/common-questions) — Tier 1

**Template recommendation:** Ship with sensible default billing limit guidance in setup docs. Key products to cap: product analytics, session replay, data warehouse.

### Finding 5.5: Sampling available at query-time and ingestion-time

**Claim:** Two sampling mechanisms: (a) query-side sampling in insights (0.1%–25%) for faster analysis on large datasets, (b) ingestion-time downsampling via CDP transformation to reduce event volume. For high-volume APIs, use feature flags to sample a percentage of events.

**Confidence:** High

**Evidence:**
- [Sampling docs](https://posthog.com/docs/product-analytics/sampling) — Tier 1
- [Downsample docs](https://posthog.com/docs/cdp/downsampling) — Tier 1
- [Track high-volume APIs tutorial](https://posthog.com/tutorials/track-high-volume-apis) — Tier 1

---

## 6. Better Auth + PostHog Integration

### Finding 6.1: No documented integration exists — custom implementation required

**Claim:** No published guide, blog post, or community pattern exists for integrating Better Auth with PostHog specifically. The integration must be built from standard patterns.

**Confidence:** High (absence confirmed across PostHog docs, Better Auth docs, GitHub, Reddit, X)

**Evidence:**
- [Better Auth docs](https://www.better-auth.com/) — Tier 1 (no PostHog mention)
- [PostHog identify docs](https://posthog.com/docs/getting-started/identify-users) — Tier 1
- Search across GitHub, Reddit, X — no results

### Finding 6.2: Recommended integration pattern

**Claim:** The integration follows a standard identify-on-auth pattern. Better Auth provides session data via `getSession()` / `useSession()`; PostHog needs `posthog.identify()` called with the user's database ID.

**Confidence:** High (pattern is generic and well-established)

**Recommended client-side pattern:**
```typescript
// In a React component or layout that runs after auth
import { useSession } from '@/lib/auth-client';
import { usePostHog } from 'posthog-js/react';

function PostHogIdentifier() {
  const { data: session } = useSession();
  const posthog = usePostHog();

  useEffect(() => {
    if (session?.user && !posthog._isIdentified()) {
      posthog.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });

      // If organization context is available
      if (session.user.activeOrganizationId) {
        posthog.group('company', session.user.activeOrganizationId);
      }
    }
  }, [session, posthog]);

  return null;
}
```

**Server-side pattern (e.g., in tRPC middleware or API routes):**
```typescript
import { PostHog } from 'posthog-node';

const posthogClient = new PostHog(process.env.POSTHOG_API_KEY!, {
  host: 'https://us.i.posthog.com',
});

// In your server-side auth middleware or after-auth hook
function trackServerEvent(session: Session, event: string, properties?: Record<string, any>) {
  posthogClient.capture({
    distinctId: session.userId,
    event,
    groups: session.activeOrganizationId
      ? { company: session.activeOrganizationId }
      : undefined,
    properties,
  });
}
```

### Finding 6.3: Session management — call reset() on logout

**Claim:** When a user logs out (Better Auth `signOut()`), call `posthog.reset()` to unlink the person profile and create a new anonymous ID. Without this, the next user on the same browser inherits the previous user's identity.

**Confidence:** High

**Evidence:**
- [Anonymous vs identified events FAQ](https://posthog.com/docs/data/anonymous-vs-identified-events) — Tier 1

---

## 7. PostHog + Drizzle ORM

### Finding 7.1: No native integration exists

**Claim:** There is no PostHog plugin, Drizzle hook, or documented pattern for connecting PostHog directly with Drizzle ORM. The MakerKit Next.js Drizzle template uses a null analytics provider and notes PostHog would need a custom implementation.

**Confidence:** High (absence confirmed)

**Evidence:**
- [MakerKit PostHog analytics provider](https://makerkit.dev/docs/nextjs-drizzle/analytics/posthog-analytics-provider) — Tier 2
- Search across GitHub, npm — no results

### Finding 7.2: Server-side capture from business logic is the right pattern

**Claim:** Rather than Drizzle hooks/middleware, the recommended approach is to capture PostHog events from your business logic layer (tRPC procedures, API route handlers, service functions) where you already have user context.

**Confidence:** High (aligns with PostHog's own recommendations)

**Rationale:** Drizzle operates at the SQL level and doesn't carry user/session context. PostHog events need `distinct_id` and ideally `groups` — information that exists at the request/business logic layer, not the ORM layer.

**Pattern:**
```typescript
// In a tRPC procedure or service function
async function createProject(userId: string, orgId: string, data: ProjectInput) {
  const project = await db.insert(projects).values({
    ...data,
    organizationId: orgId,
  }).returning();

  // Track the business event at the service layer, not the ORM layer
  posthogClient.capture({
    distinctId: userId,
    event: 'project_created',
    groups: { company: orgId },
    properties: {
      project_id: project[0].id,
      project_type: data.type,
    },
  });

  return project[0];
}
```

### Finding 7.3: PostHog data warehouse can query external Postgres via Drizzle schema

**Claim:** PostHog's data warehouse supports linking external Postgres databases. Combined with the SQL editor, you could join PostHog event data with your Drizzle-managed Postgres tables for advanced analysis. PostHog also has a `duckgres` project for Postgres-compatible access to ClickHouse data.

**Confidence:** Medium

**Evidence:**
- [PostHog data warehouse docs](https://posthog.com/docs/data-warehouse/sources/posthog) — Tier 1
- [PostHog/duckgres](https://github.com/PostHog/duckgres) — Tier 1

---

## 8. Next.js Integration (Bonus — Template-Relevant)

### Finding 8.1: @posthog/next is the recommended integration package

**Claim:** PostHog now has `@posthog/next`, a first-class Next.js integration that handles middleware proxying, server/client identity sync, feature flag bootstrapping, and consent management.

**Confidence:** High

**Evidence:**
- [@posthog/next on npm](https://www.npmjs.com/package/@posthog/next) — Tier 1
- [PostHog Next.js docs](https://posthog.com/docs/integrate/third-party/next-js) — Tier 1
- [GitHub PR #3122](https://github.com/PostHog/posthog-js/pull/3122) — Tier 1

**Setup:**
```bash
npm install @posthog/next
```

```typescript
// middleware.ts
import { postHogMiddleware } from '@posthog/next'
export default postHogMiddleware({ proxy: true })
```

```tsx
// app/layout.tsx
import { PostHogProvider, PostHogPageView } from '@posthog/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PostHogProvider clientOptions={{ api_host: '/ingest' }} bootstrapFlags>
          <PostHogPageView />
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
```

**Key benefits:**
- Built-in API proxy for ad-blocker resilience
- Server-side feature flag bootstrapping (no flicker)
- Synchronized client/server identity via middleware cookie
- Consent-aware
- Static-safe (doesn't break `next build`)

---

## Contradictions and Resolutions

### Contradiction 1: Autocapture — use it or not?

- **PostHog docs** recommend autocapture as a starting point with refinement
- **ProductQuant** says autocapture is not a substitute for a real taxonomy and should not be relied on

**Resolution:** Both are correct at different stages. For a template, **enable autocapture with an allow-list** for early discovery, but always instrument the critical value-path events explicitly. Autocapture catches what you didn't think to track; custom events measure what you know matters.

### Contradiction 2: Stripe connector vs custom events for revenue

- PostHog revenue analytics prefers the **Stripe data connector** approach (link Stripe as source, auto-sync)
- Some patterns suggest **capturing custom revenue events** from Stripe webhooks

**Resolution:** Use both. The Stripe connector provides the revenue dashboard automatically. Custom events supplement with lifecycle signals (trial_started, upgrade, downgrade) and richer properties tied to your domain model. The connector handles the financial metrics; custom events handle the behavioral layer.

---

## Decision Implications

### Strategic
- PostHog is a viable single-platform solution for B2B SaaS product analytics, replacing Mixpanel + Amplitude + custom revenue dashboards
- Group analytics is essential for B2B multi-tenancy but adds billing overhead — plan for it from day one
- Revenue analytics beta removes the need for custom Stripe → analytics pipeline code

### Operational
- Tracking plan should be defined before implementation (question-first, not event-first)
- `@posthog/next` + `posthog-node` covers the full stack (client + server)
- Better Auth integration is straightforward but must be built custom
- Ship with billing limits configured to prevent surprise costs

### Financial
- Free tier (1M events + 5K replays + 1M warehouse rows) is generous for early-stage
- Anonymous vs identified event split is the primary cost lever
- Group analytics add-on cost is proportional to total identified events, not just grouped events
- Revenue analytics is free during beta

### Risk
- Revenue analytics is in beta — API surface may change
- Customer Analytics (group analytics v2) is in preview — current group analytics API may evolve
- No ecosystem support for Better Auth + PostHog — template must maintain custom integration
- Drizzle ORM has no analytics hooks — business logic layer is the correct integration point

---

## Recommendations

### For the SaaS template implementation:

1. **Install `@posthog/next` and `posthog-node`** as the core integration packages. Configure middleware proxy, `PostHogProvider` in layout, and a server-side PostHog client singleton.

2. **Build a `PostHogIdentifier` component** that reads Better Auth session state and calls `identify()` + `group()` once per session. Reset on logout. Guard with `_isIdentified()`.

3. **Configure `person_profiles: 'identified_only'`** (the default) to keep marketing page events anonymous and cheap. Only identify after login.

4. **Set up group analytics from day one** with `company` as the group type, using `organizationId` as the group key. Attach group properties (name, plan, member_count, created_at) on org creation and plan change.

5. **Connect Stripe as a data warehouse source** with webhook-based real-time sync. This gives you the revenue dashboard for free. Supplement with custom lifecycle events for trial/upgrade/downgrade tracking.

6. **Install the AARRR, B2B Metrics, and Billable Usage dashboard templates** on project setup. These give immediate operational visibility.

7. **Ship with billing limit configuration guidance** — recommend $0 limits on session replay and data warehouse for cost-conscious early-stage users, with product analytics capped at a sensible default.

8. **Track server-side business events from the service/tRPC layer**, not from Drizzle hooks. Always include `groups: { company: orgId }` on server events.

9. **Capture activation and feature usage as custom events** (not autocapture). Define a configurable activation metric and build a funnel insight for it.

10. **Set up UTM attribution** by ensuring the PostHog JS SDK captures initial referrer/UTM properties, then use person property breakdowns on conversion events.

---

## Assumptions and Unknowns

### Assumptions
- PostHog Cloud (US) will be used, not self-hosted
- Stripe is the billing provider
- Organization-level multi-tenancy with `organizationId` as the tenant boundary (consistent with repo rules)
- Next.js App Router is the framework

### Unknowns
- When will Revenue Analytics exit beta and what pricing will apply?
- When will Customer Analytics (group v2) ship and will it change the group analytics API?
- Will `@posthog/next` remain the recommended package or merge into `posthog-js`?
- PostHog multi-touch attribution models (PR #51481) — timeline and availability?

---

## Source List

1. [Group analytics docs](https://posthog.com/docs/user-guides/group-analytics) — Tier 1
2. [Group Analytics product page](https://posthog.com/group-analytics) — Tier 1
3. [Revenue analytics start guide](https://posthog.com/docs/revenue-analytics/start-here) — Tier 1
4. [Revenue analytics dashboard](https://posthog.com/docs/revenue-analytics/dashboard) — Tier 1
5. [Stripe payment platform docs](https://posthog.com/docs/revenue-analytics/payment-platforms/stripe) — Tier 1
6. [Capturing revenue events](https://posthog.com/docs/revenue-analytics/capture-revenue-events) — Tier 1
7. [Stripe webhook source](https://posthog.com/docs/cdp/source_webhooks/source-stripe-webhook) — Tier 1
8. [GitHub PR #36257 — subscriptionProperty](https://github.com/PostHog/posthog/pull/36257) — Tier 1
9. [AARRR template](https://posthog.com/templates/aarrr-dashboard) — Tier 1
10. [Measuring activation](https://posthog.com/docs/new-to-posthog/activation) — Tier 1
11. [PostHog activation metrics blog](https://posthog.com/product-engineers/activation-metrics) — Tier 2
12. [Funnels docs](https://posthog.com/docs/features/funnels) — Tier 1
13. [Retention docs](https://posthog.com/docs/user-guides/retention) — Tier 1
14. [Stickiness docs](https://posthog.com/docs/user-guides/stickiness) — Tier 1
15. [PostHog templates library](https://posthog.com/templates) — Tier 1
16. [B2B metrics template](https://posthog.com/templates/b2b-dashboard) — Tier 1
17. [Dashboard templates API](https://posthog.com/docs/api/dashboard-templates) — Tier 1
18. [Anonymous vs identified events](https://posthog.com/docs/data/anonymous-vs-identified-events) — Tier 1
19. [Cutting product analytics costs](https://posthog.com/docs/product-analytics/cutting-costs) — Tier 1
20. [Billing limits and alerts](https://posthog.com/docs/billing/limits-alerts) — Tier 1
21. [Sampling docs](https://posthog.com/docs/product-analytics/sampling) — Tier 1
22. [Downsample transformation](https://posthog.com/docs/cdp/downsampling) — Tier 1
23. [PostHog identify users](https://posthog.com/docs/getting-started/identify-users) — Tier 1
24. [First/last touch attribution tutorial](https://posthog.com/tutorials/first-last-touch-attribution) — Tier 1
25. [UTM segmentation docs](https://posthog.com/docs/data/utm-segmentation) — Tier 1
26. [@posthog/next npm](https://www.npmjs.com/package/@posthog/next) — Tier 1
27. [ProductQuant PostHog setup guide](https://productquant.dev/blog/posthog-setup-guide/) — Tier 2
28. [99Ways PostHog cost guide](https://99ways.io/how-to-reduce-your-posthog-costs/) — Tier 2
29. [PostHog Node.js SDK](https://posthog.com/docs/integrate/server/node) — Tier 1
30. [MakerKit PostHog provider](https://makerkit.dev/docs/nextjs-drizzle/analytics/posthog-analytics-provider) — Tier 2
31. [PostHog pricing (Userorbit)](https://userorbit.com/blog/posthog-pricing-guide) — Tier 2
32. [Multi-touch attribution PR #51481](https://github.com/PostHog/posthog/pull/51481) — Tier 1
33. [PostHog/duckgres](https://github.com/PostHog/duckgres) — Tier 1
34. [Track high-volume APIs tutorial](https://posthog.com/tutorials/track-high-volume-apis) — Tier 1
