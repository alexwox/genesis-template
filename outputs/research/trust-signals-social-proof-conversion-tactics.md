# Trust Signals, Social Proof & Credibility Elements: Research-Backed Conversion Tactics

> **Research date:** April 2026
> **Method:** Multi-source web research across academic studies, A/B test case studies, CRO agency data, and platform benchmarks.
> **Source tiers:** T1 = peer-reviewed / primary research lab; T2 = named A/B test with sample size + confidence; T3 = industry benchmark from reputable platform; T4 = practitioner consensus / aggregated claims.

---

## 1. Specific vs Vague Testimonials

**Tactic:** Replace generic praise ("Great product!") with quantified outcomes ("Saved $340K in the first year, cut onboarding time from 6 weeks to 3 days").

| Metric | Finding |
|---|---|
| Measured lift | Buildium: **22–23% conversion increase** when testimonials included specific unit counts and size-segmented copy (VWO test, control 1.6% → variation 2.0%) |
| Mechanism | Specificity triggers the "hard to fake" heuristic — precise details imply real experience, not marketing copy |
| When it fails | Specificity about irrelevant metrics (e.g., "saved 14 hours" when the buyer cares about revenue) |

**Source:** VWO/Buildium case study (https://vwo.com/success-stories/buildium/) — **T2**
**Source:** Share.one Specificity Ladder framework (https://www.share.one/testimonial-proof-checklist/) — **T4**

**Novelty:** The *principle* is well-known in CRO. The **Buildium test with specific numbers** is less widely cited. The "Specificity Ladder" concept (upgrading from adjective → metric → timeline → before/after) is a useful operationalization rarely formalized.

---

## 2. Video Testimonials vs Written

**Tactic:** Add 60–90 second video testimonials to landing pages, paired with text testimonials.

| Metric | Finding |
|---|---|
| Video vs text-only | Landing pages with video testimonials convert **25–39% higher** than text-only |
| Optimal length | **60–90 seconds** for landing pages; completion rates collapse after 90s (Vidyard), and 3+ min videos lose ~60% of viewers |
| Hybrid is best | Pages with **both video + text** convert highest (4.8% vs 2.3% text-only); video-only pages show higher bounce rates |
| Platform-specific | Social ads: 6–30s; website: 45–90s; YouTube: 2–3 min; case studies: 3–5 min |

**Source:** Credibly 2026 analysis (https://getcredibly.org/blog/video-vs-text-testimonials) — **T3**
**Source:** Wistia State of Video 2025, HubSpot, Vidyard engagement data — **T3**

**Novelty:** Low. Video > text is CRO 101. The genuinely useful finding: **video-only hurts bounce rate** — you need the text fallback. And the 60–90s sweet spot is more precise than most advice gives.

---

## 3. Real-Time Social Proof ("X people bought this today")

**Tactic:** Display live purchase/signup notifications to create bandwagon + FOMO effects.

| Metric | Finding |
|---|---|
| Upside | Implementations report **10–15% conversion lift** typical, up to **98% in best cases**; sites using real-time proof exceed 5% CVR vs 1.5–2.5% benchmarks |
| Backfire: low volume | Displaying "1 person watching" or "6 sales — 2 weeks ago" **actively hurts** conversion by signaling low demand |
| Backfire: negative social proof | Petrified Forest study: a sign saying "many people steal wood" **doubled** theft. Same principle applies — highlighting low participation normalizes non-purchase |
| Backfire: fake/excessive | Overuse or fake notifications damage credibility and reduce trust |

**Operationalization rules:**
1. Set a **minimum threshold** — never display counts below a credible number (varies by context, but single digits almost always hurt)
2. Extend the lookback window (e.g., "847 people signed up this week" instead of "2 people bought today")
3. If volume is too low to display, **hide the widget entirely** — no social proof beats negative social proof
4. Use aggregate counts ("X people this month") for lower-traffic pages; individual notifications ("John just purchased") only when velocity is high

**Source:** NotificationX 2026 analysis — **T4**; Fera.ai negative social proof guide — **T4**; HubSpot Cialdini/Petrified Forest case — **T3**

**Novelty:** The positive lift is well-known. The **specific backfire conditions** (low-volume threshold, negative social proof mechanics) are genuinely under-discussed. Most social proof tool vendors don't mention when their own product hurts.

---

## 4. Review Count Threshold

**Tactic:** Understand the minimum review count needed before the count itself becomes a trust signal rather than a risk signal.

| Threshold | Effect |
|---|---|
| **5 reviews** | **270% conversion increase** vs 0 reviews (critical minimum) |
| **15 reviews** | Products sell **4x more** than those with fewer reviews |
| **50+ reviews** | Conversion up **4.6x** |
| **112+ reviews** | Consumer expectation threshold on Amazon specifically |
| Below threshold | Low counts create a **risk signal** — appears suspicious, suggests fake/biased reviews |

**Price-dependent:** Higher-priced items require more reviews. Reviews drive **380% conversion lift** for expensive products vs **190%** for cheaper ones.

**Review velocity matters:** 200 reviews in 6 months signals differently than 200 over 3 years. Recency > total volume for modern consumers.

**Source:** Spiegel Research Center / Northwestern / PowerReviews (https://spiegel.medill.northwestern.edu/star-ratings-and-review-content/) — **T1**
**Source:** Emplicit Amazon data (https://emplicit.co/how-review-trends-impact-amazon-sales/) — **T3**

**Novelty:** The 5/15/50 thresholds are moderately well-known. The **112 Amazon-specific threshold** and the **review velocity** concept are genuinely novel for most practitioners.

---

## 5. Star Rating Display: The Imperfect Score Paradox

**Tactic:** Target 4.2–4.5 stars (Spiegel) or 4.75–4.99 (PowerReviews) rather than a perfect 5.0.

| Rating Band | Conversion Behavior |
|---|---|
| **4.75–4.99** | Highest conversion rates (PowerReviews, 20M+ product pages) |
| **4.2–4.5** | Peak purchase probability (Spiegel/Northwestern) |
| **5.0** | Converts comparably to **3.0–3.49** stars — a massive penalty |
| **4.0** | The floor for "good" — conversion rate rises above 4% |
| Biggest jump | 3.5→4.0 stars produces a **19–20% conversion increase** |

**Why 5.0 hurts:**
- **46% of all shoppers** are suspicious of perfect 5-star ratings
- **53% of Gen Z** are suspicious
- **82% of shoppers** actively seek out negative reviews — their absence triggers manipulation suspicion

**Display format matters:** Cornell research shows fractional star ratings (visually displayed as stars) are **overestimated by ~0.12 points** compared to numeric displays due to a visual-completion cognitive bias.

**Source:** Spiegel Research Center / Northwestern (https://spiegel.medill.northwestern.edu/star-ratings-and-review-content/) — **T1**
**Source:** PowerReviews 20M+ page benchmark (https://www.powerreviews.com/benchmarks/average-rating-impact-on-conversion) — **T1**
**Source:** Cornell rating format study 2025 — **T1**

**Novelty:** The core paradox is increasingly well-known among CRO practitioners. The **Cornell display-format bias** (stars overestimate by 0.12 vs numerics) is genuinely novel and rarely discussed. The fact that 5.0 converts like 3.0–3.49 is a powerful reframe.

---

## 6. UGC vs Professional Photography

**Tactic:** Replace or supplement studio product photography with authentic user-generated content.

| Metric | Finding |
|---|---|
| CVR | UGC: **3.4%** vs studio: **2.8%** (DTC ads) |
| ROAS | UGC: **3.7x** vs studio: **2.9x** |
| CPA | UGC achieves **23% lower CPA** ($40 vs $52) |
| On-site | Replacing studio photos with customer images: **15–35% conversion lift** (Shopify case studies) |
| Trust | **33%** of ecommerce marketers cite UGC as highest-trust visual vs **24%** for professional; **79%** of consumers say UGC highly influences purchase decisions vs **12%** for brand-created |

**Trade-off:** UGC has a shorter creative lifespan (30–45 days vs 60–90 days for studio) due to faster ad fatigue, but lower production costs offset this.

**Source:** MHI Growth Engine DTC study (https://mhigrowthengine.com/blog/ugc-vs-studio-creative-dtc/) — **T3**
**Source:** Nosto ecommerce research (https://www.nosto.com/blog/new-research-brands-prefer-ugc-for-diversity) — **T3**

**Novelty:** Moderate. UGC > professional is accepted wisdom in DTC. The **specific ROAS and CPA comparisons** are useful for building a business case. The creative lifespan trade-off is genuinely under-discussed.

---

## 7. Trust Badges: Which Ones Move the Needle

**Tactic:** Display security and guarantee badges — but only the right ones, in the right places.

### Badges Ranked by Measured Impact

| Badge | Measured Lift | Confidence |
|---|---|---|
| **McAfee SECURE** | **+15.7%** (electronics, 78K visitors, 97% confidence); **+21.5%** (outdoor gear, 42K visitors, 95% confidence) | T2 — named A/B tests |
| **Norton / Symantec** | **+12.2% CVR**, +14.3% transactions, +16.6% revenue (3,480 users, 95% confidence) | T2 |
| **SSL / Secure Checkout** | **+15–30%** for unfamiliar brands | T4 |
| **Money-back guarantee** | **+6–10%** near add-to-cart; 42% effectiveness across 67 ecommerce sites | T3–T4 |
| **Payment logos (Visa, PayPal)** | **+8–12%** trust increase | T4 |
| **BBB** | Positive impact (no specific lift number published, but consistently tests well) | T3 |

### Badges That Hurt or Are Neutral

| Badge | Effect |
|---|---|
| **Authorize.net** | Can **lower** conversion rates |
| **TrustGuard** | Can **lower** conversion rates |
| **Trustwave** | Can **lower** conversion rates |
| **GeoTrust** | No impact |
| **BizRate** | No impact |
| **Generic "100% Guaranteed"** (no third-party backing) | Minimal effect |

### Badge Overload Effect
Using **6+ different badges** creates skepticism and can **decrease conversion by 5–8%**. One audit found removing 11 badges while keeping 6 strategically placed ones increased conversion from 2.1% to 3.4% — a **62% improvement**.

### Key Principles
1. Badges matter more for **smaller / lesser-known brands** — Amazon-scale brands see minimal impact
2. Badges associated with **cheap/amateur sites** (Authorize.net, TrustGuard) transfer that association negatively
3. **Placement matters** — test floating vs static, header vs checkout
4. Cost matters — McAfee badges can run $300–400/month, so ROI calculation is essential

**Source:** Inflow ecommerce testing (https://www.goinflow.com/trust-seals-ecommerce-tests/) — **T2**
**Source:** ConversionTeam Norton case study — **T2**

**Novelty:** The finding that certain badges **actively hurt** (Authorize.net, TrustGuard, Trustwave) is genuinely novel for most practitioners. The badge-overload penalty is under-discussed. The specific hierarchy (McAfee > Norton > BBB > generic) is useful.

---

## 8. "As Seen In" Logo Bars

**Tactic:** Display media/customer logos for credibility — but make them contextual and interactive.

| Metric | Finding |
|---|---|
| Average lift | **30% conversion boost** across industries (range: 7–400%) |
| Recognized logos | Forbes, Business Insider logos: **20–50% improvement** |
| Conversion prediction score | Static logo bars score **18/100** on conversion prediction for SaaS |
| Desktop vs mobile | Same test can **win on desktop and lose on mobile** |

### The Diminishing Returns Problem
Static logo bars frequently **lose** A/B tests against both removing them entirely and against other social proof methods. The issue isn't logos per se — it's that static rows of greyed-out logos provide no context or actionability.

### What Actually Works
| Implementation | Result |
|---|---|
| **Clay**: Interactive logos with case study links + hover previews | 22,628 clicks/year |
| **Linear**: Segmented logo table by industry with "read story" links | **+25% signup conversion** |
| **Warmly**: Logos + "Talk to a Customer" CTA | 100+ demos generated |

### Operationalization
1. **4–7 logos** is the recommended starting range
2. Make logos **clickable** — link to case studies or testimonials
3. Add **hover previews** with customer quotes
4. Segment by industry when possible
5. Test desktop and mobile separately — results diverge
6. If you can't make them interactive, test whether removing them entirely performs better

**Source:** Casey Hill / Do What Works analysis of 1,347 logo experiments — **T3**
**Source:** Convertibles press logo bar case study — **T2**

**Novelty:** High. Most CRO advice says "add logos." The finding that static logos **score 18/100 for conversion prediction** and that interactive implementations dramatically outperform is genuinely contrarian and well-evidenced.

---

## 9. Case Study Format

**Tactic:** Use Problem → Solution → Result structure, leading with metrics.

| Format | Performance |
|---|---|
| **Problem-Solution-Result** | Consistently outperforms narrative for landing page conversion; 3x more leads in one controlled comparison (18 vs 6 over 85 days) |
| **Narrative / story-heavy** | Better for brand awareness and content marketing, worse for conversion pages |

### High-Converting Case Study Anatomy
1. **Lead with the result** — put the headline metric first ("3x lead volume in 85 days")
2. Scannable structure with bold stats and pull quotes
3. Before/after comparisons with specific numbers
4. Customer logo and attribution prominently displayed
5. Visual hierarchy — not a wall of text
6. Clear CTA at the end (and ideally mid-way for long case studies)
7. Video embed when available (see finding #2 above)

**Source:** Tortoise & Hare Software case study (https://tortoiseandharesoftware.com/blog/case-study-tnhs-helps-advertiser-triple-landing-page-conversion-rates/) — **T2**
**Source:** Brew Digital, Writeful, practitioner consensus — **T4**

**Novelty:** Low. Problem-Solution-Result is standard B2B advice. The "lead with the result" reframe (putting the metric in the headline rather than at the end) is a useful operationalization.

---

## 10. Named Person vs Anonymous Quote

**Tactic:** Attribute testimonials with full names, titles, and companies when possible — but verified anonymous quotes are nearly as effective.

| Attribution Level | Trust Rating |
|---|---|
| **Named testimonial** (full name, company, title) | **64% trust** |
| **Blind-but-verified** (anonymous, independently verified as real) | **60% trust** |
| **Unverified anonymous quote** | **44% trust** |

The gap between named and verified-anonymous is only 4 percentage points. The gap between verified and unverified is **16 points** — making **verification the critical variable**, not attribution.

### Operationalization
- Use **named testimonials** for homepage, pricing page, premium positioning
- Use **blind-but-verified** for breadth/scale — faster to collect, fewer approval barriers, more candid feedback
- **Never use unverified anonymous quotes** — they're barely better than no testimonial and can actively hurt credibility
- Adding a **headshot photo** increases perceived truthfulness via the "truthiness effect" (Psychonomic Bulletin & Review) — nonprobative photos inflate perceived truth, and this effect persists over 48+ hours

**Source:** UserEvidence "Evidence Gap Report" (https://userevidence.com/blog/blind-but-verified-the-customer-evidence-your-2026-strategy-needs/) — **T3**
**Source:** Newman et al., "Nonprobative photographs inflate truthiness," Psychonomic Bulletin & Review — **T1**

**Novelty:** High. The "blind-but-verified" concept with specific trust numbers is genuinely novel. Most CRO advice simplistically says "use real names." The finding that verification matters 4x more than attribution is a reframe.

---

## 11. Customer Count Specificity

**Tactic:** Use precise numbers ("10,847 customers") rather than rounded ones ("10,000+ customers").

No direct A/B test was found comparing specific vs rounded customer counts on landing pages. However, the underlying psychology is well-established:

| Mechanism | Finding |
|---|---|
| **Precision heuristic** | Precise numbers imply careful measurement; round numbers signal estimation (Janiszewski & Uy, Psychological Science) |
| **Anchoring** | Precise first offers in negotiations produce more conciliatory counter-offers and carry through to final settlements (Mason et al., Journal of Experimental Social Psychology) |
| **Credibility inference** | "31.7% improvement" feels more credible than "about 30%" because the decimal implies data collection, not guessing |
| **Learned association** | Humans learn that rounding = uncertainty (friends estimate, contractors round, precise = measured) |

### Caveat
Precision backfires when:
- It's presented by an **automated system** rather than a human communicator
- The precision is **irrelevant** to the decision ("served 10,847.3 customers")
- It's **excessive** relative to the claim's significance

### Operationalization
- Use precise counts when they're plausibly database-derived: "10,847 teams use X"
- Use round numbers for estimates or projections: "Over 10,000 companies trust X"
- Avoid false precision on inherently approximate metrics
- Update precise counts regularly — a stale precise number is worse than a fresh round one

**Source:** Janiszewski & Uy, "Precision of the Anchor Influences the Amount of Adjustment," Psychological Science — **T1**
**Source:** Mason et al., "Precise offers are potent anchors," Journal of Experimental Social Psychology — **T1**
**Source:** Rutgers study on sharp vs round numbers in advertising — **T1**

**Novelty:** The academic research is robust but rarely operationalized in CRO advice. The connection between negotiation anchoring research and landing page copy is a genuinely under-exploited insight. The **backfire conditions** (automated context, irrelevant precision) are almost never mentioned.

---

## 12. Third-Party Review Badges (G2, Trustpilot) vs Self-Hosted Reviews

**Tactic:** Display third-party platform badges rather than (or in addition to) self-hosted review widgets.

| Dimension | Third-Party (G2, Trustpilot) | Self-Hosted |
|---|---|---|
| Trust mechanism | "Convergent validity effect" — familiar brands transfer their trust to your product | Only your brand's credibility backs the reviews |
| Perceived legitimacy | High — independent verification assumed | Low-moderate — vulnerable to appearing curated/fake |
| Conversion lift | Trust badges boost conversions **2–42%** (forms with badges: +42%) | Depends entirely on implementation quality |
| Buyer intent data | G2/Trustpilot provide data on who's researching you | Full data ownership, no vendor lock-in |
| Trustpilot specifically | Reviews influence **86% of purchase decisions**; green stars are recognized as a trust signal | N/A |

### Operationalization
- Display G2/Trustpilot badges near CTAs — the platform recognition transfers trust
- Use self-hosted reviews for **depth** (long-form, video, specific use cases)
- Use third-party badges for **breadth** (quick credibility signal)
- The platform matters less than review quality — specific details, before/after outcomes, identity signals (name, company, photo), and emotional + logical components convert regardless of platform

**Source:** Trustpilot/Blastra 2026 guide — **T3**; Greenmoov marketplace trust guide — **T4**; Reviewlee comparison — **T3**

**Novelty:** Moderate. The "convergent validity effect" framing is useful — it explains *why* third-party badges work (borrowed trust) rather than just asserting they do.

---

## 13. Founder/Team Photos and Bios

**Tactic:** Display real founder photos with mission-driven bios (not resume bios) on early-stage landing pages.

| Metric | Finding |
|---|---|
| Trust formation speed | Buyers make trust decisions in **< 2 seconds**, before reading any text |
| Face processing | Human brain processes faces faster than text, UI, or layout — a face is the fastest trust signal available |
| Stock photo detection | Buyers detect stock/fake imagery in **< 200 milliseconds** |
| B2B testimonials with real photos + credentials | **+20–35% conversion** |

### The Bio Problem
Most founder bios read like LinkedIn résumés. Visitors aren't looking for credentials — they're asking:
- "Why did you build this?"
- "Do you understand my problem?"
- "Can I trust you?"

### High-Converting Bio Structure
1. **Open with the problem you experienced** (empathy, not accomplishment)
2. **Explain why you built the product** (mission, not timeline)
3. **Demonstrate domain understanding** (prove you know their world)
4. **Close with a credibility anchor** (one impressive metric or credential, not a career history)

### Photo Rules
- Real environment, natural expression — not studio-posed
- One founder/face is more powerful than a group grid
- Candid > polished (matches the authenticity signal)
- AI-generated headshots are detectable and should be avoided

**Source:** Insivia "2-Second Trust Signal" research (https://www.insivia.com/how-does-custom-imagery-boost-conversions-the-power-of-real-people-in-tech-branding/) — **T3**
**Source:** Norm Bond / Medium founder bio analysis — **T4**

**Novelty:** The "2-second trust decision" data point and the 200ms stock-photo detection threshold are genuinely novel. The bio restructuring advice (mission > credentials) is useful but not uncommon in startup marketing circles.

---

## 14. "Powered By" / "Built With" Badges

**Tactic:** Use "Powered by [Your Product]" badges on customer-facing assets for product-led growth.

| Metric | Finding |
|---|---|
| Lead generation | "Powered by" placements drive **30–50% of new leads** for some SaaS companies (Turtl) |
| Referral lift | Groove: badges on satisfaction rating pages converted at **~2x** the rate of widget badges, +30% referrals |
| Retention | Sprinto: strategic badge-removal conversations increased retention by **15%** |

### When They Help
- On **customer-facing outputs** (documents, surveys, widgets, portals) where visitors experience the product quality firsthand
- When paired with a **context-aware landing page** that acknowledges where the visitor came from
- When the badge is **small, unobtrusive**, and in a footer or corner position

### When They Hurt
- Aggressive, prominent branding on customer deliverables (feels spammy)
- When the powered-by product is **lower-status** than the customer's brand
- On products where customers are presenting to their own clients (co-branding creates confusion)

**Source:** FounderPath "Powered By Virality" analysis (https://founderpath.com/blog/powered-by-virality) — **T3**
**Source:** Groove HQ A/B test (https://www.groovehq.com/blog/powered-by) — **T2**

**Novelty:** Moderate-high. This is more of a PLG growth tactic than a landing page trust tactic. The Sprinto retention insight (badge removal as a conversation trigger) is genuinely clever and novel.

---

## 15. Certification and Compliance Badges by Industry

**Tactic:** Display relevant compliance certifications — but use progressive disclosure, not badge walls.

### Which Certifications Matter by Industry

| Industry | Critical Certifications | Impact |
|---|---|---|
| **Healthcare / Health SaaS** | HIPAA, HITRUST, SOC 2 | Demo form completions +27%, bounce rate -15% (one case study); but displaying all simultaneously causes cognitive overload and can **decrease** conversions |
| **Finance / Fintech** | PCI DSS, SOC 2 Type 2 | Addresses 25% of cart abandonment caused by trust concerns; 70% of overall abandonment driven by trust issues |
| **Enterprise SaaS (US)** | SOC 2 Type 2 | Pre-emptively answers security questionnaire friction; shortens evaluation timelines |
| **Enterprise SaaS (EU)** | ISO 27001, GDPR compliance | Particularly important for EU procurement |
| **Ecommerce** | PCI DSS, SSL | Payment security is table stakes; absence is noticed more than presence |
| **Government / Public Sector** | FedRAMP, StateRAMP | Hard requirements — presence/absence is binary, not a spectrum |

### The Progressive Disclosure Principle
**Don't create badge walls.** The most effective approach:
1. **Above the fold:** Lead with business value, not compliance
2. **Near CTAs:** Display a **single trust anchor** (the most relevant certification for your buyer)
3. **Dedicated trust center:** Full certification details, audit reports, compliance documentation — linked from footer or a "Security" page
4. **On pricing/checkout:** Payment security badges only

Organizations with robust compliance frameworks report revenue increases of up to **200%** (though this conflates the certification itself with the underlying security posture).

**Source:** HUSL Digital trust signal analysis (https://husldigital.com/blog/marketing/your-trust-signals-are-killing-conversions/) — **T3**
**Source:** Statvix compliance ROI analysis — **T4**; SiteTrust 2026 analysis — **T3**

**Novelty:** The **progressive disclosure** principle is genuinely under-discussed. Most compliance badge advice is "display them prominently." The finding that **badge walls hurt** in healthcare SaaS (where you'd think more badges = more trust) is counter-intuitive and actionable.

---

## Cross-Cutting Findings

### The Authenticity Meta-Pattern
Across nearly every category, the same meta-pattern emerges: **signals that are harder to fake convert better than signals that are easy to fake.**

- Specific metrics > vague praise (hard to fabricate precise savings numbers)
- Imperfect ratings > perfect ratings (4.7 feels real, 5.0 feels curated)
- UGC > professional photography (raw photos can't be faked by a studio)
- Real faces > stock photos (detected in <200ms)
- Third-party verification > self-hosted claims (someone else validated it)
- Precise counts > round numbers (implies a real database, not a guess)

### The "Less Is More" Counter-Pattern
In trust badges, logo bars, and compliance certifications, **more is not better past a threshold:**
- 6+ trust badges → -5–8% conversion
- Static logo bars score 18/100 for conversion
- Badge walls in healthcare SaaS decrease conversion despite more certifications being objectively better

The resolution: **strategic selection and progressive disclosure** beat comprehensive display every time.

### The Placement Multiplier
Almost every finding is modulated by placement:
- Testimonials near CTAs: +24% conversion vs decorative placements
- Trust badges near checkout: maximum impact
- Social proof on high-intent pages: amplified effect
- Compliance badges: progressive disclosure > above-fold display

Placement may be a larger lever than which specific tactic you choose.

---

## Source Quality Assessment

| Source | Tier | Notes |
|---|---|---|
| Spiegel Research Center / Northwestern | T1 | Peer-reviewed, 100K+ SKUs, 15M+ page views |
| PowerReviews benchmark | T1 | 20M+ product pages, 1000+ ecommerce sites |
| Cornell rating format study | T1 | Peer-reviewed |
| Janiszewski & Uy (Psychological Science) | T1 | Peer-reviewed, 5 experiments |
| Mason et al. (J. Exp. Social Psychology) | T1 | Peer-reviewed |
| Newman et al. (Psychonomic Bulletin & Review) | T1 | Peer-reviewed, truthiness effect |
| Inflow / GoInflow McAfee/Norton tests | T2 | Named A/B tests with sample sizes and confidence levels |
| ConversionTeam Norton test | T2 | 3,480 users, 95% confidence, p=0.049 |
| VWO / Buildium testimonial test | T2 | Named A/B test, 22–23% lift |
| Groove "Powered By" test | T2 | Named A/B test, 30% referral lift |
| MHI Growth Engine UGC study | T3 | DTC-specific, named methodology |
| Casey Hill / Do What Works logo analysis | T3 | 1,347 experiments analyzed |
| UserEvidence "Evidence Gap Report" | T3 | Named report with methodology |
| Credibly, Nosto, Trustpilot, NotificationX | T3–T4 | Industry platform data, varying methodology transparency |
