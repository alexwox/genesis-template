---
name: workflow-decomposition
description: Translate role-based organizations into workflow-based organizations by decomposing roles into scored tasks, extracting dark playbooks (proprietary tacit knowledge), formalizing workflows, calculating automation ROI, and producing a sequenced automation roadmap. Use when a company wants to identify what work can be automated, extract undocumented expert knowledge, or build an automation strategy.
last-reviewed: 2026-04-04
---

# Workflow Decomposition

**Pattern:** Routed Playbook (Pattern 3). The user's scope (single role, department, or full org) changes the workflow breadth. The core procedure — decompose, score, extract, formalize, calculate, prioritize — is shared across all routes.

Slash command: `/workflow-decomp`

---

## Trigger

Invoke this skill when the user asks:
- "Help me break this role into automatable workflows"
- "What can we automate in our [department / company]?"
- "How do I extract the knowledge from [person / role] before automating?"
- "Build an automation roadmap for [company]"
- "Which tasks should we automate first?"
- "Decompose our organization into workflows"

---

## Step 0 — Collect Inputs

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Company description | Determines industry context and role vocabulary | — (must ask) |
| Scope | Routes to A (role), B (department), or C (full org) | Single role |
| Target role(s) | Determines which roles to decompose | — (must ask for A/B) |
| Company stage | Stage gate: must be Stage 3+ on Hormozi scaling roadmap | Infer from description |
| Annual compensation per role | Basis for ROI calculation | Ask or estimate from market data |
| Existing documentation level | Determines dark playbook extraction effort | Assume minimal |
| Number of people in each role | Scales ROI calculation | 1 |

---

## Stage Gate — Is the Company Ready?

Companies at Hormozi Stage 0–2 (Improvise / Monetize / Advertise) should NOT use this skill. They haven't standardized enough for workflow extraction to be meaningful.

**Procedure:** Fill in: "The company has ___ [number] of employees, has been operating for ___ [time], and has ___ [standardized / ad-hoc / no] processes for its core delivery."

```
IF company stage is 0-2 (pre-revenue, first sales, or no repeatable demand system):
  → STOP. The company needs to stabilize operations first.
    Handoff to consult-hormozi for stage diagnosis.
ELIF company has fewer than 3 people AND no documented processes:
  → STOP. There are no roles to decompose — the founder IS the workflow.
    Recommend: build the business first, document as you go.
ELSE:
  → PROCEED to Step 1.
```

Reference: `outputs/book-summaries/100m-scaling-roadmap-combined.md` — Stage 3 (Stabilize) is the minimum for meaningful workflow extraction.

---

## Step 1 — Route by Scope

```
IF user wants to decompose a single role:
  → Route A: Single Role Decomposition
  Run Phases 1–6 for that role.

ELIF user wants to decompose a department (e.g., Sales, Delivery):
  → Route B: Department Decomposition
  Run Route A for each role in the department.
  Then run cross-role dependency analysis (Phase 6b).

ELIF user wants a full organizational audit:
  → Route C: Full Org Audit
  Decompose the company into four pillars:
    1. Lead Generation (brand, marketing, MQL)
    2. Sales (closing, SQL)
    3. Delivery (core operations + supporting operations: legal, HR, finance)
    4. Customer Success (retention, expansion, brand)
  Run Route B for each pillar.
  Then run org-level prioritization (Phase 6c).

  For large orgs (50+ people): start with one pillar as a pilot (typically Sales —
  highest ROI, most digital, most common-knowledge). Use learnings to refine the
  process before expanding to remaining pillars.
```

---

## Design Principles

These principles govern every decision in Phases 1–6. Each includes a procedure and a worked example.

### Principle 1 — Decompose to the decision grain

A role is not a workflow. A task is not a workflow. A workflow is a sequence of decisions, transformations, and communications. Decomposition must reach the level where each unit is one of these three node types, or it's too coarse to automate.

**Procedure:** After listing tasks in Phase 1, for each task ask: "Does this task contain more than one decision point?" If yes, split it. Continue until every row in the task inventory maps to a single decision, transformation, or communication.

**Worked example:** "Write personalized outreach emails" is actually three nodes: (1) Decision — select the right angle for this persona type, (2) Transformation — draft the email using the selected angle + account research, (3) Communication — send via email tool. Node 1 is the dark playbook. Nodes 2 and 3 are automatable once node 1 is extracted.

### Principle 2 — Score before you judge

Do not decide what to automate based on intuition. Score every task on the 7 dimensions first. People systematically overestimate the automatability of high-judgment tasks and underestimate the value of automating low-judgment busywork.

**Procedure:** Before making any automation recommendation, fill in: "The task ___ scored ___/6 on feasibility. The annual value at stake is $___. My initial intuition was that this task [should / should not] be automated. The score [confirms / contradicts] my intuition because ___."

