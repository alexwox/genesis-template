---
name: constructing-a-funnel
description: Design, instrument, and optimize conversion funnels for any business model. Routes to the right configuration (B2B sales-led, B2B PLG, B2C ecommerce, high-consideration application, local service, subscription continuity), then produces an explicit stage-by-stage build spec with measurement, compliance, benchmarks, tactics, and experiments. Supports optional format overlays (VSL, webinar, quiz, tripwire/OTO, product launch, sales letter, bridge) that modify stage maps and add format-specific events.
---

# Constructing a Funnel

## Purpose

Build or audit a conversion funnel from first click to retained customer. The output is always an actionable, stage-by-stage plan with event schemas, benchmark targets, compliance checks, and prioritized experiments — not a generic marketing framework.

Slash command: `/funnel`

---

## Trigger

Apply this skill when the user asks things like:

- "Help me build a funnel for X"
- "Tear down this competitor's funnel"
- "What should my funnel look like?"
- "Audit my conversion flow"
- "Why is my funnel leaking?"
- "How do I set up tracking for my funnel?"
- "Optimize my checkout / signup / lead flow"

---

## Step 1 — Collect Inputs

Before building anything, gather the following. Ask only for what is missing; use sensible defaults for the rest.

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Business goal | Determines funnel shape | Revenue growth |
| What you sell | Routes to configuration | — (must ask) |
| ACV or average order value | Sets benchmark band and sales motion | Infer from product type |
| Sales motion | Self-serve, sales-assisted, or enterprise | Infer from ACV |
| Primary traffic source | Determines top-of-funnel instrumentation | Paid ads |
| Geography / market | Determines consent and compliance surface | US, global |
| Current attribution stack | Determines measurement work needed | None (greenfield) |
| CAC payback target or gross margin | Constrains funnel shape and overlay decisions (Principle 6) | Infer from ACV and product type |
| Output mode | `quick_plan`, `deep_teardown`, or `build_checklist` | `quick_plan` |

---

## Funnel Design Principles

These principles govern every decision in Steps 2–6. Apply them before selecting a configuration or overlay. Each principle includes a procedure (what to do) and a worked example (how it looks in practice).

### Principle 1 — Belief-chain design

Each stage exists to shift the prospect from one awareness level to the next (Unaware → Problem Aware → Solution Aware → Product Aware → Most Aware). If a stage does not change a belief, it has no job. "The more aware your market, the easier the selling job, the less you need to say." (Eugene Schwartz, *Breakthrough Advertising*.)

**Procedure:** Before writing any stage spec, fill in this sentence pair:
- Entry belief: "Right now, the prospect believes ___."
- Exit belief: "After this stage, the prospect believes ___."

If you cannot fill both blanks, the stage is either unnecessary or under-defined.

**Worked example — Config D (telehealth weight loss, Medvi-style):**

| Stage | Entry belief | Exit belief |
|---|---|---|
| Ad | "I've tried diets and they don't work long-term." | "There's a medical approach I haven't tried that might be different." |
| Landing page | "Medical weight loss sounds expensive and complicated." | "This is simple, all-inclusive, and real doctors are involved." |
| Intake form | "I'm not sure I qualify or if this is right for me." | "I answered honestly and this program seems designed for someone like me." |
| Qualification gate | "Will they actually accept me?" | "I'm approved — this is real and personalized." |
| Checkout | "Is it worth the money?" | "The price is fair for what I'm getting, and there's no hidden risk." |

If you added a step between "Landing page" and "Intake form" (say, a long FAQ page), ask: what belief does it change that the landing page didn't already change? If the answer is "it repeats the same reassurance," merge it into the landing page — don't create a new stage for it.

### Principle 2 — Commitment escalation

Each stage must earn a progressively costlier commitment. Commitments are strongest when active, public, effortful, and freely chosen. Micro-commitment sequences produce 20–40% conversion lift across industries (Cialdini, *Influence*; Hashmeta 2026).

**Procedure:** List every stage and label the commitment type it asks for using this ladder: `click → answer → personal data → time → money → identity/public`. If two adjacent stages ask for the same commitment type, merge them. If a later stage asks for a lower commitment than an earlier one, reorder.

**Worked example — Config D commitment ladder:**

| Stage | What the prospect does | Commitment type | Escalation OK? |
|---|---|---|---|
| Ad click | Taps an ad | Click | — (start) |
| Landing page scroll | Reads, scrolls past fold | Attention/time | Yes (higher) |
| Intake Q1–Q2 | Answers "What is your goal?" and "Age range?" | Easy answers | Yes (higher) |
| Intake Q3–Q5 | Enters weight, health conditions | Personal data | Yes (higher) |
| Intake Q6 | Enters email + phone | Contact info | Yes (higher) |
| Checkout | Enters payment | Money | Yes (highest) |

**Counter-example (bad):** A funnel that asks for email on the landing page (personal data), then shows a quiz with easy yes/no questions (lower commitment), then asks for payment. The quiz de-escalates commitment after the email gate, which breaks consistency momentum. Fix: move the email ask to after the quiz, when the prospect has more invested.

### Principle 3 — Qualification as a filter, not friction

Not all drop-off is bad. A qualification step that removes unfit prospects improves downstream metrics. The test: can you name the specific later-stage metric the filter protects?

**Procedure:** For every qualification element (form field, gate, scoring rule), complete this sentence: "This filter protects ___ [downstream metric] by removing ___ [type of unfit prospect]." If you cannot complete it, the element is friction, not filtering — cut it or defer it.

**Worked example — Config D (telehealth):**

