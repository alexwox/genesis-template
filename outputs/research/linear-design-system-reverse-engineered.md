# Linear Design System — Reverse Engineered

> A comprehensive teardown of Linear's design system, distilled from their brand guidelines, engineering blog posts, the March 2024 redesign, the March 2026 UI refresh, reverse-engineered code analysis (by Tomas Pustelnik), and third-party reconstructions.

---

## 1. Design Philosophy

Linear's design system flows from five core beliefs articulated by co-founder/CEO Karri Saarinen:

1. **Productivity comes from builders** — management is secondary; tools should serve the maker.
2. **Honesty and authenticity** — no performative branding; people see through posturing.
3. **Tools should be serious and purpose-built** — free people for actual work, not tool management.
4. **Quality matters as much as functionality** — every pixel is intentional across every touchpoint.
5. **Software should be a craft, not a factory** — deliberate, opinionated decisions over committee consensus.

These beliefs produce three operational design principles:

| Principle | Meaning |
|---|---|
| **Don't compete for attention you haven't earned** | Navigation, chrome, and supporting UI recede. Primary content takes focus. |
| **Structure should be felt, not seen** | Borders, separators, and hierarchy cues are present but never loud. |
| **Density without overwhelm** | Surface exactly what users need when they need it. Dense yet calm. |

Saarinen explicitly rejects playfulness in Linear's brand because the product deals with serious matters (security vulnerabilities, server incidents, production workflows). The aesthetic is **serious, exact, and crafted**.

---

## 2. Color System

### 2.1 Brand Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| **Linear Blue** | Subtle desaturated blue | — | Backgrounds, brand surfaces |
| **Mercury White** | `#F4F5F8` | 244, 245, 248 | Light wordmark, light-mode accents |
| **Nordic Gray** | `#222326` | 35, 35, 38 | Dark wordmark, dark-mode accents |

Monochrome wordmark usage is preferred. The brand blue is reserved for backgrounds, not for UI chrome.

### 2.2 Theme Generation System (LCH-based)

Linear rebuilt their color system using the **LCH (Lightness, Chroma, Hue) color space** instead of HSL. LCH is perceptually uniform — a red and yellow at lightness 50 appear equally light to the human eye, producing more consistent theme generation.

The entire theme is derived from **three inputs**:
- **Base color** (hue of the UI chrome)
- **Accent color** (interactive highlights)
- **Contrast** (0–100 scale controlling the spread between surface levels)

This means 98+ design tokens are auto-generated from just three values. The contrast variable also enables high-contrast accessibility themes automatically.

### 2.3 Surface Hierarchy (Dark Mode)

Linear uses progressive lightness elevation for surface layers. Approximate values from the shadcn reconstruction:

| Token | Lightness | Role |
|---|---|---|
| `--background` | ~12% | Deepest base layer |
| `--card` / `--muted` | ~15% | Slightly elevated surfaces |
| `--input` | ~17% | Input field borders |
| `--secondary` | ~19% | Secondary buttons, tracks |
| `--accent` | ~22% | Hover and focus states |
| `--border` | ~26% | General borders |

### 2.4 Text Opacity Layers (Dark Mode)

```css
--text-primary:   rgba(255, 255, 255, 0.95);
--text-secondary:  rgba(255, 255, 255, 0.65);
--text-tertiary:   rgba(255, 255, 255, 0.45);

--border-default:  rgba(255, 255, 255, 0.08);
--border-hover:    rgba(255, 255, 255, 0.12);
```

In light mode, these invert to black-based opacity scales. The 2024 redesign deliberately pushed text and icon contrast higher: darker text in light mode, lighter text in dark mode.

### 2.5 Semantic Status Colors

| Status | Color | Hex (approx) |
|---|---|---|
| Backlog | Gray | `#6B7280` |
| Todo | Blue | `#3B82F6` |
| In Progress | Amber | `#F59E0B` |
| Done | Green | `#10B981` |
| Cancelled | Red | `#EF4444` |

### 2.6 Priority Colors

| Priority | Color | Hex (approx) |
|---|---|---|
| Urgent | Red | `#EF4444` |
| High | Orange | `#F97316` |
| Medium | Yellow | `#EAB308` |
| Low | Gray | `#6B7280` |
| None | Dark Gray | `#374151` |

### 2.7 Design Evolution (2024 → 2026)

The 2024 redesign shifted from a cool, blue-ish hue palette toward **warmer neutral grays** that feel crisp but less saturated. The 2026 refresh continued this trajectory, pushing the sidebar dimmer and reducing chrome saturation to let content dominate.

---

## 3. Typography

### 3.1 Font Stack

```css
font-family: "Inter UI", "SF Pro Display", -apple-system, system-ui,
  "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
  "Open Sans", "Helvetica Neue", sans-serif;
```

