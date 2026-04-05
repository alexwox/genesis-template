# Lane 3: Shadows, Typography & Color — Implementable Specifications

> Research compiled from Tailwind CSS docs, Josh Comeau's shadow methodology, Radix UI color system, Material Design 3, Linear's reverse-engineered design system, USWDS design tokens, and production SaaS analysis.

---

## SHADOWS & ELEVATION

### Finding 1: The Shadow Scale — Exact Values for Every Elevation Level

- **The rule**: A production shadow system needs 5–6 levels. Each level uses multiple comma-separated layers with progressively larger offsets and blur radii. Opacity stays low (0.05–0.1 per layer) to avoid the "blurry gray box" effect.
- **Why it works**: Real shadows have multiple components — ambient occlusion (contact), umbra (core), and penumbra (soft edge). Single-layer shadows look flat because they only approximate one of these.
- **Implementation** (Tailwind defaults + recommended custom):

```css
/* Tailwind v4 defaults */
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

```js
// tailwind.config.js — Josh Comeau-style layered shadows
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'elevation-low': `
          0.5px 1px 1px hsl(var(--shadow-color) / 0.7)
        `,
        'elevation-medium': `
          1px 2px 2px hsl(var(--shadow-color) / 0.333),
          2px 4px 4px hsl(var(--shadow-color) / 0.333),
          3px 6px 6px hsl(var(--shadow-color) / 0.333)
        `,
        'elevation-high': `
          1px 2px 2px hsl(var(--shadow-color) / 0.2),
          2px 4px 4px hsl(var(--shadow-color) / 0.2),
          4px 8px 8px hsl(var(--shadow-color) / 0.2),
          8px 16px 16px hsl(var(--shadow-color) / 0.2),
          16px 32px 32px hsl(var(--shadow-color) / 0.2)
        `,
      },
    },
  },
};
```

- **Evidence**: [Tailwind CSS box-shadow docs](https://tailwindcss.com/docs/box-shadow), [Josh Comeau — Designing Beautiful Shadows](https://www.joshwcomeau.com/css/designing-shadows/)

---

### Finding 2: The Three-Layer Shadow Formula

- **The rule**: Every realistic shadow needs three distinct components:
  1. **Contact shadow** (ambient occlusion): tiny offset, small blur, slightly darker — `0px 1px 2px rgba(0,0,0,0.05)`
  2. **Key shadow** (umbra): medium offset matching light direction — `0px 4px 8px rgba(0,0,0,0.05)`
  3. **Fill shadow** (penumbra): large offset, large blur, soft — `0px 8px 16px rgba(0,0,0,0.05)`

  The blur radius doubles with each layer. Opacity stays consistent per layer (0.05–0.075 each).

- **Why it works**: A single shadow can only approximate one type of light interaction. Three layers model how light actually diffracts around objects — the sharp contact edge, the directional core, and the ambient room light.
- **Implementation**:

```css
/* Three-layer shadow at different elevations */
.card-resting {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.07);
}

.card-raised {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07);
}

.modal {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.09);
}

.tooltip-or-command-palette {
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.09),
    0 16px 32px rgba(0, 0, 0, 0.09),
    0 32px 64px rgba(0, 0, 0, 0.09);
}
```

- **Evidence**: [Tobias Ahlin — Smoother & Sharper Shadows](https://tobiasahlin.com/blog/layered-smooth-box-shadows/), [Josh Comeau — Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/)

---

### Finding 3: When to Use Shadows vs. Borders

- **The rule**:
  - **Shadows**: Reserved for elements that **overlap** or **float above** other content. Dropdowns, modals, popovers, tooltips, fixed headers, sticky elements. Shadows mean "I'm above you."
  - **Borders**: Used for **visual grouping** and **separation** of adjacent, same-layer elements. Cards in a grid, table cells, form inputs, sidebar sections, dividers. Borders mean "I'm next to you."
  - **Both together**: Maximum emphasis and depth. Use on transient elevated elements (dropdowns, popovers) where you need both a crisp boundary and a clear float-above effect.

- **Why it works**: Shadows simulate physical elevation — they're perceptually different from borders. Using shadows on non-elevated elements (e.g., cards in a flat grid) muddies the elevation metaphor. Borders define boundaries without implying depth.
- **Implementation**:

```css
/* Adjacent card in a grid — use border, not shadow */
.card { border: 1px solid rgb(0 0 0 / 0.08); }

/* Dropdown that overlaps content — use shadow */
.dropdown { box-shadow: var(--shadow-lg); }

