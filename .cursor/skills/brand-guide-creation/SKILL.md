---
name: brand-guide-creation
description: Create, critique, or refresh brand guides and brand guideline documents through a collaborative workflow. Use when the user wants to build brand guidelines, brand books, style guides, tone-of-voice docs, logo and visual identity rules, messaging systems, or a full brand manual. Starts with discovery, anchors on local branding assets, then drafts a practical, example-heavy guide with governance, templates, and real usage guidance. Includes procedural visual system rules, AI-readiness layer for design tokens and prompt constraints, and a 7-layer quality audit for digital products.
last-reviewed: 2026-04-04
---

# Brand Guide Creation

## Purpose

Create brand guides that are executable, not decorative.

The output should help a new employee, contractor, founder, or agency partner make on-brand decisions quickly without asking for permission on every asset.

## Trigger

Use this skill when the user asks to:

- create a brand guide, brand book, or brand manual
- define brand guidelines for a new business or product
- tighten or refresh an existing brand guide
- document voice and tone, logo rules, visual identity, or messaging
- turn brand strategy into a usable operating document

Trigger aliases:

- `/brand-guide`
- `/brand-guidelines`

## Read First

Anchor on local assets before broad advice:

1. `outputs/book-summaries/100m-branding-playbook.md`
2. `outputs/book-summaries/100m-marketing-machine.md`

Use those sources to keep the guide tied to:

- deliberate association: what the brand should be mentally grouped with
- behavior change: branding should change action, not just opinion
- proof systems: trust assets should be captured and reused systematically

If the user asks for benchmarks, examples, or "deep research," also use the `deep-web-research` skill.

## Default Mode

Default to a balanced collaborative workflow:

1. run discovery with the user
2. establish brand decisions
3. draft the guide
4. review gaps and tighten examples

Do not jump straight to colors and logos if positioning, audience, or desired associations are still fuzzy.

## Inputs Required

Ask for the minimum needed to make strong decisions:

1. Brand or company name
2. What it sells
3. Primary audience or avatar
4. Desired market position
5. Competitors or alternatives
6. Main channels: product, web, sales, social, email, print, events
7. Existing assets: logo, colors, fonts, copy, website, deck
8. Output type wanted: quick one-pager, practical brand guide, or full brand book

High-leverage optional inputs:

- proof assets: testimonials, case studies, reviews, awards, metrics
- brand personality words
- associations to own
- associations to avoid
- sub-brands or brand architecture

If information is missing, ask only the highest-leverage questions first.

## Workflow

## Step 1: Classify the job

Determine which path fits:

- `new-brand`: little or no prior brand system exists
- `refresh`: brand exists but needs clearer rules and consistency
- `audit`: user already has a guide and wants critique or improvement
- `rebrand`: positioning, audience, or associations are changing materially

## Step 2: Build the decision spine

Before drafting, lock these decisions:

- `Audience`: who the brand is for
- `Positioning`: what niche or role the brand occupies
- `Promise`: what value the brand reliably signals
- `Associations to own`: what people should mentally group the brand with
- `Associations to avoid`: what would make the brand feel off-strategy
- `Proof`: what evidence makes the promise believable

If these are weak, the guide will become decorative and generic.

**Near-miss counter-example:**
A brand locks all six spine decisions: clear audience (mid-market SaaS ops teams), sharp positioning (the automation layer between tools), a strong promise (10x fewer manual handoffs), deliberate associations to own (Zapier-level simplicity for enterprise workflows), associations to avoid (consulting-heavy, slow implementations). The spine looks complete and specific. But the Proof field says "our customers love us" and "great support." No named testimonials, no specific metrics, no case studies. The guide that follows has a strong voice, a clear visual identity, and zero concrete trust evidence — every proof placeholder gets filled with stock language. Fix: proof must be specific and reusable — named customers, quoted outcomes, and documented metrics (e.g., "Acme Corp reduced handoff errors 73% in 6 weeks").

## Step 3: Translate strategy into rules

Create guidance in four layers:

1. `Brand core`
2. `Verbal system`
3. `Visual system`
4. `Operating system`

The operating system matters more than most people expect. Include governance, templates, asset locations, and approval rules so the guide is actually usable.

## Step 4: Draft the guide