### Principle 3 — Extract before you automate

Never automate a Proprietary Context task without first extracting the dark playbook. An automated workflow that handles 60% of cases correctly and fails silently on the other 40% is worse than no automation — it creates invisible quality degradation.

**Procedure:** For each task scoring Proprietary Context, fill in: "The dark playbook for this task is ___. It was classified as [Extractable / Partially Extractable / Irreducible]. The extraction path is [A / B]. Extraction [has been completed / is in progress / has not started]. The automated workflow [can / cannot] proceed."

If extraction has not started, the task cannot enter the automation roadmap. It enters the extraction backlog instead.

### Principle 4 — Clean-up work is a symptom, not a workflow

Tasks scored as Clean-up (dimension 7) should not be automated. They exist because something upstream is broken. Automating clean-up is automating the band-aid instead of fixing the wound.

**Procedure:** For each Clean-up task, fill in: "This clean-up task exists because ___ [upstream process] produces ___ [type of error/mess]. The root cause is ___. Fixing the root cause would eliminate ___ hours/week of clean-up and cost approximately $___."

**Worked example:** "Fix bounced emails / clean lists" (2 hrs/week in the SDR example) exists because the list-building process doesn't validate emails at entry. Adding email validation to the list-building tool ($50/month) eliminates the clean-up task entirely. Automating the clean-up instead would cost more and preserve the upstream problem.

### Principle 5 — The inter-task layer is where dark playbooks hide

The most dangerous gap in role decomposition is the space between tasks. Experts perform continuous monitoring, sense-making, and judgment that doesn't appear as a discrete task. If you only decompose into visible tasks, you'll miss the highest-value proprietary knowledge.

**Procedure:** After completing Phase 1, ask the role-holder: "What do you pay attention to that isn't on this list? What signals do you watch for between your main tasks?" Add an explicit row for any inter-task monitoring or judgment described. Score it on the 7 dimensions.

The CSM near-miss counter-example demonstrates this failure mode.

---

## Phase 1 — Role Decomposition

For each role, catalog every task the person performs. Do not filter or judge yet — capture everything.

**Procedure:** Interview the role-holder (or use existing documentation) and fill in one row per task:

| Task | Description | Frequency | Hours/week | Tools used | Who else is involved |
|---|---|---|---|---|---|
| ___ | ___ | Daily / Weekly / Monthly / Ad-hoc | ___ | ___ | ___ |

**Completeness check:** Ask: "What do you do that isn't on this list? What takes up time that feels invisible?" Experts omit up to 70% of task components when self-reporting (Swaby et al., 2022). Probe for:
- Meetings and coordination overhead
- Context-switching and interruption handling
- "Firefighting" and exception handling
- Knowledge that lives in their head but isn't documented

---

## Phase 2 — 7-Dimension Task Scoring

Score every task from Phase 1 on seven independent dimensions. Each dimension is binary or categorical — no ambiguous scales.

### The 7 Dimensions

| # | Dimension | Options | Automation implication |
|---|---|---|---|
| 1 | **Direction** | Internal / External | External tasks involve unpredictable counterparties |
| 2 | **Medium** | Physical / Digital | Physical tasks resist digital automation |
| 3 | **Cadence** | Recurring / One-off | Recurring tasks have higher automation ROI |
| 4 | **Judgment** | High / Low | High-judgment tasks need human oversight or sophisticated AI |
| 5 | **Value** | High / Low | High-value tasks justify higher automation investment |
| 6 | **Knowledge Source** | Proprietary Context / Common Knowledge | Proprietary context requires extraction before automation |
| 7 | **Work Type** | Forward / Clean-up | Clean-up work signals upstream process failures |

### Scoring Procedure

For each task, fill in the scoring table:

| Task | Direction | Medium | Cadence | Judgment | Value | Knowledge | Work Type | Automation Score |
|---|---|---|---|---|---|---|---|---|
| ___ | Int/Ext | Phys/Dig | Rec/One | Hi/Lo | Hi/Lo | Prop/Common | Fwd/Clean | ___/6 |

**Automation Score calculation:**

Award 1 point for each automation-favorable attribute:
- Internal (1) vs External (0)
- Digital (1) vs Physical (0)
- Recurring (1) vs One-off (0)
- Low judgment (1) vs High judgment (0)
- Common knowledge (1) vs Proprietary context (0)
- Forward work (1) vs Clean-up (0)
- Value is scored separately — it affects ROI priority, not feasibility

**Score interpretation:**
- 6/6: Automate immediately — low-hanging fruit
- 4-5/6: Automate with moderate effort — may need some extraction or tooling
- 2-3/6: Automate partially — human-in-the-loop required
- 0-1/6: Do not automate — keep human, optimize the process instead

