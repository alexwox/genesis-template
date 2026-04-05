---
name: product-craft
description: Make a digital product feel professionally crafted. Encodes the brand-agnostic implementation knowledge that separates polished SaaS products from amateur ones — spacing systems, animation, shadows, typography, color, component states, micro-interactions, and invisible polish details. Routes to build (new design system setup), audit (polish an existing product), or deep-dive (specific domain guidance). Procedural, not declarative — every section has fill-in-the-blank fields, decision rules, worked examples from Linear/Vercel/Stripe, and near-miss counter-examples. Anchored on 4 deep-research files with 60+ sources and exact CSS/Tailwind/React values.
last-reviewed: 2026-04-04
---

# Product Craft

## Purpose

Encode the implementation-level craft knowledge that makes a digital product feel professionally built. This skill is brand-agnostic — it covers HOW to implement well, not WHAT values to choose. For brand-specific value decisions (your blue, your font, your easing curve), defer to `brand-guide-creation`.

The output is implementation guidance: filled-in design system specs, audit reports with prioritized fixes, or domain-specific code-level answers.

Slash commands: `/product-craft`, `/polish`

---

## Trigger

Apply this skill when the user asks things like:

- "Make this feel polished / professional / like Linear"
- "Set up a design system for my project"
- "How should I handle animations / spacing / shadows / loading states?"
- "Audit my product's design quality"
- "Why does my app feel amateur?"
- "What's the right border radius / shadow / transition for this?"
- "Review the craft quality of this page"

Do NOT apply when the user is defining brand identity, positioning, or messaging — that is `brand-guide-creation`.

---

## Read First

Anchor on these research files before giving guidance. They contain exact values, CSS/Tailwind code, and production examples.

1. `outputs/research/spacing-layout-visual-rhythm.md` — 4px grid, spacing scale, component padding, layout dimensions, responsive strategy
2. `outputs/research/animation-motion-design-specifications.md` — duration tiers, easing curves, entry/exit patterns, spring parameters, GPU performance
3. `outputs/research/shadows-typography-color-specifications.md` — multi-layer shadows, type scale, line-height, font weight, color palettes, dark mode
4. `outputs/research/micro-interactions-feedback-polish.md` — button/input states, toasts, tooltips, dropdowns, skeletons, empty states, command palette
5. `outputs/research/confirmation-pages-celebration-ux.md` — celebration UX patterns, confetti implementation spec, success states, when NOT to celebrate, accessibility
6. `outputs/research/product-design-engineering-craft.md` — index document, 10 principles, quick-reference card, audit checklist

---

## Step 1 — Collect Inputs

Before routing, gather:

| Input | Why It Matters | Default |
|---|---|---|
| Existing product or greenfield? | Routes to `build` vs `audit` | Ask |
| Brand guide exists? | Determines whether to defer value decisions | Assume no |
| Tech stack | Tailwind? CSS modules? Styled-components? React? | Assume Tailwind + React + Next.js |
| Component library | shadcn/ui? Radix primitives? Custom? | Assume shadcn/ui + TweakCN for brand adaptation |
| Primary design target | Dark mode or light mode first? | Light mode |
| Density preference | Compact (Linear-style 13px body) or comfortable (16px body)? | Comfortable |
| Specific domain question? | Routes to `deep-dive` if yes | No |

If the user asks about a specific domain ("how should I think about animations?"), skip to `deep-dive`. Otherwise, classify as `build` or `audit`.

---

## Step 2 — Route

```
IF user asks about a specific domain (animation, spacing, shadows, etc.):
  → deep-dive: go directly to that domain's procedure
ELIF the product does not exist yet or has no design system:
  → build: walk through all 7 domains in order, filling in the spec
ELIF the product exists and needs polish:
  → audit: run the checklist, identify gaps, prioritize fixes
```

### Route: build

Walk through all 7 domains in order. For each domain:

1. Present the fill-in-the-blank procedure
2. Help the user fill in values (use defaults if they have no preference)
3. Produce the CSS/Tailwind tokens for that domain
4. Move to the next domain

Output: a complete design token file (CSS custom properties or Tailwind config) plus a component state specification.

### Route: audit

For an existing product:

1. Run the audit checklist (Step 4) against the product
2. Score each domain as Pass / Partial / Fail
3. For each Fail or Partial, cite the specific gap and the fix from the domain procedure
4. Prioritize fixes by impact: animation timing and component states first (users feel these most), then spacing consistency, then shadows/color refinement

Output: an audit report with scored checklist, prioritized fix list, and code-level fixes.

### Route: deep-dive

When the user asks about one domain:

1. Go to that domain's procedure below
2. Present the full procedure with fill-in-the-blank, decision rules, worked example, and anti-pattern
3. Read the anchored research file for exact values, code snippets, and production examples
4. Answer the specific question with implementable code

Output: domain-specific guidance with code.

---

## Step 3 — Domain Procedures

