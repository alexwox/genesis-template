# Onboarding Email Sequences & Flow State Machines

Deep research on implementation-level onboarding patterns: actual email structures, trigger logic, UX edge states, and copy frameworks.

**Research date**: April 2026
**Source count**: 30+ sources across Tier 1 (product docs, first-party data), Tier 2 (practitioner teardowns, industry publications), and Tier 3 (opinion/newsletter content)
**Evidence labeling**: All findings tagged as [Observed], [Inferred], or [Uncertain]

---

## Part 1: Onboarding Email Sequences

---

### 1.1 SaaS Self-Serve Email Sequences

#### Slack — 7 emails, 14-day window

**Source**: Email Mastery teardown (Tier 2), UserGuiding teardown (Tier 2)

| # | Timing | Subject Line | Purpose | Trigger | Visual Style |
|---|--------|-------------|---------|---------|-------------|
| 1 | Immediate | "Confirm your email address" | Email verification | Signup event | Branded, logo top-left, single CTA button, no-scroll layout |
| 2 | Post-confirmation | Welcome email (exact subject not published) | Account details + set expectations | Email confirmed | Plain text feel, branded colors, includes link to free guides |
| 3 | Seconds after welcome | "Send this signup link to your teammates" | Team invite (core activation) | Welcome sent | Branded, single CTA, direct heading |
| 4 | Day 2 (if no invites) | Invite reminder (variant) | Re-prompt team invite | Behavioral: no team members added |  Same branded template |
| 5 | Day 3 (if no invites) | "Reminder: Invite People To Slack" | Third team invite push | Behavioral: still no team members | Same template |
| 6 | Day 5 | "Get the Slack app" | App download | Time-based | Includes device images matching brand colors |
| 7 | Day 7 | Notification settings prompt | Turn on/customize notifications | Time-based | Addresses the core UX challenge: distraction vs. focus |

[Observed] Slack's philosophy is radical simplicity. No email requires scrolling. Every email has exactly one CTA. Business-casual tone balanced by playful brand colors and laid-back font. Emails come from "Slack" (brand), not a named individual.

[Observed] Suppression logic: Emails 3-5 (team invite sequence) appear to be behaviorally triggered — users who invite teammates likely skip the reminder emails. This is inferred from the pattern but not explicitly confirmed by Slack.

[Observed] Ongoing: Workspace owners receive a weekly digest email with member count, messages sent (public vs. private), and plan details. This is the primary ongoing engagement email.

**Key insight**: Slack dedicates 3 of 7 onboarding emails to a single action (invite teammates) because their product requires multi-user adoption. The activation event is not "use Slack" — it's "get a reply from a teammate."

#### Calendly — 3 emails, 14-day trial

**Source**: Val Geisler teardown (Tier 2), Page Flows (Tier 2)

| # | Timing | Subject Line | Purpose | Notes |
|---|--------|-------------|---------|-------|
| 1 | Day 0 | Welcome (exact subject described as "clear but basic") | Confirm + first step | "Good bones but lacking personalization" |
| 2 | Mid-trial | Feature/benefit email | Engagement | Limited detail available |
| 3 | Pre-expiry | Trial ending | Conversion | Limited detail available |

[Observed] Val Geisler's assessment: 3 emails over 14 days is "not much to tear down." The sequence was described as having a functional foundation but missing opportunities for deeper engagement. Calendly's aha moment (first meeting booked without back-and-forth) could support a much more aggressive sequence.

[Inferred] Calendly likely relied heavily on in-app activation rather than email, given their minimal email investment.

#### Generic PLG Project Management Tool — 5 emails, 7 days

**Source**: Sequenzy (Tier 2) — anonymized but based on real data

| # | Timing | Subject Line | Open Rate | Purpose | Trigger |
|---|--------|-------------|-----------|---------|---------|
| 1 | Immediate | "Your [Product] account is ready" | 72% | Confirm + first step | Signup |
| 2 | Day 1 | "Quick tip: create your first project" | 58% | Drive activation | Time-based |
| 3 | Day 2 | "Most users miss this feature" | 52% | Deepen engagement | Time-based |
| 4 | Day 4 | "Invite your team?" | 45% | Viral expansion | Behavioral: only if no invites sent |
| 5 | Day 7 | "How's your first week going?" | 48% | Check-in + help | Time-based |

**Email 1 body template** (full text):
> Hi [First Name],
>
> You're in. Your [Product] account is ready to go.
>
> Most new users start by creating their first project. Takes about 2 minutes.
>
> [Create Your First Project →]
>
> If you get stuck, reply to this email. I'm a real person and I read every response.
>
> [Your Name]
> [Product] Team

[Observed] Structure: Greeting → Confirmation → Social proof anchor ("most new users") → Time estimate → Single CTA → Human fallback. Word count: ~50 words. Body is text-forward with one button CTA.

#### Enterprise Security Software — 5 emails, 14+ days

**Source**: Sequenzy (Tier 2) — anonymized but based on real data

| # | Timing | Subject Line | Open Rate | Purpose | Trigger |
|---|--------|-------------|-----------|---------|---------|
| 1 | Immediate | "Welcome to [Product] + your CSM intro" | 85% | CSM introduction | Deal closed |
| 2 | Day 1 | "Kickoff call: pick a time" | 78% | Schedule onboarding | Time-based |
| 3 | Day 3 | "Before our call: quick prep" | 72% | Pre-call checklist | Time-based |
| 4 | Post-kickoff | "Your onboarding roadmap" | 80% | Recap + next steps | Behavioral: kickoff completed |
| 5 | Day 14 | "How's the rollout going?" | 68% | Check-in | Time-based |

**Email 1 body template** (full text):
> Hi [First Name],
>
> Welcome to [Product]. I'm [CSM Name], your Customer Success Manager.
>
> I'll be your main point of contact throughout your time with us. My job is to make sure you get maximum value from [Product].
>
> What to expect:
> - Week 1: Kickoff call to configure [Product] for your workflow
> - Week 2-3: Rollout support and training
> - Ongoing: Quarterly business reviews and priority support
>
> My contact info:
> - Email: [CSM Email]
> - Phone: [CSM Phone]
> - Calendar: [Booking Link]
>
> I'll follow up tomorrow to schedule our kickoff. In the meantime, feel free to reply with any questions.
>
> [CSM Name]
> Customer Success Manager | [Product]