**High-value + high-score tasks are the priority.** A 6/6 low-value task is less important than a 4/6 high-value task.

---

## Phase 3 — Dark Playbook Identification and Extraction

Flag every task that scored "Proprietary Context" on dimension 6. These are "dark playbooks" — knowledge that lives in the expert's head, learned through years of reinforcement and context gathering, often invisible even to the person who holds it.

### Step 3a — Flag and Classify

For each Proprietary Context task, classify extractability:

| Dark Playbook | Description | Extractability | Reasoning |
|---|---|---|---|
| ___ | ___ | Extractable / Partially Extractable / Irreducible | ___ |

**Extractability definitions:**
- **Extractable** — The decision logic can be fully formalized into rules, decision trees, or playbooks. Example: "When a lead matches criteria X, Y, Z, route to enterprise sales."
- **Partially Extractable** — Most of the logic can be formalized, but specific nodes require human judgment. Example: "Pricing for custom deals follows a formula, but final approval requires reading the client's urgency and budget flexibility."
- **Irreducible** — The knowledge is embodied, relational, or requires genuine ambiguity judgment that cannot be encoded. Example: "Knowing when a client relationship is about to sour from tone shifts in email." These tasks must keep a human in the loop.

### Step 3b — Select Extraction Path

```
IF the role has physical components, high relational complexity,
   or fewer than 3 dark playbook nodes:
  → Path A: Human-Led Extraction (CDM/ACTA)

ELIF the role is primarily digital/knowledge work,
   there are many dark playbook nodes across multiple roles,
   or human interviewers are unavailable:
  → Path B: AI-Adaptive Extraction

ELIF both conditions are present:
  → Use Path A for the highest-value nodes, Path B for the rest
```

### Path A: Human-Led Extraction (CDM/ACTA)

A 4-layer protocol for extracting tacit knowledge through direct observation and structured interviews.

**Layer 1 — Artifact Scan (1-3 days)**

Collect all informal artifacts the role-holder uses:
- Personal spreadsheets and trackers (highest value — these are externalized mental models)
- Email templates and canned responses
- Annotated SOPs or marked-up procedure manuals
- Calendar patterns (recurring meetings = process checkpoints)
- Browser bookmarks and saved searches
- Sticky notes, whiteboards, physical dashboards

For each artifact: "What does it track? How is it categorized? What calculations does it perform? What gets highlighted?"

**Layer 2 — Structured Shadowing (1-2 full days)**

Observe the role-holder doing their actual work. Record every activity transition with a timestamp. Mark every decision point — anywhere they chose path A over path B.

During natural pauses, probe:
- "What were you looking for just now?"
- "How did you know to do X before Y?"
- "What would happen if this went differently?"
- "What would a new person get wrong here?"

**Layer 3 — Decision Logic Extraction (2-4 hours per critical cluster)**

For the 3-5 most critical decision points from Layer 2, use ACTA (Applied Cognitive Task Analysis):
1. Task Diagram: "Break what you do into 3-6 major steps. Which require difficult judgments?"
2. Knowledge Audit: "What do experts notice that others miss? When have you had to improvise?"
3. Simulation: Present a challenging scenario. "What's going on here? What would you do? What cues are you using?"

For the single most critical decision, use CDM (Critical Decision Method):
1. "Tell me about a time you had to make a really tough call in this role."
2. Build a timeline of the incident together.
3. At each decision point: "What were you noticing? What options did you consider? What would a less experienced person have done?"
4. "What if [variable] had been different?"

**Layer 4 — Validation (1-2 days)**

Walk the extracted workflow back to the expert: "Is this what you do? What did I miss?"
Have a novice attempt to follow it. Where they get stuck = curse-of-expertise gaps.
Test decision rules against 3-5 scenario cases.

Reference: `outputs/research/dark-playbook-extraction-methods.md`

### Path B: AI-Adaptive Extraction

Use AI to dynamically interview experts, specifically targeting knowledge that doesn't exist in the LLM's training data.

**Step 1 — Map the LLM's knowledge boundary.** Run recursive taxonomy decomposition on the role's domain to identify where the model's knowledge is thin. These gaps are the highest-value extraction targets — the "non-ChatGPT knowledge."

**Step 2 — Adaptive questioning.** Generate questions using utility optimization that balances systematic coverage of the role against discovery of novel, proprietary knowledge. Prioritize questions the LLM cannot answer itself.

**Step 3 — Extractability filtering.** Check each extracted knowledge atom against the LLM's existing knowledge:
- Already known → low value (skip)
- Contradicts LLM knowledge → high value (probe deeper)
- Novel → high value (capture and validate)

Evidence: AI interviewers match or exceed humans on structured information extraction (MimiTalk: 121 AI vs 1,271 human interviews — AI outperformed on richness, coherence, stability). Can be run as short sessions (10-15 min) to reduce expert burden.

