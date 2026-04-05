# Lane 2: Animation & Motion Design — Implementable Specifications

> Research compiled from Material Design 3 motion tokens, Apple HIG, SmoothUI, Josh Comeau's linear() guide, Ruixen's spring migration case study, baraa.app's easing-as-language framework, web.dev compositing guides, and reverse-engineered patterns from Linear, Stripe, and Vercel.

---

## Finding 1: The Decision Framework — When to Animate vs. Stay Instant

- **The rule**: Animate when motion serves one of four functions: (1) **feedback** — confirming a user action was received, (2) **guidance** — directing attention to what changed, (3) **continuity** — showing spatial relationship between states, (4) **status** — communicating loading, success, or failure. If motion doesn't serve one of these, make it instant (`duration: 0`).
- **What should be instant**: Text content changes, data updates in tables, filter results appearing, form validation messages appearing (the *message* appears instantly; the *container* can animate), navigation within the same view hierarchy when context is preserved.
- **What should animate**: State toggles (on/off), element entrances/exits, hover/focus feedback, modals opening/closing, content loading transitions, drag-and-drop repositioning.
- **The 60/30/10 rule of motion**: 60% of your animations should use your workhorse ease-out curve. 30% should use secondary curves (snap for micro-interactions, ease-in for exits). 10% can be expressive — springs, overshoots, custom curves. This ratio keeps the UI calm while reserving energy for moments that matter.
- **Anti-test**: Mute all motion in your app by setting durations to 0. If you lose hierarchy, feedback, or spatial orientation, your motion is load-bearing and deserves design rigor. If nothing changes, you're decorating.
- **Why it works**: The human brain processes motion as a signal of causality. When an element animates after a click, the brain interprets "I caused that." Without the animation, the connection between action and result weakens. But gratuitous motion competes for the same attentional bandwidth, causing fatigue.
- **Evidence**: [baraa.app — Easing curves are a design language](https://www.baraa.app/blog/easing-curves-are-a-design-language), [SmoothUI Animation Best Practices](https://smoothui.dev/docs/guides/animation-best-practices)

---

## Finding 2: Duration Guidelines by Animation Category

- **The rule**: Duration is determined by what the animation is doing, not by preference. Specific ranges:

| Category | Duration | Examples |
|---|---|---|
| **Micro-interactions** | 100–200ms | Button press feedback, checkbox toggle, tab switch, focus ring |
| **Standard transitions** | 200–300ms | Dropdown open, tooltip appear, card hover effect, sidebar toggle |
| **Complex transitions** | 300–400ms | Modal open, page transition, panel slide, accordion expand |
| **Emphasis / dramatic** | 400–600ms | Hero entrance, onboarding reveal, first-time empty state |
| **Ambient / decorative** | Up to 1000ms | Background gradient shift, skeleton shimmer loop |

Specific element durations from production codebases:

| Element | Duration |
|---|---|
| Toast notification enter | 150ms |
| Modal entrance | 250ms |
| Card item appear | 200ms |
| Staggered list items | 200ms each, 50ms stagger |
| Page section reveal | 300ms |
| Hero content | 400ms |
| Toggle switch | 150ms |
| Dismiss / delete | 200ms |
| Page transition | 400ms |

- **Why it works**: Human perception has a 100ms threshold for "instant." Below 100ms, the brain perceives no delay. Between 100–300ms, the brain registers change but maintains a sense of flow. Between 300–1000ms, the brain perceives a distinct pause. Above 1000ms, attention breaks. These numbers map to the categories above.
- **The Linear standard**: "If something takes 300ms, it feels broken." — Linear team. Their entire UI philosophy treats speed as a design feature, not just an engineering metric.
- **Implementation**: Define duration tokens in your system:

```typescript
export const duration = {
  instant: "0ms",
  micro: "150ms",
  fast: "200ms",
  normal: "250ms",
  slow: "400ms",
  dramatic: "600ms",
} as const;
```

- **Evidence**: [SmoothUI Guide](https://smoothui.dev/docs/guides/animation-best-practices), [baraa.app](https://www.baraa.app/blog/easing-curves-are-a-design-language), [design.dev CSS Transitions Guide](https://design.dev/guides/css-transitions/)

---

## Finding 3: Easing Curve Vocabulary — Specific Values for Every Context

- **The rule**: Easing curves carry semantic meaning. Different interactions demand different curves. Here is the complete vocabulary with exact values:

| Curve Name | CSS Value | When to Use | Character |
|---|---|---|---|
| **Ease-out (respond/enter)** | `cubic-bezier(0, 0, 0.2, 1)` | Response to user input, element entrances | Fast start, gentle landing — feels responsive |
| **Ease-in (exit)** | `cubic-bezier(0.4, 0, 1, 1)` | Element exits, dismissals, deletions | Slow start, fast finish — receding |
| **Sharp snap** | `cubic-bezier(0.12, 0, 0.08, 1)` | Toggle switches, checkboxes, tab switches | Near-instant with subtle tail |
| **Announce (overshoot)** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Modal entrance, toast arrival, important state changes | Overshoots target, settles back |
| **Standard ease-in-out** | `cubic-bezier(0.65, 0, 0.35, 1)` | Element repositioning, state changes within view | Symmetric acceleration/deceleration |
| **Smooth ease-out** | `cubic-bezier(0.23, 1, 0.32, 1)` | General entering elements (SmoothUI default) | Fast initial response, long gentle tail |

**The Asymmetry Rule**: Entrances and exits must never use the same curve. Entrances use ease-out (fast-in, slow-out). Exits use ease-in (slow-in, fast-out). This mirrors physics — objects arrive with energy, leave with purpose.

- **Design system easing tokens** (semantic naming):

```typescript
export const easing = {
  respond: "cubic-bezier(0, 0, 0.2, 1)",       // user input response
  enter:   "cubic-bezier(0, 0, 0.2, 1)",       // element entrance
  exit:    "cubic-bezier(0.4, 0, 1, 1)",       // element exit
  announce:"cubic-bezier(0.34, 1.56, 0.64, 1)",// attention-worthy arrivals
  snap:    "cubic-bezier(0.12, 0, 0.08, 1)",   // toggles, binary states
  smooth:  "cubic-bezier(0.23, 1, 0.32, 1)",   // general ease-out
} as const;
```

- **Material Design 3 tokens** (for reference):

| Token | Cubic-Bezier | Duration |
|---|---|---|
| Standard fast effect | `(0.34, 0.80, 0.34, 1.00)` | 150ms |
| Standard default effect | `(0.34, 0.80, 0.34, 1.00)` | 200ms |
| Standard slow effect | `(0.34, 0.80, 0.34, 1.00)` | 300ms |
| Standard fast spatial | `(0.27, 1.06, 0.18, 1.00)` | 350ms |
| Standard default spatial | `(0.27, 1.06, 0.18, 1.00)` | 500ms |
| Emphasized fast spatial | `(0.42, 1.67, 0.21, 0.90)` | 350ms |
| Emphasized default spatial | `(0.38, 1.21, 0.22, 1.00)` | 500ms |

Note: MD3 distinguishes between "effects" (opacity, color) and "spatial" (position, size) animations, applying different curves to each.

- **Apple HIG**: Default animation duration is 0.35s. Spring-based physics with subtle rebounds. easeInOut is the system default.
- **Why it works**: Ease-out for entrances feels responsive because the element moves quickly right when the user acts, satisfying the expectation of immediate cause-and-effect. Ease-in for exits works because departing elements should clear the stage quickly — the user's attention is already moving to what comes next.
- **Evidence**: [baraa.app](https://www.baraa.app/blog/easing-curves-are-a-design-language), [m3.material.io/styles/motion](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs), [Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion)

---

## Finding 4: What to Animate (and What to Never Animate)

- **The rule**: Only animate properties handled by the GPU compositor thread: `transform` (translateX, translateY, scale, rotate) and `opacity`. Everything else triggers expensive layout or paint recalculations.

### Safe to animate (GPU-composited, ~0ms per frame)

| Property | Use Case |
|---|---|
| `opacity` | Fade in/out, hover dimming, disabled states |
| `transform: translateX/Y` | Slide entrances, repositioning, parallax |
| `transform: scale` | Hover grow, press shrink, entrance zoom |
| `transform: rotate` | Loading spinners, icon state changes |
| `filter: blur()` | Background blur transitions (use sparingly) |

### Dangerous to animate (triggers layout, 5–10ms+ per frame on complex DOMs)

| Property | Why It's Expensive | Use Instead |
|---|---|---|
| `width`, `height` | Triggers layout recalc for element + siblings | `transform: scale()` |
| `top`, `left`, `right`, `bottom` | Triggers layout | `transform: translate()` |
| `margin`, `padding` | Triggers layout cascade | `transform: translate()` with fixed dimensions |
| `border-width` | Triggers layout | `box-shadow` or `outline` |
| `font-size`, `font-weight` | Causes layout reflow per frame | Never animate |
| `border-radius` | Sub-pixel jitter with springs | Use CSS transitions only (no springs) |
| `box-shadow` | Triggers paint (not layout, but still expensive per-frame) | OK for hover with CSS transition, not for spring |

- **Frame budget**: At 60Hz you have 16.7ms per frame. At 120Hz, 8.33ms. A layout recalculation on a complex DOM consumes 5–10ms, leaving no budget for anything else. Transform/opacity stay well under 1ms.
- **`will-change` usage**: Apply `will-change: transform, opacity` only to elements that will animate within the next ~200ms. Do not leave it on permanently — each `will-change` element gets its own GPU layer, consuming VRAM. Add it on hover/focus, remove after animation completes.
- **Implementation**:

```css
/* Correct: animate only compositor properties */
.card {
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1),
              opacity 200ms cubic-bezier(0, 0, 0.2, 1),
              box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px) scale(1.01);
  opacity: 1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Wrong: animating layout properties */
.card:hover {
  height: 320px;     /* triggers layout */
  margin-top: -4px;  /* triggers layout */
  padding: 24px;     /* triggers layout */
}
```

- **Evidence**: [web.dev — Stick to Compositor-Only Properties](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/), [web.dev — Why are some animations slow?](https://web.dev/articles/animations-overview), [Browser Rendering Performance Guide 2026](https://abdallahzakzouk.com/blog/browser-rendering-performance-guide)

---

## Finding 5: Entry and Exit Animation Patterns — Exact Specifications

- **The rule**: The default entry animation for most UI elements is **fade + slide up**. The default exit is **fade + slide up (reversed)**. Scale is reserved for modals and popovers. Distance scales with element importance.

### Standard Entry Patterns

| Pattern | Use Case | Initial State | Final State | Duration | Easing |
|---|---|---|---|---|---|
| **Fade + slide up** | Cards, list items, content blocks | `opacity: 0, translateY(10px)` | `opacity: 1, translateY(0)` | 200ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| **Scale + fade** | Modals, popovers, dialogs | `opacity: 0, scale(0.95)` | `opacity: 1, scale(1)` | 250ms | spring: `duration: 0.25, bounce: 0.1` |
| **Slide from edge** | Sidebars, drawers, panels | `translateX(-100%)` | `translateX(0)` | 300ms | `cubic-bezier(0, 0, 0.2, 1)` |
| **Fade only** | Tooltips, subtle state changes | `opacity: 0` | `opacity: 1` | 150ms | `cubic-bezier(0, 0, 0.2, 1)` |
| **Scale from origin** | Dropdown menus, context menus | `opacity: 0, scale(0.9), transformOrigin: top` | `opacity: 1, scale(1)` | 200ms | `cubic-bezier(0.23, 1, 0.32, 1)` |

### Exit Patterns

Exits are asymmetric to entrances — faster and use ease-in:

| Pattern | Exit State | Duration | Easing |
|---|---|---|---|
| **Fade + slide up** | `opacity: 0, translateY(-10px)` | 150ms | `cubic-bezier(0.4, 0, 1, 1)` |
| **Scale + fade** | `opacity: 0, scale(0.95)` | 200ms | `cubic-bezier(0.4, 0, 1, 1)` |
| **Slide to edge** | `translateX(-100%)` | 250ms | `cubic-bezier(0.4, 0, 1, 1)` |
| **Fade only** | `opacity: 0` | 100ms | `cubic-bezier(0.4, 0, 1, 1)` |

### Slide Distance Guidelines

| Element Size | Slide Distance | Rationale |
|---|---|---|
| Small (tooltips, badges) | 4–8px | Minimal shift preserves spatial context |
| Medium (cards, list items) | 8–12px | Noticeable but grounded |
| Large (modals, panels) | 16–24px | Creates a sense of depth/arrival |
| Page sections (scroll reveals) | 20–30px | Visible travel distance for viewport-scale elements |

- **Implementation** (Motion / Framer Motion):

```tsx
// Fade + slide up (most common pattern)
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
/>

// Scale + fade (modals, popovers)
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: "spring", duration: 0.25, bounce: 0.1 }}
/>

// Staggered list entrance
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.05 } }
  }}
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    />
  ))}
</motion.ul>
```

- **Evidence**: [SmoothUI Common Patterns](https://smoothui.dev/docs/guides/animation-best-practices), [Chrome DevRel — Entry/Exit Animations](https://developer.chrome.com/blog/entry-exit-animations), [entrance-animations skill](https://playbooks.com/skills/dylantarre/animation-principles/entrance-animations)

---

## Finding 6: Loading and Skeleton State Specifications

- **The rule**: Use skeleton screens that mirror the layout of actual content. Two main patterns: **shimmer** (gradient sweep) and **pulse** (opacity oscillation). Shimmer is standard for content-heavy pages; pulse is appropriate for simpler loading indicators.

### Shimmer Implementation (Production CSS)

```css
.skeleton {
  background: linear-gradient(
    90deg,
    hsl(0 0% 88%) 25%,
    hsl(0 0% 95%) 50%,
    hsl(0 0% 88%) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

/* Dark mode variant */
.skeleton-dark {
  background: linear-gradient(
    90deg,
    hsl(0 0% 15%) 25%,
    hsl(0 0% 20%) 50%,
    hsl(0 0% 15%) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Synchronized Shimmer (Multiple Elements)

To make all skeleton elements shimmer in sync rather than independently:

```css
.skeleton-synced {
  background-attachment: fixed;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

The `background-attachment: fixed` makes all elements share the same viewport-relative gradient coordinate space.

### Pulse Implementation (Simpler Alternative)

```css
.skeleton-pulse {
  background: hsl(0 0% 88%);
  animation: pulse 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}
```

### React Component Pattern

```tsx
function Skeleton({ width, height, rounded = false }: {
  width: string | number;
  height: string | number;
  rounded?: boolean;
}) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: rounded ? "50%" : "4px",
      }}
    />
  );
}

// Usage: mirror actual content layout
function ArticleCardSkeleton() {
  return (
    <div className="card">
      <Skeleton width="100%" height={180} />
      <Skeleton width="70%" height={20} />
      <Skeleton width="40%" height={16} />
    </div>
  );
}
```

### Key Specifications

| Parameter | Value | Rationale |
|---|---|---|
| Shimmer duration | 1.5s per cycle | Fast enough to feel active, slow enough to not distract |
| Shimmer easing | `ease-in-out` | Smooth, non-jarring oscillation |
| Pulse opacity range | 1.0 → 0.5 → 1.0 | Visible change without harsh flashing |
| Background-size | `200% 100%` | Ensures gradient can sweep fully across element |
| Border-radius | Match target element | Prevents layout shift when content loads |
| Gradient angle | `90deg` (horizontal) | Natural left-to-right reading direction |

- **Why it works**: Skeleton screens reduce perceived load time by 10–20% compared to spinners because they set user expectations about content structure. The brain begins processing layout before content arrives.
- **Evidence**: [Frontend Hero — CSS Skeleton Loaders](https://frontend-hero.com/how-to-create-skeleton-loader), [Synchronized CSS Skeleton Loader](https://freefrontend.com/code/synchronized-pure-css-skeleton-loader-2026-01-22/), [react-loading-skeleton docs](https://reactlibs.dev/articles/react-loading-skeleton-shimmer-and-shine)

---

## Finding 7: Hover and Focus Transition Specifications

- **The rule**: Hover effects should change within 150–200ms using ease-out. The three primary hover signals are **color shift**, **elevation (shadow)**, and **subtle scale**. Never use more than two simultaneously on the same element.

### Button Hover Pattern

```css
.button {
  background: hsl(220 90% 56%);
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition:
    background 150ms cubic-bezier(0, 0, 0.2, 1),
    transform 150ms cubic-bezier(0, 0, 0.2, 1),
    box-shadow 150ms cubic-bezier(0, 0, 0.2, 1);
}

.button:hover {
  background: hsl(220 90% 50%);  /* 6% darker */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition-duration: 50ms;  /* press feedback is instant */
}
```

### Card Hover Pattern

```css
.card {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition:
    transform 200ms cubic-bezier(0, 0, 0.2, 1),
    box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### Interactive Element Hover (Spring-Based)

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>

<motion.div  // Card
  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```

### Specific Hover Values

| Element | Property Change | Amount | Duration |
|---|---|---|---|
| **Button** | Background lightness | ±6–10% | 150ms |
| **Button** | translateY | -1px | 150ms |
| **Button** | Scale (press) | 0.98 | 50ms |
| **Card** | translateY | -2px | 200ms |
| **Card** | Box-shadow spread | 1px → 24px | 200ms |
| **Card** | Scale (optional) | 1.01–1.02 | 200ms |
| **Link** | Opacity or color | 0.7 or hue shift | 150ms |
| **Icon button** | Background opacity | 0 → 0.08 | 100ms |
| **Row / list item** | Background opacity | 0 → 0.04 | 100ms |

### Focus States

Always pair hover with `:focus-visible` for keyboard accessibility:

```css
.button:focus-visible {
  outline: 2px solid hsl(220 90% 56%);
  outline-offset: 2px;
  transition: outline-offset 100ms cubic-bezier(0, 0, 0.2, 1);
}
```

- **Why it works**: Hover scale above 1.05 looks cartoonish in production UIs. The 1.01–1.02 range provides a subtle "lift" that signals interactivity without distorting the layout. translateY(-1px to -2px) creates a physical lifting metaphor that reinforces the elevation shadow.
- **Evidence**: [Motion Flow — Hover States That Feel Good](https://motionflowin.com/css-animation-design/hover-states-responsive-feedback/), [TheLinuxCode — CSS :hover 2026](https://thelinuxcode.com/css-hover-selector-in-2026-practical-patterns-pitfalls-and-accessible-interactions/), [SmoothUI](https://smoothui.dev/docs/guides/animation-best-practices)

---

## Finding 8: Scroll-Based Animations — When and How

- **The rule**: Scroll animations are appropriate only for marketing/landing pages and content-heavy informational pages. Never use them in application UI (dashboards, settings, forms). Use Intersection Observer, not scroll event listeners. Always `unobserve` after triggering.

### When Scroll Animation Is Appropriate

| Context | Appropriate? | Rationale |
|---|---|---|
| Landing page hero | Yes | Sets tone, guides first impression |
| Feature sections | Yes, subtle | Reveals content progressively |
| Pricing cards | Yes, light fade | Draws attention to conversion point |
| Blog content | Minimal | Light fades at most; don't distract from reading |
| Dashboard / app UI | No | Users expect instant rendering |
| Settings pages | No | Content is functional, not narrative |
| Data tables | No | Animation interferes with scanning |

### Intersection Observer Implementation

```tsx
import { useInView, motion } from "motion/react";
import { useRef } from "react";

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,        // trigger once, then stop observing
    margin: "-80px",   // trigger 80px before element enters viewport
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered Section Reveal

```tsx
function StaggeredReveal({ children }: { children: React.ReactNode[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Scroll Reveal Specifications

| Parameter | Value | Rationale |
|---|---|---|
| translateY distance | 16–24px | Visible travel without dramatic swooping |
| Duration | 400–600ms | Longer than click-triggered animations; user isn't waiting |
| Easing | `cubic-bezier(0.23, 1, 0.32, 1)` | Ease-out — fast response, gentle settle |
| Stagger delay | 80–120ms | Enough to read as sequential, not slow |
| Trigger threshold | 10–20% visible | Element starts animating just as it enters |
| rootMargin | `-60px` to `-100px` | Ensures element is meaningfully on-screen |
| `once: true` | Always | Prevents re-animation on scroll up (distracting) |

### CSS Scroll-Driven Animations (Emerging)

Modern browsers (Chrome 115+, Safari 18+) support `animation-timeline: view()` for zero-JS scroll animations:

```css
.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

This is more performant (no JS) but browser support is still limited. Use as progressive enhancement.

- **Performance note**: Intersection Observer runs asynchronously off the main thread, using 3x less CPU than scroll event listeners. Always use a single observer for multiple elements rather than one per element.
- **Evidence**: [Intersection Observer animations guide](https://handoff.design/css-animation/scroll-animations.html), [TheLinuxCode — Scroll animations with IntersectionObserver](https://thelinuxcode.com/the-essential-guide-to-smooth-as-butter-scroll-animations-with-intersectionobserver/), [GSAP Vault — Animate on Scroll Comparison](https://gsapvault.com/blog/how-to-animate-on-scroll)

---

## Finding 9: Spring Animations vs CSS Transitions — Decision Framework

- **The rule**: Use springs for spatial properties (position, size, rotation) on interactive elements — especially those involving drag, gestures, or interruptible state changes. Use CSS transitions for color, opacity, and simple hover effects. Use CSS `linear()` for non-interactive spring-like motion (page entrances).

### When to Use Springs (Motion / Framer Motion)

| Situation | Why Spring Wins |
|---|---|
| Toggle switches | Overshoot by ~3px makes the toggle feel physical |
| Drag-and-drop settle | Spring inherits drag velocity; CSS cannot |
| Modal open/close | Spring overshoot creates depth and weight |
| Interruptible animations | Springs handle mid-animation interrupts with continuous velocity; CSS jumps |
| Notification entrance | Spring overshoot by ~5px, then settle |
| Pagination indicator | Stretches based on velocity, settles with spring |

### When CSS Transitions Are Better

| Situation | Why CSS Wins |
|---|---|
| Hover color changes | No benefit to spring physics on color |
| Opacity fades | Oscillating opacity looks wrong |
| Simple show/hide | CSS is zero-bundle-cost |
| Performance-critical loops | CSS runs on compositor; JS springs run on main thread |
| `border-radius` | Sub-pixel spring jitter on radius looks bad |
| `box-shadow` | Spring shadow animation is imperceptible and expensive |

### Spring Parameter Cheat Sheet

| Component | Stiffness | Damping | Mass | Character |
|---|---|---|---|---|
| Toggle switch | 500 | 25 | 1 | Snappy, slight overshoot (~3px) |
| Dropdown/popover | 500 | 35 | 1 | Quick settle, minimal bounce |
| Notification enter | 400 | 25 | 1 | Playful arrival overshoot (~5px) |
| Notification exit | 600 | 40 | 1 | Fast, decisive, no bounce |
| Button press | 400 | 15 | 1 | Snappy with quick settle |
| Card hover lift | 300 | 20 | 1 | Gentle, smooth |
| List item entrance | 250 | 25 | 1 | Soft, restrained |
| Drag settle | 300 | 30 | 0.8 | Carries momentum from gesture |
| Modal entrance | 300 | 24 | 1 | Noticeable overshoot, settles |
| Tab indicator | 400 | 30 | 0.8 | Stretches during travel, snaps to position |

### Duration-Based Spring Alternative (Simpler API)

```tsx
// Instead of tuning stiffness/damping:
transition={{
  type: "spring",
  duration: 0.25,   // approximate total time
  bounce: 0.1       // 0 = no bounce, 1 = very bouncy. Keep 0.1–0.2 for UI.
}}
```

### What NOT to Spring

From the Ruixen case study (170+ components migrated to springs):
- **Color transitions** — spring-animated color looks wrong
- **Border radius** — sub-pixel jitter at fractional values
- **Box shadow** — computationally expensive, visually imperceptible
- **Font size / weight** — causes layout reflow per frame

**Rule of thumb**: Spring spatial properties. Tween non-spatial properties.

- **The trade-off**: Springs add ~15KB (motion library). CSS transitions add 0KB. But springs handle interrupts gracefully, inherit velocity from gestures, and create emergent duration (the animation takes as long as the physics dictate, not a fixed time). For any app with meaningful interactivity, 15KB buys a fundamentally different experience.
- **Evidence**: [Ruixen — I replaced every CSS animation with a spring](https://ruixen.com/blog/replaced-css-animation-with-spring), [baraa.app](https://www.baraa.app/blog/easing-curves-are-a-design-language), [SmoothUI](https://smoothui.dev/docs/guides/animation-best-practices)

---

## Finding 10: CSS `linear()` — Native Spring Animations Without JS

- **The rule**: The CSS `linear()` timing function approximates spring physics natively by defining 25–50+ points on a progress curve. It runs on the GPU compositor thread, avoiding main-thread blocking. Use it for non-interactive spring-feel animations where interruption handling doesn't matter.

### How It Works

Instead of a cubic-bezier (4 control points), `linear()` takes arbitrary data points:

```css
/* Simple ease approximation — 11 points */
.element {
  transition: transform 500ms linear(0, 0.1, 0.25, 0.5, 0.68, 0.8, 0.88, 0.94, 0.98, 0.995, 1);
}

/* Spring with overshoot — values exceed 1.0 */
.element-spring {
  transition: transform 600ms linear(0, 1.25, 1, 0.9, 1.04, 0.99, 1.005, 0.996, 1.001, 0.999, 1);
}
```

For convincing springs, use 25–50 points. Tools generate these automatically:
- [Linear() Easing Generator](https://linear-easing-generator.netlify.app/) by Jake Archibald & Adam Argyle
- [Easing Wizard](https://easingwizard.com/) for springs, bounces, and wiggles

### Implementation Pattern (with Fallback)

```css
:root {
  --spring-snappy: cubic-bezier(0.34, 1.56, 0.64, 1);
  --spring-snappy-time: 400ms;

  @supports (animation-timing-function: linear(0, 1)) {
    /* stiffness: 300, damping: 20 */
    --spring-snappy: linear(
      0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%,
      0.721 25.3%, 0.849 31.5%, 0.937 38.1%, 0.968 41.8%,
      0.991 45.7%, 1.006 50.1%, 1.015 55%, 1.017 63.9%,
      1.001 85.5%, 1
    );
  }
}

@media (prefers-reduced-motion: no-preference) {
  .springy {
    transition: transform var(--spring-snappy-time) var(--spring-snappy);
  }
}
```

### Limitations vs JS Springs

| Feature | `linear()` | Motion/Framer Motion |
|---|---|---|
| GPU compositing | Yes | No (main thread) |
| Interrupt handling | Janky (reverses with shortened duration) | Smooth (velocity-aware) |
| Velocity inheritance | No | Yes |
| Bundle cost | 0 KB | ~15 KB |
| Browser support | Chrome 113+, Safari/Firefox 2024+ | All modern browsers |
| Duration | Fixed (must specify) | Emergent (physics-derived) |

- **When to use `linear()`**: Page-load entrance animations, scroll-triggered reveals, hover effects — anything where the animation runs once without user interruption.
- **When NOT to use**: Drag-and-drop, interruptible toggles, gesture-driven animations — anything where the animation might be cancelled or reversed mid-flight.
- **Performance**: A 50-point `linear()` string adds ~0.5KB to CSS. Three complex springs add ~1.3KB gzipped. Framerate is unaffected — tested on low-end hardware with identical results to simple `linear(0, 1)`.
- **Evidence**: [Josh Comeau — Springs and Bounces in Native CSS](https://www.joshwcomeau.com/animation/linear-timing-function/), [Chrome DevRel — linear() easing function](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)

---

## Finding 11: Performance Deep-Dive — The Rendering Pipeline

- **The rule**: Every CSS property change triggers one of four pipeline stages. Animate only properties that skip to the compositing stage.

### The Pixel Pipeline

```
Style → Layout → Paint → Composite
```

| Stage | What Happens | Cost |
|---|---|---|
| **Style** | Recalculate which CSS rules apply | Low |
| **Layout** | Calculate geometry (position, size) of every affected element | HIGH — cascades to siblings/parents |
| **Paint** | Fill in pixels (colors, images, shadows, text) | Medium — per-layer |
| **Composite** | Combine painted layers, apply transforms and opacity | LOW — runs on GPU |

### Which Properties Trigger Which Stages

| Pipeline Path | Properties | Cost |
|---|---|---|
| Style → Layout → Paint → Composite | `width`, `height`, `margin`, `padding`, `top`, `left`, `display`, `font-size`, `border-width` | Highest — full recalc |
| Style → Paint → Composite | `color`, `background-color`, `box-shadow`, `border-color`, `outline`, `text-decoration` | Medium — skips layout |
| Style → Composite only | `transform`, `opacity`, `filter` (in some cases) | Lowest — GPU only |

### Practical `will-change` Usage

```css
/* Apply on interaction start, not permanently */
.card:hover {
  will-change: transform;
}

/* Or via JS — add before animation, remove after */
element.addEventListener("mouseenter", () => {
  element.style.willChange = "transform, opacity";
});
element.addEventListener("transitionend", () => {
  element.style.willChange = "auto";
});
```

Do NOT apply `will-change` to every element. Each promoted element creates a separate GPU layer (~500KB–2MB VRAM per layer on mobile). Target 4–5ms total compositor time during scroll.

### Layout Thrashing Prevention

```typescript
// BAD: interleaved reads and writes force synchronous layout
items.forEach(el => {
  const h = el.offsetHeight;      // READ — forces layout
  el.style.height = `${h + 10}px`; // WRITE — invalidates layout
});

// GOOD: batch all reads, then all writes
const heights = items.map(el => el.offsetHeight);  // all READs
items.forEach((el, i) => {
  el.style.height = `${heights[i] + 10}px`;        // all WRITEs
});
```

### Frame Budget Reference

| Refresh Rate | Frame Budget | After Browser Overhead (~6ms) |
|---|---|---|
| 60Hz | 16.7ms | ~10ms for your code |
| 90Hz | 11.1ms | ~5ms for your code |
| 120Hz | 8.33ms | ~2ms for your code |

A single layout recalculation on a complex DOM (1000+ elements) takes 5–10ms. At 120Hz, that's your entire frame budget gone.

- **Evidence**: [web.dev — Animations and Performance](https://web.dev/animations-and-performance/), [web.dev — Stick to Compositor-Only Properties](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/), [Browser Rendering Performance 2026](https://abdallahzakzouk.com/blog/browser-rendering-performance-guide)

---

## Finding 12: Examples from Great Products

### Linear

- **Philosophy**: "If something takes 300ms, it feels broken." Speed is a design feature, not just engineering.
- **Motion approach**: Minimal, purposeful animation. No decorative motion. Optimistic updates make most interactions feel instant — the animation is the update, not a wrapper around a network call.
- **Implementation**: Optimistic UI eliminates loading states. Local-first architecture means the client state is the source of truth. Skeleton screens only when truly necessary. Aggressive keyboard-first design means many interactions bypass animation entirely (keyboard shortcuts resolve instantly).
- **Key technique**: `ResponsiveSlot` components using ResizeObserver for content-aware progressive disclosure instead of media queries. Elements appear/disappear based on priority, not viewport width.
- **Takeaway**: The best animation strategy may be having almost no animation — just instant response.
- **Source**: [Linear design system reverse-engineering](https://pustelto.com/blog/reverse-engineer-linear-1-header/), [frontendfyi/rebuilding-linear.app](https://github.com/frontendfyi/rebuilding-linear.app)

### Stripe

- **Signature effect**: Mouse-tracking radial gradient borders on cards. `pointermove` events update CSS variables `--x` and `--y`, creating a "flashlight" effect on card borders via `radial-gradient` pseudo-elements.
- **Animation tech**: Framer Motion for component animations. Spring physics for interactive elements.
- **Hover pattern**: Multi-layered — gradient border follows cursor + subtle scale + shadow elevation simultaneously.

```css
/* Stripe-style mouse-tracking border */
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    300px circle at var(--x) var(--y),
    rgba(255, 255, 255, 0.15),
    transparent
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}
```

- **Source**: [Stripe-inspired card hover](https://freefrontend.com/code/stripe-inspired-cards-hover-effect-2026-01-19/)

### Vercel

- **Signature effect**: Scroll-aware navigation — logo scales from 1.0 to 0.8 as user scrolls, nav tabs shift horizontally. All driven by scroll position mapped to CSS transforms.
- **Implementation**: Range-mapping function converts scroll position (0–200px) to transform values. Uses `position: sticky` for the navigation container.
- **Tech stack**: CSS transforms + Framer Motion. Image galleries use Next.js Image with optimized loading (720×480 grid, 1280×853 modal).
- **Source**: [Frontend.fyi — Recreating Vercel's navigation](https://www.frontend.fyi/tutorials/recreating-vercels-navigation-animation)

### Raycast

- **Design system**: Dark-first UI calibrated to Apple's ~#1C1C1E base. Surface layers increment by 6–8 luminance points.
- **Shadow calibration**: 0.4–0.6 opacity shadows on dark backgrounds (standard 0.1–0.2 opacity shadows disappear on dark surfaces).
- **Motion character**: Snappy, immediate. Consistent with a power-user tool aesthetic. Spring-like settle on command palette open/close.
- **Source**: [SeedFlip — Raycast Design System](https://seedflip.co/blog/raycast-design-system-dark-ui)

### Common Thread

All four products share the same motion philosophy:
1. **Animation serves function, never decoration**
2. **Speed is the primary design value** — animations are fast (150–300ms) or absent
3. **Spring physics for spatial properties** on interactive elements
4. **Dark-first** design with calibrated shadows and depth cues
5. **Keyboard-first** means many interactions skip animation entirely
6. **Optimistic UI** eliminates the need for most loading animations

---

## Finding 13: Accessibility — `prefers-reduced-motion` Implementation

- **The rule**: Always respect `prefers-reduced-motion`. This is not optional. Motion sensitivity affects users with vestibular disorders, migraines, ADHD, and epilepsy.

### CSS Implementation (Global Kill Switch)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Using `0.01ms` instead of `0ms` preserves CSS logic (hover states still work, `transitionend` events still fire) while making animations imperceptible.

### React Implementation (Motion Library)

```tsx
import { useReducedMotion } from "motion/react";

function AnimatedCard({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={prefersReduced
        ? { duration: 0 }
        : { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
```

### Progressive Enhancement Pattern

```css
/* Base: no motion (safe default) */
.element {
  opacity: 1;
}

/* Only add motion for users who haven't requested reduction */
@media (prefers-reduced-motion: no-preference) {
  .element {
    transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1);
  }
}
```

### What "Reduced" Means

Reduced motion ≠ no animation. It means:
- Remove **spatial** animations (translateX/Y, scale, rotate)
- Keep **opacity** transitions (fading is generally safe)
- Disable **scroll-driven** animations entirely
- Disable **auto-playing** animations and loops
- Keep functional animations that convey state (loading spinners can stay, but reduce their motion)

- **Evidence**: [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [cr0x.net — prefers-reduced-motion done properly](https://cr0x.net/en/prefers-reduced-motion-done-properly/), [SmoothUI Accessibility Guide](https://smoothui.dev/docs/guides/animation-best-practices)

---

## Finding 14: Page Transitions in Next.js — Implementation

- **The rule**: Two approaches exist: (1) **View Transitions API** (native browser, minimal bundle) and (2) **Motion library** (full control, heavier). Use View Transitions for simple cross-page fades; use Motion for complex choreographed transitions.

### Approach 1: View Transitions API (Native)

```bash
npm install next-view-transitions
```

```tsx
// app/layout.tsx
import { ViewTransitions } from "next-view-transitions";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html>
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}
```

```tsx
// Use the provided Link component
import { Link } from "next-view-transitions";

<Link href="/about">About</Link>
```

```css
/* Custom transition styles */
::view-transition-old(root) {
  animation: fade-out 200ms cubic-bezier(0.4, 0, 1, 1);
}

::view-transition-new(root) {
  animation: fade-in 200ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

### Approach 2: Motion Library (AnimatePresence)

```tsx
// app/template.tsx (NOT layout.tsx — layouts persist across routes)
"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Important: Use `template.tsx`, not `layout.tsx`. Layouts persist across route changes and won't trigger enter/exit animations. Templates are recreated on each navigation.

### Page Transition Specifications

| Parameter | Value |
|---|---|
| Duration | 200–300ms |
| Entry easing | `cubic-bezier(0, 0, 0.2, 1)` (ease-out) |
| Exit easing | `cubic-bezier(0.4, 0, 1, 1)` (ease-in) |
| Slide distance | 8px (subtle) |
| View Transitions bundle cost | ~2KB |
| Motion library bundle cost | ~15KB |

- **Evidence**: [StaticMania — Next.js Page Transitions with Motion](https://staticmania.com/blog/page-transitions-in-next.js-with-motion), [Npmix — Smooth Page Transitions in Next.js 15](https://www.npmix.com/blog/smooth-page-transitions-in-nextjs-15-a-deep-dive-guide)

---

## Finding 15: Complete Motion Token System — Copy-Paste Ready

- **The rule**: Define your entire motion system as tokens. Name by intent, not by shape. Here is a production-ready token file:

```typescript
// lib/motion-tokens.ts

export const motion = {
  // Easing curves — named by intent
  easing: {
    respond:  [0, 0, 0.2, 1] as const,         // user input response
    enter:    [0, 0, 0.2, 1] as const,          // element entrance
    exit:     [0.4, 0, 1, 1] as const,          // element exit/dismissal
    smooth:   [0.23, 1, 0.32, 1] as const,      // general smooth ease-out
    announce: [0.34, 1.56, 0.64, 1] as const,   // attention-worthy arrival (overshoot)
    snap:     [0.12, 0, 0.08, 1] as const,      // toggles, binary states
  },

  // Durations — named by role
  duration: {
    instant:  0,       // no animation
    micro:    0.1,     // 100ms — press feedback
    fast:     0.15,    // 150ms — toggles, tooltips, micro-interactions
    normal:   0.2,     // 200ms — standard transitions
    medium:   0.3,     // 300ms — complex transitions
    slow:     0.4,     // 400ms — page transitions, dramatic entrances
    slower:   0.6,     // 600ms — emphasis animations
  },

  // Spring presets
  spring: {
    snappy:   { type: "spring" as const, stiffness: 500, damping: 25 },
    smooth:   { type: "spring" as const, stiffness: 300, damping: 24 },
    gentle:   { type: "spring" as const, stiffness: 250, damping: 25 },
    bouncy:   { type: "spring" as const, stiffness: 400, damping: 15 },
    quick:    { type: "spring" as const, duration: 0.25, bounce: 0.1 },
  },

  // Composite presets — ready to spread into transition prop
  transition: {
    enterFade:     { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
    exitFade:      { duration: 0.15, ease: [0.4, 0, 1, 1] as const },
    hoverSpring:   { type: "spring" as const, stiffness: 400, damping: 17 },
    modalSpring:   { type: "spring" as const, stiffness: 300, damping: 24 },
    notifyEnter:   { type: "spring" as const, stiffness: 400, damping: 25 },
    notifyExit:    { type: "spring" as const, stiffness: 600, damping: 40 },
  },
} as const;

// CSS custom properties version
export const motionCSS = `
  :root {
    --ease-respond: cubic-bezier(0, 0, 0.2, 1);
    --ease-enter:   cubic-bezier(0, 0, 0.2, 1);
    --ease-exit:    cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth:  cubic-bezier(0.23, 1, 0.32, 1);
    --ease-announce:cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-snap:    cubic-bezier(0.12, 0, 0.08, 1);

    --duration-micro:  100ms;
    --duration-fast:   150ms;
    --duration-normal: 200ms;
    --duration-medium: 300ms;
    --duration-slow:   400ms;
    --duration-slower: 600ms;
  }
`;
```

### Usage Examples

```tsx
import { motion as m } from "motion/react";
import { motion as tokens } from "@/lib/motion-tokens";

// Standard fade + slide entrance
<m.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={tokens.transition.enterFade}
/>

// Spring-based hover button
<m.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={tokens.transition.hoverSpring}
/>

// Modal
<m.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={tokens.transition.modalSpring}
/>
```

```css
/* CSS usage */
.button {
  transition:
    background var(--duration-fast) var(--ease-respond),
    transform var(--duration-fast) var(--ease-respond),
    box-shadow var(--duration-fast) var(--ease-respond);
}

.card {
  transition:
    transform var(--duration-normal) var(--ease-smooth),
    box-shadow var(--duration-normal) var(--ease-smooth);
}
```

- **Evidence**: [baraa.app](https://www.baraa.app/blog/easing-curves-are-a-design-language), [Ruixen — Motion Design Tokens](https://www.ruixen.com/blog/motion-design-tokens), [SmoothUI Quick Reference](https://smoothui.dev/docs/guides/animation-best-practices)

---

## Summary: The 10 Rules

1. **Animate only for feedback, guidance, continuity, or status.** Everything else is instant.
2. **Micro-interactions: 100–200ms. Transitions: 200–300ms. Page: 300–400ms.** Nothing over 600ms.
3. **Ease-out for entrances, ease-in for exits.** Never the same curve for both.
4. **Animate only `transform` and `opacity`.** Everything else triggers layout recalculation.
5. **Fade + translateY(10px) is the default entrance.** Scale(0.95) for modals. Slide from edge for panels.
6. **Skeleton shimmer: 1.5s, ease-in-out, background-size 200%.** Synchronized with `background-attachment: fixed`.
7. **Hover: 150ms ease-out. Scale 1.02 max. translateY -1px to -2px.** Press: scale 0.98 over 50ms.
8. **Scroll reveals: once-only, 400–600ms, 16–24px travel.** App UI never animates on scroll.
9. **Spring spatial properties. Tween non-spatial.** Toggle: stiffness 500, damping 25. Modal: stiffness 300, damping 24.
10. **Always implement `prefers-reduced-motion`.** Remove spatial motion, keep opacity fades.

---

## Sources

- [baraa.app — Easing curves are a design language](https://www.baraa.app/blog/easing-curves-are-a-design-language) — Comprehensive easing taxonomy with semantic naming
- [SmoothUI — Animation Best Practices](https://smoothui.dev/docs/guides/animation-best-practices) — Motion library patterns and duration guidelines
- [Josh Comeau — Springs and Bounces in Native CSS](https://www.joshwcomeau.com/animation/linear-timing-function/) — `linear()` timing function deep-dive
- [Ruixen — I replaced every CSS animation with a spring](https://ruixen.com/blog/replaced-css-animation-with-spring) — Component-by-component spring migration case study
- [Material Design 3 — Easing and Duration Tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) — Google's motion token system
- [Apple HIG — Motion](https://developer.apple.com/design/human-interface-guidelines/motion) — Apple's motion principles
- [web.dev — Compositor-Only Properties](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/) — GPU compositing performance guide
- [web.dev — Animations and Performance](https://web.dev/animations-and-performance/) — Rendering pipeline deep-dive
- [Chrome DevRel — Entry/Exit Animations](https://developer.chrome.com/blog/entry-exit-animations) — Modern CSS entry/exit features
- [Chrome DevRel — linear() easing function](https://developer.chrome.com/docs/css-ui/css-linear-easing-function) — Native spring animation guide
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — Accessibility media query
- [Pustelnik — Reverse engineering Linear](https://pustelto.com/blog/reverse-engineer-linear-1-header/) — Linear's frontend architecture
- [frontendfyi/rebuilding-linear.app](https://github.com/frontendfyi/rebuilding-linear.app) — Linear homepage reconstruction
- [StaticMania — Next.js Page Transitions](https://staticmania.com/blog/page-transitions-in-next.js-with-motion) — Motion library + Next.js guide
- [Frontend.fyi — Vercel Navigation Animation](https://www.frontend.fyi/tutorials/recreating-vercels-navigation-animation) — Scroll-driven transforms
- [Intersection Observer Animation Guide](https://handoff.design/css-animation/scroll-animations.html) — Scroll reveal patterns
- [Linear() Easing Generator](https://linear-easing-generator.netlify.app/) — Tool for generating `linear()` CSS values
- [Easing Wizard](https://easingwizard.com/) — Tool for spring/bounce `linear()` values
