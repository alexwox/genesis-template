---
name: business-plan-context
description: Read and maintain business decisions in `business-plan-desicions/`. Use when any task touches product scope, pricing, audience, branding, copy, funnel structure, or go-to-market — read the folder first so decisions stay consistent, and write back when new decisions are made.
last-reviewed: 2026-04-06
---

# Business Plan Context

## Purpose

Keep business decisions centralized, discoverable, and consistent across all agent work. The `business-plan-desicions/` folder at the repo root is the single source of truth for product strategy, pricing, audience, branding, and go-to-market decisions. This skill ensures the agent reads existing decisions before acting and writes new decisions back when they're made.

---

## Trigger

Apply this skill when the task involves any of:

- Product scope, features, or SKU definitions
- Pricing, offers, bundles, or discount structures
- Target audience, avatar, or ICP
- Brand identity, voice, tone, slogans, or visual identity
- Copy direction, messaging pillars, or positioning
- Funnel structure, checkout flow, or upsell/downsell paths
- Go-to-market strategy, distribution channels, or launch planning
- Competitive landscape or market research findings
- Financial modeling, LTV, CAC, or revenue projections

Also apply when the user says things like:

- "What did we decide about pricing?"
- "Update the business plan with this decision"
- "Add this to our product spec"
- "What's our current avatar?"

## Do not add generic research into the business-plan-desicions folder unless they are part of, and central to actual desicions.

## Step 1 — Read Before Acting

Before making any recommendation or change that touches business strategy, read the relevant files in `business-plan-desicions/`.

**Procedure:**

1. List the folder: `ls business-plan-desicions/`
2. Scan filenames to identify which documents are relevant to the current task
3. Read the relevant files
4. Surface any decisions that constrain or inform the current task

If the folder is empty or the relevant topic has no document yet, say so and proceed — but flag that the decision should be written back after the task.

**Do not** make product, pricing, or audience recommendations that contradict existing decisions in this folder without explicitly flagging the contradiction and getting user approval to change it.

---

## Step 2 — Write Decisions Back

When a conversation produces a new business decision or updates an existing one, write it to the folder.

### When to write

- The user explicitly asks to record a decision
- A conversation reaches a clear conclusion on product scope, pricing, audience, brand, funnel structure, or GTM
- Market research produces findings that should inform future decisions
- A prior decision is revised or superseded

### File naming convention

```
NNN-topic-name.md
```

- `NNN` = zero-padded sequence number (001, 002, 003...)
- `topic-name` = kebab-case description of what the file covers
- Check existing files to determine the next sequence number

**Examples:**

- `001-product-pricing-and-market-research.md`
- `002-target-avatar.md`
- `003-brand-guide.md`
- `004-funnel-and-checkout-flow.md`
- `005-launch-plan.md`

### File structure

Every decision document should follow this structure:

```markdown
# NNN — [Title]

**Date:** YYYY-MM-DD
**Status:** Draft | Active | Superseded by NNN

---

## Context

[Why this decision was needed — 2-3 sentences]

## Decision

[The actual decision, stated clearly]

## Rationale

[Why this option was chosen over alternatives]

## Implications

[What this decision affects downstream — other decisions, implementation, constraints]

## Open questions

[Anything unresolved that needs follow-up]

## Sources

[If backed by research, list sources with dates]
```

Not every document needs all sections — use judgment. A brand guide will look different from a pricing decision. But every document needs at minimum: **title, date, status, and the decision itself.**

### Updating existing documents

When a decision changes:

1. Update the existing file if it's a refinement (add a dated section or update the relevant section)
2. Create a new file and mark the old one `Superseded by NNN` if it's a fundamental change
3. Never silently change a decision — add context about what changed and why

---

## Step 3 — Cross-Reference in Conversation

When the current task depends on a prior decision, cite it:

> "Per `001-product-pricing-and-market-research.md`, the $499 tier is an anchor with ~12% expected take rate. The checkout flow should present $249 as the recommended tier."

This keeps the human oriented and makes it easy to trace why a recommendation was made.

---

## Document Topics (expected over time)

This is not exhaustive — add documents as decisions are made. Common topics:

| Topic                  | Covers                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| Product & pricing      | SKU definitions, price ladder, guarantee structure, bundling rules |
| Market research        | Competitive landscape, market gaps, benchmark data                 |
| Target avatar          | Who the buyer is, what they need, where they hang out              |
| Brand guide            | Name, positioning, voice, tone, visual identity, associations      |
| Messaging & copy       | Headline frameworks, value propositions, objection handling        |
| Funnel & checkout      | Page sequence, upsell/downsell paths, post-purchase flow           |
| Product specifications | What's included in each tier, delivery format, access rules        |
| Launch plan            | Timeline, channels, launch sequence, success criteria              |
| Financial model        | LTV projections, CAC targets, unit economics, revenue model        |
| Content strategy       | Distribution channels, content calendar, SEO/social plan           |

---

## Anti-Patterns

- **Acting on business strategy without reading the folder.** The most common failure. If a pricing recommendation contradicts what's in `001-product-pricing-and-market-research.md`, the agent wasted the user's time.
- **Keeping decisions only in chat.** Conversations are ephemeral. If a decision matters, it goes in the folder.
- **Overwriting without context.** Changing a number in a file without noting why is how decisions become untraceable.
- **Creating documents prematurely.** Don't write a brand guide document after a 2-sentence exchange about colors. Write when there's enough substance to be useful later.
- **Duplicating across documents.** If pricing is defined in `001`, don't redefine it in `004`. Cross-reference instead.
- **Research that isnt decided on** Do not add generic research into the business-plan-desicions folder unless they are part of, and central to actual approved desicions.