Reference: `outputs/research/adaptive-ai-interviewing-knowledge-extraction.md`

### Incentive Design

Knowledge holders often resist extraction because unique knowledge = job security. Address this:
- Frame as risk reduction ("reducing bus factor"), not replacement
- Use attribution and recognition (name on the playbook)
- Avoid monetary per-contribution rewards (research shows they crowd out intrinsic motivation)
- Frame as career development and mentorship

---

## Phase 4 — Workflow Formalization

Translate each task (with its extracted dark playbook logic where applicable) into a formal workflow graph.

### Node Types

Every step in a workflow is one of three types:

| Node type | What it does | Example |
|---|---|---|
| **Decision** | Evaluates conditions and routes to different paths | "Is the deal > $50K? → enterprise track" |
| **Data Transformation** | Takes input, processes it, produces output | "Calculate discount based on volume tier" |
| **Communication** | Moves context across workflow boundaries | "Send proposal email" / "Query CRM for account history" |

### Context-Completeness Check

For every Decision node scored as High Judgment, verify:

| Check | Question | Status |
|---|---|---|
| Running context | "Does the workflow carry all the data this decision needs?" | ___ |
| External context | "What information outside the workflow is required? Where does it live?" | ___ |
| Playbook | "Is there a clear decision rule, or does this require human judgment?" | ___ |
| Edge cases | "What happens when the standard rule doesn't apply?" | ___ |

If any check fails, the node either needs more extraction work (return to Phase 3) or must be classified as a human-in-the-loop node.

---

## Phase 5 — ROI Calculation

For each task, calculate the automation ROI:

```
Annual Automation Value = annual_hours × hourly_cost × automation_feasibility × (1 - residual_human_effort)
```

Where:
- **annual_hours** = hours/week × 52 × number_of_people_in_role
- **hourly_cost** = annual_compensation / 2080 (or use fully-loaded cost)
- **automation_feasibility** = derived from Automation Score (Phase 2):
  - Score 6/6 → 0.90
  - Score 4-5/6 → 0.65
  - Score 2-3/6 → 0.35
  - Score 0-1/6 → 0.10
- **residual_human_effort** = estimated % of the task that still requires human involvement after automation:
  - Extractable dark playbook → 0.05 (5% oversight)
  - Partially extractable → 0.25 (25% judgment calls)
  - Irreducible → 0.60 (60% human effort remains)
  - No dark playbook → 0.00

**Fill in the ROI table:**

| Task | Annual Hours | Hourly Cost | Feasibility | Residual Human | Annual Value | Implementation Estimate |
|---|---|---|---|---|---|---|
| ___ | ___ | $___ | ___% | ___% | $___ | ___ |

---

## Phase 6 — Automation Roadmap

### 6a — Single Role Roadmap (Route A)

Rank tasks by Annual Automation Value. Add dependency edges:

| Priority | Task | Annual Value | Dependencies | Dark Playbook? | Extraction Status |
|---|---|---|---|---|---|
| 1 | ___ | $___ | None / Depends on ___ | Yes/No | Extracted / Pending / Irreducible |

**Dependency rules:**
- A task with a dark playbook cannot be automated until extraction is complete
- A clean-up task should not be automated — fix the upstream process that causes it
- Tasks that feed data to other tasks must be automated (or standardized) first

### 6b — Department Roadmap (Route B)

After running Phase 6a for each role in the department:
1. Identify cross-role workflows (where one role's output is another's input)
2. Flag handoff points as Communication nodes
3. Prioritize end-to-end workflow automation over isolated task automation
4. Produce a department-level sequenced roadmap

### 6c — Org-Wide Roadmap (Route C)

After running Phase 6b for each department:
1. Rank departments by total automation value
2. Identify cross-department workflows (e.g., marketing-qualified lead → sales → delivery → customer success)
3. Start with the department that has the highest ROI and lowest dark playbook concentration
4. Sequence: typically Lead Gen / Sales first (high ROI, more digital, more common-knowledge), then Customer Success, then Delivery (most dark playbooks, most physical)

---

## Benchmarks

### Time Allocation Norms

| Metric | Value | Source | Year | Confidence |
|---|---|---|---|---|
| "Work about work" (coordination, status updates, searching) | 60% of knowledge worker time | Asana Anatomy of Work Index | 2023 | Observed |
| Skilled/core work | 27% of knowledge worker time | Asana Anatomy of Work Index | 2023 | Observed |
| Strategic work | 13% of knowledge worker time | Asana Anatomy of Work Index | 2023 | Observed |
| Time on email | 28% of workweek | McKinsey Global Institute | 2012 | Observed |
| Time searching for internal information | ~20% of workweek | McKinsey Global Institute | 2012 | Observed |
| Unproductive meetings (ICs) | 3.7 hrs/week | Asana | 2024 | Observed |
| Unproductive meetings (managers) | 5.8 hrs/week | Asana | 2024 | Observed |
| Time reclaimable with better processes | 4.9 hrs/week | Asana | 2023 | Observed |
| Developers losing 8+ hrs/week to inefficiencies | 69% | Atlassian Developer Experience | 2024 | Observed |

