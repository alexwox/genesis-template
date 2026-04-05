---
name: constructing-a-landing-page
description: Design, audit, or optimize landing pages for any business model. Routes to the right configuration (B2B SaaS, B2C ecommerce, high-consideration application, lead gen / local service, content / lead magnet, pricing page), then produces a section-by-section build spec with copy direction, CTA strategy, post-CTA experience, proof tactics, pricing display, micro-copy, performance targets, accessibility, compliance, and experiments.
---

# Constructing a Landing Page

## Purpose

Build or audit a landing page from hero section to post-CTA experience. The output is always a section-by-section action plan with element checklists, copy direction, benchmark targets, risk-labeled tactics, and prioritized experiments — not a list of generic tips.

Slash command: `/landing-page`

---

## Trigger

Apply this skill when the user asks things like:

- "Help me build a landing page for X"
- "Tear down this competitor's landing page"
- "Why isn't my page converting?"
- "Audit my sales page / product page / pricing page"
- "What should my landing page look like?"
- "Optimize my hero section / CTA / checkout page"
- "Review this page and tell me what to fix"

---

## Step 1 — Collect Inputs

Before building anything, gather the following. Ask only for what is missing; use sensible defaults for the rest.

| Input | Why It Matters | Default If Not Provided |
|---|---|---|
| Goal of the page | Determines structure and CTA type | Lead capture |
| What you sell | Routes to configuration | — (must ask) |
| ACV or average order value | Sets page length and proof depth | Infer from product |
| Audience awareness level | Sets copy angle and section order | Problem-aware |
| Primary traffic source | Determines message match requirements | Paid ads |
| Brand maturity | Determines trust signal weight | Early-stage |
| Existing brand guide | Determines visual/verbal consistency | None |
| Output mode | `build_spec`, `teardown`, or `optimization_sprint` | `build_spec` |

---

## Step 2 — Select Configuration

Route to exactly one primary configuration. Each has its own section emphasis, page length, CTA pattern, and proof requirements.

### Decision Logic

```
IF B2B SaaS product with demo or trial CTA:
  → B2B SaaS Landing Page
ELIF physical or digital product with add-to-cart:
  → B2C Ecommerce Product Page
ELIF application/intake form → qualification → consult/purchase:
  → High-Consideration Application Page
ELIF local service or agency with form/call/booking CTA:
  → Lead Gen / Local Service Page
ELIF free resource download (ebook, tool, template, webinar):
  → Content / Lead Magnet Page
ELIF plan comparison or tier selection:
  → Pricing Page
```

### Configuration Reference

#### Config A: B2B SaaS Landing Page

Typical ACV: $1K–$100K+. Long-form. ROI-focused proof required. Multi-stakeholder audience (6–13 buyers per deal — Gartner).

Page length: Long (1,500–5,000+ words). Cold traffic needs education and objection handling before CTA.

Primary CTA: "Book a Demo" / "Start Free Trial" / "Get Started Free"

Must-have sections: hero with outcome headline, logo bar, problem/agitation, how-it-works, features-as-benefits with ROI data, case study with named company and metrics, pricing or "talk to sales" fork, FAQ, final CTA.

Proof emphasis: named case studies with dollar outcomes, G2/Capterra aggregate scores, security/compliance badges (SOC 2, GDPR), integration logos.

95-5 awareness constraint: only ~5% of category is in-market at any time (LinkedIn B2B Institute / Ehrenberg-Bass). For the 95% out-of-market, the page also builds brand memory — so headline, visual identity, and association strategy matter beyond immediate conversion.

#### Config B: B2C Ecommerce Product Page

Typical AOV: $20–$500. Short to medium form. Visual-heavy. Emotion-driven.

Page length: Short to medium (300–1,500 words). High-intent traffic from search or ads; fast decisions.

Primary CTA: "Add to Cart" / "Buy Now" / "Shop Now"

Must-have sections: hero with product image gallery, price + strikethrough if discounted, star rating + review count, key benefits (3–5 bullets), size/variant selector, shipping and return info above fold, UGC / customer photos, FAQ, sticky mobile ATC bar.

Proof emphasis: star ratings, review count, UGC photos/videos, "X sold" or "Y people viewing" social proof, trust badges (secure checkout, free returns).

Key metric: add-to-cart rate 8–15% of viewers (median); checkout completion 45–55% of carts.

#### Config C: High-Consideration Application Page

Medvi-style funnel entry. Intake form as CTA. Qualification theater. Multi-step micro-commitment.

Page length: Medium (500–1,500 words above the form). The form itself replaces a long sales page by progressively engaging the visitor.

Primary CTA: "See If You Qualify" / "Get Your Free Assessment" / "Start Your Application"

Must-have sections: hero with outcome headline + "without X" pain removal, trust badge visible before form starts, 3-step progress indicator, intake form with easy questions first, qualification gate, offer/pricing reveal post-qualification.

Proof emphasis: review badge (Trustpilot / Google), doctor/provider/expert credentials, "X patients/clients served" count, media mentions, professional photography (not stock).

Key tactics: commitment boundary — zero form fields visible on the landing page; the CTA button ("See If You Qualify") is the only commitment ask; form appears only after the click. Trust-reinforced transition — loading screen between CTA click and form reveal shows trust badges (TrustPilot score, provider credentials) to amplify the commitment and prevent regret. Micro-commitment ladder (innocuous data first, sensitive data later), progress bar (3–5 visible steps), medical/professional authority framing, all-inclusive pricing to reduce cognitive load.

#### Config D: Lead Gen / Local Service Page

Typical transaction: $100–$10K. Short form. Form or call CTA with booking emphasis.

Page length: Short (300–800 words). Speed matters — visitor is searching for a solution now.

Primary CTA: "Get a Free Quote" / "Book a Consultation" / "Call Now" / click-to-call button

Must-have sections: hero with specific local outcome headline, phone number visible above fold, short form (3–4 fields max — for warm search traffic, inline is acceptable; for cold or social traffic, place behind a CTA button with form in modal or next step; see Commitment Boundary in Step 4), Google review stars, service area, before/after or portfolio images, FAQ.

Proof emphasis: Google review score + count, local awards, "serving [city] since [year]", license/insurance badges, before/after photos.

Key metric: landing page conversion 5–15% (Google Ads industry averages range 2.9–14.7% — WordStream 2024). Speed-to-lead: respond within 60 seconds for 391% more conversions.

#### Config E: Content / Lead Magnet Page

Goal: capture email in exchange for valuable free resource.

Page length: Short (300–600 words). Value proposition must be clear instantly.

Primary CTA: "Download Now" / "Get the Free [Resource]" / "Send Me the Guide"

Must-have sections: hero with specific outcome headline ("The exact [X] that [achieves Y]"), preview image of the resource, 3–5 bullet points of what's inside, single email/name form (inline is acceptable for 1–2 field forms with warm traffic — the commitment boundary benefit is real but too small to measure at this form complexity; see Commitment Boundary in Step 4), privacy reassurance micro-copy, social proof if available.

Proof emphasis: author credentials, number of downloads, testimonials from people who used the resource, preview of content quality.

Key metric: landing page conversion 15–40% for warm traffic, 5–15% for cold traffic (Unbounce benchmark report: median 6.6% across all industries, top quartile 11.4%+).

#### Config F: Pricing Page

Goal: help visitor select a plan or tier and commit.

Page length: Medium (focused on comparison clarity, not persuasive length).

Primary CTA: "Start Free Trial" / "Choose Plan" / "Get Started" per tier

Must-have sections: tier comparison table (3 tiers convert 20–35% better than single tier), highlighted recommended tier, feature comparison matrix, FAQ addressing pricing objections, guarantee, enterprise/custom tier CTA.

Proof emphasis: customer logos per tier, "most popular" badge, aggregate review score.

Key tactics:
- Anchor high first: display premium tier first or prominently (shifts tier mix 20–40%)
- Decoy positioning: strategically inferior middle option makes target tier look better
- Strikethrough pricing: showing original price crossed out increases conversion up to 40% (University of Chicago)
- Annual vs monthly toggle with savings highlighted
- All-inclusive framing: bundle features so price feels simple

---

## Step 3 — Section-by-Section Build Spec

For the selected configuration, build each section using this template:

### Per-Section Spec Template

```
Section: [name]
Purpose: [what job this section does for the visitor]
Placement: [position in page sequence and why]
Required elements: [list]
Primary tactic: [with risk classification]
Benchmark: [metric and target range]
Diagnostic: [what to check if section underperforms]
```

### Recommended Section Sequence

Build sections in this order. Skip sections that don't apply to the configuration, but never skip Hero, Social Proof, or Final CTA.

#### Section 1: Hero / Above the Fold

Purpose: stop the scroll, communicate the core promise, and present the primary action in under 5 seconds.

Required elements (all 5 — pages with all 5 convert 30% higher):
1. Benefit-driven headline
2. Supporting subheadline (mechanism or specificity)
3. Single primary CTA button
4. Hero visual (product shot, lifestyle image, or short video)
5. One trust signal (review badge, customer count, logo, or "as seen in")

Headline frameworks:
- PAS opener: name pain, agitate, present solution
- AIDA opener: attention-grabbing claim, then interest hook
- "Get X without Y in Z time" (Hormozi Value Equation compression)
- Specificity rule: numbers and named outcomes beat vague claims ("Save 14 hours/week" > "Save time")

Copy rules:
- Headline: 6–12 words. Name who it's for and what they get.
- Subhead: 15–25 words. Add mechanism, specificity, or objection removal.
- CTA: 2–6 words. Action-outcome language ("Get My Free X" not "Submit").

