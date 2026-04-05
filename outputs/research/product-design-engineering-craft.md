# Product Design Engineering Craft — Reference Index

> What makes a product feel professionally made: the specific implementation decisions
> for spacing, animation, shadows, typography, color, micro-interactions, and polish.
>
> April 2026. 4 research lanes, 60+ sources, 55 findings with exact implementable values.

---

## How to use this reference

This is an index document. Each domain has its own deep-dive file with exact CSS/Tailwind values,
React code snippets, and production examples from Linear, Vercel, Stripe, and Raycast.

| Domain | File | Key specs |
|---|---|---|
| Spacing & Layout | [spacing-layout-visual-rhythm.md](spacing-layout-visual-rhythm.md) | 4px grid, spacing scale, component padding, layout dimensions, responsive strategy |
| Animation & Motion | [animation-motion-design-specifications.md](animation-motion-design-specifications.md) | Duration guidelines, easing curves, entry/exit patterns, spring parameters, performance |
| Shadows, Typography, Color | [shadows-typography-color-specifications.md](shadows-typography-color-specifications.md) | Shadow scale, type scale, line-height, font weight, color palette, dark mode |
| Micro-interactions & Polish | [micro-interactions-feedback-polish.md](micro-interactions-feedback-polish.md) | Button/input states, toasts, tooltips, skeletons, empty states, command palette |

---

## The 10 principles that separate polished from amateur

1. **Every value is a multiple of 4.** No 5px, 7px, 13px anywhere. The primary scale is 4, 8, 12, 16, 24, 32, 48, 64. This eliminates "magic numbers" and makes everything compose.

2. **Animate only transform and opacity.** These run on the GPU compositor thread (~0ms per frame). Everything else (width, height, margin, padding) triggers layout recalculation (5-10ms per frame) and kills 120Hz.

3. **Entrances and exits are asymmetric.** Entrances: ease-out (fast start, gentle landing), 150-200ms. Exits: ease-in (slow start, fast finish), 100-150ms. Never use the same curve for both.

4. **Shadows use multiple layers, never pure black.** Three layers (contact + key + fill) with doubling blur radii. Tint shadows with `hsl(var(--shadow-color) / opacity)` — override the variable when the background changes.

5. **Typography: 4 sizes for hierarchy, 4 weights for emphasis.** Body 14-16px, subhead 18-20px, title 24px, display 36-48px. Weights: 400 (body), 500 (labels), 600 (subheadings), 700 (titles). Line-height decreases as font size increases.

6. **Color: 60-30-10.** 60% neutral (background), 30% structure (navigation, borders), 10% accent (CTAs and active states only). Maximum 1 brand color + 1 gray ramp + semantic (red/green/amber/blue).

7. **Dark mode is not inversion — it's remapping.** Replace shadow-based elevation with surface lightness tiers (4% increments). Desaturate accent colors 15-25%. Never use pure black (#000) or pure white (#FFF).

8. **Every interactive element needs 6 states.** Default, hover, active/pressed, focus-visible, disabled, loading. Missing any state creates a dead zone where the user gets no signal.

9. **Performance is design.** 0-100ms = instant (no feedback needed). 100-300ms = fast (show transition). 300-1000ms = show skeleton. 1000ms+ = show progress. The single highest-leverage optimization is prefetching on hover.

10. **Consistency beats creativity.** One transition duration. One easing curve. One spacing scale. One shadow system. One color ramp. When every decision follows the same rules, the brain registers "coherent" without conscious analysis.

---

## Quick reference card