Use these as priors when role-holders can't estimate their own time splits. Most people underestimate coordination overhead (they believe ~35%, actual is ~60%).

### Automation Feasibility by Activity Type (McKinsey Technical Potential)

| Activity type | Automation potential | Confidence |
|---|---|---|
| Predictable physical (structured environments) | 81% | Observed |
| Data processing | 69% | Observed |
| Data collection | 64% | Observed |
| Applying expertise | 26% | Observed |
| Unpredictable physical | 20% | Observed |
| Stakeholder interaction | 18% | Observed |
| Managing people | 9% | Observed |

Source: McKinsey MGI "Where machines could replace humans" (2017). These are pre-Gen AI figures. Gen AI significantly increases potential for applying expertise and stakeholder interaction, but updated figures are not yet standardized.

### Dark Playbook Extraction Effort

| Metric | Value | Source | Year | Confidence |
|---|---|---|---|---|
| Experts omit when self-reporting task steps | Up to 70% of components | Swaby et al. systematic review | 2022 | Observed |
| ACTA cognitive content relevance | 93% | Militello & Hutton | 1998 | Observed |
| ACTA outputs containing expert-only knowledge | 95% | Militello & Hutton | 1998 | Observed |
| CDM interview duration (per incident) | ~2 hours | Klein methodology descriptions | 1998 | Observed |
| CTA-based training: knowledge transfer efficiency | ~5 years of job knowledge in ~50 hours | Clark & Estes (via CTA literature) | 1988 | Uncertain |
| Institutional knowledge unique to individuals | 42% | Panopto Workplace Knowledge Report | 2018 | Observed |
| Fortune 500 annual loss from knowledge attrition | ~$31.5B | Denser.ai / industry estimates | 2024 | Inferred |
| AI vs human interview quality (structured extraction) | AI matches/exceeds on richness, coherence, stability | MimiTalk (121 AI vs 1,271 human) | 2025 | Observed |

### Automation ROI Benchmarks

| Metric | Value | Source | Year | Confidence |
|---|---|---|---|---|
| RPA 3-year ROI (composite org) | 248% | Forrester TEI / Microsoft Power Automate | 2024 | Uncertain (vendor-commissioned) |
| RPA payback period | < 12 months | Forrester TEI / Automation Anywhere | 2019 | Uncertain (vendor-commissioned) |
| High-impact RPA user time savings | ~10% of annual work time | Forrester TEI | 2024 | Uncertain |
| Medium-impact RPA user time savings | 20 hours/employee/year | Forrester TEI | 2024 | Uncertain |

Note: RPA ROI figures are vendor-commissioned composites. Use as directional ranges, not forecasts. Actual ROI depends heavily on process stability, data quality, and dark playbook extraction completeness.

---

## Anti-Patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Automating before standardizing** | Stage 0-2 companies have no stable process to automate. Automating chaos produces automated chaos. | Pass the stage gate first. Stabilize, then decompose. |
| **Ignoring dark playbooks** | Automating the explicit workflow without the tacit knowledge produces a system that handles 60% of cases and fails on the rest. | Run Phase 3 before Phase 4. Flag every Proprietary Context task. |
| **Scoring tasks in isolation** | A task that looks low-value in isolation may be critical for a high-value downstream workflow. | In Route B/C, map cross-role dependencies before finalizing the roadmap. |
| **Optimizing low-value tasks first** | Automating 50 small tasks feels productive but moves the needle less than automating 3 high-value ones. | Sort by Annual Automation Value, not by Automation Score alone. |
| **Using AI extraction for embodied knowledge** | AI can't observe physical work, read body language, or experience relational dynamics. | Use Path A (human-led) for roles with physical or relational components. |
| **Paying experts per-contribution** | Monetary rewards crowd out intrinsic motivation and reduce knowledge quality. | Use recognition, attribution, and career-development framing instead. |
| **Skipping the artifact scan** | Personal spreadsheets are crystallized mental models. Without them, you miss the structure of the expert's thinking. | Always start extraction with Layer 1 (artifact scan) regardless of path. |
| **Treating all dark playbooks as extractable** | Some knowledge is structurally irreducible — embodied, relational, or genuine-ambiguity judgment. | Classify extractability first. Plan for human-in-the-loop on irreducible nodes. |

---

## Worked Example — SDR (Sales Development Rep)

