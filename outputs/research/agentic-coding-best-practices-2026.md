# Agentic Coding Best Practices — April 2026

## Executive Summary

The developer workflow has undergone its largest transformation in two decades. By April 2026, 95% of professional developers use AI coding tools weekly, with 44% writing less than 10% of their code manually (Osmani poll, 5,000 developers, Jan 2026). The shift moved from "AI suggests a line" to "AI executes entire features autonomously." Three competing philosophies have emerged for how to work with these tools, but a practical consensus is forming around a hybrid model that the best practitioners are converging on.

The core tension the user identified — "the agent does a lot of changes at once, and I'm standing there wondering if I trust this" — is the defining problem of agentic coding in 2026. This report maps the competing approaches, the emerging consensus, and the concrete workflow that addresses this tension.

---

## The Three Competing Narratives

### Narrative 1: "Let It Rip" (Full Autonomy)

**Proponents:** Andrej Karpathy ("agentic engineering"), early Codex adopters, vibe-coding community.

**Core belief:** The model is smart enough to drive. Your job is to manifest intent, not write code. Delegate 80%+ of coding to agents, review outputs at macro level, iterate on instructions rather than implementations.

**How it works in practice:**
- Developer writes a natural-language spec or task description
- Agent autonomously plans, implements, tests, and self-corrects
- Human reviews the final PR, not intermediate steps
- Multiple agents run in parallel via git worktrees

**What Karpathy reports (Dec 2025 → early 2026):** He went from 80% manual / 20% delegated to essentially the inverse. He calls this "the biggest change to my basic coding workflow in ~2 decades of programming." He now "manifests intent" — decomposing goals into tasks, assigning to agents, reviewing at macro level. [Source: Business Insider, Feb 2026; The AI Corner, 2026; byteiota, 2026]

**Where it works:** Greenfield projects, prototypes, personal projects, well-tested codebases with CI/CD, tasks with clear completion criteria.

**Where it breaks:**
- **The 80% Problem** (Osmani, Jan 2026): AI handles 80%+ of the work, but the remaining 20% contains the hardest problems. The nature of errors shifted from syntax bugs to *conceptual failures* — wrong assumptions propagated into entire features, abstraction bloat, dead code accumulation.
- **Assumption propagation**: The agent misunderstands requirements early and builds the entire feature on a faulty premise. You don't catch it until review, when it's already 15 files deep.
- **Trust inversion**: Junior developers (< 2 years) are 60% confident shipping AI code without review. Senior developers (10+ years) are only 26% confident. The people who know the most trust it the least. [Source: Groundy, 2026]
- **Production incidents**: Lovable exposed data in 170 apps. Replit agent deleted a database. 45% higher vulnerability rates in AI-generated code. [Sources: divkix.me, 2026; Trend Micro, Mar 2026]

**Honest assessment:** Works for experienced developers on greenfield projects with good test coverage. Dangerous for production systems without guardrails. The Karpathy workflow requires Karpathy-level judgment about what to delegate and how to verify.

---

### Narrative 2: "Trust Nothing" (Careful Review)

**Proponents:** Codemanship blog ("100% autonomous coding is a fool's errand"), security-focused teams, enterprise engineering orgs, Trend Micro security researchers.

**Core belief:** AI-generated code is untrusted by default. Every line must be reviewed with the same rigor as code from a junior contractor. Full autonomy creates unacceptable risk.

**How it works in practice:**
- Agent suggests changes, human approves each step
- Every PR reviewed line-by-line with security checklist
- Heavy reliance on linters, SAST, and automated security scanning
- Agent used more as an assistant than an autonomous worker

**Key evidence supporting this view:**
- 96% of developers do not fully trust AI-generated code to be functionally correct, yet only 48% always verify before committing [Groundy, 2026]
- AI code review tools (including Copilot) only analyze diffs, not full systems — they can't detect how changes break downstream services [Groundy, 2026]
- In security testing, GitHub Copilot failed to flag vulnerabilities in intentionally vulnerable codebases [Groundy, 2026]
- 75% of AI coding models introduce regressions when maintaining codebases over time [Walseth AI, 2026]

**Where it works:** Regulated industries, security-sensitive systems, large existing codebases, teams without strong test coverage.

**Where it breaks:**
- Massively slower than the hybrid approach — human becomes the bottleneck
- Developers who review every step fatigue quickly and start rubber-stamping
- Doesn't scale to the volume of code agents can produce
- Misses the productivity gains that justify using agents at all

