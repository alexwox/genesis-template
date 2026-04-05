# Lane 4: Micro-interactions, Feedback & Polish

> Specific, implementable patterns for making a SaaS product feel professionally crafted.
> Every value below is a concrete number you can put into Tailwind classes or CSS.

---

## Section 1: Micro-interactions & Feedback

### Finding 1: The Complete Button State System

- **The rule**: A production button needs 6 states, each with specific visual shifts. Default → Hover (darken 8-10%, `150ms ease-out`) → Active/Pressed (`scale(0.97–0.98)`, darken 15%, `100ms`) → Focus (`ring-2 ring-offset-2 ring-blue-500`, only on keyboard via `:focus-visible`) → Disabled (`opacity-50`, `cursor-not-allowed`, no hover/active effects) → Loading (swap label for spinner, keep width stable, `opacity-75` background).
- **Why it works**: Each state communicates a different thing. Hover says "you can click me." Active says "you clicked." Focus says "you're here on the keyboard." Disabled says "not now." Loading says "working on it." Missing any state creates a dead zone where the user gets no signal.
- **Implementation (Tailwind)**:
```jsx
<button
  className={cn(
    // Base
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
    "bg-blue-600 text-white",
    // Transitions
    "transition-all duration-150 ease-out",
    // Hover — darken background
    "hover:bg-blue-700",
    // Active — press down + darken further
    "active:scale-[0.97] active:bg-blue-800",
    // Focus — keyboard only, ring offset for separation
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    // Disabled — dim, no pointer events
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  )}
  disabled={isDisabled}
>
  {isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : (
    children
  )}
</button>
```
- **Key detail**: `active:scale-[0.97]` with `transition-all duration-150` gives the physical "press" feel. The scale must be subtle — `0.95` feels like a toy, `0.98` is barely noticeable, `0.97` is the sweet spot. Vercel uses `200ms ease` universally. Tailwind's default `duration-150` with `cubic-bezier(0.4, 0, 0.2, 1)` is nearly identical.
- **Evidence**: [Slider Revolution — Button States](https://www.sliderrevolution.com/design/button-states/), [Tailwind docs — Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states), [ProtoLabs design philosophy on Vercel timing](https://docs.protolabs.studio/dev/design-philosophy)

---

### Finding 2: The Complete Input State System

- **The rule**: 6 states for inputs. Default (`border-gray-300`, `bg-white`) → Hover (`border-gray-400`) → Focus (`border-blue-500`, `ring-2 ring-blue-500/20`, label floats up with `transform 200ms ease`) → Filled (`border-gray-300`, label stays floated) → Error (`border-red-500`, `ring-2 ring-red-500/20`, error text below in `text-red-500 text-sm`) → Disabled (`bg-gray-50`, `opacity-60`, `cursor-not-allowed`).
- **Why it works**: Input focus is the most frequent micro-interaction in any SaaS. The blue ring says "you're typing here." The combination of border color change + soft ring glow (using a low-opacity ring color like `ring-blue-500/20`) creates depth without being aggressive. The float label removes the need for placeholder text that disappears.
- **Implementation (Tailwind)**:
```jsx
<div className="relative">
  <input
    className={cn(
      // Base
      "peer w-full rounded-md border px-3 py-2 text-sm",
      "border-gray-300 bg-white",
      "transition-all duration-200 ease-out",
      // Hover
      "hover:border-gray-400",
      // Focus — border + soft glow ring
      "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",
      // Error state (conditional)
      hasError && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      // Disabled
      "disabled:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed",
    )}
    placeholder=" " // empty placeholder enables :placeholder-shown
  />
  <label
    className={cn(
      "absolute left-3 top-2.5 text-sm text-gray-500",
      "transition-all duration-200 ease-out",
      "pointer-events-none",
      // Float up when focused or filled
      "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1",
      "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1",
    )}
  >
    Email address
  </label>
  {hasError && (
    <p className="mt-1.5 text-sm text-red-500">{errorMessage}</p>
  )}
</div>
```
- **Key detail**: The `ring-blue-500/20` (20% opacity) creates a soft glow rather than a hard outline. This is the difference between "form field" and "premium form field." The `peer` pattern in Tailwind lets the label react to input state without JavaScript.
- **Evidence**: [Benjamin Crozat — Style labels on focus](https://benjamincrozat.com/label-focus-css), [TheLinuxCode — Glowing Border Effect](https://thelinuxcode.com/creating-a-glowing-border-effect-around-input-fields-with-css-production-ready-accessible-and-themeable/), [PixelFreeStudio — Animating Forms Best Practices](https://blog.pixelfreestudio.com/best-practices-for-animating-forms-and-inputs/)

---

### Finding 3: Toggle Switch Animation — The Bounce That Feels Right

- **The rule**: Toggle width ~44px, height ~24px, knob ~20px. Transition duration `200ms` with `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — this is a custom ease with slight overshoot that creates the "bounce." Background transitions from `bg-gray-200` → `bg-blue-600` over `150ms`. Knob translates `20px` (track width minus knob width minus padding).
- **Why it works**: The overshoot cubic-bezier makes the knob feel like it has physical mass — it slides past the endpoint slightly and settles back. Without it, the toggle feels like a CSS property change. With it, it feels like flipping a physical switch.
- **Implementation**:
```jsx
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent",
        "transition-colors duration-150 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        checked ? "bg-blue-600" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0",
          "transform transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      />
    </button>
  );
}
```
- **Key detail**: The magic is the cubic-bezier `(0.175, 0.885, 0.32, 1.275)` — values above 1.0 in the Y parameters create overshoot. This is sometimes called "back" easing. `shadow-lg` on the knob gives it physical lift. The `border-2 border-transparent` trick prevents layout shift when the track color changes.
- **Evidence**: [Mathieu Thiry — Smooth Toggle Switch React](https://www.mathieuthiry.fr/post/smooth-toogle-switch), [Tailwind Flex — Interactive Toggle](https://tailwindflex.com/%40shariful-islam/interactive-toggle-switch-with-smooth-animation)

---

### Finding 4: Checkbox Check Mark Drawing Animation

- **The rule**: Custom checkbox uses SVG path with `stroke-dasharray` and `stroke-dashoffset` to create a "drawing" effect. Duration `300ms`, easing `cubic-bezier(0.65, 0, 0.45, 1)` (ease-in-out). The background scales from `scale(0)` → `scale(1)` over `200ms`, then the check mark draws over the next `300ms` with a `100ms` delay.
- **Why it works**: The staggered sequence (background fills → check draws) creates a sense of cause and effect. The "drawing" animation triggers a micro-satisfaction response — it confirms the action visually in a way a sudden appearance cannot.
- **Implementation**:
```css
/* The checkbox background */
.checkbox-bg {
  transform: scale(0);
  transition: transform 200ms cubic-bezier(0.65, 0, 0.45, 1);
}
input:checked + .checkbox-bg {
  transform: scale(1);
}