Use the structure in [BRAND-GUIDE-TEMPLATE.md](BRAND-GUIDE-TEMPLATE.md).

Default rule:

- keep philosophy brief
- make execution concrete
- show examples wherever possible

## Step 5: Stress-test the guide

Before finalizing, ask:

- Can a smart new hire use this in 15 minutes?
- Are there concrete do and do-not examples?
- Is voice separated from tone-by-context?
- Are visual rules linked to real use cases?
- Are proof assets and templates included?
- Is there an owner and update path?

If the answer is no to any of these, the guide is not strong enough yet.

### 7-layer visual audit (for brands with digital products)

If the brand has a website, app, or digital product, also run this checklist before finalizing. These seven layers are where professional design diverges most sharply from AI-generated defaults:

- [ ] **Color roles**: Does the color system define functional roles (action, structural, surface, status), not just hex values?
- [ ] **Typography system**: Does it specify scale with exact sizes/weights per heading level, body line-height, max-width, and letter-spacing?
- [ ] **Spacing rhythm**: Does the spacing system define a base unit and at least 3 deliberate stops (tight, standard, generous)?
- [ ] **Motion standards**: Does the motion section define an easing function, 3 duration tiers, and required interaction states (hover, active, focus, disabled, loading)?
- [ ] **Accessibility**: Are WCAG AA contrast ratios specified for every color pairing, with semantic HTML and keyboard navigation requirements?
- [ ] **Token output**: Is there a design token block (CSS custom properties) and a prompt-ready constraint block that AI tools can consume?
- [ ] **Distinctiveness**: Does the visual system include at least one signature visual element (brand character, scroll interaction, distinctive illustration style) that an AI coding tool would never generate unprompted? If yes, is it defined in the brand character/signature visual procedure above? If no, return to that procedure and either complete it or explicitly document why the brand does not need one.

If any gate fails, return to the relevant visual system procedure and complete the fill-in-the-blank fields.

## Required Sections

Unless the user explicitly wants a smaller deliverable, include:

1. `Guide purpose and scope`
2. `Brand core`
3. `Audience and positioning`
4. `Associations to own and avoid`
5. `Voice and tone`
6. `Messaging pillars`
7. `Logo system`
8. `Color system`
9. `Typography`
10. `Imagery, illustration, iconography, and motion`
11. `Channel rules`
12. `Templates and examples`
13. `Governance`

## Voice And Tone Rules

Do not accept vague language like:

- "be human"
- "be bold"
- "be premium"

Convert abstract traits into:

- plain-English meaning
- when to lean into the trait
- when to tone it down
- words to use
- words to avoid
- example rewrites

Separate:

- `voice`: stable personality
- `tone`: context-specific adjustment

**Near-miss counter-example:**
A brand defines three clear voice traits (Confident, Precise, Warm) with do/avoid word lists and example rewrites for each. The voice section looks complete. But the guide never defines how tone shifts by context — so the same casual, warm register is used in marketing copy, legal disclaimers, error messages, and password-reset emails. A support email about a billing dispute reads like a marketing newsletter. Fix: add a tone-by-context table that specifies how traits flex up or down for each channel (sales, product UI, support, legal, internal).

## Visual System

The visual system is where brand guides most often fail. Generic rules like "specify approved variants" produce generic output. Each subsystem below has a fill-in-the-blank procedure that must be completed before drafting visual rules.

For logo rules specifically: specify approved variants, include usage rules, include misuse examples, and connect rules to channels where they matter. The procedures below cover the five subsystems where guides need to go beyond declarative rules.

**Implementation depth:** This skill defines WHAT values the brand should use. For HOW to implement those values in code — animation timing, component state systems, skeleton patterns, shadow layering, GPU performance, and the 50+ polish details that separate professional products from amateur ones — reference the `product-craft` skill.

### Color system procedure

Before choosing colors, fill in:

- Brand personality in one word: ___
- Emotional mood (warm/cool/neutral, saturated/muted): ___
- Action color (used exclusively for CTAs and primary interactive elements): ___ hex
- Structural colors (headings, borders, backgrounds): ___ hex values
- Surface hierarchy (list from deepest background to most elevated surface): ___
- Status colors (success, warning, error, info): ___ hex values
- Dark mode strategy (primary design target or light-mode override): ___
- Minimum contrast ratios: body text ___:1, large text ___:1