/* Popover that needs crisp edge + elevation — both */
.popover {
  border: 1px solid rgb(0 0 0 / 0.06);
  box-shadow: var(--shadow-lg);
}
```

The Cloudscape design system (AWS) codifies this: 1px stroke for separation, 2px for emphasis. Shadows only on overlapping/transient elements. Both together for maximum focus.

- **Evidence**: [Cloudscape Visual Style](https://cloudscape.design/foundation/visual-foundation/visual-style), [LogRocket — Shadows in UI Design](https://blog.logrocket.com/ux-design/shadows-ui-design-tips-best-practices)

---

### Finding 4: Shadow Direction and Color-Tinted Shadows

- **The rule**:
  - **Direction**: Light source should be above and slightly to the left. Vertical offset should be ~2× horizontal offset (e.g., `x: 1px, y: 2px` or `x: 2px, y: 4px`). Keep this ratio consistent across all shadows on the page.
  - **Color**: Never use pure black (`rgba(0,0,0,...)`). Use color-tinted shadows that match the background hue. For a white/gray background, use `hsl(0deg 0% 50% / opacity)`. For a colored background, match the hue and reduce saturation to ~60%.
  - **Brand-tinted glow**: For CTA buttons and accent elements, use the element's own color as the shadow color at ~30–50% opacity.

- **Why it works**: Pure black shadows desaturate everything underneath them, creating a washed-out gray look. Hue-matched shadows maintain vibrancy. The consistent light direction creates a coherent spatial model — if one shadow goes left and another goes right, the illusion breaks.
- **Implementation**:

```css
/* Color-tinted shadows with CSS variables */
:root {
  --shadow-color: 0deg 0% 50%;       /* Gray background */
}

.blue-section {
  --shadow-color: 220deg 60% 50%;    /* Blue background */
}

.card {
  box-shadow:
    1px 2px 2px hsl(var(--shadow-color) / 0.333),
    2px 4px 4px hsl(var(--shadow-color) / 0.333),
    3px 6px 6px hsl(var(--shadow-color) / 0.333);
}

/* Brand-colored glow on accent buttons */
.btn-primary {
  background: #3B82F6;
  box-shadow: 0 10px 40px -10px rgba(59, 130, 246, 0.5);
}