[Observed] Enterprise open rates are dramatically higher (85% welcome vs. 72% PLG) because the recipient has already committed to a purchase decision. The sender is a named individual with direct contact information, not a brand.

#### Developer Tool (API Product) — 5 emails, 14 days

**Source**: Sequenzy (Tier 2)

| # | Timing | Subject Line | Open Rate | Purpose |
|---|--------|-------------|-----------|---------|
| 1 | Immediate | "Your API key + quickstart" | 68% | Enable first API call |
| 2 | Day 1 | "Did your first call work?" | 55% | Troubleshoot |
| 3 | Day 3 | "3 things most devs miss" | 48% | Deepen usage |
| 4 | Day 7 | "Building something cool?" | 42% | Community |
| 5 | Day 14 | "Ready to go live?" | 45% | Production checklist |

[Observed] Developer tool emails include inline code snippets (npm install commands, API call examples) directly in the email body. The tone is "Hey" not "Hi" — more casual. CTA destinations include API docs, code examples, and Discord links alongside product deep links.

#### Figma — In-app focused, minimal email

**Source**: Ayean's Studio teardown, Supademo teardown (Tier 2)

[Observed] Figma achieves 65%+ activation within the first session through in-app progressive disclosure rather than email:
- Layer 1 (0-30 sec): Pre-made canvas with cursor positioned, single instruction "Click to add"
- Layer 2 (30s-2min): Contextual tooltips unlock as user progresses
- Layer 3 (2-5min): Advanced features revealed after basics mastered
- Day 1 retention: 73%
- Time to first meaningful action: Under 30 seconds

[Inferred] Figma's email sequence is minimal because their in-app onboarding is so effective. The "Figma Basics" pre-loaded file in every new workspace replaces tutorial emails.

#### Dropbox — In-app + segmented email

**Source**: Product Onboarding, LinkedIn PLG Breakdown (Tier 2)

[Observed] Dropbox segments email recommendations by email domain at signup:
- Gmail users → recommended Plus (personal) plan
- Work email users → recommended Business plan

Post-signup onboarding checklist drives to: upload file, sign document, edit PDF — all deep-linked to specific product areas. Desktop app download banner appears prominently as a secondary activation path.

---

### 1.2 B2C Subscription Email Sequences

#### Duolingo — Coordinated email + push, streak-driven

**Source**: Rosie Hoggmascall/UX Collective, nGrow analysis, Choice Hacking, Retention.blog (Tier 2)

**Email sequence characteristics**:
- Max 2 emails per day [Observed]
- 3 of 4 initial emails mention streaks above the fold [Observed]
- Emphasizes "quick," "short," "3-min" lessons to address time-objection [Observed]
- Streak-focused subject lines dominate early sequence [Observed]

**Push notification strategy** (complements email):
- Custom bandit algorithm personalizes message timing and content [Observed]
- Guilt-driven humor: "You made Duo sad," "Don't let Duo down" [Observed]
- Novelty rotation: AI regularly introduces new templates to prevent fatigue [Observed]
- Context-aware: References individual milestones, streak wagers, travel motivations [Observed]
- 5% of DAU are "resurrected" users (inactive 30+ days who return) [Observed — Duolingo blog, first-party data]
- Resurrected users are ~20% less likely to be retained than new users at 7/14 days [Observed — Duolingo blog]

**Emotional tone pattern**: Motivational → guilt (light) → social proof (streaks) → FOMO (streak loss) → celebration (milestone)

[Observed] Key weakness identified: Duolingo requests push notification permission too early in onboarding, before users understand core value. This likely increases opt-out rates.

**Reactivation email patterns** (for lapsed users):
- Relationship-based: "We miss you"
- Skill decay warnings: "Your Spanish is getting rusty"
- Time-pressure: "Just 3 minutes today"
- Streak-recovery: "Your streak is waiting"

#### Headspace — Trial-first, mobile-optimized

**Source**: Email Mastery teardown, CleverTap analysis (Tier 2)

[Observed] Headspace's entire website funnels to a single CTA: "Start free trial." No newsletter signup, no lead magnets — pure trial conversion focus.

[Observed] Email collection happens before payment info request, capturing contacts even if users abandon during payment entry (a critical drop-off point).

**Email characteristics**:
- Continual A/B testing and optimization [Observed]
- Mobile-first design (67% of opens on mobile) [Observed]
- Simple, digestible copy with eye-catching visuals or GIFs [Observed]
- Compelling incentives to drive action [Observed]
- Reported 500% increase in customer lifetime value attributed to onboarding email optimization [Observed — CleverTap, but likely marketing claim]

**Emotional tone pattern**: Calm → educational → motivational → social proof → gentle urgency

[Uncertain] Specific subject lines and email count for Headspace's onboarding sequence were not available in any source. The available teardowns focus on strategy rather than exact copy.

#### Mobile Fitness App (Generic) — 5 emails, 14 days

**Source**: Sequenzy (Tier 2)

| # | Timing | Subject Line | Open Rate | Trigger |
|---|--------|-------------|-----------|---------|
| 1 | Immediate | "Open [App] to start" | 55% | Signup |
| 2 | Day 1 | "Your first workout is ready" | 48% | Time-based |
| 3 | Variable | "We miss you" | 42% | Behavioral: inactive |
| 4 | Day 7 | "You've completed [X] workouts!" | 52% | Behavioral: milestone |
| 5 | Day 14 | "Unlock personalized plans" | 38% | Time-based |

[Observed] App-first email strategy: emails drive to app (not web) via deep links to specific screens. App Store/Play Store download links included for users who haven't installed.

**Push + email coordination pattern**: Push handles high-frequency micro-nudges (daily reminders, streak protection), email handles lower-frequency value communication (progress summaries, feature introduction, upgrade prompts).

#### Subscription Brand Email Layers (General)

**Source**: Entrepreneur.com (Tier 2)

[Observed] The 5 email layers every subscription brand needs:
1. **Post-purchase sequence**: 4-6 touchpoints over 2-3 weeks introducing full ecosystem
2. **Usage-based triggers**: Behavioral emails based on consumption patterns
3. **Renewal/billing communication**: Proactive messaging before charges
4. **Win-back sequence**: For lapsed or cancelled subscribers
5. **Referral/expansion**: After activation milestone achieved

