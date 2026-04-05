---
name: playbook-skill-creation
description: Create domain-expertise playbook skills for the bilbo repo. Routes to the right architectural pattern (router, linear pipeline, routed playbook, configured playbook with overlays) based on domain complexity, then provides a procedural build guide for each layer. Use when the user wants to create a new business-analysis or strategy skill, or improve the structure of an existing one.
---

# Playbook Skill Creation

## Purpose

Build or improve domain-expertise skills that produce structured, actionable deliverables — not code utilities or simple lookup tools. This skill addresses **content architecture**: how to organize knowledge inside a skill so it's reusable across contexts, calibrated with benchmarks, and impossible to use in a purely declarative way.

For file mechanics (frontmatter, directory layout, description writing), defer to the `create-skill` skill. This skill starts where that one stops.

Slash command: `/playbook-skill`

---

## Trigger

Apply when the user asks things like:

- "Create a new skill for [domain]"
- "How should I structure a skill that covers [multiple contexts]?"
- "This skill is too declarative / not actionable enough"
- "Turn this knowledge into a reusable playbook"
- "Improve the architecture of [existing skill]"

---

## Step 1 — Collect Inputs

Before choosing a pattern, gather:

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Domain | Determines what knowledge to encode | — (must ask) |
| Number of distinct contexts | Routes to pattern complexity | Infer from domain description |
| Published benchmarks exist? | Determines whether to add a benchmark layer | Assume no; research if unclear |
| Compliance or legal guardrails needed? | Determines whether to add a compliance layer | No |
| Deliverable shape | Single artifact, multi-part spec, or routing decision | Infer from domain |
| Existing assets to anchor on | Local files, books, frameworks to reference | None |

---

## Step 2 — Select Pattern

Route to exactly one architectural pattern. Each pattern has its own build guide, layer count, and target line range.

### Pattern Decision Logic

```
IF the skill's job is to select the right resource or sub-skill (not produce a deliverable):
  → Pattern 1: Router
ELIF the domain has one way to do the work regardless of context:
  → Pattern 2: Linear Pipeline
ELIF the domain has 2–5 distinct contexts that change the workflow:
  → Pattern 3: Routed Playbook
ELIF the domain spans 5+ contexts, has benchmarks, needs compliance, and produces multi-part deliverables:
  → Pattern 4: Configured Playbook with Overlays
Always default to the simplest pattern that covers the domain, because complexity
that isn't justified creates maintenance burden and cognitive load without
improving output quality.
```

### Pattern Reference

#### Pattern 1: Router

**What it is:** Frame request → classify → point to right source → format answer. The skill IS the routing logic.

**Existing example:** `consult-hormozi` (273 lines) — classifies business issues into demand/supply/scaling buckets, routes to the right Hormozi asset, formats a source-anchored answer.

**Target length:** 100–300 lines.

**Layers to build:**

1. Trigger and input collection (what to ask)
2. Classification taxonomy (the routing table)
3. Per-route instructions (what to read, what to extract, how to format)
4. Handoff rules (when to escalate to a deeper skill)

**Build procedure:**

- [ ] Define the taxonomy: list every category the router must distinguish
- [ ] For each category, name the source(s) it routes to and the output format
- [ ] Write the classification logic as IF/ELIF pseudocode
- [ ] Add a fallback route for ambiguous requests
- [ ] Test with 5 sample inputs to verify routing accuracy

#### Pattern 2: Linear Pipeline

**What it is:** Collect inputs → Step 1 → Step 2 → ... → Step N → output template. One path, no branching by business model. Variation is in inputs, not process.

**Existing examples:** `lead-magnet-creation` (145 lines), `stakeholder-discovery` (181 lines), `deep-web-research` (369 lines).

**Target length:** 100–400 lines.

**Layers to build:**

1. Trigger and input collection
2. Quality gate (go/no-go filter before starting work)
3. Step-by-step procedure (numbered steps with entry/exit criteria)
4. Per-step worked example (at least one)
5. Output template (one or two tiers)
6. Anti-patterns

