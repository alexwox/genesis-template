# Spacing, Layout & Visual Rhythm — Implementation Guide

> Practical, code-level specifications for spacing systems, layout grids, and visual rhythm in modern SaaS/web product design. Every value is implementable in Tailwind CSS / React / Next.js.

---

## Finding 1: The 4px Base Grid — The Foundation of Everything

- **The rule**: All spacing values in your system must be multiples of 4px. The primary scale uses 8px increments; the secondary scale fills in 4px gaps where fine-grained control is needed. No value in your UI should ever be a non-multiple of 4 (no 5px, 7px, 13px, 17px).
- **Why it works**: 4 divides cleanly by 2 (for half-values). 8 divides cleanly by 2 and 4 (for quarter-values). Both scale perfectly on retina displays at 1.5x, 2x, and 3x multipliers without triggering subpixel rendering artifacts. The constrained set of options eliminates "magic numbers" and reduces decision fatigue — instead of infinite choices, you pick from ~15 values that always compose well together.
- **Implementation**:

```js
// tailwind.config.js — keep Tailwind's default (already 4px-based)
// Tailwind v3 default: 1 unit = 0.25rem = 4px
// p-1 = 4px, p-2 = 8px, p-3 = 12px, p-4 = 16px, etc.
//
// Tailwind v4: uses --spacing multiplier (default 0.25rem)
// @theme { --spacing: 0.25rem; }
// Every integer utility (p-1, m-2, gap-3) = N × 0.25rem

// If you want named semantic tokens:
module.exports = {
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',  // 18px — rare, only if truly needed
        '13':  '3.25rem',   // 52px
        '15':  '3.75rem',   // 60px
        '18':  '4.5rem',    // 72px
        '22':  '5.5rem',    // 88px
        '30':  '7.5rem',    // 120px
      }
    }
  }
}
```

```css
/* CSS custom properties version */
:root {
  --space-0:   0px;
  --space-0.5: 2px;
  --space-1:   4px;
  --space-1.5: 6px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;
  --space-40:  160px;
}
```