/* The SVG check mark path */
.checkmark-path {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  transition: stroke-dashoffset 300ms cubic-bezier(0.65, 0, 0.45, 1) 100ms;
  /* 100ms delay waits for background scale to finish */
}
input:checked ~ .checkmark-path {
  stroke-dashoffset: 0;
}
```
```jsx
<label className="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" />
  <div className="relative h-5 w-5 rounded border-2 border-gray-300 
                  peer-checked:border-blue-600 peer-checked:bg-blue-600
                  transition-all duration-200">
    <svg className="absolute inset-0 h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path
        d="M6 10l3 3 5-6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="checkmark-path"
      />
    </svg>
  </div>
  <span className="text-sm">Accept terms</span>
</label>
```
- **Key detail**: The `stroke-dasharray` value must equal the total path length. For `d="M6 10l3 3 5-6"`, the path length is ~48. You can calculate it with `path.getTotalLength()` in JavaScript. The `stroke-dashoffset` starts at the same value (fully hidden) and transitions to 0 (fully drawn).
- **Evidence**: [Stack Overflow — CSS Animated Checkmark](https://stackoverflow.com/questions/41078478/css-animated-checkmark), [Visionary — Animated SVG Checkbox](https://visionary.com/blog/making-an-animated-svg-checkbox/)

---

### Finding 5: Toast Notifications — Position, Timing, Stacking

- **The rule**: Position toasts at **bottom-right** for non-critical feedback, **top-center** for critical errors or success confirmations. Auto-dismiss: **5 seconds** for success, **8 seconds** for errors (users need more time to read), **never auto-dismiss** for actions requiring user response. Enter: slide up + fade in (`200ms`). Exit: fade out + slide down (`150ms`). Stack: max 3 visible, newest on top, older ones compress vertically (scale down to ~0.95, translate behind).
- **Why it works**: Bottom-right avoids covering navigation or content headers. 5s is the research-backed sweet spot — enough time to read ~20 words, short enough not to feel like clutter. Pause-on-hover is essential because it respects reading pace. The compressed stack (à la Sonner/Flux) shows "there are more" without consuming vertical space.
- **Implementation (using Sonner)**:
```bash
pnpm add sonner
```
```jsx
// layout.tsx
import { Toaster } from "sonner";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          className: "text-sm",
        }}
        richColors         // success=green, error=red, etc.
        closeButton        // always show close button
        expand={false}     // stacked by default, expand on hover
        visibleToasts={3}  // max visible
      />
    </>
  );
}

// Usage anywhere
import { toast } from "sonner";

toast.success("Changes saved");
toast.error("Failed to save. Please try again.", { duration: 8000 });
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});
```
- **Key detail**: Sonner (by Emil Kowalski, used by Vercel) is the gold standard for React toasts. It handles stacking, pause-on-hover, swipe-to-dismiss, and keyboard accessibility out of the box. The `expand={false}` prop creates the compressed stack where toasts pile behind each other and fan out on hover — this is the pattern Linear and Vercel use. ~3kb gzipped.
- **Evidence**: [Flux UI — Stacked Toasts](https://fluxui.dev/blog/2025-08-21-stacked-toasts), [Motion.dev — Toast Stack Example](https://motion.dev/examples/react-toast-stack), [React-Hot-Toast API](https://react-hot-toast.com/docs/toaster)

---

### Finding 6: Tooltip Timing and Positioning

- **The rule**: **Delay before showing: 400ms** (balances avoiding flash-on-pass-through vs. feeling sluggish). **Delay before hiding: 200ms** (prevents flicker on minor mouse movements). **Enter animation: fade + scale from 0.96 → 1.0, 150ms**. **Max width: 240px**. Arrow: 8px equilateral triangle. Content: text-only, no interactive elements. Use `aria-describedby` for supplementary info, `aria-label` for icon-only buttons.
- **Why it works**: 400ms filters out accidental hovers (the user moving their mouse across the screen) while feeling responsive for intentional hovers. The slight scale-up from 0.96 creates a subtle "pop in from behind" effect that's more alive than a simple fade. Max width at 240px keeps tooltips as sentence fragments, not paragraphs.
- **Implementation (using Radix)**:
```jsx
import * as Tooltip from "@radix-ui/react-tooltip";

