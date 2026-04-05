---
name: deep-web-research
description: Conduct rigorous multi-source web research for high-stakes questions using hypothesis-driven search, source-quality scoring, contradiction checks, and evidence-backed synthesis. Use when the user asks for deep research, demanding web analysis, market/competitive intelligence, technology due diligence, or decision-grade reports.
---

# Deep Web Research Skill

## Purpose

Run demanding, decision-grade web research with transparent evidence, explicit confidence, and clear recommendations.

Use this when the user asks for:

- "Deep research"
- "Research this thoroughly"
- "Do a demanding web analysis"
- "Give me a decision-grade report"
- "Competitive intelligence", "market mapping", "vendor landscape", "due diligence"

Slash command: `/deepresearch`

---

## Inputs To Collect First

Before starting, confirm:

1. Research question (single main question)
2. Decision context (what decision this supports)
3. Time horizon (current state, 1-3 years, or long-term)
4. Geography/scope (global or specific regions)
5. Output mode (`full_report` or `decision_memo`)

If not provided, use defaults:

- Scope: global
- Horizon: current + 12 months
- Output mode: full report

---

## Research Standard

For demanding research, enforce all of these:

1. **Triangulation**: no important claim from a single source only.
2. **Source quality tiers**: prioritize primary and high-credibility sources.
3. **Contradiction handling**: explicitly surface disagreements and resolve or leave open.
4. **Evidence labeling**: tag claims as observed, inferred, or uncertain.
5. **Citation completeness**: every critical claim has a URL citation.
6. **Recency check**: mark stale evidence and prefer newer material for fast-changing topics.

---

## Source Quality Tiers

Use this ranking when gathering evidence:

- **Tier 1 (highest confidence)**:
  - Official docs, standards bodies, regulator pages, company filings, audited reports, first-party datasets
- **Tier 2 (strong)**:
  - Reputable research firms, major industry publications, established technical blogs with reproducible details
- **Tier 3 (supporting only)**:
  - Opinion pieces, newsletters, social posts, marketing pages without substantiation

Rule: Major conclusions require Tier 1 or Tier 2 support. Tier 3 cannot stand alone.

## Community Signal Coverage

For demanding research, include community-signal sources as a dedicated lane:

- practitioner forums (industry forums, Reddit, specialized communities)
- X and other social channels where practitioners share live pain points
- review communities and operator discussion boards

Usage rule:

- treat these as signal discovery and hypothesis generation
- validate material conclusions with Tier 1 or Tier 2 sources before final recommendations

## Authentication handling for restricted sources

If an important source requires authentication:

1. Start browser automation and navigate to the login page.
2. Tell the user to complete login manually.
3. Resume research only after the user confirms login is complete.

Never ask for user passwords or attempt credential collection in chat.

---

## Workflow

## Step 1 - Frame the question

Convert the user request into:

- Primary question
- 3-7 subquestions
- Falsifiable hypotheses

Example:

- Primary: "Is X market attractive for entry?"
- Subquestions: growth, demand drivers, unit economics, competitive intensity, regulation, distribution, timing
- Hypothesis: "X is attractive only if growth is structural and margins remain defensible"

## Parallelism rule (use subagents)

For demanding research, run parallel workstreams whenever tasks are independent.
Work MECE to avoid unnecessary overlap where possible.

- Use up to 4 concurrent subagents.
- Assign each lane one narrow objective, for example:
  - lane 1: market size and growth evidence
  - lane 2: customer pain and budget signals
  - lane 3: competitive landscape and alternatives
  - lane 4: risks, regulation, and counterevidence
- Give each lane a strict output schema:
  - top claims
  - strongest citations
  - contradictions found
  - confidence per claim
- Merge lanes only after all lanes return, then deduplicate and resolve conflicts.

Rule: parallelize exploration and evidence collection, then centralize synthesis in one final pass.

## Step 2 - Build search map

Create a search plan with query clusters:

- Definitions and market boundaries
- Size and growth
- Customer pain and spending
- Competition and alternatives
- Economics and constraints
- Risks and counterevidence

Use precise, date-aware queries and include region keywords where relevant.

## Step 3 - Collect and log evidence

For each source, capture:

- URL
- Source tier
- Publication/update date
- Key claim
- Evidence strength (high, medium, low)
- Notes on bias or conflicts