- **Evidence**: [8px Grid Complete Guide](https://educalvolopez.com/en/blog/sistema-de-espaciado-con-grid-8pt-guia-completa), [Material Design 3 spacing](https://m3.material.io/foundations/layout/understanding-layout/spacing), [Tailwind CSS spacing docs](https://tailwindcss.com/docs/customizing-spacing)

---

## Finding 2: The Complete Spacing Scale — When to Use Each Size

- **The rule**: A production-ready spacing scale with semantic meaning for each stop:

| Tailwind | px | rem | Semantic name | When to use |
|---|---|---|---|---|
| `0.5` | 2 | 0.125 | `micro` | Optical adjustments, border offsets |
| `1` | 4 | 0.25 | `xxs` | Icon-to-text inline gaps, tight indicator spacing |
| `1.5` | 6 | 0.375 | `xs` | Compact list item vertical padding, badge padding |
| `2` | 8 | 0.5 | `sm` | Button icon gap, input icon inset, between related items |
| `3` | 12 | 0.75 | `md` | List item padding, button vertical padding (medium), between form fields |
| `4` | 16 | 1.0 | `base` | Standard padding for cards/inputs, between label and input, paragraph spacing |
| `5` | 20 | 1.25 | `lg` | Button horizontal padding (medium), between groups of form fields |
| `6` | 24 | 1.5 | `xl` | Card padding, section internal padding, content padding on mobile |
| `8` | 32 | 2.0 | `2xl` | Between content sections, modal padding, panel margins |
| `10` | 40 | 2.5 | `3xl` | Between major sections on a page |
| `12` | 48 | 3.0 | `4xl` | Page top/bottom padding, large section spacing |
| `16` | 64 | 4.0 | `5xl` | Hero section padding, major visual breaks |
| `20` | 80 | 5.0 | `6xl` | Landing page section gaps |
| `24` | 96 | 6.0 | `7xl` | Maximum section spacing |

- **Why it works**: The scale has tighter spacing at the small end (every 4px from 0–16px) because component-level decisions need precision, and wider jumps at the large end (every 16–32px) because layout-level decisions are coarser. This mirrors how Carbon, Atlassian, and Radix all structure their scales.
- **Implementation**: Tailwind's default scale already matches this 1:1. `p-2` = 8px, `p-4` = 16px, `gap-6` = 24px, `py-12` = 48px. You don't need to customize anything — just use Tailwind's built-in numeric scale consistently.
- **Evidence**: [Carbon spacing scale](https://carbondesignsystem.com/elements/spacing/overview/), [Atlassian spacing](https://atlassian.design/foundations/spacing/), [Radix Themes spacing](https://radix-ui.com/themes/docs/theme/spacing)

---

## Finding 3: Reference Spacing Scales From Production Design Systems

- **The rule**: Here are the exact scales used by major design systems, for cross-referencing:

**Radix Themes (used by Vercel, Linear-adjacent)**:

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 40px |
| `--space-8` | 48px |
| `--space-9` | 64px |

**Carbon (IBM)**:

| Token | px |
|---|---|
| `$spacing-01` | 2 |
| `$spacing-02` | 4 |
| `$spacing-03` | 8 |
| `$spacing-04` | 12 |
| `$spacing-05` | 16 |
| `$spacing-06` | 24 |
| `$spacing-07` | 32 |
| `$spacing-08` | 40 |
| `$spacing-09` | 48 |
| `$spacing-10` | 64 |
| `$spacing-11` | 80 |
| `$spacing-12` | 96 |
| `$spacing-13` | 160 |

**Atlassian**:

| Token | px |
|---|---|
| `space.025` | 2 |
| `space.050` | 4 |
| `space.075` | 6 |
| `space.100` | 8 |
| `space.150` | 12 |
| `space.200` | 16 |
| `space.250` | 20 |
| `space.300` | 24 |
| `space.400` | 32 |
| `space.500` | 40 |
| `space.600` | 48 |
| `space.800` | 64 |
| `space.1000` | 80 |

**Material Design 3**: 4dp base grid, components align to 8dp baseline. Spacing tokens: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 64, 72, 80, 96, 128.

**Linear (observed, not published)**: 4px base unit — 4, 8, 12, 16, 24, 32.

**Convergence**: All systems converge on the same core values: **4, 8, 12, 16, 24, 32, 48, 64**. The differences are at the extremes (2px at the small end, 80–160px at the large end).

- **Evidence**: [Radix spacing](https://radix-ui.com/themes/docs/theme/spacing), [Carbon spacing](https://carbondesignsystem.com/elements/spacing/overview/), [Atlassian spacing](https://atlassian.design/foundations/spacing/), [Linear reverse-engineered](/outputs/research/linear-design-system-reverse-engineered.md)

---

## Finding 4: Component Internal Spacing (Padding) — Exact Values

- **The rule**: Specific padding values for every common component, organized by size variant:

### Buttons

| Size | Height | Vertical padding | Horizontal padding | Tailwind | Font size |
|---|---|---|---|---|---|
| **XS** | 24px | 2px | 8px | `h-6 px-2 text-xs` | 12px |
| **SM** | 28–32px | 4–6px | 12px | `h-7 px-3 text-xs` or `h-8 px-3 text-sm` | 12–14px |
| **MD** (default) | 36px | 8px | 16px | `h-9 px-4 text-sm` | 14px |
| **LG** | 40–44px | 10–12px | 20–24px | `h-10 px-5 text-sm` or `h-11 px-6 text-base` | 14–16px |
| **XL** | 48px | 12–16px | 24–32px | `h-12 px-6 text-base` or `px-8` | 16px |

The critical ratio is **1:2 to 1:2.5 vertical-to-horizontal**. Material UI found that 6px/16px (0.375 ratio) looks better than 4px/8px (0.5 ratio) for small buttons.

Icon-only buttons: use square dimensions matching the height (e.g., `h-9 w-9` for medium). Minimum touch target: 44×44px (Apple HIG) or 48×48px (Material).

### Text Inputs

| Size | Height | Vertical padding | Horizontal padding | Tailwind |
|---|---|---|---|---|
| **SM** | 32px | 6px | 8px | `h-8 px-2 py-1.5` |
| **MD** (default) | 36–40px | 8–10px | 12px | `h-9 px-3 py-2` or `h-10 px-3 py-2` |
| **LG** | 44–48px | 12px | 16px | `h-11 px-4 py-3` or `h-12 px-4 py-3` |

Input icons inset: 8–12px from left edge. Input text inset when icon present: 32–36px from left edge.

### Cards

| Context | Padding | Tailwind |
|---|---|---|
| Compact card (list item) | 12px | `p-3` |
| Standard card | 16–24px | `p-4` or `p-6` |
| Feature card / prominent | 24–32px | `p-6` or `p-8` |
| Dashboard widget | 16–20px | `p-4` or `p-5` |

shadcn/ui applies `p-6` (24px) to the root Card component with `space-y-6` between CardHeader, CardContent, and CardFooter — a good default.

### Modals / Dialogs

| Part | Padding | Tailwind |
|---|---|---|
| Overall modal | 24px all sides | `p-6` |
| Modal header | 24px top, 24px horizontal, 16px bottom | `pt-6 px-6 pb-4` |
| Modal body | 0 top, 24px horizontal | `px-6` |
| Modal footer | 16px top, 24px horizontal, 24px bottom | `pt-4 px-6 pb-6` |
| Between title and description | 8px | `space-y-2` |
| Between body and footer | 24px | `mt-6` |

Carbon's modal spec: 16px header padding, 16px content left padding, 48px bottom content margin.

### Dropdowns / Popovers

| Part | Padding | Tailwind |
|---|---|---|
| Dropdown container | 4px | `p-1` |
| Dropdown item | 8px vertical, 8px horizontal | `px-2 py-2` |
| Dropdown item (compact) | 6px vertical, 8px horizontal | `px-2 py-1.5` |
| Dropdown separator | 4px vertical margin | `my-1` |

- **Why it works**: These values align to the 4px grid, maintain consistent vertical-to-horizontal ratios, and match user expectations set by shadcn/ui, Radix, Material, and Carbon — the most widely-used component systems.
- **Evidence**: [shadcn/ui card PR](https://github.com/shadcn-ui/ui/pull/2439), [Carbon modal style](https://carbondesignsystem.com/components/modal/style), [Wise Design padding](https://wise.design/foundations/padding), [Nord card padding](https://nordhealth.design/components/card/examples/padding), [Primer button sizes](https://primer.style/components/button/), [Material button specs](https://github.com/mui-org/material-ui/issues/17634)

---

## Finding 5: Component External Spacing (Margins / Gaps) — Exact Values

- **The rule**: Space *between* things follows a proximity hierarchy — related things are closer, unrelated things are farther apart.

| Relationship | Gap | Tailwind | Example |
|---|---|---|---|
| **Tightest**: icon ↔ text | 4–8px | `gap-1` or `gap-2` | Button icon + label |
| **Related pair**: label ↔ input | 6–8px | `gap-1.5` or `gap-2` | Form label above its input |
| **Related group**: input ↔ input | 12–16px | `gap-3` or `gap-4` | Two form fields in a group |
| **Distinct groups**: group ↔ group | 20–24px | `gap-5` or `gap-6` | "Personal info" section ↔ "Payment" section |
| **Sections**: section ↔ section | 32–48px | `gap-8` or `gap-12` | Page-level content sections |
| **Major breaks**: hero ↔ features | 48–80px | `gap-12` to `gap-20` | Landing page sections |

### Specific component gaps

| Context | Gap | Tailwind |
|---|---|---|
| Between cards in a grid | 16–24px | `gap-4` or `gap-6` |
| Between list items | 2–4px (compact), 8px (comfortable) | `gap-0.5` to `gap-2` |
| Between a heading and its body text | 8–12px | `space-y-2` or `space-y-3` |
| Between paragraph blocks | 16px | `space-y-4` |
| Between a page title and first content | 24–32px | `mb-6` or `mb-8` |
| Between sidebar nav items | 2–4px | `gap-0.5` or `gap-1` |
| Between sidebar nav groups | 16–24px | `gap-4` or `space-y-6` |
| Between action buttons (inline) | 8–12px | `gap-2` or `gap-3` |
| Between a dialog title and description | 8px | `space-y-2` |
| Between table rows (visual) | 0–1px border | `divide-y` |
| Between table cells (horizontal) | 12–16px | `px-3` or `px-4` on cells |

- **Why it works**: The proximity principle (Gestalt law of proximity) is the strongest grouping cue in visual perception. When spacing between elements doubles or more, users perceive a group boundary. These values create 3–4 visible tiers of proximity.
- **Implementation**: Prefer CSS `gap` on flex/grid containers over margins on children. Gap applies spacing between items only — not on edges — eliminating margin collapse issues and `:last-child` hacks.

```jsx
// Good: container-level gap
<div className="flex flex-col gap-4">
  <Input />
  <Input />
  <Input />
</div>

// Avoid: margin on children
<div>
  <Input className="mb-4" />
  <Input className="mb-4" />
  <Input />  {/* no margin on last — easy to forget */}
</div>
```

- **Evidence**: [CSS gap guide](https://www.htmlallthethings.com/blog-posts/css-gap-the-ultimate-guide-to-spacing-flexbox-and-grid-items), [Carbon spacing usage](https://carbondesignsystem.com/elements/spacing/overview/), [web.dev spacing](https://web.dev/learn/css/spacing)

---

## Finding 6: Vertical Rhythm and Line-Height Relationship

- **The rule**: Set your body text line-height to a multiple of your base grid unit. Then make all vertical spacing (margins, padding, gaps) multiples of that line-height value or your base unit.

**For a SaaS app (information-dense)**:
- Body font: 14px, line-height: 20px (1.43 ratio, close to a 4px grid multiple)
- Or: Body font: 14px, line-height: 1.5 = 21px → round to 20px for grid alignment
- Or: Body font: 16px, line-height: 24px (1.5 ratio, perfectly on the 8px grid)

**The sweet spot line-height values**:

| Font size | Line-height | Ratio | Grid-aligned? |
|---|---|---|---|
| 12px | 16px | 1.33 | Yes (4px grid) |
| 13px | 20px | 1.54 | Yes (4px grid) |
| 14px | 20px | 1.43 | Yes (4px grid) |
| 16px | 24px | 1.50 | Yes (8px grid) |
| 18px | 28px | 1.56 | Yes (4px grid) |
| 20px | 28px | 1.40 | Yes (4px grid) |
| 24px | 32px | 1.33 | Yes (8px grid) |
| 32px | 40px | 1.25 | Yes (8px grid) |

**Heading line-height**: Tighter than body text. Use 1.1–1.3 for headings ≥24px. Large display text (48px+) can go as tight as 1.0–1.1.

- **Why it works**: When line-height aligns to the spacing grid, text baselines fall on predictable points. Adjacent columns of text align horizontally. Spacing above and below text blocks feels proportional. The page develops a visual "heartbeat" that the eye follows comfortably.
- **Implementation**:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xs':   ['12px', { lineHeight: '16px' }],
        'sm':   ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg':   ['18px', { lineHeight: '28px' }],
        'xl':   ['20px', { lineHeight: '28px' }],
        '2xl':  ['24px', { lineHeight: '32px' }],
        '3xl':  ['30px', { lineHeight: '36px' }],
        '4xl':  ['36px', { lineHeight: '40px' }],
        '5xl':  ['48px', { lineHeight: '52px' }],  // tighter for display
      },
    },
  },
}
```

```css
/* Vertical rhythm via CSS custom properties */
:root {
  --rhythm-unit: 24px; /* = body line-height */
}

h2 { margin-top: calc(var(--rhythm-unit) * 2); }    /* 48px */
h3 { margin-top: calc(var(--rhythm-unit) * 1.5); }  /* 36px */
p  { margin-bottom: var(--rhythm-unit); }            /* 24px */
```

- **Evidence**: [Zell Liew — Why Vertical Rhythms](https://zellwk.com/blog/why-vertical-rhythms), [Responsive Vertical Rhythm with CSS](https://zellwk.com/blog/responsive-vertical-rhythm/), [Google Fonts — Choosing line-height](https://fonts.google.com/knowledge/using_type/choosing_a_suitable_line_height)

---

## Finding 7: Layout Dimensions — Content Width, Sidebar, Header

- **The rule**: Standard measurements for SaaS application layouts:

### Content Max-Width

| Context | Width | Why |
|---|---|---|
| **Prose / reading** | 640–720px (`max-w-2xl` to `max-w-3xl`) | 45–75 characters per line (optimal readability) |
| **App content area** | 1024–1200px (`max-w-5xl` to `max-w-7xl`) | Standard dashboard/app content |
| **Marketing page content** | 1200–1280px (`max-w-7xl` or custom) | Wide enough for feature grids, narrow enough to read |
| **Full-bleed app** (Linear, Notion) | No max-width — fills viewport | Sidebar + content expand to fill |
| **Ultra-wide guard** | 1440–1536px | Prevents layout from becoming absurdly wide on 4K monitors |

Standard container pattern:
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;  /* mobile edge padding */
}

/* Or in Tailwind: */
/* <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"> */
```

### Sidebar Widths

| State | Width | Tailwind | Used by |
|---|---|---|---|
| **Expanded** | 240–256px | `w-60` or `w-64` | shadcn (256px default), most SaaS apps |
| **Narrow expanded** | 220px | `w-[220px]` | Linear |
| **Wide expanded** | 280–320px | `w-70` or `w-80` | Notion (wider for nested pages) |
| **Collapsed (icon-only)** | 48–64px | `w-12` or `w-16` | Most apps with collapsible sidebars |
| **Mobile overlay** | 280–320px | `w-[18rem]` or `w-80` | shadcn (288px mobile default) |

shadcn/ui defaults: `SIDEBAR_WIDTH = "16rem"` (256px), `SIDEBAR_WIDTH_MOBILE = "18rem"` (288px).

### Header Heights

| Context | Height | Tailwind |
|---|---|---|
| **App header (compact)** | 48px | `h-12` |
| **App header (standard)** | 56px | `h-14` |
| **App header (comfortable)** | 64px | `h-16` |
| **Marketing navbar** | 64–80px | `h-16` to `h-20` |
| **Mobile header** | 48–56px | `h-12` or `h-14` |

Home Assistant standardized on 56px. Material Design uses 56–64px. Most SaaS apps use 48px (compact/dense like Linear) or 64px (comfortable).

### Gutter Widths

| Context | Width | Tailwind |
|---|---|---|
| Page edge padding (mobile) | 16px | `px-4` |
| Page edge padding (tablet) | 24px | `px-6` |
| Page edge padding (desktop) | 32px | `px-8` |
| Grid column gap | 16–24px | `gap-4` or `gap-6` |
| Grid row gap | 16–24px | `gap-4` or `gap-6` |

- **Evidence**: [shadcn sidebar docs](https://v3.shadcn.com/docs/components/sidebar), [CSS max-width guide](https://digitalthriveai.com/en-us/resources/docs/web-development/sizing/), [Home Assistant header PR](https://github.com/home-assistant/frontend/pull/7470), [Geist grid docs](https://www.vercel.com/geist/grid)

---

## Finding 8: Responsive Spacing Strategy

- **The rule**: Don't scale spacing linearly. Instead, use a **step-down strategy** where you drop 1–2 steps on the spacing scale at each major breakpoint, and use `clamp()` for fluid interpolation between breakpoints.

### Breakpoints (Tailwind defaults)

| Name | Width | Typical device |
|---|---|---|
| base | 0–639px | Mobile phones |
| `sm` | 640px+ | Large phones, small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Small desktops, landscape tablets |
| `xl` | 1280px+ | Standard desktops |
| `2xl` | 1536px+ | Large desktops |

### Spacing step-down table

| Element | Desktop (lg+) | Tablet (md) | Mobile (base) |
|---|---|---|---|
| Section padding | 64px (`py-16`) | 48px (`py-12`) | 32px (`py-8`) |
| Card grid gap | 24px (`gap-6`) | 16px (`gap-4`) | 12px (`gap-3`) |
| Page edge padding | 32px (`px-8`) | 24px (`px-6`) | 16px (`px-4`) |
| Modal padding | 24px (`p-6`) | 24px (`p-6`) | 16px (`p-4`) |
| Component padding | 16px (`p-4`) | 16px (`p-4`) | 12px (`p-3`) |

### Fluid spacing with clamp()

```css
/* Section padding: 32px on mobile → 64px on desktop */
.section {
  padding-block: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}

/* Container padding: 16px on mobile → 32px on desktop */
.container {
  padding-inline: clamp(1rem, 0.5rem + 2.5vw, 2rem);
}

/* Card grid gap: 12px on mobile → 24px on desktop */
.card-grid {
  gap: clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem);
}
```

Formula: `clamp(min, calc(intercept + slope × vw), max)` where:
- `slope = (max - min) / (maxViewport - minViewport)`
- `intercept = min - slope × minViewport`

For 16px → 32px between 320px and 1280px:
- slope = (32 - 16) / (1280 - 320) = 0.01667
- intercept = 16 - (0.01667 × 320) = 10.667px
- Result: `clamp(1rem, calc(0.667rem + 1.667vw), 2rem)`

- **Why it works**: Step-down spacing maintains visual hierarchy at every viewport. Mobile screens need tighter spacing because there's less room, but *relative proportions* between elements should stay constant. Fluid `clamp()` prevents jarring jumps at breakpoints.
- **Evidence**: [CSS clamp() guide](https://halcyonwebdesign.com.ph/the-complete-guide-to-css-clamp-for-fluid-typography-and-responsive-spacing/), [Layout spacing clamp](https://clampgenerator.com/guides/layout-spacing-padding-margin-gap-css-clamp/), [Carbon FAQ on responsive tokens](https://carbondesignsystem.com/elements/spacing/overview/)

---

## Finding 9: How Linear, Vercel, Stripe, and Notion Structure Their Spacing

- **The rule**: Here's what top SaaS products actually do, distilled from reverse-engineering and public documentation:

### Linear

- **Base unit**: 4px grid
- **Spacing stops**: 4, 8, 12, 16, 24, 32
- **Body text**: 13px / ~1.4 line-height (tighter than industry standard — density is a feature)
- **Layout**: No traditional column grid; content-first modular layout
- **Sidebar**: ~220px expanded, dimmed relative to content area
- **Header**: Compact; uses `ResponsiveSlot` system that hides lower-priority content via ResizeObservers rather than CSS breakpoints
- **Component library**: Custom on Radix primitives (their internal system is called "Orbiter")
- **Border radius**: 6px (buttons/inputs), 8px (cards/panels), 12px (modals)
- **Key insight**: Linear uses weight and opacity for hierarchy more than spacing. The spacing is tight and uniform; differentiation comes from typography weight and text opacity (0.95, 0.65, 0.45).

### Vercel / Geist

- **Grid**: Responsive grid with breakpoints at 0/650/900/1280/1920px
- **Spacing**: Radix Themes scale (4, 8, 12, 16, 24, 32, 40, 48, 64px)
- **Typography**: Geist Sans / Geist Mono / Geist Pixel — all share consistent metrics for spacing integrity
- **Layout**: 24-column grid for flexible responsive layouts
- **Design principle**: "Clear structure, predictable metrics, strong alignment across layouts"
- **Scaling**: Supports a `--scaling` CSS variable for uniform UI density adjustment
- **Key insight**: Vercel uses Radix Themes' spacing scale directly, which makes their spacing decisions portable to any Radix-based project.

### Stripe

- **Spacing unit**: Configurable `spacingUnit` CSS variable (e.g., `2px`) that all components reference
- **Approach**: CSS custom properties for spacing tokens, theme variants (`stripe`, `night`, `flat`)
- **Input spacing modes**: `spaced` (default, each field has surrounding space) or `condensed` (related fields grouped tightly)
- **Key insight**: Stripe's developer-facing components use a multiplier-based system where `spacingUnit` is the atom — all padding and margins are N × spacingUnit. This makes the entire system tunable from a single variable.

### Notion

- **Approach**: Generous white space, content-block-based layout
- **Sidebar**: Wider than average (~280–320px) because it shows nested page hierarchies
- **Content area**: No rigid max-width — pages expand to fill
- **Spacing philosophy**: "White space helps with information processing; sections can be dense, but the whole page should not be crowded." They use callout boxes and dividers to create visual sections rather than relying purely on spacing.
- **Key insight**: Notion's spacing serves a different goal than Linear's — Notion optimizes for scannability and visual breaks in long-form content, while Linear optimizes for density in structured data.

- **Evidence**: [Linear reverse-engineered analysis](/outputs/research/linear-design-system-reverse-engineered.md), [Geist grid docs](https://www.vercel.com/geist/grid), [Stripe Appearance API](https://docs.stripe.com/elements/appearance-api), [Radix Themes spacing](https://radix-ui.com/themes/docs/theme/spacing)

---

## Finding 10: The Complete Tailwind Config for a SaaS Spacing System

- **The rule**: Here's a production-ready Tailwind v4 configuration that encodes everything above:

```css
/* globals.css — Tailwind v4 with @theme */
@import "tailwindcss";

@theme {
  /* Tailwind v4 uses --spacing as multiplier. Default 0.25rem = 4px is correct. */
  --spacing: 0.25rem;

  /* Typography with grid-aligned line-heights */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-xs--line-height: 1rem;        /* 16px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-sm--line-height: 1.25rem;     /* 20px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-base--line-height: 1.5rem;    /* 24px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-lg--line-height: 1.75rem;     /* 28px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-xl--line-height: 1.75rem;     /* 28px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-2xl--line-height: 2rem;       /* 32px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-3xl--line-height: 2.25rem;    /* 36px */
  --font-size-4xl: 2.25rem;     /* 36px */
  --font-size-4xl--line-height: 2.5rem;     /* 40px */

  /* Layout constants */
  --width-sidebar: 16rem;       /* 256px */
  --width-sidebar-collapsed: 3rem; /* 48px */
  --width-sidebar-mobile: 18rem; /* 288px */
  --height-header: 3.5rem;      /* 56px */
  --width-content-prose: 42rem;  /* 672px */
  --width-content-app: 80rem;    /* 1280px */
  --width-content-marketing: 75rem; /* 1200px */

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

```css
/* Utility layer for spacing patterns */
@layer components {
  .container-app {
    width: 100%;
    max-width: var(--width-content-app);
    margin-inline: auto;
    padding-inline: clamp(1rem, 0.5rem + 2.5vw, 2rem);
  }

  .container-prose {
    width: 100%;
    max-width: var(--width-content-prose);
    margin-inline: auto;
    padding-inline: clamp(1rem, 0.5rem + 2.5vw, 2rem);
  }

  .section-spacing {
    padding-block: clamp(2rem, 1.5rem + 2.5vw, 4rem);
  }
}
```

For Tailwind v3:

```js
// tailwind.config.js (v3)
module.exports = {
  theme: {
    extend: {
      spacing: {
        'sidebar': '16rem',
        'sidebar-collapsed': '3rem',
        'header': '3.5rem',
      },
      maxWidth: {
        'prose': '42rem',
        'app': '80rem',
        'marketing': '75rem',
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],
      },
    },
  },
}
```

- **Evidence**: [Tailwind v4 theme variables](https://tailwindcss.com/docs/customizing-spacing), [Tailwind v4 multiplier PR](https://github.com/tailwindlabs/tailwindcss/pull/14857)

---

## Finding 11: Making a Page "Breathe" — The Practical Checklist

- **The rule**: "Breathing" is not a vague aesthetic — it comes from specific, measurable patterns:

### The 5 rules for visual breathing room

1. **Proximity ratio ≥ 2:1**: Space *between* groups must be at least 2× the space *within* groups. If items inside a card are 8px apart, cards must be ≥16px apart. If form field groups are 12px apart internally, the gap between groups must be ≥24px.

2. **Content density gradient**: Pages should be denser at the center and looser at the edges. Header padding ≥ content padding. Page margins ≥ card margins. This creates a "frame" effect.

3. **Consistent vertical cadence**: Use `space-y-{n}` or `gap-{n}` with the *same* value for all siblings at the same hierarchy level. Don't mix `gap-3` and `gap-5` between items in the same list. Pick one value.

4. **Whitespace-to-content ratio**: For marketing pages, aim for ~40–60% whitespace. For app UIs, ~25–35%. Measure by visually squinting — if the page feels like a wall of content, increase section spacing.

5. **The "paragraph test"**: Every piece of content on the page should feel like it belongs to a clear group. If you can't instantly tell what group an element belongs to, the spacing between it and its neighbors is wrong (usually too equal — increase the space to the "other" group).

### Quick component spacing audit

```
✓ Button padding: at least 8px vertical, 16px horizontal (medium)
✓ Input padding: at least 8px vertical, 12px horizontal
✓ Card padding: at least 16px (compact) or 24px (standard)
✓ Modal padding: at least 24px
✓ Label → input gap: 6–8px
✓ Input → input gap: 12–16px
✓ Section → section gap: 32–48px
✓ Page edge padding: ≥16px mobile, ≥32px desktop
✓ Line-height: ≥1.4 for body, ≥1.2 for headings
✓ No spacing value is a non-multiple of 4
```

- **Evidence**: [Carbon "Designing with space"](https://carbondesignsystem.com/elements/spacing/overview/), [Zell Liew vertical rhythm](https://zellwk.com/blog/why-vertical-rhythms/), [Peasy Dev spacing guide](https://peasydev.com/guides/design-system-spacing-scale/)

---

## Finding 12: Form Spacing — The Complete Specification

- **The rule**: Forms are where spacing mistakes are most visible. Here's the exact layout:

```
Form Layout (vertical, single-column)
├── Form group 1: "Personal Information"
│   ├── Section heading                    ← mb-4 (16px) below heading
│   ├── Field 1
│   │   ├── Label                          ← text-sm (14px), font-medium
│   │   ├── gap: 6–8px                     ← gap-1.5 or gap-2
│   │   ├── Input                          ← h-9 or h-10 (36–40px)
│   │   └── Helper text (optional)         ← mt-1.5, text-xs, text-muted
│   ├── gap: 12–16px                       ← gap-3 or gap-4 between fields
│   ├── Field 2
│   │   ├── Label
│   │   ├── gap: 6–8px
│   │   └── Input
│   └── gap: 12–16px
├── gap: 24–32px                           ← gap-6 or gap-8 between groups
├── Form group 2: "Payment Details"
│   ├── Section heading
│   ├── ...fields...
├── gap: 24–32px
└── Actions
    ├── gap: 8–12px between buttons        ← gap-2 or gap-3
    ├── [Cancel] button
    └── [Submit] button
```

```jsx
// React/Tailwind implementation
<form className="flex flex-col gap-8">
  {/* Group 1 */}
  <fieldset className="flex flex-col gap-4">
    <legend className="text-sm font-semibold mb-2">Personal Information</legend>

    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">Full Name</label>
      <input className="h-10 rounded-md border px-3 text-sm" />
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">Email</label>
      <input className="h-10 rounded-md border px-3 text-sm" />
      <p className="text-xs text-muted-foreground">We'll never share your email.</p>
    </div>
  </fieldset>

  {/* Group 2 */}
  <fieldset className="flex flex-col gap-4">
    <legend className="text-sm font-semibold mb-2">Payment</legend>
    {/* ...fields... */}
  </fieldset>

  {/* Actions */}
  <div className="flex justify-end gap-3">
    <button className="h-9 px-4 text-sm">Cancel</button>
    <button className="h-9 px-4 text-sm bg-primary text-primary-foreground">Submit</button>
  </div>
</form>
```

Key rules:
- Labels above inputs (research shows this outperforms side-by-side for scan speed and mobile usability)
- Single column layout (multi-column forms increase abandonment)
- Font size ≥ 14px for inputs (16px on iOS to prevent zoom on focus)
- Use `gap` on flex containers, not margins on children

- **Evidence**: [web.dev form design basics](https://web.dev/learn/forms/design-basics/), [web.dev styling forms](https://web.dev/learn/forms/styling), [W3C label techniques](https://www.w3.org/WAI/WCAG21/Techniques/html/H44.html)

---

## Quick Reference Card

```
THE SPACING CHEAT SHEET

Base unit:        4px
Primary scale:    4  8  12  16  24  32  48  64  (use these 80% of the time)
Extended:         2  6  20  40  80  96  128  160

COMPONENTS
  Button (md):    h-9 (36px), px-4 (16px), py-2 (8px)
  Input (md):     h-10 (40px), px-3 (12px), py-2 (8px)
  Card:           p-6 (24px)
  Modal:          p-6 (24px)
  Dropdown item:  px-2 py-1.5 (8px × 6px)

GAPS
  Icon ↔ text:    4–8px     (gap-1 to gap-2)
  Label ↔ input:  6–8px     (gap-1.5 to gap-2)
  Field ↔ field:  12–16px   (gap-3 to gap-4)
  Group ↔ group:  24–32px   (gap-6 to gap-8)
  Section ↔ sect: 48–64px   (gap-12 to gap-16)

LAYOUT
  Sidebar:        256px expanded, 48px collapsed
  Header:         48–56px
  Content max:    1200–1280px (app), 640–720px (prose)
  Page padding:   16px mobile → 32px desktop

TYPOGRAPHY
  Body:           14–16px, line-height 20–24px
  Headings:       line-height 1.1–1.3
  All line-heights should be multiples of 4px

RESPONSIVE
  Don't scale linearly — step down 1–2 stops on the scale
  Use clamp() for fluid spacing between breakpoints
  Section padding: 64px desktop → 48px tablet → 32px mobile
```

---

## Sources

- [8px Grid Complete Guide — Eduardo Calvo López](https://educalvolopez.com/en/blog/sistema-de-espaciado-con-grid-8pt-guia-completa)
- [Carbon Design System — Spacing](https://carbondesignsystem.com/elements/spacing/overview/)
- [Atlassian Design — Spacing](https://atlassian.design/foundations/spacing/)
- [Radix Themes — Spacing](https://radix-ui.com/themes/docs/theme/spacing)
- [Material Design 3 — Spacing](https://m3.material.io/foundations/layout/understanding-layout/spacing)
- [Tailwind CSS — Customizing Spacing](https://tailwindcss.com/docs/customizing-spacing)
- [Tailwind v4 Multiplier PR](https://github.com/tailwindlabs/tailwindcss/pull/14857)
- [shadcn/ui — Sidebar](https://v3.shadcn.com/docs/components/sidebar)
- [shadcn/ui — Card spacing PR](https://github.com/shadcn-ui/ui/pull/2439)
- [Primer — Button sizes](https://primer.style/components/button/)
- [Carbon — Modal style](https://carbondesignsystem.com/components/modal/style)
- [Wise Design — Padding](https://wise.design/foundations/padding)
- [Nord Design System — Card padding](https://nordhealth.design/components/card/examples/padding)
- [Stripe Appearance API](https://docs.stripe.com/elements/appearance-api)
- [Geist Grid](https://www.vercel.com/geist/grid)
- [Geist Typography](https://www.vercel.com/geist/typography)
- [Zell Liew — Why Vertical Rhythms](https://zellwk.com/blog/why-vertical-rhythms)
- [Zell Liew — Responsive Vertical Rhythm](https://zellwk.com/blog/responsive-vertical-rhythm/)
- [Google Fonts — Choosing Line Height](https://fonts.google.com/knowledge/using_type/choosing_a_suitable_line_height)
- [CSS-Tricks — line-height](https://css-tricks.com/line-height/)
- [CSS Clamp Guide](https://halcyonwebdesign.com.ph/the-complete-guide-to-css-clamp-for-fluid-typography-and-responsive-spacing/)
- [Layout Spacing Clamp Generator](https://clampgenerator.com/guides/layout-spacing-padding-margin-gap-css-clamp/)
- [CSS gap guide](https://www.htmlallthethings.com/blog-posts/css-gap-the-ultimate-guide-to-spacing-flexbox-and-grid-items)
- [web.dev — Spacing](https://web.dev/learn/css/spacing)
- [web.dev — Form Design Basics](https://web.dev/learn/forms/design-basics/)
- [Peasy Dev — Spacing Scale Guide](https://peasydev.com/guides/design-system-spacing-scale/)
- [Linear reverse-engineered analysis](/outputs/research/linear-design-system-reverse-engineered.md)