**Worked example — Linear:**

| Field | Value |
|---|---|
| Personality | Serious, exact, crafted |
| Mood | Cool neutral, desaturated |
| Action color | Desaturated blue `oklch(0.546 0.14 258)` — used only for selected states and primary actions |
| Structural colors | Nordic Gray `#222326` (text), Mercury White `#F4F5F8` (light surfaces) |
| Surface hierarchy | Background 12% → Card 15% → Popover 19% → Modal 22% lightness (LCH-based, generated from 3 inputs) |
| Dark mode | Primary design target; light mode is the override |
| Contrast | 4.5:1 minimum for body, 3:1 for large text |

**Near-miss counter-example:**
A B2B SaaS brand picks a strong, distinctive color palette: deep teal action color, warm gray neutrals, graduated dark-mode surfaces. The palette is well-designed. But the guide doesn't restrict the action color to interactive elements only — designers start using teal for section backgrounds, decorative borders, and icon fills. Within three months, the CTA button no longer stands out on any page because teal is everywhere. Conversion on the main pricing page drops 18% and nobody connects it to the color drift. Fix: add the rule "action color appears only on clickable elements" and list specific misuse examples showing the color on non-interactive surfaces.

### Typography procedure

Before choosing fonts, fill in:

- Brand personality word: ___
- Does this word suggest serif (craft, authority, editorial) or sans-serif (modern, clean, technical)? ___
- Heading font: ___
- Body font: ___
- Weight contrast: ___ (light end, e.g., 200) vs ___ (bold end, e.g., 800)
- Heading scale (exact sizes and weights for H1–H6): ___
- Body size: ___px, line-height: ___, max-width: ___ch
- Letter-spacing for headings: ___
- Fonts to explicitly avoid: ___
- Fallback font stack: ___

**Worked example — Linear:**

| Field | Value |
|---|---|
| Personality | Serious, exact |
| Category | Sans-serif (modern, technical) |
| Heading font | Inter Display (adds expression while maintaining readability) |
| Body font | Inter |
| Weight contrast | 400 (body) vs 700 (headings) |
| Body size | 13px, line-height 1.4–1.5, max-width 65ch |
| Letter-spacing | `tracking-tight` (-0.02em) on headings, neutral on body |
| Avoid | System defaults without explicit selection |

**Near-miss counter-example:**
A brand guide specifies Instrument Serif for headings and Inter for body — a distinctive, well-chosen pairing. The font section looks complete. But the guide doesn't specify `max-width` for body text or adjust line-height from the framework default (1.5). On desktop, body paragraphs stretch to 120+ characters per line with tight leading, making long-form content exhausting to read. The typography *looks* professional in hero sections but breaks down in documentation and blog posts. Fix: add `max-width: 65ch` for body containers and `line-height: 1.6–1.7` for body text.

### Spacing and layout rhythm procedure

Before defining layout rules, fill in:

- Base spacing unit: ___ (4px or 8px)
- Tight grouping (related elements like form fields, nav items): ___px
- Standard section gap (between content blocks): ___px
- Generous breathing room (around CTAs, heroes, key moments): ___px
- Max content width for reading: ___px or ___ch
- Border radius system: small ___px, medium ___px, large ___px

**Worked example — Linear:**

| Field | Value |
|---|---|
| Base unit | 4px |
| Tight grouping | 4–8px |
| Standard gap | 16–24px |
| Generous | 32–48px |
| Border radius | 6px (buttons/inputs), 8px (cards/panels), 12px (modals/dialogs) |

**Anti-pattern:** Uniform `padding: 16px` and `gap: 24px` everywhere with no variation. This creates mechanical, flat layouts where nothing feels grouped or separated — every element has equal visual weight regardless of its relationship to other elements.

### Micro-interaction and motion procedure

Before defining motion rules, fill in:

- Primary easing function: ___
- Fast duration (micro-feedback: hovers, button presses): ___ms
- Standard duration (state transitions, panel reveals): ___ms
- Slow duration (page-level transitions, modal enters): ___ms
- Required interaction states for all interactive elements: ___

**Worked example — Linear:**