### Context
Company: B2B SaaS, 15 employees, Stage 4 (Prioritize). Two SDRs each earning $55K/year ($26.44/hr). No documented processes — SDRs were hired, trained informally by the founder, and left to develop their own methods.

### Phase 1 — Role Decomposition

| Task | Frequency | Hours/week | Tools | Collaborators |
|---|---|---|---|---|
| Research target accounts | Daily | 6 | LinkedIn, ZoomInfo, company websites | None |
| Build prospect lists | Weekly | 3 | Spreadsheet, CRM | None |
| Write personalized outreach emails | Daily | 8 | Gmail, templates | None |
| Send LinkedIn connection requests + messages | Daily | 3 | LinkedIn | None |
| Follow up on non-responses (email sequences) | Daily | 4 | CRM, email | None |
| Qualify inbound leads (initial triage) | Daily | 2 | CRM, Slack | Marketing |
| Book discovery calls for AEs | Daily | 2 | Calendar, CRM | AEs |
| Update CRM records | Daily | 3 | CRM | None |
| Attend team standup + pipeline review | Daily | 3 | Zoom, CRM | Sales team |
| Research competitor objections | Weekly | 2 | Web, internal docs | None |
| Fix bounced emails / clean lists | Weekly | 2 | Email tools, spreadsheet | None |
| Shadow AE calls (for learning) | Weekly | 2 | Zoom | AEs |
| **Total** | | **40** | | |

### Phase 2 — 7-Dimension Scoring

| Task | Dir | Med | Cad | Judg | Val | Know | Work | Score |
|---|---|---|---|---|---|---|---|---|
| Research target accounts | Int | Dig | Rec | Lo | Hi | Common | Fwd | 5/6 |
| Build prospect lists | Int | Dig | Rec | Lo | Lo | Common | Fwd | 5/6 |
| Write personalized outreach | Ext | Dig | Rec | Hi | Hi | **Prop** | Fwd | 2/6 |
| LinkedIn outreach | Ext | Dig | Rec | Lo | Lo | Common | Fwd | 4/6 |
| Follow up on non-responses | Ext | Dig | Rec | Lo | Lo | Common | Fwd | 4/6 |
| Qualify inbound leads | Int | Dig | Rec | Hi | Hi | **Prop** | Fwd | 3/6 |
| Book discovery calls | Int | Dig | Rec | Lo | Lo | Common | Fwd | 5/6 |
| Update CRM records | Int | Dig | Rec | Lo | Lo | Common | Fwd | 5/6 |
| Team standup + pipeline review | Int | Dig | Rec | Lo | Lo | Common | Fwd | 5/6 |
| Research competitor objections | Int | Dig | Rec | Hi | Hi | **Prop** | Fwd | 3/6 |
| Fix bounced emails / clean lists | Int | Dig | Rec | Lo | Lo | Common | **Clean** | 4/6 |
| Shadow AE calls | Int | Dig | One | Hi | Hi | **Prop** | Fwd | 2/6 |

### Phase 3 — Dark Playbooks Identified

Four tasks scored Proprietary Context:

| Dark Playbook | Description | Extractability |
|---|---|---|
| Personalized outreach writing | The SDR knows which hooks work for which persona types. Uses pattern-matching from hundreds of conversations to choose angle, tone, and specificity level. | **Partially Extractable** — The persona-to-hook mapping can be formalized. The "feel" for tone calibration is harder but learnable from examples. |
| Inbound lead qualification | The SDR developed intuition for which inbound leads are worth pursuing vs time-wasters. Uses signals like company size, role title, and specific language in the inquiry. | **Extractable** — This is a scoring rubric waiting to be documented. The SDR just hasn't written it down. |
| Competitor objection research | The SDR knows which competitor claims to address and which to ignore, based on win/loss patterns. | **Extractable** — This is a lookup table that can be built from win/loss data + the SDR's memory. |
| AE call shadowing insights | The SDR absorbs what makes a good discovery call and uses it to better qualify leads. | **Irreducible** — This is experiential learning. Can be partially replaced by structured call recordings + analysis. |

**Extraction path:** Path B (AI-Adaptive) for outreach writing and qualification. Path A (human-led ACTA) for the persona-to-hook mapping, since it requires probing specific past examples.

### Phase 5 — ROI Summary

| Task | Hrs/yr (x2 SDRs) | Cost | Feasibility | Residual | Annual Value |
|---|---|---|---|---|---|
| Research target accounts | 624 | $16,498 | 90% | 5% | $14,106 |
| Build prospect lists | 312 | $8,249 | 90% | 0% | $7,424 |
| Write personalized outreach | 832 | $21,997 | 35% | 25% | $5,774 |
| Follow up on non-responses | 416 | $10,998 | 65% | 0% | $7,149 |
| Book discovery calls | 208 | $5,499 | 90% | 0% | $4,949 |
| Update CRM records | 312 | $8,249 | 90% | 0% | $7,424 |
| Fix bounced emails | 208 | $5,499 | 65% | 0% | $3,574 |
| **Total automatable value** | | | | | **$50,400/yr** |