**Build procedure:**

- [ ] List the steps in order; verify each step has a clear input and output
- [ ] Add a quality gate before step 1 (what must be true to start?)
- [ ] For each step, write the instruction as a procedure, not a declaration (see Section 4)
- [ ] Add at least one worked example for the most complex step
- [ ] Write the output template with fill-in-the-blank fields
- [ ] List 3–5 anti-patterns specific to this domain

#### Pattern 3: Routed Playbook

**What it is:** Collect inputs → classify into one of N types → follow type-specific workflow → output template. Has a router, but branches are workflow variants, not deep parallel architectures.

**Existing examples:** `brand-guide-creation` (411 lines), `high-cagr-market-discovery` (280 lines), `offer-pillar-discovery` (195 lines).

**Target length:** 200–500 lines.

**Layers to build:**

1. Trigger and input collection
2. Router with decision logic (2–5 branches)
3. Per-branch workflow (steps that differ by type)
4. Shared steps (steps common to all branches)
5. Light benchmarks or scoring (if domain supports it)
6. Output template(s)
7. Quality gates
8. Anti-patterns and handoff rules

**Build procedure:**

- [ ] Define the branches: what are the 2–5 distinct contexts?
- [ ] For each branch, list what changes vs what stays the same
- [ ] Write the router as IF/ELIF pseudocode
- [ ] Write shared steps once; write branch-specific steps under each branch
- [ ] If benchmarks exist, add them with confidence tags (Observed / Inferred / Uncertain)
- [ ] Write one output template that works across branches (with branch-specific sections marked)
- [ ] Add quality gates and anti-patterns

#### Pattern 4: Configured Playbook with Overlays

**What it is:** Collect inputs → select one of N configurations → optionally select one overlay → per-unit template → benchmarks by configuration → compliance → experiments → output templates. Governed by design principles with procedures and worked examples.

**Existing examples:** `constructing-a-funnel` (1088 lines), `constructing-a-landing-page` (1287 lines).

**Target length:** 500–1300 lines.

**Layers to build (in order):**

1. Trigger and input collection (including economics inputs like CAC/margin)
2. **Design principles** — governing philosophy with procedures and worked examples (see Section 4)
3. Configuration router (5+ branches with decision logic)
4. Per-configuration reference (stage map, key metrics, key constraints)
5. Optional overlay system (second axis that modifies, not replaces, the config)
6. Per-unit template (the repeatable spec applied to each stage/section/component)
7. Stage-by-stage playbook (tactics, leak fixes, risk labels per stage)
8. Measurement and compliance layer
9. Benchmark tables by configuration and overlay (with confidence tags)
10. Experiment system (hypothesis format, test cadence, stop rules)
11. Output templates (quick plan, deep teardown, build checklist)
12. Quality gates
13. Anti-patterns and handoff rules
14. Reference sources with URLs

**Build procedure:**