| Field | Value |
|---|---|
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` ease-out |
| Fast | 100ms |
| Standard | 150ms |
| Slow | 250ms |
| Required states | hover, active (`scale-0.98`), focus (visible ring), disabled (reduced opacity), loading (inline indicator) |

**Anti-pattern:** Fade-in as the only animation, applied identically to every element on page load. Professional products use varied, purposeful motion: cards lift on hover, lists stagger on reveal, panels slide in from their origin direction.

### Surface and elevation procedure

Before defining surface rules, fill in:

- Background (deepest layer): ___ color
- Card / elevated surface: ___ color
- Popover / dropdown: ___ color
- Modal / dialog: ___ color
- Border treatment: ___ (solid subtle, none with shadow, etc.)
- Shadow system: card ___. popover ___. modal ___.

**Anti-pattern:** Binary surfaces — one background color and one card color with nothing in between. Professional products use 3–5 graduated surface levels where each elevation step has a distinct lightness value and shadow treatment.

### Brand character and signature visual procedure

A signature visual is a single distinctive, branded element that an AI coding tool would never generate unprompted. It passes the 50ms trust gate, triggers the Von Restorff effect (200–300% better recall for distinctive elements), and does persuasion work — not just decoration. Not every brand needs one, but every brand should make a deliberate decision.

Before defining rules, fill in:

- Does the brand need a signature visual element? (use the decision gate below)
- Type: brand character/mascot, scroll-driven product demo, signature illustration style, interactive visual metaphor, or none
- If character — name: ___, personality: ___, visual style: ___, relationship to product: ___
- If interaction — what persuasion job does it do? (demonstrate product, explain mechanism, create emotional engagement, build brand recall): ___
- Usage contexts (where the element appears — landing page hero, onboarding, loading states, error pages, social): ___
- Usage exclusions (where it must NOT appear): ___
- Performance budget (max additional load time this element may add): ___ms

**Decision gate — when a signature visual is warranted:**

- Product is visual or demonstrable → strong candidate (SuperShrimp laptop scroll, Stripe code animation)
- Brand personality is distinctive or playful → mascot candidate (Duolingo owl, Mailchimp Freddie)
- Category is crowded with similar-looking competitors → high value (Von Restorff differentiation)
- Product is commodity/utility with no personality angle → skip, invest in other distinctiveness levers (color, typography, illustration style)
- Page speed is critical and audience is on slow connections → skip heavy interactions

**The gimmick-vs-signature test:** Before committing, answer three questions. If any answer is "no," the element is a gimmick, not a signature moment:

1. Does it advance the visitor toward the purchase decision? (demonstrates product, builds trust, or handles an objection)
2. Is it connected to the brand promise or product metaphor? (not just "looks cool")
3. Can it load within the page's LCP budget (< 2.5s) on a median mobile device?

**Worked example — SuperShrimp:**

| Field | Value |
|---|---|
| Type | Brand character (shrimp) + scroll-driven product demo (laptop) |
| Character personality | Self-deprecating, motivational, gamified |
| Relationship to product | The shrimp IS the posture metaphor — "stop sitting like a shrimp" |
| Persuasion job | Laptop scroll demonstrates the product in context (user sees the app running on a laptop as they scroll) |
| Usage contexts | Landing page hero, in-app avatar, leaderboard, social media |
| Usage exclusions | Legal pages, invoices, formal partner communications |
| Performance | Character is CSS/emoji-based (near-zero weight); laptop scroll uses lightweight scroll-triggered animation |

**Near-miss counter-example:**
A B2B analytics startup creates an elaborate 3D mascot (a friendly robot) with WebGL animations on the landing page. The robot is beautifully rendered, has idle animations, and reacts to cursor movement. The visual craft is high. But the robot has no connection to the product (dashboards), the audience (data analysts who value precision over whimsy), or the brand promise (accurate forecasting). It adds 2.3 seconds to LCP on mobile. The mascot gets internal praise ("it looks so cool") but analytics show 40% of mobile visitors bounce before the hero finishes loading, and the brand is remembered as "the one with the robot" rather than "the accurate forecasting tool." Fix: the signature visual must serve the brand promise, not just demonstrate craft. If the product is about precision, the signature visual should demonstrate precision — not friendliness.

### Connecting visual rules to design systems

If the user has digital products, the visual system must produce outputs that feed directly into a design system:

- Design tokens (CSS custom properties or Tailwind config) for every color, spacing, radius, and shadow value
- Component-level rules: which components use which tokens
- Accessibility requirements as hard constraints, not suggestions

## AI-Readiness Layer

Brand guides are now AI infrastructure. Without explicit visual constraints, AI coding tools (Cursor, Lovable, Bolt.new, Claude Code) default to the statistical average of their training data: Inter font, blue-to-purple gradients, Lucide icons, uniform spacing, and shadcn/ui components used without customization. Anthropic calls this distributional convergence — LLMs sample from the probability center of web training data, and safe, generic design choices dominate that center.

A brand guide that only works for humans reading a PDF misses its highest-leverage use case: serving as the constraint input that prevents AI tools from producing generic output.

For every brand with digital products, the guide must produce two AI-consumable outputs:

### Design token block

A CSS custom properties block (or Tailwind config) containing every value from the visual system. This block can be pasted directly into a project's stylesheet or handed to an AI coding tool.

```css
:root {
  --color-action: [action color hex];
  --color-bg: [background hex];
  --color-card: [card surface hex];
  --color-text: [primary text hex];
  --color-text-muted: [secondary text hex];
  --color-border: [border hex];
  --font-heading: [heading font stack];
  --font-body: [body font stack];
  --radius-sm: [small radius]px;
  --radius-md: [medium radius]px;
  --radius-lg: [large radius]px;
  --space-tight: [tight grouping]px;
  --space-standard: [standard gap]px;
  --space-generous: [generous breathing room]px;
  --ease-default: [easing function];
  --duration-fast: [fast]ms;
  --duration-standard: [standard]ms;
  --duration-slow: [slow]ms;
}
```

### Prompt-ready constraint block

A short markdown block optimized for AI context. Paste this into system prompts, Cursor rules, or Claude skills to steer AI output toward the brand's visual identity.

Fill in:

```markdown
## Visual identity constraints