Qualify inbound leads ($5,499 base) scores 3/6 but is high-value and extractable — worth automating after extraction ($3,574 additional).

**Payback estimate:** If implementation costs ~$15K (tooling + extraction effort), payback is ~3.5 months.

### Phase 6 — Roadmap

| Priority | Task | Value | Dependencies | Timeline |
|---|---|---|---|---|
| 1 | Research target accounts + Build prospect lists | $21,530 | None | Month 1 |
| 2 | Follow up sequences + CRM updates | $14,573 | None | Month 1-2 |
| 3 | Book discovery calls | $4,949 | None | Month 2 |
| 4 | Inbound lead qualification | $3,574 | Extract scoring rubric first | Month 2-3 |
| 5 | Personalized outreach | $5,774 | Extract persona-hook mapping first | Month 3-4 |

Start with the 5-6/6 score tasks (no extraction needed). Extract dark playbooks in parallel. Automate outreach last because it depends on extraction quality.

---

## Near-Miss Counter-Example — "Automated" Client Success Manager

**Company:** Mid-market SaaS, 40 employees. A Client Success Manager (CSM) handling 30 enterprise accounts.

**What the scoring showed:** Most CSM tasks scored favorably for automation:
- Check-in emails: Internal, Digital, Recurring, Low judgment, Common knowledge → 5/6
- Usage monitoring: Internal, Digital, Recurring, Low judgment, Common knowledge → 5/6
- QBR preparation: Internal, Digital, Recurring, Low judgment, Common knowledge → 5/6
- Renewal outreach: External, Digital, Recurring, Low judgment, Common knowledge → 4/6

Total annual automation value calculated at $85K. The company automated check-in emails, usage alerts, and QBR slide generation.

**What actually happened:** Churn increased from 8% to 14% in the first quarter after automation.

**The failure:** The scoring was correct on paper. But the CSM's actual value wasn't in the tasks — it was in the *judgment exercised between tasks*. She would:
- Notice a champion going quiet in Slack (not in any dashboard)
- Recognize that a client's sudden interest in API docs meant they were evaluating a competitor integration
- Know that Account X's VP always needs a call before renewal, not an email, because a prior vendor burned them with auto-renewals

These were **Proprietary Context decisions embedded between tasks**, not within them. The task decomposition missed them because they don't appear as discrete tasks — they appear as "doing nothing visible" while actually processing relational signals.

**The scoring error:** The tasks were correctly scored. The error was decomposing the role into tasks without capturing the **inter-task judgment layer** — the continuous monitoring and sense-making that connects tasks but doesn't look like a task.

**Minimal fix:** Add an explicit "Inter-task monitoring and judgment" row to the Phase 1 decomposition for any role involving ongoing relationship management. Score it on the 7 dimensions. In this case: External, Digital, Recurring, **High judgment**, **High value**, **Proprietary context**, Forward → 1/6. This immediately flags it as irreducible and keeps the human in the loop for the relationship-monitoring function, even while automating the discrete tasks around it.

---

## Quality Gates

Do not finalize the automation roadmap unless all gates pass:

- [ ] Every task scored on all 7 dimensions with explicit reasoning
- [ ] ROI calculated with stated assumptions (hourly cost, feasibility multiplier, residual effort)
- [ ] Every Proprietary Context task has an extractability classification (Extractable / Partially Extractable / Irreducible)
- [ ] Extraction path selected (human-led vs AI-adaptive) with reasoning for each dark playbook cluster
- [ ] At least one context-completeness check performed for each High Judgment decision node
- [ ] Incentive design addressed: how will knowledge holders be motivated to participate?
- [ ] Dependencies mapped: no task is scheduled for automation before its prerequisites
- [ ] Clean-up tasks flagged: upstream root causes identified rather than automating the clean-up itself

---

## Handoff Rules

- **Upstream — consult-hormozi:** If the company's stage is unclear, route to `consult-hormozi` for diagnosis against the scaling roadmap.
- **Adjacent — stakeholder-discovery:** For human-led dark playbook extraction (Path A), the interview techniques overlap with `stakeholder-discovery`. Use its outreach and interview methodology.
- **Adjacent — deep-web-research:** For industry-specific automation benchmarks, tooling landscape, or competitive intelligence on automation in the user's sector.
- **Downstream — constructing-a-funnel:** When automated lead gen or sales workflows need a conversion funnel built around them.
- **Downstream — workflow implementation:** Extracted and formalized workflows feed into implementation (tooling selection, agent architecture, integration design).