Target: 12-30 high-quality sources for deep research.

## Step 4 - Test contradictions

For each important claim:

- Find at least one confirming source and one disconfirming or skeptical perspective.
- If disagreement remains, state why (different definitions, date mismatch, geography mismatch, methodology mismatch).

## Step 5 - Synthesize into decision logic

Build conclusions as:

- What is true with high confidence
- What is likely but uncertain
- What would change the decision

Then map implications:

- Strategic implications
- Execution implications
- Risk implications

## Step 6 - Produce final output

Choose output mode:

- `full_report`: comprehensive with methods, sources, findings, and recommendations
- `decision_memo`: concise go/no-go framing with evidence

Always include:

- confidence score per key conclusion
- explicit assumptions
- open questions and what to research next

## Step 7 - Review and expand evidence (when needed)

Run this step if any of the following is true:

- a key conclusion has low confidence
- a critical claim has fewer than 2 strong citations
- contradictions remain unresolved
- recommendations are directionally right but not decision-grade

Review protocol:

1. Create a `Research Gaps` list ranked by decision impact.
2. Launch targeted follow-up collection only for top gaps (avoid broad re-search).
3. Add missing evidence, then re-run contradiction checks on updated claims.
4. Upgrade the report with a final quality pass:
   - stronger citations on critical claims
   - clearer uncertainty boundaries
   - tighter link from evidence to recommendation

Stop rule: end review once remaining uncertainty would not materially change the decision.

---

## Required Output Templates

## Template A - Full Report

Use this structure:

```markdown
# [Research Title]

## Executive answer

[Direct answer in 5-10 lines]

## Decision context

- Decision to support:
- Scope:
- Time horizon:

## Method

- Research approach:
- Number of sources:
- Source mix by tier:
- Date range covered:

## Key findings

### Finding 1

- Claim:
- Why it matters:
- Confidence: High/Medium/Low
- Evidence:
  - [Source](https://...)
  - [Source](https://...)

### Finding 2

...

## Contradictions and resolution

- Conflict:
- Competing evidence:
  - [Source](https://...)
  - [Source](https://...)
- Resolution or open uncertainty:

## Decision implications

- Strategic:
- Operational:
- Financial:
- Risk:

## Recommendations

1. [Action]
2. [Action]
3. [Action]

## Assumptions and unknowns

- Assumption:
- Unknown:

## Source list

1. [Title](https://...)
2. [Title](https://...)
```

## Template B - Decision Memo

Use this structure:

```markdown
# Decision Memo: [Question]

## Recommendation

[Go / No-go / Wait] + one-paragraph rationale.

## Evidence summary

- Strongest supporting evidence:
  - [Source](https://...)
- Strongest counterevidence:
  - [Source](https://...)

## Decision criteria check

- Criterion 1: Pass/Fail/Unclear
- Criterion 2: Pass/Fail/Unclear
- Criterion 3: Pass/Fail/Unclear

## Risks and mitigations

- Risk:
- Mitigation:

## Confidence

- Overall confidence: High/Medium/Low
- What would increase confidence fastest:

## Next 3 research actions

1. [Action]
2. [Action]
3. [Action]
```

---

## Quality Gates Before Finalizing

Do not finalize until all gates pass:

- [ ] Every major claim has at least 2 citations
- [ ] At least one counterargument is represented
- [ ] No critical claim relies only on Tier 3 sources
- [ ] Data freshness is checked and dated
- [ ] Uncertainty is explicit where evidence is mixed
- [ ] Recommendation is logically tied to evidence

If any gate fails, add a `Research Gaps` section and specify what is missing.

---

## Fast Heuristics For Demanding Research

- Prefer primary sources over summaries.
- Prefer newer evidence in fast-moving domains.
- Do not mix incompatible market definitions.
- Separate facts from interpretation.
- Quantify when possible; if not possible, explain why.
- Be explicit about survivorship and selection bias.

---

## Anti-Patterns

Avoid:

- Source dumping without synthesis
- Making conclusions from one article
- Ignoring contradictory data
- Presenting old data as current
- Confusing confidence with certainty

---

## Trigger Examples

Apply this skill when user asks:

- "Do deep research on [topic]"
- "I need a demanding web analysis for [market]"
- "Compare these vendors thoroughly"
- "Build a decision-grade brief from web sources"
- "Research and pressure-test this strategy"