**Honest assessment:** The instinct is correct — you should understand what's in your codebase. But step-by-step approval doesn't scale. The real answer is structural verification (tests, CI, hooks) rather than line-by-line human vigilance.

---

### Narrative 3: "Structured Hybrid" (Human-on-the-Loop)

**Proponents:** Cursor team, Kilo.ai, DTX Systems, Addy Osmani, most practitioner guides published in Q1 2026.

**Core belief:** Human cognitive load moves from *writing* to *scoping and reviewing*. The developer is an architect and reviewer, not a typist. Autonomy is proportional to guardrails. More autonomy requires proportionally more structural enforcement.

**How it works in practice:**
- **Plan locally** → **Execute autonomously** → **Verify via CI** → **Checkpoint via PR review**
- Developers scope objectives and constraints before agent execution
- Agents self-correct in a loop (run tests, fix failures, re-run) without human intervention
- Humans review at the PR boundary, not at every intermediate step
- Guardrails enforce constraints structurally (tests, hooks, linters) rather than through trust

**Key frameworks:**

**The Enforcement Ladder (Walseth AI, 2026):**
- L1: Conversation instructions (forgotten next session)
- L2: Prose documentation like CLAUDE.md (3,706+ violations tracked in production systems)
- L3: Templates and scaffolds (right pattern becomes the easy path)
- L4: Automated tests (catches violations at commit time)
- L5: Hooks and runtime guards (physically prevents the action)

Critical insight: Every repeated violation should be promoted up the ladder. If the agent keeps doing something wrong despite docs, add a test. If tests aren't enough, add a hook.

**Where it works:** Everything from prototypes to production, solo to team, greenfield to legacy — because the guardrail intensity scales with the stakes.

**Honest assessment:** This is the consensus forming in April 2026. It's not a compromise — it's a recognition that the bottleneck shifted from "writing code" to "verifying code at scale," and the answer to that is structural enforcement, not human vigilance.

---

## The Practical Consensus: What the Best Developers Actually Do

Across all the narratives, a concrete workflow has emerged. Here's what it looks like in practice:

### Phase 1: Scope Before You Prompt

The #1 mistake is typing a vague request and letting the agent rip. The #1 best practice is spending 2-5 minutes scoping before execution.

**What scoping looks like:**
1. Write the task as a spec with: goal, acceptance criteria, constraints, files in scope
2. Use Plan Mode (`Shift+Tab` in Cursor) to have the agent research your codebase and propose an approach BEFORE writing code
3. Review and edit the plan — this is where your judgment matters most
4. Only then switch to agent execution

**Why this works:** The agent is excellent at elaboration but poor at judgment. By front-loading your judgment into the spec, you get the agent's speed on execution without its tendency to propagate wrong assumptions.

**Spec template that works:**
```
Goal: [What should exist when this is done]
Acceptance criteria:
- [Criterion 1]
- [Criterion 2]
Constraints:
- Only modify files in [scope]
- Follow existing patterns in [reference file]
- Must pass existing tests
Do NOT:
- [Explicit exclusion 1]
- [Explicit exclusion 2]
```

### Phase 2: Size Your Tasks Correctly

The consensus is clear: **smaller, bounded tasks outperform monolithic requests** (Masood, Mar 2026). Each agent task should be:
- Completable in 10-30 minutes
- Touching 3-5 files maximum
- Verifiable with a clear "done" condition

**Task sizing heuristic:**
| Task Size | Files | Agent Autonomy | Review Strategy |
|---|---|---|---|
| Small (single concern) | 1-2 | Full autonomy, auto-run tests | Quick diff review |
| Medium (feature slice) | 3-5 | Full autonomy with plan review | PR-style review |
| Large (cross-cutting) | 6+ | **Break into smaller tasks** | Review each sub-task |

The rule: if you can't describe the task's "done" condition in one sentence, it's too big. Split it.

### Phase 3: Constrain Your Tools

Before granting autonomy, set up structural constraints:

**AGENTS.md / CLAUDE.md / .cursor/rules/:** The emerging standard is to have a persistent file that tells every agent your conventions. Keep it under 2,000 words (each word costs tokens every session). Include:
- Tech stack and versions
- File structure conventions
- Hard constraints ("never force-push," "never delete test files")
- Build/test commands
- Patterns to follow (with file references)

**Git as safety net:** Always commit or branch before agent execution. The agent should never modify uncommitted work.

**Recommended Cursor settings:**
- Agent Mode: enabled
- Auto-run terminal commands: enabled
- File deletion: disabled (until you trust your rules)

