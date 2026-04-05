---
name: constructing-onboarding
description: Design, instrument, and build customer onboarding for any business model. Routes to the right configuration (B2B SaaS self-serve, B2B SaaS sales-led, B2C subscription, B2C ecommerce, marketplace/platform, agency/professional services, fintech/regulated), then produces a screen-by-screen build spec with pattern selection, component anatomy, copy direction, layout, flow state machine (abandon/return/skip/error handling), behavioral email sequences, activation milestones, measurement, compliance, benchmarks, and experiments. Supports touch-model overlays (product-led, low-touch automated, hybrid, high-touch, concierge, community-led, partner-led) that modify delivery mechanics. Grounded in observed implementations across 30+ companies (Notion, Figma, Slack, Duolingo, Stripe, Airbnb, Rocketlane, etc.).
last-reviewed: 2026-04-04
---

# Constructing Onboarding

## Purpose

Build or audit a customer onboarding experience from signup to retained, activated user. The output is always an actionable, stage-by-stage onboarding plan with activation milestones, event schemas, benchmark targets, compliance checks, and prioritized experiments — not a generic checklist or feature tour.

Onboarding is the highest-leverage retention intervention available. 40–60% of early SaaS cancellations trace directly to failed onboarding (Loyalty.cx / ChurnWard), and the renewal decision is effectively made within the first 90 days (Forrester 2025). The median product loses 96% of new users by month 3 (Amplitude 2025, 10.6K products). The gap between top quartile and median is consistently 2–3x on every onboarding metric.

Slash command: `/onboarding`

---

## Trigger

Apply this skill when the user asks things like:

- "Help me build onboarding for X"
- "Audit my onboarding flow"
- "Why are users churning after signup?"
- "How do I improve activation?"
- "Design my user onboarding experience"
- "What should happen after someone signs up?"
- "Reduce time-to-value for our product"
- "Build a client onboarding process for my agency"

---

## Step 1 — Collect Inputs

Before building anything, gather the following. Ask only for what is missing; use sensible defaults for the rest.

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| What you sell | Routes to configuration | — (must ask) |
| Business model | B2B SaaS, B2C subscription, marketplace, agency, etc. | Infer from product type |
| ACV or average order value | Sets touch-model and benchmark band | Infer from product type |
| Customer segment | SMB / Mid-Market / Enterprise | Infer from ACV |
| Current activation event | The action that correlates with retention | — (must define in Step 3) |
| Current activation rate | Baseline for improvement targeting | Unknown (will benchmark) |
| Current time-to-value | Baseline for TTFV reduction | Unknown (will benchmark) |
| Primary acquisition channel | Determines pre-onboarding context | Infer from business model |
| Geography / market | Determines compliance surface (GDPR, EAA, industry regs) | US, global |
| Existing onboarding | What exists today, if anything | Greenfield |
| Output mode | `quick_plan`, `deep_teardown`, or `build_checklist` | `quick_plan` |

---

## Onboarding Design Principles

These principles govern every decision in Steps 2–6. Apply them before selecting a configuration or overlay. Each principle includes a procedure (what to do), a worked example, and a near-miss counter-example.

### Principle 1 — Time-to-First-Value as the Organizing Principle

Every onboarding stage exists to reduce or remove friction between signup and first value realization. If a stage does not move the user closer to their first "aha" moment, it has no job. Products delivering aha moments within 5 minutes show 40% higher 30-day retention vs. those requiring 15+ minutes (KnowledgeLib 2026). 91% of new users drop off within 14 days if they don't experience value quickly (Amplitude 2025).

**Procedure:** Before writing any stage spec, fill in these three blanks:

1. What is the user's first valuable outcome? "The user can ___ for the first time."
2. What is the fastest path to that outcome? "The minimum steps are: ___."
3. What does this stage contribute to reaching that outcome? "This stage removes the barrier of ___."

If blank 3 is empty, the stage is friction, not onboarding — cut it or defer it to post-activation.

**Worked example — Config A (project management SaaS, self-serve):**

| | Answer |
|---|---|
| First valuable outcome | "The user can see their first project board with real tasks organized by status." |
| Fastest path | Sign up → create project → add 3 tasks → drag one to "in progress" |
| Stage contributions | Signup: identity. Welcome survey: routes to right template. Template selection: pre-populates board. First drag: aha moment. |

The welcome survey earns its place because it routes to a relevant template (removing the "blank canvas" barrier). If the survey just collected demographic data, it would delay value without removing a barrier — cut it.

**Near-miss counter-example:** A B2B SaaS tool adds a "meet your workspace" product tour after signup that walks through 8 features before letting the user create anything. The tour is well-designed: smooth animations, clear copy, skip button available. But 40–60% of SaaS users never return after first session (Reloadux), and the tour adds 3 minutes before any value. Completion is 61% (Chameleon 2025 median), meaning 39% leave having seen zero value. Fix: replace the tour with a single pre-populated template and a contextual tooltip on the first action the user needs to take.

### Principle 2 — One Pattern at a Time

Use exactly one onboarding pattern per stage. Never stack patterns. Each additional pattern reduces completion by approximately 30%. Five stacked patterns produce 8% completion (DNSK.work, tested across 17 products over 4 years).

Onboarding patterns include: setup wizard, product tour, checklist, tooltips/hotspots, empty states, welcome modal, and video walkthrough. Each works in isolation. They interfere when combined because they give contradictory instructions — a wizard says "follow these steps in order," a tour says "let me show you around," and a checklist says "do these in any order."

**Procedure:** For every onboarding stage, answer:

1. What is the single pattern this stage uses? "This stage uses a ___."
2. Is any other pattern present? If yes, remove it.
3. Which pattern fits the stage's job? Use this lookup:

| Stage job | Best-fit pattern |
|---|---|
| Collect structured input from user | Setup wizard |
| Orient user to interface for the first time | Product tour (contextual, max 3–5 steps) |
| Guide user through multiple independent setup tasks | Checklist |
| Teach a feature at the moment of use | Tooltip / hotspot |
| Show what the product looks like when populated | Empty state with sample data |
| Deliver a one-time message (welcome, what's new) | Modal |
| Demonstrate a complex workflow | Video walkthrough |

**Worked example — Config A (project management SaaS):**

| Stage | Pattern | Why this one |
|---|---|---|
| Account creation | Setup wizard (3 steps) | Collecting structured input: name, team size, use case |
| First project | Empty state with template selection | User needs to see what a populated board looks like |
| First actions | Contextual tooltips (2 tips) | Teaching drag-and-drop at the moment of use |

One pattern per stage. No overlap.

**Near-miss counter-example:** A SaaS product uses a setup wizard for account creation (correct), then on the dashboard shows both a checklist sidebar AND a product tour AND three tooltip hotspots. Each element individually is well-designed — the checklist has clear tasks, the tour highlights key areas, the tooltips explain features. But the user sees three competing UIs demanding attention simultaneously. The fintech case study showed this exact failure: 6 stacked patterns → 9% activation; each pattern alone → 43–61% completion (DNSK.work). Fix: pick the checklist (it's the best fit for "multiple independent setup tasks"), remove the tour and tooltips entirely.

### Principle 3 — Value Before Data

Show value before requesting information. Users should experience what the product does before you ask them to configure it. Defer data collection until the user needs to save, share, or personalize their experience.

**Procedure:** List every data point collected during onboarding. For each one, answer:

1. "Can the user experience any value without this data?" If yes → defer it to after first value.
2. "Does this data improve the first-value experience?" If yes → collect it, but only the minimum needed.
3. "Is this data for the business, not the user?" If yes → move it to post-activation or make it optional.

**Worked example — Config E (marketplace, seller onboarding):**

| Data point | Needed before first value? | Decision |
|---|---|---|
| Business name | No — can list items without it | Defer to "complete your profile" after first listing |
| Email | Yes — needed for account/notifications | Keep at signup |
| Product photos | Yes — needed for listing | Keep, but allow draft listings without photos |
| Tax ID | No — needed for payout, not for listing | Defer to "set up payments" before first payout |
| Bank details | No — needed for payout, not for listing | Defer to "set up payments" |
| Business description | No — nice-to-have for buyer trust | Defer to post-first-listing |

This marketplace lets sellers create their first listing with just email + product photos. Tax ID and banking come later, when the seller has already invested effort and seen their listing live.

**Near-miss counter-example:** A venue-booking marketplace requires sellers to complete a 12-field profile (business name, description, category, 3 photos, address, phone, hours, tax ID, bank details, cancellation policy) before they can create their first listing. Each field is individually reasonable — they all appear on the final listing page. But the seller hasn't experienced any value yet, and the 68% vendor abandonment rate (Appscrip) kicks in. A competing marketplace that let sellers skip to listing creation first saw 41% more first bookings (Reloadux). Fix: require only email + listing photos. Collect everything else progressively after the first listing is live.

### Principle 4 — Activation Event as North Star

Define the activation event first, then design the entire onboarding experience backwards from it. The activation event is the specific user action that, when completed, correlates with long-term retention. It is NOT "completed onboarding" or "logged in" — it's the moment the user experienced core product value.

**Procedure:**

1. State the candidate activation event: "The activation event is ___."
2. Validate with data (if available): "Users who complete this action within [timeframe] retain at ___% vs ___% for those who don't."
3. If no data: state the hypothesis and plan to validate within 30 days of launch.
4. Design backwards: for each onboarding stage, answer: "Does this stage move the user toward the activation event?" If no → cut or defer.

**Worked example — Config B (B2B SaaS, sales-led CRM):**

| | Answer |
|---|---|
| Candidate activation event | "User imports contacts and sends their first email sequence" |
| Validation | "Users who send their first sequence within 14 days retain at 78% (Month 6) vs 31% for those who don't" |
| Design backwards | Every onboarding stage must remove a barrier to importing contacts or sending a sequence. Feature tours of analytics, admin settings, and integrations can wait. |

**Near-miss counter-example:** An analytics SaaS defines their activation event as "user creates their first dashboard." Onboarding is designed to get users to dashboard creation quickly — setup wizard collects data source, template picker shows pre-built dashboards, first dashboard is created in 8 minutes. TTFV looks great. But retention is mediocre. Investigation reveals that dashboard creation doesn't correlate with retention — *sharing a dashboard with a teammate* does (it creates organizational switching costs). The onboarding optimized for the wrong activation event. Everything was well-executed except the target. Fix: redefine activation as "creates and shares a dashboard," and add a sharing prompt as the final onboarding step.

### Principle 5 — Progressive Disclosure

Reveal product complexity gradually. Front-loading features overwhelms users and delays time-to-value. Only surface a capability when the user's current task requires it.

**Procedure:** Categorize every product feature into one of three buckets:

| Bucket | When to introduce | Example |
|---|---|---|
| **Core** (needed for first value) | During onboarding | Creating a project, adding a task |
| **Power** (enhances value after basics mastered) | After activation, triggered by behavior | Automations, integrations, advanced filters |
| **Admin** (organizational/settings) | On demand or at team scale-up | Permissions, billing, audit logs |

If a feature is in "Power" or "Admin," it must NOT appear during onboarding. Not in tours, not in checklists, not in tooltips. Every feature shown before activation competes for attention with the activation path.

**Worked example — Config A (design tool, self-serve):**

| Feature | Bucket | Onboarding treatment |
|---|---|---|
| Create a design from template | Core | Step 2 of onboarding wizard |
| Export as PNG/PDF | Core | Contextual tooltip after first design |
| Brand kit (colors, fonts) | Power | Prompt after 3rd design: "Save time with brand presets?" |
| Team sharing and comments | Power | Prompt after first export: "Want feedback from your team?" |
| SSO and admin controls | Admin | Settings page, never shown in onboarding |

**Near-miss counter-example:** A project management tool's onboarding checklist includes 8 items: create project, add task, invite team member, set up integrations, configure notifications, create a custom field, enable time tracking, set permissions. Each item is genuinely useful. But items 4–8 are Power/Admin features that compete with the activation path (create project → add tasks → experience the board). Users see an 8-item checklist and feel the product is complex. Median checklist completion is 19.2% across SaaS (Loyalty.cx). Fix: reduce the checklist to 3 items (create project, add 3 tasks, drag a task to "done"). Introduce everything else post-activation.

### Principle 6 — The 72-Hour Cliff

If value doesn't happen within 72 hours, there is a 90% probability the user churns (ChurnWard). For products where activation takes longer than 72 hours (enterprise, complex setup), create intermediate value milestones that demonstrate progress before full value realization.

**Procedure:** Answer these two questions:

1. "Can a new user reach the activation event within 72 hours?" If yes → design onboarding to hit it in that window, with urgency but not pressure.
2. If no → define at least one intermediate value milestone that happens within 72 hours: "Within 72 hours, the user will see/experience ___."

**Worked example — Config B (enterprise data platform, 6-week implementation):**

Full activation (data pipeline live with production data) takes 4–6 weeks. Without intermediate value, users go dark after the kickoff call.

| Milestone | Timing | Value delivered |
|---|---|---|
| Sample dashboard with demo data | Day 1 (during kickoff) | User sees what the product looks like with real output |
| First test pipeline with sandbox data | Week 1 | User proves the product works with their data schema |
| First automated report | Week 2 | User gets a deliverable they can show their boss |
| Full production pipeline | Week 4–6 | Activation event |

The Day 1 sample dashboard costs almost nothing to build but gives the champion something to screenshot and show their team. The Week 1 sandbox pipeline validates technical fit before the full migration investment.

**Near-miss counter-example:** An enterprise SaaS has a thorough implementation: kickoff call (Day 1), requirements document (Week 1), data migration plan (Week 2), staging environment (Week 3), production go-live (Week 5). Process is well-structured, timelines are clear, the CSM is responsive. But the customer sees nothing from the product until Week 3. By then, the champion's internal sponsors are asking "what are we paying for?" and the project loses organizational momentum. Everything about the process is professional except the absence of early wins. Fix: generate a sample dashboard with demo data during the kickoff call so the champion walks away with something tangible on Day 1.

### Principle 7 — Segment Before You Standardize

Different users need different onboarding paths. A one-size-fits-all onboarding optimizes for the average user, who doesn't exist. Segment by job-to-be-done, not by demographics. AI-driven JTBD segmentation lifts feature adoption 10–20% vs. generic product tours (Tandem).

**Procedure:** Before building a single onboarding path, answer:

1. "What are the 2–4 distinct jobs users hire this product for?"
2. "Does the optimal onboarding path differ between these jobs?" If yes → branch onboarding after a segmentation step.
3. "How do we know which job this user has?" Options: ask directly (welcome survey), infer from behavior (signup source, first actions), or infer from data (company size, industry from enrichment).

**Worked example — Config A (email marketing SaaS):**

| Job | User type | Onboarding path |
|---|---|---|
| "Send my first newsletter" | Creator / solopreneur | Template picker → import contacts → compose → send |
| "Set up automated sequences" | Growth marketer | Integration setup → trigger configuration → first automation |
| "Migrate from competitor" | Switching user | Import wizard → re-create automations → verify deliverability |

A welcome survey asks "What's the first thing you want to do?" with three options mapped to these jobs. Each path is 3–4 steps to first value. Without segmentation, every user would see a generic dashboard with a 6-item checklist covering all three jobs.

**Near-miss counter-example:** A CRM tool segments users by company size (1–10, 11–50, 50+) instead of by job. Small companies get a "simple" onboarding and large companies get an "advanced" one. But a 5-person startup doing enterprise sales has the same needs as a 200-person company — they need pipeline management, not a simplified contact list. The segmentation variable (company size) doesn't correlate with the user's job. Onboarding feels irrelevant to both segments. Fix: segment by job ("manage a sales pipeline" vs. "track customer relationships" vs. "run marketing campaigns"), not by company size.

---

## Pattern Screen Specifications

Each onboarding pattern is a distinct UI component with specific anatomy, not an abstract concept. These specs are grounded in observed implementations across 30+ products (see `outputs/research/onboarding-screens-*.md`). When building a stage, select exactly one pattern from this section, then use the spec to build it.

### Pattern 1: Setup Wizard

Full-page or modal sequence collecting structured input, one concern per screen.

**Component anatomy:**
1. Progress indicator: stepper bar or step count ("Step 2 of 4") at top. Use step count for short wizards (3–5 steps); use progress bar without count for longer wizards — Shopify hides counts to avoid perceived-length abandonment. [Observed]
2. Step title: 3–8 words, describes the job of this step, not the data being collected. "What are you building?" not "Select category." [Observed — Canva, Shopify, Webflow]
3. Input group: max 3 fields per step. Use large selectable cards for categorical choices (Notion: 3 cards for Work/Personal/School). Use text fields only for unique data (workspace name, email). [Observed — all SaaS teardowns]
4. Primary CTA: right-aligned, "Continue" or "Next." Action-specific CTAs ("Create workspace") on the final step only. [Observed]
5. Back link: left-aligned, text link not button. [Observed]
6. Skip link: bottom-right, de-emphasized text, "I'll do this later" or "Skip" — present only on non-essential steps. [Observed — Linear, Shopify]

**Layout:** Single-column centered, max 480–600px wide. Clean background, no sidebar or navigation chrome. Logo top-center. [Observed — Notion, Slack, Linear, Canva, Webflow]

**Copy direction:** Step titles are questions ("How are you planning to use [Product]?") or imperative + context ("Name your workspace"). Field labels are conversational ("What's your team working on?") not form-like ("Team Name"). [Observed — Slack, Airtable]

**Config-specific variations:**
- **Fintech KYC wizard** (Stripe, Revolut): dynamically rendered based on country and business type. Camera-based document capture (not file upload). Compliance copy per step ("Required by regulation to protect your account"). Waiting state after final step. [Observed — Stripe, Revolut, Plaid]
- **Marketplace listing wizard** (Airbnb): 10-screen progressive disclosure, one concern per screen. Pricing step includes market-based suggestions. Photo step is highest-friction — AI-assisted organization reduces this. "You can change this later" reassurance on every screen. [Observed — Airbnb]
- **Enterprise implementation wizard**: replaced by mutual action plan (see Pattern 7 below). Wizards are inappropriate for multi-week, multi-stakeholder processes.

**Interaction:** Single selection auto-advances (card selection → next screen, no separate "Next" tap needed) for categorical choices. Text input requires explicit "Continue" tap. Back button returns to previous step with input preserved. [Observed — Duolingo, Canva]

**Mobile:** Cards stack full-width. Input fields auto-focus with keyboard. Progress indicator shrinks to minimal bar. Skip link moves below CTA. Min tap target 48px. [Observed]

### Pattern 2: Product Tour

Spotlight overlay guiding attention to specific UI elements in context.

**Component anatomy:**
1. Spotlight: dim overlay (50–70% opacity) with cutout around target element.
2. Tooltip: positioned near target. Title (3–6 words), body (15–30 words), "Next" button, "Skip tour" link, progress dots.
3. Arrow or connector pointing from tooltip to target element.
4. Step count: "1 of 4" or progress dots at tooltip bottom.

**Layout:** Overlays the product UI. Tooltip auto-positions to avoid viewport edges. [Observed — Figma, Slack Slackbot]

**Copy direction:** Title names the element ("The command menu"). Body explains the value ("Press ⌘K to find anything instantly"). Never explain what something IS — explain what the user can DO with it. [Observed — Linear]

**Constraints:** Max 3–5 stops. More than 5 and completion collapses (Chameleon 2025: tours declining, users "skipping in droves"). Each stop must connect to a user action, not just a feature label. [Observed]

**Config-specific variations:**
- **SaaS self-serve**: contextual, triggered by first visit to a screen. Figma: tour covers canvas tools, layers, properties — load-bearing because the product is complex. Linear: Cmd+K tutorial, single interaction. [Observed]
- **B2C subscription**: rare as a pattern — B2C apps use value delivery instead of tours. Calm uses section-specific tooltips ("Start here", "Check out sleep stories") rather than a sequential tour. [Observed]
- **Fintech/marketplace**: not used — compliance and listing creation flows use wizards instead.

**Interaction:** "Next" advances. "Skip tour" dismisses permanently. Click outside tooltip dismisses current step (resume on next visit only if progress is saved). [Observed]

**Mobile:** Tooltip positions below target element (thumb-reachable). Spotlight fills screen. "Skip" link enlarged for tap target.

### Pattern 3: Checklist

Persistent task list tracking setup progress with direct links to action screens.

**Component anatomy:**
1. Container: sidebar panel, embedded card on dashboard, or expandable floating beacon.
2. Title: "Get started with [Product]" or job-specific variant ("Set up your first campaign").
3. Items: 3–5 max. Each item = checkbox + task name (3–6 words) + optional subtitle. Completed items show checkmark + strikethrough.
4. Progress: bar or fraction ("2 of 4 complete") at top of list.
5. Each item links directly to the relevant screen via deep link. [Observed — Notion, Linear, Shopify]

**Layout:** Shopify uses a dual-UI pattern: checklist on homepage AND as expandable drawer. Each item auto-opens the next incomplete step to focus attention. Single CTA per item with de-emphasized "learn more" link. [Observed — Shopify]

**Copy direction:** Task names are action verbs + objects ("Create a project," "Invite your team," "Connect your data"). Not feature names ("Integrations," "Team management"). Completion copy: "You did it!" or similar celebration. [Observed — Notion, Linear]

**Completion tracking:** Event-driven (user performs specific product action), not self-reported clicks. Shopify marks items complete only when the product event fires. [Observed — Shopify]

**Config-specific variations:**
- **Enterprise (mutual action plan)**: the "checklist" is a project plan with task rows, assigned owners (vendor OR customer), due dates, status indicators, dependencies, and milestone markers. Delivered via portal (Rocketlane, GuideCX), not in-app UI. Persona-based views filter scope per role. [Observed — Rocketlane, GuideCX]
- **Agency (scope-based)**: the checklist maps to SOW deliverables with named approvers, revision caps, and payment milestones. [Observed — Clariva, Teamwork]

**Interaction:** Click item → navigate to relevant screen. On completion → checkmark animation, progress updates. Checklist is dismissible but re-accessible from navigation. Dismissed checklists reappear after 7 days if incomplete. [Observed — Appcues]

### Pattern 4: Contextual Tooltips / Hotspots

Point-of-need hints triggered by first encounter with a feature.

**Component anatomy:**
1. Trigger: pulsing dot or subtle highlight on target element.
2. Tooltip: title (2–4 words), body (10–20 words), optional "Learn more" link.
3. Dismiss: click outside or explicit close button. Don't re-show after dismissal.

**Trigger rules:** Show on first visit to a screen containing the target element, OR when the element becomes relevant (e.g., first time a user has data to filter). Never show on empty states — tooltips on elements with no data are confusing. [Observed — Calm, Figma]

**Copy direction:** Action-oriented, not descriptive. "Drag tasks here to change their status" not "This is the Kanban board." [Observed]

**Constraints:** One tooltip visible at a time. Stack creates pattern interference (Principle 2). [Observed — DNSK.work]

### Pattern 5: Empty State

Content area replacement when no user data exists, converting blankness into direction.

**Component anatomy:**
1. Illustration or icon: centered, communicates the end-state (what it will look like with data).
2. Headline: 4–8 words, benefit-oriented. "Create your first project" not "No projects yet." [Observed — Linear]
3. Body: 15–30 words explaining what they'll get by acting.
4. Primary CTA: "Create [item]" / "Import data" / "Use a template."
5. Secondary action: "Or explore with sample data" / "Start from a template." [Observed — Notion, Figma, Canva, Airtable]

**Config-specific implementations:**
- **Pre-populated sample data** (Linear, Figma): the empty state is never truly empty. Linear pre-populates demo projects with realistic data structure. Figma pre-loads editable example files. Users learn by seeing the ideal state, not reading about it. [Observed]
- **Template gallery** (Canva, Miro, Notion): empty state IS the template selector. Dashboard shows templates organized by segment/use case from first load. [Observed]
- **AI-generated workspace** (Airtable): conversational AI collects context, then generates a functional workspace before the user reaches an empty state. "For the marketing team at [Company], I suggest starting with..." [Observed — Airtable Omni]

### Pattern 6: Welcome Modal

One-time overlay for greeting, expectation-setting, or value-before-signup delivery.

**Component anatomy:**
1. Centered overlay, max 480px wide.
2. Headline: greeting + name if available ("Welcome, Alex") or product value prop.
3. Body: 20–40 words setting expectations ("This takes about 2 minutes" — time-anchoring reduces abandonment).
4. Single primary CTA. No secondary CTA.
5. Auto-dismiss if user navigates away. Don't show on return visits.

**Config-specific implementations:**
- **B2C value-before-signup** (Calm): breathing exercise as the first screen — the modal IS value delivery, disguised as onboarding. Users experience stress relief before any questions. [Observed — Calm]
- **B2C lesson-before-signup** (Duolingo): first lesson happens before account creation. The welcome screen leads to language selection → first lesson → then signup prompt ("Create a profile to save your progress"). Value before commitment. [Observed — Duolingo]

### Pattern 7: Structured Implementation Plan (Enterprise / Agency only)

Multi-week collaborative project plan replacing in-product onboarding patterns.

**Component anatomy:**
1. Portal: white-labeled, magic-link access (no password), embeddable in vendor's product. [Observed — Rocketlane, GuideCX, OnRamp]
2. Mutual action plan: task rows with columns for phase/stage, task name, owner (vendor or customer), due date, status (Not Started / In Progress / Blocked / Complete), dependencies, comments. [Observed]
3. Milestone markers with forecasted end dates that auto-adjust based on completion pace. [Observed — GuideCX]
4. Persona-based views: different stakeholders see different scopes. Portal View (individual contributor tasks only) vs. Full Plan View (all customer tasks). [Observed — GuideCX]
5. Communication hub: threaded comments on tasks, Slack integration, file sharing. [Observed — Rocketlane]
6. Status dashboard: progress visualization, risk indicators, forecasted timeline. [Observed]

**Delivery:** Not in-app UI — delivered via dedicated portal platform or shared project management tool. Accessible via branded magic links sent by email. CRM-triggered: project auto-creates when deal closes. [Observed]

**Agency variant:** SOW serves as the plan. Sections: project overview, deliverables, timeline with milestones, client responsibilities (access, approvals, asset deadlines, response times), success metrics, revision caps, payment terms tied to milestones, scope change clause. [Observed — Clariva]

---

## Step 2 — Select Configuration

Route to exactly one primary configuration. Each configuration has its own stage map, activation milestone, benchmark band, and compliance surface.

### Decision Logic

```
IF B2B SaaS with self-serve signup, ACV < $10K, product-led motion:
  → Config A: B2B SaaS Self-Serve
ELIF B2B SaaS with sales-led motion, ACV > $5K, implementation required:
  → Config B: B2B SaaS Sales-Led
ELIF B2C recurring subscription (digital content, boxes, memberships):
  → Config C: B2C Subscription
ELIF B2C physical/digital product with cart-based purchase:
  → Config D: B2C Ecommerce (Post-Purchase)
ELIF two-sided marketplace or platform connecting supply and demand:
  → Config E: Marketplace / Platform
ELIF agency, consultancy, or professional services selling time/expertise:
  → Config F: Agency / Professional Services
ELIF fintech, insurance, healthcare, or other regulated industry with compliance gates:
  → Config G: Fintech / Regulated
IF the business spans two configurations (e.g., regulated marketplace):
  → Select the PRIMARY config (the one that determines the core onboarding challenge)
  → Apply the secondary config's compliance/stage requirements as constraints on top
THEN select one touch-model overlay (Step 2b)
```

### Configuration Reference

#### Config A: B2B SaaS Self-Serve

Typical ACV: $0–$10K. Product-led growth. User is often the buyer. Speed is everything.

Stage map: `Signup → Welcome/Segmentation → Setup → First Value Action → Aha Moment → Habit Loop → Expansion Prompt`

Activation target: User completes the core product action within first session (ideally <12 minutes). Top quartile TTFV is under 5 minutes for self-serve products (ProductGrowth).

Key constraints: No human intervention at scale. Product must do the teaching. Every second of friction costs users — 40–60% of SaaS users never return after first session (Reloadux).

Median activation rate: 37.5% (AdoptKit 2026). Top quartile: 65–75% (1Capture 2025). Every 10% improvement in activation yields ~7.3% improvement in paid conversion.

#### Config B: B2B SaaS Sales-Led

Typical ACV: $10K–$500K+. Multi-stakeholder buying. Implementation required before value.

Stage map: `Sales Handoff → Kickoff → Technical Setup / Data Migration → Configuration → Training → Go-Live → Value Realization → Expansion`

Activation target: First measurable business outcome within 30–90 days. But intermediate milestones must deliver visible progress within 72 hours (Principle 6).

Key constraints: Multiple stakeholders with different needs (champion, end users, IT, executive sponsor). The sales-to-CS handoff is a known leak point — 62% of CS leaders lack real-time visibility into customer progress (OnRamp 2026). Human onboarding touchpoints yield up to 30% better 90-day retention vs. purely automated flows (KnowledgeLib 2026).

Enterprise-assisted completion rate: 50–90% strong (OnboardingHub).

#### Config C: B2C Subscription

Typical price: $5–$100/month. Recurring billing. Churn is the primary enemy.

Stage map: `Signup → First Value Experience → Payment Confirmation → Day 1 Engagement → Week 1 Habit Formation → Month 1 Renewal Reinforcement`

Activation target: User experiences the core value proposition in their first session. For content subscriptions: first content consumed. For subscription boxes: first unboxing + social moment. For wellness apps: first session completed.

Key constraints: First-month churn is brutal — 12–30% depending on vertical (Finsi.ai 2026). Users who don't engage within 72 hours have 90% churn probability. Involuntary churn (failed payments) represents 20–40% of total churn.

#### Config D: B2C Ecommerce (Post-Purchase)

Typical AOV: $20–$500. Onboarding IS the post-purchase experience leading to repeat purchase and loyalty.

Stage map: `Order Confirmation → Shipping/Delivery Updates → Unboxing/First Use → Review Request → Repeat Purchase Prompt → Loyalty Program`

Activation target: Second purchase. The first purchase was acquired through the funnel; onboarding converts a one-time buyer into a repeat customer.

Key constraints: Onboarding happens mostly through email and packaging, not in-product. Trust reinforcement after payment is critical — buyer's remorse peaks in the first 24–48 hours. Abandoned cart recovery flows see 50.5% open rate and 3.33% conversion (Klaviyo 2024).

#### Config E: Marketplace / Platform

Typical structure: Two-sided. Supply (sellers/providers) and demand (buyers/users) require separate onboarding paths.

Stage map (supply side): `Vendor Signup → Profile/Listing Creation → First Listing Live → First Transaction → Optimization / Expansion`

Stage map (demand side): `Buyer Signup → First Search/Browse → First Purchase/Booking → Review/Rate → Repeat`

Activation target: Supply — first listing live (or first transaction). Demand — first completed transaction. Platform — liquidity (search-to-fill ratio).

Key constraints: 68% new vendor abandonment rate (Appscrip). Manual vendor onboarding costs ~$35K per vendor vs. $2.4K automated. 67% of marketplaces fail to achieve critical mass within 18 months. Must activate supply before demand or vice versa — the chicken-and-egg problem is the central onboarding challenge.

#### Config F: Agency / Professional Services

Typical engagement: $1K–$50K+/month. Relationship-driven. Scope management is everything.

Stage map: `Sales Handoff → Client Discovery / Scope Agreement → Account Setup → Kickoff Meeting → First Deliverable → Feedback Loop → Ongoing Cadence → Quarterly Review`

Activation target: First deliverable approved by client. This is when the client experiences tangible value and the relationship shifts from "hopeful" to "productive."

Key constraints: 47% of agency clients leave within 90 days due to chaotic onboarding (AgencySimplifier — Uncertain, single source). Structured onboarding increases client retention by 32%. The handoff from sales to delivery is where scope misalignment happens. Client expectations formed during sales must be explicitly transferred and validated.

#### Config G: Fintech / Regulated

Typical structure: Regulated industry with mandatory compliance gates before value delivery. Includes fintech, insurance, healthcare, and government-adjacent services.

Stage map: `Signup → Identity Verification (KYC/AML) → Account Approval → Account Setup → First Transaction → Engagement → Compliance Monitoring`

Activation target: First completed transaction (payment, trade, claim, or consultation).

Key constraints: KYC/AML adds 3–7 days to onboarding in financial services. Compliance gates cannot be removed or deferred — they are legal requirements. The challenge is making mandatory friction feel purposeful rather than punitive. FinTech tools see only 5% activation rate (Tandem JTBD benchmarks) — the lowest of any category, largely because compliance gates create early abandonment.

---

### Step 2b — Select Touch-Model Overlay

After choosing a primary business-model configuration, select one touch-model overlay based on ACV, customer segment, and product complexity. Overlays modify HOW onboarding is delivered without changing WHAT the stages are. Select exactly one.

#### Touch-Model Decision Logic

```
IF ACV < $1K AND product is simple (1–2 core actions):
  → Product-Led (Self-Serve)
ELIF ACV < $5K AND moderate complexity:
  → Low-Touch Automated
ELIF ACV $5K–$25K AND 3+ stakeholders:
  → Hybrid
ELIF ACV $25K–$100K AND complex implementation:
  → High-Touch (White-Glove)
ELIF ACV > $100K AND data migration / deep integration required:
  → Concierge (Done-For-You)
ELIF product value increases with peer interaction AND community exists:
  → Community-Led / Cohort-Based
ELIF onboarding is delivered by third-party partners or integrators:
  → Partner-Led
```

#### Overlay 1: Product-Led (Self-Serve)

Product is the primary onboarding vehicle. No human intervention. In-app guidance, empty states, contextual help, and behavioral email triggers do all the work.

**Stage map modification:** All stages are in-product or automated email. No calls, no CSMs.

**Non-negotiable events:**
1. `signup_completed` — account created
2. `onboarding_step_N_completed` — each discrete onboarding step (for step-level drop-off)
3. `activation_event` — defined core value action completed
4. `onboarding_completed` — all required steps finished
5. `first_session_duration` — time from signup to first session end

**Key metrics:** Activation rate (median 37.5%, top quartile 65–75%), TTFV (target <12 min), D7 return rate, step-level drop-off rates.

**Delivery mechanics:** In-app patterns (see Principle 2 for pattern selection), behavioral email sequences (4–5 emails in week 1; behavioral triggers > time-based; 300%+ higher open rates for triggered emails — AdoptKit).

#### Overlay 2: Low-Touch Automated

Email sequences + in-app prompts with minimal human intervention. Behavioral triggers drive the cadence. A human escalation path exists but is reactive, not proactive.

**Stage map modification:** Add `Behavioral Email Sequence` as a parallel track alongside in-product stages. Add `Escalation Trigger` for users who stall (no activation within 72 hours → flag for manual outreach).

**Non-negotiable events:** All Product-Led events plus:
6. `onboarding_email_N_sent` / `opened` / `clicked` — per email in sequence
7. `escalation_triggered` — user flagged for human intervention
8. `human_touchpoint_completed` — if escalation led to a call or chat

**Key metrics:** Email engagement (onboarding emails average 54.78% open rate — Mailsoftly), trial-to-paid (median 18.5%, top quartile 35–45% — 1Capture 2025), escalation rate (lower is better — means automation is working).

**Delivery mechanics:** Core onboarding email sequence: 10 emails over 2 weeks (AdoptKit). Structure: welcome → quick win → feature highlight → social proof → milestone check → re-engagement → offer. Milestone-based sequences dramatically outperform time-based (Rob Palmer).

#### Overlay 3: Hybrid

Automated flows for routine steps + human checkpoints at critical moments. Scales human time to high-leverage interactions (kickoff, first value review, expansion conversation).

**Stage map modification:** Insert `Human Checkpoint` at 2–3 defined moments: post-signup (kickoff call or welcome video), post-activation (success review), pre-renewal (expansion conversation). All other stages remain automated.

**Non-negotiable events:** All Low-Touch events plus:
9. `kickoff_call_completed` — first human touchpoint
10. `success_review_completed` — post-activation check-in
11. `expansion_conversation_completed` — upsell/cross-sell discussion

**Key metrics:** Blended cost per onboarding (human + automated), completion rate by segment, escalation rate, time-to-live.

#### Overlay 4: High-Touch (White-Glove)

Dedicated CSM or implementation manager. Structured implementation plan with mutual action items. Regular check-in calls. Appropriate for complex products where the customer cannot self-serve to value.

**Stage map modification:** Every stage has a named human owner. Add `Mutual Action Plan` (shared document with milestones, owners, and dates). Add `Stakeholder Map` (identify champion, executive sponsor, end users, IT contact).

**Non-negotiable events:** All Hybrid events plus:
12. `mutual_action_plan_created` — MAP document shared with customer
13. `stakeholder_N_engaged` — each key stakeholder has participated in onboarding
14. `milestone_N_completed` — MAP milestone achieved (with timestamp for time-to-milestone tracking)
15. `go_live_completed` — production usage begins

**Key metrics:** Time-to-live (from contract signing to production use), implementation NPS, stakeholder engagement score, MAP milestone completion rate. Enterprise-assisted onboarding: 50–90% completion when strong (OnboardingHub).

#### Overlay 5: Concierge (Done-For-You)

Team does setup for the customer. 1:1 handholding. Used when the product requires complex configuration, data migration, or integration work that the customer cannot do alone.

**Stage map modification:** Replace customer-driven setup stages with `Done-For-You Setup` stages. Customer's job shifts from "do the work" to "provide access and approve results." Add `Customer Approval Gate` after each done-for-you stage.

**Key metrics:** Go-live time, customer effort score (CES), expansion rate post-onboarding. The economics must support this: concierge onboarding cost per customer must be recoverable within the first contract period.

#### Overlay 6: Community-Led / Cohort-Based

Group onboarding in cohorts. Peer learning, shared milestones, mentorship from experienced users. Creates social accountability and network effects that individual onboarding cannot.

**Stage map modification:** Replace individual onboarding stages with `Cohort Kickoff → Group Session 1 → ... → Group Session N → Graduation`. Add peer interaction milestones. Add `Mentor Assignment` if applicable.

**Non-negotiable events:**
16. `cohort_joined` — user assigned to cohort
17. `group_session_attended` — per session attendance
18. `peer_interaction_completed` — user engaged with another cohort member
19. `cohort_graduated` — completed cohort program

**Key metrics:** Cohort completion rate, peer engagement (messages/connections per member), NPS at graduation, activation rate vs. non-cohort users. Community-led onboarding is highest-leverage for products with network effects.

#### Overlay 7: Partner-Led

Third-party integrators, consultants, or agencies run onboarding on behalf of the vendor. Common in platform ecosystems and complex enterprise deployments.

**Stage map modification:** Add `Partner Assignment` stage. Replace vendor-owned implementation stages with `Partner-Delivered` stages. Add `Vendor QA Review` after partner-delivered stages to ensure quality.

**Key metrics:** Partner satisfaction score, go-live rate by partner, time-to-live by partner (to identify underperforming partners), expansion rate post-partner-onboarding.

---

## Step 3 — Build Stage-by-Stage Spec

For the selected configuration, build each stage using this template:

### Per-Stage Spec Template

```
Stage: [name]
Value contribution: [what barrier to first value this stage removes — Principle 1]
Pattern: [the single onboarding pattern used at this stage — Principle 2]
Data collected: [what data, and whether it's needed before value — Principle 3]
Activation contribution: [how this stage moves user toward the activation event — Principle 4]
Entry criteria: [what qualifies someone to enter this stage]
Exit criteria: [what must happen for them to advance]
Primary metric: [the one number that defines this stage's health]
Benchmark band: [low / median / good / top-quartile range]
Key events to fire: [list of analytics events]
Top 3 tactics: [ranked by impact, with risk classification]
Top 3 leak points: [where drop-off happens and why]
Diagnostic questions: [what to check if metric is below band]
TTFV contribution: [how many minutes/hours this stage adds to time-to-value]
```

### Stage-by-Stage Screen Build Specs

These are screen-level specifications, not strategy advice. Each screen spec tells an agent what components to place, what copy to write, how to lay it out, and how it varies by config. Grounded in observed implementations across 30+ products.

#### Screen 1: Signup / Account Creation (all configs)

**Pattern:** Setup Wizard (single step) or standalone form.

**Required elements:**
1. SSO buttons: Google, Apple, Microsoft — order by audience. SaaS: Google first. Consumer: Apple first. [Observed — all 18 SaaS/B2C teardowns]
2. OR email/password fields (secondary to SSO).
3. CTA button: "Create free account" or "Sign up free" — not "Submit." Action-outcome language. [Observed — Slack, Canva, Figma, Miro]
4. Social proof line: "[N]+ teams" or "[N]M users" — positioned below CTA. [Observed — Slack, Canva]
5. Legal line: ToS + Privacy links, gray 12px, below everything. [Observed]
6. Login link for returning users: "Already have an account? Log in." [Observed]

**Layout:** Single-column centered, max 400px wide. Logo top-center. No sidebar, no navigation. White or brand-colored background.

**Copy:** Headline optional; when present, it's value prop compression: "Made for people. Built for productivity." (Slack) or "Sign up for free" (Figma). 4–8 words max.

**Config-specific variations:**
- **B2C subscription** (Duolingo, Calm): signup may be DELAYED — value delivered first (Duolingo: first lesson before account creation; Calm: breathing exercise before signup). The "signup screen" appears after first value, framed as "Create a profile to save your progress." [Observed]
- **Fintech** (Revolut, Robinhood): email + phone verification as mandatory step. No SSO — owned accounts for billing/compliance control. [Observed]
- **Marketplace** (Etsy): separate entry point from buyer signup ("Sell on Etsy" landing page). [Observed]
- **Enterprise**: no self-serve signup screen. Account provisioned by admin or created via CRM deal-close trigger. [Observed]

**Leak fixes:**
- Low signup completion → too many fields. Reduce to SSO-only or email + password only. [Observed — all teardowns show max 2 fields]
- Mobile drop-off → one-tap SSO as primary method. Stack SSO buttons vertically on mobile. [Observed]

**Events:** `signup_started`, `signup_completed`, `signup_method` (SSO provider or email).

#### Screen 2: Welcome / Segmentation (Configs A, C, E)

**Pattern:** Setup Wizard (1–3 steps of segmentation questions).

**Required elements:**
1. Question headline: "What will you be using [Product] for?" or "What brings you to [Product]?" — always a question, never a statement. [Observed — Canva, Miro, Calm, Peloton]
2. Large selectable cards: one per job/segment. Each card = icon or illustration + title (3–5 words) + subtitle (8–15 words describing the outcome). Max 6 cards; 3 is ideal. [Observed — Notion: 3 cards; Canva: 6–8 cards; Webflow: 6 cards]
3. Progress indicator at top (bar or step count). Shopify pattern: show bar without step count to avoid perceived-length abandonment. [Observed — Shopify]
4. "Skip" link: bottom-right, de-emphasized. Present but not prominent. Shopify adds "I'm not sure" as a valid answer choice — reduces skip pressure. [Observed — Shopify]

**Layout:** Single-column centered, max 600px wide. Cards stack vertically or 2-column grid. Full-width on mobile with generous tap targets (min 48px height).

**Copy:** Card titles are jobs-to-be-done ("Send newsletters," "Build a website," "Track my health"), not product features ("Email marketing," "Website builder," "Health tracking"). Card subtitles describe outcomes ("Reach your audience with beautiful emails"). [Observed — Canva, Shopify, Miro]

**Config-specific variations:**
- **B2C subscription** (Duolingo, Noom, Headspace): deeper personalization — 3–10 questions including goals, experience level, motivation, daily commitment, routine timing. One question per screen with large buttons. B2C asks "why" questions (motivation); SaaS asks "what" questions (use case). [Observed]
- **B2C subscription** (Noom): extreme variant — 77-step questionnaire mixing assessment, education, and personalization. Educational content embedded IN the quiz delivers value during data collection. [Observed]
- **Marketplace seller** (Shopify): survey answers directly shape the onboarding checklist. "Interested in dropshipping?" → first checklist item becomes "Find dropshipping products to sell." [Observed — Shopify]
- **Enterprise/Agency**: no self-serve segmentation screen. Segmentation happens via sales-to-CS handoff (deal type, stakeholder map, scope). [Observed]

**Interaction:** Selecting a card auto-advances to next screen (no separate "Next" button). Selection confirmed visually (border highlight, checkmark). Multi-select allowed for preference screens ("What brings you to Calm?" — select multiple goals). Headspace: switching goals from single-select to multi-select increased trial conversion 10%. [Observed — Headspace]

**Events:** `segmentation_completed` with `segment_id`, `segmentation_skipped`.

#### Screen 3: Setup / Configuration (Configs A, B, E, G)

**Pattern:** Setup Wizard (1–3 steps) or Checklist.

**Required elements:**
1. Step title referencing the user's job from segmentation: "Set up your first [segment-specific noun]." [Observed — Shopify]
2. Minimal input fields (max 3 per step). Use workspace/project naming as the first setup input — creates psychological ownership. [Observed — Notion, Slack, Linear]
3. Pre-populated template or sample data based on segmentation. Never show a blank canvas. [Observed — Notion, Canva, Linear, Airtable]
4. Primary CTA: "Continue" or action-specific ("Create workspace").
5. "Skip, I'll do this later" link for non-essential steps. [Observed — Linear, Shopify]
6. Real-time preview: Slack shows channel name appearing in sidebar as user types. Airtable shows AI-generated workspace building live. [Observed]

**Layout:** Single-column for form steps. Two-column on desktop for template selection (options left, preview right). Single column on mobile.

**Copy:** Field labels are conversational questions ("What's your team working on?") not form labels ("Team Name"). Import options are framed as choices ("Import from Jira," "Import from GitHub," "I'll do this later") — never mandatory. [Observed — Linear, Slack]

**Config-specific variations:**
- **SaaS self-serve** (Airtable): AI-powered conversational setup replaces traditional forms. Omni AI collects firmographic data one question at a time via chat interface, then generates a complete, functional workspace. "For the marketing team at [Company], I suggest starting with..." [Observed — Airtable]
- **Fintech KYC** (Stripe, Revolut, Plaid): setup = identity verification. Document upload via camera capture (not file picker). Per-document micro-flow: capture → review → confirm. Compliance copy: "Required by regulation to protect your account." Dynamic form rendering adapts to country and business type. [Observed — Stripe, Revolut, Uber, Plaid]
- **Marketplace seller** (Airbnb, Etsy): setup = listing creation wizard. 10-screen progressive disclosure (Airbnb). Photo upload is highest-friction step — AI-assisted organization helps. Pricing includes market-based suggestions. "You can change this later" on every screen. [Observed — Airbnb]
- **Enterprise** (Rocketlane, GuideCX): setup = mutual action plan creation. CRM-triggered: project auto-creates from deal-close event. Handoff package transfers deal details, success criteria, stakeholder map, scope, timeline. Kickoff meeting scheduled within 48h–14 days. [Observed]
- **Agency**: setup = client intake form. Multi-step with conditional logic. Fields: company, contacts, budget range (ranges, not open field), goals, timeline, stakeholders, technical constraints, brand assets. Thank-you page with next-step expectations. [Observed — Clariva, Paperform]

**Events:** `setup_started`, `setup_step_N_completed`, `setup_completed`, `setup_skipped` (with list of skipped steps).

#### Screen 4: First Value / Activation (all configs)

**Pattern:** Varies by config — this is where config divergence is strongest.

**Config A (SaaS self-serve):**
- Pattern: Empty State + Contextual Tooltip (one pattern only).
- The product screen with pre-populated sample data or template-generated content. One dominant CTA for the activation action.
- Guided action prompt as a contextual tooltip on the target element: "Drag a task to Done to see how it works" (Linear), "Start Recording" (Loom — single CTA, zero competing actions). [Observed]
- Celebration on completion — calibrated by context (see Celebration Procedure below).
- Next-step CTA: "Invite your team" or "Explore templates."

**Celebration Procedure (all configs):**

Celebration animations (confetti, success checkmark, character reaction) amplify the peak-trust moment after activation — but only when the celebration marks the user's milestone, not the company's. Apply this procedure before adding any celebration.

**Step 1 — The Ramsey Test (fill-in-the-blank):**
1. "This celebration is marking ___." (Name the event.)
2. "The user's actual goal was ___." (Name what they came here to accomplish.)
3. Are these the same? If yes → celebration is appropriate. If no → remove it or reposition to the actual goal.

**Step 2 — Select celebration tier:**

| Tier | When | Implementation | Duration |
|---|---|---|---|
| **Micro** | Subtask completion (checklist item, field saved) | Checkmark draw animation (SVG stroke-dasharray) + subtle color pulse | 300ms |
| **Standard** | First core action, onboarding complete | Success icon (scale 0→1 with overshoot easing) + "You did it!" headline + next-step CTA | 2–3s, auto-dismiss |
| **Major** | Milestone after significant effort (deployment, first sale, course completion) | Confetti burst + success message + concrete next action + optional sound | 2–3s confetti, page persists |

**Step 3 — Calibrate by config:**

| Config | Celebration approach | Rationale |
|---|---|---|
| **A (SaaS self-serve)** | Standard or Major tier. Confetti + success message with next-step CTA. Vercel: "Congratulations! Your project is now live" with live URL. [Observed] | The user completed a meaningful goal (first project deployed, first board created). The loop is closed. |
| **B (Enterprise)** | No in-app confetti. Milestone email from CSM with metrics: "Your team completed Week 1 setup — here's what we accomplished." | Enterprise users don't expect gamification. Value is communicated through business outcomes, not animation. |
| **C (B2C subscription)** | Major tier with product-specific celebration. Duolingo: character animation + XP + streak update. Calm: serene completion screen. Match the product's emotional register. [Observed] | B2C earns the right to celebrate loudly when the product tone is playful and every celebration marks genuine user progress. |
| **E (Marketplace)** | Standard tier for supply side: "Your listing is live!" with link to live listing. Subtle for demand side (first purchase confirmation). [Observed — Etsy, Airbnb] | Sellers completing their first listing invested significant effort. Buyers made a simpler commitment. |
| **F (Agency)** | No in-app animation. Kickoff confirmation email with documented agreements and next-milestone timeline. | Professional services context. Celebration is implicit in delivery quality. |
| **G (Fintech)** | Clean confirmation with security reassurance: checkmark + "Your transfer is complete" + transaction details. No confetti, no playful animation. [Observed — Revolut, Stripe] | "Nobody wants their bank to behave like Duolingo" (Peter Ramsey). Trust and reassurance > delight. |

**Accessibility:** Always respect `prefers-reduced-motion`. Replace confetti/animation with static success state (checkmark icon + confirmation text). Never suppress the feedback — the user still needs to know their action succeeded.

**Config B (Enterprise):**
- Pattern: Structured Implementation Plan (Pattern 7).
- Activation = kickoff meeting completed + first milestone achieved. Not a product screen — a collaborative milestone.
- Day 1 sample dashboard with demo data gives champion something tangible to screenshot. [Principle 6]
- Week 1 sandbox pipeline validates technical fit.

**Config C (B2C subscription):**
- Pattern: direct content delivery.
- First session = first value moment. Duolingo: interactive language lesson with gamification (XP, progress bar, sound effects). Calm: guided meditation with timer. Peloton: personalized workout recommendations based on interest selection. [Observed]
- Personalized plan reveal: Noom shows projected weight loss timeline with specific dates. Headspace shows "Here's your plan" summary. Spotify generates "Made for [Name]" playlists. [Observed]
- Paywall timing varies: Duolingo post-value (freemium), Headspace post-goals-pre-value (aggressive), Netflix pre-everything (subscription required). [Observed]

**Config E (Marketplace):**
- Supply side: first listing published. Etsy requires at least one listing to open shop (mandatory gate). Airbnb listing goes live after 10-screen wizard. [Observed]
- Demand side: first search or browse with results. [Observed]
- Activation = first transaction (both sides meet).

**Config F (Agency):**
- Activation = SOW signed + kickoff meeting completed.
- Kickoff agenda: introductions, SOW review, communication cadence, escalation procedures, first milestone timeline, Q&A. Output: documented agreements in shared space. [Observed — Clariva]
- First deliverable approval is the true value moment.

**Config G (Fintech):**
- Activation = first completed transaction after identity verification.
- Verification waiting state: "We're reviewing your documents. This usually takes 1–2 business days. We'll email you when approved." Status labels: initiated → pending → verified or rejected. Multi-channel prompts (email + push + in-app banner). [Observed — Revolut, EnKash]
- Interim value during verification: Mercury issues a virtual card immediately upon approval — don't wait for physical card. Revolut offers limited features before full verification. Robinhood progressively unlocks options trading levels based on activity + verification. [Observed]
- Rejection flow: specific error + re-upload guidance + support path. "We weren't able to verify your identity with the documents provided. Please re-upload a clearer photo. Contact support@[product].com if you continue to have trouble." [Observed — Stripe, Incode]

**Events:** `activation_event` (the defined core action), `first_value_moment`, `celebration_shown`.

#### Screen 5: Habit Formation (post-activation, all configs)

**Pattern:** Behavioral Email Sequence (see Email Sequence Build Spec below) + Contextual Tooltips for Power feature discovery.

**In-product elements:**
1. Feature discovery tooltips: triggered by usage maturity signals, not calendar. After user has completed activation action N times, surface next-level feature. One tooltip at a time. [Principle 2, Principle 5]
2. Usage summary: periodic in-app or email report showing value received. "You've completed 5 projects this week" or "Your team sent 1,247 messages." [Observed — Slack weekly digest]
3. Streak/habit mechanics (B2C only): visible from Day 1 — streak counter, daily goal with progress ring, loss aversion kicks in within 3–5 days. [Observed — Duolingo, Headspace, Calm]

**Config-specific:**
- **SaaS**: team invitation prompt surfaces here if skipped during setup. "You've created 3 projects — invite your team to collaborate on them." Context-specific is stronger than generic "Complete your profile." [Observed — Slack: 3 of 7 onboarding emails target team invite]
- **Enterprise**: CSM-driven check-ins replace automated nudges. Weekly working sessions, monthly executive reviews. Status dashboard shows progress against go-live timeline.
- **B2C**: push notification sequences complement email. Push handles daily micro-nudges (reminders, streak protection); email handles value communication (progress summaries, feature introduction). [Observed — Duolingo, Headspace]

#### Screen 6: Expansion (post-habit, all configs)

**In-product elements:**
1. Plan upgrade prompt tied to natural usage limit events (storage full, seat count hit, feature attempted). Not artificial gates. [Observed]
2. Team/seat expansion prompts when collaboration signals appear. [Observed]
3. Feature adoption campaigns for Power features user hasn't discovered. [Observed]

**Copy:** CTA uses non-transactional language. "Get Started" outperforms "Start trial" (Peloton A/B test, measured conversion improvement). "Unlock [feature]" outperforms "Upgrade now." [Observed — Peloton]

---

## Flow State Machine

Every onboarding flow has edge states: users abandon, return, skip steps, hit errors, upgrade tiers, or churn and come back. An agent building onboarding must handle these states, not just the happy path. Each state below includes the screen/UI change, copy direction, system behavior, and event to fire.

### Abandonment + Return

**State:** User closes browser mid-onboarding (e.g., wizard step 3 of 5).

**System behavior:** Persist progress server-side (or hybrid local+server). Store `user_id`, `current_step`, `completed_steps`, `form_data` as JSON. [Observed — OnboardJS/Supabase pattern]

**On return (within 72 hours):**
- Show resume prompt: "Welcome back — pick up where you left off" with primary CTA to resume and secondary "Start over" link. [Observed — Retention.blog Level 1 pattern]
- Navigate directly to the step where user left off. Don't restart from the beginning. [Observed]
- Pre-fill any data already entered. [Observed]

**On return (after 72 hours):**
- If not activated: trigger re-engagement email (see Email Sequence, email #5).
- On next app visit: show a simplified resume prompt. For B2C, consider Level 2 (feature highlights) or Level 3 (re-onboarding) based on product changes since last visit. [Observed — Duolingo 6-step reactivation, Fabulous "Your story isn't finished..."]

**Config-specific variations:**
- **Fintech KYC**: document verification may expire. If user returns after verification timeout, require re-upload of expired documents. Show: "Your documents have expired. Please re-upload for verification." [Observed — Revolut deadlines]
- **Enterprise**: CSM follows up personally (email, then call). Automated resume prompts are insufficient for high-ACV accounts. [Observed]
- **B2C subscription**: returning users may see win-back offer. "Welcome back! Take another 7 days on us." [Observed — Rob Palmer framework]

**Events:** `onboarding_resumed` (with `steps_completed` and `days_since_abandon`), `onboarding_restarted`.

### Skip Logic

**Which steps are skippable:**

| Step type | Typically mandatory | Typically skippable | Rationale |
|---|---|---|---|
| Email/auth verification | Yes | — | Account security |
| Core activation action | Yes (can defer) | — | Defines value |
| Profile completion (name, photo) | — | Yes | Not blocking value |
| Team invitation | — | Yes | Deferrable |
| Integration/data connection | Depends on product | Yes (with sample data fallback) | Some products need data to show value |
| Notification preferences | — | Yes | Use defaults |
| KYC/compliance steps | Yes (fintech) | — | Legal requirement |
| Scope agreement (agency) | Yes | — | Defines the engagement |

**When a step is skipped, three downstream patterns:**

1. **Deferred nudge** (most common): "Complete your profile" persistent UI element. Surface in context: "You've created 3 projects — invite your team to collaborate on them" is stronger than generic "Complete your profile." [Observed — LogRocket]
2. **Degraded experience**: skipping segmentation → generic (less personalized) product experience. Skipping integration → empty dashboards. Personalization lift from completing setup: 35% improvement in 7-day retention. [Observed]
3. **Blocker later**: skipping KYC → restricted functionality until verified (fintech). Skipping payment → trial expiration blocks access. Skipping team invite → collaboration features locked. [Observed]

**Events:** `step_skipped` (with `step_name`), `deferred_nudge_shown`, `deferred_step_completed`.

### Error States

**Principle:** Errors are first-class scenarios, not edge cases. Products that treat errors as afterthoughts lose users at maximum frustration. [Observed — Figr.design]

**Error copy framework:**

| Error type | Pattern | Example |
|---|---|---|
| Validation error | [Specific field] + [what's wrong] + [how to fix] | "Password must be at least 8 characters and include a number" |
| Integration failure | [What happened] + [why] + [what to do] + [fallback] | "We couldn't connect to Salesforce. This usually means API access isn't enabled. Ask your admin, or try a different CRM." |
| Document rejection (fintech) | [Status] + [reason] + [next steps] + [support path] | "We weren't able to verify your identity. Please re-upload a clearer photo of your government-issued ID." |
| Processing/waiting | [Status] + [estimated time] + [what happens next] + [interim value] | "We're reviewing your application. Usually 1–2 business days. We'll email you when approved. While you wait, explore our resource library." |

**Config-specific:**
- **Fintech**: KYC status state machine has 7 states: Not Uploaded → Pending (Created) → Pending (Under Review) → Verified → Failed → Redo → Min KYC Verified. Always evaluate Status + Substatus together. Support async updates via webhooks. [Observed — EnKash]
- **Marketplace**: listing policy violations need specific guidance ("Your listing was flagged because [specific reason]. Update [specific field] to comply."). [Observed — Etsy dormant/suspicious flags]

**Events:** `error_shown` (with `error_type`, `step`, `error_code`), `error_resolved`, `support_contacted`.

### Completion + Transition

**How onboarding UI dismisses:**

1. **Action-based auto-dismiss** (recommended): onboarding patterns disappear when user completes activation event. No explicit "completion" screen — user naturally transitions to the product. Avoids "onboarding completion ≠ activation" problem. [Observed — Figma, Notion]
2. **Checklist completion**: congratulations screen with customizable message. Can trigger follow-up experiences. Risk: users optimize for checkmarks rather than actual value. [Observed — Appcues]
3. **Manual dismiss**: user explicitly closes. Reappears after 7 days if incomplete. [Observed — Appcues]

**What replaces onboarding prompts:**

| Post-onboarding state | UI treatment | Timing |
|---|---|---|
| Feature discovery | Contextual tooltips for Power features, triggered by usage maturity | Days 7–30 |
| Usage summaries | Periodic email/in-app reports on value received | Weekly |
| Expansion prompts | "Unlock [feature]" when user hits free-tier limits naturally | When triggered |
| Community/education | Documentation links, community invites | After activation |

**Post-onboarding email cadence taper:** 4–5 emails/week in week 1 → 1–2/week by week 4 → weekly/biweekly in steady state. Transition should be seamless — users shouldn't notice a shift. [Inferred]

### Re-Onboarding

**Tier upgrade:** show feature announcement via in-app modal + 3–5 step interactive guide for new capabilities. Segmented delivery: only show to users who would benefit. [Observed — UserGuiding, Userflow]

**Churned user return:** different from new user onboarding. Returning users have prior product knowledge and specific churn reasons. Show "What's new since you left" checklist. Offer "Start over" option if previous data is stale. Three consecutive visits is the re-retention threshold. [Observed — LogRocket, Retention.blog]

**Events:** `re_onboarding_started` (with `return_type`: upgrade / churn_return / feature_release), `re_onboarding_completed`.

---

## Email Sequence Build Spec

Onboarding email sequences are not generic — they differ fundamentally by config. Build the sequence for your configuration using these per-email specs.

### SaaS Self-Serve Sequence (Config A) — 7 emails, 14 days

| # | Trigger | Timing | Subject line template | Body structure | CTA | Suppression |
|---|---|---|---|---|---|---|
| 1 | `signup_completed` | Immediate | "Your [Product] account is ready" | Greeting → confirmation → single next action with time estimate ("Takes about 2 minutes") → deep link → "Reply to this email — I'm a real person" | "[Create Your First [Item] →]" → first onboarding screen | None |
| 2 | `24h post-signup AND NOT activated` | +24h | "Quick tip: [specific action] takes 2 minutes" | Name the easiest valuable action → social proof ("Most new users start here") → screenshot → deep link | "[Do the action →]" → specific screen | Suppress if activated |
| 3 | `48h AND team_invite_not_sent` | +48h | "Invite your team?" | Explain collaboration value → single invite link | "[Send invite link →]" | Suppress if invite sent |
| 4 | `setup_completed AND NOT activated` | On trigger | "You're almost there — [1 step] left" | Show progress ("3 of 4 done") → name remaining step → deep link | "[Finish setup →]" → remaining step | Suppress if activated |
| 5 | `72h AND NOT engaged` | +72h | "Need a hand getting started?" | Offer help: doc link, video walkthrough, reply-to-email support | "[Get help →]" or "[Book a call →]" | Suppress if activated |
| 6 | `activation_completed` | On trigger | "[Name], you created something" | Celebrate → introduce one Power feature → deep link | "[Try [feature] →]" | None |
| 7 | `Day 7` | +7d | "How's your first week going?" | Check-in → ask for feedback → link to community or docs | "[Reply to this email]" or "[Join community →]" | None |

**Copy rules:** 40–80 words body. Single CTA per email. Subject lines 28–50 characters (mobile-optimized). Text-forward with one button CTA. Sender: named individual with photo, not brand. Preview text extends subject, doesn't repeat it. [Observed — Slack, Sequenzy, Rob Palmer]

**Suppression architecture:** behavioral triggers override time-based sends. If user completed the target action → skip the nudge email for that action. If user is "very active" → fast-track to expansion, skip beginner emails. [Observed — Customer.io case studies]

### Enterprise Sequence (Config B) — 5 emails, multi-stakeholder

| # | Trigger | Recipient | Subject line template | Body structure | CTA |
|---|---|---|---|---|---|
| 1 | `deal_closed` | Champion | "Welcome to [Product] + your CSM intro" | CSM name, photo, contact info → timeline expectations (Week 1: kickoff, Week 2–3: rollout, Ongoing: QBRs) → booking link | "[Schedule kickoff →]" |
| 2 | `kickoff_scheduled` | Champion + users | "Before our call: quick prep" | Pre-call checklist (access credentials, stakeholder list, goals doc) → what to expect in kickoff | "[Review prep checklist →]" |
| 3 | `kickoff_completed` | All stakeholders | "Your onboarding roadmap" | Recap of kickoff decisions → mutual action plan link → next 3 milestones with dates | "[View your plan →]" → MAP portal |
| 4 | `milestone_completed` | Champion + sponsor | "Milestone complete: [name]" | Progress update → what's next → timeline impact | "[View progress →]" |
| 5 | `Day 14 post-kickoff` | Champion | "How's the rollout going?" | Check-in → ask about blockers → link to support resources | "[Reply to this email]" |

**Copy rules:** sender is named CSM with direct phone/email. Executive sponsor emails are strategic and metrics-focused. End-user emails are practical and task-oriented. Open rates 78–85% because recipient has committed to purchase. [Observed — Sequenzy, Arrows]

### B2C Subscription Sequence (Config C) — 5 emails + push

| # | Trigger | Timing | Subject line template | Body | CTA | Channel |
|---|---|---|---|---|---|---|
| 1 | `signup_completed` | Immediate | "Welcome to [Product] — here's your first step" | Warm greeting → single next action → app deep link | "[Open [App] →]" | Email |
| 2 | `24h AND first_session_not_completed` | +24h | "Your first [session/workout/lesson] is ready" | Name the specific content waiting → time estimate ("Just 3 minutes") → visual preview | "[Start now →]" | Email |
| 3 | `first_session_completed` | On trigger | "[Name], great start!" | Celebrate → show streak/progress → introduce one more feature | "[Keep going →]" | Push |
| 4 | `Day 3 AND streak_maintained` | +3d | "You're on a roll — Day 3!" | Streak celebration → social proof ("Join 10M learners") | "[Continue →]" | Push |
| 5 | `72h AND NOT engaged` | +72h | "We miss you — just 3 minutes today" | Light guilt/motivation → friction reduction ("Just 3 minutes") → deep link to easiest session | "[Quick session →]" | Email + Push |

**Copy rules:** emotional, short, visual-heavy. Push handles daily micro-nudges (streaks, reminders); email handles value communication (progress summaries, upgrade prompts). Duolingo: max 2 emails per day, 3 of 4 initial emails mention streaks above the fold. Novelty rotation on push (AI introduces new templates to prevent fatigue). [Observed — Duolingo, nGrow]

### Marketplace Seller Sequence (Config E)

| # | Trigger | Subject line template | Body | CTA |
|---|---|---|---|---|
| 1 | `seller_signup_completed` | "Welcome — let's set up your [shop/listing]" | Greeting → first step (create listing) → time estimate → earnings projection | "[Create your first listing →]" |
| 2 | `first_listing_published` | "Your [listing] is live!" | Celebration → optimization tips → how buyers find listings | "[View your listing →]" |
| 3 | `7d AND no_transaction` | "Tips to get your first [sale/booking]" | Optimization guidance → successful seller examples → pricing tips | "[Optimize your listing →]" |
| 4 | `first_transaction_completed` | "You earned $[amount]!" | Celebration → payout info → "what's next" guidance | "[View earnings →]" |

### Fintech Sequence (Config G)

| # | Trigger | Subject line template | Body | CTA |
|---|---|---|---|---|
| 1 | `signup_completed` | "Welcome — let's verify your identity" | Trust framing ("Required by regulation to protect you") → step overview → time estimate ("About 10 minutes") | "[Start verification →]" |
| 2 | `verification_submitted` | "We're reviewing your documents" | Status update → estimated time ("1–2 business days") → what happens next → interim features available | "[Explore while you wait →]" |
| 3 | `verification_approved` | "You're verified — ready to [transact]" | Celebration → first transaction guide → security reassurance | "[Make your first [transfer/trade] →]" |
| 4 | `verification_rejected` | "We need a bit more from you" | Specific issue → re-upload instructions → support path | "[Re-upload documents →]" |

---

## Step 4 — Attach Measurement and Compliance

### Measurement Framework

Every onboarding plan must include all three tiers.

#### Tier 1: North Star Metrics

| KPI | Definition | Typical Target | Segment Variation |
|---|---|---|---|
| Activation Rate | % of new users reaching activation event within defined timeframe | B2B SaaS: 40–60%, Consumer: 20–40%, Enterprise: 70–90% | Definition of "activation event" determines the number — must be validated against retention |
| Time to Value (TTV) | Duration from signup to first meaningful value | Consumer: <5 min, Self-serve B2B: <30 min, Enterprise: <2 weeks | Top quartile across SaaS: <5 minutes (ProductGrowth) |
| Onboarding Completion Rate | % of users completing all required onboarding steps | Self-serve: 60–80% strong, Team: 50–70% strong | Denominator matters: "of all signups" vs. "of those who started" |

#### Tier 2: Leading Indicators

| KPI | Definition | Why It Matters |
|---|---|---|
| Step-level drop-off | Exit rate between each consecutive onboarding step | Identifies specific friction points |
| 72-hour engagement | Whether user engaged within first 72 hours | 90% churn probability if not (ChurnWard) |
| Core action frequency (Week 1) | How often user performs the core product action in first week | Validates product fit and habit formation |
| Setup/integration completion | Whether user completed technical setup | Creates switching costs and enables value |
| Time-to-activation (median) | Median days from signup to activation event | Tracks TTFV improvement over time |

#### Tier 3: Diagnostic Metrics

| KPI | Definition | When to Use |
|---|---|---|
| Step completion time | Time spent on each onboarding step | When diagnosing friction at a specific step |
| Device-specific completion | Completion rate segmented by device type | When investigating mobile issues (Anti-Pattern 5) |
| Channel-specific completion | Completion rate by acquisition source | When diagnosing lead-quality issues |
| Re-engagement response | Response rate to onboarding nudge emails | When optimizing email sequences |
| Onboarding cost per customer | Fully loaded onboarding expense / new customers | When optimizing unit economics |
| Pattern-specific completion | Completion rate per onboarding pattern used | When validating Principle 2 (single pattern rule) |

#### Activation Event Selection Protocol

The activation event must be validated against retention correlation — not assumed. Follow this process:

1. List 3–5 candidate activation events (the actions you believe correlate with retention)
2. For each candidate, compute retention rate at Day 30 for users who completed it vs. those who didn't
3. The event with the largest retention gap is your activation event
4. Validate quarterly: if the correlation weakens, the product has changed and the activation event needs updating
5. If no data exists yet: pick the candidate that represents the clearest "moment of value," implement tracking, and validate within 30 days

**Cohort analysis is mandatory.** Collapsing users into a single activation rate produces "technically accurate and practically useless" numbers (HookLead). Segment by: user type/job, acquisition channel, plan type, device, geography, and time period.

### Compliance

#### Data Collection During Onboarding (GDPR / Privacy)

- **Data minimization:** Collect only what's necessary for the current onboarding step. Defer everything else.
- **Explicit consent:** Clear, affirmative consent before processing personal data. Pre-checked boxes are not consent.
- **Progressive profiling:** Collecting data gradually across sessions is UX best practice, but triggers DPIA requirements if it constitutes profiling under GDPR. Each data request must be genuinely needed at that step.
- **Data subject rights:** Users must be able to access, rectify, and delete their onboarding data.
- **DPAs:** Secure data processing agreements with all third-party tools in the onboarding stack.

#### Accessibility (European Accessibility Act / WCAG 2.2)

Enforceable since June 28, 2025. Applies to e-commerce, banking, digital onboarding, and SaaS products serving EU customers.

Non-negotiable for onboarding:
- [ ] Onboarding flows are fully keyboard-navigable
- [ ] Progress indicators are perceivable by screen readers
- [ ] Form validation errors are programmatically associated with fields
- [ ] Timed actions (session timeouts) offer extensions
- [ ] Color is not the sole means of conveying progress or status
- [ ] All interactive elements meet WCAG 2.2 Level AA minimum target sizes

Penalties: Germany up to €100,000; EU range €5,000–€250,000+ or daily penalties up to €1,000/day.

#### Industry-Specific Compliance Layers

| Industry | Regulation | Onboarding Impact |
|---|---|---|
| Financial services | KYC/AML, PSD2 | Mandatory identity verification before account activation. Adds 3–7 days. Cannot be deferred. |
| Healthcare | HIPAA (US), MDR (EU) | Data handling restrictions. Consent requirements. Audit trails. No PHI in analytics tools. |
| Education | FERPA (US), COPPA (children) | Parental consent for minors. Data minimization. |
| Government | FedRAMP, NIST | Authorization requirements. Compliance certification before onboarding. |

---

## Step 5 — Apply Benchmarks

Benchmarks are diagnostic ranges, not targets. Use them to identify where your onboarding underperforms its segment, not as goals to optimize toward.

### B2B SaaS Self-Serve Benchmarks (Config A)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| Signup → Activated | Activation rate | <20% | 37.5% | 40–55% | 65–75% | Observed (AdoptKit 2026 / 1Capture 2025) |
| Time to first value | Minutes | >30 | 22 | 12 | <5 | Observed (1Capture 2025 / ProductGrowth) |
| Trial → Paid (no CC upfront) | Conversion | <10% | 18.5% | 25–35% | 35–45% | Observed (1Capture 2025) |
| Trial → Paid (CC required) | Conversion | <40% | 49–60% | 55–65% | 60–70% | Observed (1Capture 2025) |
| Day 1 activation | Rate | <3% | 5% | 10–15% | 21% | Observed (Amplitude 2025) |
| Day 7 return | Rate | <3% | 5–7% | 10–15% | 15%+ | Observed (Amplitude 2025) |
| Month 3 user retention | Rate | <4% | — | — | Top 10% retain 20%+ | Observed (Amplitude 2025, median loses 96%) |
| Onboarding email open rate | Rate | <40% | 42% | 50% | 54.78% | Observed (Mailsoftly / AdoptKit) |

### B2B SaaS Sales-Led Benchmarks (Config B)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| Onboarding completion | Rate | <50% | 50–70% | 70–85% | 85–90% | Observed (OnboardingHub) |
| Time-to-live | Duration | >90 days | 45–60 days | 30–45 days | <30 days | Inferred (Rocketlane / practitioner consensus) |
| Stakeholder engagement | % engaged | <40% | 50–60% | 60–80% | 80%+ | Uncertain (limited data) |
| 90-day retention | Rate | <70% | 80–85% | 85–90% | 92%+ | Observed (Wudpecker) |

### B2C Subscription Benchmarks (Config C)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| First-month churn | Rate | >30% | 15–25% | 12–15% | <12% | Observed (Finsi.ai 2026) |
| Day 1 engagement | Rate | <20% | 30–40% | 40–60% | 60%+ | Inferred (Amplitude / vertical data) |
| Involuntary churn (of total) | Rate | >40% | 25–35% | 20–25% | <20% | Observed (Slicker 2025) |

### Marketplace Benchmarks (Config E)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| Vendor onboarding completion | Rate | <30% | 32–40% | 50–60% | 70%+ | Uncertain (Appscrip — single source, possible vendor bias) |
| Vendor abandonment rate | Rate | >70% | 68% | 40–50% | <30% | Uncertain (Appscrip) |
| Time-to-first-listing (digital) | Days | >14 | 7–10 | 3–7 | <3 | Uncertain (Appscrip) |

### Agency / Professional Services Benchmarks (Config F)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| Client retention at 90 days | Rate | <50% | 53–60% | 70–80% | 86%+ | Uncertain (FundedIQ / AgencySimplifier — limited data) |
| Time-to-first-deliverable | Days | >21 | 14–21 | 7–14 | <7 | Uncertain (practitioner estimates) |

### B2C Ecommerce Post-Purchase Benchmarks (Config D)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| First → second purchase | Repeat rate | <15% | 20–27% | 30–40% | 40%+ | Inferred (Shopify / industry estimates) |
| Post-purchase email open | Rate | <35% | 40–50% | 50–55% | 60%+ | Observed (Klaviyo 2024) |
| Review request conversion | Rate | <2% | 5–8% | 10–15% | 15%+ | Inferred (industry estimates) |

Note: B2C ecommerce onboarding data is thinner than SaaS. The funnel skill (`constructing-a-funnel`, Config C) covers pre-purchase metrics in detail; this skill focuses on the post-purchase-to-repeat-customer journey.

### Fintech / Regulated Benchmarks (Config G)

| Stage | Metric | Low | Median | Good | Top Quartile | Confidence |
|---|---|---|---|---|---|---|
| Activation rate | Rate | <3% | 5% | 10–15% | 20%+ | Observed (Tandem — lowest category) |
| KYC completion | Rate | <50% | 60–70% | 75–85% | 90%+ | Inferred (industry estimates) |

### Cross-Configuration: The One Pattern Rule Benchmarks

| Patterns stacked | Completion rate | Source |
|---|---|---|
| 1 pattern | 60% | Observed (DNSK.work, 17 products/4 years) |
| 2 patterns | 45% | Observed (DNSK.work) |
| 3 patterns | 23% | Observed (DNSK.work) |
| 4 patterns | 12% | Observed (DNSK.work) |
| 5 patterns | 8% | Observed (DNSK.work) |

### Confidence Tags

Every benchmark in output must carry one of:
- **Observed** — directly supported by primary source data
- **Inferred** — logically derived from adjacent evidence
- **Uncertain** — plausible but not well-sourced; flag for validation

### Contradiction Handling

When sources conflict (e.g., activation rate ranges from 20% to 60% across sources):
1. State both numbers and their sources
2. Explain the likely cause: different definitions of "activation," different sample compositions, different time periods
3. Recommend which number to use for the user's specific context
4. The activation event MUST be defined explicitly before benchmarking (Finding from research: definitional inconsistency is the primary source of benchmark contradictions in onboarding)

---

## Step 6 — Design Experiments

For every onboarding plan, include an experiment operating system.

### Hypothesis Format

```
We believe [changing X] will [improve metric Y] by [estimated magnitude]
because [evidence/reasoning].
We will test this by [method] over [timeframe] with [sample size].
Success criteria: [metric] improves by [threshold] at [confidence level].
```

### High-Leverage Experiment Categories (prioritized)

1. **Activation event validation:** Test whether your defined activation event actually correlates with retention. Run a cohort analysis comparing 30-day retention of users who completed the event vs. those who didn't. If the gap is <10%, the event is wrong.

2. **TTFV reduction:** Remove one onboarding step (the one with highest drop-off) and measure whether activation rate improves. If it does, the step was friction, not value.

3. **Pattern simplification:** If using >1 onboarding pattern, run a test with only the highest-performing pattern. Expected lift: 30%+ completion per pattern removed (DNSK.work).

4. **Welcome survey impact:** A/B test with vs. without welcome survey segmentation. Measure activation rate difference. If segmentation doesn't improve activation by >5%, the survey is friction.

5. **Email sequence timing:** Test behavioral triggers vs. time-based sends. Expected: behavioral triggers produce 300%+ higher open rates (AdoptKit).

### Test Cadence

- Onboarding flow changes: 1 test per 2-week sprint (onboarding flows have lower traffic than marketing pages; need longer run times)
- Email sequence variants: 1–2 per week
- In-app pattern changes: monthly, with holdback group
- Activation event redefinition: quarterly cohort analysis

### Stop Rules

- Kill a variant if it underperforms control by >15% after reaching statistical significance
- Pause a test if it negatively impacts downstream retention (e.g., faster activation but worse D30 retention = false activation)
- Never declare a winner before minimum sample: 200+ activations per variant for activation rate tests
- If an experiment increases activation but decreases D30 retention, the experiment found a false activation event — investigate

---

## Output Templates

### Template A — Quick Onboarding Plan

Use when the user wants a fast direction.

```markdown
# Onboarding Plan: [Business / Product Name]

## Configuration: [Selected Config]
## Touch Model: [Selected Overlay]

## Activation Event
[Defined activation event with validation hypothesis]

## Onboarding Map
[Stage 1] → [Stage 2] → ... → [Stage N]
Target TTFV: [minutes/hours/days]

## Per-Screen Spec
### Screen 1: [Name]
- Pattern: [wizard / checklist / tour / tooltip / empty state / modal / implementation plan]
- Required elements: [numbered list]
- Headline: [draft, 4-8 words]
- CTA: [exact text]
- Layout: [single-column / two-column / overlay]
- Navigation: [forward / back / skip options]
- Config-specific notes: [variations for this business type]

### Screen 2: [Name]
...

## Flow Logic
- On abandon mid-step: [resume behavior]
- Skippable steps: [list with downstream consequences]
- Error handling: [for this config's likely errors]

## Email Sequence (first 3 emails)
| # | Trigger | Subject | CTA |
|---|---|---|---|
| 1 | [event] | "[subject line]" | "[CTA text →]" |
| 2 | ... | ... | ... |
| 3 | ... | ... | ... |

## Key Events to Track
1. [event_name] at [stage] — [purpose]
2. ...

## Benchmark Targets
| Stage | Metric | Target Band |
|---|---|---|
| ... | ... | ... |

## First 3 Experiments
1. [Hypothesis] — [method] — [timeline]
2. ...

## Compliance Flags
- [Flag or "None identified"]
```

### Template B — Deep Onboarding Teardown

Use when auditing an existing onboarding flow.

```markdown
# Onboarding Teardown: [Product / Company Name]

## Current Architecture
[Step-by-step map of observed onboarding flow]

## Per-Step Analysis

### Step 1: [Name]
- Value contribution: [what barrier does this remove?]
- Pattern used: [which onboarding pattern]
- Data collected: [fields, necessity assessment]
- Activation contribution: [does this move toward activation?]
- TTFV impact: [time added by this step]
- Drop-off risk: [estimated based on benchmarks]
- Compliance check: [GDPR, accessibility, industry]

### Step 2: ...

## One Pattern Rule Assessment
| Pattern | Present? | Completion estimate |
|---|---|---|
| ... | ... | ... |
Patterns stacked: [N] → Expected completion: [benchmark from DNSK table]

## Activation Event Audit
- Defined event: [what the company measures]
- Likely true event: [what probably correlates with retention]
- Gap: [mismatch description, if any]

## TTFV Analysis
- Current estimated TTFV: [minutes/hours/days]
- Benchmark for this configuration: [range]
- Reduction opportunity: [where time can be cut]

## Scorecard
| Category | Score (1-10) | Notes |
|---|---|---|
| Time-to-first-value | ... | ... |
| Pattern simplicity | ... | ... |
| Value-before-data | ... | ... |
| Activation clarity | ... | ... |
| Progressive disclosure | ... | ... |
| Measurement maturity | ... | ... |
| Compliance | ... | ... |
| Mobile experience | ... | ... |

## Top 5 Strengths
1. ...

## Top 5 Leaks
1. [Leak] → [Estimated impact] → [Fix]

## Prioritized Improvements
1. [Improvement] — [Expected impact] — [Effort]
```

### Template C — Build Checklist

Use when building onboarding from scratch.

```markdown
# Onboarding Build Checklist: [Business Name]

## Configuration: [Selected Config]
## Touch Model: [Selected Overlay]

## Pre-Build
- [ ] Activation event defined and validated (or hypothesis stated)
- [ ] User jobs/segments identified (Principle 7)
- [ ] TTFV target set based on configuration benchmarks
- [ ] Compliance surface mapped (GDPR, EAA, industry)
- [ ] One onboarding pattern selected per stage (Principle 2)

## Screen Build
### [Screen Name]
- [ ] Pattern selected from Pattern Screen Specs (one pattern only — Principle 2)
- [ ] Required elements implemented per spec (numbered list checked)
- [ ] Headline written (word count within spec range)
- [ ] CTA text written (action-outcome language)
- [ ] Layout matches spec (single-column/two-column/overlay)
- [ ] Copy direction followed (conversational labels, not form labels)
- [ ] Config-specific variations applied
- [ ] Value contribution confirmed (Principle 1)
- [ ] Data collection minimized (Principle 3)
- [ ] Feature scope limited to Core bucket (Principle 5)
- [ ] Events implemented: [list specific event names]
- [ ] Benchmark target set: [metric] = [range]
- [ ] Mobile tested: stacked layout, tap targets ≥48px, SSO buttons vertical
- [ ] Accessibility verified: keyboard nav, screen reader, ARIA roles, color not sole indicator

### [Repeat for each screen]

## Flow Logic
- [ ] Abandonment + return: progress persistence implemented (server-side)
- [ ] Resume prompt built: "Welcome back — pick up where you left off"
- [ ] Skip logic: skippable vs mandatory steps defined per config
- [ ] Deferred nudge UI: "Complete your profile" surfaces skipped steps in context
- [ ] Error states: inline validation, specific error copy, recovery paths
- [ ] Completion transition: onboarding UI auto-dismisses on activation event
- [ ] Re-onboarding: tier upgrade and churn return flows built

## Email Sequence
- [ ] Per-config sequence built (from Email Sequence Build Spec)
- [ ] Behavioral triggers configured (not time-based only)
- [ ] Suppression rules implemented (skip emails for completed actions)
- [ ] Subject lines written (28-50 characters, mobile-optimized)
- [ ] Single CTA per email verified
- [ ] Sender is named individual (not brand) for PLG/enterprise

## Measurement
- [ ] Activation event tracked with retention correlation
- [ ] Step-level drop-off tracking implemented
- [ ] 72-hour engagement flag configured
- [ ] TTFV measurement in place
- [ ] Cohort analysis segmentation defined
- [ ] Behavioral email triggers configured (not time-based only)
- [ ] Device-specific tracking enabled

## Compliance
- [ ] Data minimization verified — no premature data collection
- [ ] Consent mechanisms in place (GDPR if applicable)
- [ ] WCAG 2.2 Level AA verified for all onboarding screens
- [ ] Industry-specific gates implemented (KYC, HIPAA, etc.)
- [ ] DPAs signed with all third-party onboarding tools

## Launch
- [ ] QA: all events verified firing in test mode
- [ ] QA: mobile experience tested on 3+ devices
- [ ] QA: accessibility audit passed (keyboard, screen reader)
- [ ] QA: page speed < 3 seconds on mobile
- [ ] Experiment backlog created (first 3 tests defined)
- [ ] Monitoring dashboard live (activation rate, TTFV, step drop-off)
- [ ] Escalation triggers configured for stalled users (72-hour cliff)
```

---

## Quality Gates

Do not finalize any onboarding plan unless all gates pass:

- [ ] Configuration selected with explicit reasoning
- [ ] Touch-model overlay selected with explicit reasoning
- [ ] Activation event defined (or hypothesis stated with validation plan)
- [ ] Every stage has a value contribution statement (Principle 1)
- [ ] Every stage uses exactly one onboarding pattern (Principle 2)
- [ ] No data collected before it's needed for value delivery (Principle 3)
- [ ] Every stage has a primary metric and benchmark band
- [ ] Every stage has at least one trackable event specified
- [ ] Measurement includes all three tiers (North Star, leading, diagnostic)
- [ ] Compliance checklist completed with no unresolved flags
- [ ] At least 3 experiments defined with hypotheses and stop rules
- [ ] Every tactic carries a risk classification label
- [ ] Every benchmark carries a confidence tag
- [ ] TTFV target set and achievability assessed
- [ ] Every screen has a pattern selected from Pattern Screen Specs (one pattern per screen)
- [ ] Every screen has required elements, headline, CTA, and layout specified
- [ ] Flow state machine covers: abandon+return, skip logic, error states, completion transition
- [ ] Email sequence built for the selected config with per-email triggers, subjects, and CTAs
- [ ] Suppression rules defined (skip emails for completed actions)

---

## Anti-Patterns

Avoid:

- **Pattern stacking** — using multiple onboarding patterns simultaneously. Each additional pattern cuts completion ~30%. The #1 documented cause of activation failure. (DNSK.work, 17 products)
- **Data collection before value** — requesting information the user doesn't need to provide yet. 40–60% of users never return after first session. Every field you add before value is a multiplier on that drop-off. (Reloadux)
- **Measuring checklists instead of activation** — tracking whether users completed your steps rather than whether they experienced value. A user can complete 100% of a checklist and never activate if the checklist doesn't lead to the aha moment.
- **Time-based email sequences** — sending onboarding emails on a fixed schedule instead of triggered by behavior. Behavioral triggers have 300%+ higher open rates. Time-based sequences email users who already activated (annoying) and miss users who stalled (useless). (AdoptKit)
- **One-size-fits-all onboarding** — the same flow for every user regardless of job or segment. JTBD segmentation lifts adoption 10–20%. The "average user" doesn't exist. (Tandem)
- **Feature tours as onboarding** — showing users all features before they've used one. Progressive disclosure means Core features only during onboarding. Power and Admin features come after activation. (Principle 5)
- **Ignoring mobile** — failing to test and optimize onboarding on mobile devices. Device-specific completion rates often reveal 2–3x gaps that don't show up in aggregate metrics. (ProductLed)
- **No 72-hour intervention** — not triggering re-engagement for users who haven't reached value within 72 hours. 90% churn probability after this threshold. Silence is not patience — it's abandonment. (ChurnWard)
- **Optimizing the wrong activation event** — building onboarding around an action that doesn't actually correlate with retention. The only way to know is retention cohort analysis. "First login" and "profile complete" are almost never the right events.
- **Adding stages to fix broken stages** — inserting a new step upstream of a stage with high drop-off instead of fixing the broken stage. Inherited from the funnel skill's Principle 7: fix the bottleneck before adding complexity.
- **Gamifying incompleteness** — "Your profile is 75% complete!" creates anxiety, not motivation. Users feel punished for not completing rather than rewarded for progressing. (DNSK.work)
- **Cutting onboarding investment without tracking the impact** — 57% of companies that reduced onboarding investment saw churn increase within 6 months. Onboarding ROI is measured in retention, not in onboarding team headcount. (OnRamp 2026)

---

## Handoff to Other Skills

Route to specialized skills when the onboarding plan reveals a deeper need:

- Funnel design upstream of onboarding → `constructing-a-funnel`
- Landing page optimization → `constructing-a-landing-page`
- Offer design is weak (users churn because the product doesn't deliver enough value, not because onboarding is bad) → `offer-pillar-discovery`
- Lead magnet for pre-onboarding education → `lead-magnet-creation`
- Retention is the bottleneck after onboarding succeeds → `consult-hormozi` (routes to $100M Retention Playbook)
- Branding/trust issues during onboarding → `consult-hormozi` (routes to $100M Branding Playbook)
- Design polish for onboarding screens (spacing, animation, component states, loading patterns, micro-interactions) → `product-craft`
- Competitive intelligence on competitor onboarding → `deep-web-research`
- Need to extract expert knowledge for onboarding content → `workflow-decomposition` (dark playbook extraction)

---

## Reference Sources

### Primary Research (Tier 1)
- Amplitude 2025 Product Benchmark Report (2,600+ companies, 10.6K products): https://amplitude.com/benchmarks/activation
- Amplitude: Time to Value Drives Retention: https://corpsite.amplitude.com/blog/time-to-value-drives-user-retention
- OnRamp 2026 State of Customer Onboarding (161 leaders): https://onramp.us/blog/2026-state-of-onboarding-report
- Forrester 2025: Retention Starts at Onboarding: https://www.forrester.com/report/retention-starts-at-onboarding/RES178562
- Chameleon 2025 Benchmark Report (550M+ interactions): https://www.chameleon.io/benchmark-report
- European Accessibility Act / WCAG 2.2: https://ergomania.eu/european-accessibility-act-2025-wcag-guide

### Benchmark Reports (Tier 2)
- 1Capture: Free Trial Conversion Benchmarks 2025 (10,000+ SaaS): https://1capture.io/blog/free-trial-conversion-benchmarks-2025
- OnboardingHub: Completion Rate Benchmarks: https://onboarding-hub.com/guides/onboarding-completion-rate
- ProductGrowth: SaaS Onboarding Benchmarks 2026: https://productgrowth.in/insights/saas/saas-onboarding-benchmarks/
- AdoptKit: Onboarding Benchmarks 2026: https://www.adoptkit.com/posts/onboarding-benchmarks-industry-standards-2026
- SparkCo: Measuring Onboarding Completion Rates: https://sparkco.ai/blog/measure-onboarding-completion-rates
- Finsi.ai: E-commerce Churn Rate Benchmarks 2026: https://finsi.ai/blog/ecommerce-churn-rate-benchmarks-2026/
- Slicker: B2C Subscription Involuntary Churn: https://www.slickerhq.com/blog/2025-involuntary-churn-benchmarks-b2c-subscription-brands
- Wudpecker: Retention Benchmarks 2025: https://www.wudpecker.io/blog/retention-benchmarks-for-b2b-saas-in-2025

### Frameworks and Practitioner Sources (Tier 2)
- DNSK.work: One Pattern Rule (17 products, 4 years): https://dnsk.work/blog/why-mixing-onboarding-patterns-destroys-activation-one-pattern-works-five-dont/
- Tandem: JTBD Onboarding Framework: https://usetandem.ai/blog/jobs-to-be-done-onboarding-a-framework-for-activating-users-when-intent-is-unknown
- Tandem: AI Segmentation for Onboarding: https://usetandem.ai/blog/ai-segmentation-for-personalized-user-onboarding-flow
- Tandem: Activation Benchmarks by Product Type: https://usetandem.ai/blog/what-activation-rates-are-normal-by-product-type-and-job-complexity
- KnowledgeLib: Customer Onboarding Design Playbook 2026: https://knowledgelib.io/business/customer-success/customer-onboarding-design-playbook/2026
- Reloadux: Why Users Drop Off During Onboarding: https://reloadux.com/blog/why-users-drop-off-during-onboarding-and-how-to-fix-it/
- ChurnWard: SaaS Onboarding Best Practices: https://churnward.com/blog/saas-onboarding-best-practices/
- Loyalty.cx: SaaS Onboarding Optimization: https://loyalty.cx/saas-onboarding-optimization/
- ProductLed: Onboarding Mistakes Case Study: https://productled.com/blog/every-onboarding-mistake-i-made-so-you-dont-have-to
- HookLead: SaaS Onboarding Metrics: https://www.hooklead.com/blog/saas-onboarding-metrics-kpis-that-drive-revenue
- Rocketlane: Customer Onboarding Maturity Model: https://www.rocketlane.com/blogs/the-customer-onboarding-maturity-model-measure-up-your-onboarding-game
- Rob Palmer: SaaS Email Onboarding: https://robpalmer.com/blog/saas-email-onboarding-sequences
- AdoptKit: Onboarding Email Drip Campaigns: https://www.adoptkit.com/posts/onboarding-emails-drip-campaigns
- Mailsoftly: Onboarding Email Best Practices: https://mailsoftly.com/blog/user-onboarding-email-best-practices

### Marketplace and Agency Sources (Tier 3)
- Appscrip: Marketplace Vendor Onboarding: https://appscrip.com/blog/marketplace-vendor-onboarding/
- AgencySimplifier: Agency Client Onboarding: https://agencysimplifier.com/blog/agency-client-onboarding-checklist/
- FundedIQ: Client Onboarding Best Practices: https://fundediq.co/client-onboarding-best-practices/
- Moxo: Onboarding for Every Segment: https://www.moxo.com/blog/customer-onboarding-smb-mid-market-enterprise

### Compliance
- GDPR Compliant Onboarding: https://hyperspace.mv/gdpr-compliant-onboarding-process/
- GDPR Compliance Checklist 2026: https://privacychecker.pro/blog/gdpr-compliance-checklist-2026
- ICO: Profiling Tools Compliance: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/online-safety-and-data-protection/profiling-tools-for-online-safety/how-do-we-demonstrate-our-compliance
- EAA / WCAG 2.2 Guide: https://ergomania.eu/european-accessibility-act-2025-wcag-guide
- EAA Enforcement Details: https://flexmade.com/insights/what-the-european-accessibility-act-means
- EAA Penalties: https://getwcag.com/en/blog/european-accessibility-act-and-wcag-22-what-you-need-to-know-in-2025

### Hormozi Playbooks (local assets)
- Retention: `$100M Retention Playbook.pdf` → 5 Horsemen, usage-drop intervention
- LTV: `$100M Lifetime Value Playbook.pdf` → Crazy Eight levers, LTGP
- Branding: `$100M Branding Playbook.pdf` → deliberate association
- Offers: `$100M Offers - Alex Hormozi.pdf` → ValueEquation (if churn is offer-quality, not onboarding)