<Tooltip.Provider delayDuration={400} skipDelayDuration={200}>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button aria-label="Add to favorites">
        <HeartIcon className="h-4 w-4" />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content
        side="top"
        sideOffset={6}
        className={cn(
          "z-50 max-w-[240px] rounded-md bg-gray-900 px-3 py-1.5",
          "text-xs text-white leading-snug",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "duration-150",
        )}
      >
        Add to favorites
        <Tooltip.Arrow className="fill-gray-900" width={8} height={4} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```
- **Key detail**: Wrap your entire app in `<Tooltip.Provider>` once — it shares the delay duration so consecutive tooltips after the first appear instantly (the `skipDelayDuration` prop). This is the behavior in macOS and feels natural. Radix handles collision detection and repositioning automatically.
- **Evidence**: [Radix Tooltip Primitives](https://www.radix-ui.com/docs/primitives/components/tooltip), [UX StackExchange — Tooltip delay research](https://ux.stackexchange.com/questions/358/how-long-should-the-delay-be-before-a-tooltip-pops-up), [CSS-Tricks — Tooltip Best Practices](https://css-tricks.com/tooltip-best-practices/)

---

### Finding 7: Dropdown Menu Animation + Keyboard Navigation

- **The rule**: Open animation: `fade-in + scale from 0.95, 150ms ease-out`, origin from trigger. **Stagger list items: 30-50ms each** for max 6-8 items (skip stagger for longer lists — it becomes sluggish). Close: `fade-out + scale to 0.95, 100ms ease-in` (exits faster than enters). Keyboard: `ArrowDown`/`ArrowUp` to navigate, `Enter` to select, `Escape` to close, typeahead (typing "set" jumps to "Settings").
- **Why it works**: The 0.95 → 1.0 scale creates the illusion the menu "grows out" of the trigger. Stagger for short lists creates a cascade that draws the eye through options. But stagger on 20+ items adds hundreds of ms of total animation time, making the UI feel slow. The speed asymmetry (150ms in, 100ms out) follows the UX principle: "enter gracefully, exit quickly."
- **Implementation (Radix + Tailwind)**:
```jsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button>Options</button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      sideOffset={4}
      className={cn(
        "z-50 min-w-[180px] rounded-md border border-gray-200 bg-white p-1 shadow-lg",
        // Enter
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        // Exit
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        // Origin based on side
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=bottom]:slide-in-from-top-2",
        "duration-150",
      )}
    >
      {items.map((item) => (
        <DropdownMenu.Item
          key={item.id}
          className={cn(
            "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
            "cursor-pointer select-none outline-none",
            "data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900",
            "text-gray-700",
          )}
        >
          {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
          {item.label}
          {item.shortcut && (
            <span className="ml-auto text-xs text-gray-400">{item.shortcut}</span>
          )}
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```
- **Key detail**: Radix provides `data-[highlighted]` for the currently focused item (keyboard or hover), handling all keyboard navigation, typeahead, and ARIA roles automatically. The `data-[side=*]` attributes let you animate from the correct direction based on where the menu opens. Show keyboard shortcuts right-aligned in `text-xs text-gray-400` — this is how Linear, Figma, and Notion do it.
- **Evidence**: [Framer Motion — Stagger](https://www.framer.com/motion/stagger/), [React Aria — useMenu](https://reactspectrum.blob.core.windows.net/reactspectrum/8bd90a26decb31b088052cfcfab3f349d0dca0a2/docs/react-aria/useMenu.html), [Zag.js — Navigation Menu](https://zagjs.com/components/react/navigation-menu)

---

## Section 2: Loading & Progress

### Finding 8: Skeleton Screens vs. Spinners — The Decision Framework

- **The rule**: Use **skeletons** when you know the layout shape (lists, cards, profiles, dashboards — the vast majority of SaaS pages). Use **spinners** only for indeterminate, shapeless operations (file processing, search queries where layout is unknown). Never show a spinner for < 200ms (use a delay). Show a skeleton/spinner only after a **300ms delay** — most loads complete before that, and showing a loading state for 50ms is worse than showing nothing.
- **Why it works**: Skeletons preserve layout stability (no Cumulative Layout Shift) and reduce perceived wait time by 15-20% compared to spinners. Users perceive skeleton screens as faster because the brain starts processing the layout pattern even before content arrives. Spinners actively communicate "waiting" and increase perceived duration.
- **Implementation — Shimmer skeleton**:
```css
@keyframes shimmer {
  0% { background-position: -700px 0; }
  100% { background-position: 700px 0; }
}

.skeleton {
  background-color: hsl(0 0% 93%);           /* #ededed — base */
  background-image: linear-gradient(
    90deg,
    hsl(0 0% 93%) 0%,                        /* base */
    hsl(0 0% 97%) 40%,                       /* highlight */
    hsl(0 0% 93%) 80%                        /* base */
  );
  background-size: 700px 100%;
  background-repeat: no-repeat;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}
```
```jsx
function SkeletonCard() {
  return (
    <div className="space-y-3 p-4">
      {/* Avatar + name row */}
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <div className="skeleton h-3.5 w-32 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      </div>
      {/* Content lines */}
      <div className="skeleton h-3.5 w-full rounded" />
      <div className="skeleton h-3.5 w-4/5 rounded" />
      <div className="skeleton h-3.5 w-3/5 rounded" />
    </div>
  );
}
```
- **Key detail**: Use `background-attachment: fixed` on all skeleton elements to synchronize the shimmer sweep — without it, each element shimmers independently, which looks chaotic. The gradient direction must be `90deg` (left to right) to match the Western reading direction. For dark mode, swap the base to `hsl(0 0% 15%)` and highlight to `hsl(0 0% 20%)`.
- **Evidence**: [Mat Simon — Simple Skeleton Loaders](https://matsimon.dev/blog/simple-skeleton-loaders), [Digital Thrive — Skeleton Screens React Guide](https://digitalthriveai.com/en-us/resources/web-design/skeleton-screens-react/), [ReactLibs — React Loading Skeleton](https://reactlibs.dev/articles/react-loading-skeleton-shimmer-and-shine)

---

### Finding 9: Optimistic Updates — When, How, and Rollback

- **The rule**: Use optimistic updates for **toggling** (like/unlike, star/unstar, checkbox), **reordering** (drag-and-drop lists), **adding items** (new comment, new task), and **status changes** (marking done). Do NOT use for **destructive actions** (delete), **financial operations** (payment), **operations requiring server validation** (username availability), or **multi-step workflows**.
- **Why it works**: Optimistic updates eliminate the perceived lag of network roundtrips (typically 100-500ms). The UI responds in < 16ms (next frame). This is why Linear feels instant — nearly every interaction is optimistically updated. Studies show perceived speed increases user satisfaction by 30%+.
- **Implementation (React Query / TanStack Query)**:
```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useToggleStar(issueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (starred: boolean) => api.setStarred(issueId, starred),

    // Optimistic update
    onMutate: async (newStarred) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["issue", issueId] });

      // Snapshot previous value
      const previous = queryClient.getQueryData(["issue", issueId]);

      // Optimistically update
      queryClient.setQueryData(["issue", issueId], (old: Issue) => ({
        ...old,
        starred: newStarred,
      }));

      return { previous };
    },

    // Rollback on error
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["issue", issueId], context?.previous);
      toast.error("Failed to update. Reverted.");
    },

    // Always refetch to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
    },
  });
}
```
- **React 19 alternative using `useOptimistic`**:
```tsx
const [optimisticStarred, setOptimisticStarred] = useOptimistic(
  issue.starred,
  (_current, newValue: boolean) => newValue
);