### Phase 4: Execute and Verify

Let the agent work. Don't interrupt mid-execution unless it's clearly going off the rails.

**Context management during execution:**
- Start fresh sessions for new tasks (don't accumulate)
- Performance degrades after 60-70% context window usage — not gradually, but sharply
- Adding 4,000 tokens of irrelevant context drops accuracy from 70-75% to 55-60%
- Use `/compact` at 70% utilization, `/clear` when switching tasks

### Phase 5: Review Like a PR, Not Like a Debugger

This is the direct answer to "I'm standing there wondering if I trust this."

**Don't** read every line trying to understand the implementation. **Do** review with a structured checklist focused on the things agents get wrong:

**Agent-Specific Review Checklist:**
1. **Intent alignment**: Does it actually solve the requirement, or did it solve an adjacent problem?
2. **Assumption check**: Did the agent make up APIs, database fields, or helper functions that don't exist?
3. **Scope creep**: Did it add extra features, refactors, or changes you didn't ask for?
4. **Business logic**: Are conditionals, defaults, and edge cases correct? (This is where agents fail most)
5. **Security basics**: No hardcoded secrets, inputs validated, auth checks present?
6. **Test quality**: Do tests actually fail when the code is broken? (Agents write passing tests that are tautologies)
7. **Dead code**: Did it leave old implementations, orphaned imports, or removed comments?

**The key insight: review behavior, not syntax.** The agent's syntax is almost always correct. The failures are conceptual — wrong assumptions, missing edge cases, over-engineered abstractions.

### Phase 6: Escalate Guardrails Over Time

Track what the agent gets wrong repeatedly. Each repeated mistake should climb the enforcement ladder:

1. First offense → mention it in the prompt
2. Second offense → add it to AGENTS.md/cursor rules
3. Third offense → add an automated test that catches it
4. Fourth offense → add a pre-commit hook that blocks it

---

## Tool-Specific Workflow Notes

### Cursor (Agent Mode)
- Use Plan Mode first (`Shift+Tab`), then switch to Agent for execution
- Use Ask Mode for code exploration (read-only — no accidental changes)
- `.cursor/rules/*.mdc` files with frontmatter let you load rules conditionally by file pattern
- `.cursorignore` for node_modules/dist/build (30%+ speed improvement)
- Checkpoint plans to `.cursor/plans/` for documentation

### Claude Code (CLI)
- Hooks execute deterministically (100% of the time), unlike advisory instructions
- Block destructive commands at the hook level (git force-push, rm -rf)
- Five compaction strategies for context management
- Subagent pattern: Planner → Builder → QA for multi-hour tasks

### OpenAI Codex
- Designed for background autonomous work
- "Automations" feature for unprompted routine tasks (issue triage, alert monitoring)
- Built-in worktrees and cloud environments for parallel work
- Security-first: kernel-level sandboxing (macOS Seatbelt, Linux Landlock)

### Parallel Agents (Git Worktrees)
For large features, run multiple agents simultaneously:
```bash
git worktree add -b feat/auth ../project-auth main
git worktree add -b feat/dashboard ../project-dashboard main
```
Each agent gets its own isolated directory, branch, and port. Merge sequentially when done.

---

## The "Trust Thermometer" — Calibrating Autonomy by Risk

Rather than applying one workflow to everything, calibrate autonomy to stakes:

| Scenario | Autonomy Level | Key Control |
|---|---|---|
| Throwaway prototype | Full autonomy, vibe-code it | None needed |
| Personal project, no users | High autonomy | Light PR review |
| Production feature, tested codebase | Medium autonomy | Plan review + PR review + CI |
| Security-sensitive code | Low autonomy | Plan review + line-by-line review + security scan |
| Database migrations, infra changes | Minimal autonomy | Human writes spec, agent drafts, human verifies every line |

---

## Contradictions and Open Questions

**Contradiction 1: "AI handles 80%+ of work" vs "75% of AI models introduce regressions"**
Resolution: Both are true simultaneously. Agents are excellent at *generating* new code and poor at *maintaining* existing code. The regression rate applies to modification tasks, not greenfield. Implication: use more autonomy for new features, less for changes to existing critical paths.

**Contradiction 2: "Start with Plan Mode" vs "Don't micromanage execution"**
Resolution: Plan review is high-leverage (catches wrong assumptions before 15 files are modified). Execution micromanagement is low-leverage (the agent's syntax is fine; catching it at PR review is sufficient). Front-load judgment, back-load verification.

**Open question: When does understanding the code stop mattering?**
For production systems, understanding is non-negotiable — you'll need to debug it. For prototypes and experiments, full understanding may not be worth the time. The user's instinct ("I should be able to see and understand the code") is correct for anything that will run in production or be maintained over time.

---

## Sources

1. Muwwakkil, A. "Agentic Coding Best Practices — 2026." Medium, Feb 2026. https://abdus-muwwakkil.medium.com/agentic-coding-best-practices-fc167be3f7d5
2. DTX Systems. "Working with AI Coding Agents — A Practitioner's Guide (2026)." https://dtx.systems/blog/working-with-ai-coding-agents
3. Nimbalyst. "Coding with AI Agents: Best Practices for 2026." https://nimbalyst.com/blog/coding-with-ai-agents-best-practices-2026
4. Kilo.ai. "Beyond Autocomplete: Best Agentic Coding Workflow in 2026." https://kilo.ai/articles/beyond-autocomplete
5. Osmani, A. "The 80% Problem in Agentic Coding." Substack, Jan 2026. https://addyo.substack.com/p/the-80-problem-in-agentic-coding
6. Karpathy, A. Referenced in Business Insider, "Agentic Engineering Is the Next Big Thing." Feb 2026. https://www.businessinsider.com/agentic-engineering-andrej-karpathy-vibe-coding-2026-2
7. Karpathy, A. Referenced in The AI Corner, "The AI Workflow Shift Explained 2026." https://www.the-ai-corner.com/p/andrej-karpathy-ai-workflow-shift-agentic-era-2026
8. divkix.me. "Vibe Coding in 2026: Why AI-Generated Code Fails in Production." https://divkix.me/blog/vibe-coding-truth-ai-programming-2026/
9. Solidmatics. "Vibe Code Audit Risks CEOs and CTOs Must Know in 2026." https://www.solidmatics.com/insights/the-vibe-coding-hangover-hitting-companies-in-2026
10. Groundy. "The Trust Problem With AI Code Review." https://groundy.com/articles/trust-problem-ai-code/
11. Trend Micro. "The Real Risk of Vibecoding." Mar 2026. https://www.trendmicro.com/en_us/research/26/c/the-real-risk-of-vibecoding.html
12. Trukhin. "ByteBurst #8: Three Agents, Three Philosophies." 2026. https://blog.trukhin.com/byteburst-8-three-agents-three-philosophies-1d88af1882b7
13. Codemanship. "100% Autonomous Agentic Coding Is A Fool's Errand." Feb 2026. https://codemanship.wordpress.com/2026/02/18/100-autonomous-agentic-coding-is-a-fools-errand/
14. jvaneyck. "Guardrails for Agentic Coding." Feb 2026. https://jvaneyck.wordpress.com/2026/02/22/guardrails-for-agentic-coding-how-to-move-up-the-ladder-without-lowering-your-bar/
15. Walseth AI. "AI Coding Agents Need Enforcement Ladders, Not More Prompts." 2026. https://walseth.ai/blog/enforcement-ladder-ai-coding-agents
16. Masood, A. "Agentic Software Development: The Complete Playbook." Medium, Mar 2026. https://medium.com/@adnanmasood/agentic-software-development-the-complete-playbook-bounded-tasks-clean-context-and-ruthless-4d8c4cf9ab37
17. Cursor. "Best practices for coding with agents." 2026. https://www.cursor.com/blog/agent-best-practices
18. Osmani, A. "How to write a good spec for AI agents." dev.to, 2026. https://dev.to/addyosmani/how-to-write-a-good-spec-for-ai-agents-31i9
19. OpenAI. "Unrolling the Codex agent loop." 2026. https://openai.com/index/unrolling-the-codex-agent-loop
20. SFAI Labs. "Context Is the New Bottleneck." 2026. https://sfailabs.com/guides/how-to-manage-context-when-developing-with-ai
21. Agent Factory. "Context Lifecycle: Knowing When to Reset vs Compress." 2026. https://agentfactory.panaversity.org/docs/General-Agents-Foundations/context-engineering/context-lifecycle
22. prodmoh. "Checklist for Reviewing LLM-Generated PRs (Deep Technical Guide)." 2026. https://prodmoh.com/blog/checklist-for-reviewing-llm-generated-prs
23. Cursor. "Best practices for coding with agents." 2026. https://cursor.com/docs/cookbook/agent-workflows