Personality: [1–3 words]
Mood: [warm/cool/neutral, saturated/muted]

Fonts: [heading font] for headings, [body font] for body text. Never use: [avoid list].
Colors: Action [hex], background [hex], card [hex], text [hex], border [hex].
Dark mode: [primary / override].

Spacing: [base unit]px base. Tight [X]px, standard [Y]px, generous [Z]px.
Radius: small [A]px, medium [B]px, large [C]px.
Motion: [easing function], fast [X]ms, standard [Y]ms, slow [Z]ms.

Reference products: [2–3 products whose design quality to match]
Avoid: [specific patterns to never use — e.g., "purple gradients, centered three-column feature grids, generic hero with gradient text"]
```

**Worked example — B2B analytics brand:**

```markdown
## Visual identity constraints

Personality: Precise, calm, trustworthy
Mood: Cool neutral, muted

Fonts: IBM Plex Sans for headings, Inter for body. Never use: Roboto, Open Sans, system defaults without explicit selection.
Colors: Action #2563EB, background #09090B, card #111113, text #E4E4E7, border #27272A.
Dark mode: primary.

Spacing: 4px base. Tight 8px, standard 24px, generous 48px.
Radius: small 4px, medium 8px, large 12px.
Motion: cubic-bezier(0.16, 1, 0.3, 1), fast 100ms, standard 150ms, slow 250ms.