---

### 1.3 Enterprise Onboarding Emails

#### Multi-Stakeholder Email Routing

**Source**: Arrows.to, Digital Applied, Sequenzy (Tier 2)

[Observed] Enterprise onboarding requires separate email tracks for different stakeholders:

| Recipient | Email Focus | Sender | Tone |
|-----------|------------|--------|------|
| Champion (buyer) | Implementation timeline, ROI tracking, executive updates | CSM (named) | Strategic, metrics-focused |
| End users | Product training, feature guides, quick-start resources | Product/CSM team | Practical, task-oriented |
| Executive sponsor | Milestone summaries, business impact, QBR scheduling | CSM or Account Executive | Executive, outcome-focused |
| IT/Admin | Technical setup, SSO config, security documentation | Technical CSM or Solutions Engineer | Technical, compliance-focused |

#### Sales-to-CS Handoff Emails

**Source**: Arrows.to guide (Tier 2)

[Observed] The handoff email is the bridge between sales excitement and onboarding execution. Key elements:

1. **Internal handoff** (sales → CS): Required deal properties must be complete before deal moves to "closed won." Workflow automatically triggers onboarding pipeline creation and Slack notification to CS team.

2. **External handoff** (to customer): Introduces CSM by name with direct contact info. Sets timeline expectations. Avoids making customer repeat information already shared with sales.

3. **Kickoff scheduling**: Automated email with calendar booking link. Pre-call prep email 1-2 days before kickoff with checklist of what to bring/prepare.

[Observed] Poor onboarding causes 23% of first-year churn — more than pricing or product issues. Clients completing structured onboarding in the first 30 days churn at roughly half the rate of those who don't.

#### HubSpot Implementation Email Cadence

**Source**: IntegrateIQ (Tier 2)

[Observed] 6-week structured approach:
- Weeks 1-2: Discovery and strategic planning emails
- Weeks 2-3: Technical setup communications (AI configuration, brand identity)
- Weeks 3-4: Data migration guidance (30-50% of records typically duplicates or incomplete)
- Weeks 4-5: Automation and nurture playbook emails
- Week 6+: Team enablement and launch communications

Partner-led implementations: 6-10 weeks. Self-service: months.

---

### 1.4 Email Copy Pattern Extraction

#### Subject Line Formulas

**Source**: Sender.net (85+ examples), Sequenzy, Rob Palmer, Entrepreneur.com (Tier 2-3)

[Observed] Subject line categories with examples:

**Confirmation/Welcome** (highest open rates, 65-85%):
- "Your [Product] account is ready"
- "Welcome to [Product] + your CSM intro"
- "Welcome to [Product]: let's get started!"
- "[First Name], dive into [Product] goodness"

**Action-driving** (50-65% open rates):
- "Quick tip: create your first project"
- "Your API key + quickstart"
- "Day 1: Import your contacts"
- "Start creating in [Product]"

**Curiosity/FOMO** (45-55% open rates):
- "Most users miss this feature"
- "3 things most devs miss"
- "Profiles with [X] get 3x more views"

**Social/expansion** (40-50% open rates):
- "Invite your team?"
- "Share your work with your team"
- "Building something cool?"

**Check-in** (45-55% open rates):
- "How's your first week going?"
- "How's the rollout going?"
- "Did your first call work?"

**Urgency/trial end** (50-60% open rates):
- "2 days left: need more time?"
- "Your 14-day trial starts now"
- "Your trial expires tomorrow"

**Celebration** (55-65% open rates):
- "[First Name], you created something"
- "You've completed [X] workouts!"
- "Great progress on [Course]!"

**Optimal length**: 28-50 characters for mobile (68% of opens). Front-load key info before truncation. [Observed]

**Personalization impact**: First-name personalization lifts open rates 10-14%. Behavioral personalization (purchase history, browse behavior, location) drives 26% lift over unpersonalized. [Observed]

#### Preview Text Patterns

[Observed] 34% of recipients say preview text is almost as important as the subject line when deciding to open. On mobile (55-60% of opens), subject line and preview text appear together — if they clash in tone, 69% of recipients mark as spam.

**Best practice**: Write subject line and opening line as a single unit. Preview text should extend or complement the subject, not repeat it.

#### Body Structure Patterns

[Observed] Two dominant structures:

**Pattern A: Greeting → Value → CTA** (most common for activation emails)
> Hi [Name],
> [1-2 sentence confirmation or context]
> [Value statement or social proof anchor]
> [Single CTA button]
> [Human fallback: "Reply to this email"]
> [Signature]

Word count: 40-80 words. Used by: Slack, PLG tools, developer tools.

**Pattern B: Problem → Solution → CTA** (used for feature spotlight and social proof emails)
> Hi [Name],
> [Problem statement the user likely faces]
> [How feature/product solves it, with specifics]
> [Screenshot or GIF]
> [Single CTA button]
> [Signature]

Word count: 80-150 words. Used by: mid-sequence emails, feature spotlights.

