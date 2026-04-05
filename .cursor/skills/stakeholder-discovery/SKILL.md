---
name: stakeholder-discovery
description: Repeatable playbook for finding and interviewing key stakeholders to validate an offer pillar hypothesis. Produces a pain proximity map, target list, outreach plan, interview protocol, and structured synthesis of findings. Use when a hypothesis needs human validation before building.
last-reviewed: 2026-04-04
---

# Stakeholder Discovery for Offer Pillar Validation

**Pattern:** Linear Pipeline (Pattern 2). One workflow regardless of context — the variation is in inputs (industry, hypothesis, timeline), not process. Selected over Routed Playbook because the interview-based discovery process is the same whether the user is in healthcare, SaaS, or fintech.

Slash command: `/stakeholder-discovery`

---

## Trigger

Use this skill when the user has an **Offer Pillar Hypothesis** and wants to validate it through interviews with people who live closest to the pain.

Also invoke when:
- "I need to validate this business idea"
- "Who should I talk to about [problem]?"
- "How do I find people to interview for [market]?"
- "Help me run customer discovery for [offer]"

---

## Step 0 — Collect Inputs

Before starting, gather the following. Ask only for what is missing.

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Offer pillar hypothesis | The specific pain you're testing — must be a testable statement, not a vague direction | — (must ask) |
| Industry / market | Determines which roles, conferences, and consultants to target | Infer from hypothesis |
| Geography | Determines LinkedIn filters, conference selection, and regulatory context | Global |
| Timeline | Determines whether to use the consultant backdoor (fast) or full discovery (thorough) | 3 weeks |
| Budget for compensation | Determines value nugget strategy (report vs. gift card vs. co-authorship) | Zero — use benchmark report as compensation |
| Existing data | Any prior interviews, surveys, or market research already done | None |
| Validation goal | Problem validation, solution direction, pricing, or pivot-or-persevere | Problem validation |

---

## Quality Gate — Is the Hypothesis Ready?

Before proceeding, the hypothesis must pass this test:

**Fill in:** "We believe that ___ [specific role] at ___ [company type] currently struggles with ___ [specific problem] because ___ [root cause], costing them approximately ___ [time/money estimate] per ___ [period]."

If you cannot fill in at least the role, company type, and problem, the hypothesis is too vague. Handoff to `offer-pillar-discovery` first.

If you can fill in everything except the cost estimate, proceed — quantifying cost is one of the goals of discovery.

---

## Step 1 — Pain Proximity Map

Translate the offer pillar into a "Who Knows the Pain" map.

**Procedure:** For each candidate role, fill in this row:

| Role | Why they see the pain | How many companies' pain they see | Insight score (1-10) |
|---|---|---|---|
| ___ | ___ | Single company / 5-10 / dozens / hundreds | ___ |

Score by insight density — people who see MULTIPLE companies' problems score highest because they can identify patterns, not just anecdotes.

| Insight density | Score range | Example roles |
|---|---|---|
| Sees hundreds of companies | 9-10 | Industry consultants, auditors, analyst firms |
| Sees dozens of companies | 7-8 | Software vendors (sales engineers, PMs), industry association leaders |
| Sees their own company deeply | 5-6 | Operators (CISO, Head of Ops, Director of X) |
| Sees the problem secondhand | 3-4 | Adjacent roles, junior staff, general managers |

**Start outreach at score 7+.** Prioritize 9-10 for the first interviews.

**Worked example — NIS2 compliance hypothesis:**

| Role | Why they see the pain | Companies seen | Score |
|---|---|---|---|
| GRC consultants | Implement compliance programs end-to-end | Dozens per year | 10 |
| NIS2 auditors | See every failure mode during assessments | 20-50 per year | 9 |
| GRC software vendors (sales engineers) | Hear every objection and workaround | Hundreds of prospects | 8 |
| CISO / security lead | Owns the compliance mandate internally | 1 (their own) | 6 |
| IT director | Bears the operational workload | 1 (their own) | 5 |

---

## Step 2 — Build Target List (30-50 people)

Target 30-50 people to yield 10-15 completed interviews. Use four channels in parallel.

### Expected Response Rates by Channel

| Channel | Expected response rate | Implication for list size |
|---|---|---|
| Conference speaker outreach (pre/post event) | 25-40% | 15 targets → 4-6 interviews |
| LinkedIn connect → follow-up message | 6-14% net | 50 targets → 3-7 interviews |
| LinkedIn InMail (personalized, <400 chars) | 10-25% | 20 targets → 2-5 interviews |
| Cold email (personalized) | 3-8% | 40 targets → 1-3 interviews |