async function handleToggle() {
  setOptimisticStarred(!optimisticStarred);
  await api.setStarred(issueId, !optimisticStarred);
}
```
- **Key detail**: The `onMutate` → `onError` → `onSettled` pattern is the canonical way. The critical step most people miss is `cancelQueries` — without it, an in-flight refetch can overwrite your optimistic update before the mutation response arrives.
- **Evidence**: [FreeCodeCamp — useOptimistic Hook](https://www.freecodecamp.org/news/how-to-use-the-optimistic-ui-pattern-with-the-useoptimistic-hook-in-react/), [React docs — useOptimistic](https://beta.reactjs.org/reference/react/useOptimistic), [Ganesh Joshi — Optimistic UI Patterns](https://ganeshjoshi.dev/blogs/optimistic-ui-patterns-react)

---

### Finding 10: Progress Indicators — The 4-Second Rule

- **The rule**: **< 1 second**: show nothing (or a subtle delay). **1-4 seconds**: indeterminate spinner or thin top progress bar (NProgress style, height `2px`, `bg-blue-500`). **4-10 seconds**: determinate progress bar with percentage. **> 10 seconds**: progress bar with estimated time remaining + option to cancel. **> 30 seconds**: multi-step progress ("Uploading... Processing... Finalizing...").
- **Why it works**: Research shows behavioral intentions change at the 4-second mark. Below 4 seconds, a spinner is fine because users assume "almost done." Above 4 seconds, indeterminate loading creates anxiety — "is it stuck?" A percentage gives the brain something to track, which makes time feel faster.
- **Implementation — thin top bar (NProgress style)**:
```tsx
// nprogress setup for Next.js App Router
"use client";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,    // remove default spinner
  minimum: 0.1,          // start at 10%
  trickleSpeed: 200,     // slow trickle for perceived progress
});

// Custom CSS override
/* In globals.css: */
/* #nprogress .bar { background: #3b82f6; height: 2px; } */
/* #nprogress .peg { box-shadow: 0 0 10px #3b82f6, 0 0 5px #3b82f6; } */
```
- **Key detail**: The thin 2px top bar is now the standard for SaaS (YouTube, GitHub, Linear). It communicates loading without blocking content. Never use a full-page overlay spinner — it's the fastest way to make a modern app feel like 2010.
- **Evidence**: [UX Movement — Progress Bars vs Spinners](https://uxmovement.com/navigation/progress-bars-vs-spinners-when-to-use-which/), [GitHub Primer — Loading Patterns](https://primer.style/ui-patterns/loading/)

---

### Finding 11: Content Loading Strategies

- **The rule**: **Pagination** for search results, tabular data, admin panels (goal-oriented browsing where users want to return to a specific page). **Infinite scroll** for feeds, timelines, image galleries (discovery browsing). **Load more button** as the hybrid option when you want infinite scroll's engagement without its footer-access and SEO problems. **Lazy loading** (intersection observer) for off-screen images and below-fold sections — always. Trigger `200px` before the element enters viewport.
- **Why it works**: Pagination gives users location ("page 3 of 12") and enables bookmarking. Infinite scroll maximizes engagement and time-on-site but destroys footer access, confuses screen readers, and balloons memory usage. Load More is the pragmatic middle — user controls when more loads, but doesn't need page reloads.
- **Implementation — intersection observer for lazy loading**:
```tsx
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px", ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// Usage for infinite scroll trigger
function IssueList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(/* ... */);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <>
      {data.pages.map(/* render issues */)}
      <div ref={ref} className="h-1" /> {/* invisible trigger */}
    </>
  );
}
```
- **Key detail**: The `rootMargin: "200px"` means fetching starts 200px before the user scrolls to the bottom, eliminating the "hit the bottom and wait" jank. For images, use the native `loading="lazy"` attribute — it's simpler and well-supported. For critical above-fold images, use `loading="eager"` or `priority` in Next.js Image.
- **Evidence**: [Alien Design — Infinite Scroll vs Pagination](https://www.thealien.design/insights/infinite-scroll-vs-pagination), [UX Patterns — Pagination vs Infinite Scroll](https://uxpatterns.dev/pattern-guide/pagination-vs-infinite-scroll), [LogRocket — Pagination vs Infinite Scroll UX](https://blog.logrocket.com/ux-design/pagination-vs-infinite-scroll-ux)

---

## Section 3: Polish Details That Matter

### Finding 12: Border Radius Consistency — The Hierarchy Rule

- **The rule**: Use a radius scale based on the 4px grid. **Badges/tags**: `4px` (rounded-sm). **Checkboxes/small inputs**: `4px`. **Buttons**: `6px` (rounded-md). **Inputs**: `6px`. **Cards**: `8px` (rounded-lg). **Modals/dialogs**: `12px` (rounded-xl). **Full-page containers**: `16px` (rounded-2xl). **Avatars**: `rounded-full`. **Rule of thumb**: larger container → larger radius. Never mix arbitrary values (7px, 13px).
- **Why it works**: Consistent radius creates visual harmony that users feel but don't consciously notice. The hierarchy (small elements get small radius, large containers get larger radius) follows optical scaling — a 4px radius on a modal looks sharp/angular, while a 4px radius on a 32px badge looks proportionally round. Vercel uses `6px` everywhere for a flat, engineered look. Stripe uses `8px` for a warmer feel.
- **Implementation (Tailwind config)**:
```js
// tailwind.config.js — explicit radius scale
module.exports = {
  theme: {
    borderRadius: {
      none: "0",
      sm: "4px",      // badges, tags, checkboxes
      DEFAULT: "6px",  // buttons, inputs (this is your base unit)
      md: "6px",
      lg: "8px",       // cards, popovers
      xl: "12px",      // modals, dialogs
      "2xl": "16px",   // large containers
      full: "9999px",  // avatars, pills
    },
  },
};
```
- **Key detail**: For nested elements (e.g., a button inside a card), the inner element's radius should be `outer radius - padding`. If a card has `rounded-lg` (8px) and `p-4` (16px padding), the button inside should use `rounded-md` (6px) to maintain consistent visual spacing at the corners. This is called "nested radius correction" and it's what makes Linear's cards look intentional.
- **Evidence**: [Membrain — Why Radius Consistency Matters](https://membrain.dev/membrain-blog/why-radius-consistency-matters), [Atlassian — Radius Tokens](https://atlassian.design/foundations/radius), [Octopus Design — Border Radius Guidelines](https://www.octopus.design/latest/foundations/border-radius/guidelines-O5X4Pf2Q)

---

### Finding 13: Focus Rings — Accessibility That Doesn't Look Ugly

- **The rule**: Use `:focus-visible` (not `:focus`) so focus rings appear only for keyboard users, never on mouse click. Ring: `2px solid` in brand color (e.g., `ring-blue-500`). Offset: `2px` (creates a gap between element edge and ring). Ring radius: component radius + 2px. For dark backgrounds: use a lighter ring color or add a white outline beneath. WCAG 2.4.7 (Level AA) requires visible focus on all interactive elements.
- **Why it works**: `:focus-visible` solves the classic design-vs-accessibility war. Designers hate focus rings on every click; accessibility requires them for keyboard users. `:focus-visible` makes both sides happy — Chrome, Firefox, and Safari all support it since ~2022. The 2px offset prevents the ring from visually colliding with the element's border.
- **Implementation (Tailwind — global base style)**:
```css
/* globals.css — reset default focus, apply only on keyboard */
*:focus {
  outline: none;
}
*:focus-visible {
  outline: 2px solid hsl(217 91% 60%); /* blue-500 */
  outline-offset: 2px;
  border-radius: inherit; /* NOT supported by outline — see note */
}
```
```jsx
// Or per-component with Tailwind utilities:
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
```
- **Key detail**: CSS `outline` doesn't follow `border-radius` — it's always rectangular. Use `box-shadow` or Tailwind's `ring` utility instead for rounded elements (buttons, inputs). Tailwind's `ring` uses `box-shadow` under the hood, so it follows border-radius. One gotcha: `box-shadow` doesn't show in Windows High Contrast Mode. For maximum accessibility, you can layer both: `outline: 2px solid transparent; box-shadow: 0 0 0 2px blue;` — the transparent outline becomes visible in HCM.
- **Evidence**: [cr0x.net — Accessible Focus States That Don't Look Like Trash](https://cr0x.net/en/2025/07/02/accessible-focus-states/), [TestParty — WCAG Focus Visible Guide](https://testparty.ai/blog/wcag-focus-visible-guide), [web.dev — Focus](https://web.dev/learn/css/focus/)

---

### Finding 14: Cursor Changes as Affordance Signals

- **The rule**: `cursor-pointer` → clickable links and buttons. `cursor-default` → non-interactive areas and text labels. `cursor-not-allowed` → disabled elements (pair with `opacity-50`). `cursor-grab` → draggable items at rest. `cursor-grabbing` → actively being dragged. `cursor-text` → editable text areas. `cursor-col-resize` / `cursor-row-resize` → resizable borders. `cursor-wait` → system processing (use sparingly).
- **Why it works**: Cursors are the cheapest possible affordance signal — they cost nothing visually but immediately tell the user "what can I do here?" The most common mistake is using `cursor-pointer` on non-clickable elements or forgetting `cursor-not-allowed` on disabled buttons — both erode trust in the interface.
- **Implementation (Tailwind)**:
```jsx
// Draggable item
<div className="cursor-grab active:cursor-grabbing">
  <GripVertical className="h-4 w-4 text-gray-400" />
  Drag to reorder