.btn-primary:hover {
  box-shadow: 0 14px 44px -8px rgba(59, 130, 246, 0.6);
}
```

Josh Comeau's approach: define `--shadow-color` as an HSL value (without alpha), then each shadow layer references it with its own alpha. When the background changes, override `--shadow-color` — all child shadows adapt automatically.

- **Evidence**: [Josh Comeau — Designing Beautiful Shadows](https://www.joshwcomeau.com/css/designing-shadows/), [Nine Hub — Modern CSS Shadow Effects](https://nineproo.com/blog/modern-css-shadow-effects/)

---

### Finding 5: Elevation Mapping — What Gets Which Shadow Level

- **The rule**: Assign elevation levels by semantic role, not by visual preference. Material Design uses 6 levels (0–5). In practice, most products need 4–5:

| Level | Shadow | Component | z-index range |
|-------|--------|-----------|---------------|
| 0 | None | Base page, backgrounds | 0 |
| 1 | `shadow-xs` / `shadow-sm` | Resting cards, raised buttons | 1–10 |
| 2 | `shadow-md` | Floating action buttons, raised panels, sticky headers | 10–20 |
| 3 | `shadow-lg` | Dropdowns, popovers, context menus, autocomplete | 20–30 |
| 4 | `shadow-xl` | Modals, dialogs, command palettes | 30–50 |
| 5 | `shadow-2xl` | Notifications, toasts (highest layer) | 50+ |

- **Why it works**: Consistent elevation mapping means users intuitively understand layering. A tooltip should never appear behind a modal. A dropdown should always float above a card.
- **Implementation** (Tailwind classes):

```jsx
// Tailwind utility mapping
const ELEVATION = {
  resting: 'shadow-xs',          // Cards at rest
  raised: 'shadow-sm',           // Hovered cards, secondary buttons
  sticky: 'shadow-md',           // Sticky headers, floating toolbars
  dropdown: 'shadow-lg',         // Dropdowns, popovers, menus
  modal: 'shadow-xl',            // Modals, dialogs, command palette
  notification: 'shadow-2xl',    // Toasts, alerts (highest)
};
```

Linear's approach is more minimal: cards get almost no shadow in dark mode (surface color handles elevation instead). In light mode, Linear uses a subtle `shadow-sm` on cards and `shadow-lg` on dropdowns/modals. They rely on surface color differentiation + 1px borders more than shadows.

- **Evidence**: [Material Design — Elevation](https://m3.material.io/styles/elevation/tokens), [Atlassian Design — Elevation](https://atlassian.design/foundations/elevation/), Linear reverse-engineered system

---

### Finding 6: Dark Mode — Shadows Are (Mostly) Useless, Use Surface Color

- **The rule**: In dark mode, shadows are nearly invisible because dark shadows on dark backgrounds have no contrast. Replace shadow-based elevation with **surface color lightness tiers**:

```css
/* Dark mode elevation via surface lightness */
:root[data-theme="dark"] {
  --surface-base:     #121316;   /* L: ~10% — deepest layer */
  --surface-raised:   #1A1B1F;   /* L: ~14% — cards, panels */
  --surface-overlay:  #222428;   /* L: ~18% — dropdowns, menus */
  --surface-modal:    #2A2C31;   /* L: ~22% — modals, dialogs */
  --surface-tooltip:  #32343A;   /* L: ~26% — tooltips, toasts */
}
```

Each step is ~4% lightness increase. Higher = closer to user.

You can still use a subtle shadow in dark mode, but it serves as a secondary cue:

```css
/* Dark mode shadow — very subtle, just for edge definition */
.dark .dropdown {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 4px 16px rgba(0, 0, 0, 0.4);
}
```

- **Why it works**: Screens emit light. In the real world, dark environments mean shadows are invisible — you navigate by seeing which surfaces catch more light (are lighter). Lighter surfaces = higher elevation in dark mode.
- **Evidence**: [Parker.mov — Good Dark Mode Shadows](https://www.parker.mov/notes/good-dark-mode-shadows), [Atlassian Design — Elevation](https://atlassian.design/foundations/elevation/), Linear dark mode system

---

## TYPOGRAPHY

### Finding 7: The Type Scale — Exact Sizes and When to Use Each

- **The rule**: Use a **constrained linear scale** for product UI, not a purely mathematical modular scale. Modular scales (1.25 ratio) produce sizes that are too spread out for dense interfaces. Most production SaaS apps use a hand-tuned scale like:

| Token | Size | Use case |
|-------|------|----------|
| `text-2xs` | 10px | Badges, fine print |
| `text-xs` | 12px | Metadata, timestamps, captions |
| `text-sm` | 13–14px | Secondary text, descriptions, table cells |
| `text-base` | 14–16px | Body text (16px for marketing, 14px for dense apps) |
| `text-lg` | 16–18px | Subheadings, emphasized text |
| `text-xl` | 20px | Section headings |
| `text-2xl` | 24px | Page titles |
| `text-3xl` | 30px | Landing page headings |
| `text-4xl` | 36–48px | Hero headlines |
| `text-5xl` | 60px | Display text |

- **Why it works**: Products like Linear use 13px body text for density. Consumer/marketing products use 16px. The key is that adjacent sizes differ by only 1–2px at small sizes (12→13→14) and jump larger at big sizes (24→30→36→48). This is a practical scale, not a mathematical one.
- **Implementation** (Tailwind defaults):

| Tailwind class | Font size | Default line-height |
|----------------|-----------|---------------------|
| `text-xs` | 12px (0.75rem) | 1.333 (16px) |
| `text-sm` | 14px (0.875rem) | 1.429 (20px) |
| `text-base` | 16px (1rem) | 1.5 (24px) |
| `text-lg` | 18px (1.125rem) | 1.556 (28px) |
| `text-xl` | 20px (1.25rem) | 1.4 (28px) |
| `text-2xl` | 24px (1.5rem) | 1.333 (32px) |
| `text-3xl` | 30px (1.875rem) | 1.2 (36px) |
| `text-4xl` | 36px (2.25rem) | 1.111 (40px) |
| `text-5xl` | 48px (3rem) | 1.0 |
| `text-6xl` | 60px (3.75rem) | 1.0 |

Linear's scale: 11px / 12px / 13px (body) / 14px / 16px / 20px — deliberately tighter than Tailwind.

- **Evidence**: [Tailwind CSS font-size docs](https://tailwindcss.com/docs/font-size/), [FontFYI — Building a Type Scale](https://fontfyi.com/blog/building-type-scale-design-system/), Linear design system teardown

---

### Finding 8: Line-Height Rules — The Sliding Scale

- **The rule**: Line-height should decrease as font size increases. The relationship is inverse:
  - **Body text (14–16px)**: `line-height: 1.5` — optimized for paragraph readability, WCAG minimum for accessibility
  - **Subheadings (18–24px)**: `line-height: 1.3–1.4` — slightly tighter, still comfortable
  - **Headings (30–48px)**: `line-height: 1.1–1.2` — tight, prevents excessive vertical space between lines
  - **Display text (48px+)**: `line-height: 1.0–1.1` — nearly solid, multiline display text at 1.5 would look absurd

  **Always use unitless values** (not `px` or `em`). Unitless line-heights are inherited as multipliers, not computed values — child elements recalculate based on their own font size.

- **Why it works**: Large text has more vertical presence per line, so it needs less interline space to be readable. Small text needs more breathing room. If you use `line-height: 1.5` on a 60px heading, you get 30px of gap — it looks like double-spaced text.
- **Implementation**:

```css
:root {
  --leading-tight:   1.1;   /* Display, hero headlines */
  --leading-snug:    1.25;  /* Headings */
  --leading-normal:  1.5;   /* Body text */
  --leading-relaxed: 1.625; /* Long-form reading, accessibility */
  --leading-loose:   2.0;   /* Extra-loose reading contexts */
}