Sources: SaleSso 2025, EngageKit 2025, EmailAFI 2026, Momencio 2026.

Cold email is in structural decline (below 2% average, down from 5-8% pre-2024) due to Gmail AI spam filters and AI-generated email fatigue (Outvid AI, 2026). Use as supplement to LinkedIn, not primary channel.

### Channel 1 — LinkedIn Role Mining (goal: 15 prospects)
Search pattern: `"[role]" + "[industry]"`
- Filters: geography, company size, seniority
- Target titles: Head of, Director, Partner, Principal, Founder
- Avoid junior roles — they see symptoms, not root causes
- Send connection requests WITHOUT a note (55-68% acceptance vs. 28-45% with note — ReactIn 2025), then pitch in the follow-up message

### Channel 2 — Conference Speaker Mining (goal: 10 prospects)
Search: `[Industry] conference speakers [year]` or `[topic] summit agenda`
- Speakers are information-dense: consultants, vendors, regulators, practitioners
- Pre-event outreach with a specific ask yields 25-40% response
- **48-hour rule:** conference contacts decay 80% after 48 hours (Conference Hero, 2026) — follow up same day or next day

### Channel 3 — Vendor Ecosystem (goal: 10 prospects)
Find companies selling into the space (GRC software, audit platforms, etc.)
- Target: solutions engineers, product managers, sales engineers
- They hear every customer objection and know which problems are real vs. perceived

### Channel 4 — Consultant Firms (goal: 10-15 prospects)
Search: `[Industry] consulting [geography]`
- These people see dozens of implementations per year
- Highest insight density — prioritize this channel

---

## Step 3 — Match Value Nugget to Avatar

Compensation must feel personally useful to the interviewee. Tailor by role:

| Role | Primary motivation | Value nugget |
|---|---|---|
| Consultants | Thought leadership, lead gen, visibility | Industry benchmark report with their name cited |
| Operators (CISO/Head of X) | Benchmarking against peers, career reputation | Peer benchmark data, operational playbooks |
| Vendors | Customer insights, competitive intel | Customer pain research, objection analysis |
| Auditors | Industry authority, lead gen | Quoted in report, co-author credit |

---

## Step 4 — Outreach Message

Position as **industry research**, never as "customer discovery" or "startup idea."

### LinkedIn follow-up message (after connection accepted):
```
Hi [Name]

I'm mapping how [industry] companies currently handle [specific process].

We're interviewing [number] practitioners to build a benchmark report on what's working and what isn't.

Participants get the full report before it's published.

Would you be open to a 20-minute call this week or next?
```

### Conference speaker outreach (pre-event):
```
Hi [Name]

I saw you're speaking at [conference] on [topic]. I'm researching [specific problem area] and building an industry benchmark report.

Your perspective from [their specific angle] would be valuable. Would you have 20 minutes before or after the event?

Participants receive the report with attribution.
```

Rules: under 70 words. No pitch. No company description. The value exchange (benchmark report) must be in the message.

---

## Step 5 — Interview: Workflow Deconstruction

### Opening question
> "Walk me through how you currently handle [process], step by step."

### Probe sequence (use in order as needed)
1. "Where does that process break down?"
2. "Tell me about the last time that happened." ← stories reveal real workflows
3. "What did you end up doing about it?"
4. "What have you tried that didn't work?"
5. "What tools or workarounds are you using today?"
6. "If you could hire someone to sit next to you and handle this, what would you have them do?" ← reframe from First Round Review, 2024
7. "Roughly how much time/money does this cost you per [month/quarter/year]?"

### Three types of bad data to reject (The Mom Test)

| Bad data type | What it sounds like | Why it's worthless |
|---|---|---|
| Compliments | "That's a great idea!" | Emotional support, zero information |
| Fluff | "I would probably use that" | Hypothetical future behavior is unreliable |
| Ideas | "You should add feature X" | Their design thinking, not their actual problems |

Only **commitments** count: time, money, or reputation on the line. "I would pay for that" is fluff. "Here's a purchase order" is a commitment. (Fitzpatrick, *The Mom Test*, 2013)

### Post-Interview Extraction Template

After each interview, fill in immediately:

| Field | Value |
|---|---|
| Interviewee role and company type | ___ |
| Key workflow described | ___ |
| Top breakpoint identified | ___ |
| Tools/systems mentioned | ___ |
| Manual workarounds discovered | ___ |
| Quoted cost or time figure | ___ |
| Strongest signal quote (verbatim) | "___ " |
| Signal strength (1-5) | ___ |
| New hypothesis or refinement triggered | ___ |
| Contradicts previous interviews? | Yes/No — if yes, how: ___ |