- [ ] Start with the configuration router: what are the 5+ contexts and how do you distinguish them?
- [ ] For each configuration, write a one-paragraph reference with stage map and key constraints
- [ ] Design the per-unit template: what fields must every stage/section/component have?
- [ ] Build the stage-by-stage playbook: tactics (with risk labels) and leak fixes per stage
- [ ] Research and add benchmarks; tag each as Observed, Inferred, or Uncertain
- [ ] Add measurement non-negotiables and compliance checklist
- [ ] Write the design principles section AFTER the structure exists (you need to see the skill's shape before you can write guardrails for it)
- [ ] Convert every principle from declarative to procedural (see Section 4) — because declarative-only rules produce the generic output that experts immediately recognize as LLM-generated
- [ ] Design the overlay system if the domain has a secondary axis (format, channel, etc.)
- [ ] Write 2–3 output templates at different depth levels
- [ ] Add quality gates, anti-patterns, and handoff rules
- [ ] Add reference sources with URLs and year

---

## Step 3 — Build the Skill

Follow the build procedure for your selected pattern. Use the iteration protocol (Section 5) to sequence the work.

---

## Section 4 — Converting Declarative to Procedural

This is the single highest-leverage quality technique, because declarative rules produce generic output that a domain expert would immediately recognize as LLM-generated. A declarative rule tells the agent *what* to believe. A procedural rule tells it *what to do*. Skills that stay declarative produce generic, unactionable output.

### The conversion procedure

For every principle or rule in the skill:

**Step 1.** Write the principle as a one-sentence declaration.

Example: "Each funnel stage should shift a specific belief."

**Step 2.** Turn it into a fill-in-the-blank sentence or table the agent must complete before proceeding.

Example: "Before writing this stage's spec, fill in: Entry belief: 'Right now, the prospect believes ___.' Exit belief: 'After this stage, the prospect believes ___.'"

**Step 3.** Write one worked example showing the blanks filled for a real scenario.

Example:

| Stage | Entry belief | Exit belief |
|---|---|---|
| Ad | "I've tried diets and they don't work long-term." | "There's a medical approach I haven't tried." |
| Landing page | "Medical weight loss sounds expensive." | "This is simple, all-inclusive, real doctors." |

**Step 4.** Write one **near-miss** counter-example — a case that passes on most criteria but fails on exactly one, in a way that looks right at first glance.

Near-miss examples are dramatically more effective than obvious failures. Research on contrastive learning (Springer 2025, 40-study systematic review) shows each negative example can improve accuracy 10x more than each positive example during critical learning phases — but only when the negative is close to the decision boundary, not a random failure. Patrick Winston's foundational concept-learning work established that "near-misses" (cases that are almost right but wrong on one dimension) are the primary mechanism for learning category boundaries.

**The near-miss counter-example procedure:**

1. Start with a case that PASSES on most criteria but fails on exactly one
2. Make the failure subtle — it should look right at first glance
3. Name the specific consequence of the failure (not "it won't work" but "checkout conversion drops 40% because trust was broken at the landing page")
4. Show the minimal fix that converts the counter-example into a passing example

**Good near-miss example (from the funnel skill):**
"A funnel that asks for email on the landing page (personal data), then shows a quiz with easy yes/no questions (lower commitment), then asks for payment. Everything else is correct — the offer is strong, the copy is clear, the checkout is frictionless. But the quiz *de-escalates* commitment after the email gate, breaking consistency momentum. Fix: move the email ask to after the quiz, when the prospect has more invested."

This works because: the funnel looks professional and well-designed; the failure is a sequencing error, not an obvious mistake; the consequence is named (broken consistency momentum); and the fix is a single reorder, not a rebuild.

**Bad counter-example (too obvious):**
"A funnel with no landing page, no trust elements, and a broken checkout form." This teaches nothing — nobody would build this. It doesn't sharpen the boundary between good and almost-good.

**Step 5.** If you cannot write the worked example, the principle is too vague — sharpen it or cut it.

### How to recognize a declarative-only rule

Red flags that a rule needs conversion:
- It uses "should," "must," or "always" without showing how
- It states a goal without a procedure to achieve it
- It has no fill-in-the-blank, table, or checklist attached
- Reading it, you think "I agree, but what do I actually DO?"

---

## Section 5 — Research as a First-Class Activity

Research is the difference between a skill that produces generic "fluff" and one that produces real, differentiated insight. Every layer of a skill benefits from targeted web research via `deep-web-research`. Research is not just for benchmarks — it's for discovering the ideas, frameworks, tactics, procedures, and real-world examples that make the skill worth using.

### What to research at each build stage

| Build stage | What to research | What it produces for the skill |
|---|---|---|
| Skeleton (Round 1) | Existing taxonomies and classification systems in the domain | Configuration branches for the router; categories you might have missed |
| Data (Round 2) | Industry benchmarks, conversion rates, cost ranges, performance standards | Benchmark tables with named sources and confidence tags |
| Components (Round 3) | Edge-case architectures, format variants, practitioner workflows | Overlays, sub-configurations, and variant-specific tactics |
| Philosophy (Round 4) | Proven principles with empirical backing, real case studies, counter-examples | Procedural rules with worked examples grounded in evidence, not opinion |
| Coherence (Round 5) | Updated numbers if any benchmarks are stale; competing frameworks that contradict your structure | Contradiction resolution; stronger confidence tags |

### Research protocol for skill building

1. **Before writing any section**, ask: "What would a domain expert know here that the LLM might get wrong or keep generic?" If the answer is "specific numbers, specific frameworks, or specific examples," research before writing — because LLM general knowledge produces plausible-sounding content that lacks the specific numbers, real cases, and practitioner language that distinguish expert-grade from generic output.
2. **Use `deep-web-research`** for any claim that needs to be decision-grade: benchmarks, conversion rates, compliance requirements, framework comparisons, and real case studies.
3. **For worked examples**, prefer real-world cases found via research over invented hypotheticals. A real case (with source) is more credible and more useful than an abstract illustration. The funnel skill's bottleneck example (FinestShops 2025, $270K→$540K from fixing one stage) works precisely because it's a documented real case, not a made-up scenario.
4. **For procedures and frameworks**, research what practitioners actually do before codifying a process. The funnel skill's design principles came from researching Schwartz (awareness levels), Cialdini (commitment escalation), Single-Strike Funnel (narrative coherence), and FinestShops (bottleneck diagnosis) — not from inventing principles and hoping they hold.
5. **For anti-patterns**, search for documented failures and practitioner complaints, not just logical inversions of the principles.
6. **Tag everything**: every benchmark gets Observed / Inferred / Uncertain. Every source gets a name, year, and URL. Unsourced claims are the primary vector for "fluff."

### When NOT to research

- File structure decisions (use `create-skill` conventions)
- Internal cross-references between skills in the repo (just check the files)
- The agent's existing knowledge of common frameworks (Schwartz, Cialdini, Porter, etc. — research for *specific numbers and examples*, not for definitions the LLM already knows)

---

## Section 6 — Iteration Protocol

Building a skill in one pass produces structure without depth. The funnel skill reached its current quality through six rounds. Codify the sequence:

### Round 1: Skeleton

Build the router + per-unit template + output template. Get the structure right. Don't add benchmarks or principles yet.

**Research in this round:** Search for existing taxonomies and classification systems in the domain. Are there established ways to categorize the contexts your router needs to handle? Use these to validate or expand your branches.

**Exit test:** Can you trace a sample input through the skill and see which configuration it hits, what template gets filled, and what the output shape looks like?

### Round 2: Data

Research and add benchmarks, sources, and confidence tags. Fill in the per-unit template with real numbers.

**Research in this round:** This is the heaviest research round. Use `deep-web-research` to find industry benchmarks, performance standards, and cost ranges. Target 10–30 sources. Tag every number.

**Exit test:** Does every benchmark have a named source and year? Is every claim tagged Observed, Inferred, or Uncertain?

### Round 3: Components

Add overlays, variants, edge cases, and compliance layers. Cover the configurations you missed in round 1.

**Research in this round:** Search for edge-case architectures and format variants that practitioners use but that your skill doesn't yet cover. The funnel skill's overlay system (VSL, webinar, quiz, tripwire, etc.) came entirely from researching what practitioner taxonomies named as distinct funnel types.

**Exit test:** Take the three most different possible inputs. Does the skill handle all three without falling through to a generic path?

### Round 4: Philosophy

Write design principles — but only after the structure exists. You need to see the skill's shape before you can write guardrails for it. Convert every principle from declarative to procedural (Section 4).

**Research in this round:** Find the empirical backing for each principle. Search for real case studies that demonstrate the principle in action (worked examples) and real failures that demonstrate what happens when it's violated (counter-examples). The funnel skill's Principle 7 (one bottleneck at a time) is powerful because it cites a real $270K→$540K case, not because the principle itself is novel.

**Exit test:** Does every principle have a fill-in-the-blank procedure AND a worked example grounded in a real (researched) case?

### Round 5: Coherence check

Read the skill top to bottom. Check:
- Do cross-references point to real sections?
- Do benchmark numbers in the body match the benchmark tables?
- Do anti-patterns match the principles (no contradictions)?
- Does the output template include fields for every layer the skill builds?

### Round 6: Stress test

Ask: "If I used this skill for [extreme case], would it produce a good result?" Try:
- The simplest possible input (does it avoid over-engineering?)
- The most complex possible input (does it have enough structure?)
- An input that sits between two configurations (does the router handle ambiguity?)
- An input with missing data (do the defaults produce reasonable output?)

---

## Section 7 — Skill Maintenance and Update Cadence

Skills degrade silently. 91% of ML models experience degradation over time, yet only 5% have mature monitoring (Agent Patterns 2025). Agent skills degrade through four mechanisms: API/URL changes, model updates, prompt drift, and world changes (new regulations, new tools, new benchmarks). A skill's output quality can drop significantly with no code changes and no visible errors.

Don't schedule calendar-based reviews uniformly — skills decay at different rates. Instead, use **staleness triggers**: specific signals that a skill needs review.

### Staleness triggers

Review a skill when any of these are true:

- A benchmark source in the skill is older than 18 months
- A referenced URL returns 404 or redirects to unrelated content
- The user reports the skill produced wrong or outdated guidance
- A new industry standard, regulation, or tool has emerged that the skill doesn't cover
- The skill's output is consistently being manually corrected by the user
- A new skill in the repo covers overlapping territory (creates conflict risk)
- `git log --since="6 months ago" -- .cursor/skills/[skill-name]/` returns nothing and the domain is fast-moving

### Review procedure

Designed to be completed in one session:

1. Run `deep-web-research` on the 3 most time-sensitive claims in the skill (benchmarks, compliance rules, tool references)
2. Spot-check referenced URLs: `curl -sI [url] | head -1` for any that might have gone stale
3. Compare benchmark tables against current sources; downgrade confidence tags (Observed → Uncertain) if the source is now older than 18 months
4. Check whether new overlays, configurations, or edge cases have emerged that the skill should cover but doesn't
5. Verify anti-patterns still reflect real practitioner complaints (search for new failure modes)
6. Update the `last-reviewed` frontmatter field (see below)

### Cursor-specific maintenance hooks

Skills in this repo are git-tracked markdown in `.cursor/skills/`. Use that to your advantage:

- **Frontmatter staleness signal:** Add `last-reviewed: YYYY-MM-DD` to the YAML frontmatter of any skill built with this meta-skill. This gives both the agent and the user a quick way to see when the content was last verified. Update it only after completing the review procedure above — not on cosmetic edits.
- **Git-based age check:** `git log -1 --format="%ci" -- .cursor/skills/[skill-name]/SKILL.md` shows the last modification date. If it's older than 6 months in a fast-moving domain, that's a trigger.
- **Flag stale claims at runtime:** When the agent uses a skill and encounters a claim it can't verify or that contradicts recent knowledge, flag it in the response with a note like "This benchmark is from [year]; consider verifying with current data" rather than silently producing potentially stale output.

### What NOT to do

- Don't review all skills on the same calendar cadence (a compliance skill in a fast-changing regulatory environment decays faster than a discovery-interview playbook)
- Don't rewrite working skills just because they're old (if the outputs are still accurate and the user isn't correcting them, the skill is fine)
- Don't update benchmarks without re-running source verification (changing a number without checking the source is worse than leaving it stale with a correct confidence tag)

---

## Quality Checklist (All Patterns)

Do not ship a skill unless all applicable gates pass:

### Structure
- [ ] Pattern selected with explicit reasoning
- [ ] Every step has a clear input and output
- [ ] Router logic is IF/ELIF pseudocode (not prose)
- [ ] Per-unit template has fill-in-the-blank fields

### Content
- [ ] Every principle is procedural (fill-in-the-blank + worked example), not just declarative
- [ ] At least one worked example per complex step
- [ ] At least one near-miss counter-example per router branch (near-misses that pass on most criteria but fail on one are 10x more informative than obvious failures)
- [ ] Anti-patterns are specific (not generic "don't do bad things")

### Research and Benchmarks
- [ ] Key claims are backed by web research, not just LLM general knowledge
- [ ] Worked examples use real cases (with sources) where possible, not invented hypotheticals
- [ ] Every benchmark has a named source and year
- [ ] Every benchmark is tagged Observed, Inferred, or Uncertain
- [ ] Contradictions between sources are surfaced and resolved
- [ ] Anti-patterns cite real failures or practitioner complaints, not just logical inversions

### Output
- [ ] At least one output template with fill-in-the-blank fields
- [ ] Template fields match the layers the skill builds (no orphan fields, no missing fields)

### Mechanics
- [ ] Frontmatter has name and description (per `create-skill` requirements)
- [ ] Description includes both WHAT and WHEN
- [ ] Cross-references to other skills use correct relative paths
- [ ] Total length is within target range for the selected pattern

---

## Anti-Patterns

Avoid:

- Writing principles without procedures (the "should" trap — if the skill says "should" without showing how, it's declarative)
- Adding benchmarks without sources (unsourced numbers are worse than no numbers — they create false confidence)
- Building overlays before the base configuration works (overlays modify a foundation; if the foundation is wrong, overlays amplify the error)
- Writing design principles before the structure exists (you can't write guardrails for a building you haven't designed yet)
- Copying the funnel skill's structure for a domain that only needs a linear pipeline (Pattern 4 is expensive; don't use it when Pattern 2 suffices)
- Making the meta-skill longer than the skills it creates (complexity should live in the domain skill, not in the instructions for building it)
- Skipping the stress test (round 6 catches the errors that coherence checks miss — edge cases and ambiguous inputs)
- Writing tactics, frameworks, or examples from LLM general knowledge without researching what practitioners actually do (this is the #1 source of "fluff" — plausible-sounding content that an expert would immediately recognize as generic)
- Treating research as a one-time benchmarks step instead of a continuous activity across all rounds (Round 1 needs taxonomy research, Round 3 needs variant research, Round 4 needs case-study research)

---

## Handoff Rules

- If the user needs help with skill file mechanics (frontmatter, directory, description) → defer to `create-skill`
- If the skill being built needs domain benchmarks → use `deep-web-research` to source them
- If the skill being built covers an offer or business model → consult `consult-hormozi` for framework alignment
- If the skill being built needs a landing page or funnel component → reference `constructing-a-landing-page` or `constructing-a-funnel` as structural models

---

## Reference: Existing Skill Portfolio

| Skill | Pattern | Lines | Key structural feature |
|---|---|---|---|
| `consult-hormozi` | Router | 273 | Classification taxonomy + asset routing |
| `lead-magnet-creation` | Linear Pipeline | 145 | 4/4 meta gate + awareness-stage matching |
| `stakeholder-discovery` | Linear Pipeline | 181 | Interview playbook + outreach templates |
| `deep-web-research` | Linear Pipeline | 369 | Hypothesis-driven search + evidence scoring |
| `offer-pillar-discovery` | Routed Playbook | 195 | Phased discovery + quality filter |
| `high-cagr-market-discovery` | Routed Playbook | 280 | 4-question filter + macro/micro frameworks |
| `brand-guide-creation` | Routed Playbook | 411 | Job classification + external template file |
| `constructing-a-funnel` | Configured + Overlays | 1088 | 6 configs + 7 overlays + design principles |
| `constructing-a-landing-page` | Configured + Overlays | 1287 | Config router + per-section spec + benchmarks |
| `constructing-onboarding` | Configured + Overlays | 1462 | 7 configs + 7 touch-model overlays + screen build specs + flow state machine + email sequences |
