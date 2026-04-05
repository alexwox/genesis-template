---
name: offer-pillar-discovery
description: Given an industry or avatar, surface deep, non-obvious, high-value offer pillars and dream outcomes. Routes to the right discovery workflow based on what the user knows (avatar, industry, or both), then applies Hormozi's Dream Outcome framework combined with advanced discovery methods. Use when the user needs to find structural problems with large economic gravity before building.
last-reviewed: 2026-04-04
---

# Offer Pillar Discovery Skill

**Pattern:** Routed Playbook (Pattern 3). The user's starting point (avatar only, industry only, both, neither, or comparison mode) changes which frameworks and methods to run. Selected over Linear Pipeline because 5 distinct entry points require different workflows, and over Configured Playbook because the domain doesn't need overlays or per-unit templates.

## Purpose

Surface deep, non-obvious, high-value offer pillars. Goes beyond surface-level frameworks to find the "gold nugget" — structural problems with large economic gravity.

Without systematic problem discovery, 42-43% of startups fail by picking the wrong problem (CB Insights 2024, 431 post-mortems). The average startup pivots 1.8-2.5 times before finding product-market fit (WinSavvy 2025). This skill aims to compress that to 0-1 pivots by front-loading discovery.

Slash command: `/offerpillar`

---

## Trigger

Invoke this skill when the user asks:
- "What are good offer pillars for [industry]?"
- "Help me find dream outcomes for [avatar]"
- "What problems should I solve in [market]?"
- "Apply the Dream Outcome framework to..."
- "What are unsolved high-value problems in [industry]?"
- "Is this problem worth solving?"
- "Help me find product-market fit"

---

## Step 0 — Collect Inputs

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Industry / market | Determines which frameworks and discovery methods to prioritize | — (must ask) |
| Avatar (specific role) | Determines dream outcome framing and buyer identification | Infer from industry if possible |
| Stage | Greenfield exploration, hypothesis refinement, or pillar comparison | Greenfield |
| Existing data | Prior interviews, market research, revenue data, customer feedback | None |
| Depth | Quick scan (1 pass) or deep discovery (multi-framework + web research) | Quick scan |
| Geography | Determines regulatory context and market boundaries | Global |

---

## Step 1 — Route to Discovery Workflow

Select exactly one route based on the user's starting point.

```
IF user has neither avatar nor industry (only a technology or capability):
  → Route 0: Pre-Discovery
  Flag the "solution-first" anti-pattern. Route to high-cagr-market-discovery or deep-web-research
  to identify an attractive market first, then return to Route B.

ELIF user has a specific avatar but no industry insight:
  → Route A: Avatar-First Discovery
  Run: Dream Outcome Framework (Phase 1) → Workflow Decomposition + Shadow Process Mining → Quality Scorecard

ELIF user has an industry but no specific avatar:
  → Route B: Industry-First Discovery
  Run: Framework Selection (Phase 3) → Discovery Methods (Phase 4) → Identify avatars from pain → Dream Outcome Framework → Quality Scorecard

ELIF user has both avatar and industry and wants to validate a specific pillar:
  → Route C: Pillar Validation
  Run: Quality Scorecard (Phase 2) directly → Gap analysis → Targeted frameworks only for weak criteria

ELIF user wants to compare multiple pillars:
  → Route D: Pillar Comparison
  Run: Quality Scorecard for each candidate → Composite scoring → Rank and recommend
```

---

## Phase 1 — Dream Outcome Framework (Hormozi)

The goal is to construct an offer in the form:
**"Get X without Y in Z time"** — with X being quantifiable.

### Procedure: Fill in the Dream Outcome Worksheet

Complete each row before moving to the next:

**1. Painful Current State**

Fill in: "Right now, ___ [avatar] at ___ [company type] wastes ___ [time/money] on ___ [specific task] because ___ [root cause]."

Rule: Pain must be at least one of — **expensive, urgent, or embarrassing**. If it's none of these, it's a "nice to have" that won't generate budget.

**2. Dream Outcome**

Fill in: "In 12 months, they want to be able to say: '___.' The metric that proves it: ___ [specific number]."

**3. Objections to Remove**

For each objection, name the removal:

| Objection | Removal mechanism |
|---|---|
| "It takes too long" | ___ [specific timeframe promise] |
| "It's too much effort" | ___ [done-for-you / automated / templated] |
| "I'm not sure it'll work" | ___ [guarantee / proof / case study] |
| "It's too complex" | ___ [no technical team / turnkey / guided] |

**4. Quantification**

Fill in: "This saves/generates $___ per ___ [period]. The calculation: ___ [show the math]."

- Bad: "improve efficiency"
- Good: "reduce vendor risk assessment time from 40 hours to 4 hours per quarter, saving $18K/quarter at blended consultant rates"

**5. Perfect Outcome Test**

Fill in: "If this worked perfectly, the customer would say: '___'"

That sentence is usually the true dream outcome — more honest than anything you'll write in a positioning document.

**6. Offer Statement**

Formula: **Get [quantified result] without [primary objection] in [timeframe]**

Advanced: **[Result] + [Mechanism] + [Objection Removal] + [Timeframe]**

---

## Phase 2 — Pillar Quality Scorecard

A pillar is strong if it scores well on all six criteria. This is the primary evaluation gate.

### Procedure: Fill in the scorecard for each candidate pillar

| Criterion | Evidence required | Your evidence | Score (0-2) |
|---|---|---|---|
| **Money attached** — someone already spends money solving this | Name the budget line item: "___ currently spend $___ on ___" | ___ | ___ |
| **Urgency** — problem cannot be ignored | Name the forcing function: "They must act because ___" | ___ | ___ |
| **Quantifiable impact** — you can say "this saves $X" | Show the math: "$___ per ___ [period]" | ___ | ___ |
| **Clear buyer** — you know who signs the check | Name the title: "The budget owner is ___ [title] at ___ [company type]" | ___ | ___ |
| **Repetition** — problem happens repeatedly | Frequency: "This occurs ___ times per ___ [period]" | ___ | ___ |
| **Executive gravity** — CEO/CFO talks about it | Board-level evidence: "This appears in ___ [earnings calls / board decks / annual reports]" | ___ | ___ |

**Scoring:** 0 = no evidence, 1 = indirect evidence or assumption, 2 = direct evidence (interview data, public data, budget confirmation)

**Thresholds:**
- 10-12/12 = Strong pillar — proceed to validation
- 7-9/12 = Promising — identify which criteria are weak and research them
- <7/12 = Weak — consider pivoting or combining with another pillar

### The Budget-Owner Test (Critical)

The most underappreciated failure mode: **everyone feels the pain, but nobody owns the budget.**

In enterprise sales, "no decision" is a larger loss category than losing to competitors combined (Minoa, 2025). A champion without budget authority will stall the deal for months and eventually abandon it.

Fill in: "The person who can sign a check for this is ___ [specific title]. Their budget authority is $___ [range]. They report to ___ [who]. The business case they would make to their boss: '___'"

If you cannot fill this in, the pillar needs narrowing to a role that owns budget.

---

## Phase 3 — Framework Selection

Instead of running all 7 frameworks, select based on context:

| Framework | When to use | Best for |
|---|---|---|
| **Profit Driver Analysis** | Always run first — universal | Any industry, any avatar |
| **Boardroom Conversation Analysis** | Enterprise / B2B targets | Finding executive-gravity problems |
| **Structural Friction Zones** | Complex, multi-party systems | Finding coordination failures |
| **$1M Spreadsheet Signal** | Process-heavy industries | Finding automation opportunities |
| **Regret Problems** | High-stakes industries (healthcare, finance, security, legal) | Finding guaranteed-budget problems |
| **Theory of Constraints** | User already has a business to optimize | Finding the single bottleneck |
| **Hidden Tax Framework** | Large organizations with invisible overhead | Finding cost-reduction opportunities |

### Framework 1 — Profit Driver Analysis

Every business optimizes five levers. Pillars touching these are automatically high value.

**Procedure:** For each lever, identify the avatar's specific problem:

| Lever | Avatar's specific problem | Current cost | Who owns it |
|---|---|---|---|
| Revenue (increase sales) | ___ | ___ | ___ |
| Cost (reduce expenses) | ___ | ___ | ___ |
| Risk (avoid catastrophic losses) | ___ | ___ | ___ |
| Capital (improve return on capital) | ___ | ___ | ___ |
| Speed (accelerate growth) | ___ | ___ | ___ |

### Framework 2 — Boardroom Conversation Analysis

**Procedure:** For the target industry, fill in: "In their quarterly board meeting, the CEO/CFO argues about ___ because ___ . The KPI that's underperforming: ___."

### Framework 3 — Structural Friction Zones

Where systems naturally break down:

| Zone | Industry-specific example | Economic cost |
|---|---|---|
| Markets: pricing inefficiencies | ___ | ___ |
| Organizations: communication breakdown | ___ | ___ |
| Processes: manual workflows | ___ | ___ |
| Information: data fragmentation | ___ | ___ |
| Incentives: misaligned goals | ___ | ___ |

### Framework 4 — The $1M Spreadsheet Signal

Wherever you find giant spreadsheets, manual analysis, extensive human review — there is a pillar hiding. Humans compensating for broken systems = opportunity.

**Procedure:** Search for "[industry] spreadsheet problem" or "[role] manual process" in forums, Reddit, LinkedIn. Document what you find:

| Manual process found | Who does it | Frequency | Estimated cost |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

### Framework 5 — Regret Problems

Problems where failure leads to regret have guaranteed budgets. Nobody gets fired for preventing disaster.

| Domain | Regret problem | Budget signal |
|---|---|---|
| Finance | Investment mistakes, compliance failures | ___ |
| Healthcare | Missed diagnoses, treatment delays | ___ |
| Security | Breaches, data loss, fraud | ___ |
| Legal | Missed deadlines, malpractice exposure | ___ |

### Framework 6 — Theory of Constraints

Every system has one limiting factor. Find it:

**Procedure:** Map the value chain: ___ → ___ → ___ → ___ → ___. Which stage has the lowest throughput? That's the constraint. Everything upstream is starved; everything downstream is waiting.

### Framework 7 — Hidden Tax Framework

Invisible costs that drain businesses without appearing on any line item:

**Procedure:** For the target industry, estimate: "The hidden coordination overhead costs approximately $___ per employee per year because ___."

---

## Phase 4 — Discovery Methods

Use these when frameworks alone don't surface specific enough problems. Select based on what information is missing.

| Method | When to use | What it reveals |
|---|---|---|
| **Workflow Decomposition** | You know the job but not the pain points | Step-by-step breakpoints and manual steps |
| **Shadow Process Mining** | You suspect workarounds exist | Unofficial systems that reveal broken official ones |
| **Expert Complaint Mining** | You need external signal fast | What practitioners actually complain about |
| **Regulation Mapping** | Regulated industry | Forced processes with guaranteed demand |
| **Budget Line Item Method** | You need to confirm money flows | What companies already pay for |
| **Decision Bottleneck Method** | Enterprise/complex decisions | Where data is messy and decisions slow |
| **Failure Postmortem Method** | Mature industry with documented failures | Structural weaknesses that recur |
| **Information Asymmetry Method** | Multi-party markets | Where one side has more info than the other |
| **Pain Multiplier Method** | High-frequency, low-intensity problems | Small pain x massive scale = massive opportunity |
| **Adjacent Market Transfer** | Looking for novel solutions | What works in industry A but doesn't exist in B |

For deep discovery, run `deep-web-research` on the top 2-3 methods that are most relevant.

---

## Pillar Scoring — Composite Formula

For comparing multiple pillars, use this composite score:

```
Pillar Score = Quality Scorecard (0-12)
             + Budget Growth Signal (0-3)
             + Opportunity Gap (0-3)

Budget Growth Signal:
  3 = budget line item growing >15% YoY
  2 = growing 5-15% YoY
  1 = flat or growing <5%
  0 = shrinking

Opportunity Gap (Ulwick-inspired):
  3 = high importance + low satisfaction (Opportunity Score >12)
  2 = high importance + moderate satisfaction (Score 10-12)
  1 = moderate importance + low satisfaction (Score 6-10)
  0 = low importance or high satisfaction
```