---

## Step 6 — Signal Detection

### Pillar-Validating Signals

| Signal type | What to listen for | Example quote |
|---|---|---|
| Time sink | Disproportionate time spent on low-value work | "We spend 2 days a month just on this report" |
| Universal pain | Multiple companies share the same struggle | "Every company I work with has this problem" |
| Manual workaround | People built their own systems around the gap | "We have a 47-tab spreadsheet for this" |
| Budget exists | Money already flows to solve this (consultants, tools, headcount) | "We're paying $200K/year for a consultant to handle this" |
| Urgency / deadline | External forcing function creates time pressure | "We have to be compliant by October or face fines" |
| Emotional intensity | Frustration, embarrassment, fear in their voice | "It keeps me up at night" |

### Pillar-Killing Signals

| Signal type | What to listen for | Implication |
|---|---|---|
| Solved problem | "We already have a tool for that" | Pain is addressed — look for adjacent unsolved pain |
| Low priority | "It's annoying but not urgent" | No budget will be allocated |
| No buyer | Pain is real but nobody owns the budget | Pillar needs narrowing to a budget-owning role |
| False premise | "That's not actually how it works" | Your hypothesis is based on a misunderstanding |

---

## Step 7 — Synthesis and Pillar Update

### When to synthesize

**Full synthesis (validation-ready):** After 8-12 interviews, run the full Pattern Analysis Table below. This is the target for pillar validation decisions.

**Checkpoint synthesis (mid-process):** If you have 5-7 interviews and patterns are emerging but new themes are still appearing, run a provisional Pattern Analysis Table marked "PROVISIONAL — not validation-ready." Use it to sharpen your remaining interview questions, not to make pillar decisions.

**Saturation rule:** Apply the **3-interview stop rule** — when 3 consecutive interviews yield no new themes, you have reached saturation regardless of total count (CraftUp Learn, 2026; supported by Guest, Bunce & Johnson 2006 finding that 6 interviews capture high-level metathemes and 12 capture 92% of thematic codes). At saturation, proceed to full synthesis even if you haven't reached 8.

### Synthesis procedure

Fill in the Pattern Analysis Table:

| Pattern | Interview count confirming | Strongest quote | Contradicting evidence | Signal strength |
|---|---|---|---|---|
| ___ | ___/total | "___ " | ___ | Strong/Moderate/Weak |

**Validation thresholds:**
- 8/10 interviewees describe the problem unprompted = **validated** (knowledgelib.io, 2026)
- 5-7/10 = **promising but needs more data**
- <5/10 = **weak signal — consider pivoting the hypothesis**

### Pillar evolution template

Fill in after synthesis:

- **Initial hypothesis:** "___"
- **Refined hypothesis:** "___"
- **What changed and why:** "___"
- **Strongest evidence:** "___" (quote from interview ___) 
- **Strongest counterevidence:** "___"
- **Decision:** Proceed to build / Pivot hypothesis / Gather more data

---

## Step 8 — Execution Timeline

| Week | Actions | Success metric |
|---|---|---|
| Week 1 | Build pain proximity map, identify 30-50 targets, send outreach, book first interviews | 10+ interviews scheduled |
| Week 2 | Run 8-12 interviews, fill extraction templates, begin pattern analysis | Extraction templates completed, first patterns identified |
| Week 3 | Synthesize findings, update pillar, validate willingness to pay | Pattern analysis table filled, pillar decision made |

---

## The Consultant Backdoor Strategy

Instead of 30-50 targets across 4 channels, shortcut discovery by interviewing **just 3-5 consultants** first. Consultants see dozens of implementations per year and compress months of operator interviews into hours.

**When to use:** timeline <2 weeks, or when the industry is unfamiliar and you need fast orientation before targeting operators.

**When NOT to use:** when you need operator-level workflow detail that consultants may gloss over, or when pricing validation requires end-buyer conversations.

Academic support: Guest, Bunce & Johnson (2006) found basic metathemes emerge as early as 6 interviews. With high-insight-density consultants, 3-5 interviews often suffice for directional validation.

---

## Worked Example — LeadSift: 80+ Interviews to $1M ARR

**Company:** LeadSift (B2B SaaS, social data analytics)
**Source:** SaaS Club podcast, 2019

