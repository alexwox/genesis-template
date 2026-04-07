---
name: avatar-picking
description: >-
  Select and define the ideal customer avatar from market research. Extracts candidate segments, scores them on pain/money/reachability/fit with route-specific dimensions, deepens the winner into a full profile with belief maps and objection inventory. Run before brand-guide-creation, constructing-a-funnel, or constructing-a-landing-page. Use when the user has market research and needs to decide WHO to target, or when another skill needs avatar input that doesn't exist yet.
last-reviewed: 2026-04-07
---

# Avatar Picking

**Pattern:** Routed Playbook (Pattern 3). Business model type (B2B enterprise, B2B SMB, B2C high-consideration, B2C low-consideration, creator/digital products) changes which scoring dimensions get extra weight and how the buying unit is structured. Selected over Linear Pipeline because 5 business model types require different scoring weights and profile structures, and over Configured Playbook because the domain doesn't need overlays or per-unit templates.

## Purpose

Turn market research into a scored, ranked avatar decision — not a vague "persona" that sits in a slide deck. The output is a fill-in-the-blank profile specific enough to drive brand voice, funnel copy, pricing framing, and channel selection without further interpretation.

Without a specific avatar, brand guides default to "be human, be bold" (generic), funnels talk to everyone (and convert nobody), and landing pages use stock objections instead of real ones. Companies that document and use specific personas are 2.2x more likely to exceed revenue goals (Cintell 2016, 137 B2B orgs). Addressing specific personas has yielded 238% conversion improvement over generic targeting (Invesp, documented case study).

Slash command: `/avatar`

---

## Trigger

Invoke this skill when:

- The user has market research and needs to decide who to target
- A brand guide, funnel, or landing page is about to be built and the avatar is undefined or vague
- The user says "who should I target?", "help me pick an avatar", "define my ICP"
- The user has a product concept but hasn't specified the buyer
- Another skill (brand-guide-creation, constructing-a-funnel, constructing-a-landing-page) needs avatar input that doesn't exist yet

---

## Step 0 — Collect Inputs

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Market research document | Source material for segment extraction | — (must have; point user to offer-pillar-discovery or deep-web-research first) |
| Product or concept description | Determines which segments are feasible targets | Extract from market research if embedded |
| Business model type | Routes to the right scoring weights | Infer from product description |
| Existing customer data | Overrides inference with evidence | None — use research only |
| Pricing range | Filters segments by ability to pay | Extract from research if present |
| Distribution channels available | Affects reachability scoring | Infer from product type |

**Quality gate:** The market research must contain at least TWO of: (a) named customer segments or buyer types, (b) competitor analysis showing who competitors target, (c) pricing data or willingness-to-pay signals, (d) channel or distribution data. If fewer than two are present, route to `deep-web-research` to fill gaps first.

---

## Research Protocol — When to Use `deep-web-research`

Research is not a one-time step — it's triggered at specific moments when internal evidence runs out. The market research document is the starting point, not the ceiling. Use `deep-web-research` at three decision points:

| Trigger | What to research | Search approach |
|---|---|---|
| **Step 1 — Fewer than 3 segments extracted** | Who else buys in this category? Who do competitors actually serve? | Search: "[product category] customer segments", "[top competitor] case studies customers", "[industry] buyer persona" |
| **Step 3 — Any dimension scored ≤ 2 on a top-3 segment** | Find real evidence to upgrade or confirm the low score | Search: "[segment] spending on [category]", "[segment] community forum", "[segment] buying behavior [product type]" |
| **Step 4 — Can't fill a field in the avatar profile** | Find practitioner language, real complaints, real buying triggers | Search: "[avatar role] frustrations reddit", "[avatar role] tools workflow", "[product category] reviews complaints" |

**How to invoke:** When a trigger fires, run `deep-web-research` with:
- **Primary question:** The specific gap (e.g., "What do solo technical founders actually spend on marketing tools?")
- **Subquestions:** 2–3 targeted queries from the search approach column above
- **Output mode:** `decision_memo` (you need evidence, not a full report)
- **Source priority:** Community signals (Reddit, forums, X) for language and pain; Tier 1–2 sources for spending and market data

**Stop rule:** Research until the score can be upgraded with cited evidence, or until you've confirmed the low score is accurate (which is also valuable — it means the segment is genuinely weak on that dimension).

---

## Step 1 — Extract Candidate Segments from Research

Read the market research document end-to-end. For every mentioned or implied customer segment, extract a row. Look for segments in:

- Explicit "target buyer" or "target market" sections
- Competitor descriptions (who do competitors serve?)
- Pricing tiers (different prices often imply different segments)
- Use cases or problem descriptions (different problems = different avatars)
- Channel mentions (different channels reach different people)

Fill in one row per segment:

| # | Segment name | Where mentioned | Size signal | Pain signal | Money signal |
|---|---|---|---|---|---|
| 1 | ___ | "___ [quote or paraphrase from research]" | ___ | ___ | ___ |
| 2 | ___ | "___ [quote or paraphrase from research]" | ___ | ___ | ___ |
| ... | | | | | |

**Minimum:** Extract at least 3 segments. If only 1 is obvious, look harder — the research almost certainly implies secondary segments through competitor analysis, pricing tiers, or use-case descriptions.

**Maximum:** Cap at 7. If more exist, pre-filter by eliminating any that obviously fail the money signal (no evidence anyone in this segment pays for solutions).

**Research expansion (if < 3 segments extracted):** The market research may be too narrow or product-focused to surface all viable segments. Run `deep-web-research` with:

```
Primary question: "Who are the distinct buyer segments for [product category]?"
Subquestions:
  - "Who do [top 2-3 competitors] target? What customer profiles appear in their case studies, testimonials, and marketing?"
  - "What adjacent buyer types purchase similar tools but aren't mentioned in the research?"
  - "Are there underserved segments that competitors ignore?"
Output mode: decision_memo
```

Add any newly discovered segments to the extraction table with source citations. Mark their origin as "discovered via research" in the "Where mentioned" column so downstream users know these weren't in the original doc.

---

## Step 2 — Route by Business Model

Classify the product into exactly one business model type. This determines which scoring dimensions get extra weight in Step 3.

```
IF the product sells to companies with 100+ employees,
   buying committees, and deal cycles > 30 days:
  → Route A: B2B Enterprise
  Extra weight: Reachability (buying committee access), Budget authority
  Avatar structure: Buying committee map (economic buyer + champion + end user)

ELIF the product sells to companies with <100 employees,
   solo decision makers, and deal cycles < 30 days:
  → Route B: B2B SMB / Founder-Operator
  Extra weight: Pain severity, Time-to-value, Self-serve readiness
  Avatar structure: Single decision maker who is both buyer AND user

ELIF the product sells to individuals at $50+ price point
   with a research/comparison phase before purchase:
  → Route C: B2C High-Consideration
  Extra weight: Emotional urgency, Social proof sensitivity
  Avatar structure: Individual with decision-making context and influencer map

ELIF the product sells to individuals at <$50 price point
   with impulse or habitual buying behavior:
  → Route D: B2C Low-Consideration
  Extra weight: Channel density, Trigger frequency
  Avatar structure: Behavioral profile (when/where/why they buy)

ELIF the product sells to creators, freelancers, or indie operators
   who buy tools to improve their craft or business:
  → Route E: Creator / Digital Products
  Extra weight: Aspiration gap, Community density, Tool stack fit
  Avatar structure: Skill-stage profile (current capability → desired capability)
```

**Ambiguity rule:** If the product sits between two routes, pick the one where PRIMARY revenue will come from. Note the secondary route as a future expansion avatar.

---

## Step 3 — Score Segments

Score every segment from Step 1 on six dimensions. The first four are universal; the last two are route-specific.

### Universal Dimensions (all routes)

For each segment, fill in evidence and score:

| Dimension | Question to answer | Evidence from research | Score (1–5) |
|---|---|---|---|
| **Pain severity** | How badly does this segment feel the problem? | "___ [evidence]" | ___ |
| **Money signal** | Evidence this segment pays for solutions? (existing spend, budget items, competitor revenue) | "___ [evidence]" | ___ |
| **Reachability** | Can you reach this segment through available channels? (community presence, platform density) | "___ [evidence]" | ___ |
| **Fit signal** | How well does the product match what they need? (feature alignment, price tolerance, format match) | "___ [evidence]" | ___ |

**Scoring guide:**

- 5 = Direct evidence in research (named, quoted, quantified)
- 4 = Strong inference from multiple data points
- 3 = Reasonable inference from one data point
- 2 = Plausible but unsubstantiated
- 1 = Assumption with no evidence

### Route-Specific Dimensions

**Route A — B2B Enterprise:**