Visual hierarchy:
- Z-pattern for visual-heavy / minimal-text pages (hotspots: top-left branding, top-right trust, bottom-right CTA)
- F-pattern for text-heavy / long-form pages (top horizontal scan, shorter second scan, left-side vertical skim)
- Visitors spend 57% of viewing time above the fold; 84% more attention than below

Directional cues: use arrows or visual lines to direct attention toward the CTA or key content. Arrows beat human gaze for directing form attention (CXL eye-tracking lab study). Hierarchy: arrow > line > triangle > human gaze looking at the CTA. A human looking *away* from the CTA was the worst treatment. If using a hero image with a person, ensure their eye line or body orientation points toward the CTA, not away from it.

Navigation: remove site navigation on dedicated landing pages. Removing nav increases conversions 15–28%.

Message match: the headline must echo the exact language from the ad or link that brought the visitor. Word-for-word match delivers 20–35% conversion lift. This is the single biggest factor in landing page success.

Mobile: primary CTA must be thumb-reachable on first load without scrolling. 60%+ traffic is mobile.

#### Section 2: Social Proof Strip

Purpose: establish credibility before the visitor invests reading effort.

Placement: immediately below hero or integrated into hero section.

Elements (pick 2–3):
- Logo bar of recognizable customers or media mentions (logo bars increased conversions 69% in one test)
- Aggregate review score (G2, Trustpilot, Google — with link for verification). Display real aggregate scores, not curated perfection — 4.75–4.99 stars is peak conversion; 5.0 converts like 3.0–3.49 because perfect scores trigger suspicion (Spiegel/Northwestern, 20M+ pages; 46% of shoppers distrust 5.0 ratings)
- Customer count — use precise numbers: "Trusted by 51,247 teams" outperforms "Trusted by 50,000+ teams" because precision signals a real database, not marketing estimation (Janiszewski & Uy, *Psychological Science*)
- "As seen in" media logos

Rule: place best social proof early and repeat near friction points (form, pricing, CTA). Do not relegate all proof to the footer.

Trust badge selection matters: McAfee (+15.7–21.5%) and Norton (+12.2%) are the only consistently positive performers. Authorize.net, TrustGuard, and Trustwave can lower conversion because they're associated with amateur sites. Display 1–3 badges maximum near the CTA — 6+ badges = -5–8% conversion.

Low-volume guardrail: social proof with small numbers is worse than no social proof. "1 person watching" or "6 sales — 2 weeks ago" actively signals low demand. Set minimum display thresholds (e.g., show only when count > 50) or hide the widget entirely until volume is sufficient.

#### Section 3: Problem + Agitation

Purpose: make the visitor feel the cost of inaction before presenting the solution.

Copy framework: PAS (Problem → Agitate → Solve). 95% of purchase decisions are emotional, then rationalized logically.

Match to awareness level:
- Unaware: lead with a shocking insight or reframe
- Problem-aware: name their exact pain; agitate with cost-of-inaction language
- Solution-aware: compare approaches; show why yours is better
- Product-aware: lead with proof and offer specifics

Rule: never skip agitation. Naming the problem without making it feel urgent produces weak motivation.

#### Section 4: Solution + Mechanism

Purpose: explain how the product/service solves the problem in concrete terms.

Structure: "How it works" in 3–4 numbered steps. Each step = action + outcome.

Ties to Value Equation (from Hormozi local assets): reduce perceived time delay and effort/sacrifice while increasing perceived likelihood of achievement and dream outcome desirability.

Visual: process diagram, numbered steps with icons, or short walkthrough video.

Rule: clarity of mechanism builds perceived likelihood of achievement — the most under-leveraged variable in the Value Equation.

#### Section 5: Features as Benefits

Purpose: translate capabilities into outcomes the buyer cares about.

Structure: 3–6 skimmable blocks. Each block = feature name + benefit statement + proof point (metric, testimonial snippet, or screenshot).

Rule: never list features without a "so that" or "which means" benefit translation. Feature-listing without benefit-proving is the most common landing page failure.

#### Section 6: Visual Demo / Proof

Purpose: show the product working, not just describe it.

Options (by configuration):
- Video: click-to-play, 60–90 seconds. Video can increase conversions 34–86%, but autoplay hurts. Muted autoplay acceptable only for ambient background loops with clear pause controls. Click-to-play required for explainer and testimonial content.
- Product screenshots with annotations
- Interactive demo (for SaaS)
- Before/after comparison (for services, health, home improvement)
- Scroll-driven signature interaction (product shown working inside a rendered context as user scrolls — see Optional G for decision framework and performance constraints)

Placement: after features, before testimonials. Hero section videos get 300–450% higher view rates but must not slow page load.

Technical: video files < 500KB, WebM + MP4 formats, burned-in captions, lazy-load if below fold.

#### Section 7: Testimonials / Case Studies

Purpose: transfer trust from existing customers to the prospect.

Hierarchy of proof strength:
1. Video testimonial with named person, title, company (highest trust — hardest to fake)
2. Written testimonial with photo, full name, title, company, and specific outcome
3. Screenshot of review from third-party platform (G2, Trustpilot, Google)
4. Anonymous or first-name-only quote (lowest trust)

Format rule: hybrid testimonial pages (3–5 videos + 15–30 text testimonials) outperform either format alone. Video-only pages increase bounce rate. Text-only converts lower than hybrid.

Rules:
- Match testimonial persona to target avatar (same industry, role, company size)
- Specific outcomes beat vague praise ("Cut onboarding from 3 weeks to 2 days" > "Great product!")
- B2B: ROI data is required, not optional ("$340K saved in year one")
- B2C: UGC photos/videos outperform studio-produced content for authenticity
- B2B buyers increasingly expect machine-readable, verifiable proof (linked reviews, named peers) — generic stars are losing efficacy
- **Proof proximity:** place each testimonial adjacent to the specific claim it validates, not in a separate consolidated block. Distributed testimonials outperform a single "What customers say" section by 15–30% — the brain processes nearby proof as evidence for the adjacent claim automatically.

Compliance: real customers only, with documented consent. No AI-generated testimonials or transformation photos (FDA warning letters, FTC enforcement, platform bans).

#### Section 8: Who It's For / Use Cases

Purpose: help the visitor self-identify ("this is for me") or self-disqualify (saves everyone time).

Structure: 2–4 persona cards or use-case scenarios. Each names a role, situation, and outcome.

Rule: self-identification reduces bounce from mismatched visitors and increases conversion quality. This section is especially important when the page receives broad traffic.

#### Section 9: Objection Handling / FAQ

Purpose: preemptively address the reasons visitors hesitate before asking for the commitment.

Source objections from: sales call recordings, support tickets, chat logs, review complaints, competitor comparison searches.

Structure: 5–8 items. Each answer is 2–3 sentences maximum, specific, plain language. Covers the mental checklist: What is this? Who is it for? How does it work? What does it cost? Why trust it? What if it doesn't work?

Placement: before the final CTA, not buried in the footer. Objection handling placed near the decision point recovers high-intent visitors who would otherwise leave.

FAQ schema markup: implement JSON-LD for SEO benefit and AI citation eligibility.

#### Section 10: Pricing / Offer Presentation

Purpose: present the investment clearly and make the decision feel obvious.

Structure varies by configuration:

**SaaS / subscription:**
- 3-tier comparison (20–35% better than single tier)
- Highlighted "recommended" tier with "most popular" badge
- Anchor high first: show premium tier prominently (shifts tier mix 20–40%)
- Decoy: middle tier slightly inferior to target tier to create asymmetric dominance
- Annual vs monthly toggle with savings percentage highlighted
- Strikethrough original price if running a promotion (up to 40% conversion lift — University of Chicago)

**Ecommerce:**
- Price prominent near product image
- Strikethrough + percentage saved
- "Free shipping" messaging if applicable (48% abandon due to unexpected shipping costs — Baymard)
- Bundle offers: "Buy 2, get 1 free" structure

**Service / high-consideration:**
- All-inclusive pricing: bundle consult, delivery, support into one number
- Starting-at price to anchor, with "custom quote" for higher tiers
- Payment plan option for high-ticket items

**All configurations:**
- Place guarantee directly under or adjacent to pricing
- Include micro-copy risk reducer near the price ("Cancel anytime", "No hidden fees", "30-day money-back guarantee")

#### Section 11: Risk Reversal / Guarantee

Purpose: remove the last barrier to action by transferring risk from buyer to seller.

Types:
- Unconditional money-back guarantee (strongest signal of confidence)
- Conditional guarantee (tied to usage or outcome — "If you don't see X result in Y days")
- Free trial with no credit card required
- Performance guarantee ("If we don't deliver X, you don't pay")

Rules:
- Specific and confident tone: "Full refund, no questions asked, within 90 days" beats vague "satisfaction guaranteed"
- Easy to redeem: state the process in one sentence
- Placed near pricing AND near final CTA
- Guarantees increase conversion 30–150% and reduce cart abandonment 15–30%
- Customer LTV typically increases 17–40% when strong guarantees build initial confidence

#### Section 12: Final CTA Block

Purpose: give the visitor a clear, low-friction path to act after consuming the full page.

Structure:
- Recap of primary value proposition in 1–2 sentences
- Primary CTA button (same text as hero CTA for consistency)
- Risk reducer micro-copy beneath button
- Optional: secondary CTA for visitors not ready ("Download our free guide instead")

Sticky CTA bar (mobile): always-visible bar at bottom of screen with CTA button and one-line value statement. Sticky CTAs increase mobile conversion 15–40%.