Each domain follows the same structure: procedure (fill-in-the-blank), decision rules, worked example, near-miss counter-example, anti-pattern, and reference pointer.

---

### Domain 1: Spacing

**Before defining layout, fill in:**

| Field | Your Value |
|---|---|
| Base unit | ___ (4px or 8px) |
| Primary scale stops | ___ (list the 8-12 values your system uses) |
| Button height (default) | ___ px |
| Button padding (default) | ___ vertical × ___ horizontal |
| Input height (default) | ___ px |
| Card padding | ___ px |
| Modal padding | ___ px |
| Label → input gap | ___ px |
| Field → field gap | ___ px |
| Section → section gap | ___ px |
| Content max-width (app) | ___ px |
| Content max-width (prose) | ___ px |
| Sidebar width (expanded) | ___ px |
| Sidebar width (collapsed) | ___ px |
| Header height | ___ px |

**Decision rules:**

- All values must be multiples of the base unit. No 5px, 7px, 13px anywhere.
- The scale must have tighter increments at small sizes (every 4px from 0-16px) and wider jumps at large sizes (every 16-32px from 48px+).
- Use CSS `gap` on flex/grid containers, not margins on children.
- Proximity ratio: space between groups must be at least 2x the space within groups.
- Responsive strategy: step down 1-2 stops on the scale per breakpoint, don't scale linearly. Use `clamp()` for fluid interpolation.

**Worked example — Linear:**

| Field | Value |
|---|---|
| Base unit | 4px |
| Primary scale | 4, 8, 12, 16, 24, 32, 48, 64 |
| Button height | 36px (`h-9`) |
| Button padding | 8px × 16px (`py-2 px-4`) |
| Input height | 36-40px (`h-9` to `h-10`) |
| Card padding | 24px (`p-6`) |
| Modal padding | 24px (`p-6`) |
| Label → input gap | 6-8px (`gap-1.5` to `gap-2`) |
| Field → field gap | 12-16px (`gap-3` to `gap-4`) |
| Section → section gap | 32-48px (`gap-8` to `gap-12`) |
| Content max-width (app) | No max — fills viewport |
| Content max-width (prose) | 672px (`max-w-2xl`) |
| Sidebar width | 220px |
| Sidebar collapsed | 48px |
| Header height | 48px (`h-12`) |

**Near-miss counter-example:**
A product uses a proper 4px base grid and consistent spacing within components. Cards have `p-6`, buttons have correct padding, inputs are well-sized. But the gaps between form field groups and section gaps are both 16px — same value. The form looks like a wall of fields with no visual grouping. Users can't scan the form structure because related fields don't cluster. Fix: field-to-field gap stays at 16px, but group-to-group gap increases to 32px, creating a 2:1 proximity ratio that makes groups visually distinct.

**Anti-pattern:** Uniform spacing everywhere. When every gap is `gap-4`, nothing is grouped and nothing is separated. The page reads as a flat list regardless of content hierarchy.

**Reference:** `outputs/research/spacing-layout-visual-rhythm.md` — full component padding tables, production design system comparisons (Radix, Carbon, Atlassian, Material), Tailwind configs, responsive `clamp()` formulas.

---

### Domain 2: Typography

**Before choosing fonts and sizes, fill in:**

| Field | Your Value |
|---|---|
| Body font | ___ |
| Mono font | ___ |
| Body size | ___ px |
| Body line-height | ___ (unitless) |
| Body max-width | ___ ch |
| Heading sizes (H1/H2/H3) | ___ / ___ / ___ px |
| Heading line-height | ___ (unitless) |
| Heading letter-spacing | ___ em |
| Weight for body text | ___ |
| Weight for labels/nav | ___ |
| Weight for subheadings | ___ |
| Weight for titles | ___ |
| Uppercase label letter-spacing | ___ em |

**Decision rules:**

- Line-height decreases as font size increases: 1.5 for body (14-16px) → 1.3 for subheadings (18-24px) → 1.1 for display (36px+).
- Always use unitless line-height values — they inherit as multipliers, not computed values.
- Use exactly 3-4 weights: 400 (body), 500 (labels), 600 (subheadings/buttons), 700 (titles). More creates noise.
- Large headings (30px+) need negative letter-spacing (-0.02em to -0.025em). Uppercase labels need positive tracking (+0.05em to +0.1em). Body text: 0.
- Body max-width: 60-75ch. Wider makes lines hard to scan. Narrower wastes space.
- Font stacks must include system fallbacks to prevent flash-of-unstyled-text.

**Worked example — Linear:**

| Field | Value |
|---|---|
| Body font | Inter |
| Mono font | JetBrains Mono |
| Body size | 13px (dense) |
| Body line-height | 1.4-1.5 |
| Body max-width | 65ch |
| H1 / H2 / H3 | 24px / 20px / 16px |
| Heading line-height | 1.25 |
| Heading letter-spacing | -0.02em (`tracking-tight`) |
| Weights | 400 (body), 500 (labels), 600 (subheadings), 700 (titles) |
| Uppercase label tracking | 0.08em |