| Qualification element | Protects which downstream metric? | By removing whom? | Verdict |
|---|---|---|---|
| "What state do you live in?" | Fulfillment compliance (can't prescribe in unlicensed states) | Prospects in states where the service can't legally operate | Keep — legal requirement |
| "Current medications?" | Consultation close rate and patient safety | Prospects with contraindications who would be rejected by the doctor anyway | Keep — protects doctor time and patient safety |
| "How did you hear about us?" | Nothing downstream; this is attribution data | Nobody — it doesn't filter | Move to post-purchase or make optional; it adds friction at a high-stakes moment |

### Principle 4 — Narrative coherence

Aligned messaging across the funnel converts 31% more prospects and retains customers 23% longer (UserIntuition 2026). Messaging drift extends sales cycles ~40%. Customers retain 65–70% of information delivered as a story versus 5–10% as plain facts (SaaSLytic 2026).

**Procedure:** Before building any stages, define the narrative spine by filling in four slots:

1. **Promise:** The specific, time-bound outcome. (Not "better health" but "lose your first 5 lbs in 30 days under doctor supervision.")
2. **Enemy:** The specific thing standing in the way. (Not "bad habits" but "generic diets that ignore your hormones.")
3. **Mechanism:** How your offer uniquely solves it. (Not "our program" but "GLP-1 medication matched to your bloodwork by a licensed physician.")
4. **Proof type:** The dominant evidence pattern. (Not "testimonials" generically, but "before/after photos with verified timelines.")

Then check: does every stage use the same promise, enemy, mechanism, and proof type? If the ad talks about "hormones" but the landing page talks about "willpower," the narrative has reset. Fix the landing page to continue the hormone story.

**Single-Strike test:** Read the ad headline, the landing page H1, the checkout summary, and the first post-purchase email subject line in sequence. If a stranger could tell they're from the same campaign without seeing the logo, the narrative is coherent. If any one feels like a different company wrote it, fix that stage. (Adapted from Single-Strike Funnel framework, Playbook Newsletter 2025.)

### Principle 5 — Shortest viable path

Default to the fewest stages that preserve legal compliance and belief-chain completeness. The highest-performing funnels are rarely the most complex. Hormozi's core acquisition pattern is three steps. Practitioner research converges on 4–8 meaningful stages max (Kirro/FullSession).

**Procedure — the three-question gate:** For every proposed stage or overlay, answer all three:

1. **Belief:** Which specific doubt does this remove? (Name the doubt.)
2. **Qualification:** What do we learn about the prospect that we didn't know? (Name the data point.)
3. **Commitment:** What irreversible or costly action does this earn? (Name the action.)

If the answer is "nothing" on all three, cut the stage. If it scores on only one, ask whether that job can be absorbed into an adjacent stage.

**Worked example — should we add a webinar overlay to a Config D telehealth funnel?**

| Question | Answer |
|---|---|
| Belief | "Does this actually work?" — a webinar with a doctor explaining the science could shift this belief. But the landing page already has doctor credentials and before/after results. Marginal belief shift. |
| Qualification | Nothing new — webinar attendance doesn't tell us fit, budget, or medical history. |
| Commitment | Time (30–60 min), but it's passive time. The intake form already earns active commitment (personal health data). |

**Verdict:** The webinar scores weakly on belief and commitment, zero on qualification. The belief work is already done by the landing page. Adding the webinar inserts a 40–50% drop-off (show rate) into the funnel without adding information the business needs. Cut it — or test it as a retargeting asset for prospects who started but didn't finish the intake, not as a mandatory stage.

### Principle 6 — Economics as a design constraint

Funnel shape must be constrained by unit economics, not just conversion rates. A step that pumps volume but wrecks CAC payback is not an optimization. CAC payback = CAC / (ARPU x Gross Margin %). Target: under 12 months for SaaS, under 90 days for low-ticket ecommerce/info products.

**Procedure:** Before recommending an overlay or additional step, estimate its impact on CAC payback:
- Does this step add cost (ad spend, tooling, content production, staff time)?
- Does it shorten payback (by lifting conversion, raising AOV, or improving retention)?
- Net effect: does payback get shorter or longer?

**Worked example — adding a tripwire/OTO overlay to Config C (DTC skincare, $45 AOV):**

| | Without tripwire | With tripwire |
|---|---|---|
| CAC | $18 (paid social) | $18 (same traffic) |
| AOV | $45 | $45 + $12 order bump (30% take) + $25 OTO (8% take) = ~$52.60 blended |
| Gross margin | 65% | 63% (bump/OTO have slightly lower margin) |
| Payback | $18 / ($45 x 0.65) = 0.62 orders (instant) | $18 / ($52.60 x 0.63) = 0.54 orders (faster) |

The tripwire/OTO overlay adds ~$7.60 blended AOV and shortens payback. Worth adding. But if the OTO required a $5,000/month upsell tool and only lifted AOV by $2, it would lengthen effective payback. Run the numbers before committing.

### Principle 7 — One bottleneck at a time

Optimize the stage with the worst conversion relative to its benchmark band before adding new stages or overlays.

**Procedure:** Pull conversion rates for every stage transition. Compare each to the benchmark band for your configuration. The stage farthest below its band median is your bottleneck. Fix that before touching anything else.

**Worked example — Config C ecommerce store ($270K/mo revenue, 17K monthly visitors):**

| Stage transition | Actual | Benchmark median | Gap |
|---|---|---|---|
| Visit → PDP view | 62% | 40–60% | Above median (fine) |
| PDP → Add to cart | 5% | 8–15% | 50–67% below median |
| Cart → Checkout complete | 52% | 45–55% | At median (fine) |
| Overall site conversion | 1.8% | 1.4–3% | At median |

The bottleneck is PDP → Add to cart. The owner was considering adding a quiz overlay to help visitors find products. But the quiz adds a step before the broken stage. Fixing product page conviction (better photos, clearer pricing, social proof above the fold) doubled add-to-carts from 5% to 10% and doubled revenue to $540K/mo — no new steps needed. (Real case: FinestShops 2025.)

**Rule:** Don't add stages upstream of a broken stage. Fix the broken stage first.

---

## Step 2 — Select Configuration

Route to exactly one primary configuration. Each configuration has its own stage map, benchmark band, and compliance surface.

### Decision Logic

```
IF ACV > $5,000 AND multi-stakeholder buying:
  → B2B Sales-Led
ELIF self-serve signup/trial AND sales assist on upgrade:
  → B2B PLG / Hybrid
ELIF physical or digital product, cart-based checkout:
  → B2C Ecommerce
ELIF application/intake form → qualification → consult → purchase:
  → High-Consideration Application Funnel
ELIF local geographic service with booking/call CTA:
  → Local Service Funnel
IF any configuration uses recurring billing or negative option:
  → ALSO apply Subscription Continuity Overlay
THEN optionally select one format overlay (Step 2b):
  → VSL | Webinar | Quiz | Tripwire/OTO | Product Launch | Sales Letter | Bridge
```

### Configuration Reference

#### Config A: B2B Sales-Led

Typical ACV: $10K–$500K+. Buying committee of 6–13 stakeholders (Gartner). Non-linear journey across 6 buying jobs: problem identification, solution exploration, requirements building, supplier selection, validation, consensus creation. 75% of B2B buyers prefer rep-free experiences for familiar products, but high-quality deals are 1.8x more likely when digital tools are used alongside a rep (Gartner).

**95-5 Rule (LinkedIn B2B Institute / Ehrenberg-Bass):** At any moment only ~5% of your category is in-market. 95% are future buyers. Funnel must serve both demand capture (5%) and memory building (95%).

Stage map: `Impression → Content Engagement → Lead Capture → MQL → SQL → Opportunity → Closed Won → Onboarding → Expansion`

Key constraint: attribution window must be 90+ days. Dark funnel (unmeasured channels like podcasts, communities, word of mouth) is real — add self-reported attribution ("how did you hear about us?") alongside platform attribution.

**Outbound motion variant:** When the primary acquisition channel is outbound (cold email, LinkedIn, calling) rather than inbound ads, the top-of-funnel stages change from `Ad → Landing Page` to `Prospect List → Sequence (3–7 touches) → Reply → Meeting Booked → SQL`. Key metrics shift to reply rate (median 2–3.4%, top decile 5%+ for SaaS; signal-based personalization reaches 15–25%), meeting-booked rate (median 0.3–1%, top decile 2%+), and positive-reply ratio. Smaller targeted lists (50–300 contacts) outperform bulk sends by 3–4x. All downstream stages (SQL → Closed Won → Expansion) remain the same as the base Config A map.

#### Config B: B2B PLG / Hybrid

Typical ACV: $500–$25K. Self-serve signup with product-led activation and sales assist for expansion.

Stage map: `Visit → Signup → Activation → Engaged User → PQL → Trial-to-Paid → Expansion → Referral`

Key metrics: activation rate (median 28–38% depending on model, top quartile 65–75%), time-to-first-value (target < 12 minutes for winners), trial-to-paid (median 18.5%, but 49–60% with credit card required upfront).

Activation is the highest-leverage metric: every 10% improvement in activation rate yields ~7.3% improvement in paid conversion.

#### Config C: B2C Ecommerce

Typical AOV: $20–$500. Cart-based purchase flow.

Stage map: `Ad/Search → PDP View → Add to Cart → Checkout Start → Payment → Confirmation → Post-Purchase (review, repeat, referral)`

Key metrics: add-to-cart rate (8–15% of viewers), checkout completion (45–55% of carts), overall site conversion (median 1.4% Shopify, 2.5–3% global average, top 10% at 4.7–5.2%). Cart abandonment averages 67–70% (Baymard, 50+ study meta-analysis).

Top abandonment drivers: unexpected shipping costs (48%), forced account creation (26%), slow/complex checkout.

#### Config D: High-Consideration Application Funnel

Used by telehealth, finance, insurance, coaching, and other services where the buyer must qualify before purchasing. This is the Medvi-style funnel.

Stage map: `Ad/Content → Landing Page → Intake Form (multi-step) → Qualification Gate → Offer Presentation → Checkout/Booking → Onboarding → Retention`

Key tactics:
- Micro-commitment ladder (easy questions first, sensitive data later)
- Progress indicator (3–5 visible steps)
- Qualification theater (feels exclusive, but most qualify)
- All-inclusive pricing (reduce cognitive load)
- Trust front-loading (reviews/badges visible before form effort)

#### Config E: Local Service Funnel

Typical transaction: $100–$10K. Lead form or call CTA with booking emphasis.

Stage map: `Search/Ad → Landing Page → Lead Form or Click-to-Call → Booking/Scheduling → Show-Up → Close → Review/Referral`

Key metrics: landing page conversion (Google Ads average by industry ranges 2.9%–14.7%; WordStream 2024), speed-to-lead (respond within 60 seconds for 391% more conversions; >10 minutes loses 80%), show rate, close rate.

#### Config F: Subscription Continuity Overlay

Apply ON TOP of any other configuration when recurring billing or negative option is present.

Required by design:
- Clear disclosure of all material terms BEFORE collecting billing information (FTC Negative Option Rule / ROSCA)
- Express informed consent to recurring charges
- Cancellation mechanism at least as simple as signup ("click-to-cancel" principle)
- No forced live-agent cancellation if signup was self-serve
- Transparent billing cycle (monthly, 28-day, or annual — with clear disclosure)

Design implications: cancel flow must be accessible within 2 clicks from account dashboard. Exit surveys are allowed but cannot block cancellation. Save offers are allowed only if customer opts in to hear them.

**Cancellation / Save / Dunning stage map:** `Cancel Intent → Exit Survey (non-blocking) → Save Offer (opt-in only) → Confirm Cancel → Win-Back Sequence`. For payment failures: `Payment Failed → Silent Retry → Dunning Email Sequence → Card Update → Recovery or Churn`.

Save and recovery benchmarks:
- Failed-payment recovery rate: median 47.6% (Recurly 2023–24); enterprise SaaS ($10K+ ACV) 52–58%, mid-market 45–52%, SMB 38–47%, consumer subscriptions 35–42%
- Payment failures account for up to 48% of all churn; involuntary churn represents 20–40% of total churn
- Silent retry recovers 21% of failures before any customer contact; first explicit retry recovers 30–40%
- Day-of-failure dunning email achieves 13.25% recovery rate; 42% of all recovery happens after day 14
- Best practice: 3–5 dunning emails over 28–30 days with direct card-update link
- Automated dunning delivers 10–16x ROI; AI-powered systems achieve 70–85% recovery vs 50–60% manual

Non-negotiable events for this overlay:
1. `cancel_initiated` — user clicked cancel or visited cancel page
2. `save_offer_presented` / `save_offer_accepted` — save offer shown and outcome
3. `cancel_confirmed` — cancellation completed
4. `payment_failed` / `dunning_email_sent` / `card_updated` — payment recovery sequence
5. `winback_email_sent` / `winback_reactivated` — post-cancel re-engagement and reactivation

---

### Step 2b — Select Format Overlay (Optional)

After choosing a primary configuration, optionally select one format overlay based on the primary conversion surface. Overlays modify stage maps and add format-specific events and metrics. They do not replace the business-model configuration — they layer on top of it. Select at most one.

**Before selecting an overlay, apply the three-question gate (Principle 5).** For the proposed overlay, answer: (1) which specific belief does it shift that the base stages don't already handle? (2) what new qualification data does it produce? (3) what commitment does it earn that an existing stage doesn't? If the base configuration stages already cover belief, qualification, and commitment adequately, no overlay is needed — skip this step entirely.

#### Format Overlay Decision Logic

```
IF primary persuasion happens via long-form video with timed CTA:
  → VSL Overlay
ELIF education/demo event with registration and live attendance:
  → Webinar / Live Event Overlay
ELIF segmentation quiz or assessment drives personalized recommendation:
  → Quiz / Assessment Overlay
ELIF low-ticket front-end offer with post-purchase upsell/downsell chain:
  → Tripwire / OTO Chain Overlay
ELIF time-bounded launch with pre-launch content sequence:
  → Product Launch Overlay
ELIF single scrolling direct-response sales page is the conversion surface:
  → Long-Copy Sales Letter Overlay
ELIF intermediate warm-up page sits between traffic source and core offer:
  → Bridge / Pre-Sell Overlay
ELSE:
  → No overlay needed; base configuration stages are sufficient.
```

#### Overlay 1: VSL (Video Sales Letter)

The video IS the sales page. Persuasion, objection handling, and CTA delivery happen inside the video, not around it. Stage map modification: insert `Video Watch` between landing page and checkout/CTA. The 8–20 minute format outperforms 45+ minute VSLs by ~30% for cold social traffic; 70%+ of views happen on mobile.

**Non-negotiable events:**
1. `video_play` — visitor pressed play (fire on both client and server)
2. `video_25pct` / `video_50pct` / `video_75pct` / `video_complete` — quartile watch milestones
3. `video_pitch_reached` — viewer reached the offer/pitch timestamp
4. `video_cta_clicked` — CTA clicked (may be time-gated or revealed after pitch)
5. `video_replay` — viewer restarted or re-watched a section

**Key metrics:** play rate (target >90% of page visitors), average watch percentage (target >60%), pitch-reach rate, viewer-to-CTA-click rate. VSLs convert 20–50% higher than text-only funnels; best B2B SaaS VSLs convert 15–25% of qualified viewers.

**Leak fixes:**
- Low play rate → autoplay (muted) with compelling thumbnail and captions; reduce above-fold distractions
- Watch drop-off before pitch → front-load a curiosity hook in the first 30 seconds; tighten pre-pitch narrative
- High pitch-reach but low CTA click → offer or price mismatch; test different offers or add risk reversal at the CTA moment

**Compliance note:** all claims made verbally in the VSL are subject to the same FTC/FDA scrutiny as written claims. Maintain a transcript with timestamped claim audit.

#### Overlay 2: Webinar / Live Event

Register → remind → attend → replay → offer. Show rate and pitch-hold dominate all other metrics. Stage map modification: insert `Registration → Reminder Sequence → Live Attendance / Replay → Offer Presentation → Post-Event Follow-Up` into the consideration/nurture phase.

**Non-negotiable events:**
1. `webinar_registered` — registration form submitted
2. `webinar_reminder_opened` — email/SMS reminder opened (per reminder)
3. `webinar_attended_live` — joined live session
4. `webinar_replay_viewed` — watched replay (with quartile milestones)
5. `webinar_offer_presented` — reached the pitch/offer section (live timestamp or replay milestone)
6. `webinar_cta_clicked` — clicked offer CTA during or after event

**Key metrics:** registrant-to-live-attendance (median 40–50%, top quartile 62%+), on-demand reclaim within 72 hours (47% of total views), attendee-to-lead rate (20–40%; interactive webinars hit 38% MQL rate vs 19% passive), attendee-to-customer (5–20%; educational formats convert at 25% vs 11% for sales demos). Best day/time: Wednesday at 2 PM local. Post-event 4-touch email sequence converts at 17.4% vs 9.1% single email.

**Leak fixes:**
- Low show rate → 3-touch reminder sequence (24h, 1h, 15min before); optimize day/time for audience timezone
- High attendance but low pitch hold → front-load value in first 15 minutes; tease the offer throughout instead of a hard pivot
- Low post-webinar conversion → implement 4-touch post-event email sequence with replay access, objection handling, and deadline

#### Overlay 3: Quiz / Assessment

Segmentation + personalized result → offer. The prospect answers questions to learn about themselves, and the result page creates a personalized bridge to the offer. Stage map modification: replace or supplement the lead-capture form with `Quiz Start → Quiz Complete → Result Page (personalized) → Offer/CTA`.

**Non-negotiable events:**
1. `quiz_started` — first question answered
2. `quiz_question_N` — each question answered (for per-question drop-off analysis)
3. `quiz_completed` — all questions answered
4. `quiz_lead_captured` — email/info submitted (usually gated before results)
5. `quiz_result_viewed` — result/recommendation page loaded (include segment ID as event property)
6. `quiz_cta_clicked` — clicked through to offer from result page

**Key metrics:** start-to-complete rate (median 65%, mobile-optimized 83%+), start-to-lead-capture rate (median 34–40%, top quartile 50%+). Quizzes convert at ~17x the rate of static forms (47.3% vs 2.8%). Keep to 5–8 questions with a progress bar. Cold traffic quiz funnels convert at up to 28% with sub-second page loads.

**Leak fixes:**
- High start but low completion → too many questions or unclear progress; cut to 5–7 questions max
- Completion but low lead capture → gate placement wrong; test gating before results vs after
- Low result-page-to-CTA click → result doesn't connect the diagnosis to your offer; rewrite bridge copy on the result page

#### Overlay 4: Tripwire / OTO Chain

A low-ticket front-end product (typically $1–$47) acquires the customer and recovers ad spend, followed by immediate one-click upsells and downsells. Stage map modification: insert `Tripwire Offer → Order Bump → One-Click Upsell (OTO1) → Downsell (if declined) → OTO2` after initial purchase intent.

**Non-negotiable events:**
1. `tripwire_purchased` — initial low-ticket item bought
2. `order_bump_shown` / `order_bump_accepted` — bump offered and taken at checkout
3. `oto1_shown` / `oto1_accepted` — first one-click upsell shown and accepted
4. `oto1_declined` → `downsell_shown` / `downsell_accepted` — downsell offered if upsell declined
5. `oto_sequence_completed` — buyer exited the chain (fire with final AOV as event property)

**Key metrics:** order bump take rate (median 25–30%, top quartile 37%+), one-click upsell acceptance (median 4–8%, top performers 15–25%), total AOV lift from chain (typically 10–30%). Significant device gap: desktop 28.9% vs mobile web 18.7% for upsell acceptance; mobile app 31.4%.

**Leak fixes:**
- Low order bump take → bump not related to core purchase or priced too high; keep bump at 30–60% of tripwire price
- Low OTO acceptance → offer doesn't follow logically; the OTO should solve the next problem revealed by the tripwire
- Cart abandonment on tripwire itself → price too high or payment friction; test $1 trial or simplified payment

**Compliance note:** pre-checked upsell boxes are a compliance/reputation risk (FTC). Each OTO must have a clear "no thanks" option with explicit price disclosure.

#### Overlay 5: Product Launch (Open–Close Cart)

A time-bounded conversion event with pre-launch content building desire before the cart opens. Urgency is structural (the cart literally closes), not manufactured. Stage map modification: replace steady-state checkout with `Pre-Launch Content (PLC 1–3) → Cart Open → Urgency Window → Cart Close → Waitlist`.

**Non-negotiable events:**
1. `launch_registered` — signed up for launch sequence / waitlist
2. `plc_consumed` — pre-launch content piece consumed (per piece, with engagement depth)
3. `cart_open_visited` — visited sales page during open window
4. `cart_purchased` — purchased during window (capture timestamp relative to open/close)
5. `cart_close_waitlisted` — attempted purchase after close, added to next-launch waitlist

**Key metrics:** launch-list-to-buyer conversion (practitioner range 2–10% depending on list warmth and price point; Uncertain), PLC consumption rate per piece, urgency-window conversion curve (most sales cluster in first 24h and last 24h of window).

**Leak fixes:**
- Low PLC consumption → content too long or lacks curiosity hooks; tighten and add cliffhangers pointing to the offer
- Traffic during window but low conversion → offer-audience mismatch or price shock; pre-launch content must pre-sell the transformation and anchor the price
- Flat mid-window sales → add a mid-window bonus or stack element to reignite urgency

#### Overlay 6: Long-Copy Sales Letter

A single scrolling direct-response page where the copy IS the funnel. No multi-step forms or separate pages. Consistently outperforms short copy for complex offers and cold traffic in decades of split-test data. Stage map modification: the letter replaces multi-step flow; instrument scroll depth and section engagement instead of step progression.

**Non-negotiable events:**
1. `letter_landed` — page loaded
2. `letter_scroll_25` / `letter_scroll_50` / `letter_scroll_75` / `letter_scroll_100` — scroll depth quartiles
3. `letter_cta_visible` — first CTA scrolled into viewport
4. `letter_cta_clicked` — CTA clicked (track which CTA position: top, mid, bottom)
5. `letter_engaged_time` — total engaged time (use Intersection Observer or heartbeat ping, not raw session duration)

**Key metrics:** scroll-depth distribution (identify the "attention cliff" where most visitors drop), CTA visibility rate (what % of visitors ever see a CTA), engaged time-on-page. Headline A/B tests yield up to 34% conversion lift; CTA placement tests yield up to 21% lift.

**Leak fixes:**
- Steep scroll drop-off at 25% → opening hook or above-fold content fails to earn the scroll; rewrite headline and lead section
- Good scroll depth but low CTA clicks → CTA copy or placement wrong; test mid-page CTA insertions and sticky/floating CTAs
- Long time-on-page but low conversion → letter builds desire but fails to close; strengthen close section with risk reversal, urgency, and proof stacking

#### Overlay 7: Bridge / Pre-Sell Page

An intermediate page between the traffic source and the core offer. Common in affiliate funnels, advertorial campaigns, and paid social where the prospect needs narrative warm-up before seeing a direct sales page. Stage map modification: insert `Bridge Page` between traffic source click and main landing page/offer.

**Non-negotiable events:**
1. `bridge_landed` — bridge page loaded
2. `bridge_engaged` — meaningful interaction (scroll past 50%, video play, or link click)
3. `bridge_cta_clicked` — clicked through to main offer
4. `bridge_to_conversion` — converted on main offer (attribute back to bridge variant for optimization)

**Key metrics:** bridge engagement rate (scroll depth or interaction rate), bridge-to-main-page click-through rate, and downstream conversion rate of bridge-warmed traffic vs direct traffic (the bridge should lift main-page conversion by pre-framing the prospect).

**Leak fixes:**
- Low bridge engagement → content doesn't match the ad hook that drove the click; mirror the ad's promise in the bridge headline
- High engagement but low click-through → CTA is buried or the bridge tells the full story without creating a reason to click through
- Bridge traffic converts lower than direct → the bridge is cooling the prospect; cut it or redesign as story/case-study format

---

## Step 3 — Build Stage-by-Stage Spec

For the selected configuration, build each stage using this template:

### Per-Stage Spec Template

```
Stage: [name]
Entry belief: [what the prospect believes when they arrive at this stage — Principle 1]
Exit belief: [what they must believe to advance to the next stage — Principle 1]
Commitment earned: [what irreversible action this stage asks for — Principle 2]
Purpose: [what job this stage does for the buyer AND for the business]
Entry criteria: [what qualifies someone to enter this stage]
Exit criteria: [what must happen for them to advance]
Primary metric: [the one number that defines this stage's health]
Benchmark band: [low / median / good / top-quartile range]
Key events to fire: [list of analytics/ad-platform events]
Top 3 tactics: [ranked by impact, with risk classification]
Top 3 leak points: [where drop-off happens and why]
Diagnostic questions: [what to check if metric is below band]
```

### Stage-by-Stage Playbook: Tactics and Leak Fixes

#### Attention Stage (all configs)

Tactics:
1. Hook-first creative: lead with outcome, not brand (conversion hygiene)
2. Awareness-stage matching: match copy to prospect awareness level (conversion hygiene)
3. Affiliate/performance channel layering: use CPA-based acquisition to cap risk (aggressive but common)

Leak fixes:
- Low CTR → test 5+ hook variants per week; refresh creative every 2–4 weeks before fatigue
- High CPM with low CTR → audience targeting is too broad or creative is generic
- Platform disapprovals → maintain an approved claims library and a banned-phrase list

#### Qualification / Lead Capture Stage

Tactics:
1. Micro-commitment sequence: start with lowest-friction question (conversion hygiene)
2. Pre-fill fields from platform data where available (LinkedIn Lead Gen Forms achieve 6–13% vs 2–5% for external landing pages) (conversion hygiene)
3. Progress indicator with 3–5 visible steps (conversion hygiene)

Leak fixes:
- High page views but low form starts → value proposition unclear; add "what you'll get" above form
- High form starts but low completions → too many fields or sensitive data requested too early
- Mobile drop-off → switch dropdowns to tappable buttons/chips; reduce form fields to 3–4 max

#### Consideration / Nurture Stage

Tactics:
1. Lead magnet that reveals a problem and leads to your offer (see `lead-magnet-creation` skill) (conversion hygiene)
2. Social proof injection: real testimonials, case studies, third-party review badges (conversion hygiene)
3. Retargeting with objection-specific creative (aggressive but common)

Leak fixes:
- Low email open rates → subject line testing + send-time optimization
- Low MQL-to-SQL conversion → scoring model misaligned with actual buyer behavior; audit with sales
- Long consideration cycle (B2B) → add interactive tools (ROI calculators, comparison builders) to accelerate confidence

#### Commitment / Checkout Stage

Tactics:
1. All-inclusive pricing: bundle consult, shipping, support into one number (conversion hygiene)
2. Risk reversal: money-back guarantee, free trial, or performance guarantee (conversion hygiene)
3. Urgency mechanics: cohort deadlines, limited spots, introductory pricing (aggressive but common)
4. One-page checkout or single-modal checkout instead of multi-step (conversion hygiene — Shopify one-page checkout = 18% lower abandonment)
5. Guest checkout as default, account creation deferred to post-purchase (conversion hygiene — 26% of abandonments are from forced account creation)

Leak fixes:
- Price shock at checkout → show price range earlier in funnel or on landing page
- Payment friction → offer multiple payment methods (credit card, PayPal, Apple Pay, Shop Pay — Shop Pay = 1.72x conversion lift)
- Coupon code field sending users away to search → auto-apply codes from ad UTMs or hide field behind a toggle

Risk-classified tactics for this stage:
- Auto-checked upsell boxes: compliance/reputation risk
- Dark patterns in cancel flow: compliance/reputation risk (FTC enforcement active under ROSCA even without Click-to-Cancel rule)
- AI-generated testimonials: compliance/reputation risk (FDA, FTC, platform policy violations)

#### Confirmation / Post-Conversion Stage

The moment after conversion is the highest-converting surface in the entire funnel. The visitor is at peak trust, peak post-decision rationalization, and peak behavioral momentum. Confirmation page secondary actions convert at 10–15% vs 2–4% for pre-purchase pop-ups (Observed — Cart-X 2026). A store doing $100K/month that ignores this stage leaves $10K–$15K/month on the table.

Tactics:
1. Single secondary CTA that naturally extends the primary commitment: referral, cross-sell, or next-step action. Pages with one CTA convert at 2–3x vs multiple competing CTAs (conversion hygiene)
2. Expectation-setting above the fold: what happens next, when, and how. Eliminates post-conversion anxiety and reduces support tickets (conversion hygiene)
3. Decision reinforcement: social proof, customer count, or testimonial confirming the visitor made a good choice. Activates post-decision rationalization in the business's favor (conversion hygiene)
4. Celebration animation for high-effort completions: confetti or success animation when the user completed a genuine goal (first deployment, first listing, multi-step application). Must pass the Ramsey Test: "This celebration marks ___. The user's goal was ___. Are these the same?" (conversion hygiene)
5. Contextual cross-sell recommendation: products that complete or enhance the original purchase, not generic recommendations. Pair with urgency (countdown) and free shipping hooks (aggressive but common)
6. Referral prompt at peak trust: "Share with a friend, get $X off" — ask within 72 hours for 3–5x ROI vs later asks. Double-sided incentives drive 3.2x higher referral rates (aggressive but common)

Leak fixes:
- Blank "Thank you" page with no secondary action → the highest-trust moment wasted; add the 4-layer structure (confirmation + expectations + single CTA + reinforcement)
- Multiple competing CTAs → dilutes action; use exactly one primary secondary CTA; de-emphasize additional actions visually
- No expectation-setting → creates anxiety, buyer's remorse, cancellation, and support tickets; add two-bullet "what to expect" section
- SaaS: static confirmation instead of redirect to product → squanders behavioral momentum; redirect to onboarding immediately unless async setup is required
- Celebration on trivial or intermediate action (account creation, email verification, wizard step 3 of 7) → feels cheap, contradicts user's actual goal; only celebrate when the event IS the user's goal completion
- Generic cross-sell (unrelated products) → breaks the cognitive frame of the purchase; only recommend complements to the original purchase
- No `noindex` on confirmation page → search engines may index, creating tracking issues; add `<meta name="robots" content="noindex">`

Diagnostic questions:
- Is the secondary CTA conversion rate below 5%? → The CTA may not feel like a natural extension of the primary commitment; reframe to connect to the visitor's interest, not the company's
- Are support tickets spiking post-conversion? → Expectation-setting is missing or unclear; audit the "what happens next" copy
- Is buyer's remorse driving refunds? → Decision reinforcement is absent; add social proof and reassurance immediately after conversion

#### Activation Stage (post-purchase / post-signup)

Tactics:
1. Time-to-first-value acceleration: get the user to the core "aha" moment within minutes, not days (conversion hygiene)
2. Onboarding checklist with progress tracking (conversion hygiene)
3. Personalized welcome sequence: 3–5 emails in first 7 days, triggered by behavior not calendar (conversion hygiene)

Leak fixes:
- Low activation rate → identify the specific drop-off step in onboarding and reduce friction there
- Day-1 churn → mismatch between ad promise and product reality; audit messaging consistency
- For SaaS: if activation doesn't happen within 3 days, probability drops 68% — trigger intervention

#### Retention Stage

Tactics:
1. Usage-drop intervention: trigger outreach at first decline in engagement, not after cancellation (conversion hygiene)
2. Community and peer engagement: retained users who interact with other users churn less (conversion hygiene)
3. Abandoned cart / abandoned browse recovery flows: average 50.5% open rate, 3.33% conversion rate, $3.65 RPR (Klaviyo 2024); top 10% achieve $28.89 RPR (conversion hygiene)

Leak fixes:
- Early churn spike (month 1–2) → onboarding failure, not retention failure; fix activation
- Steady-state churn → value delivery degrading over time; measure and show progress to customers
- Involuntary churn (failed payments) → implement dunning sequences with 3–5 retry attempts + customer notification

#### Expansion Stage

Tactics:
1. Upsell the next logical problem: "more of" or "more help with" what they already bought (conversion hygiene)
2. Cross-sell adjacent products at natural journey moments (conversion hygiene)
3. Referral program tied to genuine goodwill, not just incentive widgets (conversion hygiene)

Leak fixes:
- Low upsell take rate → offer not aligned to next problem; interview best customers to find it
- Referrals not compounding → product experience doesn't create enough surplus value for reputation-staking
- NRR below 100% → contraction exceeds expansion; prioritize save flows and downsell paths

**Referral loop architecture:** When referral is a meaningful growth lever (not just a tactic bullet), treat it as a self-reinforcing loop with its own metrics. K-factor (viral coefficient) = invites sent per user x conversion rate of those invites. Consumer products: 0.15–0.25 is good, 0.4 is great, 0.7 is outstanding; B2B SaaS: above 0.2 is quite good; above 1.0 drives exponential growth. Double-sided incentives (rewarding both referrer and referred) drive 3.2x higher referral rates than single-sided. Referral participation rates average 16–29%. Referred customers convert at 10.6% (B2B) to 13.8% (ecommerce) vs 1.7% for outbound.

Non-negotiable referral events: `referral_invite_sent`, `referral_invite_opened`, `referral_signup_completed`, `referral_reward_earned` (both sides). Track K-factor weekly and segment by cohort to detect decay.

---

## Step 4 — Attach Measurement and Compliance

### 2026 Measurement Non-Negotiables

Every funnel must implement ALL of the following. If any are missing, flag as a critical gap.

#### 1. Server-Side Event Delivery

Pixel-only setups miss 20–30% of conversions due to iOS privacy, ad blockers, and cookie restrictions.

**Meta:** Implement Conversions API (CAPI) alongside Meta Pixel in a redundant setup. Share the same events from both browser and server. Deduplicate using matching `event_id` parameters. Target 75%+ event coverage ratio (CAPI-to-Pixel). Target Event Match Quality (EMQ) score of 6.0+ (ideally 8.0+) by including hashed email, phone, and customer info.

**Google:** Implement Enhanced Conversions for Web (hashed first-party data from conversion pages) AND Enhanced Conversions for Leads (hashed data matched to offline conversion imports). Use SHA-256 hashing. Allow 30 days for model training before evaluating impact.

**LinkedIn:** Use Conversions API with `conversionMethod: CONVERSIONS_API`. Stream events with hashed email and LinkedIn first-party tracking UUID. Batch up to 5,000 events per request.

#### 2. Event Deduplication

When running both client-side and server-side, deduplication is mandatory.

**Meta:** Use matching `event_id` on Pixel (`fbq('track', 'Purchase', {...}, {eventID: 'EVENT_ID'})`) and CAPI (`event_id` field). Events are deduplicated within 48 hours.

**Google:** Enhanced Conversions deduplicates automatically when the same conversion action receives both tag-based and API-imported data.

**LinkedIn:** Use `eventId` field in conversion event payload to prevent double-counting.

#### 3. Consent Management (Required for EEA/UK, Recommended Globally)

Implement Google Consent Mode v2 with Advanced mode (recommended over Basic mode for advertiser-specific conversion modeling).

Four required consent parameters:
- `ad_storage` — advertising cookies
- `ad_user_data` — sending user data to Google
- `ad_personalization` — remarketing and similar audiences
- `analytics_storage` — GA4 analytics cookies

When consent is denied, tags send cookieless pings for modeled conversion recovery. Advanced mode provides significantly better modeling than Basic mode.

**For non-EEA markets:** still implement consent infrastructure as a defensibility measure; US state privacy laws are expanding.

#### 4. UTM Governance and First-Party Identity

Enforce a UTM naming convention: `{service}_{channel}_{campaign}_{medium}_{content}`.

Build a five-layer tracking stack:
1. Intent pages with UTM-tagged inbound links
2. GA4 event tracking on key conversion actions
3. Server-side signals (CAPI / Enhanced Conversions)
4. CRM linkage (connect ad click IDs to downstream revenue)
5. Self-reported attribution field ("How did you hear about us?") for dark funnel capture

#### 5. Offline Revenue Join (B2B and High-Consideration)

For funnels where the purchase happens outside the browser (phone close, in-person, delayed decision):
- Capture GCLID / FBCLID / li_fat_id at lead capture
- Store in CRM alongside hashed email
- Import closed-won revenue back to ad platforms within 90 days (Google limit) via Enhanced Conversions for Leads or Meta Offline Conversions

### Compliance Checklist

Run this checklist for every funnel before launch:

- [ ] Health claims: no unsubstantiated efficacy claims; no "no side effects" language (FTC + FDA)
- [ ] Testimonials: only real customers with documented consent; no AI-generated transformation photos
- [ ] Pricing: all material terms disclosed before collecting billing info
- [ ] Subscription: cancellation as easy as signup; no forced live-agent cancellation if signup was self-serve
- [ ] HIPAA (if health): BAAs with every vendor in marketing stack; no PHI in ad pixels
- [ ] Affiliate disclosure: FTC-compliant disclosure on all affiliate content
- [ ] Ad platform policies: maintain approved claims library; pre-review creative before publish
- [ ] Privacy: consent banner deployed; Consent Mode v2 active if serving EEA/UK traffic

---

## Step 5 — Apply Benchmarks and Risk Labels

### Benchmark Bands by Configuration

Benchmarks are ranges, not targets. Use them for diagnosis, not as goals.

#### B2B Sales-Led Benchmarks

| Stage | Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|---|
| Visitor → Lead | Conversion rate | <0.5% | 0.7–1.4% | 2–3% | 5%+ | High (Pavilion 2025, multiple) |
| Lead → MQL | Qualification rate | <30% | 39–41% | 45–50% | 55%+ | High (Pavilion 2025) |
| MQL → SQL | Acceptance rate | <20% | 31–39% | 40–45% | 50%+ | High (Pavilion 2025) |
| SQL → Closed Won | Close rate | <15% | 31–39% | 40%+ | 44%+ | High (Pavilion 2025) |
| Speed to lead | First response time | >10 min | 5–10 min | 1–5 min | <60 sec | High (multiple sources) |

#### B2B PLG Benchmarks

| Stage | Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|---|
| Visit → Signup | Website conversion | <2% | 3–6% | 7–10% | 15%+ | Medium (OpenView) |
| Signup → Activated | Activation rate | <20% | 28–38% | 40–55% | 65–75% | High (OpenView / 1Capture) |
| Trial → Paid (no CC) | Conversion rate | <10% | 18–25% | 25–35% | 35–45% | High (1Capture 2025, 10K+ companies) |
| Trial → Paid (CC required) | Conversion rate | <40% | 49–60% | 55–65% | 60–70% | High (1Capture 2025) |
| Freemium → Paid | Conversion rate | <1% | 2.6% | 5% | 10%+ | Medium (OpenView) |
| Time to first value | Minutes | >30 min | 22 min | 12 min | <8 min | Medium (1Capture 2025) |

Note: trial-to-paid conversion decreases as ACV increases. At <$500 ACV median is 22%; at $10K–$100K+ it drops to 5–11%.

#### B2C Ecommerce Benchmarks

| Stage | Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|---|
| Browse → PDP View | Browse rate | <30% | 40–60% | — | — | Medium (Growth Suite) |
| PDP → Add to Cart | ATC rate | <5% | 8–15% | 12–18% | 18%+ | Medium (Growth Suite / Baymard) |
| Cart → Checkout Complete | Completion rate | <35% | 45–55% | 55–65% | 65%+ | High (Baymard / Shopify) |
| Overall site conversion | Conv rate | <1% | 1.4–3% | 3.1–3.5% | 4.7–5.2% | High (Shopify / Unbounce) |
| Cart abandonment | Abandonment rate | — | 67–70% | — | — | High (Baymard, 50+ studies) |
| Abandoned cart email | Placed order rate | <2% | 3.33% | 5–6% | 7.69% | High (Klaviyo 2024, 143K flows) |

#### Landing Page Benchmarks (Cross-Configuration)

| Metric | Low | Median | Good | Top Quartile | Source |
|---|---|---|---|---|---|
| Landing page conv rate (all industries) | <3% | 6.6% | 10%+ | 11.4%+ | Unbounce Q4 2024 (41K pages) |
| Google Ads conv rate (all industries) | <3% | 7.52% | 10%+ | 12%+ | WordStream 2024 |
| LinkedIn Lead Gen Forms | <4% | 6–8% | 8–11% | 13%+ | LinkedIn / LeadsMonky 2026 |

#### Format Overlay Benchmarks

##### VSL Overlay

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| Play rate (of page visitors) | <60% | 70–80% | 80–90% | 90%+ | Inferred (Conversionly / multiple) |
| Average watch % | <30% | 40–50% | 55–65% | 70%+ | Uncertain (varies by length) |
| Qualified viewer → customer (B2B SaaS) | <5% | 8–12% | 15–20% | 25%+ | Inferred (Joyspace 2026) |
| Conversion lift vs text-only | — | 20–30% | 30–40% | 50%+ | Inferred (multiple practitioner sources) |

##### Webinar Overlay

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| Registrant → live attendance | <25% | 40–50% | 50–55% | 62%+ | Observed (Wave Connect / Contrast 2026, 500K+ registrants) |
| On-demand reclaim (72h) | <30% | 47% | 60–70% | 89% | Observed (Amra & Elma 2025) |
| Attendee → MQL (interactive) | <15% | 20–25% | 30–38% | 47%+ | Observed (Amra & Elma 2025) |
| Attendee → customer | <5% | 5–10% | 10–15% | 20–25% | Observed (multiple 2025–26) |
| Cost per lead (webinar channel) | >$150 | ~$72 | $40–60 | <$40 | Inferred (Wave Connect 2026) |

##### Quiz Overlay

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| Start → complete | <45% | 60–65% | 75–80% | 83%+ | Observed (Interact 2026 / Amra & Elma 2026) |
| Start → lead capture | <20% | 34–40% | 40–45% | 50%+ | Observed (Interact 2026) |
| Quiz vs static form conversion lift | — | ~17x | — | — | Observed (NimTools 2026, 47.3% vs 2.8%) |

##### Tripwire / OTO Chain Overlay

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| Order bump take rate | <15% | 25–30% | 35–40% | 37.8%+ | Observed (Focus Digital 2025) |
| One-click upsell acceptance | <3% | 4–8% | 10–15% | 16%+ | Observed (Upsella / Growth Suite 2026) |
| Post-purchase upsell acceptance | <2% | 3–5% | 5–8% | 8%+ | Observed (Growth Suite 2026) |
| AOV lift from full OTO chain | <5% | 10–15% | 20–25% | 30%+ | Inferred (multiple ecommerce sources) |

##### Cancellation / Save / Dunning Overlay (Config F)

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| Failed-payment recovery rate | <35% | 47.6% | 52–58% | 65%+ | Observed (Recurly 2023–24, Slicker 2025) |
| Silent retry recovery (before contact) | <10% | 21% | 25–30% | 35%+ | Observed (ChurnWard 2025) |
| Day-of-failure email recovery | <8% | 13.25% | 15–18% | 20%+ | Observed (ChurnWard 2025) |
| Involuntary churn as % of total | — | 20–40% | — | — | Observed (Recurly / Slicker 2025) |

##### Referral Loop

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| K-factor (consumer) | <0.1 | 0.15–0.25 | 0.3–0.4 | 0.7+ | Observed (EasyVC / Shno 2026) |
| K-factor (B2B SaaS) | <0.1 | 0.2 | 0.4–0.6 | 1.0+ | Observed (Athenic 2026, 34 companies) |
| Referral participation rate | <10% | 16–20% | 20–25% | 29%+ | Observed (Gitnux 2026) |
| Referred customer conversion (ecom) | <5% | 10–13.8% | 14–18% | 20%+ | Observed (ReferralCandy 2026) |

##### Outbound / SDR Motion (Config A variant)

| Metric | Low | Median | Good | Top Quartile | Source Confidence |
|---|---|---|---|---|---|
| Cold email reply rate (SaaS) | <1% | 1.5–3% | 3–5% | 5%+ | Observed (Mailshake / LeadHaste 2026) |
| Meeting booked rate (SaaS) | <0.2% | 0.3–0.7% | 0.7–1% | 2%+ | Observed (Mailshake 2026) |
| Signal-based reply rate | <5% | 10–15% | 15–20% | 25%+ | Observed (Autobound 2026) |

### Tactic Risk Classification

Every tactic recommendation must carry one of these labels:

- **Conversion hygiene** — best-practice, low-risk, broadly applicable
- **Aggressive but common** — works but carries brand/trust trade-offs; test carefully
- **Compliance/reputation risk** — may violate platform policy, FTC/FDA rules, or HIPAA; requires legal review before use

### Confidence Tags on Claims

Every benchmark or claim in the output must carry one of:

- **Observed** — directly supported by primary source data (Tier 1/2)
- **Inferred** — logically derived from adjacent evidence
- **Uncertain** — plausible but not well-sourced; flag for further validation

### Contradiction Handling

When evidence conflicts (e.g., different benchmark ranges from different sources):
1. State both numbers and their sources
2. Explain likely cause of divergence (methodology, date, geography, sample composition)
3. Recommend which to use for the user's specific context
4. Flag as uncertain if unresolvable

---

## Step 6 — Design Experiments

For every funnel plan, include an experiment operating system.

### Hypothesis Format

```
We believe [changing X] will [improve metric Y] by [estimated magnitude]
because [evidence/reasoning].
We will test this by [method] over [timeframe] with [sample size].
Success criteria: [metric] improves by [threshold] at [confidence level].
```

### Test Cadence

- Hook and creative variants: 5–10 per week (70/20/10 rule — 70% proven structures, 20% variations, 10% wild swings)
- Landing page / form variants: 1–2 per 2-week sprint
- Pricing / offer structure: quarterly, with holdback validation
- Checkout UX: monthly, use A/B with 95% confidence before shipping

### Stop Rules

- Kill a variant if it underperforms control by >20% after reaching statistical significance
- Pause a test if it negatively impacts downstream metrics (e.g., higher conversion but worse activation or higher refund rate)
- Never declare a winner before minimum sample (use Bayesian or frequentist calculator; default to 400+ conversions per variant for conversion rate tests)

---

## Output Templates

### Template A — Quick Funnel Plan

Use when user wants a fast direction.

```markdown
# Funnel Plan: [Business / Product Name]

## Configuration: [Selected Config]
## Format Overlay: [Selected Overlay or "None"]

## Funnel Map
[Stage 1] → [Stage 2] → ... → [Stage N]
[If overlay: show where overlay stages insert into the base map]

## Key Events to Track
1. [event_name] at [stage] — [purpose]
2. ...

## Top 5 Tactics (with risk label)
1. [Tactic] — [conversion hygiene / aggressive but common / compliance risk]
2. ...

## Top 3 Leak Points
1. [Stage]: [problem] → [fix]
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

### Template B — Deep Funnel Teardown

Use when auditing a competitor or existing funnel.

```markdown
# Funnel Teardown: [URL or Business Name]

## Funnel Architecture
[Step-by-step map of what was observed]

## Per-Step Analysis

### Step 1: [Name]
- Purpose: [what this step does]
- Copy angle: [headline, subhead, CTA text]
- Inputs requested: [fields, friction level]
- Trust elements: [social proof, badges, guarantees]
- Persuasion tactics: [classification label for each]
- UX observations: [mobile, speed, accessibility]
- Tracking observed: [pixels, UTMs, affiliate params]

### Step 2: ...

## Tactics Library (from observation)
| # | Tactic | Evidence | Classification |
|---|---|---|---|
| 1 | ... | ... | conversion hygiene / aggressive / compliance risk |

## Conversion Scorecard
| Category | Score (1-10) | Notes |
|---|---|---|
| First impression | ... | ... |
| Value proposition | ... | ... |
| Friction management | ... | ... |
| Trust signals | ... | ... |
| Objection handling | ... | ... |
| Compliance | ... | ... |
| Technical execution | ... | ... |

## Top 5 Strengths
1. ...

## Top 5 Weaknesses / Leaks
1. [Leak] → [Estimated drop-off] → [Recommended fix]

## 5 High-Impact Improvements (for ethical replication)
1. ...
```

### Template C — Build Checklist

Use when building a new funnel from scratch.

```markdown
# Funnel Build Checklist: [Business Name]

## Configuration: [Selected Config]
## Format Overlay: [Selected Overlay or "None"]

## Pre-Build
- [ ] Avatar defined (who, pain, dream outcome)
- [ ] Offer defined (using Grand Slam Offer / Value Equation from local assets)
- [ ] Pricing set (anchored to economics, not competitors)
- [ ] Compliance surface mapped (industry regulations, FTC, platform policies)
- [ ] Attribution stack selected (GA4 + CAPI + Enhanced Conversions + CRM)

## Stage Build
### [Stage Name]
- [ ] Page / screen built
- [ ] Copy written (hook, body, CTA)
- [ ] Trust elements added (proof, badges, guarantees)
- [ ] Form / interaction designed (field count, input types, validation)
- [ ] Mobile tested
- [ ] Events implemented: [list specific event names]
- [ ] Dedup keys configured
- [ ] Benchmark target set: [metric] = [range]

### [Repeat for each stage]

## Measurement
- [ ] GA4 key events configured
- [ ] Meta Pixel + CAPI redundant setup live; dedup verified in Events Manager
- [ ] Google Enhanced Conversions enabled; customer data terms accepted
- [ ] Consent Mode v2 deployed (if EEA/UK traffic)
- [ ] UTM naming convention documented and enforced
- [ ] CRM linkage tested (click ID → lead → revenue)
- [ ] Self-reported attribution field added

## Compliance
- [ ] All claims reviewed against approved claims library
- [ ] Testimonials use real customers with documented consent
- [ ] Pricing disclosures appear before billing info collection
- [ ] Cancellation flow tested (if subscription): as easy as signup
- [ ] Privacy policy and terms updated
- [ ] Affiliate disclosure compliant (if applicable)

## Launch
- [ ] QA: all events verified firing correctly in debug/test mode
- [ ] QA: deduplication verified (Meta Events Manager, Google diagnostics)
- [ ] QA: mobile experience tested on 3+ devices
- [ ] QA: page speed < 3 seconds on mobile
- [ ] Experiment backlog created (first 3 tests defined)
- [ ] Monitoring dashboard live (key metrics by stage)
```

---

## Quality Gates

Do not finalize any funnel plan unless all gates pass:

- [ ] Configuration selected with explicit reasoning
- [ ] Every stage has a primary metric and benchmark band
- [ ] Every stage has at least one trackable event specified
- [ ] Server-side event delivery addressed (not pixel-only)
- [ ] Deduplication method specified for each platform in use
- [ ] Compliance checklist completed with no unresolved flags
- [ ] At least 3 experiments defined with hypotheses and stop rules
- [ ] Every tactic carries a risk classification label
- [ ] Every benchmark carries a confidence tag
- [ ] Contradictions between sources are surfaced and resolved (or flagged as uncertain)
- [ ] If a format overlay is selected, all overlay-specific events are implemented and overlay benchmark bands are attached

---

## Anti-Patterns

Avoid:

- Building the funnel before defining the offer (offer determines every downstream conversion)
- Pixel-only tracking in 2026 (you will lose 20–30% of conversions and have unreliable optimization)
- Using competitor pricing as your benchmark instead of your own unit economics
- Optimizing top-of-funnel when the bottleneck is activation or retention
- A/B testing without sufficient sample size (minimum 400 conversions per variant for conversion rate tests)
- Dark patterns in subscription flows (FTC enforcement is active and expanding)
- AI-generated testimonials or transformation photos (FDA warning letters, platform bans, reputation damage)
- Ignoring dark funnel in B2B (platform attribution alone misses 50–70% of influence in long-cycle sales)
- Treating benchmarks as targets instead of diagnostic ranges
- Launching without a consent management solution (even in the US, state privacy laws are proliferating)
- Using a single attribution model for all decisions (use platform attribution for platform optimization, multi-touch for budget allocation, self-reported for strategic insight)
- Running a VSL without a timestamped claim transcript (verbal claims are enforceable; no transcript means no audit trail)
- Treating webinar replay as an afterthought (47% of total views happen on-demand; replay is not a bonus, it's half the funnel)
- Launching a quiz funnel without per-question drop-off tracking (you can't optimize what you don't measure at question level)
- Building a tripwire/OTO chain without explicit "no thanks" paths (pre-checked upsell boxes are an FTC compliance risk)
- Running a product launch without PLC consumption tracking (if nobody watches the pre-launch content, the cart-open conversion will be low and you won't know why)
- Assuming a bridge page always helps (if bridge-warmed traffic converts lower than direct, the bridge is hurting you; test removing it)
- Skipping dunning automation for subscription businesses (automated recovery delivers 10–16x ROI; manual recovery is 20–35 percentage points worse)

---

## Handoff to Other Skills

Route to specialized skills when the funnel plan reveals a deeper need:

- Offer design is weak → `offer-pillar-discovery`
- Lead magnet needed for top-of-funnel → `lead-magnet-creation`
- Pricing/monetization questions → `consult-hormozi` (routes to $100M Pricing Playbook)
- Retention is the bottleneck → `consult-hormozi` (routes to $100M Retention Playbook)
- Brand/trust layer missing → `consult-hormozi` (routes to $100M Branding Playbook)
- Design polish for funnel pages (spacing, animation, component states, loading patterns, micro-interactions) → `product-craft`
- Competitive intelligence needed → `deep-web-research`
- Market attractiveness unclear → `high-cagr-market-discovery`

---

## Reference Sources (2026)

### Measurement and Tracking
- Google Enhanced Conversions: https://support.google.com/google-ads/answer/9888656
- Google Enhanced Conversions Best Practices: https://support.google.com/google-ads/answer/14795081
- Google Ads API Conversion Management: https://developers.google.com/google-ads/api/docs/conversions/overview
- Google Consent Mode v2: https://developers.google.com/tag-platform/security/concepts/consent-mode
- GA4 Modeled Key Events: https://support.google.com/analytics/answer/10710245
- Meta Conversions API: https://developers.facebook.com/docs/marketing-api/conversions-api
- Meta CAPI Deduplication: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- Meta CAPI Verification: https://developers.facebook.com/docs/marketing-api/conversions-api/verifying-setup
- Meta CAPI Best Practices: https://www.facebook.com/business/help/308855623839366
- LinkedIn Conversions API: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api
- LinkedIn Lead Gen Forms: https://www.linkedin.com/help/lms/answer/a421181

### Compliance and Regulation
- FTC Click-to-Cancel Rule (2024): https://www.ftc.gov/news-events/news/press-releases/2024/10/federal-trade-commission-announces-final-click-cancel-rule-making-it-easier-consumers-end-recurring
- FTC Negative Option ANPRM (2026): https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-seeks-public-comment-response-advance-notice-proposed-rulemaking-regarding-negative-option
- HIPAA Marketing Guidance: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/index.html

### Benchmarks
- Unbounce Conversion Benchmark Report (Q4 2024, 41K pages): https://unbounce.com/average-conversion-rates-landing-pages
- WordStream Google Ads Benchmarks (2024): https://www.wordstream.com/blog/conversion-rate-benchmarks
- Baymard Cart Abandonment Research: https://baymard.com/blog/ecommerce-checkout-usability-report-and-benchmark
- Klaviyo Abandoned Cart Benchmarks (2024, 143K flows): https://klaviyo.com/blog/abandoned-cart-benchmarks
- Shopify Conversion Benchmarks: https://easyappsecom.com/guides/shopify-conversion-rate-benchmarks.html
- 1Capture Free Trial Benchmarks (2025, 10K+ SaaS): https://1capture.io/blog/free-trial-conversion-benchmarks-2025
- Pavilion B2B SaaS Funnel Benchmarks (2025): https://thedigitalbloom.com/learn/pipeline-performance-benchmarks-2025

### B2B Buying Behavior
- Gartner B2B Buying Journey: https://www.gartner.com/en/sales/insights/b2b-buying-journey
- LinkedIn B2B Institute 95-5 Rule: https://business.linkedin.com/advertise/resources/b2b-institute/b2b-research/trends/95-5-rule
- Forrester B2B Self-Service Predictions (2025): https://investor.forrester.com/news-releases/news-release-details/forresters-b2b-marketing-sales-predictions-2025-more-half-large

### Format Overlay Sources
- VSL state of market (2026): https://robpalmer.com/blog/state-of-vsl-marketing-2026
- VSL conversion benchmarks: https://conversionly.io/video-sales-letter-vsl/
- VSL B2B SaaS framework (2026): https://joyspace.ai/video-sales-letters-that-convert-2026-vsl-framework
- Webinar statistics (2026, 500K+ registrants): https://www.getcontrast.io/learn/webinar-benchmarks
- Webinar benchmarks (Wave Connect 2026): https://wavecnct.com/blogs/news/webinar-statistics
- Webinar funnel statistics (Amra & Elma 2025): https://www.amraandelma.com/webinar-funnel-statistics/
- Quiz conversion report (Interact 2026): https://tryinteract.com/blog/quiz-conversion-rate-report
- Quiz marketing statistics (Amra & Elma 2026): https://www.amraandelma.com/interactive-quiz-statistics-marketing/
- Quiz lead generation (NimTools 2026): https://www.nimtools.com/blog/quiz-lead-generation-how-interactive-quizzes-drive-more-targeted-leads
- Upsell conversion benchmarks (Focus Digital 2025): https://focus-digital.co/average-upsell-conversion-rate-2025-report/
- One-click upsell guide (Upsella): https://upsella.com/blog/one-click-upsells-explained
- Upsell benchmarks (Growth Suite 2026): https://www.growthsuite.net/resources/shopify-upsell-cross-sell/complete-guide/benchmarks
- Failed-payment recovery benchmarks (Slicker 2025): https://www.slickerhq.com/blog/2025-failed-payment-recovery-benchmarks-saas-median-47-percent
- Dunning best practices (ChurnWard 2025): https://churnward.com/blog/dunning-best-practices/
- Subscription retention statistics (Swell): https://www.swell.is/content/subscription-retention-tools-statistics
- K-factor and viral loop statistics (Shno 2026): https://www.shno.co/marketing-statistics/viral-loop-statistics
- Referral program benchmarks (ReferralCandy 2026): https://www.referralcandy.com/blog/referral-program-benchmarks-whats-a-good-conversion-rate-in-2025
- K-factor SaaS benchmarks (EasyVC): https://easyvc.ai/blog/k-factor-for-saas-companies-measuring-viral-growth-that-matters/
- Viral coefficient optimization (Athenic 2026): https://getathenic.com/blog/viral-coefficient-referral-program-optimization
- Cold email benchmarks (Mailshake 2026): https://mailshake.com/blog/cold-email-benchmarks-2026/
- Outbound sales benchmarks (LeadHaste 2026): https://leadhaste.com/blog/outbound-sales-benchmarks-2026
- Signal-based outbound (Autobound 2026): https://autobound.ai/blog/cold-email-guide-2026
- Sales email conversion statistics (Shno 2026): https://www.shno.co/marketing-statistics/sales-email-conversion-statistics
- Long-form sales copy data (Rob Palmer): https://robpalmer.com/blog/long-form-sales-copy
- Landing page A/B test benchmarks (DollarPocket 2025): https://www.dollarpocket.com/landing-page-conversion-benchmarks-report/

### Hormozi Playbooks (local assets)
- Offer design: `$100M Offers - Alex Hormozi.pdf` → ValueEquation, GrandSlamOffer, TrimAndStack
- Leads: `$100M-Leads-by-Alex-Hormozi.pdf` → CoreFourLeads, Lead Magnet Design, Paid Ads Economics
- Pricing: `$100M Pricing Playbook.pdf` → payment structure as pricing tool, annual increases
- Retention: `$100M Retention Playbook.pdf` → 5 Horsemen, usage-drop intervention
- LTV: `$100M Lifetime Value Playbook.pdf` → Crazy Eight levers, LTGP not vanity revenue
- Branding: `$100M Branding Playbook.pdf` → deliberate association, behavior change
- Scaling: `$100M Scaling Roadmap-combined.pdf` → stage progression, constraint sequencing