- **Inter** is the primary typeface everywhere
- **Inter Display** was adopted in the 2024 redesign for headings to add expression while maintaining readability
- **SF Pro Display** is the first fallback on Apple systems

### 3.2 Type Scale

Linear uses a deliberately tight scale — smaller than typical SaaS products, optimized for information density:

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-xs` | 11px | 400–600 | Metadata, timestamps, labels |
| `--text-sm` | 12px | 400–500 | Secondary text, descriptions |
| `--text-base` | 13px | 400 | Body text (notably smaller than the web standard 16px) |
| `--text-lg` | 14px | 500–600 | Emphasis, subheadings |
| `--text-xl` | 16px | 600 | Section headings |
| `--text-2xl` | 20px | 600–700 | Page titles |

Marketing / landing page scale extends further:
| Class | Size | Weight | Usage |
|---|---|---|---|
| `.header-1` | 12px | 600 | Uppercase section labels (tracked out) |
| `.header-2` | 62px | 800 | Hero headlines |
| `.content-1` | 20px | 400 | Large body copy |
| `.content-2` | 15px | 400 | Standard body |
| `.content-3` | 14px | 600 | Bold body / labels |

### 3.3 Typography Principles

- **13px body text** is the defining choice — high density, high readability at close viewing distances
- Line height is tight (~1.4–1.5) to maintain density
- Letter-spacing is neutral for body, slightly tracked for uppercase labels
- Font weight creates hierarchy more than size changes

---

## 4. Spacing & Layout

### 4.1 Layout Architecture

Linear's app uses what Saarinen calls the **"inverted L-shape"** — a sidebar + top header that frames the main content area. This chrome controls all content routing.

```
┌──────┬────────────────────────────────────────────────┐
│      │  Header (title / tabs / side actions)          │
│  S   ├────────────────────────────────────────────────┤
│  i   │                                                │
│  d   │               Main Content                     │
│  e   │                                                │
│  b   │                                                │
│  a   │                                                │
│  r   │                                                │
│      │                                                │
└──────┴────────────────────────────────────────────────┘
```

### 4.2 Spacing Scale

Linear doesn't publish an explicit spacing scale, but observed patterns suggest a **4px base unit** with common stops:

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Inline gaps, icon padding |
| `space-2` | 8px | Element internal padding, tight gaps |
| `space-3` | 12px | Standard list item padding |
| `space-4` | 16px | Section padding, card gutters |
| `space-6` | 24px | Panel margins, group separators |
| `space-8` | 32px | Major section breaks |

### 4.3 Border Radius

Post-2026 refresh, Linear rounds edges more aggressively:
- **Buttons / inputs / small elements**: 6px
- **Cards / panels**: 8px
- **Modals / dialogs**: 12px
- **Tabs**: Rounded (pill-like) — a change from the sharper pre-2026 tabs
- **App icon**: Continuous corner radius (squircle)

### 4.4 Sidebar Design

The 2026 refresh deliberately dims the sidebar a few notches below the main content area. The sidebar is a navigation destination, not a persistent attention-stealer. Once you've arrived, it recedes.

Sidebar alignment is meticulous — icons, labels, and buttons are aligned both vertically and horizontally across all elements.

---

## 5. Iconography

### 5.1 Icon System

- Linear uses a **custom icon set** — purpose-built, not off-the-shelf
- All icons were **redrawn and resized** in the March 2026 refresh
- Icons are used to make projects, issues, initiatives, and statuses recognizable at a glance
- The 2026 refresh **reduced icon usage** and scaled their sizes down
- Colored team icon backgrounds were removed in favor of cleaner treatments

### 5.2 Icon Principles

| Principle | Application |
|---|---|
| Functional over decorative | Every icon serves navigation or status communication |
| Consistent stroke weight | Unified across all contexts |
| Size-appropriate detail | Smaller sizes use simpler forms |
| Color reserved for status | Most icons are monochrome; color indicates state |

---

## 6. Motion & Animation

### 6.1 Core Motion Values

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  --duration-fast: 100ms;    /* Micro feedback: hovers, presses */
  --duration-normal: 150ms;  /* Standard transitions: color, opacity */
  --duration-slow: 250ms;    /* Page transitions, panel reveals */
}
```

### 6.2 Motion Principles

1. **Speed is a feature** — sub-100ms interactions create an emotional response of immediacy
2. **Optimistic UI** — local state updates instantly, sync happens in the background; loading states are invisible whenever possible
3. **Subtle elevation** — issue cards lift ~1px on hover with a soft shadow bloom
4. **Physics-based drag** — drag-and-drop uses DnD Kit with smooth, physics-based motion
5. **No blocking animations** — the user is never waiting for an animation to complete before acting

### 6.3 Micro-Interaction Catalog