| Dimension | Question | Evidence | Score (1–5) |
|---|---|---|---|
| **Champion access** | Can you reach a champion inside these organizations? | ___ | ___ |
| **Budget cycle alignment** | Compatible with your cash-flow timeline? | ___ | ___ |

**Route B — B2B SMB / Founder-Operator:**

| Dimension | Question | Evidence | Score (1–5) |
|---|---|---|---|
| **Self-serve readiness** | Will they buy and implement without hand-holding? | ___ | ___ |
| **Time-to-value speed** | Visible value within their patience window? (< 7 days for SMB) | ___ | ___ |

**Route C — B2C High-Consideration:**

| Dimension | Question | Evidence | Score (1–5) |
|---|---|---|---|
| **Emotional urgency** | Emotional driver beyond rational calc? (status, fear, identity, aspiration) | ___ | ___ |
| **Social proof sensitivity** | Heavily relies on reviews/testimonials before buying? | ___ | ___ |

**Route D — B2C Low-Consideration:**

| Dimension | Question | Evidence | Score (1–5) |
|---|---|---|---|
| **Trigger frequency** | How often does the buying trigger fire? | ___ | ___ |
| **Channel density** | Concentrated on platforms you can reach cost-effectively? | ___ | ___ |

**Route E — Creator / Digital Products:**

| Dimension | Question | Evidence | Score (1–5) |
|---|---|---|---|
| **Aspiration gap** | How large is the gap between where they are and where they want to be? | ___ | ___ |
| **Community density** | Do they gather in identifiable communities? | ___ | ___ |

### Composite Score and Ranking

Universal (4 × max 5 = 20) + Route-specific (2 × max 5 = 10) = **max 30**

| Segment | Universal (/20) | Route-specific (/10) | Total (/30) | Rank |
|---|---|---|---|---|
| ___ | ___ | ___ | ___ | ___ |

**Thresholds:**

- **24–30** = Strong pick — proceed to Step 4
- **18–23** = Promising — identify weak dimensions and whether research can strengthen them
- **< 18** = Weak — deprioritize or merge with a stronger segment

**Tie-breaking rule:** If two segments score within 2 points of each other, pick the one with higher **reachability**. A slightly less painful problem you can actually reach beats a severe problem behind a wall.

**Reachability gate:** If reachability scores < 3 for any segment, disqualify it regardless of total score. High pain behind an unreachable wall wastes money (see Near-Miss 2).

**Research escalation for low-evidence scores:** If any top-3 segment has a dimension scored ≤ 2 (plausible but unsubstantiated), that score is blocking a decision. Run `deep-web-research` before proceeding to Step 4:

```
Primary question: "What evidence exists for [segment]'s [weak dimension]?"
Subquestions (pick based on which dimension is weak):
  - Pain severity: "[segment role] biggest frustrations [product category] site:reddit.com OR site:news.ycombinator.com"
  - Money signal: "[segment] budget for [category] tools", "[segment] spending survey [year]"
  - Reachability: "where do [segment] gather online", "[segment] communities forums conferences"
  - Fit signal: "[segment] tool requirements [category]", "[segment] evaluation criteria [product type]"
  - Route-specific: adapt the question to the specific dimension
Output mode: decision_memo
```

After research, update the score with the new evidence. If the score stays at 2 after targeted research, that's a real signal — the segment is genuinely weak on that dimension. Document this in the ranking table.

---

## Step 4 — Deepen the Winning Avatar

Take the top-scoring segment and build a complete profile. Every field must be filled — blanks indicate the avatar isn't specific enough.

**Research for avatar deepening:** The market research document is rarely detailed enough to fill every field below. For the winning segment, run `deep-web-research` to find the avatar's real language and context:

```
Primary question: "What is the day-to-day reality of [avatar role] when dealing with [problem area]?"
Subquestions:
  - "What do [avatar role] complain about regarding [problem]? (forums, Reddit, X, reviews)"
  - "What tools and workarounds do [avatar role] currently use for [problem]?"
  - "What triggers [avatar role] to start searching for a [product category] solution?"
Output mode: decision_memo
Source priority: Community signals first (Reddit, HN, X, niche forums) — 
  these reveal real language, real frustrations, and real buying triggers
  that market reports sanitize away.
```

Use the community language you find to fill in the "in their words" fields below. Practitioner complaints on Reddit are more useful for avatar deepening than Gartner reports — you need their vocabulary, not industry terminology.

### 4A — Identity