Maximum: 18. Pillars scoring 14+ are strong candidates. 10-13 need more evidence. <10 should be deprioritized.

Sources: Ulwick Opportunity Score (Strategyn, 2005); Budget growth signals (Gartner IT Spending 2026).

---

## Worked Examples

### Example 1 — Slack: Accidental Pillar Discovery Through Dogfooding

**Industry:** Team communication
**Discovery method:** Internal usage observation (Shadow Process Mining)

Tiny Speck spent 3 years building Glitch, a multiplayer online game. The distributed team built an IRC-based communication tool to coordinate development. When the game failed, they noticed the internal tool was the thing nobody could stop using — a stronger market signal than any external validation.

**Pillar Quality Scorecard:**
| Criterion | Evidence | Score |
|---|---|---|
| Money attached | Companies paying for email, Slack alternatives, IT coordination | 2 |
| Urgency | Team communication is daily, mission-critical | 2 |
| Quantifiable impact | Reduced email volume by 48.6% (internal data) | 2 |
| Clear buyer | IT Director / Head of Engineering | 2 |
| Repetition | Used every working hour | 2 |
| Executive gravity | "Why is cross-team coordination so slow?" | 2 |
| **Total** | | **12/12** |

**Outcome:** 10M+ DAU by 2019, $27.7B Salesforce acquisition. (TechCrunch 2019, founded.com)

**Key lesson:** The highest-value pillar was hiding inside the team's own workflow. The "can't-stop-using" signal is an organic proxy for the Sean Ellis "very disappointed" test.

### Example 2 — Instagram: Pillar Discovery Through Usage Analytics

**Industry:** Social media / photo sharing
**Discovery method:** Behavioral analytics on existing users (Workflow Decomposition)

Burbn was a Foursquare-style check-in app with 100 users. Systrom and Krieger observed that users were primarily using the photo-sharing feature, ignoring check-ins entirely. Instead of adding features, they subtracted everything except photo sharing.

The filters breakthrough came from Systrom's wife saying she wouldn't share photos "because they don't look good enough" — direct customer feedback resolving a specific adoption barrier.

**Outcome:** 100K users in week 1, $1B Facebook acquisition in 18 months. (Startup Archive, TechCrunch 2010)

**Key lesson:** The winning pillar was already present in the existing product — it just needed isolation. Usage data beats opinion data. This maps to Hormozi's "find the thing they're already paying for with time/attention."

---

## Near-Miss Counter-Example — AI Search Tool: Perfect Scores, Zero Adoption

**Company:** Unnamed B2B SaaS (documented by Richard Ewing, product advisor, 2025)
**Source:** Built In, 2025

**What looked right:** The team built an AI-powered search tool achieving 0.92 nDCG relevance scores (vs. 0.65 for legacy search). State-of-the-art RAG pipelines, vector databases, latest LLMs. If you scored this on a pillar quality checklist, it would pass on most criteria — the problem (finding information in proprietary data) is real, urgent, repeated daily, and executives talk about it.

**Where it failed — the Value Test:**
The tool created "homework" (prompting, editing, copy-pasting) rather than removing labor. Users had to stop their workflow, open a sidebar, type a prompt, wait, then manually integrate the answer. It was a destination when it should have been a background utility.

**The three business tests it failed:**
1. **Value Test:** Created work instead of removing it
2. **Margin Test:** At $0.08/query on flat-rate $29/month, power users cost more to serve than they paid
3. **Retention Test:** When the feature went down for maintenance, nobody called support

**Outcome:** Usage flatlined after launch. "The most technically impressive piece of software I have ever shipped. Also the biggest business failure of my career."

**Why this is a near-miss:** The pillar (unlocking proprietary data with AI) passes 5/6 on the quality scorecard. It fails on **clear buyer** — not because nobody wants it, but because the implementation created the wrong value delivery. The problem was real; the pillar formulation was wrong. A better pillar: "Automatically surface the right document at the right moment in the existing workflow, without the user asking."

**Minimal fix:** Reframe from "search tool" (user-initiated, creates homework) to "ambient intelligence" (system-initiated, removes steps). Same underlying technology, different pillar formulation.

---

## Benchmarks