</div>

// Disabled button
<button disabled className="cursor-not-allowed opacity-50">
  Submit
</button>

// Resizable panel border
<div className="cursor-col-resize w-1 hover:bg-blue-500/50 transition-colors" />
```
- **Key detail**: Never use `cursor-pointer` on `<button>` elements by default — the browser's default cursor for buttons is `cursor-default`, and many design systems (including GitHub's Primer) argue that buttons are obviously clickable without pointer. However, the current SaaS convention has moved to `cursor-pointer` on buttons. Choose one and be consistent. Check with `(hover: hover)` media query to avoid applying hover cursors on touch devices.
- **Evidence**: [MDN — cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor), [TheLinuxCode — Cursor Practical Patterns 2026](https://thelinuxcode.com/how-to-change-the-cursor-on-hover-in-css-practical-patterns-for-2026-web-apps/)

---

### Finding 15: Scrollbar Styling — Less Is More

- **The rule**: Custom scrollbars should be thin (6-8px), neutral (gray), and appear only on hover. Use `scrollbar-width: thin; scrollbar-color: hsl(0 0% 75%) transparent;` for cross-browser. For Webkit, style the thumb to be rounded with no visible track. Never hide scrollbars entirely — users need to know content is scrollable.
- **Why it works**: Default browser scrollbars (especially on Windows) are 17px wide and visually heavy. They break the aesthetic of a carefully designed sidebar or code panel. Thin, overlay-style scrollbars (like macOS defaults) communicate scrollability without consuming layout space.
- **Implementation**:
```css
/* Cross-browser thin scrollbar */
.custom-scroll {
  scrollbar-width: thin;                        /* Firefox */
  scrollbar-color: hsl(0 0% 75%) transparent;   /* thumb, track */
}

/* Webkit (Chrome, Safari, Edge) */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: hsl(0 0% 75%);
  border-radius: 3px;
}

/* Show scrollbar only on hover */
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
}
.custom-scroll:hover::-webkit-scrollbar-thumb {
  background-color: hsl(0 0% 75%);
}
```
```jsx
// Tailwind utility approach (apply to any scrollable container)
<div className="overflow-y-auto custom-scroll max-h-[400px]">
  {/* content */}
</div>
```
- **Key detail**: Add the `custom-scroll` class to every scrollable container: sidebars, modal content, dropdown lists, code blocks. The "show on hover" pattern matches macOS behavior and is now expected by users. Note: `overflow: overlay` is deprecated — use `overflow: auto` with the thumb-on-hover pattern instead.
- **Evidence**: [Alexandra Caulea — Scrollbar Styling](https://alexandracaulea.com/snippets/custom-scrollbar-styling), [LogRocket — Styling CSS Scrollbars](https://blog.logrocket.com/guide-styling-css-scrollbars), [NKS Learning — Overlay Scrollbar](https://code.nkslearning.com/blogs/create-an-overlay-and-transparent-scrollbar-that-is-visible-on-hover-using-css_65637e98e906e0859c00)

---

### Finding 16: Text Selection and Item Highlighting

- **The rule**: Brand your text selection color. Use `::selection { background: hsl(217 91% 60% / 0.25); color: inherit; }` — a 25% opacity version of your brand color. For list item selection (e.g., sidebar items, table rows), use `bg-blue-50` (or `bg-gray-100` for neutral) with a left border accent: `border-l-2 border-blue-500`. Multi-select: use checkboxes, not just background color changes.
- **Why it works**: Custom selection color is a 2-line CSS change that makes the entire product feel branded. The default browser selection (blue rectangle on Mac, dark blue on Windows) looks generic. A subtle brand-tinted selection signals craft. For list items, the left border accent creates a clear visual anchor — it's the pattern in Linear, Notion, and VS Code.
- **Implementation**:
```css
/* globals.css */
::selection {
  background-color: hsl(217 91% 60% / 0.25); /* brand-blue at 25% opacity */
  color: inherit;                              /* keep original text color */
}
```
```jsx
// Sidebar item with selection state
<button
  className={cn(
    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm",
    "transition-colors duration-100",
    isSelected
      ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500 pl-[calc(0.5rem-2px)]"
      : "text-gray-600 hover:bg-gray-50 border-l-2 border-transparent pl-[calc(0.5rem-2px)]",
  )}
