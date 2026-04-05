---
name: architecture-maintainer
description: Maintains Cantor architecture documentation with an index-plus-domain model. Use when code changes affect architecture, data flow, job execution, tools, auth/security, channels, schema, or UX flows.
---

# Architecture Maintainer

Keep Cantor architecture docs consistent without bloating root `architecture.md`.

## Apply This Skill When

- A task changes architecture, execution flow, storage flow, or security boundaries.
- A task adds/removes major feature entry points.
- A task changes DB schema, background jobs, channel routing, or tool capabilities.
- A task changes user-facing flow that affects architecture docs.

## Source Of Truth Model

1. `architecture.md` is a compact index.
2. `docs/architecture/*.md` contains subsystem details.
3. Never duplicate deep implementation detail in both places.

## Update Workflow

1. Identify changed files.
2. Map changed paths to architecture domain docs.
3. Update only impacted domain docs unless cross-cutting invariants changed.
4. If invariants/topology changed, update root `architecture.md`.
5. Add a concise delta block in each changed domain doc.
6. Prefer small, reviewable documentation increments that mirror bite-sized implementation slices instead of bundling multiple new domains into one doc update.

## Path To Domain Mapping

- `src/agent/**`, `src/chat/**`, `src/app/api/chat/**` -> `docs/architecture/chat-and-agent.md`
- `src/agent/tools/**`, `src/agent/execution/**`, `src/app/api/preview/**`, `src/preview-proxy/**` -> `docs/architecture/tools-and-execution.md`
- `src/jobs/**` -> `docs/architecture/jobs-heartbeats-and-scheduling.md`
- `src/channels/**`, `src/app/api/telegram/**` -> `docs/architecture/channels-and-telegram.md`
- `src/webhooks/**`, `src/server/trpc/routers/webhooks.ts`, `src/app/api/webhooks/**` -> `docs/architecture/webhooks.md`
- `src/sessions/**`, `src/server/trpc/routers/sessions.ts` -> `docs/architecture/sessions-and-state.md`
- `src/agent/skills/**`, `src/server/trpc/routers/skills.ts`, `src/server/trpc/routers/skills-installer.ts`, `src/server/trpc/routers/skills-helpers.ts`, `src/app/(chat)/skills/**`, `src/app/admin/skills/**` -> `docs/architecture/skills-and-registry.md`
- `src/auth/**`, `src/server/trpc/context.ts`, `src/server/trpc/index.ts` -> `docs/architecture/auth-and-security.md`
- `src/server/db/**`, `drizzle/**`, `src/uploads/**` -> `docs/architecture/data-model-and-storage.md`
- `src/app/(chat)/**`, `src/components/**`, `src/lib/analytics*` -> `docs/architecture/frontend-and-ux-flows.md`

## Root File Guardrail

Root `architecture.md` should contain only:

- system overview
- cross-cutting invariants
- source map by concern
- links to domain docs
- concise update protocol

Do not append feature deep-dives to root.

## Required Delta Template

Append to impacted domain docs:

```md
## Delta: YYYY-MM-DD - <short title>

- What changed:
- Why:
- Impact:
- Entry points:
```

Keep each delta short and concrete.

## Definition Of Done Checklist

- [ ] Root `architecture.md` remains compact index-style.
- [ ] All touched architecture domains are updated.
- [ ] No duplicate deep-dive content across root and domain docs.
- [ ] Each updated domain doc has a delta block.
- [ ] Links and entry points still resolve correctly.
- [ ] The documentation change is scoped tightly enough that a reviewer can understand the slice in one pass.