### Why This Matters — The Cost of Skipping Discovery

| Statistic | Value | Source | Year | Confidence |
|---|---|---|---|---|
| Startups failing due to wrong problem | 42-43% | CB Insights (431 post-mortems) | 2024 | Observed |
| Startups that pivot at least once | 92% | WinSavvy (aggregated data) | 2025 | Inferred |
| Average pivots before PMF | 1.8-2.5 | WinSavvy | 2025 | Inferred |
| Time to PMF without systematic discovery | 18-24 months | WinSavvy | 2025 | Inferred |
| Startups that scale prematurely | 70% | Startup Genome (3,200 startups) | 2012 | Observed |
| Premature scalers that break $100K MRR | 7% | Startup Genome | 2012 | Observed |
| Segment's cost of skipping discovery | $500K and 18 months wasted | Peter Reinhardt, YC Blog | 2017 | Observed |

### PMF Validation Thresholds

| Framework | Threshold | What it means | Source |
|---|---|---|---|
| Sean Ellis PMF Score | ≥40% "very disappointed" | Strong product-market fit | Ellis, tested across hundreds of startups |
| Ulwick Opportunity Score | >12 | Significant underserved opportunity | Strategyn (Observed, self-reported 86% success rate) |
| Interview validation | 8/10 describe problem unprompted | Problem is validated | knowledgelib.io 2026 (Inferred) |

### Where Budgets Are Growing Fastest (2025-2026)

| Category | YoY growth | Source | Confidence |
|---|---|---|---|
| AI-optimized servers | ~100% | Gartner 2025 | Observed |
| AI-native software | +94% | Tropic 2025 | Observed |
| Cloud security | +29% | Gartner 2026 | Observed |
| Compliance automation | +25% | BusinessofGRC 2025 | Inferred |
| GRC platforms | +12% CAGR | BusinessofGRC 2025 | Observed |
| Information security (total) | +13% | Gartner 2026 | Observed |

Use these as a "money flow" heuristic: pillars aligned with growing budget categories have structural tailwind.

---

## Anti-Patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Solution-first discovery** | Building backward from a technology ("I have AI, what problem can it solve?") instead of a validated pain. 42-43% of startup failures trace to this (CB Insights 2024). | Start with pain, not capabilities. Phase 1 begins with the customer's current state, not your technology. |
| **Confusing "interesting" with "valuable"** | Academic problems fascinate but don't generate purchase orders. A problem is valuable only if someone already allocates budget to it. | Phase 2 criterion 1 (Money attached) is the first filter. If no budget line item exists, the problem is interesting but not valuable. |
| **Framework dumping** | Running all 7 frameworks + 10 methods produces a long list of plausible-sounding pillars but no prioritized recommendation. | Use the Framework Selection table (Phase 3) to pick 2-3 relevant frameworks. Run the scorecard to rank. |
| **Ignoring the buyer/user distinction** | The person who feels the pain is not always the person who pays. Engineers feel deployment pain; VP Engineering holds the budget. | Phase 2 criterion 4 (Clear buyer) requires naming the budget-owning title, not just the pain-feeling role. |
| **Falling in love with a pillar before validation** | Emotional attachment to an idea makes you interpret ambiguous signals as validation. Segment spent 18 months and $500K this way. | Set a kill criterion before investigating: "I will abandon this pillar if ___ [specific evidence] is found." |
| **Pillar too broad** | "Companies need better analytics" is true but useless — it describes a market, not a pillar. | A pillar must name: who, what specific problem, and what specific outcome. "Mid-market SaaS CFOs need real-time churn prediction to prevent revenue surprises" is a pillar. |

---

## Quality Gates

Do not recommend a pillar for development unless all gates pass:

- [ ] Pillar Quality Scorecard completed with evidence, not assumptions
- [ ] Score ≥10/12 (or explicit plan to strengthen weak criteria)
- [ ] Budget owner identified by title and authority level
- [ ] At least one quantified economic impact ($ or time saved per period)
- [ ] At least one real example or case study showing the problem exists
- [ ] Offer statement compressed into "Get X without Y in Z time" format
- [ ] At least one counterargument considered: "This pillar might fail because ___"