**Pattern C: Loss → Specifics → CTA** (trial end emails)
> [Your trial ends [date]. Here's what happens:]
> [Bulleted list of specific things they'll lose]
> [Quantified value they've received]
> [Upgrade CTA]
> [P.S. with social proof]

Word count: 60-120 words. Loss aversion framing.

#### CTA Button Text Patterns

[Observed] High-performing CTA patterns:

| Category | Examples | Context |
|----------|---------|---------|
| Action-specific | "Create Your First Project →", "Connect Data →", "Import Your Contacts" | Activation emails |
| Benefit-specific | "See Your Data", "Get the Report", "See What's New" | Value demonstration |
| Progress-continuation | "Keep Going", "Continue Setup →", "Pick Up Where You Left Off" | Return/resume emails |
| Upgrade-specific | "Upgrade Now — Keep My Data", "Unlock [Feature]", "Start Your Plan" | Conversion emails |
| Scheduling | "Pick a Time", "Book Your Kickoff", "Schedule Your Call" | Enterprise/meeting emails |

[Observed] Single CTA per email is the universal best practice. One prominent CTA in short emails; repeat the same CTA twice in longer emails. Never multiple different CTAs.

#### Sender/Signature Patterns

[Observed] Two approaches with different use cases:

| Pattern | Format | Best For | Open Rate Impact |
|---------|--------|----------|-----------------|
| Named individual | "From: [Name], [Product]" with photo, title, direct contact | Enterprise, high-touch, founder-stage | Higher — establishes human connection |
| Brand team | "From: The [Product] Team" or "From: [Product]" | PLG, high-volume, consumer | Lower but appropriate for scale |

[Observed] Rob Palmer recommends: "Emails from real people get higher open rates. Use a real name, a real photo, and a reply-to address that actually reaches a human." The welcome email specifically should come from a founder, head of CS, or named team member.

[Inferred] The trend across 2024-2026 data is toward named senders even in PLG contexts, with "Reply to this email — I'm a real person" language in the body.

#### Branching & Suppression Logic Patterns

[Observed] Best-practice architecture (from Customer.io case studies, Intercom docs, Sequenzy analysis):

**Behavioral suppression rules**:
- If user completed target action → skip nudge email for that action
- If user is "very active" (defined by product) → fast-track to conversion ask, skip beginner emails
- If user goes inactive for 3-5 days → trigger re-engagement branch
- If user invited team → skip all team-invite reminder emails

**Branching patterns**:
- **Intent-based routing**: Signup question ("What will you use this for?") routes to different email tracks
- **Activity-based branching**: High-intent users get conversion-focused messages; low-intent get educational content (Final Round AI: 23% more traffic from low-intent, 8% from high-intent)
- **Experience-level branching**: Beginners get more guidance; experienced users directed to preferred workflows (Les Mills: 53% retention of at-risk subscribers)
- **Plan-based branching**: Free vs. paid, individual vs. team
- **Email domain segmentation**: Work email vs. personal email routes to different plan recommendations (Dropbox)

**Hybrid timing model** (recommended):
- Time-based foundation: guaranteed minimum emails regardless of behavior
- Behavioral triggers layered on top: milestone celebrations, stuck-user help, suppression of irrelevant emails
- Milestone-based triggering converts 2-3x better than pure time-based [Observed]

**Monarch Money example** (Customer.io case study):
- Replaced 4-email generic trial sequence with behavior-triggered emails based on: connecting bank accounts, updating transaction categories
- Result: 3.36% drop in trial cancellations, 4.4% lift in reports page views [Observed — first-party case study]

---

### 1.5 Performance Benchmarks (Email Sequences)

| Metric | Average | High Performers | Source |
|--------|---------|----------------|--------|
| Time to first value email | 3-5 days | Immediate (within minutes) | Sequenzy |
| Emails in week 1 | 2-3 | 4-5 | Sequenzy |
| Welcome email open rate | 50-60% | 70-85% (enterprise) | Rob Palmer, Sequenzy |
| Behavioral email open rate | 50%+ | 61% (automated workflows) | AdoptKit/Intercom |
| Trial-to-paid conversion | 12-15% | 22-30% | Rob Palmer, industry benchmarks |
| Activation rate (baseline) | 15-25% | 40-60% | DesignRevision |
| 7-day retention lift from personalization | — | +35% | DesignRevision |
| Churn reduction from onboarding | 15-20% baseline | 7-10% with good onboarding | DesignRevision |

---

## Part 2: Onboarding Flow State Machines

---

### 2.1 Abandonment + Return Recovery

#### How Products Handle Mid-Onboarding Abandonment

**Progress Saving Mechanisms**

[Observed] Three tiers of persistence (from OnboardJS documentation — Tier 1):

| Method | Persistence | Cross-Device | Implementation |
|--------|------------|--------------|----------------|
| Local storage (client) | Browser sessions only | No | Storage key + optional TTL expiration |
| Server-side (Supabase/DB) | Permanent, user-tied | Yes | `loadData()`, `persistData()`, `clearPersistedData()` handlers |
| Hybrid | Both | Yes with auth | Local for speed, server for durability |

[Observed] Server-side persistence schema (OnboardJS + Supabase): Stores `user_id`, `flow_data` (JSONB), `created_at`, `updated_at` per user. Row-level security policies ensure user-specific access.

[Observed] XState persistence pattern: `actor.getPersistedSnapshot()` serializes state to any storage backend. Restored via `snapshot: restoredState` when creating actor. Supports full statechart state including parallel states and context.

**What Products Show on Return**

[Observed] Three-level framework (from Retention.blog — Tier 2):

**Level 1 — Simple Welcome Back**:
- In-app message: "Welcome back!" for users inactive 20-30+ days
- Triggered on app open or reinstall
- Also triggers a welcome-back email
- Low implementation cost; works with any CRM tool

**Level 2 — Feature Highlights**:
- Welcome-back message + "What's new" tooltips
- Shows product improvements since last visit
- Higher lift but requires maintaining a changelog
- Duolingo used this approach after a major redesign: comprehensive video walkthrough for returning users showing new features

**Level 3 — Full Re-Onboarding Flow**:
- Contextual onboarding questions (goals, experience level)
- Feature recommendations based on responses
- Similar to initial onboarding but acknowledges returning status

**Fabulous Habit Tracker** (best-in-class Level 3 example) [Observed]:
1. Welcome message: "Your story isn't finished…"
2. Asks why user stopped their habit
3. Asks questions to understand how to help
4. Recommends specific features based on responses
5. Broader onboarding: 42 steps total, includes commitment contract ("sign" intention), narrative framing (letter from "Future Self"), gamified streaks (campfire animations)

**Duolingo 6-Step Reactivation** [Observed — Rosie Hoggmascall/UX Collective]:
1. Welcome-back screen with sleeping owl visual
2. Language selection check-in (allows switching — critical for returning users with changed goals)
3. Goal recalibration
4. Push notification re-opt-in
5. Personalized welcome-back email
6. Coordinated CRM sequence for re-engagement

[Observed] Duolingo data: ~5% of DAU are "resurrected" users (30+ days inactive). These users are 20% less likely to be retained at 7/14 days than new users, making dedicated re-onboarding economically important.

**Re-Engagement Triggers**

[Observed] Timing patterns for return nudges:
- Email: 2-3 months post-churn is the sweet spot. Too early feels desperate; too late, they've moved on. ~15% return rate when well-timed. (LogRocket/Bart Krawczyk)
- Push: Daily for first 3 days after return. "Three days of consecutive visits" is the re-retention threshold. (LogRocket)
- Use-case sensitive timing: Fitness apps around New Year's, ed-tech before exam periods, Uber Eats around 4 PM dinner decision time. [Observed]

#### State Machine Architecture for Abandonment

[Observed] State Backed onboarding example (Tier 1 — open source):

Three high-level states:
1. **Onboarding** (with substates for each step)
2. **Contextual Help** (parallel states for different help items)
3. **Regular Usage**

Transitions:
- Onboarding → Regular Usage: all steps completed
- Regular Usage → Onboarding: customer support reset (authorized via JWT claims)
- Regular Usage → Contextual Help: feature-specific triggers
- Any state → persisted: on every transition (enabling resume)

[Observed] XState/React Native implementation pattern (Kite Metric — Tier 2):
- Parallel states: separate `steps` and `onboarding` states synchronized during async operations
- Child machines: individual step machines spawned and cached for persistence across navigation
- Transitional state: `gettingUser` determines whether user proceeds to app or requires onboarding
- Authentication vs. onboarding stored in separate tables

---

### 2.2 Skip Logic

#### Which Steps Are Typically Skippable vs. Mandatory

[Observed] Based on analysis across multiple products and onboarding tool documentation:

| Step Type | Typically Mandatory | Typically Skippable | Rationale |
|-----------|-------------------|--------------------|----|
| Email verification | Yes | — | Required for account security |
| Password/auth setup | Yes | — | Required for access |
| Core activation action | Yes (but can be deferred) | — | Defines product value |
| Profile completion | — | Yes | Not blocking core value |
| Team invitation | — | Yes | Deferrable, but important |
| Integration setup | Depends on product | Yes | Some products require data connection |
| Notification preferences | — | Yes | Can use defaults |
| Use-case selection | Varies | Sometimes | Affects personalization quality |
| Payment info (during trial) | — | Yes (pre-trial) | Headspace collects email before payment |

#### What Happens When Steps Are Skipped

[Observed] Three downstream patterns:

**1. Deferred Nudge** (most common):
- "Complete your profile" persistent UI element
- Profile completion percentage displayed (e.g., "Your profile is 60% complete")
- LinkedIn model: "Profiles that are 100% complete get 5x more views" [Observed — LogRocket]
- Fogg Behavior Model application: Motivation (clear value communication), Ability (minimize required fields), Prompt (persistent but dismissible UI) [Observed]

**2. Degraded Experience**:
- Skipping use-case selection → generic (less personalized) product experience
- Skipping integration → empty states in dashboards that would otherwise show data
- Personalization lift from completing setup: 35% improvement in 7-day retention [Observed]

**3. Blocker Later**:
- Skipping KYC → restricted functionality until verified (fintech)
- Skipping team invite → features requiring collaboration are locked/grayed
- Skipping payment → trial expiration blocks access entirely

#### "Finish Setup" Patterns After Users Start Using Product

[Observed] Implementation patterns from Appcues, Chameleon (Tier 1 — product docs):

**Checklist UI**:
- Persistent floating beacon that expands to show task list
- Progress updates in real-time as items complete
- Three completion tracking methods:
  - Event-based (recommended): User performs specific action (click, page visit)
  - Property-based: User property changes
  - Click-based: User clicks checklist item
- Dismissed checklists hide for configurable duration (e.g., 168 hours/7 days)
- Completion triggers congratulations screen with customizable messaging

**Completion metrics** [Observed]:
- Average onboarding completion: 27% (median: 15%) for passive "Next button" tours
- Interactive onboarding (action-required progression): 25% activation lift without product changes
- Progress bars and checklists increase completion by 20-30%

[Inferred] The "complete your profile" nudge works best when it connects skipped steps to specific value the user has already experienced. "You've created 3 projects — invite your team to collaborate on them" is stronger than "Complete your profile."

---

### 2.3 Error States

#### Integration Failure Screens

[Observed] Error state design principles (Figr.design, DEV Community — Tier 2):

- **Specificity**: "Password must be at least 8 characters" not "Invalid input"
- **Recovery paths**: Retry option, fallback data, next steps clearly communicated
- **Inline validation**: Check input as user enters data (Stripe model) — prevents errors before submission
- **Accessibility**: Announce errors via screen reader, manage focus, use `aria-invalid` and `aria-describedby`

[Observed] Error states are "first-class scenarios, not edge cases." Products that treat errors as afterthoughts lose users at the exact moment of highest frustration.

#### KYC/Verification Rejection States

[Observed] KYC status state machine (EnKash documentation — Tier 1):

| Status | Substatus | UI State | Feature Access | User Action |
|--------|-----------|----------|---------------|-------------|
| Not Uploaded | — | Show onboarding prompts | None (or minimal) | Begin verification |
| Min KYC Verified | VKYC Pending | "Continue Verification" prompt | Min-KYC features only | Complete full verification |
| Pending | Created | "Resume KYC" | Restricted | Continue verification flow |
| Pending | Pending | "Under Review" message | Restricted | Wait (show estimated time) |
| Verified | — | Full access unlocked | All features | None required |
| Failed/Rejected | — | Rejection message + support guidance | Blocked | Contact support or re-submit |
| Redo | — | "Issues found" notification | Restricted | Re-trigger verification |

**Critical implementation rule**: Always evaluate Status + Substatus together — either value alone is insufficient. Support asynchronous updates via polling or webhooks, as KYC decisions are not instantaneous.

[Observed] Processing/waiting state screens (Incode developer docs — Tier 1):
- **Processing screen**: Full-screen loading with spinner and "Processing..." text
- **Failure screen**: Clear error icon + message, "Try again" CTA with configured retry limits
- **Form error state**: Invalid fields highlighted inline, Continue button disabled until corrected

#### Waiting/Processing States

[Observed] Typical KYC processing times: 2-3 days for manual verification. Users should wait up to 3 days before contacting support.

[Observed] Common messaging patterns:
- "Verification in progress" / "Under review" / "Processing"
- Estimated time frames when available
- Clear next-step guidance ("We'll email you when verification is complete")

[Uncertain] Specific "come back later" screen copy from major fintech apps was not available in sources. This is a gap — most documentation focuses on the technical state machine rather than the user-facing copy. Fintech onboarding drop-off ranges from 20-88% [Observed — Eleken], suggesting this is a critical area where better copy could have outsized impact.

**Best practice for waiting states** [Inferred from multiple sources]:
1. Show clear status ("We're reviewing your documents")
2. Provide time estimate ("This usually takes 1-2 business days")
3. Explain what happens next ("We'll send you an email when we're done")
4. Offer interim value ("While you wait, explore [limited feature]")
5. Provide support path ("Questions? Contact support at [link]")

---

### 2.4 Re-Onboarding

#### Tier Upgrade Onboarding

[Observed] Feature announcement patterns (UserGuiding, Userflow — Tier 2):

| Method | Description | Best For |
|--------|------------|----------|
| Launchers/Hotspots | Non-intrusive spotlights on new features | Minor upgrades, single-feature additions |
| Auto-start tours | Automatically triggered based on user segment + behavior | Plan upgrades, major feature releases |
| Interactive guides | Walk-through with required user actions | Complex features requiring hands-on learning |
| In-app announcements | Modal or banner with "What's new" content | Broad feature announcements |

[Observed] Advanced targeting for upgrade onboarding:
- Multi-dimensional segmentation: behavior + company data + product usage
- Account-level targeting: user-level and org-level segments
- Dynamic segmentation: real-time updates as attributes change
- Tour completion analytics with step-by-step drop-off analysis

#### Churned User Return (Different from New User)

[Observed] Key principles from LogRocket, Winsome Marketing, Retention.blog (Tier 2):

**Why different**: Returning users have prior product knowledge, existing mental models, and specific churn reasons. Treating them like new users wastes their time and ignores their context.

**Two-step winback process**:
1. **Nudge to return**: Share product improvements addressing churn reasons, use-case sensitive timing, retargeting ads
2. **Make them stick**: Dedicated re-onboarding flow, not the new-user flow

**Post-churn UX tactics**:
- "What's new since you left?" checklist UI [Observed]
- "Start over" option for users whose previous data is stale (Pinterest: clear browsing history and preferences) [Observed]
- Welcome-back modals with dismissible tooltips [Observed]
- Three-day consecutive visit target for re-retention [Observed]
- Special returning-user pricing (80% off is more effective than 20% off for winback) [Observed]

**Downgrade flow optimization** [Observed — LogRocket]:
Instead of fighting cancellation (which almost always fails), focus on keeping users at free tier:
- Cancellation confirmation screen: "You still have access to ABC" instead of "You lost access to XYZ"
- Post-cancellation email: Keep them engaged as free users
- ROI threshold: Invest in post-churn UX only if 300%+ ROI achievable

**When post-churn UX is NOT worth it** [Observed]:
- Short-term products (car marketplace — users naturally churn after purchase)
- Low margin per customer (cents per user makes winback negative ROI)

#### Feature Release Mini-Onboarding

[Observed] Patterns for major feature releases:

1. **Announcement**: In-app banner or modal highlighting new capability
2. **Segmented delivery**: Show only to users who would benefit (based on usage patterns)
3. **Interactive walkthrough**: 3-5 step guided tour of new feature
4. **Dismissal**: User can skip, but feature remains accessible
5. **Follow-up**: Email summary for users who didn't see in-app announcement

[Observed] Duolingo's approach for major redesigns: comprehensive video walkthrough shown to all returning users, preventing confusion from changed UI.

---

### 2.5 Completion + Transition

#### How Products Dismiss Onboarding UI

[Observed] Three dismissal patterns:

**1. Action-Based Auto-Dismiss** (recommended):
- Onboarding UI disappears when user completes target activation behavior
- No explicit "completion" moment — user naturally transitions to product
- Avoids the "onboarding completion ≠ activation" problem
- Used by Figma, Notion, and most PLG products

**2. Checklist Completion**:
- Congratulations screen with customizable message and success visual
- Can trigger follow-up experiences (Appcues: use checklist completion as targeting condition)
- Progress tracking persists until all items done
- Risk: users optimize for completion metrics rather than actual value

**3. Manual Dismiss**:
- User explicitly closes onboarding prompt
- Dismissed for configurable duration (typically 7 days) then can reappear
- Used for optional/supplementary onboarding elements

#### What Replaces Onboarding Prompts

[Observed] Post-onboarding transition patterns:

| Transition Target | Description | Used When |
|-------------------|------------|-----------|
| Feature discovery | Contextual tooltips for advanced features | User activated but hasn't explored full product |
| Usage summaries | Periodic email/in-app reports on value received | Building retention habit loop |
| Upsell prompts | "Unlock [Premium Feature]" | After user hits free-tier limits naturally |
| Community/education | Documentation links, community invites | Developer tools, complex products |
| Nothing | Clean product interface, no prompts | Products where activation = full value |

[Observed] The key insight from interactive onboarding research (Jimo — Tier 2): "Onboarding completion" is a misleading metric. Average completion rate is 27% (median 15%) for traditional tours. Measuring activation rate instead reveals whether onboarding actually drove product value.

#### Post-Onboarding State

[Observed] Three phases after onboarding completes:

1. **Early retention** (days 1-7): Usage summaries, milestone celebrations, "did you know?" tips
2. **Habit formation** (days 7-30): Periodic engagement nudges, feature expansion suggestions
3. **Steady state** (30+ days): Reduced communication, shift to value reporting and expansion opportunities

[Inferred] The transition from "onboarding emails" to "lifecycle emails" should be seamless. Users shouldn't notice a shift — the cadence should naturally decrease from 4-5 emails/week in week 1 to 1-2 emails/week by week 4 to weekly/biweekly in steady state.

---

### 2.6 Configuration-Specific Variations

#### State Machine Differences by Business Model

[Inferred from cross-analysis of all sources]

**B2B SaaS Self-Serve**:
- States: Signup → Email Verified → Intent Captured → First Value Action → Team Invited → Activated → Trial Converting → Paying
- Key edge states: Stuck at integration (trigger help), abandoned mid-setup (resume prompt), trial expiring (urgency sequence)
- Skip logic: Intent capture skippable (defaults to generic), team invite skippable (deferred nudge)

**B2B SaaS Sales-Led**:
- States: Deal Closed → Handoff Sent → Kickoff Scheduled → Kickoff Completed → Implementation In Progress → Training Complete → Go-Live → Adopted
- Key edge states: Kickoff not scheduled (escalation), implementation stalled (CSM intervention), champion departure (re-engagement)
- Skip logic: Minimal — structured process with human oversight at each stage

**B2C Subscription**:
- States: Signup → Trial Active → First Value Moment → Streak/Habit Established → Trial Converting → Subscribing → Active → At Risk → Churned → Resurrected
- Key edge states: Trial without activation (re-engagement), streak broken (recovery), churned (winback), resurrected (re-onboarding)
- Skip logic: Profile skippable, notification preferences skippable, but payment required for full access

**Fintech/Regulated**:
- States: Signup → Basic Info → Document Upload → Verification Pending → Verified/Rejected → Feature Access Granted → Activated
- Key edge states: Document rejection (re-upload guidance), verification pending (waiting state with interim value), partial verification (restricted access)
- Skip logic: Almost nothing skippable due to regulatory requirements

**Marketplace/Platform**:
- States: Signup → Side Selected (buyer/seller) → Profile Created → First Listing/First Browse → First Transaction → Repeat User
- Key edge states: Incomplete profile (profile completion nudge with value prop), no listings (seller coaching), no matches (demand-side engagement)
- Skip logic: Profile photo skippable but dramatically impacts visibility (5x more views when complete)

---

## Part 3: Copy Framework Extraction

---

### 3.1 Recurring Subject Line Formulas

[Observed] Formulas extracted from 50+ real subject lines across sources:

| Formula | Example | Use Case | Typical Open Rate |
|---------|---------|----------|------------------|
| `Your [Product] [noun] is ready` | "Your API key + quickstart" | Welcome/confirmation | 65-85% |
| `Welcome to [Product] + [bonus]` | "Welcome to [Product] + your CSM intro" | Enterprise welcome | 78-85% |
| `[Action verb]: [specific task]` | "Quick tip: create your first project" | Activation nudge | 50-62% |
| `[Name], [personal observation]` | "[Name], you created something" | Celebration | 55-65% |
| `Most [users/devs] miss this` | "Most users miss this feature" | Curiosity/FOMO | 48-55% |
| `[Number] days left: [question]` | "2 days left: need more time?" | Trial urgency | 50-60% |
| `How's your [timeframe]?` | "How's your first week going?" | Check-in | 45-52% |
| `[Verb] your [noun]?` | "Invite your team?" | Expansion prompt | 40-48% |
| `Day [N]: [task]` | "Day 1: Import your contacts" | Structured trial | 52-62% |
| `[Noun] with [X] get [Y]x more [Z]` | "Profiles with photos get 3x more views" | Completion nudge | 50-58% |

### 3.2 CTA Text Pattern Library

[Observed] Categorized CTA text extracted from real emails:

**Activation CTAs**:
- "Create Your First [Item] →"
- "Connect Data →"
- "Start Setup →"
- "Import Your Contacts"
- "Open [App] →"
- "Make Your First Call"

**Progress CTAs**:
- "Keep Going"
- "Continue Setup →"
- "Pick Up Where You Left Off"
- "Complete Your Profile →"
- "Browse Templates →"

**Conversion CTAs**:
- "Upgrade Now — Keep My Data"
- "Unlock [Feature]"
- "Start Your Plan"
- "See Pricing"

**Social/Team CTAs**:
- "Invite Your Team"
- "Share Your Work"
- "Send This Link"
- "Join Discord"

**Scheduling CTAs**:
- "Pick a Time"
- "Book Your Kickoff"
- "Schedule Your Call"

**Help CTAs**:
- "Browse Docs"
- "Watch the Guide"
- "Reply to This Email"

### 3.3 Error Copy Patterns

[Observed] Error copy framework:

**Validation errors**:
- Pattern: [Specific field] + [what's wrong] + [how to fix]
- Example: "Password must be at least 8 characters and include a number"
- Anti-pattern: "Invalid input" or "Error occurred"

**Integration failures**:
- Pattern: [What happened] + [why] + [what to do] + [fallback]
- Example: "We couldn't connect to your Salesforce account. This usually means your admin hasn't enabled API access. Ask your admin to enable API access, or try connecting a different CRM."

**Verification rejection**:
- Pattern: [Status] + [reason if available] + [next steps] + [support path]
- Example: "We weren't able to verify your identity with the documents provided. Please re-upload a clearer photo of your government-issued ID. If you continue to have trouble, contact support@[product].com."

**Processing/waiting**:
- Pattern: [Status] + [estimated time] + [what happens next] + [interim value]
- Example: "We're reviewing your application. This usually takes 1-2 business days. We'll email you as soon as it's approved. While you wait, explore our resource library."

### 3.4 Re-Engagement Copy Patterns

[Observed] Re-engagement copy categories:

**Welcome back** (app return):
- "Your story isn't finished…" (Fabulous)
- "Welcome back! Here's what's new since you left."
- "We're glad you're here. Let's pick up where you left off."

**Streak/habit recovery** (B2C):
- "Your Spanish is getting rusty" (Duolingo style)
- "You made Duo sad" (guilt-humor)
- "Just 3 minutes today" (friction reduction)
- "Your streak is waiting" (loss aversion)

**Product update nudge** (churned users):
- "We fixed [thing you complained about]"
- "[Number] new features since you left"
- "Remember [pain point]? We solved it."

**Trial extension**:
- "Need more time? We get it."
- "Your trial ended, but your data is still here."
- "Take another 7 days on us."

**Win-back sequence** (Rob Palmer framework):
- Day 15: "What happened?" — ask about experience, offer help
- Day 18: Customer story — someone who almost didn't convert but is now long-term
- Day 22: Extended offer — trial extension or discounted first month
- Day 30: Final email — clear deadline, then move to long-term nurture

---

## Research Gaps

The following areas had insufficient evidence for decision-grade conclusions:

1. **Specific Headspace/Netflix/Peloton email content**: Multiple sources reference these brands' onboarding strategies but no detailed email teardowns with exact subject lines and body copy were available. These are behind signup walls.

2. **Fintech "come back later" screen copy**: The technical state machine documentation is thorough, but actual user-facing copy for waiting/processing states in fintech apps was not findable. This requires direct product access.

3. **Quantified A/B test results for individual CTA phrases**: No source provided statistically significant comparisons of specific CTA button text variants (e.g., "Get Started" vs. "Create Your First Project").

4. **Enterprise multi-stakeholder email content**: While the routing logic is well-documented, actual email body templates for executive sponsors or IT admins were not available in any source.

5. **Onboarding state machine edge state handling in production**: The XState/OnboardJS documentation covers the technical implementation, but real-world production implementations with all edge states handled were not publicly documented in detail.

---

## Source List

1. [Email Mastery — Slack Email Marketing Teardown](https://emailmastery.org/teardown/slack-email-marketing-teardown/) — Tier 2
2. [Sequenzy — 10 Real SaaS Onboarding Sequences](https://www.sequenzy.com/blog/onboarding-email-sequence-examples) — Tier 2
3. [Rob Palmer — SaaS Email Onboarding Sequences](https://robpalmer.com/blog/saas-email-onboarding-sequences) — Tier 2
4. [Val Geisler — Calendly Email Onboarding Teardown](https://www.valgeisler.com/email-onboarding-tear-down-calendly/) — Tier 2
5. [Retention.blog — Win Back Users with Re-Onboarding](https://www.retention.blog/p/win-back-more-users-with-re-onboarding) — Tier 2
6. [Rosie Hoggmascall/UX Collective — Duolingo's 6-Step Reactivation](https://uxdesign.cc/duolingos-6-step-reactivation-experience-9ad65f04a569) — Tier 2
7. [Duolingo Blog — Resurrected Users](https://blog.duolingo.com/back-from-the-brink-what-duolingo-learned-about-its-resurrected-users) — Tier 1
8. [nGrow — Duolingo Push Notification Strategy](https://www.ngrow.ai/blog/decoding-duolingo-analyzing-the-effectiveness-of-their-push-notification-strategy) — Tier 2
9. [CleverTap — Headspace Onboarding Emails](https://medium.com/mobile-marketing-insights-by-clevertap/how-headspace-struck-gold-with-onboarding-emails-best-practices-for-retaining-new-users-64bd384c907c) — Tier 2
10. [Email Mastery — Headspace Email Teardown](https://emailmastery.org/teardown/the-headspace-email-marketing-teardown/) — Tier 2
11. [Customer.io — Monarch Money Case Study](https://staging-marketing.customer.io/learn/case-studies/monarch-money) — Tier 1
12. [Customer.io — Final Round AI Case Study](https://customer.io/learn/case-studies/final-round) — Tier 1
13. [Customer.io — Les Mills Case Study](https://customer.io/learn/lifecycle-marketing/les-mills-customer-engagement-strategy) — Tier 1
14. [Arrows.to — Sales to CS Handoffs in HubSpot](https://arrows.to/guide/how-to-run-customer-success-in-hubspot/sales-handoffs) — Tier 2
15. [IntegrateIQ — HubSpot Onboarding Process 2026](https://integrateiq.com/blogs/hubspot-onboarding-process/) — Tier 2
16. [Digital Applied — Client Onboarding Automation](https://www.digitalapplied.com/blog/client-onboarding-automation-crm-ai-workflows-reduce-churn) — Tier 2
17. [OnboardJS — Supabase Persistence](https://onboardjs.com/blog/supabase-onboarding-persistence-onboardjs) — Tier 1
18. [OnboardJS — Persistence Docs](https://docs.onboardjs.com/persistence) — Tier 1
19. [State Backed — Onboarding Example](https://docs.statebacked.dev/docs/examples/onboarding/) — Tier 1
20. [Kite Metric — React Native Onboarding with XState v5](https://kitemetric.com/blogs/react-native-onboarding-with-xstate-v5-a-step-by-step-guide) — Tier 2
21. [Stately — Persisting and Restoring State in XState](https://stately.ai/blog/2023-10-02-persisting-state) — Tier 1
22. [Appcues — Checklist Philosophy](https://docs.appcues.com/en_US/best-practices/the-checklist-philosophy) — Tier 1
23. [Appcues — Use a Checklist to Onboard Users](https://docs.appcues.com/en_US/user-experiences-use-cases/use-a-checklist-to-onboard-users) — Tier 1
24. [LogRocket — Post-Churn UX Design](https://blog.logrocket.com/ux-design/post-churn-ux-design/) — Tier 2
25. [LogRocket — Complete Your Profile UI](https://blog.logrocket.com/ux-design/complete-profile-ui-interaction) — Tier 2
26. [EnKash — KYC Status Handling Guide](https://docs.enkash.com/doc-1860546) — Tier 1
27. [Incode — Screens & States](https://developer.incode.com/docs/copy-of-screens-states) — Tier 1
28. [Figr Design — Error State Design Patterns](https://figr.design/blog/error-state-design-patterns-bfd69) — Tier 2
29. [Ayean's Studio — Figma Onboarding Activation](https://ayeansstudio.com/what-figmas-onboarding-teaches-us-about-activation/) — Tier 2
30. [Sender.net — 85+ Onboarding Email Subject Lines](https://www.sender.net/title/informational/onboarding-email-subject-lines/) — Tier 3
31. [Intercom — Create Effective Onboarding Series](https://docs.intercom.io/engaging-your-customers/onboard-new-users/create-an-effective-onboarding-campaign) — Tier 1
32. [AdoptKit — Onboarding Emails: Drip Campaigns](https://www.adoptkit.com/posts/onboarding-emails-drip-campaigns) — Tier 2
33. [Jimo — Interactive Onboarding Strategies 2026](https://jimo.ai/blog/interactive-onboarding-strategies-convert-users) — Tier 2
34. [Screensdesign — Fabulous Daily Habit Tracker](https://screensdesign.com/showcase/fabulous-daily-habit-tracker) — Tier 2
35. [The Onboarding Lab — Proactive Re-Onboarding](https://www.theonboardinglab.com/p/how-to-deliver-proactive-re-onboarding-to-increase-customer-lifetime-value) — Tier 2
36. [DesignRevision — SaaS Onboarding Best Practices 2026](https://designrevision.com/blog/saas-onboarding-best-practices) — Tier 2
37. [Encharge — 15 SaaS Email CTA Examples](https://encharge.io/saas-email-call-to-action/) — Tier 2
38. [Userlist — SaaS CTA Conversion Emails](https://userlist.com/blog/cta-conversion-emails-saas/) — Tier 2