```
SPACING (base: 4px)
  Primary scale:    4  8  12  16  24  32  48  64
  Button (md):      h-9 px-4 text-sm (36px tall, 16px horizontal)
  Input (md):       h-10 px-3 text-sm (40px tall, 12px horizontal)
  Card padding:     p-6 (24px)
  Label → input:    gap-1.5 to gap-2 (6-8px)
  Field → field:    gap-3 to gap-4 (12-16px)
  Section gap:      gap-8 to gap-12 (32-48px)
  Sidebar:          256px expanded, 48px collapsed
  Header:           48-56px
  Content max:      1280px (app), 672px (prose)

ANIMATION
  Micro-interaction:  100-200ms  (button press, toggle)
  Standard:           200-300ms  (dropdown, hover)
  Complex:            300-400ms  (modal, page transition)
  Ease-out (enter):   cubic-bezier(0, 0, 0.2, 1)
  Ease-in (exit):     cubic-bezier(0.4, 0, 1, 1)
  Smooth:             cubic-bezier(0.23, 1, 0.32, 1)
  Snap:               cubic-bezier(0.12, 0, 0.08, 1)
  Overshoot:          cubic-bezier(0.34, 1.56, 0.64, 1)
  Spring (toggle):    stiffness 500, damping 25
  Spring (modal):     stiffness 300, damping 24

SHADOWS
  xs (resting):   0 1px 2px rgba(0,0,0,0.05)
  sm (raised):    0.5px 1px 1px hsl(--shadow/0.7)
  md (sticky):    3-layer, blur doubles each layer
  lg (dropdown):  4-layer with 0.13 opacity each
  xl (modal):     5-layer with 0.1 opacity each
  Dark mode:      surface lightness tiers instead (10% → 14% → 18% → 22% → 26%)

TYPOGRAPHY
  Scale:          12  14  16  18  20  24  30  36  48
  Line-height:    1.5 (body) → 1.3 (subhead) → 1.1 (display)
  Weights:        400 (body)  500 (labels)  600 (titles)  700 (hero)
  Letter-spacing: +0.08em (uppercase), -0.025em (large headings), 0 (body)
  Font:           Inter or Geist Sans + Geist Mono for code

COLOR
  Text tiers:     90% / 60% / 40% / 25% opacity of black (light) or white (dark)
  Borders:        6-8% opacity of black (light) or white (dark)
  Accent:         One hue, used only for CTAs and active states
  Semantic:       green-500 / amber-500 / red-500 / blue-500 (with bg/border/text variants)

STATES
  Hover:          150ms ease-out, darken 8-10% OR bg-gray-50
  Active:         scale(0.97), 100ms
  Focus:          ring-2 ring-offset-2 ring-brand-500 (:focus-visible only)
  Disabled:       opacity-50, cursor-not-allowed
  Loading:        swap label for spinner, keep width

COMPONENTS
  Toast:          bottom-right, 5s success, 8s error, max 3 visible, Sonner library
  Tooltip:        400ms delay, 150ms enter, max-w-[240px], Radix
  Dropdown:       scale(0.95→1), 150ms ease-out, stagger 30-50ms, Radix
  Skeleton:       1.5s shimmer cycle, background-size 200%, sync with background-attachment: fixed
  Empty state:    centered, icon + headline + description + CTA
  Command palette: Cmd+K, top-[20%], cmdk library
  Scrollbar:      6px thin, show on hover, scrollbar-width: thin

RADIUS
  Badges/tags:    4px (rounded-sm)
  Buttons/inputs: 6px (rounded-md)
  Cards:          8px (rounded-lg)
  Modals:         12px (rounded-xl)
  Avatars:        rounded-full

PERFORMANCE THRESHOLDS
  < 100ms:   Instant — no feedback needed
  100-300ms: Fast — CSS transition sufficient
  300-1000ms: Show skeleton/placeholder
  1-4s:      Show spinner or thin progress bar
  > 4s:      Determinate progress with percentage
```

---

## The "feel like Linear" checklist

Run through this before shipping any page:

- [ ] All spacing values are multiples of 4
- [ ] Transitions are 150-200ms ease-out (never > 300ms for UI elements)
- [ ] Active/press state uses scale(0.97) + 100ms
- [ ] :focus-visible ring on all interactive elements (test with Tab key)
- [ ] Loading states: skeleton for layout, thin top bar for navigation
- [ ] Optimistic updates for toggles, status changes, and reordering
- [ ] Empty states have icon + headline + description + CTA
- [ ] Toasts use Sonner, bottom-right, auto-dismiss 5s/8s
- [ ] Cmd+K command palette exists
- [ ] Dark mode uses surface lightness tiers, not inverted shadows
- [ ] Text uses 4-tier opacity hierarchy (90/60/40/25)
- [ ] Borders are gray-200 (not gray-300)
- [ ] Hover backgrounds are gray-50 or gray-100
- [ ] Disabled = opacity-50 + cursor-not-allowed
- [ ] Forms validate on blur, clear on fix
- [ ] Scrollbars are thin, show on hover
- [ ] Text selection is branded (::selection with 25% opacity accent)
- [ ] Prefetch-on-hover for navigation links
- [ ] prefers-reduced-motion is respected
- [ ] Keyboard shortcuts shown in menu items