Placement: one final CTA block at the end of the page. Do not end a page without a CTA.

#### Section 13: Footer

Purpose: catch visitors who scroll past the CTA and provide trust/legal infrastructure.

Elements:
- Contact information (email, phone, chat)
- Privacy policy and terms links
- Trust badges (security, compliance, payment processors)
- Secondary CTAs (resources, blog, social links)
- Company info (address, registration if required)

### Optional Sections by Configuration

The sections above form the core sequence for every landing page. The sections below are additive — include them when they apply to the configuration and audience. Each specifies which configurations benefit, where to place it, and what to measure.

#### Optional A: Competitive / Migration Block

Applies to: B2B SaaS (Config A), High-Consideration Application (Config C).

Purpose: intercept the "keep researching" exit by answering comparison questions on your page instead of sending the visitor to a competitor's.

Placement: after Features as Benefits (Section 5) or after FAQ (Section 9). Test both — placement closer to hero works when traffic comes from "[competitor] alternative" queries; placement near FAQ works for broader awareness traffic.

Structure:

**Comparison table:**
- Rows: 5–8 capabilities the buyer cares about most (sourced from sales objection logs and search queries).
- Columns: You vs. 1–2 named alternatives vs. "doing nothing / status quo."
- Use checkmarks, partial-support indicators, and brief explanations — not just green/red. Buyers distrust tables where you win every row.
- "Vs. status quo" column is often the strongest persuader and carries zero legal risk (no competitor naming).

**Migration / switching reassurance (when replacing an incumbent):**
- Timeline: "Most teams migrate in [X days/weeks]"
- Data portability: "Import from [tool] in one click" or "We handle the migration for you"
- Parallel-run option: "Run both side-by-side for 30 days"
- Dedicated migration support: name the role or team that helps

Compliance: do not make false or unverifiable claims about competitor capabilities. Use screenshots or dated citations if referencing specific competitor limitations. FTC Lanham Act risk is real for misleading competitive claims.

Benchmark: pages with a comparison section see 15–25% longer session duration and 10–20% reduction in "competitor alternative" bounce exits (HubSpot, Gartner competitive page data).

#### Optional B: Integrations / Ecosystem Strip

Applies to: B2B SaaS (Config A).

Purpose: prove the product fits into the buyer's existing stack, reducing "will this work with what we already use?" friction.

Placement: after Features as Benefits (Section 5) or after Solution/Mechanism (Section 4). Proximity to the "how it works" explanation is most natural.

Structure:
- Logo grid of top 8–12 integrations the target persona actually uses (not a wall of 200 logos — that reads as noise).
- Organize by category if more than 8: "CRM", "Communication", "Data", etc.
- Each logo links to a dedicated integration detail page or docs page (not just a dead image).
- If the integration ecosystem is a key differentiator, include a "See all X integrations" link to a searchable directory.
- API / webhook callout: "Build custom integrations with our REST API" with link to developer docs.

Rule: only show integrations the target avatar uses. A logo bar of tools the buyer doesn't recognize adds visual noise without trust.

Benchmark: B2B SaaS pages with a visible integration section see 8–15% higher demo request rates when the buyer's existing stack is represented (Databox case study patterns).

#### Optional C: Enterprise Trust / Procurement Block

Applies to: B2B SaaS (Config A) with ACV > $10K, and any configuration selling to regulated industries (healthcare, finance, government).

Purpose: satisfy the security, legal, and procurement reviewers who visit the page on the 2nd or 3rd visit — after the champion has already decided they want the product. These visitors have a different job-to-be-done than the first-time visitor; they need compliance confidence, not persuasion.

Placement: below pricing (Section 10) or as a dedicated "Security & Compliance" section before FAQ (Section 9). Some B2B pages place it as a linked sub-page rather than inline — either works, but the landing page must surface the entry point.

Required elements:

**Security posture:**
- SOC 2 Type II badge with report request link (not just the logo — buyers need to actually request and review it)
- Penetration testing cadence ("annual third-party pen test; latest report available on request")
- Encryption standards (at rest and in transit)
- Uptime SLA with status page link

**Data governance:**
- Data Processing Agreement (DPA) download link
- Subprocessor list link (required under GDPR; increasingly expected by US enterprise buyers)
- Data residency options (EU, US, etc.) if applicable
- Data retention and deletion policies

**Enterprise features (checklist format):**
- SSO / SAML support
- RBAC (role-based access control)
- Audit logs
- Custom data retention
- Dedicated support / SLA tiers
- On-premises or VPC deployment options (if applicable)

**Compliance certifications:**
- GDPR, HIPAA, CCPA, PCI DSS — only list certifications you actually hold
- Display as badges with links to certification details or trust center page
- If you have a dedicated trust center or security page, link prominently: "Visit our Trust Center →"

Rule: do not display security badges you cannot back up with documentation. Enterprise buyers will request the actual reports. Hollow badging destroys trust faster than having no badge at all.

Benchmark: B2B pages with a visible security/compliance section reduce procurement cycle length by 15–30% for deals > $25K (Vanta, Drata customer case studies). Security concerns are the #2 reason enterprise deals stall after technical evaluation (Gartner).

#### Optional D: Long-Page Anchor Navigation

Applies to: B2B SaaS (Config A), Pricing Page (Config F), and any page exceeding ~2,000 words.

Purpose: let visitors jump directly to the section that answers their current question, reducing "TLDR" abandonment on long-form pages. This is distinct from the "remove site navigation" rule — global site nav should still be removed on dedicated landing pages; in-page section navigation helps rather than hurts.

Placement: sticky left sidebar (desktop) or collapsible sticky top bar (mobile). Appears after the visitor scrolls past the hero section.

Structure:
- 5–8 anchor links matching the major section headings (not every subsection).
- Active-state indicator showing which section the visitor is currently reading.
- Smooth-scroll behavior on click.
- Mobile: collapsed by default behind a "Jump to…" or "On this page" toggle to preserve screen real estate.

Implementation rules:
- Each anchor target must have a descriptive `id` attribute for accessibility and deep-linking.
- Anchor nav must not obscure content or CTAs — test overlap on mobile viewport widths.
- Scroll offset must account for any sticky header or CTA bar height.

Accessibility benefit: in-page navigation gives keyboard and screen-reader users a way to skip to relevant content, aligning with WCAG 2.4.1 (Bypass Blocks) and 2.4.5 (Multiple Ways).

Benchmark: long-form pages with anchor navigation see 10–18% higher scroll depth and 8–12% lower bounce rates (Hotjar, Crazy Egg heatmap studies). The effect is strongest on pages longer than 3,000 words.

#### Optional E: Ecommerce PDP Extended Components

Applies to: B2C Ecommerce Product Page (Config B).

Purpose: address the specific UX and conversion patterns that separate high-performing product detail pages from basic product listings. Config B already covers hero image, price, reviews, benefits, UGC, and sticky ATC bar; these components fill the remaining gaps.

**Breadcrumbs:**
- Visible above the product title. Format: Category > Subcategory > Product Name.
- Serves dual purpose: navigation (especially for organic search visitors landing deep) and SEO (structured data via BreadcrumbList JSON-LD).
- Keep it one line; truncate middle categories on mobile if needed.

**Size / fit / spec guidance:**
- Size guide link near size selector (not buried in a tab). Opens as a modal or inline expandable — do not navigate away from the page.
- Include model measurements and "model is wearing size X" for apparel.
- Spec tables for electronics/equipment: dimensions, weight, compatibility, materials.
- Fit predictor tools (e.g., "True to size / Runs small / Runs large" based on review data) reduce returns 20–30%.

**Ingredient / material / spec tabs:**
- Tabbed or accordion UI below the primary content area. Tabs: Description, Ingredients/Materials, Specs, Shipping & Returns.
- Default open: the tab most relevant to the product category (Description for fashion, Specs for electronics, Ingredients for beauty/food).
- Each tab should be indexable content (not hidden from crawlers behind JavaScript-only toggles).

**Shipping and delivery:**
- Delivery estimate visible near the ATC button (not just in a tab). "Order within [X hours] for delivery by [date]" — use real-time calculation.
- Free shipping threshold messaging: "Free shipping on orders over $X — you're $Y away" as a progress bar near ATC.
- Returns policy summary in 1 sentence near the price. Link to full policy.

**Buy Now, Pay Later (BNPL):**
- Display installment messaging near the price: "or 4 interest-free payments of $X with [Klarna/Affirm/Afterpay]".
- BNPL messaging increases AOV 20–30% and conversion 15–20% for items $50–$500 (Klarna merchant data, Afterpay benchmarks).
- Compliance: display APR / fee terms clearly. CFPB scrutiny of BNPL is increasing — do not obscure total cost.

**On-page cross-sell / bundles:**
- "Frequently bought together" or "Complete the look" section below the primary product content, above reviews.
- Show 2–3 complementary products with combined price and "Add all to cart" button.
- Bundle discount messaging: "Save X% when you buy together."
- Cross-sell placement above the fold reduces its effectiveness — keep it below primary product details so it does not distract from the main purchase decision.

**Shipping cutoff timer (ethical):**
- "Order within [X hours Y minutes] for same-day / next-day shipping" — must use real-time inventory and logistics data.
- Risk label: MEDIUM. The timer must reflect actual shipping cutoff times. Fake or always-resetting timers violate FTC guidelines on deceptive urgency and erode trust.

Benchmark targets:
- PDP → ATC rate: 8–15% (median; top quartile 15%+)
- ATC → checkout initiation: 55–65%
- Size guide interaction → reduced return rate: 20–30%
- BNPL display → AOV lift: 20–30%

