# Frontend And UX Flows

## Overview

The frontend provides:

- A public landing page
- Authenticated organization workspace routes
- Organization settings and invitation acceptance flows

## Routes

- `/`
- `/reset-password`
- `/accept-invitation/[invitationId]`
- `/o/[orgSlug]`
- `/o/[orgSlug]/settings`

## Shared Components

- `components/site-header.tsx`
- `components/organization-switcher.tsx`
- `components/organization-create-dialog.tsx`
- `components/organization-workspace.tsx`
- `components/organization/organization-shell-hero.tsx`
- `components/organization-settings.tsx`

## UX Flow Summary

1. A signed-in user hitting `/` is redirected into their active Better Auth organization, which represents the most recently visited workspace in the current session.
2. A signed-in user without an active org yet falls back to their first available org membership, which is then promoted into the active session state.
3. Users create or switch workspaces from the header org switcher.
4. Workspace routes load the organization identified by the URL slug.
5. Workspace switches update Better Auth active organization state before navigation so route and session context stay aligned.
6. The workspace page lets authorized members create dashboards and open a share dialog scoped to current org members.
7. The settings page lets authorized admins update general settings, invite users, cancel or resend invitations, and update member roles.
8. Invitation recipients finish onboarding through `/accept-invitation/[invitationId]`.

## Delta: 2026-04-05 - Org layout shell

- What changed: `app/o/[orgSlug]/layout.tsx` owns `SiteHeader`, the centered workspace container, and org validation via `requireOrganizationPageData`. Workspace and settings pages render only their feature bodies; `loading.tsx` / `error.tsx` / `not-found.tsx` no longer duplicate the header.
- Why: One shell for all `/o/[orgSlug]/*` routes so the header persists across workspace ↔ settings navigation and loading/error UI stays in the content slot.
- Impact: Org guard runs in the layout; pages still call `requireOrganizationPageData` for typed props (overlaps with layout via the same server function and cached auth/org reads in `lib/auth-session.ts`).
- Entry points: `app/o/[orgSlug]/layout.tsx`, `lib/organization-server.ts` (`requireOrganizationPageData`), `app/o/[orgSlug]/page.tsx`, `app/o/[orgSlug]/settings/page.tsx`, `app/o/[orgSlug]/loading.tsx`, `app/o/[orgSlug]/error.tsx`, `app/o/[orgSlug]/not-found.tsx`.

## UX Guardrails

- Organization settings are customer-facing and org-scoped, not platform-global.
- Sharing flows only target members of the current organization.
- The route slug remains the visible workspace selector, even though active organization state is also kept in session.