**Context:** After spending $1.8M and 3 years on two failed pivots (automotive brands, then ad agencies), co-founder Tukan Das committed to structured discovery with only 1 year of runway remaining.

**What they did:**
1. Conducted **80+ prospect interviews** before writing any code
2. Set an **80% validation threshold** — would not commit to development until 80% of interviewees confirmed the pain
3. Delivered value manually via spreadsheets while automating gradually
4. Secured **3 paying customers before any code was written**

**Critical discovery:** The pain wasn't with brand marketers (original thesis) but with **B2B sales teams** who needed social data to prioritize leads. The entire positioning shifted because of the volume of interviews.

**Outcome:** Within 17 months of the final pivot: 105 customers, ~$1M ARR, 13% month-over-month growth.

**Key lesson:** Volume matters. 80+ interviews revealed a positioning insight that 10 interviews might have missed. The 80% validation threshold prevented premature commitment. Securing payment before code eliminated the "nice idea" trap.

---

## Near-Miss Counter-Example — Project Slip: Right Industry, Wrong Everything Else

**Company:** Project Slip (solo founder, Michael Scepaniak, 2012)
**Source:** michaelscepaniak.com

**What looked right:** Scepaniak identified a real problem in financial record-keeping and targeted bookkeepers — a plausible stakeholder group. He conducted ~25 outreach conversations. This looks like competent discovery on the surface.

**What went wrong (failed on exactly one principle — he pitched instead of probing):**
- His LinkedIn InMail led with the product ("targeted for use by bookkeepers to detect fraudulent credit/debit card transactions") instead of asking about their workflow
- Pre-framing every conversation meant he collected opinions about his idea rather than data about their world
- He discovered too late that the IRS doesn't require matching every transaction to a receipt — a false premise that open-ended discovery would have surfaced in interview 1

**Compounding errors:** Wrong timing (peak tax season), wrong stakeholders (bookkeepers had pushed receipt reconciliation back to clients), and self-validation bias (built the tool for himself first, assumed others shared his pain).

**Outcome:** After ~25 conversations, only 2 lukewarm prospects. Zero earlyvangelists. Project shelved.