#### Optional F: Interactive Conversion Tools

Applies to: B2B SaaS (Config A), Lead Gen / Local Service (Config D), High-Consideration Application (Config C).

Purpose: replace passive reading with active engagement. Interactive tools increase time on page, generate lead data, and produce personalized outputs that make the CTA feel earned rather than asked-for.

**ROI / TCO / Savings Calculator:**

Placement: after Features as Benefits (Section 5) or as a standalone section between proof and pricing. Can also serve as the primary CTA itself ("Calculate Your Savings →").

Structure:
- 3–5 input fields maximum. Use sliders or dropdowns for ease; avoid requiring exact numbers the visitor may not know.
- Show results in real-time as inputs change (no "submit" step).
- Output: projected savings, ROI timeline, or cost comparison in clear visual format (bar chart or summary card).
- "Share your results" or "Get a detailed report" as a lead capture gate after showing the headline number.
- Assumptions disclosure: display a collapsible "How we calculated this" section. Hiding assumptions destroys trust. Include data sources and methodology.

Compliance: ROI claims must be defensible. Use conservative defaults. If projections are based on average customer data, state that clearly. Avoid guaranteeing specific financial outcomes — frame as estimates ("customers typically see…" not "you will save…").

Benchmark: pages with interactive calculators see 2–3x higher lead capture rates than static pages with the same offer (Demand Gen Report, Ion Interactive benchmarks).

**Assessment / Quiz:**

Placement: as the primary CTA variant (replacing or complementing the standard form). Works especially well for High-Consideration Application (Config C) and Lead Gen (Config D).

Structure:
- 5–10 questions, progressing from easy to more specific (micro-commitment ladder, same principle as the Medvi intake).
- Each question should feel valuable to answer — the visitor should feel they're getting closer to a personalized recommendation, not filling out a form for your benefit.
- Results page: personalized recommendation, score, or assessment with clear next step.
- Lead capture: gate the detailed results behind email, or show headline results ungated with detailed report gated.
- Segmentation: use quiz answers to route leads to appropriate sales tracks or content.

Rule: the quiz must deliver genuine value. A quiz that asks 10 questions and then says "book a call to learn more" with no actual results will feel like a bait-and-switch and kill trust.

Benchmark: quiz-style lead capture converts 30–50% of starters vs. 5–15% for standard forms (Typeform, Outgrow benchmarks). Lead quality is typically higher because the quiz pre-qualifies and self-segments.

**Product Configurator:**

Applies to: B2C Ecommerce (Config B) for customizable products, and B2B SaaS (Config A) for seat/usage-based packaging.

Structure:
- Visual product builder or plan configurator with real-time price updates.
- Clear summary of selections with "Edit" capability at each step.
- Save / share configuration as a link (for B2B buying committees).
- Final configuration feeds directly into checkout or demo request.

Rule: configurators must not hide pricing until the end. Progressive price revelation as the visitor makes choices maintains trust and reduces sticker shock.

#### Optional G: Signature Visual Moment

Applies to: B2B SaaS (Config A), B2C Ecommerce (Config B) for demonstrable products, Content / Lead Magnet (Config E) when the resource is visual.

Purpose: create a single memorable, brand-specific visual experience that passes the 50ms trust gate, triggers the Von Restorff effect (200–300% better recall for distinctive elements), and does persuasion work — not just decoration.

Placement: integrated into Hero (Section 1) as the hero visual, or embedded in Visual Demo / Proof (Section 6). Never both — one signature moment per page.

**Decision framework:**

```
IF product is visual/demonstrable AND page is long-form:
  → Scroll-driven product demo (SuperShrimp laptop, Stripe code animation)
ELIF brand has a strong character/personality AND audience values approachability:
  → Brand character integration (Duolingo owl, Mailchimp Freddie)
ELIF product is abstract AND mechanism needs explaining:
  → Interactive visual explanation (scroll-triggered diagrams, animated process)
ELIF page is short-form OR AOV < $20 OR traffic is high-intent:
  → Skip — the interaction adds friction between intent and purchase
ELIF mobile traffic > 70% AND interaction requires precise scroll/hover:
  → Skip or degrade gracefully — test mobile experience separately
```

**Types with examples:**

- Scroll-driven product demo: product shown working inside a rendered device or environment as user scrolls (SuperShrimp laptop, Linear feature walkthrough)
- Brand character as guide: mascot appears at key moments to reinforce personality (Duolingo lesson flow, Slack onboarding)
- Signature code/data animation: the product's output is the visual (Stripe API response animating, Vercel deployment cascade)
- Interactive visual metaphor: scroll or hover reveals the product's value through a metaphor (before/after slider, progressive reveal)

**The gimmick-vs-signature test:**

Before building, answer three questions. If any answer is "no," the interaction is a gimmick, not a signature moment:

1. Does it advance the visitor toward the purchase decision? (demonstrates product, builds trust, or handles an objection)
2. Is it connected to the brand promise or product metaphor? (not just "looks cool")
3. Can it load within the page's LCP budget (< 2.5s) on a median mobile device?

**Risk labels:**

- LOW: Static brand character/mascot illustration (CSS/SVG, minimal performance impact)
- MEDIUM: Scroll-triggered animation, progressive reveal (requires scroll event listeners, may impact INP; test on mobile)
- HIGH: WebGL/3D, heavy video, or physics-based interaction (significant performance cost; excludes low-end devices; must degrade gracefully)

**Performance rules:**

- Must not push LCP above 2.5s on mobile
- Lazy-load if below fold
- Provide a static fallback for reduced-motion preference (`prefers-reduced-motion`)
- Test on throttled 3G connection before shipping

**Benchmarks:**

- Interactive pages: 38% longer dwell time vs. static (Blogarama/Outgrow 2026)
- Brand mascots: 72% higher brand recall (MadNext 2026)
- Von Restorff effect: 200–300% better recall for distinctive elements (Ecommerce Psychology)
- Risk: heavy interactions can increase LCP 1–3 seconds, costing ~7% conversion per second (accs-net, Minovex)

**Near-miss counter-example:**
A SaaS landing page adds a beautiful parallax scroll interaction where abstract geometric shapes float and rotate as the user scrolls. The animation is smooth, the easing is custom, and the visual craft is high. But the shapes have no connection to the product (project management), and the parallax effect pushes the CTA below the fold on mobile by adding 400px of scroll distance. The interaction earned internal praise and Twitter engagement but conversion dropped 12% because it delayed the purchase decision without building trust or demonstrating the product. Fix: replace the abstract parallax with a scroll-driven walkthrough of the actual product UI — same scroll mechanic, but now it demonstrates the product and earns the CTA.

Rule: if the brand guide defines a signature visual element, use it here. If no brand guide exists, apply the gimmick-vs-signature test above before investing build effort. Reference the `brand-guide-creation` skill's brand character/signature visual procedure for the element's definition and usage rules.

---

## Step 4 — CTA Deep-Dive

### Copy

- Action-outcome language: tell the visitor what they GET, not what they DO
- Good: "Get My Free Report", "Start Saving Today", "See My Results"
- Bad: "Submit", "Click Here", "Learn More" (vague, no outcome)
- Length: 2–6 words
- First person ("Get **My** Free Trial") outperforms second person ("Get **Your** Free Trial") by +90% in the ContentVerve A/B test, replicated 3 times. Default to first person. Test second person only if the brand voice is explicitly second-person-forward.
- A single word change can swing conversion 10–30%
- Reading level: target 5th–7th grade Flesch-Kincaid. Unbounce's 2024 benchmark (57M conversions, 464M visitors) shows 11.1% conversion at 5th–7th grade vs 5.3% at professional reading level — 2.1x, even for expert audiences. Simplify vocabulary and shorten sentences.
- Concrete over abstract: "Cut 3 hours of copy-pasting every Friday" outperforms "Improve your workflow" by +78–161% in case studies (Packard & Berger, academic work on imageability). Every headline and benefit statement should contain a specific, sensory, imageable outcome.

### Color and Contrast

- Contrast matters more than color psychology: the CTA must be the most visually prominent element on the page
- Rule: CTA color should not appear anywhere else on the page except in the CTA
- High contrast ratio for readability and accessibility
- Industry leanings: blue (trust/SaaS), green (success/signup), orange (urgency/ecommerce) — but always test against your specific page design

### Placement Strategy

- Above fold: orientation CTA (visitor knows what to do from first view)
- Mid-page: reinforcement CTA (after key proof or benefit section)
- End of page: decision CTA (after full persuasion sequence)
- Sticky mobile bar: persistent CTA visible during scroll (+15–40% mobile conversion)
- Eye-tracking alignment: position CTA at Z-pattern terminal point (bottom-right) or along F-pattern left axis

### Single CTA Rule

One primary CTA per page. A single focused CTA increased clicks 371% and sales 1,617% compared to multi-CTA layouts. Multiple CTAs create decision paralysis.

Exception: one secondary CTA is acceptable for visitors not ready for the primary action (e.g., "Not ready? Download the free guide").

### Commitment Boundary

The CTA button is the commitment boundary — the point where the visitor decides "yes, I want this." Everything before the button is persuasion (headline, proof, agitation, mechanism). Everything after the button is collection (form fields, qualification, payment). If form fields are visible before the commitment boundary, the visitor evaluates the effort cost before deciding, and most abandon. If the commitment comes first, consistency bias carries them through the collection phase.

This connects to the `constructing-a-funnel` skill's Principle 2 (commitment escalation): the ladder is `click → answer → personal data → time → money`. A visible form field is a "personal data" ask. A CTA button is a "click" ask. The ladder says click must come before personal data.