Reference products: Linear, Vercel, Raycast
Avoid: purple gradients, Lucide icons without customization, centered cards with uniform padding, fade-in as the only animation, shadcn/ui components used with zero brand adaptation.
```

## Proof And Trust Layer

Use Hormozi's branding and marketing-machine lens:

- what proof makes the promise believable?
- what stories, customer moments, metrics, and artifacts should the brand system repeatedly surface?

Good brand guides do not only describe how the brand looks.
They also define how the brand earns trust.

## Branding Tactics for Conversion

Brand consistency is not a feel-good exercise. It is a measurable conversion lever. This section provides the specific mechanisms through which branding decisions directly affect conversion rates, trust formation, and revenue — and should be incorporated into every brand guide.

### Brand Consistency = Conversion (Quantified)

- Consistent brand presentation increases revenue by up to 23% (Demand Metric / WifiTalents)
- Consistent brands are perceived as 2.3x more trustworthy than inconsistent ones (Magnt)
- Reduced cognitive load from visual consistency increases conversion rates by up to 40% (Magnt)
- 81% of consumers say they need to trust a brand before buying (WifiTalents)
- 90% of consumers expect their experience to be consistent across all channels and platforms (WifiTalents)
- 71% of consumers are more likely to buy from a brand that recognizes them across channels (WifiTalents)

Use these numbers to justify brand investment internally. Brand consistency is not about aesthetics — it is about reducing the mental effort required to trust and buy.

### 50-Millisecond Trust Formation

Visitors form opinions about websites in 50 milliseconds — before any copy is read. Visual design quality is the first and fastest trust signal. Colors, typography, layout quality, and professional imagery either pass or fail this gate instantly.

Implications for brand guides:
- Visual system rules must be precise enough that every new page passes the 50ms test
- Stock photography that doesn't match the brand or audience fails this test immediately
- Inconsistent color, typography, or logo usage creates a subconscious "something is off" reaction that reduces conversion even when the copy is strong

### Color as Conversion Tool

- Limit landing page palettes to 1–3 colors for clarity and professionalism
- Assign a specific role to each color: one for primary action (CTA), one for headings/structure, one for background/neutral
- The CTA color should be the most visually prominent color on the page and should not appear elsewhere except in CTAs — this is a brand system decision, not a one-off design choice
- Consistent color schemes across pages build pattern recognition and reduce cognitive switching cost
- Accessibility contrast ratios (WCAG AA: 4.5:1 for body text, 3:1 for large text) are brand requirements, not just compliance boxes — 83.6% of homepages fail this

When creating the brand guide color system, explicitly define:
- Which color is the "action" color (used only for CTAs and primary interactive elements)
- Which colors are structural (headings, borders, backgrounds)
- Minimum contrast ratios for each pairing

### Typography as Trust Signal

- Consistent fonts improve readability and increase conversion
- Font choice communicates brand personality at a subconscious level: serif fonts convey craft, tradition, and authority; sans-serif fonts convey modernity, cleanliness, and approachability
- Heading hierarchy (H1 → H2 → H3) guides visual scanning for all users, not just screen reader users — it is both an accessibility requirement and a conversion tool
- Inconsistent typography (mixed fonts, inconsistent weights, varying heading sizes) signals amateurism and reduces trust

When creating the brand guide typography system, specify:
- Heading scale with exact sizes and weights for each level
- Body copy rules (size, line-height, max-width for readability)
- Which weights to use for emphasis (not just "bold" — specify the weight number)
- Fallback fonts for web and email to prevent flash-of-unstyled-text

### Visual Consistency Checklist

Use this checklist in the brand guide to ensure consistency across all landing pages and marketing surfaces:

- [ ] Logo: correct version for context (full, icon, reversed)
- [ ] Favicon: matches brand mark (a mismatched favicon triggers distrust)
- [ ] Color palette: only approved colors used; CTA color consistent across pages
- [ ] Font stack: correct primary and fallback fonts loaded
- [ ] Imagery style: consistent photography/illustration treatment
- [ ] Icon style: consistent weight, style, and color
- [ ] Button style: consistent shape, color, and text treatment across all CTAs
- [ ] Spacing and layout rhythm: consistent padding, margins, and section structure
- [ ] Tone: copy matches brand voice traits defined in verbal identity

Each inconsistency is a micro-erosion of trust. Visitors cannot articulate why a page "feels off," but the conversion data will show it.

### Brand-to-Landing-Page Handoff Rules

Define in every brand guide which brand decisions directly affect landing page conversion. Make these explicit so that landing page builders (whether internal team, agency, or AI) can apply them without guessing:

| Brand Guide Decision | Landing Page Impact |
|---|---|
| Headline voice (traits, vocabulary) | Determines headline tone and word choice on every page |
| CTA tone (confident, casual, urgent) | Determines button text style across all pages |
| Action color | Determines CTA button color (must be consistent) |
| Proof asset library | Determines which testimonials, logos, and metrics appear on pages |
| Association strategy | Determines which third-party logos, certifications, and media mentions to feature |
| Imagery style | Determines hero images, product photos, and illustration treatment |
| Trust badge selection | Determines which security, compliance, and review badges to display |

### Association Strategy on Landing Pages

Apply Hormozi's deliberate association framework (from `$100M Branding Playbook`):

The brand should be deliberately paired with things the target avatar already trusts, follows, and values. On landing pages, this means:

- **Logo bar selection**: choose customer logos the target avatar recognizes and respects — not just the biggest names, but the most relevant to the prospect's identity
- **Media mentions**: feature publications the avatar actually reads ("As seen in [publication avatar trusts]")
- **Certification badges**: display certifications that matter to the avatar (SOC 2 for enterprise buyers, LegitScript for health, BBB for consumers)
- **Review platforms**: show scores from platforms the avatar uses for evaluation (G2 for SaaS buyers, Trustpilot for consumers, Google for local)
- **Partner logos**: feature technology or ecosystem partners the avatar already uses

Bad association: random Fortune 500 logos that don't match the avatar's world.
Good association: specific peer companies, trusted publications, and relevant certifications that make the avatar think "these are my people."

### Proof System Design

The brand guide should define a systematic process for capturing and reusing trust assets, not leave proof to ad-hoc collection:

**Capture cadence:**
- After every successful engagement, request a testimonial (written, video, or screenshot)
- After every measurable outcome, document it as a case study candidate
- After every media mention, award, or certification, add it to the proof library

**Proof asset types to maintain:**
- Customer testimonials (written, with name/title/company/outcome)
- Video testimonials (30–60 seconds, specific results)
- Case studies (problem → solution → measurable outcome)
- Aggregate metrics ("X customers served", "Y% average improvement")
- Third-party review scores (G2, Trustpilot, Google, Capterra)
- Media mentions and press logos
- Certifications and compliance badges
- Awards and recognitions
- User-generated content (photos, videos, social posts)

**Proof-by-channel guidance:**
- Landing pages: lead with strongest 2–3 proof assets above fold; repeat near CTA
- Sales decks: case studies matched to prospect's industry/size
- Email: one proof point per email; rotate across campaigns
- Social: UGC and customer stories over polished case studies
- Product: in-app social proof (usage stats, peer activity)

Define which proof assets are approved for public use, which require customer consent refresh, and who maintains the proof library.

## Output Modes

## Mode A: Collaborative workshop

Use when the user wants to co-create the guide live.

Process:

1. ask a tight set of discovery questions
2. reflect back the proposed brand spine
3. get confirmation or edits
4. draft one section at a time

## Mode B: Full first draft

Use when the user wants speed.

Produce:

- concise executive summary
- full guide using the template
- short `Open Questions` section listing what to validate

## Mode C: Audit and rewrite

Use when the user already has a brand guide.

Produce:

- what is strong
- what is vague or missing
- what will cause inconsistency in practice
- a tightened replacement structure

## Quality Bar

Do not finalize a guide unless it passes all of these:

- [ ] Brand core is specific, not slogan-like
- [ ] Positioning is explicit
- [ ] Desired associations are named
- [ ] Voice section includes examples
- [ ] Tone varies by context
- [ ] Visual rules include misuse examples
- [ ] Templates or usage examples are present
- [ ] Governance and ownership are defined
- [ ] Guide helps non-designers make decisions
- [ ] The document could realistically be used in daily work

## Anti-Patterns

Avoid:

- overlong mission and values pages with no downstream decisions
- generic adjectives with no examples
- a purely visual guide with no messaging rules
- a purely messaging guide with no usage governance
- static "brand theater" that cannot guide actual work
- treating the PDF as the product instead of the system behind it
- **the AI default aesthetic**: if the brand guide's visual system would produce Inter font, Lucide icons, blue-to-purple gradients, uniform spacing, and default shadcn/ui components when handed to an AI coding tool, the visual system is too generic to be useful. This recipe is now pattern-recognized by users as "this was made by AI" the same way WordPress themes were in the 2010s. The origin: Tailwind CSS's `indigo-500` default propagated through training data at massive scale. Every visual decision in the guide should deviate from at least 3 of these defaults. If it doesn't, revisit the visual system procedures.

## Standard Response Structure

When delivering a full guide or major section, use:

```markdown
# [Brand Name] Brand Guide

## Executive summary

[1 short paragraph]

## Brand core

## Audience and positioning

## Verbal identity

## Visual identity

## Channel guidance

## Templates and proof assets

## Governance

## Open questions
```