**Near-miss counter-example:**
A product picks Instrument Serif for headings and Inter for body — a distinctive, well-chosen pairing that passes the brand uniqueness test. Font sizes, weights, and heading hierarchy are all correctly defined. But the guide doesn't specify `max-width` for body text or adjust line-height below the framework default of 1.5. On desktop, body paragraphs stretch to 120+ characters per line, making long-form content (docs, blog, settings descriptions) exhausting to read. The typography looks professional in hero sections but breaks in any context with more than two sentences. Fix: add `max-width: 65ch` and set line-height to 1.6 for reading-heavy contexts.

**Anti-pattern:** Using more than 4 font weights. When you use 300, 400, 500, 600, 700 all on one page, the hierarchy becomes muddy — nothing stands out because everything has slightly different emphasis.

**Reference:** `outputs/research/shadows-typography-color-specifications.md` (Findings 7-12) — full type scale, line-height sliding scale, weight system, letter-spacing rules, Inter vs Geist comparison, text color hierarchy.

---

### Domain 3: Color

**Before choosing colors, fill in:**

| Field | Your Value |
|---|---|
| Action color (CTAs only) | ___ hex |
| Background (primary) | ___ hex |
| Background (secondary) | ___ hex |
| Background (tertiary) | ___ hex |
| Text primary opacity | ___ % of base |
| Text secondary opacity | ___ % of base |
| Text tertiary opacity | ___ % of base |
| Text disabled opacity | ___ % of base |
| Border default opacity | ___ % of base |
| Success / Warning / Error / Info | ___ / ___ / ___ / ___ hex |
| Dark mode: primary target or override? | ___ |

**Decision rules:**