**Default rule: when in doubt, hide the form behind a CTA button.**

```
DEFAULT: Hide the form behind a CTA button. When in doubt, use this default.

The commitment boundary is a universal principle. The safe default is
always: button first, form after. The only question is whether the
specific context qualifies for the inline exception.

WHEN IN DOUBT:
  → CTA button only on the landing page (no visible form fields)
  → After click: transition screen with reinforcing proof
    (trust badge, review score, "great choice" confirmation)
    that validates the decision before the form appears
  → Then: form, escalating from easy to hard
  This is the Medvi pattern. It is the safest default because it
  never hurts (commitment/consistency always helps) and it
  dramatically helps for complex forms and cold traffic.

THE ONE EXCEPTION where inline is acceptable:
  IF form has 1-3 fields
  AND traffic is warm/high-intent (search ads, retargeting, referral)
  AND the form is trivially obvious (single email field, no sensitive data)
  → Inline form is acceptable — the commitment boundary benefit
    exists but is too small to measure at this complexity
    (Leadpages: 45% inline vs 44% two-step, 10-test A/B)
  → Even here, the CTA button should be visually dominant and the
    form fields should feel secondary — not the other way around

FOR BLOG/CONTENT PAGES (not dedicated landing pages):
  → Button → modal or scroll-triggered popup (3-5x more signups
    vs passive inline — Sumo/BDOW, 1.8B displays)
  → Inline sidebar/footer forms are passive and ignored
```

**The Medvi pattern** (worked example of commitment boundary done right):

1. Landing page: outcome headline, trust badges, social proof, agitation — zero form fields visible
2. CTA button: "See If You Qualify" — this IS the commitment
3. Loading screen: only the TrustPilot review badge visible — reinforces trust during the transition, creates a psychological "point of no return"
4. Form step 1: easy questions (goal, age range) — low-effort, feels like progress
5. Form step 2: harder questions (weight, health conditions) — by now the visitor is invested
6. Form step 3: contact info (email, phone) — highest friction, but consistency bias is strongest here
7. Qualification gate + offer reveal

**The post-commitment transition screen:**

Between the CTA click and the form, insert a brief transition that reinforces the visitor's decision. This is not decorative — it amplifies commitment by creating temporal distance between the decision and the data collection, making the decision feel final. Elements to show during the transition:

- Trust badge (TrustPilot score, Google review rating, security badge)
- Reassurance micro-copy ("Great choice — let's get you started")
- Progress indicator showing step 1 of N
- Brief loading animation (even if the form is already ready — the pause is the point)

The visitor should feel validated, not abandoned, during this moment.

**Post-commitment escalation rules:**

Once the visitor has crossed the commitment boundary and seen the reinforcing transition, escalate data collection:

- Start with the easiest, least sensitive question (reduces perceived effort)
- Each step should feel like progress toward a result they want
- Show a progress indicator (3–5 visible steps)
- **Endowed progress:** start the progress indicator at step 2 of 5, not step 1 of 4 — same actual effort, but 34% completion vs 19% (Nunes & Dreze, peer-reviewed, 300 participants). The proportion of distance already covered drives motivation, not absolute steps.
- Never surprise with sensitive fields — escalate gradually
- If the form is long, group related fields into named steps ("Your goals", "Your details", "Your contact info")

**Benchmarks:**

- Complex forms (7+ fields) behind commitment boundary: 13.85% vs 4.53% (+206%) — Formstack/HubSpot
- Venture Harbour (11-field B2B form): 0.96% → 8.1% (+743%) after adding commitment boundary + multi-step
- BrokerNotes: 11% → 46% (+318%) — same fields, commitment boundary + step separation only
- Simple 1–3 field forms, warm traffic: 44% vs 45% (tie) — Leadpages, 10 A/B tests
- Commitment/consistency mechanism: 17% → 76% compliance — Freedman & Fraser 1966
- Below 7 fields: only ~14% lift from adding steps — Zuko Analytics
- Mobile multi-step risk: 85.7% abandonment if loading is slow — Zuko Analytics

**Near-miss counter-example:**

A high-consideration application page puts the CTA button in the hero but also shows the first two form fields (name and email) inline below the button as a "preview" of how easy the form is. The intention is good — reduce perceived effort by showing the form is short. But the visible fields shift the visitor's evaluation from "do I want this outcome?" to "do I want to fill out this form?" — reframing the decision from desire to effort. The commitment boundary is broken because the form is visible before the commitment click. Conversion drops 15% compared to a version where only the button is visible and the form appears after the click. Fix: remove all form fields from the landing page. The CTA button should be the only interactive element. The form appears only after the click, preceded by a trust-reinforcing transition screen.

### Button Design

- Minimum 44x44px touch target (WCAG / mobile usability)
- Thumb-zone aligned on mobile (lower half of screen)
- Sufficient padding and whitespace around button
- Rounded corners with drop shadow for affordance
- Hover/active states for desktop feedback

### Micro-Copy Below the Button

Place risk-reducing micro-copy directly beneath or beside the CTA button:
- "No credit card required"
- "Cancel anytime"
- "30-day money-back guarantee"
- "Free for 14 days"
- "Takes less than 2 minutes"
- "Your data is secure (lock icon)"

This micro-copy addresses the last-second hesitation that kills conversions. It is not optional.

---

## Step 5 — Post-CTA Experience

What happens in the 30 seconds after the visitor clicks is as important as what happened before. The moment of conversion is the peak of post-decision rationalization — the visitor's evaluation of your brand is at its most favorable point.

**Speed-to-lead:** respond to every form submission within 60 seconds. Response at 1 minute = 391% higher conversion; response at 5 minutes vs 30 minutes = 21x higher qualification rate (MIT/InsideSales landmark study). Average B2B response is 42+ hours — this is the single largest gap between what the data says and what companies do. For lead gen and demo requests, implement instant callback, SMS auto-reply, or live chat routing.

### Thank-You / Confirmation Page

This is the highest-converting surface in the entire funnel. The visitor is at peak trust, peak post-decision rationalization, and peak behavioral momentum simultaneously. Confirmation page secondary actions convert at 10–15% vs 2–4% for pre-purchase pop-ups (Observed — Cart-X 2026, EasyAppsEcom 2026). A store generating $100K/month that ignores confirmation page optimization leaves $10K–$15K in monthly revenue on the table.

#### Required Elements (all configs)

Every confirmation page needs four layers:

1. **Confirmation**: Clear, specific message about what just happened. Not "Thank you!" but "You're in! Here's what happens next" or "Order #12345 confirmed — shipping in 2–3 business days." Specificity reduces anxiety; vagueness amplifies buyer's remorse.
2. **Expectation-setting**: Two-bullet "what to expect" section above the fold. What they receive, when, and how. Uncertainty at this stage creates regret, cancellation, and support tickets.
3. **Single secondary CTA**: One clear next action that naturally extends the primary commitment. Pages with a single focused CTA convert at 2–3x the rate of pages with multiple competing actions (Observed — Apexure 2026). The CTA must serve the visitor's interest: "Share this with a colleague who'd benefit" (identity signaling), not "Help us grow" (company interest).
4. **Decision reinforcement**: Social proof or value preview confirming the visitor made a good choice. Customer count ("Join 50,000+ teams"), brief testimonial, or rating. Activates the endowment effect — the visitor mentally owns the purchase and becomes more receptive.

**Technical requirements:**
- `<meta name="robots" content="noindex">` on all confirmation pages
- Server-side conversion event (CAPI / Enhanced Conversions), not pixel-only
- GA4 events with UTM parameters on all secondary CTAs

#### Post-CTA Actions by Configuration

**Lead magnet:** Deliver the resource immediately on the page itself (download button), not "check your inbox." The page has 100% view rate vs 20–30% email open rate. Include "Also sent to your email" as backup. Single next-step CTA: if the lead magnet reveals a problem, the CTA offers the solution. Reciprocity is at maximum — the request must be proportional to value received.

**SaaS trial:** Redirect straight to onboarding/activation — not a dead "thanks" page. Time-to-first-value starts now. Products delivering value within 10 minutes see 3x higher trial-to-paid conversion (Observed — 1Capture 2025). Use a confirmation page only when email verification or async setup is genuinely required; in that case show a progress indicator and auto-redirect when ready.

**Ecommerce purchase:** Order confirmation with: order summary (number, items, payment, total) + delivery timeline with tracking + one cross-sell recommendation (contextually relevant complement, not generic — pair with urgency timer and free shipping hooks) + referral prompt ("Share with a friend, get $X off" — double-sided incentives drive 3.2x higher referral rates) + return policy reassurance.

**Application / intake funnel:** "We've received your application" + specific timeline ("You'll hear back within 24 hours by email") + numbered next steps + interim value (educational content, FAQ, community access while they wait). Uncertainty at this stage creates regret and cancellation.

**Demo booking:** Confirmation with date/time/timezone + calendar add (.ics link) + who they're meeting (name, photo, title) + 2–3 bullet agenda + "While you wait" content (case study, product tour video, ROI calculator) + reschedule link. Companies embedding calendar scheduling directly after form submission convert at 66.7% vs 30% industry average (Observed — Prospeo/RevenueHero 2026).

**Referral timing (all configs):** Ask for referrals within 72 hours of purchase/signup — 3–5x ROI vs later asks. Referral CTA in shipping/confirmation emails drove +35% participation. The post-purchase glow fades fast.

#### Celebration Guidance