| Field | Fill in |
|---|---|
| Avatar name (human name for internal reference) | ___ |
| Role or title | ___ |
| Company type / situation (if B2B) | ___ |
| Age range | ___ |
| Decision-making authority | ___ (sole decision maker / needs approval from ___ / committee with ___) |
| Tool stack they already use | ___ |
| Budget range for solutions like yours | $___ per ___ |

### 4B — Problem State

| Field | Fill in |
|---|---|
| The specific problem, in their words | "___ [how they'd describe it to a colleague]" |
| Current workaround or solution | ___ |
| Why the current solution fails | ___ |
| What they've already tried | ___ |
| Frequency | ___ times per ___ |
| Economic cost | $___ per ___ (math: ___) |
| Emotional cost | ___ (dominant: frustration / embarrassment / anxiety / guilt / overwhelm) |

### 4C — Dream State

| Field | Fill in |
|---|---|
| Dream outcome in their words | "I want to be able to ___" |
| Metric that proves they got there | ___ |
| Timeframe they expect results | ___ |
| Testimonial they'd write if it worked | "___ [the review before they've bought]" |

### 4D — Buying Context

| Field | Fill in |
|---|---|
| Buying trigger (the "last straw" moment) | ___ |
| Where they search for solutions | ___ |
| Who influences their decision | ___ (people, communities, publications) |
| Evaluation criteria | 1. ___ 2. ___ 3. ___ |
| Deal-breakers | 1. ___ 2. ___ |
| Price frame | "They think $___ is [cheap/fair/expensive] because they compare to ___" |

---

## Step 5 — Map Beliefs, Objections, and Triggers

This section produces the inputs that brand-guide-creation, constructing-a-funnel, and constructing-a-landing-page consume directly.

### 5A — Belief Map

For each stage, fill in the current belief and the belief required before the avatar advances:

| Stage | Current belief | Required belief | What shifts it |
|---|---|---|---|
| **Problem awareness** | "___ " | "___ " | ___ |
| **Solution awareness** | "___ " | "___ " | ___ |
| **Product awareness** | "___ " | "___ " | ___ |
| **Trust** | "___ " | "___ " | ___ |
| **Urgency** | "___ " | "___ " | ___ |

**Test:** Each "current belief" should be something the avatar would actually say unprompted. If it reads like marketing copy, rewrite it.

### 5B — Objection Inventory

Rank every objection by expected frequency. For each, name the removal mechanism:

| Rank | Objection (in their words) | Type | Removal mechanism |
|---|---|---|---|
| 1 | "___ " | price / trust / effort / timing / fit | ___ |
| 2 | "___ " | ___ | ___ |
| 3 | "___ " | ___ | ___ |

### 5C — Buying Triggers

The 3–5 moments that move this avatar from passive to active:

| Trigger | Context (when/where) | Emotional state | Intercept channel |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

---

## Step 6 — Day-in-the-Life Snapshot

Map the avatar's typical day, marking moments where the problem surfaces. Feeds channel timing and content strategy.

```
Morning: ___ [what they do, what tools they open, what frustrates them]
  → Problem surfaces at: ___
  → They cope by: ___

Midday: ___
  → Problem surfaces at: ___
  → They cope by: ___

Evening: ___
  → Content they consume: ___ [podcasts, newsletters, feeds, communities]
  → Where they vent or seek advice: ___ [platforms, groups, forums]
```

**Why this matters:** The day-in-the-life reveals channel timing (when to show ads), content topics (what they cope with), and integration points (where your product fits their workflow). Brand guides built without this default to generic channel advice.

---

## Quality Gates

Do not finalize unless all gates pass:

- [ ] At least 3 segments extracted and scored (not just the obvious one)
- [ ] Winning segment scored ≥ 24/30 (or ≥ 18/30 with documented plan to strengthen weak dimensions)
- [ ] Every field in Step 4 is filled with specifics, not generalities
- [ ] Belief map has specific current beliefs, not "they don't know about us"
- [ ] At least 3 objections listed with removal mechanisms
- [ ] Day-in-the-life has at least 2 specific problem-surface moments
- [ ] Profile uses the avatar's language, not marketing language
- [ ] Output template is filled and ready for downstream consumption

**The recognition test:** Read the profile aloud. If the avatar would say "that's not how I'd describe it" about any field, rewrite it in their language. Marketing language belongs in the brand guide; the avatar profile must be raw and accurate.

---

## Output Template