>
  {item.label}
</button>
```
- **Key detail**: The `pl-[calc(0.5rem-2px)]` trick ensures the text doesn't shift when the left border appears — the padding absorbs the border width. Apply `border-l-2 border-transparent` to unselected items to keep alignment consistent. This eliminates the layout shift that most implementations miss.
- **Evidence**: [MDN — ::selection](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection), [TheLinuxCode — Selection Color CSS Guide](https://thelinuxcode.com/how-to-change-selected-text-background-color-in-css-practical-guide-edge-cases/)

---

### Finding 17: Empty States That Drive Action

- **The rule**: Every empty state needs 3 elements: (1) **A clear headline** explaining the state ("No projects yet"), (2) **A supportive line** explaining the benefit of adding content ("Projects help you organize work into milestones"), (3) **A primary CTA** that creates the first item ("Create your first project"). Optional: an illustration (use a simple vector, not a photograph — max 200px height). Place the empty state **center-aligned** in the content area, not top-left.
- **Why it works**: Empty states are the highest-leverage moment in onboarding. A blank page with just a "+" button loses 40-60% of new users who don't know what to do. The three-part formula (state + benefit + action) converts the "zero data" problem into an onboarding moment. Center alignment signals "this is temporary, not the permanent layout."
- **Implementation**:
```jsx
function EmptyState({ icon: Icon, title, description, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 rounded-xl bg-gray-100 p-3">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-4 w-4" />
        {action}
      </button>
    </div>
  );
}

// Usage
<EmptyState
  icon={FolderIcon}
  title="No projects yet"
  description="Projects help you organize related issues and track progress toward goals."
  action="Create project"
  onAction={() => setShowCreateModal(true)}