| Interaction | Behavior |
|---|---|
| Card hover | `translateY(-1px)` + shadow expansion |
| Status change | Subtle color crossfade over 150ms |
| Checkbox toggle | Satisfying click feedback with state fill |
| Panel open/close | Slide with ease-out, 200–250ms |
| Command palette | Fade + scale from ~0.95 to 1.0, ~150ms |
| Tab switch | Indicator slides with spring-like ease |
| Sidebar collapse | Width transition with content fade |

---

## 7. Component Patterns

### 7.1 Header

The header has four anatomical parts:

1. **Title** — context-aware breadcrumbs showing navigation path
2. **Tabs** — custom views, filters; break to next line on smaller screens
3. **Side** — icon buttons with quick actions (right-aligned)
4. **Subheader** (optional) — filters, display controls

The header uses a `ResponsiveSlot` system that goes beyond CSS breakpoints: it calculates available space via resize observers and hides lower-priority content first when space is constrained. Each slot registers with a priority, and a MobX store manages visibility reactively.

### 7.2 Tab System

Tabs use an intelligent overflow pattern:
- Tabs that won't fit are hidden with `visibility: hidden` (not `display: none`) to prevent layout shift
- A "more" button appears showing the count of hidden tabs
- If the active tab is hidden, its label replaces the count on the trigger
- Tabs support inline drag-and-drop reordering via DnD Kit
- Tab calculation accounts for the active tab width, ensuring it's always visible

### 7.3 Command Palette (Cmd+K)

The universal entry point for all actions:
- Fuzzy search across issues, projects, teams, and commands
- Recent items section at top
- Grouped command sections with mnemonic keyboard shortcuts
- Shortcuts are discoverable: shown next to each action
- Progressive learning: users discover shortcuts through the palette, then skip it

Key shortcuts follow mnemonic patterns:
| Shortcut | Action |
|---|---|
| `C` | Create new issue |
| `S` | Set status |
| `P` | Set priority |
| `A` | Assign |
| `Cmd+K` | Open command palette |
| `Cmd+O` | Open issue |

### 7.4 Context Menus

Right-click menus are contextual — they show exactly the actions relevant to the clicked element, with keyboard shortcuts visible on each row.

### 7.5 Inline Editing

Linear prefers inline editing over modal dialogs. Click a title, and the cursor appears in-place. No modal, no separate view, no navigation.

### 7.6 Issue List

The issue list is the heart of Linear's UI and demonstrates their density philosophy:
- Only essential metadata at the list level (ID, title, assignee, priority, status)
- Icons and symbols replace text labels
- Detail revealed on hover/selection
- Progressive disclosure on demand (expand, side panel, full view)

### 7.7 Tooltips & Popovers

- Tooltips appear on hover with minimal delay
- Popovers contain structured content (selectors, small forms)
- Both use the same border radius and shadow system as the elevated surface tier

---

## 8. Responsive Design

### 8.1 Beyond Breakpoints

Linear runs on Electron (macOS, Windows) and in any browser. The responsive strategy combines:

1. **Traditional CSS media queries** — for major layout shifts
2. **React `matchMedia` hooks** — for conditional rendering
3. **`ResponsiveSlot` component** — for content-aware progressive disclosure

The `ResponsiveSlot` pattern is particularly notable:
- Each slot has a `priority` prop
- A `ResponsiveSlotContainer` uses ResizeObservers to measure available space
- When space shrinks, lower-priority slots render `null`
- This works like container queries but with semantic priority ordering

### 8.2 Cross-Platform Considerations

- macOS, Windows, and browser all share the same layout system
- Navigation buttons (back/forward) are removable for browser context
- Native app chrome adapts per platform (traffic lights on macOS, title bar on Windows)

---

## 9. State Management

### 9.1 MobX Architecture

Linear uses **MobX** for state management with a distinctive pattern: **small, local, purpose-specific stores** rather than large global state.

Example from the header:
```jsx
function createResponsiveSlotManager() {
  const manager = {
    names: [],
    slots: new Map(),
    visibility: new Map(),
    isVisible(name) {
      return manager.slots.get(name)?.visible;
    },
  };

  return makeObservable(manager, {
    names: observable,
    slots: observable.deep,
    visibility: observable,
  });
}
```

Stores are created via factory functions, saved in React context, and scoped to the component subtree that needs them. Benefits:
- No state leakage
- Easy to reason about
- MobX reactivity where needed without global coupling

### 9.2 Optimistic Updates

```
1. Update local state immediately
2. Show success state to the user
3. Sync with server in background
4. Rollback only on actual failure
```

This pattern is fundamental to Linear feeling "instant" — network latency is hidden from the user experience.

---

## 10. Performance as Design

Speed is not a metric at Linear — it's a design feature. Their approach:

| Strategy | Implementation |
|---|---|
| **Local-first architecture** | Client-side state is the source of truth during interaction |
| **Optimistic UI** | Assume success, only show errors on actual failure |
| **Aggressive caching** | Minimize network requests |
| **Minimal loading states** | Skeleton screens only when truly necessary |
| **No blocking** | Users are never waiting for an animation or network call to proceed |

> "If something takes 300ms, it feels broken." — Linear team

---

## 11. Dark Mode Strategy

Linear is **dark-first**. Dark mode is the primary design target, not an afterthought.

Why:
- **Power user alignment** — users spend long hours in the product
- **Premium aesthetic** — differentiates from typical enterprise software
- **Color vibrancy** — status and priority colors pop against dark surfaces
- **Developer tooling aesthetic** — aligns with the audience's existing environment

Light mode exists as an override. Custom themes allow user personalization.

The 2024 redesign moved the default dark palette from a cool blue-ish hue toward **warmer neutral grays** — crisp but less saturated. The 2026 refresh continued this direction.

---

## 12. Brand Voice & Messaging

### 12.1 Voice Characteristics

| Trait | Meaning | Example |
|---|---|---|
| **Serious** | Not playful or whimsical; the product handles critical workflows | "Ship faster with purpose-built tools" not "Let's have fun managing bugs!" |
| **Exact** | Precise language, no vagueness | "Sub-100ms interactions" not "really fast" |
| **Crafted** | Every word is intentional | Minimal copy, high information density |
| **Confident** | Opinionated without arrogance | "Software should be opinionated and fast" |
| **Understated** | Let the product speak; don't oversell | Changelog entries are factual, not hype-driven |

### 12.2 Anti-Voice

Linear avoids:
- Corporate jargon ("synergy," "leverage," "ecosystem")
- Playful/casual tone ("let's get started!", emoji-heavy copy)
- Over-explaining (trust the user's intelligence)
- Marketing superlatives ("revolutionary," "game-changing")

### 12.3 Naming Conventions

- "Linear" — capital L, single word, never "Linear app"
- Dedicated releases are capitalized as proper nouns (e.g., "Linear Method")
- Feature names are descriptive and direct

---

## 13. Logo & Brand Mark

### 13.1 Variants

| Variant | Usage |
|---|---|
| **Wordmark** | Primary; all references where space allows |
| **Logomark** | Tight layouts, logo grids; less brand recognition than wordmark |
| **Icon** | Social media, chip designs; uses stylized mark with corner radius |

### 13.2 Rules

- Monochrome usage is preferred
- Give generous whitespace around all brand assets
- Do not alter, combine with other graphics, or imply endorsement
- Brand blue is for backgrounds; wordmark is Mercury White or Nordic Gray

---

## 14. What Makes Linear's Design System Exceptional

### 14.1 Principles That Transfer to Any Product

1. **Speed is design** — performance is not engineering's job alone; it's a first-class design decision
2. **Dark-first earns premium perception** — especially for power-user products
3. **13px body text works** — information density beats generous whitespace for productivity tools
4. **Keyboard-first, mouse-friendly** — serve experts without blocking beginners
5. **Icons over labels** — symbols compress information; reveal text on hover
6. **LCH color space** — perceptually uniform color generation produces better themes than HSL
7. **Three-input theme generation** — base color + accent + contrast produces an entire token system
8. **Local MobX stores** — scoped reactive state beats global stores for component-level concerns
9. **ResponsiveSlot over breakpoints** — content-aware priority hiding beats viewport-based rules
10. **Optimistic UI is the default** — never make users wait for network confirmation

### 14.2 The Invisible Quality

From the 2026 refresh blog post:

> "If most people don't immediately notice what changed, that's probably a good sign. Just as Linear's users rarely think about the bugs they never hit, the paper cuts that were smoothed away, or the performance issues that never slow them down — most of what makes software feel good is what you aren't likely to see."

This philosophy — that great design is invisible — is the meta-principle that ties everything together. Linear doesn't draw attention to its design system. It draws attention to your work.

---

## Sources

- [Linear Brand Guidelines](https://linear.app/docs/brand-guidelines)
- [How we redesigned the Linear UI (Part II)](https://linear.app/now/how-we-redesigned-the-linear-ui) — March 2024
- [A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh) — March 2026
- [Reverse engineering Linear - Part 1: Header](https://pustelto.com/blog/reverse-engineer-linear-1-header/) — Tomas Pustelnik, September 2025
- [Linear: The New Standard for Software Design](https://blakecrosley.com/en/guides/design/linear) — Blake Crosley
- [Karri Saarinen on LinkedIn](https://www.linkedin.com/posts/karrisaarinen_true-brands-dont-come-from-brand-excesses-activity-7293749007191851008-jIiM) — brand philosophy post
- [marvkr/linear-shadcn](https://github.com/marvkr/linear-shadcn) — community shadcn reconstruction