```markdown
# Avatar Profile: [Avatar Name]

**Route:** [A/B/C/D/E]
**Score:** [X]/30 — highest among [N] candidates
**Date:** [YYYY-MM-DD]

## Identity
- Role: ___
- Company type / situation: ___
- Decision authority: ___
- Budget range: $___
- Tool stack: ___

## Problem
- In their words: "___"
- Current solution: ___
- Why it fails: ___
- Frequency: ___ times per ___
- Economic cost: $___ per ___
- Emotional cost: ___

## Dream Outcome
- In their words: "I want to be able to ___"
- Success metric: ___
- Expected timeframe: ___

## Buying Context
- Trigger: ___
- Search behavior: ___
- Influencers: ___
- Evaluation criteria: ___
- Deal-breakers: ___
- Price frame: "They compare $___ to ___"

## Belief Map
| Stage | Current → Required | What shifts it |
|---|---|---|
| Problem | ___ → ___ | ___ |
| Solution | ___ → ___ | ___ |
| Product | ___ → ___ | ___ |
| Trust | ___ → ___ | ___ |
| Urgency | ___ → ___ | ___ |

## Objections
| # | Objection | Type | Removal |
|---|---|---|---|
| 1 | ___ | ___ | ___ |
| 2 | ___ | ___ | ___ |
| 3 | ___ | ___ | ___ |

## Buying Triggers
| Trigger | Context | Emotional state | Intercept channel |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

## Day-in-the-Life (Problem Moments)
| Time | Activity | Problem surfaces | Current cope |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

## Secondary Avatar
- Segment: ___
- Score: ___/30
- Key difference: ___
- When to revisit: ___

## Downstream Handoff Notes
- **brand-guide-creation:** Identity + Dream Outcome + Belief Map → "Audience and Positioning"
- **constructing-a-funnel:** Belief Map → stage sequence. Objections → trust stages. Triggers → entry design.
- **constructing-a-landing-page:** Dream Outcome → headline. Objections → FAQ/trust. Day-in-the-life → hero context.
```

---

## Worked Example (abbreviated)

**Input:** Market research for AI agent skills sold to Cursor/Claude Code users.

**Step 1 — Segments extracted:**

| # | Segment | Pain signal | Money signal |
|---|---|---|---|
| 1 | Solo technical founder, pre-revenue | "Needs business strategy but can't afford consultants" | $79–$499 tolerance confirmed |
| 2 | Small dev team (2–5) at early startup | Implied by pricing tiers | $199–$499 team budget |
| 3 | Agency/freelancer building client projects | Competitor landscape (builtbyzac) | $79 per-skill |
| 4 | Non-technical operator using AI tools | Risk section: "expand awareness" | Unquantified, price-sensitive |

**Step 2 — Route E** (Creator / Digital Products): sells to indie operators buying tools.

**Step 3 — Scores:**

| Segment | Pain | Money | Reach | Fit | Aspiration | Community | Total |
|---|---|---|---|---|---|---|---|
| Solo founder | 5 | 4 | 4 | 5 | 5 | 4 | **27** |
| Small dev team | 3 | 4 | 3 | 4 | 3 | 2 | **19** |
| Agency/freelancer | 3 | 3 | 3 | 3 | 2 | 3 | **17** |
| Non-technical | 4 | 2 | 2 | 2 | 4 | 2 | **16** |

**Winner:** Solo founder at 27/30. "Dev-Founder Dan" — builds products in Cursor, knows code, doesn't know marketing. Buying trigger: launched a product, got traffic, zero conversions.

---

## Near-Miss Counter-Examples

### Near-Miss 1 — The "Everyone" Avatar

A dev tools company defines their avatar as "developers who want to be more productive." Scores well: pain 4, money 3, reachability 4, fit 4 = 15/20 universal. They build a brand guide targeting "developers" broadly.

**What looks right:** Scoring checks out. Developers do want productivity. Product is useful.

**Where it fails:** "Developers who want to be more productive" describes 30 million people. Brand voice sounds like every other dev tool. Objections are generic ("it's easy to use"). No community rallies around it.

**Consequence:** CAC 3x projected. Landing page converts at 1.2% instead of 6% — generic copy doesn't stop the scroll for anyone specific.

**Fix:** Narrow to a specific sub-type with a specific problem at a specific stage. "Solo founders using Cursor who need to launch their first product" self-identifies, gathers in specific communities, and has nameable objections.

### Near-Miss 2 — High Pain, No Access