Celebration animations (confetti, success checkmark, character reaction) can amplify the peak-trust moment — but only when the celebration marks the user's milestone, not the company's.

**The Ramsey Test:** Before adding any celebration, fill in: (1) "This celebration is marking ___." (2) "The user's actual goal was ___." If these are the same → appropriate. If different → the celebration marks a company milestone. Remove it.

**When to include celebration:** High-effort completion after multi-step process (e.g., publishing first listing, deploying a project). Significant purchase where buyer needs reassurance. Milestone achievement that closes a visible loop.

**When to use clean confirmation instead:** Routine actions, serious industries (banking, healthcare, insurance), redirect-to-product flows, intermediate steps in a longer process.

**Accessibility:** Always respect `prefers-reduced-motion`. Replace animation with a static success state (checkmark + text) — never suppress the feedback entirely.

#### Confirmation Page Leak Fixes

| Leak | Impact | Fix |
|---|---|---|
| Blank "Thank you" page with no secondary CTA | Wastes the highest-converting surface in the funnel | Add the 4-layer structure above |
| Multiple competing CTAs | Dilutes action — single CTA converts 2–3x | One primary secondary CTA; de-emphasize others visually |
| No expectation-setting | Creates anxiety, buyer's remorse, support tickets | Two-bullet "what to expect" above the fold |
| SaaS: confirmation page instead of redirect | Squanders behavioral momentum | Redirect to onboarding immediately |
| Celebration on trivial action (account creation, email verification) | Feels cheap, contradicts user's actual goal | Apply the Ramsey Test; celebrate goal completion, not prerequisites |

#### Events to Track Post-CTA

- `confirmation_page_view` (with `conversion_type` property: lead, trial, purchase, application, demo)
- `secondary_cta_click` (with `cta_type`: share, referral, upsell, download, onboarding_start)
- `resource_download_completed`
- `onboarding_started` (SaaS)
- `calendar_booking_confirmed` (demo)
- `celebration_shown` (with `celebration_tier`: micro, standard, major)

---

## Step 6 — Page Length Decision Framework

Match page length to decision weight:

| Signal | Short (300–500 words) | Medium (500–1,500 words) | Long (1,500–5,000+ words) |
|---|---|---|---|
| Offer complexity | Simple | Moderate | High |
| Audience awareness | High (product-aware) | Mixed | Low (unaware / problem-aware) |
| Decision risk | Low (free, cheap) | Medium | High (expensive, commitment) |
| Traffic temperature | Hot (retargeting, referral) | Warm (search, content) | Cold (paid, broad) |
| Trust level | High (known brand) | Medium | Low (new brand) |

Scroll depth reality: 65–75% of visitors scroll past the fold. Most conversions happen below the fold, not above it. The "above the fold" rule is outdated — but the first screen must earn the scroll.

Attention follows a "bathtub curve": high at top, dips in middle, spikes again near bottom. Structure mid-page content to be skimmable so attention doesn't die in the middle.

---

## Step 7 — Micro-Copy Library

### Button Labels by Configuration

| Configuration | Primary CTA | Secondary CTA |
|---|---|---|
| B2B SaaS | "Start Free Trial" / "Book a Demo" | "See Pricing" / "Watch Product Tour" |
| B2C Ecommerce | "Add to Cart" / "Buy Now" | "Save for Later" / "Compare" |
| High-Consideration | "See If You Qualify" / "Get Started" | "Learn How It Works" |
| Lead Gen / Local | "Get My Free Quote" / "Book Now" | "Call Us" / "Chat Now" |
| Lead Magnet | "Download the Free [X]" / "Send Me the Guide" | "Read the Summary First" |
| Pricing Page | "Start Free Trial" / "Choose [Plan Name]" | "Talk to Sales" / "Compare Plans" |

### Field Labels and Helper Text

- Use specific labels: "Work email address" not "Email"
- Helper text below field: "We'll send your report here — no spam, ever"
- Mark required vs optional explicitly (only 14% of sites do both — Baymard)
- Single-column layout (multi-column forms routinely fail in testing)

### Error Messages

- Friendly and specific: "Please enter a valid email address (example: you@company.com)"
- Never: "Error: invalid input" or "Field required"
- Inline validation increases success rates ~22% and cuts completion time 40%+
- Validate on blur (when user leaves the field), not on every keystroke

### Privacy Reassurance

Place directly below or beside the email field:
- "We respect your privacy. Unsubscribe anytime."
- "Your information is encrypted and never shared." (with lock icon)
- Link to privacy policy

### Pricing Micro-Copy

- Use "$0" instead of "Free" — "$0" outperforms "Free" in 10 out of 10 experiments (*Journal of Retailing*) because it activates loss aversion ("not losing money") rather than gain framing
- Per-day price framing: "$0.23/day" vs "$6.99/month" = +34% conversion for low-price subscriptions. Reverses at high daily prices ($11.50/day feels expensive)

### Loading State Messages

When processing takes >1 second, show a contextual message:
- "Finding your personalized results..."
- "Creating your account..."
- "Checking availability..."

Perceived personalization increases patience and perceived value.

---

## Step 8 — Personalization Layer

### Traffic Source Matching

Swap headline and CTA copy based on UTM parameters:
- Google Ads visitor → headline matches exact ad copy
- Facebook Ads visitor → headline matches ad creative text
- Organic search visitor → headline matches search intent
- Email click → headline acknowledges subscriber status ("Welcome back")

Message match is the highest-leverage personalization: 20–35% conversion lift.

### Geo-Personalization

Insert city or region name into headline or subhead:
- "The #1 rated [service] in [City]" (local service)
- "Free shipping to [Country]" (ecommerce)

### Returning Visitor Detection

Adjust messaging for repeat visits:
- First visit: full education sequence
- Return visit: shorter page, skip education, lead with proof and CTA
- Abandoned form: show "Pick up where you left off" with pre-filled data

### Company Enrichment (B2B)

Use IP-to-company enrichment tools to:
- Show industry-matched case study
- Adjust headline to reference visitor's industry
- Display logo of a peer company that's a customer

---

## Step 9 — Performance Requirements

Page speed directly determines conversion. Each additional second of load time reduces conversions by approximately 7%.

### Core Web Vitals Targets

| Metric | Target | What It Measures |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5 seconds | When main content becomes visible |
| INP (Interaction to Next Paint) | < 200 milliseconds | Responsiveness to user interactions |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability during load |

### Implementation Checklist

- [ ] Hero image preloaded (not lazy-loaded)
- [ ] Below-fold images lazy-loaded
- [ ] Images in WebP or AVIF format with fallbacks
- [ ] Video files < 500KB with WebM + MP4 sources
- [ ] Captions burned into video (no separate caption load)
- [ ] No layout-shifting elements (ads, late-loading headers, dynamic content without reserved space)
- [ ] Fonts preloaded or system-font fallback to prevent FOIT/FOUT
- [ ] Third-party scripts deferred or loaded async (analytics, chat widgets, social embeds)
- [ ] Lighthouse performance score 90+ on mobile

### Conversion Impact by CWV Threshold

Crossing into "good" CWV thresholds yields step-change improvements:
- Ecommerce: +8–15% add-to-cart rate, +5–10% orders
- DTC subscription: -12–20% checkout abandonment, +3–7% conversion
- B2B lead gen: +5–9% form completion
- Largest gains come from fixing the slowest 10–20% of sessions (tail risk), not just median performance

---

## Step 10 — Accessibility as Conversion Lever

Accessibility is not just compliance — it is a conversion lever. 71% of users with disabilities abandon inaccessible websites. 94.8% of homepages have detectable WCAG failures.

### Required Standards

WCAG 2.2 AA minimum for all landing pages.

### High-Impact Accessibility Fixes

| Fix | Conversion Impact |
|---|---|
| Visible form labels (not placeholder-only) | +10–15% form completion |
| Specific, friendly error messages | -22% form abandonment |
| Proper color contrast ratios | Removes barrier for ~8% of male visitors with color vision deficiency |
| Logical tab order for keyboard navigation | Enables conversion for keyboard-only users |
| Alt text on all images | SEO benefit + screen reader access |
| Proper heading hierarchy (H1 → H2 → H3) | Improves scanning for all users, not just assistive tech |
| Touch targets minimum 44x44px | Reduces mobile mis-taps |

### Legal Context

- 4,600+ ADA web accessibility lawsuits filed in US federal courts in 2024
- European Accessibility Act effective June 28, 2025 for new products and services
- WCAG 2.2 is the de facto baseline for ADA compliance in US courts

### Business Case

Sites that improved accessibility saw an average 12% lift in organic traffic. Accessible markup favors search engines. The global population using assistive technology: 1.3 billion people.

---

## Step 11 — Compliance Overlay

Run this checklist for every landing page before launch:

### Scarcity and Urgency

- [ ] Countdown timers reflect real deadlines (FTC: up to $53,088/violation for fake scarcity)
- [ ] "Limited spots" / "Only X left" claims are accurate and verifiable
- [ ] Urgency language paired with genuine value, not manipulation

### Testimonials and Proof

- [ ] All testimonials from real customers with documented consent
- [ ] No AI-generated transformation photos or fabricated before/after images
- [ ] Review scores link to verifiable third-party platform
- [ ] Health/financial claims are substantiated and disclaimed

### Pricing and Billing

- [ ] All material terms disclosed before collecting billing information
- [ ] No hidden fees revealed only at checkout
- [ ] Subscription terms clearly stated (billing cycle, total cost, cancellation)
- [ ] Pre-checked upsell boxes: avoid entirely (dark pattern — FTC enforcement active)

### Advertising Claims