**Minimal fix:** Replace the product-pitch opening with "Walk me through how you currently handle receipt reconciliation" — the skill's Step 5 opener. This single change would have surfaced the false premise (IRS doesn't require it) and the wrong-stakeholder problem (bookkeepers don't do it) within the first 3 interviews.

---

## Benchmarks

### Interview Saturation Thresholds

| Goal | Minimum | Sweet spot | Diminishing returns | Confidence |
|---|---|---|---|---|
| Offer pillar validation (problem exists?) | 6 | 10-12 | 15+ | Observed — Guest et al. 2006 |
| Solution direction (what to build?) | 8 | 12-15 | 20+ | Observed — Hennink & Kaiser 2022 |
| Pricing / willingness to pay | 12 | 15-25 | 30+ | Inferred — CraftUp Learn 2026 |
| Consultant shortcut (high-insight-density) | 3 | 5 | 8+ | Inferred — derived from saturation + insight density |

### Macro Context

| Statistic | Value | Source | Confidence |
|---|---|---|---|
| Startups failing due to no market need | 42-43% | CB Insights 2024 (431 post-mortems) | Observed |
| Startups that pivot at least once | 92% | WinSavvy 2025 (aggregated) | Inferred |
| Segment's cost of skipping discovery | $500K + 18 months | Peter Reinhardt, YC Blog 2017 | Observed |

---

## Anti-Patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Pitching during discovery** | Turns interviews into sales calls. You collect opinions about your idea instead of data about their world. >20% of interview time on your solution = you're pitching. | Use Step 5's opening question. Talk <20% of the time. (The Mom Test) |
| **Confirmation bias** | Interpreting ambiguous signals as validation because you want them to be. | Actively seek disconfirming evidence. Ask "What would make this problem NOT worth solving?" |
| **Asking "What's your biggest pain point?"** | People have already solved known problems. This question surfaces solved problems, not unsolved ones. Jake Stauch ran dozens of interviews with this question and "got nowhere." (First Round Review, 2024) | Use the "hire somebody" reframe: "If you could hire someone to handle part of your job, what would you have them do?" |
| **Collecting compliments and hypotheticals** | "I would definitely pay for that" is not a commitment. It's social politeness. | Only count commitments: a letter of intent, a deposit, a signed contract, or allocated time. (Fitzpatrick, 2013) |
| **Targeting only people who agree with you** | Creates echo chamber. Feels like validation but misses the market. | Include 2-3 interviews with skeptics or people who chose a competing solution. |
| **Skipping the consultant backdoor when time-constrained** | Interviewing 15 operators over 3 weeks when 3 consultants could give you directional signal in 3 days. | When timeline <2 weeks, start with consultants. Operators come second. |
| **Not recording economic signals** | Qualitative pain without quantification produces empathy but not a business case. | Step 5 question 7 ("How much time/money...") is mandatory, not optional. |

---

## Quality Gates

Do not declare the pillar validated unless all gates pass:

- [ ] Minimum 8 completed interviews (or 3 consultant-backdoor interviews for directional validation)
- [ ] At least 3 independent confirmations of the same core pain
- [ ] At least 1 economic quantification (time or money cost) from an interviewee
- [ ] At least 1 piece of counterevidence explored and resolved
- [ ] Pattern analysis table is filled with confidence ratings
- [ ] Pillar evolution template shows what changed from initial hypothesis
- [ ] No critical claim relies on a single interview (triangulation rule)

If any gate fails, add a **Research Gaps** section specifying what is missing and what 2-3 targeted interviews would fill it.

---

## Handoff Rules

- **Upstream — offer-pillar-discovery:** If the user doesn't have a hypothesis specific enough to test, route to `offer-pillar-discovery` to generate candidate pillars first.
- **Upstream — deep-web-research:** If the industry is unfamiliar, run `deep-web-research` to build market context before targeting stakeholders.
- **Downstream — lead-magnet-creation:** Once the pillar is validated, use `lead-magnet-creation` to design a magnet that tests market demand at scale. The value nugget (benchmark report) from Step 3 can itself become the lead magnet.
- **Downstream — consult-hormozi:** For offer design and pricing after the pillar is validated, route to `consult-hormozi` to apply Hormozi's Value Equation and Grand Slam Offer frameworks.
- **Adjacent — constructing-a-funnel:** If the validated pillar needs a full acquisition funnel, route to `constructing-a-funnel`.

---

## Output Templates

### Template A — Discovery Plan (before interviews)

```markdown
## Stakeholder Discovery Plan

**Hypothesis:** "___"
**Hypothesis readiness test:** [filled-in sentence from Quality Gate]

## Pain Proximity Map
| Role | Why they see the pain | Companies seen | Score |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

## Target List Summary
- Channel 1 (LinkedIn): ___ targets
- Channel 2 (Conferences): ___ targets
- Channel 3 (Vendors): ___ targets
- Channel 4 (Consultants): ___ targets
- Total: ___

## Value Nuggets
| Role | Nugget |
|---|---|
| ___ | ___ |

## Outreach Messages
[Channel-specific messages]

## Interview Protocol
[Opening question + probe sequence]
```

### Template B — Discovery Findings (after interviews)

```markdown
## Stakeholder Discovery Findings

**Initial hypothesis:** "___"
**Interviews completed:** ___
**Saturation reached:** Yes/No (3-interview stop rule)

## Pattern Analysis
| Pattern | Interviews confirming | Strongest quote | Contradicting evidence | Confidence |
|---|---|---|---|---|
| ___ | ___/total | "___ " | ___ | High/Medium/Low |

## Pillar Evolution
- **Initial:** "___"
- **Refined:** "___"
- **What changed:** "___"

## Economic Signals
| Signal | Source | Magnitude |
|---|---|---|
| ___ | Interview ___ | $___ per ___ |

## Decision
[Proceed / Pivot / Gather more data]

## Research Gaps (if any)
| Gap | Impact | Next action |
|---|---|---|
| ___ | ___ | ___ |
```

---

## Reference Sources

1. Guest, Bunce & Johnson — "How Many Interviews Are Enough?" Field Methods 18(1), 2006
2. Hennink & Kaiser — "Sample Sizes for Saturation." Social Science & Medicine 292, 2022
3. Fitzpatrick — *The Mom Test*, 2013
4. Migicovsky — "How to Talk to Users." YC Startup School, 2019
5. Stauch/First Round Review — "Stop Asking 'What's Your Biggest Pain Point?'" 2024
6. CB Insights — "Top Reasons Startups Fail." 2024 (431 post-mortems)
7. Reinhardt — "Finding Product-Market Fit." YC Blog, 2017
8. SaaS Club — "LeadSift: Customer Discovery to $1M ARR." 2019
9. SaleSso — LinkedIn InMail Statistics, 2025-2026
10. EmailAFI — Cold Email Benchmark Report, 2026
11. CraftUp Learn — Interview Saturation Guide, 2026