A B2B SaaS identifies healthcare administrators: crushing pain (manual compliance), huge money ($50K+ annual spend), strong fit. Score: 26/30. But reachability scored 2 — they don't attend the team's conferences, procurement requires 6-month vendor approval, and cold outreach bounces.

**Consequence:** 18 months and $400K to close 3 customers. Pivots to fintech (reachability 5), closes 15 in 4 months.

**Fix:** The reachability gate (Step 3) should disqualify segments scoring < 3 regardless of total. High pain behind a wall wastes money.

### Near-Miss 3 — User ≠ Buyer (Yupp.ai)

$33M raised. 1.3M user signups for AI model comparison. The USER avatar scored well on everything. The BUYER avatar (AI research labs purchasing preference data) was too small to sustain the business. Shut down April 2025, less than a year after launch. (TechCrunch 2025)

**Fix:** Always separate USER from BUYER. Run scoring on the BUYER. Brand guides built around user avatars produce engagement metrics and zero revenue.

---

## Anti-Patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Demographic-only avatar** | "25–35, male, urban, $75K" describes millions of unrelated people | Lead with problem state and buying context; demographics are metadata |
| **Aspirational avatar** | Picking who you WISH you could serve instead of who you CAN reach now | Score reachability honestly; first avatar = one you can win with current resources |
| **Premature splitting** | 5 detailed personas before validating one will buy | Pick ONE primary. Add secondary only after primary is validated with revenue |
| **Marketing-language profile** | "Seeks innovative solutions" instead of "I just need this to work" | Every quote must pass "would they say this to a friend?" |
| **Buyer/user conflation** | Building brand around users when someone else writes the check | Always ask "who pays?" — if different from user, score the BUYER |
| **Scoring from vibes** | Filling scores without citing research evidence | "Evidence" column is mandatory; no citation = score caps at 2 |

---

## Benchmarks

| Metric | Value | Source | Year | Confidence |
|---|---|---|---|---|
| Revenue overperformance from documented personas | 2.2x more likely to exceed goals | Cintell (137 B2B orgs) | 2016 | Observed |
| Conversion lift from persona-targeted pages | 238% | Invesp (case study) | 2023 | Observed |
| B2B buying committee size | 6–13 stakeholders | Gartner | 2026 | Observed |
| CLV increase from segment-specific personalization | 149% | Aidentical (ecommerce case) | 2025 | Observed |
| Startups failing from wrong problem/avatar | 42–43% | CB Insights (431 post-mortems) | 2024 | Observed |
| ICP high-priority threshold | 16–20 / 20 | GTM Signal Studio | 2026 | Observed |
| ICP disqualify threshold | < 10 / 20 | GTM Signal Studio | 2026 | Observed |

---

## Handoff Rules

- **Downstream → brand-guide-creation:** Avatar profile feeds "Audience and Positioning." Belief map feeds "Messaging Pillars" and "Voice and Tone." Objection inventory informs "Proof and Trust Layer."
- **Downstream → constructing-a-funnel:** Belief map becomes stage-by-stage belief shift sequence. Objections feed trust stages. Triggers determine entry point design.
- **Downstream → constructing-a-landing-page:** Dream outcome → headline direction. Objections → FAQ and trust sections. Day-in-the-life → hero context and imagery.
- **Downstream → lead-magnet-creation:** Problem state and aspiration gap determine magnet type and awareness-stage match.
- **Upstream → offer-pillar-discovery:** If market research doesn't exist, route here first. Offer pillar discovery produces the research this skill consumes.
- **Upstream → deep-web-research:** If research is thin (fails Step 0 quality gate), fill gaps before continuing.
- **Adjacent → stakeholder-discovery:** After picking the avatar, validate with real interviews. The avatar profile becomes interview target specification.

---

## Reference Sources

1. Cintell — "B2B Buyer Persona Benchmark Study." 2016 (137 organizations)
2. Invesp — "Using Personas to Increase Conversion Rate." Case study, 238% improvement
3. Aidentical — "AI Avatar Personalization Case Study." 2025 (149% CLV increase)
4. CB Insights — "Top Reasons Startups Fail." 2024 (431 post-mortems)
5. GTM Signal Studio — "ICP Scoring: Pain, Money, Fit." 2026
6. Gartner — "B2B Buying Committee Size." 2026
7. Geisheker — "How to Create a Buyer Persona for B2B Companies." 2026
8. TechCrunch / BitcoinWorld — "Yupp.ai Shutdown." 2025
9. Factors.ai — "Customer Avatar: Complete B2B Guide." 2025