- **60-30-10**: 60% neutral (background), 30% structure (nav, borders, cards), 10% accent (CTAs and active states ONLY). If the action color appears on non-interactive elements, it stops drawing attention to CTAs.
- Use opacity-based text tiers (not separate hex values per tier) so they adapt to background changes automatically: 90% / 60% / 40% / 25% for primary / secondary / tertiary / disabled.
- Border colors: 6-8% opacity of the text base color. Use `rgb(0 0 0 / 0.08)` in light mode, `rgb(255 255 255 / 0.08)` in dark mode.
- Every text-on-background pairing must meet WCAG AA (4.5:1 for body, 3:1 for large text).
- Dark mode is NOT inversion. Remap independently: lighter surfaces = higher elevation (4% lightness increments), desaturate accent colors 15-25%, never use pure black (#000) or pure white (#FFF).

**Worked example — professional B2B SaaS:**

| Field | Value |
|---|---|
| Action color | `#4F46E5` (indigo-600) — buttons, links only |
| Background (primary) | `#FFFFFF` |
| Background (secondary) | `#F9FAFB` (gray-50) |
| Background (tertiary) | `#F3F4F6` (gray-100) |
| Text primary | `rgb(0 0 0 / 0.9)` |
| Text secondary | `rgb(0 0 0 / 0.6)` |
| Text tertiary | `rgb(0 0 0 / 0.4)` |
| Text disabled | `rgb(0 0 0 / 0.25)` |
| Border | `rgb(0 0 0 / 0.08)` |
| Semantic | `#10B981` / `#F59E0B` / `#EF4444` / `#3B82F6` |
| Dark mode | Override (light-first) |

**Near-miss counter-example:**
A brand picks a strong, distinctive action color (deep teal) with warm gray neutrals and proper dark mode surfaces. The palette is well-designed and passes contrast checks. But the guide doesn't restrict the action color to interactive elements — designers use teal for section backgrounds, decorative borders, and icon fills. Within three months, CTAs no longer stand out on any page because teal is everywhere. Pricing page conversion drops 18% and nobody connects it to the color drift. Fix: add the explicit constraint "action color appears ONLY on clickable elements" and list specific misuse examples.

**Anti-pattern:** Using `border-gray-300` instead of `border-gray-200`. The 300 weight is visually heavy and makes every card and input feel bordered/boxed. The 200 weight is subtle enough to separate without dominating. Linear recently softened all their borders for exactly this reason.

**Reference:** `outputs/research/shadows-typography-color-specifications.md` (Findings 13-16) — Radix 12-step vs Tailwind 11-step palette construction, semantic state colors with exact hex values, dark mode remapping strategy, 60-30-10 with production examples.

---

### Domain 4: Shadows and Surfaces

**Before defining elevation, fill in:**

| Field | Your Value |
|---|---|
| Shadow color variable | hsl(___ deg ___ % ___ %) |
| Level 0 (base): shadow | ___ |
| Level 1 (resting cards): shadow | ___ |
| Level 2 (sticky headers): shadow | ___ |
| Level 3 (dropdowns): shadow | ___ |
| Level 4 (modals): shadow | ___ |
| Dark mode surface-0 (base) | ___ hex, lightness ___ % |
| Dark mode surface-1 (sidebar) | ___ hex, lightness ___ % |
| Dark mode surface-2 (cards) | ___ hex, lightness ___ % |
| Dark mode surface-3 (dropdowns) | ___ hex, lightness ___ % |
| Dark mode surface-4 (modals) | ___ hex, lightness ___ % |

**Decision rules:**

- Every shadow must use multiple comma-separated layers with progressively larger offsets and blur radii. Blur radius doubles with each layer. Never use a single-layer shadow — it looks flat.
- Never use pure black (`rgba(0,0,0,...)`) for shadows. Use a `--shadow-color` variable in HSL so shadows adapt when the background changes.
- **Shadows = floating above.** Use for dropdowns, modals, popovers, sticky headers. **Borders = adjacent separation.** Use for cards in a grid, input fields, table cells. **Both together** for maximum emphasis on transient elements (popovers, command palette).
- In dark mode, shadows are nearly invisible. Replace shadow-based elevation with surface lightness tiers: each level is ~4% lighter (10% → 14% → 18% → 22% → 26%).
- Shadow direction: vertical offset ~2x horizontal (e.g., `x:1px, y:2px`). Keep consistent across the page.

**Worked example — light mode with layered shadows:**

```css
--shadow-color: 220deg 3% 15%;
--shadow-xs:  0 1px 2px hsl(var(--shadow-color) / 0.15);
--shadow-sm:  0.5px 1px 1px hsl(var(--shadow-color) / 0.36);
--shadow-md:  1px 2px 2px hsl(var(--shadow-color) / 0.2),
              2px 4px 4px hsl(var(--shadow-color) / 0.2),
              3px 6px 6px hsl(var(--shadow-color) / 0.2);
--shadow-lg:  1px 2px 2px hsl(var(--shadow-color) / 0.13),
              2px 4px 4px hsl(var(--shadow-color) / 0.13),
              4px 8px 8px hsl(var(--shadow-color) / 0.13),
              8px 16px 16px hsl(var(--shadow-color) / 0.13);
```

**Near-miss counter-example:**
A product defines a correct 5-level shadow scale with properly layered values, tinted shadow colors, and consistent direction. Cards use `shadow-sm`, dropdowns use `shadow-lg`, modals use `shadow-xl`. But in dark mode, the same shadow values are applied unchanged. Since dark shadows on dark backgrounds are invisible, the dropdown and modal appear to float at the same level as the card beneath them — there's no depth hierarchy. Users click through modals because they can't distinguish the overlay from the background. Fix: in dark mode, swap shadow-based elevation for surface lightness tiers where each level is 4% lighter.

**Anti-pattern:** Using `shadow-md` on cards. It's the uncanny valley of shadow — too heavy for resting state, too light for floating. Use `shadow-xs` or `shadow-sm` for resting cards, `shadow-lg` for floating elements. Skip `shadow-md` for most use cases.

**Reference:** `outputs/research/shadows-typography-color-specifications.md` (Findings 1-6) — three-layer shadow formula, Josh Comeau methodology, Tailwind defaults, elevation mapping, dark mode surface tiers, Material Design comparison.

---

### Domain 5: Animation and Motion

**Before defining motion, fill in:**

| Field | Your Value |
|---|---|
| Easing (entrance) | cubic-bezier(___) |
| Easing (exit) | cubic-bezier(___) |
| Easing (snap/toggle) | cubic-bezier(___) |
| Easing (overshoot/announce) | cubic-bezier(___) |
| Duration: micro-interaction | ___ ms |
| Duration: standard transition | ___ ms |
| Duration: complex/page | ___ ms |
| Entry animation (default) | ___ |
| Entry slide distance | ___ px |
| Exit animation (default) | ___ |
| Spring (toggle): stiffness / damping | ___ / ___ |
| Spring (modal): stiffness / damping | ___ / ___ |

**Decision rules:**

- **When to animate:** Only for feedback (confirming action), guidance (directing attention), continuity (showing spatial relationship), or status (loading/success/failure). If motion doesn't serve one of these, make it instant (`duration: 0`).
- **Entrances use ease-out. Exits use ease-in.** Never the same curve for both. Exits are faster than entrances (150ms in, 100ms out).
- **Animate only `transform` and `opacity`.** These run on the GPU compositor (~0ms per frame). Width, height, margin, padding trigger layout recalculation (5-10ms per frame) and kill 120Hz.
- **Duration tiers:** Micro 100-200ms (button press, toggle). Standard 200-300ms (dropdown, hover). Complex 300-400ms (modal, page transition). Nothing over 600ms in product UI.
- **Springs for spatial properties on interactive elements** (toggles, drag-and-drop, modals). CSS transitions for color, opacity, and simple hovers. Spring-animate border-radius or box-shadow: they jitter or are imperceptible.
- **Scroll animations:** Appropriate for landing/marketing pages only. Never in app UI (dashboards, settings, forms). Use Intersection Observer with `once: true`. Trigger 80-100px before element enters viewport.
- **Always respect `prefers-reduced-motion`.** Remove spatial animations, keep opacity fades.

**Worked example — Linear-caliber motion tokens:**

| Field | Value |
|---|---|
| Ease enter | `cubic-bezier(0, 0, 0.2, 1)` |
| Ease exit | `cubic-bezier(0.4, 0, 1, 1)` |
| Ease snap | `cubic-bezier(0.12, 0, 0.08, 1)` |
| Ease overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Micro | 150ms |
| Standard | 200ms |
| Complex | 300ms |
| Default entrance | fade + translateY(10px), 200ms ease-out |
| Default exit | fade + translateY(-10px), 150ms ease-in |
| Spring (toggle) | stiffness 500, damping 25 |
| Spring (modal) | stiffness 300, damping 24 |

**Near-miss counter-example:**
A product defines a proper easing vocabulary with distinct curves for enter/exit/snap. Duration tiers are correct. Entry animations use fade+slide. The motion system looks complete. But the active/press state on buttons uses `scale(0.95)` — too aggressive. Every button click looks cartoonish, like a mobile game. The product feels playful when it should feel precise. Fix: `scale(0.97)` is the sweet spot — barely perceptible but enough to create a tactile "press" sensation. `0.98` is too subtle (users don't notice), `0.95` is too dramatic (looks like a toy).

**Anti-pattern:** Fade-in as the only animation, applied identically to every element on page load. Professional products vary motion by element type: cards lift on hover, lists stagger on reveal, panels slide from their origin direction, modals scale up from 0.95.

**Reference:** `outputs/research/animation-motion-design-specifications.md` — full easing curve table with cubic-bezier values, entry/exit pattern specs, spring parameter cheat sheet for 10 component types, GPU compositing guide, `linear()` CSS springs, production examples from Linear/Stripe/Vercel/Raycast.

---

### Domain 6: Component States and Micro-interactions

**Before building components, fill in the state matrix:**

Every interactive element needs 6 states. For each component, specify what changes in each state.

| State | Button | Input | Toggle |
|---|---|---|---|
| Default | bg: ___, text: ___ | border: ___, bg: ___ | bg: ___, knob: ___ |
| Hover | bg change: ___, translateY: ___ | border: ___ | — |
| Active/Pressed | scale: ___, bg: ___, duration: ___ | — | — |
| Focus | ring: ___, offset: ___, color: ___ | ring: ___, border: ___, glow: ___ | ring: ___, offset: ___ |
| Disabled | opacity: ___, cursor: ___ | opacity: ___, cursor: ___, bg: ___ | opacity: ___, cursor: ___ |
| Loading | spinner: ___, width: ___ | — | — |

**Decision rules:**

- Use `:focus-visible` (not `:focus`) so rings appear only for keyboard users, never on mouse click.
- Button hover: darken background 8-10%, 150ms ease-out. Button press: `scale(0.97)`, 100ms. These are non-negotiable feel signals.
- Input focus: border color changes to brand + soft glow ring at 20% opacity (`ring-blue-500/20`). The low-opacity ring is the difference between "form field" and "premium form field."
- Toggle easing: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — values > 1.0 create the slight overshoot that makes it feel physical.
- Disabled: `opacity-50` + `cursor-not-allowed` + `pointer-events-none`. Never a separate "disabled" color.
- Loading: swap label for spinner, keep button width stable. Never resize the button during loading.

**Additional component rules:**

| Component | Key Specification |
|---|---|
| Toast | Bottom-right, 5s success / 8s error, max 3 visible, pause-on-hover. Use Sonner. |
| Tooltip | 400ms delay before show, 150ms enter, max-w-[240px], Radix. `skipDelayDuration` for consecutive. |
| Dropdown | Scale from 0.95, 150ms ease-out, stagger 30-50ms (max 6-8 items). Exits faster than enters. |
| Skeleton | Shimmer 1.5s cycle, `background-size: 200%`, sync with `background-attachment: fixed`. |
| Empty state | Centered, icon + headline + description + CTA. CTA creates first item. |
| Success state (inline) | Use toast pattern with success variant (green checkmark + message). For confirming routine actions (saved, sent, updated). |
| Success state (page-level) | Centered layout: checkmark animation (scale 0→1 with overshoot, 400ms) + headline + "what happens next" body + single CTA. For milestone completions (deployment, first sale, onboarding complete). |
| Confetti | `canvas-confetti` library (6kB, zero deps). 100–150 particles, spread 70–90, gravity 0.8–1.2, ticks 150–200 (~2.5–3.3s). Set `disableForReducedMotion: true`. Use brand colors (3–4 hex). Only for major milestones after significant user effort — never for routine actions, account creation, or intermediate steps. |

**Success checkmark animation spec:**

The checkmark animation creates a micro-satisfaction response that a static icon cannot. Two-phase sequence: background scales in (200ms), then check path draws (400ms with 200ms delay).

```css
.success-check {
  transform: scale(0);
  animation: checkScale 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes checkScale {
  0% { transform: scale(0); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.success-check path {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: checkDraw 400ms cubic-bezier(0.65, 0, 0.45, 1) 200ms forwards;
}
@keyframes checkDraw {
  to { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .success-check { animation: none; transform: scale(1); }
  .success-check path { animation: none; stroke-dashoffset: 0; }
}
```

The overshoot easing `cubic-bezier(0.34, 1.56, 0.64, 1)` creates a subtle bounce. The stroke-dasharray path-drawing technique creates a "writing" effect. `prefers-reduced-motion` fallback shows the final state immediately without animation.

**Celebration decision rule:** Before adding confetti or a major success animation, answer: "This celebration marks ___. The user's actual goal was ___. Are these the same?" If not, use a clean confirmation instead. Confetti on trivial actions (account creation, email verification) feels cheap and contradicts the user's actual goal. Confetti after a genuine milestone (first deployment, first sale, completing a multi-step workflow) amplifies the peak-trust moment.

**Worked example — button state system (Tailwind):**

```
Base:       bg-blue-600 text-white transition-all duration-150 ease-out
Hover:      hover:bg-blue-700
Active:     active:scale-[0.97] active:bg-blue-800
Focus:      focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
Disabled:   disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
Loading:    swap children for <Loader2 className="h-4 w-4 animate-spin" />
```

**Near-miss counter-example:**
A product implements all 6 button states correctly: hover darkens, press scales, focus shows a ring, disabled dims, loading shows a spinner. The button feels great. But the input fields only have default and focus states — no hover (border doesn't change), no error state (just a red text message below with no border change), no disabled styling. The buttons feel premium but the forms feel flat. Users subconsciously register the inconsistency as "unfinished." Fix: inputs need the same 6-state discipline as buttons — hover changes border to gray-400, focus adds border-blue-500 + ring-blue-500/20 glow, error adds border-red-500 + ring-red-500/20, disabled adds bg-gray-50 + opacity-60.

**Anti-pattern:** Using `:focus` instead of `:focus-visible`. Every mouse click shows a focus ring, which makes the UI feel janky and causes designers to remove focus rings entirely — breaking keyboard accessibility.

**Reference:** `outputs/research/micro-interactions-feedback-polish.md` — full button/input state systems with Tailwind classes, toggle bounce animation, checkbox SVG drawing, toast/Sonner setup, tooltip/Radix configuration, dropdown stagger with keyboard nav, skeleton shimmer CSS, optimistic update patterns.

---

### Domain 7: Polish and Invisible Details

These are the details that individually seem trivial but collectively create the "this feels different" reaction.

**Checklist of polish details to implement:**

| Detail | Specification | Tailwind/CSS |
|---|---|---|
| Border radius hierarchy | badges 4px, buttons/inputs 6px, cards 8px, modals 12px, avatars full | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full` |
| Nested radius correction | Inner radius = outer radius - padding | If card is `rounded-lg` (8px) with `p-4`, inner button should be `rounded-md` (6px) |
| Scrollbar styling | 6px thin, show on hover, neutral gray | `scrollbar-width: thin; scrollbar-color: hsl(0 0% 75%) transparent;` |
| Text selection | Brand color at 25% opacity | `::selection { background: hsl(brand / 0.25); color: inherit; }` |
| Sidebar item selection | bg-blue-50 + left border accent | `border-l-2 border-blue-500 bg-blue-50` (with padding correction for border width) |
| Command palette | Cmd+K, positioned at top-[20%], cmdk library | `<Command.Dialog>` from `cmdk` |
| Keyboard shortcut hints | Right-aligned in menu items | `<kbd>` element, `text-[10px] font-mono border` |
| Cursor affordances | pointer (clickable), grab/grabbing (draggable), not-allowed (disabled) | `cursor-pointer`, `cursor-grab active:cursor-grabbing`, `cursor-not-allowed` |
| Error handling | Validate on blur, clear on fix | `onBlur` validation, re-validate on keystroke after `touched` |
| Progress indicators | < 300ms: nothing. 300ms-4s: skeleton/spinner. > 4s: progress bar | Delay showing any loading state by 300ms |
| Optimistic updates | For toggles, status changes, reordering. NOT for destructive or financial actions | TanStack Query `onMutate`/`onError`/`onSettled` pattern |
| Prefetch on hover | Start fetching before click | `onMouseEnter={() => router.prefetch(href)}` |
| Success checkmark | Scale 0→1 with overshoot easing + SVG path draw for checkmark. For confirming completions. | `cubic-bezier(0.34, 1.56, 0.64, 1)` + `stroke-dasharray` technique |
| Confetti (milestone only) | `canvas-confetti`, 100–150 particles, 2–3s, brand colors. Only on major milestones after genuine user effort. Never on routine actions. | `disableForReducedMotion: true` always set |
| Success sound | Optional, high-stakes completions only (payment, deployment). Muted by default, opt-in. Under 0.5s, low-mid frequency, 30–50% volume. | `AudioContext` API, preload on enable |

**Decision rules:**

- Larger container → larger border radius. Never use arbitrary values (7px, 13px).
- `box-shadow` (Tailwind `ring`) follows border-radius. CSS `outline` does not. Use `ring` for rounded focus indicators.
- Validate forms on blur (22% higher completion vs on-submit). But after the field is touched, re-validate on keystroke so errors clear immediately when fixed.
- Performance thresholds: 0-100ms = instant. 100-300ms = fast. 300-1000ms = show placeholder. 1000ms+ = show progress. Every 100ms improvement measurably impacts conversion.

**Near-miss counter-example:**
A product implements all the visible polish: consistent radius, proper scrollbars, branded text selection, command palette with Cmd+K. It looks and feels professional. But every navigation click shows a full-page spinner for 400ms because the developer didn't add prefetch-on-hover to links. Users navigate 50 times per session; 50 × 400ms = 20 seconds of cumulative spinner time. The product feels slow despite looking polished. Fix: add `prefetch={true}` or `onMouseEnter` prefetch to navigation links — the 200-400ms hover-to-click window is enough to preload most pages.

**Anti-pattern:** Hiding scrollbars entirely with `overflow: hidden` or `scrollbar-width: none`. Users need to know content is scrollable. Use thin, overlay-style scrollbars that appear on hover — not invisible scrollbars.

**Reference:** `outputs/research/micro-interactions-feedback-polish.md` (Findings 12-22) — border radius hierarchy, focus ring accessibility, cursor mapping, scrollbar CSS, text selection, empty state templates, inline validation patterns, command palette implementation with cmdk, sound design, the "100 small things" checklist, performance thresholds.

---

## Step 4 — Audit Checklist

Run this checklist against any product. Score each item Pass / Partial / Fail. Prioritize fixes by impact tier.

### Tier 1: Highest impact (users feel these immediately)

- [ ] All transitions are 150-200ms ease-out (never > 300ms for UI elements)
- [ ] Button active/press state uses `scale(0.97)` + 100ms
- [ ] `:focus-visible` ring on all interactive elements (test with Tab key)
- [ ] Loading: skeleton for layout-known content, thin top bar for navigation
- [ ] Optimistic updates for toggles, status changes, and reordering
- [ ] Prefetch-on-hover for navigation links

### Tier 2: High impact (users notice inconsistency)

- [ ] All spacing values are multiples of 4
- [ ] Proximity ratio ≥ 2:1 (space between groups ≥ 2x space within groups)
- [ ] Button/input/toggle all have 6 states (default, hover, active, focus, disabled, loading)
- [ ] Forms validate on blur, clear on fix
- [ ] Toasts: bottom-right, 5s success, 8s error, pause-on-hover
- [ ] Empty states have icon + headline + description + CTA

### Tier 3: Medium impact (separates good from great)

- [ ] Shadow system uses multiple layers with `--shadow-color` variable
- [ ] Border radius follows hierarchy (4 → 6 → 8 → 12 → full)
- [ ] Text uses 4-tier opacity hierarchy (90/60/40/25)
- [ ] Borders are gray-200 weight, not gray-300
- [ ] Dark mode uses surface lightness tiers, not inverted shadows
- [ ] Cmd+K command palette exists
- [ ] Success states use animated checkmark (scale + path draw), not static icon
- [ ] Confetti reserved for major milestones only (not routine actions or account creation)

### Tier 4: Finishing touches

- [ ] Scrollbars are thin, show on hover
- [ ] Text selection is branded (`::selection`)
- [ ] `prefers-reduced-motion` is respected (including confetti/celebration animations)
- [ ] Keyboard shortcuts shown in menu items
- [ ] Disabled state = opacity-50 + cursor-not-allowed everywhere
- [ ] Hover backgrounds are gray-50 or gray-100 (not visible colored backgrounds)
- [ ] Success sound on high-stakes completions only, muted by default

---

## Step 5 — Quality Gates

Do not finalize any design system or audit until:

- [ ] Every spacing value is a multiple of the base unit (no magic numbers)
- [ ] Every interactive element has all 6 states specified
- [ ] At least one easing curve, duration tier, and entry/exit pattern are defined
- [ ] Shadow system has 3+ levels with multi-layer values
- [ ] Typography has a complete scale with grid-aligned line-heights
- [ ] Color system has action, structural, surface, and semantic roles defined
- [ ] Dark mode has independent surface tiers (not just inverted light mode)
- [ ] The audit checklist has been run with no Tier 1 failures

---

## Anti-Patterns

Avoid these — they are the specific things that make products feel amateur:

| Anti-Pattern | What It Looks Like | Fix |
|---|---|---|
| Uniform spacing | Every gap is `gap-4`, nothing grouped or separated | Use 3+ spacing tiers with 2:1 proximity ratio |
| Single-layer shadows | `box-shadow: 0 4px 8px rgba(0,0,0,0.1)` — flat, blurry gray | Use 3-layer formula: contact + key + fill with doubling blur |
| Pure black shadows | `rgba(0,0,0,0.X)` shadows on colored backgrounds | Use `hsl(var(--shadow-color) / opacity)` with tinted color |
| Fade-in only motion | Every element fades in identically on page load | Vary by type: cards lift, lists stagger, panels slide from origin |
| `:focus` instead of `:focus-visible` | Focus rings on every mouse click | Switch to `:focus-visible` for keyboard-only rings |
| `shadow-md` on cards | Uncanny valley shadow — too heavy for rest, too light for float | `shadow-xs`/`shadow-sm` for resting, `shadow-lg` for floating |
| `border-gray-300` | Heavy borders that make every element feel boxed | `border-gray-200` — subtle separation without domination |
| Animating layout properties | Transitions on width, height, margin, padding | Animate only `transform` and `opacity` (GPU compositor) |
| Full-page spinner | Loading overlay that blocks all content | Skeleton screens, optimistic updates, prefetch-on-hover |
| Missing loading delay | Showing spinner for 50ms loads (flash of loading) | Delay loading indicators by 300ms |
| `scale(0.95)` button press | Cartoonish bounce on every click | `scale(0.97)` — barely perceptible but tactile |
| No `prefers-reduced-motion` | Vestibular-disorder users get motion-sick | Wrap animations in `@media (prefers-reduced-motion: no-preference)` |
| Unstyled shadcn/ui | Default shadcn components with zero brand adaptation = the 2025 "vibe-coded" look | Use [TweakCN](https://tweakcn.com) to restyle shadcn components to your brand tokens before building |
| Confetti on trivial actions | Confetti on account creation, email verification, or minor actions — feels cheap and manufactured | Reserve confetti for major milestones after genuine user effort; use clean confirmation for everything else |
| Celebration in serious contexts | Playful animations in banking, healthcare, insurance — tone-deaf and trust-eroding | Use quiet reassurance: checkmark + clear confirmation text + helpful next action |

---

## Practical Stack Recommendation

**Start with shadcn/ui + TweakCN.** shadcn/ui gives you accessible, well-structured Radix-based components with sensible defaults. TweakCN lets you remap those defaults to your brand's color, radius, spacing, and shadow tokens — so you get the accessibility and keyboard-nav for free while making the visual layer yours.

The workflow:
1. Define your design tokens using the Domain 1-4 procedures above (spacing, typography, color, shadows)
2. Run TweakCN to generate a restyled shadcn/ui theme that matches those tokens
3. Use the Domain 5-7 procedures (animation, states, polish) to add the craft layer on top

This avoids the two failure modes: (a) building everything from scratch (slow, accessibility bugs) and (b) using shadcn/ui unmodified (looks like every other AI-generated product).

---

## Handoff Rules

- If the user needs to define brand identity, positioning, or messaging → defer to `brand-guide-creation`
- If the user needs to choose brand-specific values (which blue, which font, which easing curve) → defer to `brand-guide-creation`'s visual system procedures
- If the user is building a landing page → the `constructing-a-landing-page` skill handles section structure; this skill handles the craft layer
- If the user is building onboarding → `constructing-onboarding` handles flow design; this skill handles component-level polish
- If the user is building a funnel → `constructing-a-funnel` handles conversion architecture; this skill handles implementation quality
- If the user needs exact CSS values, code snippets, or production examples beyond what's in the procedures → read the anchored research files listed in "Read First"

---

## Reference Sources

Research files anchoring this skill (in `outputs/research/`):

| File | Lines | Domain |
|---|---|---|
| `spacing-layout-visual-rhythm.md` | 792 | Spacing, layout, component padding, responsive strategy |
| `animation-motion-design-specifications.md` | 1161 | Motion, easing, springs, entry/exit patterns, GPU performance |
| `shadows-typography-color-specifications.md` | 827 | Shadows, type scale, color palettes, dark mode |
| `micro-interactions-feedback-polish.md` | 1052 | Component states, toasts, tooltips, skeletons, polish details |
| `confirmation-pages-celebration-ux.md` | — | Celebration UX patterns, confetti implementation, success states, when NOT to celebrate |
| `product-design-engineering-craft.md` | — | Index document with 10 principles and quick-reference card |

Primary external sources (selected):

- Material Design 3 — motion tokens, elevation system, spacing
- Apple HIG — motion principles, spring physics
- Radix UI — color system (12-step scale), component primitives
- Tailwind CSS — spacing scale, shadow defaults, responsive breakpoints
- Josh Comeau — layered shadow methodology, `linear()` CSS springs
- Christina Wodtke / Shreyas Doshi — product taste as compressed experience
- Linear — reverse-engineered design system (spacing, motion, typography, surfaces)
- Vercel / Geist — grid system, responsive scaling, design tokens
- Stripe — appearance API, mouse-tracking effects, multiplier-based spacing