/>
```
- **Key detail**: GitHub's Primer design system recommends using the empty state illustration to "preview the interface element" — show a ghost/wireframe of what the populated state will look like. This is more useful than decorative illustrations because it sets expectations. For error-type empty states (search returned nothing, filter is too narrow), use a muted icon and offer to "Clear filters" or "Search for something else."
- **Evidence**: [UI Deploy — Complete Empty State Guide](https://ui-deploy.com/blog/complete-guide-to-empty-state-ux-design-turn-nothing-into-something-2025), [Primer — Empty States](https://primer.style/ui-patterns/empty-states), [Eleken — Empty State UX Examples](https://eleken.co/blog-posts/empty-state-ux)

---

### Finding 18: Error Handling — Inline Validation Done Right

- **The rule**: Validate **on blur** (when the user leaves the field), never on every keystroke. Exception: password strength meters and "username available" checks can validate on keystrokes with a `300ms` debounce. Show the error message **directly below the field** in `text-red-500 text-sm`, with a red border on the input. Show a **success checkmark** on complex fields (password, email format). On form submit, scroll to the first error field and focus it. Never use alert() dialogs for validation errors.
- **Why it works**: On-blur validation outperforms on-submit by 22% completion rate, 42% faster completion time, and 31% higher satisfaction (Baymard Institute research). On-keystroke validation is annoying — showing "invalid email" while the user is still typing "alex@" creates false negative pressure. On-blur is the Goldilocks timing: the user has finished their input and is mentally moving to the next field.
- **Implementation**:
```tsx
function FormField({ label, name, validate, ...inputProps }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    const err = validate?.(value);
    setError(err || null);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (touched) {
            const err = validate?.(e.target.value);
            setError(err || null);
          }
        }}
        onBlur={handleBlur}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm transition-colors",
          touched && error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20",
          "focus:ring-2 focus:outline-none",
        )}
        aria-invalid={touched && !!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...inputProps}
      />
      {touched && error && (
        <p id={`${name}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```
- **Key detail**: The `touched` flag is critical — it prevents showing errors before the user has interacted with the field. But once touched, re-validate on every keystroke so the error disappears as soon as the user fixes it. This creates a "validate-on-blur, clear-on-fix" pattern. Use `aria-invalid` and `role="alert"` for screen reader support — the error message will be announced immediately.
- **Evidence**: [LogRocket — UX Form Validation](https://blog.logrocket.com/ux-design/ux-form-validation-inline-after-submission/), [Baymard — Inline Form Validation Testing](http://baymard.com/blog/inline-form-validation), [NN/G — Error Design Guidelines](https://www.nngroup.com/articles/errors-forms-design-guidelines/)

---

### Finding 19: Keyboard Shortcuts + Command Palette

- **The rule**: Every SaaS needs **Cmd+K** (command palette), **Escape** (close any modal/overlay), and **Cmd+/** (show keyboard shortcut reference). For power tools: mnemonic shortcuts (S for Status, P for Priority, C for Create — following Linear's convention). Display shortcut hints in dropdown menu items (right-aligned, `text-xs text-gray-400`, `<kbd>` styling). Use `cmdk` library (by Paco Coursey) for the command palette.
- **Why it works**: Command palettes have become table stakes for SaaS because they solve the navigation scaling problem — as your app grows, menu-diving becomes exponentially slower. Cmd+K makes everything O(1) access time. Showing shortcut hints inside menus is the discovery mechanism — users learn shortcuts passively by seeing them next to the actions they already use.
- **Implementation (cmdk)**:
```bash
pnpm add cmdk
```
```tsx
"use client";
import { Command } from "cmdk";
import { useEffect, useState } from "react";

function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      {/* Panel */}
      <div className="fixed left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-2xl">
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400"
        />
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500">
            <CommandItem icon={Home} label="Dashboard" shortcut="G D" />
            <CommandItem icon={Settings} label="Settings" shortcut="G S" />
            <CommandItem icon={Users} label="Team" shortcut="G T" />
          </Command.Group>
          <Command.Separator className="mx-2 my-1 h-px bg-gray-200" />
          <Command.Group heading="Actions">
            <CommandItem icon={Plus} label="New issue" shortcut="C" />
            <CommandItem icon={Search} label="Search issues" shortcut="/" />
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

function CommandItem({ icon: Icon, label, shortcut }) {
  return (
    <Command.Item className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 aria-selected:bg-gray-100 cursor-pointer">
      <Icon className="h-4 w-4 text-gray-400" />
      <span>{label}</span>
      {shortcut && (
        <kbd className="ml-auto rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-mono text-gray-400">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  );
}
```
- **Key detail**: Position the palette at `top-[20%]`, not centered — users scan top-down and this puts results closer to their eye line. Use `aria-selected` (which cmdk sets automatically) for the highlighted state instead of `:hover`, so keyboard and mouse highlight are unified. The `<kbd>` element is semantically correct for keyboard shortcuts and allows targeted styling.
- **Evidence**: [cmdk GitHub](https://github.com/dip/cmdk), [Chameleon — Cmd+K Pattern](https://www.chameleon.io/patterns/cmd-k-search), [SaaSFrame — Shortcut UI Examples](http://saasframe.io/patterns/shortcut)

---

### Finding 20: Sound Design — Use Sparingly, Mute by Default

- **The rule**: Sound helps in exactly 3 scenarios: (1) **Notifications/messages** (Slack's "knock" sound is recognizable and non-annoying), (2) **Success confirmations** for high-stakes completions (payment processed, deployment succeeded), (3) **Error alerts** for critical failures (payment failed, build broke). Default: **muted**. Let users opt-in. Never play sound on hover, toggle, or routine clicks. Keep sounds under 0.5 seconds, low-mid frequency (avoid high-pitched beeps), and at 30-50% system volume.
- **Why it works**: Sound bypasses visual attention — it reaches users even in other browser tabs, which is why notification sounds are effective. But sound is the most annoying UX element when misused. The "muted by default" rule respects that most SaaS is used in shared offices. The opt-in model means only users who value audio feedback get it.
- **Implementation**:
```tsx
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private sounds = new Map<string, AudioBuffer>();

  enable() {
    this.ctx = new AudioContext();
    this.enabled = true;
    this.preload();
  }

  disable() {
    this.enabled = false;
  }

  private async preload() {
    const files = {
      success: "/sounds/success.wav",
      error: "/sounds/error.wav",
      notification: "/sounds/notification.wav",
    };
    for (const [name, url] of Object.entries(files)) {
      const res = await fetch(url);
      const buffer = await this.ctx!.decodeAudioData(await res.arrayBuffer());
      this.sounds.set(name, buffer);
    }
  }

  play(name: string) {
    if (!this.enabled || !this.ctx) return;
    const buffer = this.sounds.get(name);
    if (!buffer) return;
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    gain.gain.value = 0.4; // 40% volume
    source.buffer = buffer;
    source.connect(gain).connect(this.ctx.destination);
    source.start();
  }
}

export const sound = new SoundManager();
```
- **Key detail**: You must create `AudioContext` from a user gesture (click/tap) due to browser autoplay policies — that's why `enable()` should be called from a settings toggle click. Preload sounds to avoid latency on first play. Use `.wav` for short effects (no decoding overhead). Keep sound files < 50KB each.
- **Evidence**: [Toptal — Designing UX Sounds](https://www.toptal.com/designers/ux/ux-sounds-guide), [UX Matters — Sound Design in UX Beyond Notifications](https://www.uxmatters.com/mt/archives/2024/08/the-role-of-sound-design-in-ux-design-beyond-notifications-and-alerts.php), [Supadark — Web Sound Effects Best Practices](https://supadark.com/notes/5-best-practices-for-designing-web-sound-effects)

---

## Section 4: What Makes Products "Feel" Professional

### Finding 21: The 100 Small Things — What Linear, Vercel, and Stripe Get Right

- **The rule**: Professional polish comes from consistency across ~100 small details that individually seem trivial but collectively create the "feels different" reaction. Here are the specific details:

**Timing & Animation (the single most impactful category):**
- Universal transition: `150-200ms ease-out` for everything. Vercel uses `200ms ease`. Linear uses `150ms` or less. Pick one and never deviate.
- Enter animations: `150ms`. Exit animations: `100ms`. Exits are faster than enters.
- Spring animations for drag-and-drop and gesture interactions only. Everything else uses easing curves.
- `prefers-reduced-motion`: wrap all animations with this media query. Some users get motion sick.

**Spacing & Alignment:**
- 4px base grid. Every margin, padding, gap uses multiples of 4: `4, 8, 12, 16, 24, 32, 48, 64`.
- Consistent icon size: `16px` for inline, `20px` for button icons, `24px` for standalone. Never use 17px or 22px.
- Text-icon alignment: Use `items-center` and ensure icon size matches the text's `line-height` visually, not numerically.

**Typography:**
- Maximum 2 font weights in the UI: `400` (regular) and `600` (semibold). Avoid `300`, `500`, `700` in body UI.
- Line height: `1.5` for body text, `1.25` for headings, `1.0-1.15` for display text.
- Letter spacing: `-0.01em` for body, `-0.02em` for headings, `-0.04em` for display (tighter is more premium).

**Color:**
- Maximum 1 accent color + 1 gray ramp + semantic colors (red/yellow/green). Vercel: black/white + blue accent. Linear: purple accent. Stripe: blue accent.
- Disabled state: `opacity-50` on the entire element, never a separate "disabled" color.
- Hover backgrounds: `bg-gray-50` or `bg-gray-100`. Never use visible color for hover on secondary elements.

**Borders & Shadows:**
- Use `border-gray-200` (not `border-gray-300` — too heavy). Linear recently softened all borders.
- Card shadow: `shadow-sm` (small, 1px y-offset). Modal shadow: `shadow-xl` (large, for elevation). Never use `shadow-md` for cards — it's the uncanny valley of shadow.
- Divide lines between list items: `divide-y divide-gray-100` (barely visible separator).

**Content Density:**
- Compact mode as default for power tools (Linear, Notion). Comfortable mode for consumer-facing.
- Table row height: `36-40px` for compact, `48-52px` for comfortable.
- Sidebar item height: `32px` with `text-sm`.

**Invisible Details (Linear-specific):**
- Contextual menu safe areas: diagonal mouse movement detection that keeps sub-menus open when moving diagonally toward them (instead of requiring L-shaped cursor movement).
- Navigation elements recede: sidebar dims, tabs compact, icons scale down — content takes precedence.
- Keyboard shortcuts displayed in every menu item to enable passive learning.

- **Why it works**: Users can't articulate why one product "feels better" than another. It's the accumulation of consistent decisions. When every transition is 200ms, every gap is a multiple of 4, every gray is from the same ramp, the brain registers "coherent" without conscious analysis. This is what "design system discipline" means in practice — it's not a Figma file, it's a set of constraints that eliminate inconsistency.
- **Evidence**: [Linear — Calmer Interface](https://linear.app/now/behind-the-latest-design-refresh), [Linear — Invisible Details](https://linear.app/now/invisible-details), [ProtoLabs — Design Philosophy influenced by Vercel](https://docs.protolabs.studio/dev/design-philosophy), [SeedFlip — Vercel Design System Breakdown](https://seedflip.co/blog/vercel-design-system), [Hash Builds — Stripe Design Aesthetic](https://www.hashbuilds.com/patterns/what-is-stripe-aesthetic)

---

### Finding 22: Performance as Design — The Response Time Thresholds

- **The rule**: **0-100ms** = instant (user feels direct manipulation, no feedback needed). **100-300ms** = fast (noticeable but flow unbroken, no loading indicator). **300-1000ms** = acceptable (show skeleton/placeholder, user stays engaged). **1000-4000ms** = slow (show progress indicator, user's attention starts to drift). **4000ms+** = broken (user abandons task or switches context, show determinate progress with estimate).
- **Why it works**: These thresholds are based on Jakob Nielsen's 1993 research, which maps to human cognitive limits that haven't changed: 100ms is the threshold for perceived causality (I clicked → it happened), 1 second is the limit for uninterrupted flow of thought, 10 seconds is the limit for sustained attention. Every 100ms improvement in response time measurably impacts conversion rates.
- **Implementation — the performance budget**:

| Interaction | Target | Strategy |
|---|---|---|
| Button click → visual feedback | < 50ms | CSS transitions (no JS) |
| Navigation between pages | < 300ms | Prefetch on hover (`next/link`), RSC streaming |
| Search results | < 200ms | Client-side filtering, debounce 150ms |
| Data mutation feedback | < 100ms | Optimistic updates |
| Initial page load (LCP) | < 1.5s | Static generation, edge caching |
| Modal open | < 100ms | Pre-render, animate in |
| List filter/sort | < 100ms | Client-side state, avoid re-fetching |

```tsx
// Prefetch on hover (Next.js)
import Link from "next/link";

// Next.js automatically prefetches <Link> in viewport,
// but for dynamic routes you can prefetch on hover:
<Link
  href={`/issues/${issue.id}`}
  prefetch={false}
  onMouseEnter={() => router.prefetch(`/issues/${issue.id}`)}
>
  {issue.title}
</Link>

// Search with debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const debouncedQuery = useDebounce(searchQuery, 150);
```
- **Key detail**: The single highest-leverage performance optimization for perceived speed is prefetching. When a user hovers over a link, they take 200-400ms to click — if you start the fetch on hover, the page is often ready before the click lands. This is why Linear and Vercel feel instant: they're not actually faster at the network level, they're starting work earlier.
- **Evidence**: [Nielsen Norman — Response Time Limits](https://www.nngroup.com/articles/response-times-3-important-limits), [NN/G — Website Response Times](https://www.nngroup.com/articles/website-response-times), [Dev.to — What 100ms Page Load Means for Business](https://dev.to/designrai/what-a-100ms-page-load-actually-means-for-your-business-1k7n), [Linear — Speed as a Feature](https://blakecrosley.com/en/guides/design/linear)

---

## Quick Reference: The SaaS Polish Checklist

```
TIMING
├── All transitions: 150-200ms ease-out
├── Active press: scale(0.97), 100ms
├── Enter > exit speed (150ms in, 100ms out)
└── prefers-reduced-motion: respect it

SPACING
├── Base grid: 4px (4, 8, 12, 16, 24, 32, 48)
├── Icon sizes: 16 / 20 / 24px only
└── Consistent gap: gap-2 (8px) in buttons, gap-3 (12px) in cards

RADIUS
├── Buttons/inputs: 6px (rounded-md)
├── Cards/popovers: 8px (rounded-lg)
├── Modals: 12px (rounded-xl)
└── Avatars: rounded-full

COLOR
├── 1 accent + 1 gray ramp + semantic (red/green/yellow)
├── Borders: gray-200 (not gray-300)
├── Hover bg: gray-50 or gray-100
└── Disabled: opacity-50

FOCUS
├── :focus-visible only (not :focus)
├── ring-2 ring-offset-2 ring-{brand}-500
└── Test with Tab key on every interactive element

LOADING
├── < 300ms: show nothing
├── 300ms-4s: skeleton or thin top bar
├── > 4s: determinate progress bar
└── Optimistic updates for all toggles/status changes

TOASTS
├── Position: bottom-right
├── Duration: 5s success, 8s error
├── Stack max: 3 visible
└── Pause on hover: always

TOOLTIPS
├── Delay: 400ms (300-500ms range)
├── Max width: 240px
├── Enter: 150ms fade + scale(0.96→1)
└── Content: text only, no interactions

INPUTS
├── Validate on blur, clear on fix
├── Error: red border + message below + aria-invalid
├── Focus glow: ring-{brand}/20 (20% opacity)
└── Float labels with peer selectors

EMPTY STATES
├── Centered in content area
├── Icon/illustration + headline + description + CTA
├── CTA creates first item
└── Ghost preview of populated state

KEYBOARD
├── Cmd+K: command palette (use cmdk library)
├── Escape: close any overlay
├── Show shortcut hints in menu items
└── kbd element, text-[10px], font-mono, border styling
```