/* Practical mapping */
h1 { font-size: 2.25rem; line-height: 1.11; }  /* 36px / 40px */
h2 { font-size: 1.5rem;  line-height: 1.33; }  /* 24px / 32px */
h3 { font-size: 1.25rem; line-height: 1.4;  }  /* 20px / 28px */
p  { font-size: 1rem;    line-height: 1.5;  }  /* 16px / 24px */
.small { font-size: 0.875rem; line-height: 1.43; } /* 14px / 20px */
.caption { font-size: 0.75rem; line-height: 1.33; } /* 12px / 16px */
```

- **Evidence**: [MDN — line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height), [Tailwind CSS font-size docs](https://tailwindcss.com/docs/font-size/)

---

### Finding 9: Font Weight — A 3–4 Weight System

- **The rule**: Most products need exactly 3–4 weights. More creates noise; fewer limits hierarchy.

| Weight | CSS value | Role |
|--------|-----------|------|
| **Regular** | 400 | Body text, default content, descriptions |
| **Medium** | 500 | UI labels, form labels, table headers, nav items, metadata that needs slight emphasis |
| **Semibold** | 600 | Subheadings, card titles, sidebar section headers, button text |
| **Bold** | 700 | Page titles, hero headings, primary CTAs |

  - **300 (Light)** — only for large display text (36px+). Thin strokes at small sizes are unreadable.
  - **800–900 (Extra-Bold / Black)** — only for marketing hero headlines. Linear uses 800 for its 62px hero headers.
  - **Weight creates hierarchy more than size** — a 14px semibold and a 14px regular are two distinct hierarchy levels without any size change. This is how Linear achieves density: vary weight instead of size.

- **Why it works**: The human eye detects weight differences starting at ~100 units apart (400 vs 500). Using 400, 500, 600, 700 gives you four clearly distinguishable levels. Going finer (450, 550) is imperceptible in most typefaces.
- **Implementation**:

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontWeight: {
      normal: '400',    // body, descriptions
      medium: '500',    // labels, nav, metadata
      semibold: '600',  // subheadings, card titles, buttons
      bold: '700',      // page titles, hero
    },
  },
};
```

