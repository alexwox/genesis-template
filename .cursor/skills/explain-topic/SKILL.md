---
name: explain-topic
description: Refresh your memory on any topic by synthesizing local repo files, Hormozi assets, skills, and web research into a tiered briefing. Use when the user says /explain [topic], asks "what do we know about X", "remind me about X", "catch me up on X", or wants to explore and internalize a topic from the repo or the web.
---

# Explain Topic

## Purpose

Help the user quickly recall, internalize, and explore what they know about a topic. Reads local repo files first, routes to web research when the knowledge isn't local, and always presents a tiered refresher: TLDR first, deeper on request.

Slash command: `/explain [topic]`

---

## Trigger

Apply when the user asks things like:

- "/explain sellable"
- "Remind me about the lead magnet idea"
- "What do we know about retention?"
- "Catch me up on the Hormozi pricing framework"
- "Explain SKAN attribution to me"
- "What's the current state of [topic]?"

---

## Step 1 — Parse the Topic

Extract the topic from the user's message. The topic might be:

- A repo idea name (e.g. "sellable")
- A domain concept (e.g. "lead magnets", "retention", "funnels")
- A Hormozi framework (e.g. "value equation", "grand slam offer")
- An external concept with no local files (e.g. "SKAN attribution", "Swedish AB formation")
- A blend (e.g. "how our funnel skill compares to industry practice")

---

## Step 2 — Find Relevant Files

Search the repo for files related to the topic. Search these locations in order:

| Location | What lives there | Search method |
|---|---|---|
| `ideas/` | Brainstorm sessions, idea files | Directory names + file names + content grep |
| `outputs/book-summaries/` | Hormozi book summaries (.md and .json) | File names + content grep |
| `outputs/research/` | Research outputs and benchmarks | File names + content grep |
| `outputs/problem-trees/` | MECE problem trees | File names + content grep |
| `assets/` | Source PDFs (Hormozi playbooks, etc.) | File names only (PDFs are heavy — read only if specifically needed) |
| `.cursor/skills/` | Skill files | Skill names + descriptions + content grep |
| `memories/` | Conversation memories | Content grep |

**Search procedure:**
1. Grep for the topic keyword(s) across all `.md` files outside `.cursor/plans/`
2. Check directory names under `ideas/` for matches
3. Check skill descriptions in `.cursor/skills/*/SKILL.md` frontmatter
4. Rank results by relevance: exact name match > title match > content mention

**Collect** the list of matching files with a one-line note on what each covers.

---

## Step 3 — Route

```
IF matching files found AND they cover the topic substantively:
  → Route 1: Repo Synthesis
ELIF no matching files found:
  → Route 2: External Research
ELIF matching files found BUT the topic clearly extends beyond local coverage:
  → Route 3: Hybrid
```

**How to decide "substantively covered":** If the matching files contain specific claims, decisions, frameworks, or data about the topic (not just a passing mention), it's substantive. If the topic only appears in a bullet point or a handoff reference, it's a mention — treat as hybrid or external.

---

## Route 1 — Repo Synthesis

Read the matching files. Synthesize across them — do not summarize each file independently.

**Synthesis procedure:**
1. Read each matching file (prioritize by relevance ranking)
2. Extract: core thesis, key decisions made, open questions, tensions or contradictions between files, and connections to other topics in the repo
3. If Hormozi book summaries are relevant, pull the specific frameworks that apply (not the whole summary)
4. If a skill covers this domain, note what the skill handles and what it doesn't

**Present as Tier 1 TLDR** (see output template below). After presenting, ask: "Want me to go deeper on any of these, or explore a specific aspect?"

---

## Route 2 — External Research

The topic has no local files. Route to the `deep-web-research` workflow.

**Procedure:**
1. Tell the user: "I don't have local files on [topic]. Let me research it."
2. Frame the topic as a research question using `deep-web-research` Step 1 (primary question + subquestions)
3. Run the research workflow
4. Present findings in the Tier 1 TLDR format, clearly labeled as web-sourced
5. Offer to save key findings to `outputs/research/` for future `/explain` calls

---

## Route 3 — Hybrid

The topic has local files but the user's question extends beyond what's there.

**Procedure:**
1. Run Route 1 first — synthesize what the repo already contains
2. Identify gaps: what aspects of the topic are NOT covered by local files?
3. Name the gaps explicitly: "Your repo covers X and Y, but doesn't address Z."
4. Ask: "Want me to research [gap] to complete the picture?"
5. If yes, run targeted `deep-web-research` only on the gaps — not a full research pass
6. Merge local synthesis with research findings, clearly labeling which is which

---

## Output Template — Tier 1 TLDR

Always present this first. Keep it to a 2-3 minute read.

```markdown
# [Topic]: Where Things Stand

## Core thesis
[1-2 sentences capturing the fundamental bet, insight, or framework]

## Key decisions made
- [Decision]: [what was decided and why] — from [source file]
- ...

## Open questions
- [Question]: [why it matters]
- ...

## Tensions or contradictions
- [Tension]: [file A says X, file B says Y — which is it?]
- (omit this section if none found)

## What you'd tell someone in 30 seconds
[Elevator pitch version — the whole topic compressed into a paragraph]

## Source files
- [file.md] — [one-line description of what it covers]
- ...
```

## Going Deeper (Tier 2)

When the user asks to go deeper on a specific aspect:

1. Read the relevant files in full (not just the parts used for the TLDR)
2. Present the full reasoning chain from those files
3. Surface connections to other topics in the repo ("this relates to what your funnel skill calls Principle 6 — economics as a design constraint")
4. If Hormozi assets are relevant, pull the specific framework and show how it applies
5. Identify what could be resolved with research or experiments, and offer to do either

---

## Source Labeling Rules

Never mix local knowledge with external knowledge without labeling:

- Claims from repo files: cite the file name
- Claims from Hormozi assets: cite the book/playbook name
- Claims from web research: cite with URL
- Claims from LLM general knowledge: explicitly say "based on general knowledge, not from your files or research" — and offer to verify with `deep-web-research`

This prevents the user from confusing their own prior thinking with new information.

---

## Anti-Patterns

Avoid:

- Dumping file contents instead of synthesizing across files (the user can read the files themselves — your job is to connect them into a coherent picture)
- Reading every file in the repo on every invocation (search first, read only matches)
- Presenting a flat list of per-file summaries (synthesize into one narrative, cite files inline)
- Inventing knowledge that isn't in the files and presenting it as if it were (label LLM knowledge explicitly)
- Skipping the TLDR and going straight to deep detail (always start with the compressed version — it forces synthesis and aids recall)
- Researching externally when the answer is already in the repo (check local first, always)

---

## Handoff Rules

- Topic is a Hormozi concept → also check `consult-hormozi` routing for the right asset
- Topic needs decision-grade external data → use `deep-web-research` (Route 2 or 3)
- Topic maps to an existing skill's domain → note which skill covers it and what it handles vs doesn't
- User wants to act on the topic (not just understand it) → suggest the relevant skill: `/funnel`, `/lead-magnet-creation`, `/offer-pillar-discovery`, etc.
