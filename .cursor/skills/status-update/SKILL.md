---
name: status-update
description: Builds stakeholder-friendly project status updates from markdown sources. Use when asked for progress reports, implementation status, future plans, UI/UX flow summaries, infrastructure/data-flow summaries, risks, code smells, or scout-principle improvement notes.
---

# Status Update

Create a clear status update from project markdown files for non-technical stakeholders.

## Apply This Skill When

- The user asks for a status update, progress update, roadmap update, or "what is done vs what remains."
- The user wants simple-language explanations for business/stakeholder audiences.
- The user wants UI flow impact or infrastructure/data-flow impact summarized.
- The user asks for risks, code smells, trade-offs, or improvement opportunities.

## Inputs To Review First

Prioritize markdown files that describe scope, architecture, delivery notes, and plans:

- `README.md`
- `notes.md`
- `docs/**/*.md`
- `architecture.md` and `docs/architecture/**/*.md`
- any recent planning or migration markdown files relevant to the request

If a requested area has no markdown coverage, state that as a gap.

## Output Style Rules

- Use plain language; avoid jargon where possible.
- If jargon is needed, define it in one short sentence.
- Prefer concrete statements over assumptions.
- Include both positives and negatives.
- Keep tone factual and calm (not sales-y, not alarmist).

## Required Report Structure

Use this structure in order:

1. **Current status (today)**
   - 3-6 bullets on what is implemented and usable now.
2. **What remains**
   - 3-6 bullets on missing work, known gaps, or incomplete flows.
3. **Future plan (near term)**
   - 2-5 bullets on likely next milestones.
4. **Pros / Cons / Difficulties**
   - Pros: what is working well
   - Cons: limitations or trade-offs
   - Difficulties: blockers, uncertainties, or complexity drivers
5. **UI flows (only if UI changed)**
   - Explain user stories in simple "As a <user>, I can <goal>" form.
   - Explain the main path and 1-2 edge cases.
6. **Infrastructure & data flow (only if infra changed)**
   - What changed
   - Why it changed
   - How data moves now (source -> processing -> storage -> consumption)
   - Architecture pros and cons
7. **Risks and code smells**
   - Identify concrete risks (technical, product, delivery, security/operational).
   - Identify code smells with practical impact.
8. **Scout-principle improvements**
   - List small improvements already made (if any were made during this task).
   - List next small cleanups to leave code/docs better than found.

## Analysis Checklist

- Separate **fact** (in docs) from **inference** (best guess).
- Call out stale docs or conflicting docs.
- Highlight dependency risks and ownership ambiguity.
- Prefer incremental, low-risk cleanup recommendations over large rewrites.

## Guardrails

- Do not claim implementation details that are not documented.
- Do not hide unresolved issues.
- Do not present roadmap guesses as commitments.
- Do not over-index on technical detail for stakeholder audiences.

## Quick Template

```md
## Current status
- Implemented: ...

## What remains
- Missing: ...

## Future plan
- Next: ...

## Pros / Cons / Difficulties
- Pros: ...
- Cons: ...
- Difficulties: ...

## UI flows
- As a <user>, I can ...

## Infrastructure and data flow
- Change: ...
- Why: ...
- Flow: source -> process -> storage -> consumers
- Pros: ...
- Cons: ...

## Risks and code smells
- Risk: ...
- Code smell: ...

## Scout-principle improvements
- Improved now: ...
- Improve next: ...
```