- **Evidence**: [FontFYI — Font Weights Explained](https://fontfyi.com/blog/understanding-font-weights/), [USWDS — Font Weight Tokens](https://standards.usa.gov/design-tokens/typesetting/font-weight), Linear design system

---

### Finding 10: Letter-Spacing — When and How Much

- **The rule**:
  - **Uppercase labels**: Always add tracking. `letter-spacing: 0.05em` to `0.1em`. Without tracking, uppercase text feels cramped.
  - **Large headings (36px+)**: Subtract tracking. `letter-spacing: -0.02em` to `-0.025em`. Large characters have optically wider spacing that needs tightening.
  - **Body text (14–16px)**: `letter-spacing: normal` (0). Do not track body text.
  - **Small text (11–12px)**: Slight positive tracking helps. `letter-spacing: 0.01em` to `0.02em`.

- **Why it works**: At large sizes, the optical spacing between characters appears to grow. Negative tracking compensates. At small sizes, characters need room to breathe. Uppercase text has no ascenders/descenders, making individual letters harder to distinguish — extra tracking helps recognition.
- **Implementation**:

```css
/* Practical letter-spacing tokens */
.uppercase-label {
  font-size: 0.6875rem; /* 11px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em; /* Key: always track uppercase */
}

h1 {
  font-size: 3rem; /* 48px */
  letter-spacing: -0.025em;
}

h2 {
  font-size: 1.875rem; /* 30px */
  letter-spacing: -0.02em;
}

p {
  letter-spacing: normal; /* Never track body */
}
```

Tailwind utilities: `tracking-tighter` (-0.05em), `tracking-tight` (-0.025em), `tracking-normal` (0), `tracking-wide` (0.025em), `tracking-wider` (0.05em), `tracking-widest` (0.1em).

Linear uses neutral tracking for body, and tracked-out uppercase labels at 12px/600 weight for section headers.

- **Evidence**: [Tachyons — Letter-Spacing](https://tachyons.io/docs/typography/tracking/), [MDN — letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing), [CSS-Tricks — Keeping Track of Letter-Spacing](https://css-tricks.com/keeping-track-letter-spacing-guidelines/)

---

### Finding 11: Font Selection — Inter and Geist as SaaS Defaults

- **The rule**: For SaaS product UI, choose between:

| Font | File Size | Best For | Notes |
|------|-----------|----------|-------|
| **Inter** | ~525 KB (variable) | General SaaS, readable at all sizes | De facto standard since 2019. Designed for screens. Has variable optical sizing. |
| **Geist** | ~114 KB (variable) | Developer tools, Vercel/Next.js ecosystem | 78% lighter than Inter. Influenced by Inter + Swiss typography. OFL-licensed. |
| **SF Pro** | System font | Apple ecosystem products | Zero KB (already on macOS/iOS). Cannot be hosted on web. |
| **Geist Mono** / **JetBrains Mono** | — | Code blocks, data tables, technical content | Always pair a mono font for code. |

  The SaaS Typography Playbook (50-company analysis) found: devtools companies use Geist; enterprise SaaS uses Inter or system fonts; consumer products use custom typefaces.

- **Why it works**: Inter was specifically designed for computer screens with tall x-height, open apertures, and contextual alternates (like distinguishing `l/I/1`). Geist inherits these properties at a fraction of the file size. Both support variable weight (100–900) from a single file.
- **Implementation**:

```css
/* System-first with Inter fallback */
font-family:
  "Inter",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  "Helvetica Neue",
  sans-serif;

/* Geist with Next.js */
/* import { GeistSans, GeistMono } from 'geist/font' */
font-family:
  var(--font-geist-sans),
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  sans-serif;

/* Code / data */
font-family:
  "Geist Mono",
  "JetBrains Mono",
  "Fira Code",
  "SF Mono",
  "Consolas",
  monospace;
```

- **Evidence**: [Vercel Geist design system](https://www.vercel.com/geist/introduction), [FullStop — SaaS Typography Playbook](https://fullstop360.com/blog/saas-typography-playbook-what-leading-companies-use), [fontalternatives.com — Geist vs Inter](https://fontalternatives.com/compare/geist-vs-inter/)

---

### Finding 12: Text Color Hierarchy — The 4-Tier System

- **The rule**: You need exactly 4 text color tiers plus semantic states. Use opacity-based variants of a single base color (not separate hex values per tier) so they adapt automatically to background changes.

**Light mode** (base: near-black on white):

| Tier | Color | Opacity | WCAG on white | Use |
|------|-------|---------|---------------|-----|
| Primary | `rgb(0 0 0 / 0.9)` | 90% | 18.4:1 (AAA) | Headlines, body text, important content |
| Secondary | `rgb(0 0 0 / 0.6)` | 60% | 10.4:1 (AAA) | Subtitles, navigation, metadata |
| Tertiary | `rgb(0 0 0 / 0.4)` | 40% | 6.6:1 (AA) | Placeholder text, timestamps, helper text |
| Disabled | `rgb(0 0 0 / 0.25)` | 25% | 3.8:1 (fail) | Disabled states (pair with other cues) |

**Dark mode** (base: near-white on dark):

| Tier | Color | Opacity | Use |
|------|-------|---------|-----|
| Primary | `rgba(255, 255, 255, 0.95)` | 95% | Headlines, body |
| Secondary | `rgba(255, 255, 255, 0.65)` | 65% | Subtitles, nav, metadata |
| Tertiary | `rgba(255, 255, 255, 0.45)` | 45% | Helpers, timestamps |
| Disabled | `rgba(255, 255, 255, 0.25)` | 25% | Disabled states |

**Structural** (borders/dividers): `rgb(0 0 0 / 0.08)` light, `rgb(255 255 255 / 0.08)` dark.

- **Why it works**: Opacity-based tiers maintain consistent contrast ratios regardless of the specific background shade. If you change your background from white to cream, the text contrast adjusts automatically. Separate hex values would need manual recalibration.
- **Implementation**:

```css
:root {
  --text-primary:     rgb(0 0 0 / 0.9);
  --text-secondary:   rgb(0 0 0 / 0.6);
  --text-tertiary:    rgb(0 0 0 / 0.4);
  --text-disabled:    rgb(0 0 0 / 0.25);
  --border-subtle:    rgb(0 0 0 / 0.06);
  --border-default:   rgb(0 0 0 / 0.08);
  --border-emphasis:  rgb(0 0 0 / 0.15);
}

:root[data-theme="dark"] {
  --text-primary:     rgba(255, 255, 255, 0.95);
  --text-secondary:   rgba(255, 255, 255, 0.65);
  --text-tertiary:    rgba(255, 255, 255, 0.45);
  --text-disabled:    rgba(255, 255, 255, 0.25);
  --border-subtle:    rgba(255, 255, 255, 0.04);
  --border-default:   rgba(255, 255, 255, 0.08);
  --border-emphasis:  rgba(255, 255, 255, 0.12);
}
```

Linear uses exactly this pattern (see Finding 12's evidence).

- **Evidence**: [Blake Crosley — Color Science for Interface Designers](https://blakecrosley.com/blog/color-science-interfaces), [Stylus UI — Color Tokens](https://stylus.design/tokens/color/), Linear design system (`--text-primary: rgba(255, 255, 255, 0.95)`)

---

## COLOR

### Finding 13: Color Palette Construction — Radix 12-Step vs. Tailwind 11-Step

- **The rule**: There are two dominant approaches. Pick one and stick with it.

**Approach A — Tailwind's 50–950 scale** (11 steps per hue):
- Numbers represent lightness: 50 is lightest, 950 is darkest
- Each step is a standalone hex value
- 22 built-in color families (slate, gray, zinc, neutral, stone, red, orange, etc.)
- Generate custom scales from a single base color using tools like [Tailwind Palette Generator](https://www.txtoolbox.com/tool/tailwind-palette-generator)
- Good for: simple projects, small teams, quick iteration

**Approach B — Radix Colors** (12 steps per hue, semantic):
Every step has a predefined role:

| Step | Role | Example use |
|------|------|-------------|
| 1 | App background | `<body>` bg |
| 2 | Subtle background | Card bg, sidebar bg |
| 3 | UI element bg (normal) | Button bg, input bg |
| 4 | UI element bg (hover) | Button hover |
| 5 | UI element bg (active) | Button pressed, selected row |
| 6 | Subtle border | Card border, separator |
| 7 | UI element border | Input border, checkbox border |
| 8 | Hovered border | Input focus ring |
| 9 | Solid bg (purest chroma) | Badges, tags, brand elements |
| 10 | Solid bg (hover) | Badge hover |
| 11 | Low-contrast text | Secondary text on step 1–2 bg |
| 12 | High-contrast text | Primary text on step 1–2 bg |

Radix guarantees APCA Lc 60 (step 11) and Lc 90 (step 12) on step-2 backgrounds.

- **How many hues**: A minimal product needs 3: one **neutral** (gray/slate), one **brand/accent** (blue, indigo, etc.), one **destructive** (red). Most products settle on 5–6: neutral + brand + success (green) + warning (amber) + error (red) + info (blue).
- **Implementation**:

```js
// Radix with Tailwind v4 (CSS variables)
@import "@radix-ui/colors/gray.css";
@import "@radix-ui/colors/blue.css";
@import "@radix-ui/colors/red.css";
@import "@radix-ui/colors/green.css";
@import "@radix-ui/colors/amber.css";

// These auto-provide --gray-1 through --gray-12, etc.
// Dark mode variants swap automatically with the dark class
```

```js
// Tailwind approach — custom brand palette
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',  // Primary accent
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
      },
    },
  },
};
```

- **Evidence**: [Radix Colors — Understanding the Scale](https://radix-ui.com/colors/docs/palette-composition/understanding-the-scale), [Tailwind CSS — Colors](https://tailwindcss.com/docs/customizing-colors/), [Radix — Composing a Palette](https://radix-ui.com/colors/docs/palette-composition/composing-a-palette)

---

### Finding 14: Semantic State Colors — Exact Accessible Values

- **The rule**: Success, warning, error, and info need distinct hues with enough contrast to meet WCAG AA (4.5:1 for text, 3:1 for large text and UI components). Here are production-ready values:

**Light mode**:

| State | Background | Border | Text | Hex (primary) |
|-------|------------|--------|------|---------------|
| **Success** | `#ECFDF5` | `#6EE7B7` | `#065F46` | `#10B981` (green-500) |
| **Warning** | `#FFFBEB` | `#FCD34D` | `#92400E` | `#F59E0B` (amber-500) |
| **Error** | `#FEF2F2` | `#FCA5A5` | `#991B1B` | `#EF4444` (red-500) |
| **Info** | `#EFF6FF` | `#93C5FD` | `#1E40AF` | `#3B82F6` (blue-500) |

**WCAG contrast verification** (text color on white):
- `#065F46` on white = 8.9:1 (AAA) ✓
- `#92400E` on white = 6.3:1 (AA) ✓
- `#991B1B` on white = 8.1:1 (AAA) ✓
- `#1E40AF` on white = 8.3:1 (AAA) ✓

**Rules**:
- Never rely on color alone — always pair with icons (checkmark, triangle, X, info circle) and text labels
- The "500" shade works for icons, badges, and solid backgrounds
- Use lighter shades (50–100) for background fills
- Use darker shades (700–900) for text on light backgrounds
- Re-validate all semantic colors in dark mode (they may need desaturation and lightness adjustment)

- **Implementation**:

```css
:root {
  --success-bg: #ECFDF5;   --success-border: #6EE7B7;   --success-text: #065F46;
  --warning-bg: #FFFBEB;   --warning-border: #FCD34D;   --warning-text: #92400E;
  --error-bg:   #FEF2F2;   --error-border:   #FCA5A5;   --error-text:   #991B1B;
  --info-bg:    #EFF6FF;    --info-border:    #93C5FD;   --info-text:    #1E40AF;
}
```

- **Evidence**: [USWDS — State Color Tokens](https://designsystem.digital.gov/design-tokens/color/state-tokens), [Tailwind CSS default colors](https://tailwindcss.com/docs/customizing-colors/), Linear status colors

---

### Finding 15: Dark Mode — Not Inversion, but Remapping

- **The rule**: Dark mode requires independent color calibration, not flipping light to dark.

**Key changes from light mode**:

| Property | Light mode | Dark mode | Why |
|----------|------------|-----------|-----|
| Background | `#FFFFFF` | `#0D1117` to `#0F172A` (NOT `#000000`) | Pure black causes halation (text bleeds/glows) |
| Text | `#111827` (gray-900) | `#E5E7EB` (gray-200), not pure white | Pure white on dark is too harsh for sustained reading |
| Accent colors | Full saturation | Reduce saturation 15–25%, increase lightness | Saturated colors "glow" on dark backgrounds |
| Elevation | Darker shadows = higher | Lighter surfaces = higher | Shadows invisible on dark bg; lighter surface catches light |
| Borders | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.06–0.08)` | Much subtler in dark mode |

**Surface elevation in dark mode** (use instead of shadows):

```css
:root[data-theme="dark"] {
  --surface-0: #0D1117;   /* App bg, L:7% */
  --surface-1: #161B22;   /* Sidebar, L:11% */
  --surface-2: #1C2128;   /* Cards, panels, L:15% */
  --surface-3: #22272E;   /* Dropdowns, popovers, L:18% */
  --surface-4: #2D333B;   /* Modals, L:22% */
  --surface-5: #373E47;   /* Tooltips, L:26% */
}
```

**Accent color adjustment example**:
```css
/* Light mode */
--accent: oklch(0.55 0.2 260);    /* Vibrant blue */

/* Dark mode — lower chroma, higher lightness */
--accent: oklch(0.70 0.15 260);   /* Softer blue */
```

Linear uses LCH (perceptually uniform) for their theme system. They generate dark-mode tokens from the same three inputs (base color, accent, contrast) but with inverted lightness mapping.

- **Why it works**: Human perception is non-linear. What looks like a medium gray at L:50% in light mode doesn't translate to L:50% in dark mode. Perceptual color spaces (OKLCH, LCH) handle this better than HSL. Pure black backgrounds create an "OLED glow" effect that strains eyes; warm near-blacks (with slight blue or warm tint) feel more natural.
- **Evidence**: [SeedFlip — Dark Mode Color System](https://seedflip.co/blog/dark-mode-color-system), [ColorArchive — Dark Mode Color Design Guide](https://colorarchive.me/guides/dark-mode-color-design-guide/), Linear LCH-based theme system

---

### Finding 16: Brand Color Distribution — The 60-30-10 Rule in Practice

- **The rule**: Distribute your three color roles by visual surface area:
  - **60% Dominant (Neutral)**: Background, page canvas, whitespace. Soft white (`#FAFAFA`–`#FFFFFF`) or near-black in dark mode. This is the breathing room.
  - **30% Secondary (Structure)**: Navigation, sidebars, headers, containers, cards, borders. Professional neutral with slight character — slate-600 (`#475569`), zinc-200 (`#E4E4E7`), etc.
  - **10% Accent (Action)**: Buttons, links, selected states, badges, active indicators. This is your brand color. Reserve it exclusively for things users should click or notice.

  **The 10% constraint is critical**: if brand color appears everywhere, nothing stands out. If it only appears on CTAs and active states, those elements command attention via the [Von Restorff isolation effect](https://en.wikipedia.org/wiki/Von_Restorff_effect).

- **Why it works**: Users form interface judgments in 50ms. Too much color = chaos. Too little = sterile. 60-30-10 creates balance: the dominant color calms, the secondary orients, the accent activates.
- **Implementation**:

```css
:root {
  /* 60% — The canvas */
  --bg-primary:   #FFFFFF;
  --bg-secondary: #F9FAFB;   /* gray-50 */

  /* 30% — The structure */
  --bg-tertiary:  #F3F4F6;   /* gray-100 — cards, wells */
  --text-primary: #111827;   /* gray-900 */
  --border:       #E5E7EB;   /* gray-200 */

  /* 10% — The action */
  --accent:       #4F46E5;   /* indigo-600 — buttons, links */
  --accent-hover: #4338CA;   /* indigo-700 */
  --accent-light: #EEF2FF;   /* indigo-50 — selected states bg */
}
```

In practice: white backgrounds → gray/slate chrome → indigo/blue CTAs. This is the Stripe, Linear, Vercel, Notion pattern.

- **Evidence**: [sixtythirtyten.co — 60-30-10 Rule Guide](https://www.sixtythirtyten.co/blog/60-30-10-rule-complete-guide), [InkBot Design — Web Design Colours](https://inkbotdesign.com/web-design-colours/)

---

## CHEAT SHEET: Complete Design Token Set

For a React/Next.js/Tailwind product, here's the minimal complete token set that covers all of the above:

```css
:root {
  /* ===== SHADOWS ===== */
  --shadow-color: 220deg 3% 15%;
  --shadow-xs:    0 1px 2px hsl(var(--shadow-color) / 0.15);
  --shadow-sm:    0.5px 1px 1px hsl(var(--shadow-color) / 0.36);
  --shadow-md:    1px 2px 2px hsl(var(--shadow-color) / 0.2),
                  2px 4px 4px hsl(var(--shadow-color) / 0.2),
                  3px 6px 6px hsl(var(--shadow-color) / 0.2);
  --shadow-lg:    1px 2px 2px hsl(var(--shadow-color) / 0.13),
                  2px 4px 4px hsl(var(--shadow-color) / 0.13),
                  4px 8px 8px hsl(var(--shadow-color) / 0.13),
                  8px 16px 16px hsl(var(--shadow-color) / 0.13);
  --shadow-xl:    1px 2px 2px hsl(var(--shadow-color) / 0.1),
                  2px 4px 4px hsl(var(--shadow-color) / 0.1),
                  4px 8px 8px hsl(var(--shadow-color) / 0.1),
                  8px 16px 16px hsl(var(--shadow-color) / 0.1),
                  16px 32px 32px hsl(var(--shadow-color) / 0.1);

  /* ===== TYPOGRAPHY ===== */
  --font-sans:  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:  "Geist Mono", "JetBrains Mono", "Fira Code", monospace;

  --text-xs:    0.75rem;    /* 12px, line-height: 1.33 */
  --text-sm:    0.875rem;   /* 14px, line-height: 1.43 */
  --text-base:  1rem;       /* 16px, line-height: 1.5  */
  --text-lg:    1.125rem;   /* 18px, line-height: 1.56 */
  --text-xl:    1.25rem;    /* 20px, line-height: 1.4  */
  --text-2xl:   1.5rem;     /* 24px, line-height: 1.33 */
  --text-3xl:   1.875rem;   /* 30px, line-height: 1.2  */
  --text-4xl:   2.25rem;    /* 36px, line-height: 1.11 */
  --text-5xl:   3rem;       /* 48px, line-height: 1.0  */

  --tracking-tight:   -0.025em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-caps:    0.08em;

  /* ===== TEXT COLORS ===== */
  --text-primary:   rgb(0 0 0 / 0.9);
  --text-secondary: rgb(0 0 0 / 0.6);
  --text-tertiary:  rgb(0 0 0 / 0.4);
  --text-disabled:  rgb(0 0 0 / 0.25);

  /* ===== BORDERS ===== */
  --border-subtle:   rgb(0 0 0 / 0.06);
  --border-default:  rgb(0 0 0 / 0.08);
  --border-emphasis: rgb(0 0 0 / 0.15);

  /* ===== SURFACES ===== */
  --bg-primary:   #FFFFFF;
  --bg-secondary: #F9FAFB;
  --bg-tertiary:  #F3F4F6;
  --bg-inverse:   #111827;

  /* ===== ACCENT (10% of UI) ===== */
  --accent-50:  #EEF2FF;
  --accent-500: #6366F1;
  --accent-600: #4F46E5;
  --accent-700: #4338CA;

  /* ===== SEMANTIC ===== */
  --success-bg: #ECFDF5;  --success: #10B981;  --success-text: #065F46;
  --warning-bg: #FFFBEB;  --warning: #F59E0B;  --warning-text: #92400E;
  --error-bg:   #FEF2F2;  --error:   #EF4444;  --error-text:   #991B1B;
  --info-bg:    #EFF6FF;  --info:    #3B82F6;  --info-text:    #1E40AF;
}

/* ===== DARK MODE ===== */
:root[data-theme="dark"] {
  --shadow-color: 220deg 5% 5%;

  --text-primary:   rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-tertiary:  rgba(255, 255, 255, 0.45);
  --text-disabled:  rgba(255, 255, 255, 0.25);

  --border-subtle:   rgba(255, 255, 255, 0.04);
  --border-default:  rgba(255, 255, 255, 0.08);
  --border-emphasis: rgba(255, 255, 255, 0.12);

  --bg-primary:   #0D1117;
  --bg-secondary: #161B22;
  --bg-tertiary:  #1C2128;
  --bg-inverse:   #F9FAFB;

  /* Desaturated accent for dark mode */
  --accent-50:  #1E1B4B;
  --accent-500: #818CF8;
  --accent-600: #6366F1;
  --accent-700: #4F46E5;
}
```

---

## Sources

| Source | URL |
|--------|-----|
| Tailwind CSS — Box Shadow | https://tailwindcss.com/docs/box-shadow |
| Tailwind CSS — Font Size | https://tailwindcss.com/docs/font-size/ |
| Tailwind CSS — Colors | https://tailwindcss.com/docs/customizing-colors/ |
| Josh Comeau — Designing Beautiful Shadows | https://www.joshwcomeau.com/css/designing-shadows/ |
| Josh Comeau — Shadow Palette Generator | https://www.joshwcomeau.com/shadow-palette/ |
| Tobias Ahlin — Layered Box Shadows | https://tobiasahlin.com/blog/layered-smooth-box-shadows/ |
| Radix Colors — Understanding the Scale | https://radix-ui.com/colors/docs/palette-composition/understanding-the-scale |
| Radix Colors — Aliasing | https://radix-ui.com/colors/docs/overview/aliasing |
| Material Design 3 — Elevation Tokens | https://m3.material.io/styles/elevation/tokens |
| Atlassian Design — Elevation | https://atlassian.design/foundations/elevation/ |
| USWDS — State Color Tokens | https://designsystem.digital.gov/design-tokens/color/state-tokens |
| SeedFlip — Dark Mode Color System | https://seedflip.co/blog/dark-mode-color-system |
| Parker.mov — Good Dark Mode Shadows | https://www.parker.mov/notes/good-dark-mode-shadows |
| Cloudscape Design — Visual Style | https://cloudscape.design/foundation/visual-foundation/visual-style |
| FontFYI — Building a Type Scale | https://fontfyi.com/blog/building-type-scale-design-system/ |
| FontFYI — Font Weights Explained | https://fontfyi.com/blog/understanding-font-weights/ |
| Vercel — Geist Design System | https://www.vercel.com/geist/introduction |
| FullStop — SaaS Typography Playbook | https://fullstop360.com/blog/saas-typography-playbook-what-leading-companies-use |
| MDN — line-height | https://developer.mozilla.org/en-US/docs/Web/CSS/line-height |
| Blake Crosley — Color Science for Interfaces | https://blakecrosley.com/blog/color-science-interfaces |
| sixtythirtyten.co — 60-30-10 Rule | https://www.sixtythirtyten.co/blog/60-30-10-rule-complete-guide |
| Linear Design System (reverse-engineered) | /outputs/research/linear-design-system-reverse-engineered.md |