- [ ] Claims match what the product actually delivers
- [ ] "No side effects" / "guaranteed results" language reviewed by legal
- [ ] Affiliate disclosures present on all affiliate-driven content (FTC requirement)

### Privacy

- [ ] Privacy policy linked and accessible
- [ ] Cookie consent banner deployed if serving EEA/UK traffic
- [ ] Email collection includes unsubscribe mechanism and privacy notice
- [ ] No pre-checked marketing consent boxes

---

## Step 12 — Tactics Library with Risk Labels

Every tactic in the output must carry one of these labels:

### Conversion Hygiene (low-risk, broadly applicable)

- Navigation removal on landing pages (15–28% lift)
- Single primary CTA per page (371% more clicks)
- Message match to ad/traffic source (20–35% lift)
- Mobile-first CTA placement (thumb-zone, sticky bar)
- Form field reduction (each field removed = +11% completion)
- Visible form labels and inline validation (+22% success rate)
- Social proof above fold and near CTA
- Guest checkout as default
- Specific error messages
- Alt text and heading hierarchy
- Page speed optimization (LCP < 2.5s)
- Guarantee placement near pricing and CTA
- "Because" justification in micro-copy (+55% compliance from adding even a tautological reason — Langer. Works for low-stakes asks: email signups, free trials)
- Callback widget instead of form (3–5x higher conversion: 10–25% vs 1–5%; eliminates friction and builds in speed-to-lead advantage)

### Aggressive but Common (test carefully, monitor trust)

- Exit-intent popups (recover 10–20% of abandoning visitors; 17% cart abandonment conversion)
- Countdown timers (ONLY with real deadlines — conversion lift but trust risk if fake)
- Urgency language ("Offer ends tonight", "3 spots left")
- Strikethrough pricing (up to 40% lift if genuine discount)
- Retargeting with objection-specific creative
- Progress bars in multi-step forms (creates sunk-cost commitment)
- "X people viewing this now" real-time social proof
- Decoy pricing tier
- SMS abandoned cart recovery within 15–30 min (10–15% recovery rate, 3x email; 98% open rate within 3 minutes — but requires explicit opt-in)
- Second-page-view popup trigger (28.98% conversion — highest-performing trigger type; outperforms time-delay and scroll-depth)

### Compliance / Reputation Risk (requires legal review)

- Fake countdown timers that reset on page reload (FTC: $53K/violation)
- Fake urgency measured backfire: Fortune 500 A/B test showed -3–4% conversion from adding rate-guarantee countdown timer to checkout; 69% of shoppers actively distrust urgency messaging (Baymard 2024)
- AI-generated testimonials or transformation photos (FDA, FTC, platform bans)
- Pre-checked upsell or add-on boxes (dark pattern)
- Hidden recurring charges revealed only at checkout
- "No side effects" or absolute efficacy claims (health/pharma)
- Fabricated scarcity ("Only 2 left!" when inventory is unlimited)
- Dark-pattern cancel flows that block or delay cancellation

---

## Step 13 — Experiment Operating System

### Hypothesis Format

```
We believe [changing X on the landing page]
will [improve metric Y] by [estimated magnitude]
because [evidence/reasoning].
We will test this by [A/B test method] over [timeframe]
with [minimum sample size].
Success criteria: [metric] improves by [threshold] at [confidence level].
```

### Test Cadence by Element

| Element | Cadence | Minimum Sample |
|---|---|---|
| Headline | Weekly | 1,000 visitors per variant |
| CTA copy | Biweekly | 1,000 visitors per variant |
| Hero image/video | Monthly | 2,000 visitors per variant |
| Social proof placement | Monthly | 1,500 visitors per variant |
| Page length (short vs long) | Quarterly | 5,000 visitors per variant |
| Pricing display | Quarterly | 2,000+ visitors per variant |
| Form fields (add/remove) | Monthly | 1,000 form starts per variant |

### Stop Rules

- Kill a variant if it underperforms control by >20% after reaching statistical significance
- Pause a test if it negatively impacts downstream metrics (higher conversion but worse lead quality, higher refund rate, or lower activation)
- Never declare a winner before minimum sample; default to 400+ conversions per variant for conversion rate tests
- Use Bayesian or frequentist calculator; do not rely on gut

### Testing Priority Framework

Test elements in this order (highest leverage first):
1. Headline (30%+ swing potential)
2. CTA copy and placement
3. Social proof type and placement
4. Page length / content structure
5. Pricing presentation
6. Form design
7. Visual elements (hero image, video)
8. Micro-copy
9. Page speed optimizations

---

## Output Templates

### Template A — Landing Page Build Spec

```markdown
# Landing Page Build Spec: [Product / Campaign Name]

## Configuration: [Selected Config]
## Page Length: [Short / Medium / Long]
## Primary CTA: [Exact text]

## Section-by-Section Spec

### 1. Hero / Above the Fold
- Headline: [draft]
- Subhead: [draft]
- CTA button: [exact text]
- Hero visual: [description]
- Trust signal: [which one]
- Message match source: [ad / email / search term]

### 2. Social Proof Strip
- Elements: [logo bar / review score / customer count]

### 3. Problem + Agitation
- Pain statement: [draft]
- Cost of inaction: [draft]

### 4. Solution + Mechanism
- How it works: [3–4 steps]

### 5. Features as Benefits
- Feature 1: [feature] → [benefit] → [proof]
- Feature 2: ...
- Feature 3: ...

### 6. Visual Demo / Proof
- Type: [video / screenshots / interactive demo]

### 7. Testimonials
- Testimonial 1: [who, outcome, format]
- Testimonial 2: ...

### 8. Who It's For
- Persona 1: [role, situation, outcome]
- Persona 2: ...

### 9. FAQ / Objection Handling
- Q1: [objection] → A: [answer]
- Q2: ...

### 10. Pricing / Offer
- Structure: [tiers / single / custom]
- Anchor: [high tier first?]
- Guarantee: [type and placement]

### 11. Final CTA
- CTA text: [same as hero]
- Micro-copy: [risk reducer]

### Optional Sections Included
- [ ] Competitive / Migration Block — included: [yes/no] — placement: [after section X]
- [ ] Integrations / Ecosystem Strip — included: [yes/no] — placement: [after section X]
- [ ] Enterprise Trust / Procurement Block — included: [yes/no] — placement: [after section X]
- [ ] Long-Page Anchor Navigation — included: [yes/no] — format: [sidebar / top bar]
- [ ] Ecommerce PDP Extended (breadcrumbs, size guide, BNPL, cross-sell) — included: [yes/no]
- [ ] Interactive Tool (calculator / quiz / configurator) — included: [yes/no] — type: [which]
- [ ] Signature Visual Moment — included: [yes/no] — type: [scroll demo / character / visual metaphor / none] — performance budget: [Xms LCP impact]

## Tracking Events
1. [event_name] — [trigger] — [purpose]
2. ...

## Post-CTA Experience
- Thank-you page: [what it shows]
- Secondary CTA: [what action]
- Follow-up: [email / redirect / booking]

## Compliance Checklist
- [ ] All claims substantiated
- [ ] Testimonials use real customers with consent
- [ ] Countdown timers reflect real deadlines
- [ ] Accessibility WCAG 2.2 AA met

## First 3 Experiments
1. [Hypothesis]
2. [Hypothesis]
3. [Hypothesis]
```

### Template B — Landing Page Teardown

```markdown
# Landing Page Teardown: [URL or Business Name]

## Configuration Detected: [type]
## Page Length: [word count estimate]

## Per-Section Analysis

### Section 1: [Name]
- Purpose: [what this section does]
- Copy angle: [headline, subhead, CTA text]
- Trust elements: [what's present]
- Persuasion tactics: [with risk label for each]
- UX observations: [mobile, speed, accessibility]
- Missing: [what should be here but isn't]

### Section 2: ...

## Conversion Scorecard

| Category | Score (1–10) | Notes |
|---|---|---|
| Message match | | |
| Hero effectiveness | | |
| Social proof | | |
| Copy clarity | | |
| CTA design | | |
| Objection handling | | |
| Pricing presentation | | |
| Risk reversal | | |
| Mobile experience | | |
| Page speed | | |
| Accessibility | | |
| Compliance | | |
| Distinctiveness / Signature moment | | |

## Top 5 Strengths
1. ...

## Top 5 Leaks + Fixes
1. [Leak] → [Estimated impact] → [Fix]

## 5 Improvements for Ethical Replication
1. ...
```

### Template C — Optimization Sprint

```markdown
# Optimization Sprint: [Page Name / URL]

## Current Performance
- Conversion rate: [X%]
- Benchmark for config: [Y%]
- Gap: [Z points]

## Top 5 Leaks (ranked by estimated impact)
1. [Leak] — [Evidence] — [Estimated drop-off]
2. ...

## 5 Experiments to Run

### Experiment 1: [Name]
- Hypothesis: [format from experiment OS]
- Element: [what changes]
- Expected lift: [%]
- Timeline: [days/weeks]
- Sample needed: [visitors or conversions]

### Experiment 2: ...

## Quick Wins (implement without testing)
- [ ] [Fix that is clearly broken, e.g., missing alt text, broken mobile CTA]

## Compliance Flags
- [Any issues found]
```

---

## Quality Gates

Do not finalize any landing page plan unless all gates pass:

- [ ] Configuration selected with explicit reasoning
- [ ] Every section has required elements specified
- [ ] Hero contains all 5 above-the-fold elements
- [ ] Message match to traffic source is defined
- [ ] Single primary CTA identified with exact copy
- [ ] Post-CTA experience defined (not just "thank you page")
- [ ] Social proof is specific (named customers, verifiable scores) not generic
- [ ] FAQ addresses real objections from sales/support data
- [ ] Mobile experience explicitly addressed (sticky CTA, touch targets, thumb zone)
- [ ] Page speed targets set (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [ ] Accessibility checklist completed (WCAG 2.2 AA)
- [ ] Compliance checklist completed with no unresolved flags
- [ ] At least 3 experiments defined with hypotheses and stop rules
- [ ] Every tactic carries a risk classification label
- [ ] Optional sections evaluated: competitive block, integrations, enterprise trust, anchor nav, PDP extended, interactive tools, signature visual moment — include or explicitly skip with reasoning
- [ ] Brand guide referenced for visual/verbal consistency (if brand guide exists)

---

## Anti-Patterns

Avoid:

- Building the page before defining the offer (the offer determines everything downstream)
- No message match between ad and landing page (the single biggest conversion killer)
- Feature-listing without benefit-proving ("what it does" without "why you care")
- Multiple competing CTAs creating decision paralysis
- Ignoring mobile (60%+ of traffic) — desktop-first design is a 2016 mindset
- No post-CTA strategy: a blank "thanks" page wastes the highest-receptivity moment
- Burying social proof in the footer instead of placing it near decision points
- Using stock photography that doesn't match the brand or audience
- Skipping the FAQ/objection section — every objection left unanswered is a lost conversion
- No accessibility (71% of users with disabilities will leave; 4,600+ lawsuits in 2024)
- Fake urgency (FTC enforcement is real: $53K per violation, plus reputation damage)
- AI-generated testimonials (FDA, FTC, and platform enforcement are all active)
- Pixel-only tracking (loses 20–30% of conversions; see funnel skill for measurement requirements)
- Treating the landing page as a one-time build instead of a continuous testing system
- Ignoring brand consistency (2.3x more trustworthy brands; 23% revenue increase from consistency)

---

## Handoff to Other Skills

Route to specialized skills when the landing page plan reveals a deeper need:

- Offer design is weak or undefined → `offer-pillar-discovery`
- Lead magnet needed for the page → `lead-magnet-creation`
- Full funnel (not just one page) needs design → `constructing-a-funnel`
- Pricing strategy unclear → `consult-hormozi` (routes to $100M Pricing Playbook)
- Brand identity / visual system missing → `brand-guide-creation` (includes Branding Tactics for Conversion section)
- Design polish needed (spacing, animation, component states, loading patterns, micro-interactions) → `product-craft`
- Competitive landing page research needed → `deep-web-research`
- Market attractiveness unclear → `high-cagr-market-discovery`

---

## Branding Cross-Reference

This skill does NOT duplicate branding content. Instead, it references the `brand-guide-creation` skill for:

- **Color system**: apply your brand palette; CTA color should be your primary action color from the brand guide
- **Typography**: use your brand fonts; heading hierarchy from brand guide
- **Voice and tone**: headline and body copy should match brand voice traits; tone adjusts by context (ad-driven urgency vs. organic educational)
- **Association strategy**: what your brand should be mentally grouped with (Hormozi deliberate association framework in brand guide)
- **Proof system**: which trust assets to surface, sourced from the brand guide's proof and trust layer
- **Visual consistency checklist**: logo placement, favicon, imagery style — all from brand guide

If no brand guide exists, flag this as a gap and suggest running `brand-guide-creation` before or in parallel with the landing page build.

---

## Reference Sources

### Landing Page Structure and Tactics
- Above-the-fold 5 elements: Landy AI, Apexure (30% higher conversion with all 5)
- Message match: Apexure, KissMetrics (20–35% lift)
- Nav removal: PxlPeak (15–28% lift)
- Single CTA: Boundev (371% more clicks, 1617% more sales)
- F-pattern / Z-pattern: Nielsen Norman Group, WordStream, 99designs
- Scroll depth: Atticus Li (65–75% scroll past fold; most conversions below fold)
- Page length: CRO Audits, KissMetrics (match to decision weight)

### Social Proof and Trust
- Logo bar: EasySocialProof (69% lift in test)
- Social proof general: Ravefy, WiserNotify (34–270% lift depending on type)
- B2B proof evolution: McKinsey via Blogarama (73% of B2B buyers require verifiable proof for >$50K)
- Brand consistency: WifiTalents, Magnt, Demand Metric (23% revenue, 2.3x trust, 40% conversion lift)

### CTA and Micro-Copy
- CTA copy impact: KissMetrics (10–30% swing from single word change)
- Micro-copy: Atticus Li, BrandVM (+24% CTR from button label change)
- Sticky CTA: StickyCTAs (15–40% mobile conversion lift)

### Pricing and Risk Reversal
- 3-tier pricing: DigitalApplied (20–35% better than single)
- Strikethrough: University of Chicago via Monetizely (up to 40% lift)
- Anchoring: Monetizely (shifts tier mix 20–40%)
- Guarantees: Ecommerce Psychology, Click Media (30–150% conversion lift)

### Video
- Landing page video: Atticus Li, Apexure (34–86% lift; autoplay hurts)
- Hero video view rates: Motionvillee (300–450% higher above fold)

### Commitment Boundary and Form Placement
- Commitment escalation mechanism: Cialdini commitment/consistency; Freedman & Fraser 1966 (17% → 76%)
- Complex forms behind commitment boundary: Formstack/HubSpot (13.85% vs 4.53%); Venture Harbour (0.96% → 8.1%); BrokerNotes (11% → 46%)
- Simple forms, warm traffic: Leadpages 10-test A/B (44% vs 45% — statistical tie)
- 7-field threshold: Zuko Analytics (below 7 fields, only 14% lift)
- Blog/content popup vs inline: Sumo/BDOW (3.09% vs 0.58%, 1.8B displays)
- Mobile multi-step risk: Zuko Analytics (85.7% abandonment)
- Medvi commitment boundary pattern: from earlier teardown (loading screen + trust badge + escalating intake)

### Forms and Friction
- Field reduction: IvyForms (each field = -11% completion)
- Inline validation: UX research aggregate (+22% success, -40% completion time)
- Form labels: Baymard (only 14% of sites mark both required and optional)

### Performance
- CWV conversion impact: accs-net, Minovex (each second = -7% conversion)
- Mobile speed: Shopify (27% better mobile conversion from 1s improvement)

### Accessibility
- Abandonment: Heurilens (71% abandon inaccessible sites)
- Organic lift: Heurilens (12% average lift from accessibility improvements)
- WCAG failures: Heurilens (94.8% of homepages fail)
- ADA lawsuits: Heurilens (4,600+ in 2024)

### Compliance
- FTC fake scarcity: JDSupra, FTC ($53K/violation)
- FTC dark patterns: JDSupra, GrowthSuite (countdown timer legality guide)
- Testimonial compliance: FTC, FDA (real customers, documented consent, no AI fabrication)

### Post-CTA Psychology
- Post-decision rationalization: Atticus Li (peak receptivity moment)
- Thank-you page optimization: VerzDesign, Servalian

### Medvi Landing Page (from earlier teardown)
- Fillout form embed, VWO A/B testing, Plausible analytics, affiliate tracking params
- Micro-commitment intake, trust badge front-loading, progress indicator, qualification theater
- All-inclusive pricing, outcome-first headline, pain-removal subhead

### Research-Backed Conversion Principles
- First-person CTA: ContentVerve (+90%, replicated 3x)
- Reading level: Unbounce 2024 benchmark (57M conversions; 5th–7th grade = 11.1% vs professional = 5.3%)
- Precise numbers: Janiszewski & Uy, Psychological Science (precision signals credibility)
- Concrete language: Packard & Berger (+78–161% from imageable outcomes)
- "$0" vs "Free": Journal of Retailing (10/10 experiments favor $0)
- Per-day framing: +34% for low-price subscriptions
- Imperfect ratings: Spiegel/Northwestern + PowerReviews (20M+ pages; 4.75–4.99 peak)
- Trust badge selection: McAfee (+15.7–21.5%), Norton (+12.2%); 6+ badges = -5–8%
- Proof proximity: 15–30% lift from distributed testimonials (CXL, multiple practitioners)
- Directional cues: CXL eye-tracking lab (arrow > line > triangle > human gaze)
- Endowed progress: Nunes & Dreze (34% vs 19% completion, peer-reviewed)
- Order bump: Focus Digital (37.8% take rate, 1,847 businesses)
- 72-hour referral window: 3–5x ROI vs later asks
- "Because" justification: Langer (+55% compliance)
- SMS abandoned cart: 10–15% recovery, 3x email
- Second-page-view trigger: 28.98% conversion (highest trigger type)
- Speed-to-lead: MIT/InsideSales (391% at <1 min; 21x at 5 min vs 30 min)
- Fake urgency backfire: Fortune 500 A/B test (-3–4%); Baymard 2024 (69% distrust)
- Low-volume social proof: small numbers worse than no social proof
- Video+text hybrid: outperforms either format alone

### Hormozi Playbooks (local assets)
- Value Equation: `$100M Offers - Alex Hormozi.pdf`
- Dream Outcome Compression: `$100M Offers - Alex Hormozi.pdf`
- Scarcity, Urgency, Bonuses, Guarantees, Naming: `$100M Offers - Alex Hormozi.pdf`
- Lead Magnet Design: `$100M-Leads-by-Alex-Hormozi.pdf`
- Branding as deliberate association: `$100M Branding Playbook.pdf`
- Pricing plays: `$100M Pricing Playbook.pdf`