If any gate fails, add a **Research Gaps** section specifying what evidence is missing.

---

## Handoff Rules

- **Downstream — stakeholder-discovery:** When the pillar needs human validation through interviews. The pillar becomes the hypothesis input for `stakeholder-discovery`. This is the default next step — pillars should be interview-validated before building.
- **Downstream — lead-magnet-creation:** When the pillar is interview-validated (via `stakeholder-discovery`) and needs market demand testing at scale. Route to `lead-magnet-creation`. Skip stakeholder validation only if the user has strong existing evidence (customer data, prior interviews, revenue from the problem).
- **Downstream — consult-hormozi:** For detailed offer design, pricing, and the Grand Slam Offer framework. Route to `consult-hormozi`.
- **Upstream — high-cagr-market-discovery:** If the user needs to identify which market to enter before selecting a pillar. Route to `high-cagr-market-discovery`.
- **Adjacent — deep-web-research:** For pillar-level competitive intelligence, budget signal research, and market size estimation. Route to `deep-web-research`.
- **Adjacent — constructing-a-funnel:** When a validated pillar needs an acquisition funnel built around it. Route to `constructing-a-funnel`.

---

## Output Templates

### Template A — Single Pillar Discovery

```markdown
## Offer Pillar: [Name]

**Route used:** [A/B/C/D]
**Frameworks applied:** [which ones and why]
**Discovery methods used:** [which ones and what they revealed]

**Avatar:** [specific role / company type]
**Painful Current State:** "___ [avatar] at ___ [company type] wastes ___ on ___ because ___"
**Dream Outcome:** "___ [quantified future state]"
**Offer Statement:** "Get ___ without ___ in ___ "

### Quality Scorecard
| Criterion | Evidence | Score |
|---|---|---|
| Money attached | ___ | ___/2 |
| Urgency | ___ | ___/2 |
| Quantifiable impact | ___ | ___/2 |
| Clear buyer | ___ | ___/2 |
| Repetition | ___ | ___/2 |
| Executive gravity | ___ | ___/2 |
| **Total** | | **___/12** |

### Budget Owner
"The budget owner is ___ [title] at ___ [company type]. Their budget authority: $___. Business case: '___'"

### Objections Removed
| Objection | Removal |
|---|---|
| ___ | ___ |

### Counterargument
"This pillar might fail because ___. Mitigation: ___."

### Next Steps
1. ___
2. ___
3. ___
```

### Template B — Pillar Comparison

```markdown
## Pillar Comparison: [Industry/Market]

| Dimension | Pillar A | Pillar B | Pillar C |
|---|---|---|---|
| Avatar | ___ | ___ | ___ |
| Core pain | ___ | ___ | ___ |
| Quality Score | ___/12 | ___/12 | ___/12 |
| Budget Growth Signal | ___/3 | ___/3 | ___/3 |
| Opportunity Gap | ___/3 | ___/3 | ___/3 |
| **Composite Score** | **___/18** | **___/18** | **___/18** |
| Biggest risk | ___ | ___ | ___ |

**Recommendation:** Pillar ___ because ___.
**Next step:** [stakeholder-discovery / lead-magnet-creation / deep-web-research]
```

---

## Reference Sources

1. CB Insights — "Top Reasons Startups Fail." 2024 (431 post-mortems)
2. WinSavvy — "Startup Pivot Rates." 2025
3. Startup Genome — "Premature Scaling Report." 2012 (3,200 startups)
4. Reinhardt — "Finding Product-Market Fit." YC Blog, 2017
5. Ellis — "Product-Market Fit Survey." ~2010, validated across hundreds of startups
6. Vohra/Superhuman — "PMF Engine." First Round Review, 2018
7. Ulwick/Strategyn — "Outcome-Driven Innovation." Marketing Journal, 2017
8. Gartner — "IT Spending Forecast." 2025-2026
9. Tropic — "SaaS and AI Buying Trends." 2025
10. BusinessofGRC — "GRC Market Size." 2025-2026
11. Ewing/Built In — "AI Product Business Test." 2025
12. TechCrunch — "Slack Origin Story." 2019
13. Startup Archive — "Instagram Pivot." 2023