---

## Output Templates

### Template A — Single Role Decomposition Report

```markdown
## Role Decomposition: [Role Title]

**Company:** [Name]
**Stage:** [Hormozi stage]
**Route:** A (Single Role)
**Compensation:** $___/year (___/hr fully loaded)
**People in role:** ___

### Task Inventory
| Task | Frequency | Hours/week | Tools | Collaborators |
|---|---|---|---|---|
| ___ | ___ | ___ | ___ | ___ |

### 7-Dimension Scoring
| Task | Dir | Med | Cad | Judg | Val | Know | Work | Score |
|---|---|---|---|---|---|---|---|---|
| ___ | ___ | ___ | ___ | ___ | ___ | ___ | ___ | ___/6 |

### Dark Playbooks Identified
| Dark Playbook | Extractability | Extraction Path | Status |
|---|---|---|---|
| ___ | Extractable/Partial/Irreducible | A/B | Pending/Complete |

### ROI Summary
| Task | Annual Value | Dependencies | Priority |
|---|---|---|---|
| ___ | $___ | ___ | ___ |

**Total annual automation value:** $___
**Estimated implementation effort:** ___ person-weeks
**Payback period:** ___ months

### Automation Roadmap
1. [Task] — [timeline] — [dependencies]
2. ...

### Next Steps
1. ___
2. ___
```

### Template B — Department Automation Roadmap

```markdown
## Department Automation Roadmap: [Department Name]

**Roles decomposed:** [list]
**Total annual automation value:** $___
**Dark playbooks identified:** ___ (___% extractable)

### Cross-Role Workflows
| Workflow | Roles involved | Current handoff method | Automation opportunity |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

### Prioritized Roadmap
| Phase | Tasks | Roles | Value | Dependencies | Timeline |
|---|---|---|---|---|---|
| 1 | ___ | ___ | $___ | None | ___ |
| 2 | ___ | ___ | $___ | Phase 1 | ___ |
| 3 | ___ | ___ | $___ | Phase 2 + extraction | ___ |

### Dark Playbook Extraction Plan
| Playbook | Role | Path | Estimated effort | Priority |
|---|---|---|---|---|
| ___ | ___ | A/B | ___ days | ___ |
```

### Template C — Org-Wide Automation Roadmap

```markdown
## Org-Wide Automation Roadmap: [Company Name]

**Departments analyzed:** Lead Gen / Sales / Delivery / Customer Success
**Total roles decomposed:** ___
**Total annual automation value:** $___

### Department Summary
| Department | Roles | Tasks | Auto Value | Dark Playbooks | Recommended Start |
|---|---|---|---|---|---|
| Lead Gen | ___ | ___ | $___ | ___ | ___ |
| Sales | ___ | ___ | $___ | ___ | ___ |
| Delivery | ___ | ___ | $___ | ___ | ___ |
| Customer Success | ___ | ___ | $___ | ___ | ___ |

### Recommended Sequence
1. **Start with:** [department] — highest ROI, lowest dark playbook concentration
2. **Then:** [department] — moderate ROI, extraction needed first
3. **Then:** [department] — high dark playbook concentration, extract in parallel
4. **Last:** [department] — most complex, benefits from learnings of prior phases

### Cross-Department Workflows
| End-to-end workflow | Departments | Current state | Target state |
|---|---|---|---|
| ___ | ___ | ___ | ___ |

### Investment Summary
| Phase | Departments | Value unlocked | Investment | Payback |
|---|---|---|---|---|
| ___ | ___ | $___ | $___ | ___ months |
```

---

## Reference Sources

### Frameworks
1. APQC Process Classification Framework — https://www.apqc.org/process-frameworks
2. O*NET Content Model (tasks, work activities) — https://www.onetonline.org/
3. McKinsey — Where machines could replace humans — https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/where-machines-could-replace-humans-and-where-they-cant-yet

### Dark Playbook Extraction
4. Swaby et al. — CTA systematic review (2022) — https://pmc.ncbi.nlm.nih.gov/articles/PMC8903544/
5. Militello & Hutton — ACTA toolkit (1998) — https://www.tandfonline.com/doi/abs/10.1080/001401398186108
6. Klein, Hoffman & Crandall — CDM (1998) — https://journals.sagepub.com/doi/10.1518/001872098779480442
7. SparkMe — Adaptive interviewing (2026) — https://arxiv.org/abs/2602.21136
8. Knowledge Boundary Probing (UIUC, 2026) — https://arxiv.org/abs/2602.00959

### Scaling Context
9. Hormozi Scaling Roadmap — `outputs/book-summaries/100m-scaling-roadmap-combined.md`
10. MECE Business Bottleneck Tree — `outputs/problem-trees/hormozi-mece-problem-tree.md`
