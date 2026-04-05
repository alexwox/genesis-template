# Onboarding Screen Implementations: Enterprise, Marketplace, Fintech, Agency

## Research metadata

- **Date**: 2026-04-04
- **Sources consulted**: 40+
- **Source mix**: Tier 1 (official docs, product pages, help centers): ~50% | Tier 2 (UX research, design teardowns, industry publications): ~35% | Tier 3 (community forums, opinion pieces): ~15%
- **Confidence tags**: Each finding is marked **[Observed]** (directly documented in product pages/docs), **[Inferred]** (derived from multiple partial sources), or **[Uncertain]** (single source or extrapolated)

---

# LANE 1: Enterprise / Sales-Led Implementation Onboarding

## 1.1 Rocketlane

### Screen-by-screen sequence

**Screen 1 — Customer Portal Home (Portal 2.0)**
- Website-like experience that adapts to the customer's current phase (onboarding, implementation, hypercare) **[Observed]**
- Fully white-labeled: custom colors, fonts, logos, themes. To the customer it looks like the vendor's own product **[Observed]**
- Widget-based layout — each section is a configurable "LEGO block": project plan, conversations, files, feedback forms, resource library **[Observed]**
- Embeddable directly inside the vendor's product or accessible via branded magic links (no password required) **[Observed]**
- Phase-aware: the portal dynamically shifts content based on whether the customer is in onboarding, implementation, or hypercare **[Observed]**

**Screen 2 — Mutual Action Plan / Project Plan View**
- Shared interactive plan visible to both vendor and customer teams **[Observed]**
- Task rows with: task name, assigned owner (vendor-side or customer-side), due date, status indicator, dependencies **[Inferred]**
- Milestone markers with visual timeline representation **[Observed]**
- SmartFill feature auto-populates project information and generates status updates **[Observed]**
- Real-time updates with automated reminders for overdue or upcoming tasks **[Observed]**
- Multiple views: Gantt, list, board (Kanban) **[Inferred — confirmed in GuideCX, likely mirrored]**

**Screen 3 — Communication Hub**
- In-portal chat and threaded comments attached to specific tasks or milestones **[Observed]**
- Slack integration for real-time notifications **[Observed]**
- File sharing and document collaboration within context **[Observed]**

**Screen 4 — Status Dashboard**
- 360° project visibility with custom project fields **[Observed]**
- Forecasted end dates that auto-adjust based on task completion pace **[Inferred]**
- Risk indicators flagging blocked or at-risk tasks **[Inferred]**
- Time tracking and invoice widgets for PS teams **[Observed]**

**Screen 5 — Training / Academy (Rocketlane Academy)**
- Self-paced learning paths organized as structured courses with chapters and videos **[Observed]**
- Role-based tracks: admin fundamentals, project owner essentials, general user guides **[Observed]**
- Progress tracking per learner with supervisor visibility **[Observed]**
- Certification upon course completion — badge-based milestones **[Observed]**
- "Gentle nudges" (email reminders) if learning is paused **[Observed]**
- Foundational course example: 8 chapters, 25 videos for admin track **[Observed]**

**Screen 6 — CRM Integration / Sales-to-CS Handoff**
- Seamless CRM integration (Salesforce, HubSpot) for automatic project launch when deal closes **[Observed]**
- Handoff package auto-populates: deal details, success criteria, stakeholder map, scope, timeline, billing details **[Inferred]**
- Workflow automation triggers project creation from CRM deal-close event **[Observed]**

### Notable patterns
- Portal-as-product: the onboarding portal IS the post-sales product experience, not a separate tool
- Zero-login access via magic links reduces customer friction dramatically
- Widget-based architecture allows per-segment customization without code
- Training is integrated into the same platform, not a separate LMS

### Anti-patterns observed
- Heavy reliance on vendor configuring the portal well — a poorly configured portal is worse than email
- No native video call integration — kickoff meetings still happen in Zoom/Teams

---

## 1.2 GuideCX

### Screen-by-screen sequence

**Screen 1 — Compass Experience (Customer Portal)**
- Purpose-built, white-labeled web and mobile portal **[Observed]**
- Access via secure "Magic Links" — no account creation or password needed **[Observed]**
- Mobile-responsive design for phone/tablet task updates **[Observed]**
- Personalized per-role: different users see different scopes of the project **[Observed]**

**Screen 2 — Project Plan Views**
- Three view options: **List**, **Plan** (timeline/Gantt), **Board** (Kanban) **[Observed]**
- Tasks include: name, assigned owner, due date, dependencies, sign-off requirements, level of effort **[Observed]**
- Milestone markers with intelligent forecasted end dates — system tracks critical path dependencies and auto-adjusts delivery forecast when tasks complete early or late **[Observed]**
- Status indicators per task with color-coded progress **[Inferred]**

**Screen 3 — Persona-Based Views**
- **Portal View**: Streamlined for individual contributors — shows only their assigned tasks plus a summary bar with project context. Includes visibility into provider tasks for transparency **[Observed]**
- **Full Plan View**: Comprehensive project visibility for main point-of-contact or project coordinator — shows all customer tasks beyond individual assignments **[Observed]**
- Default view per role is set by Admins/Managers via Resource Management > Customer Roles tab > "Project View Permission" dropdown **[Observed]**
- Views can be customized per-project for specific users **[Observed]**

**Screen 4 — Actionable Email & SMS**
- Task management directly from inbox: update status, add notes, change assignments **[Observed]**
- SMS notifications for task reminders and updates **[Observed]**
- Customers don't need to log into the portal to complete simple actions **[Observed]**

**Screen 5 — Program Management Dashboard**
- All projects for a given customer visible in one place (not just single project) **[Observed]**
- Satisfaction and delivery trend tracking across the customer relationship **[Observed]**
- Advanced reporting for onboarding optimization **[Observed]**

**Screen 6 — Automation Engine**
- Auto-launch new onboarding project when CRM deal goes closed-won **[Observed]**
- Automated assignment, update, and reminder emails to internal team and customer stakeholders **[Observed]**
- Recipe Builder (in-product iPaaS) for custom integrations: Salesforce, Gainsight, Zendesk, NetSuite, Slack **[Observed]**

### Notable patterns
- Strongest persona-based view system observed — genuinely different experiences for different roles
- Email/SMS as first-class interaction channels, not just notification pipes
- Program-level view (all projects for one customer) is a differentiator vs. project-level-only tools

### Anti-patterns observed
- Portal View may over-simplify for engaged customer champions who want more context
- Magic link security depends on email security — no MFA option documented

---

## 1.3 OnRamp

### Screen-by-screen sequence

**Screen 1 — Customer Onboarding Portal**
- Single branded portal destination for customers to collaborate, share docs, and track progress **[Observed]**
- Custom branding: company name, logo, colors, branded magic links **[Observed]**
- Mobile-friendly with simplified UX **[Observed]**
- AI-enhanced dynamic personalization adapts content to each customer **[Observed]**

**Screen 2 — Task Builder**
- Drag-and-drop task creation for personalized onboarding experiences **[Observed]**
- Reusable templates standardize workflows across customers **[Observed]**
- Forms and commenting embedded in tasks **[Observed]**

**Screen 3 — Progress Tracking**
- Roadmap navigation showing overall implementation progress **[Observed]**
- Automated reminders for overdue or upcoming tasks **[Observed]**
- Real-time in-portal messaging for contextual communication **[Observed]**

**Screen 4 — Embeddable Portal**
- Portal can be embedded as a widget directly inside the vendor's own app **[Observed]**
- Eliminates the "separate tool" problem — customers see onboarding in context of the product **[Observed]**

### Notable patterns
- Claimed results: 53% reduction in time-to-go-live, 75% improved time-to-activation, 70% reduction in onboarding time **[Observed — vendor-reported]**
- Strongest emphasis on AI-driven personalization among the three platforms

---

## 1.4 Mutual Action Plan (MAP) — Cross-Platform Pattern

### Standard MAP UI Structure **[Observed — composite from Arrows, Smartsheet, IdeaPlan templates]**

| Column | Description | UI Element |
|--------|-------------|------------|
| **Phase/Stage** | Higher-level grouping (e.g., "Getting Started", "Configuration", "Go-Live Prep") | Collapsible section header with color coding |
| **Task/Action Item** | Specific deliverable or step | Text field, often with description expansion |
| **Owner** | Responsible party — vendor-side or customer-side | Avatar/name dropdown, often with company badge |
| **Due Date** | Target completion date | Date picker with calendar |
| **Status** | Current state of the task | Dropdown: Not Started, In Progress, Blocked, Complete |
| **Dependencies** | What must complete before this task | Linked task reference |
| **Comments/Notes** | Contextual notes, approvals, resources | Threaded comment area |
| **Customer Feedback** | Ongoing collaboration notes | Text field or rating |

### Additional MAP fields for enterprise **[Observed — IdeaPlan template]**
- Customer name and contract details
- Plan coordinator and point of contact
- Success criteria and value statement
- Deployment type: department rollout, company-wide, phased
- Stakeholder identification with roles (RACI)

### Best practice: Start MAP during sales, not after contract signature **[Observed]**

---

## 1.5 Sales-to-CS Handoff — Cross-Platform Pattern

### Handoff Package Contents **[Observed — composite from Rocketlane, Flowla, Pedowitz Group]**

**Timing**: Within 24 hours of deal close
- Warm introduction email from Sales AE to CS team
- Kickoff scheduling within 48 hours to 7-14 days of close

**Required artifacts in handoff package**:
1. Order, SOW, signed contracts
2. Success criteria and business goals
3. Decision makers and stakeholder map (champion, admin, executive sponsor, detractors)
4. Scope, timeline, and identified risks
5. Billing details and renewal dates
6. Environment and integration details
7. Reasons for switching and challenges being solved
8. Quick wins identified during sales

### Internal Pre-Kickoff Meeting Agenda **[Observed]**
- Potential problems and foreseeable issues
- Key decision makers vs. product champions vs. detractors
- Client's short-term and long-term goals
- SLAs and signed contracts review

### Kickoff Meeting Structure **[Observed — SkipUp, Pedowitz Group]**

**Required attendees**: Executive sponsor, IT/security lead, billing contact, project lead, CS lead

**Agenda**:
1. Introductions and role confirmation
2. Validate project timeline and milestones
3. Confirm stakeholder roles and responsibilities (RACI)
4. Identify first integration milestone
5. Agree on success plan and governance
6. Set communication cadence (weekly working sessions, monthly executive reviews)
7. Schedule next three recurring check-ins (success measure for kickoff)
8. Trigger provisioning and data access

**Output**: Documented milestones with owners, confirmed success plan, communication cadence, provisioning kicked off

---

## 1.6 Go-Live Checklist — Cross-Platform Pattern

### Structure **[Observed — composite from Moxo, ECOSIRE, Rocketlane]**

**Pre-Go-Live (T-30 to T-1 days)**:
- Data validation: record count verification, financial reconciliation, inventory matching
- User readiness: training completion tracking, access provisioning, documentation distribution
- Testing: UAT sign-off, integration testing, system configuration verification
- Go-live readiness gate at T-7: formal go/no-go decision point

**Go-Live Day**:
- "War room" with key stakeholders for first 48 hours
- Cutover planned for Friday evening or weekend to minimize disruption
- Documented rollback procedures executable within 4 hours
- Known-issue list with contingency triggers

**Post-Go-Live (90-day support)**:
- Intensive monitoring in first 2 weeks (most issues surface here)
- Hypercare period: accelerated support cadence
- Gradual transition to BAU support

### Key insight: "97% of projects with clear documented requirements before development succeed" — implementations fail from coordination failures, not technical issues **[Observed — Moxo]**

---

## 1.7 Enterprise Lane — Category Synthesis

### Common patterns (what multiple companies do the same way)
- **Magic link access** — universal across Rocketlane, GuideCX, OnRamp. No password, no account creation
- **White-labeled portals** — every platform supports full branding (logo, colors, fonts, domain)
- **Widget/module architecture** — portal built from configurable components, not monolithic pages
- **CRM-triggered automation** — project auto-creates when deal closes in Salesforce/HubSpot
- **Milestone-driven progress** — forecasted end dates adjust dynamically based on critical path
- **Dual-side task assignment** — tasks explicitly assigned to vendor team OR customer team with clear ownership

### Config-specific patterns (unique to enterprise implementation)
- **Persona-based views** (GuideCX strongest) — stakeholders see filtered project scopes
- **Program management** — tracking multiple projects per customer relationship, not just individual projects
- **Sales-to-CS handoff automation** — structured package transfer with required fields
- **Embedded portal option** — portal lives inside the product (OnRamp, Rocketlane) vs. separate destination

### Copy patterns
- **Headline structures**: "Your onboarding journey", "What's next", "Getting started with [Product]"
- **CTA language**: "Complete task", "Mark as done", "View your plan", "Schedule kickoff"
- **Progress language**: "3 of 8 tasks complete", "On track for [date] go-live"
- **Risk language**: "At risk — [task] is overdue by 3 days", "Blocked — waiting on [owner]"

### Key differences from SaaS self-serve
- **Multi-stakeholder by design** — not a single-user flow but a collaborative project
- **Timeline is weeks/months**, not minutes — progress measured in milestones, not screens
- **Customer has homework** — significant portion of tasks are customer-owned
- **Human-in-the-loop required** — kickoff meetings, check-ins, and handoffs are integral
- **Training is formal** — structured learning paths with certification, not tooltips

---

# LANE 2: Marketplace Seller + Buyer Onboarding

## 2.1 Airbnb (Host Onboarding)

### Screen-by-screen sequence

**Screen 1 — Entry Point: "Become a Host" Card**
- Appears on user profile page with earnings estimate callout **[Observed]**
- Benefits messaging: earn extra income, flexible schedule, meet travelers **[Observed]**
- Reassurance copy: "You can stop hosting anytime" **[Observed]**

**Screen 2 — Property Type Selection**
- Three large option cards: Entire place, Private room, Shared room **[Observed]**
- Each card includes short explanation text **[Observed]**
- Single-select with visual illustrations per option **[Inferred]**

**Screen 3 — Property Description**
- Further describe property type (house, apartment, cabin, etc.) **[Observed]**
- Clarify guest access: will guests have the place to themselves? **[Observed]**

**Screen 4 — Location Entry**
- Address input with map pin confirmation **[Inferred]**
- Location determines pricing tips, local regulations, and market comparisons **[Inferred]**

**Screen 5 — Guest Capacity**
- Set maximum number of guests **[Observed]**
- Bedroom/bed/bathroom counts **[Inferred]**

**Screen 6 — Amenities Selection**
- Short list of popular amenities shown initially (wifi, kitchen, parking, AC, washer/dryer, self check-in) **[Observed]**
- Full list of ~150 amenities available after publishing **[Observed]**
- Amenities shown as checkboxes with icons **[Inferred]**

**Screen 7 — Photo Upload**
- Multi-photo upload with drag-to-reorder **[Observed]**
- AI-powered tool organizes photos by room to create virtual tour **[Observed]**
- Caption fields for each photo with guidance (sleeping arrangements, accessibility) **[Observed]**
- Guidance: high-quality photos from multiple angles per room **[Observed]**

**Screen 8 — Listing Title**
- Character-limited text input for property name **[Observed]**
- Suggestions/examples shown **[Inferred]**

**Screen 9 — Listing Description**
- Longer text area for property description **[Observed]**
- Guidance on what to highlight **[Inferred]**

**Screen 10 — Pricing Setup**
- Base nightly rate with personalized price tips based on location, amenities, past bookings, and local market **[Observed]**
- Weekend premium pricing (Friday/Saturday) **[Observed]**
- Custom pricing for specific dates **[Observed]**
- Calendar availability setup: minimum/maximum nights **[Observed]**
- Toggle: "Request to Book" vs. "Instant Book" **[Observed]**

### Notable patterns
- 10-screen progressive disclosure wizard — one concern per screen **[Observed]**
- Free to create listing — no upfront cost barrier **[Observed]**
- All choices changeable after publishing — reduces decision anxiety **[Observed]**
- AI assistance for photo organization — reduces manual effort on highest-friction step

### Anti-patterns observed
- Lack of visible progress indicator during listing creation **[Observed]**
- Dense legal agreements causing fatigue at the end **[Observed]**
- No personalization during onboarding based on host type or goals **[Observed]**
- Missing guidance to first action after listing goes live **[Observed]**

---

## 2.2 Etsy (Seller Onboarding)

### Screen-by-screen sequence

**Screen 1 — "Sell on Etsy" Landing Page**
- Separate dedicated page (not accessible from general sign-in) **[Observed]**
- Clear CTA: "Open your Etsy shop" **[Inferred]**
- Distinct from buyer experience — recognized as a different persona journey **[Observed]**

**Screen 2 — Shop Preferences**
- Select shop language **[Observed]**
- Select country **[Observed]**
- Select currency (critical: cannot easily change later, wrong choice = 2.5% conversion fee on every sale) **[Observed]**

**Screen 3 — Shop Name**
- Text input for shop name **[Observed]**
- Note: changeable later (reduces anxiety) **[Observed]**
- Availability check **[Inferred]**

**Screen 4 — First Listing Creation**
- Must create at least one listing (even a dummy) to proceed **[Observed]**
- Required fields: photo, description, price **[Observed]**
- This is the activation gate — cannot open shop without at least one listing **[Inferred]**

**Screen 5 — Payment & Banking Setup**
- Bank account routing and account numbers **[Observed]**
- Credit card for Etsy billing fees **[Observed]**
- One-time $15 setup fee (non-refundable, supports security verification) **[Observed]**

**Screen 6 — Identity Verification**
- Via third-party partner Persona **[Observed]**
- Photo ID upload: driver's license or passport **[Observed]**
- Selfie verification **[Observed]**
- Sensitive to image quality — common failure point **[Observed]**

### Post-Onboarding: Seller Dashboard

**Dashboard Components** **[Observed]**:
- **Today's Top Tasks**: orders needing shipping, messages needing responses, listings needing renewal
- **Stats panel**: total views, visits, orders, revenue with customizable date ranges
- **Shop Advisor**: reminders about expiring listings, bills, cases
- **Resources**: educational guides and seasonal trend reports
- **Recent Activity**: shop favorites, purchases, reviews

**Stats redesign features** **[Observed]**:
- "Visits" metric (each unique customer entering shop) replaces raw "views" — better conversion proxy
- Bot/spam filtering with 3-5 hour data refresh
- Personalized tips based on shop metrics
- Customer insights: location, search behavior, device types
- Listings tab: compare views, favorites, sales per product
- Traffic tab: overview graphs and visualizations

### Notable patterns
- Mandatory first listing before shop opens — forces activation
- Payment info collected mid-flow (not at the very end) — reduces "sunk cost" abandonment at final step
- Identity verification added in 2024 as security upgrade — includes selfie, not just document
- Separate seller portal distinct from buyer experience

### Anti-patterns observed
- Incomplete signups flagged as "dormant" or "suspicious" — creates re-entry friction
- Currency selection error is expensive and hard to fix
- Image quality sensitivity in ID verification causes unnecessary failures
- No first-sale guidance built into onboarding flow itself

---

## 2.3 Uber (Driver Onboarding)

### Screen-by-screen sequence

**Screen 1 — Welcome & Basic Info**
- Name, email, phone number entry **[Observed]**
- Autofill leveraged for common fields to reduce keyboard input **[Observed]**
- Country code auto-detected **[Observed]**

**Screen 2 — Vehicle Information**
- Vehicle make, model, year **[Observed]**
- License plate number **[Inferred]**

**Screen 3 — Document Upload Series**
- **Driver's license**: photo capture with camera (not file picker) + confirmation screen **[Observed]**
- **Vehicle insurance**: photo upload + confirmation **[Observed]**
- **Vehicle registration**: photo upload + confirmation **[Observed]**
- Each document has its own capture → review → confirm micro-flow **[Observed]**

**Screen 4 — Identity Verification**
- Social Security number entry **[Observed]**
- Selfie capture for identity matching **[Observed]**

**Screen 5 — Background Screening**
- Clear explanation copy about background check process **[Observed]**
- Waiting state: "Your background check is in progress" **[Inferred]**

**Screen 6 — Vehicle Inspection**
- Schedule vehicle inspection at a partner location **[Observed]**
- Confirmation screen with date/time/location **[Observed]**

**Screen 7 — Video Tutorial**
- Instructional video on how to use the driver app **[Observed]**
- Covers: accepting rides, navigation, earnings tracking **[Inferred]**

**Screen 8 — Approval & Go-Live**
- Notification when all checks pass **[Inferred]**
- "You're ready to drive" activation screen **[Inferred]**

### Post-Activation: Driver Dashboard
- Real-time earnings totals **[Observed]**
- Upfront trip information before accepting: earnings, destination, time/distance to pickup and dropoff **[Observed]**
- Weekly earnings statements: fares, surge, referrals, promotions, tolls, cancellation fees **[Observed]**
- Earnings estimator: median earnings for similar drivers in your city **[Observed]**
- Payment options: weekly direct deposit, instant payout, Uber Pro Card auto-cashout **[Observed]**

### Notable patterns
- Camera-first document capture (not file upload) — reduces friction on mobile
- Per-document micro-flow (capture → review → confirm) prevents batch failures
- Multi-channel re-engagement: email, SMS, phone calls with animated GIFs for incomplete applications **[Observed]**
- Designed for both mobile and desktop — mobile dominant over time **[Observed]**
- Global flexibility for local market requirements while maintaining brand consistency

### Anti-patterns observed
- Heavy document requirements create significant drop-off during submission phase
- Background check waiting state is a black box (minimal status updates)
- No "first ride" specific guidance after activation documented

---

## 2.4 Shopify (Merchant Onboarding)

### Screen-by-screen sequence

**Screen 1 — Signup Survey (Question-Driven Personalization)**
- Q1: "Which of these best describes you?" — Single-select: "I'm just starting out" / "I'm already selling online or in person" **[Observed]**
  - Explainer text: "We'll help you get set up based on your business needs" **[Observed]**
  - Doubles as sales qualification question **[Observed]**
- Q2: Product/business type questions (e.g., dropshipping interest) **[Observed]**
  - "I'm not sure" as valid answer choice — reduces skip pressure **[Observed]**
- Q3: "Where is your existing audience?" — Multi-select grid of platforms with small colorful logos **[Observed]**
  - 3x3 grid of 9 options before "View All" button **[Observed]**
  - Reframed integration question: not "what tools do you use" but "where is your audience" **[Observed]**
- Progress bar shown (but no step counts) — avoids perceived-length abandonment **[Observed]**
- All questions have "skip" option (de-emphasized visually) **[Observed]**

**Screen 2 — Personalized Setup Checklist (Homepage)**
- Checklist tailored based on signup survey answers **[Observed]**
- Auto-opens to the next incomplete step — focuses attention **[Observed]**
- Progress bar + remaining step count shown (different from signup where count is hidden) **[Observed]**
- Each checklist item contains:
  - Primary CTA button for the main action **[Observed]**
  - Description text with secondary link to "learn more" resource (visually subordinate to CTA) **[Observed]**
  - Illustration per step for intuitive understanding **[Observed]**
- Steps marked complete only after product event fires (event-driven, not self-reported) **[Observed]**
- Personalization example: "Find dropshipping products to sell" appears as first checklist item if user expressed dropshipping interest in survey **[Observed]**
- Checklist accessible both on homepage AND as expandable drawer (unusual dual-UI pattern) **[Observed]**

**Screen 3 — Shopify Payments Setup**
- Located at Settings > Payments **[Observed]**
- "Activate Shopify Payments" button **[Observed]**
- Form fields: personal info, address, identification, business info, phone number **[Observed]**
- Two-step authentication required (payouts held without it) **[Observed]**
- Business type verification and Acceptable Use Policy review **[Observed]**

**Screen 4 — Store Management Configuration**
- Store policies added to checkout **[Observed]**
- Tax settings configuration **[Observed]**
- Package types with dimensions/weights for shipping rates **[Observed]**
- Location setup for multi-inventory management **[Observed]**

**Screen 5 — Product & Offer Setup**
- Product creation with images, descriptions, pricing **[Observed]**
- Guidance: start with small curated selection or single hero product **[Observed]**
- 15-50% profit margin guidance via cost-plus pricing **[Observed]**

**Screen 6 — Resources Card (Below Checklist)**
- Links to help center, Shopify Academy, community **[Observed]**
- Placed on homepage below checklist, not buried in nav **[Observed]**

### Notable patterns
- **Survey-to-checklist personalization** is the gold standard observed — answers directly shape the onboarding path
- Event-driven completion (not self-reported checkboxes) ensures real activation
- Single CTA per checklist step prevents decision paralysis
- Resources card on homepage, not hidden in settings or help menu
- "I'm not sure" as valid answer prevents forced guessing

### Anti-patterns observed
- Dual checklist UI (homepage + drawer) creates maintenance burden and potential inconsistency **[Observed]**
- No earnings projection or "what your first sale might look like" screen documented

---

## 2.5 Amazon Seller Central

### Screen-by-screen sequence

**Screen 1 — Account Selection**
- Option to use existing Amazon account or create new one **[Observed]**
- Email and password setup **[Observed]**

**Screen 2 — Business Information**
- Business location (country) **[Observed]**
- Business type: Individual, Public, Private, Charitable **[Observed]**
- Business name and company registration number **[Observed]**
- Registered business address **[Observed]**
- Phone number with verification **[Observed]**

**Screen 3 — Seller Information**
- Primary contact identity details **[Observed]**
- Personal information verification **[Observed]**

**Screen 4 — Billing**
- Credit or debit card for account fees **[Observed]**

**Screen 5 — Store & Product Information**
- Marketplace selection **[Observed]**
- Operational details **[Observed]**

**Screen 6 — Identity Verification**
- Government-issued ID upload (passport or driver's license) **[Observed]**
- Proof of residential address from last 180 days (bank or utility statement) **[Observed]**
- **Live video verification**: real-time video call where representative views original identification and asks identity-confirming questions **[Observed]**
- For businesses: company registration certificate, VAT number, authorized representative documentation **[Observed]**

**Timeline**: Initial registration in a few hours; identity verification within 3 business days; account approval within 24-72 hours **[Observed]**

### Listing Creation Wizard

**Access**: Catalog > Add Products **[Observed]**

**Step 1**: Search for existing product in Amazon catalog (to avoid duplicates) **[Observed]**
**Step 2**: Product information form:
- Item name (specific descriptive title) **[Observed]**
- Brand name (or "no brand/generic") **[Observed]**
- Product ID: UPC/GTIN (or GTIN exemption for some categories) **[Observed]**
- Category and product type selection **[Observed]**
- Variation theme if applicable (color, size, material) **[Observed]**
- Bullet points (key features) **[Observed]**
- Backend search keywords (10-30 terms) **[Observed]**
- Images: main image + lifestyle/infographic images **[Observed]**
**Step 3**: Save as draft or submit/publish **[Observed]**

### Notable patterns
- **Live video verification** is unique among platforms — human-verified identity in real-time
- Strictest identity requirements of any marketplace observed
- Catalog-first listing approach (check if product already exists) reduces duplicate listings
- Business type selection up front determines compliance requirements

### Anti-patterns observed
- Complex multi-day process creates significant friction vs. Etsy/Shopify same-day launch
- GTIN/UPC requirement creates cost and knowledge barriers for new sellers

---

## 2.6 Fiverr (Seller Onboarding)

### Screen-by-screen sequence

**Screen 1 — Account Creation (Buyer-First)**
- All accounts start as buyer accounts by default **[Observed]**
- Sign up at fiverr.com/join with email/password or social login **[Observed]**
- Email verification required **[Observed]**

**Screen 2 — "Become a Seller" Activation**
- From profile picture menu, select "Become a Seller" **[Observed]**
- Three instructional videos on using Fiverr as a freelancer (mandatory viewing) **[Observed]**
- Only available on desktop/web mobile — not in native apps **[Observed]**

**Screen 3 — Profile Setup**
- Option: upload CV/resume (PDF, up to 10MB) for auto-fill OR manual entry **[Observed]**
- Display name: first name + first initial of last name **[Observed]**
- Profile picture: high-resolution, professional photo, face fills 60% of frame, simple background **[Observed]**
- Title/tagline: 50-character limit, no self-promotional words like "expert" or "best" **[Observed]**
- Location: auto-set from registration country (not editable) **[Observed]**
- Cover image: optional banner (2880 x 400 px recommended) **[Observed]**

**Screen 4 — Gig Creation (Desktop Only)**
- Overview: title, category, metadata tags (max 5), search tags **[Observed]**
- Scope & Pricing: packages, delivery time, revisions, pricing in USD ($5 minimum), optional extras **[Observed]**
- New sellers limited to 4 gigs initially **[Observed]**
- All freelancers reviewed during signup and gig creation before approval **[Observed]**

### Notable patterns
- Buyer-first model: everyone starts as buyer, seller activation is opt-in
- Mandatory instructional videos before selling — unusual educational gate
- Resume upload as profile shortcut — leverages existing professional identity
- Gig limits for new sellers (max 4) — gradual trust building

### Anti-patterns observed
- Desktop-only for profile and gig creation — excludes mobile-first users
- Manual review process creates unknown wait time
- Character limits on tagline (50 chars) are very restrictive

---

## 2.7 Marketplace Lane — Category Synthesis

### Common patterns (what multiple companies do the same way)
- **Identity verification is universal** — every marketplace now requires document upload + selfie (Etsy, Uber, Amazon, Fiverr have seller verification)
- **Listing creation is a wizard** — step-by-step, one concern per screen (Airbnb: 10 steps, Etsy: implicit steps, Amazon: 3-step, Shopify: checklist-guided)
- **Payment/payout setup mid-flow** — collected before listing goes live, not as a post-activation afterthought
- **Separate seller experience** — dedicated entry points distinct from buyer flows (Etsy: "Sell on Etsy" page, Fiverr: "Become a Seller", Airbnb: "Become a Host")
- **Progressive disclosure** — information requested incrementally, not in one massive form

### Config-specific patterns (unique to marketplaces)
- **Two-sided trust building** — seller verification builds buyer confidence (Etsy $15 fee, Amazon video call, Uber background check)
- **Mandatory first-listing gates** — cannot fully activate without creating at least one listing/gig (Etsy, Fiverr)
- **Earnings projections** — Airbnb shows personalized price tips; Uber shows earnings estimator for similar drivers in your city
- **Marketplace metrics for sellers** — dashboards showing visits, conversion, customer behavior (Etsy Stats, Uber earnings)

### Copy patterns
- **Headline structures**: "Become a Host", "Sell on Etsy", "Start selling", "Open your shop"
- **Benefit framing**: "Earn extra income" (Airbnb), "Reach millions of buyers" (Etsy), "Be your own boss" (Uber)
- **Anxiety reducers**: "You can stop hosting anytime" (Airbnb), "You can change this later" (Shopify), "I'm not sure" option (Shopify)
- **Trust building**: "$15 setup fee supports security verification" (Etsy), "Background check required" (Uber)
- **CTA language**: "List your space", "Open your shop", "Start driving", "Create your first gig"

### Key differences from SaaS self-serve
- **Two personas to onboard** — sellers AND buyers, each with different flows
- **Physical-world verification** — document checks, vehicle inspections, video calls
- **Marketplace must sell itself to suppliers** — onboarding IS marketing ("Here's what you'll earn")
- **Activation = first transaction**, not first login — need both supply and demand
- **Trust is bilateral** — platform must build trust in both directions simultaneously

---

# LANE 3: Fintech / Regulated KYC Onboarding

## 3.1 Stripe (Connect Merchant Onboarding)

### Screen-by-screen sequence

**Stripe-Hosted Onboarding Form (recommended path)**

**Screen 1 — Business Information**
- Dynamically rendered based on country, business type, and requested capabilities **[Observed]**
- Prefilled information from platform (not re-asked, but must be confirmed) **[Observed]**
- Fields: business name, business type, registered address, business website **[Inferred]**
- Input validation, formatting, and error handling built-in **[Observed]**

**Screen 2 — Identity Verification**
- Management and ownership details **[Observed]**
- Government-issued ID for individuals with 25%+ ownership **[Inferred]**
- Beneficial owner information for businesses **[Observed]**
- Requirements vary by country, business structure, and risk level **[Observed]**

**Screen 3 — Payout Information**
- Bank account details: account number, routing number **[Observed]**
- Option for debit card as payout method **[Observed]**
- Wire transfer information for international payouts **[Observed]**
- Currency selection **[Inferred]**

**Screen 4 — Verification Summary / Confirmation**
- Review all submitted information **[Observed]**
- Accept Connect service agreement **[Observed]**
- Redirect to platform's return URL upon completion **[Observed]**

### Onboarding Modes
- **Upfront onboarding**: collects all `eventually_due` requirements at sign-up — more friction upfront, fewer interruptions later **[Observed]**
- **Incremental onboarding**: collects only `currently_due` requirements initially — lower initial friction, requests more info as account grows **[Observed]**

### Rejection/Remediation Flow
- When verification fails: `payouts_enabled` and `charges_enabled` set to false **[Observed]**
- `requirements.disabled_reason` indicates rejection reason (e.g., "rejected.fraud") **[Observed]**
- Remediation options: Connect embedded component, Stripe-hosted onboarding re-entry, or remediation link **[Observed]**
- Connected accounts directed to Stripe Dashboard with prompts to provide/correct information **[Observed]**

### Customization
- Brand name, color, icon configurable via Dashboard **[Observed]**
- Multi-language, multi-country support from single integration **[Observed]**
- Platform reported 17% conversion increase after implementing Connect Onboarding **[Observed — vendor-reported]**

### Notable patterns
- **Dynamic form rendering** is the most sophisticated observed — same integration works across countries and business types
- **Incremental vs. upfront onboarding choice** gives platforms control over friction timing
- **Platform handles nothing** — Stripe manages all compliance updates automatically
- **Conversion-optimized by default** — lessons from thousands of platforms baked into the UX

### Anti-patterns observed
- Remediation flow for rejected documents is opaque — user sees that something failed but specific guidance on what to fix is limited
- No visible progress indicator in hosted form documented

---

## 3.2 Wise (TransferWise)

### Screen-by-screen sequence

**Screen 1 — Account Creation / OAuth Redirect**
- Redirect-based flow: user sent to Wise authorization page **[Observed]**
- Options: create new account or link existing Wise account **[Observed]**
- Social login supported (Google login via SafariViewController/ChromeCustomTab for security) **[Observed]**

**Screen 2 — Profile Selection/Creation**
- Create or select a profile to link with the application **[Observed]**
- Two-factor authentication if enabled **[Observed]**

**Screen 3 — Identity Verification**
- Two paths: Singpass (where available) or document upload **[Observed — Mobbin]**
- Document upload: passport or government ID **[Inferred]**
- Selfie/liveness check **[Inferred]**
- Account setup progress indicator with prominent "Verify identity" CTA **[Observed — Mobbin]**

**Screen 4 — Permission Grant**
- User agrees to grant application access to their Wise profile **[Observed]**
- Clear explanation of what data will be shared **[Inferred]**

**Screen 5 — Redirect Back to Application**
- Authorization code returned to platform **[Observed]**
- Seamless transition back to originating app **[Observed]**

### First Transaction Guide
1. Select "Send" from home screen **[Observed]**
2. Select recipient's country and whether they're on Wise **[Observed]**
3. Enter amount and choose currency **[Observed]**
4. Add recipient: search by @Wisetag, email, phone, or manual bank details **[Observed]**
5. Choose payment method (bank transfer cheapest) **[Observed]**
6. Review all details and confirm **[Observed]**
7. Email confirmation when money received and when on its way **[Observed]**

### Notable patterns
- 9.2/10 UX rating in comprehensive teardown **[Observed]**
- High contrast colors and screen reader-friendly flows **[Observed]**
- Progressive disclosure throughout **[Observed]**
- Mobile-first with secure browser views (not WebViews) for auth **[Observed]**

---

## 3.3 Revolut

### Screen-by-screen sequence

**Screen 1 — Personal Details**
- Name, date of birth, email entry **[Observed]**

**Screen 2 — Email & Phone Verification**
- Email verification link/code **[Observed]**
- Phone number verification via SMS **[Observed]**

**Screen 3 — Passcode Setup**
- Create app passcode for security **[Observed]**

**Screen 4 — Identity Document Upload**
- Choose document type: passport or driver's license **[Observed]**
- Photo capture of document (original physical document, not copies/scans/screenshots) **[Observed]**
- Requirements: entire document visible, not folded/cropped, clear and readable **[Observed]**
- Must match name on Revolut account **[Observed]**

**Screen 5 — Selfie Capture**
- Take a clear selfie showing face **[Observed]**
- Used for face-matching against document **[Inferred]**

**Screen 6 — Document Submission & Waiting State**
- Documents submitted for verification **[Observed]**
- Deadline provided for submission **[Observed]**
- If not submitted: account restrictions apply **[Observed]**

**Screen 7 — Plan Selection**
- Choose account tier: Standard (free), Plus, Premium, Metal, Ultra **[Observed]**
- Each tier clearly shows features and pricing **[Observed]**

**Screen 8 — Account Funding**
- Multiple deposit methods: bank transfer (free), card (fee varies), Apple/Google Pay (fee varies), cash deposit (2.5% fee) **[Observed]**

### Verification Prompts & Waiting States
- Email notifications **[Observed]**
- In-app push notifications **[Observed]**
- Banner prompts on home screen **[Observed]**
- Deadline communicated for document submission **[Observed]**

### Plan-Based Feature Unlocking (Not Verification-Based)
- Revolut uses **subscription tiers**, not progressive verification levels **[Observed]**
- Standard: basic features, limited exchanges
- Plus: better international spending limits, purchase insurance
- Premium: disposable virtual cards, priority support, higher exchange limits ($10K/month)
- Metal: travel/medical insurance, stainless steel card, unlimited currency exchange
- Ultra: unlimited lounge access, monthly global data, cancellation cover

### First Transaction Guide
1. "Add money" button on home screen **[Observed]**
2. Select amount and currency **[Observed]**
3. Choose funding method **[Observed]**
4. For transfers: "Transfer" > choose recipient > enter amount > confirm **[Observed]**
- Free between Revolut users globally and within SEPA **[Observed]**
- Fees for international transfers outside SEPA **[Observed]**

### Notable patterns
- OTP auto-resend with timers — reduces verification friction **[Observed — greenmoov.app]**
- FSCS (Financial Services Compensation Scheme) badges embedded as trust signals **[Observed — greenmoov.app]**
- Colorful benefit messaging during onboarding: "$0 fees" prominently displayed **[Observed — greenmoov.app]**
- Plan selection AFTER verification — don't monetize until identity confirmed

### Anti-patterns observed
- Document quality requirements are strict and common failure point
- No clear guidance on what happens during verification waiting period
- Account restrictions if deadline missed — punitive rather than supportive

---

## 3.4 Robinhood

### Screen-by-screen sequence

**Screen 1 — App Download & Signup**
- Download from Apple App Store or Google Play **[Observed]**
- Personal information: full legal name, date of birth, email **[Observed]**

**Screen 2 — Address & SSN**
- Residential address **[Observed]**
- Social Security number or ITIN **[Observed]**

**Screen 3 — Identity Verification**
- Government-issued ID: front and back of driver's license or passport **[Observed]**
- Three-point selfie (multiple angles) **[Observed]**

**Screen 4 — Bank Account Linking**
- Connect bank account for funding **[Observed]**
- Via Plaid or manual account/routing entry **[Inferred]**

**Screen 5 — Fund Account**
- Transfer money from linked bank **[Observed]**
- Minimum amounts for different account types **[Inferred]**

**Screen 6 — Waiting State**
- Email confirmation within "coming days" — either approval or request for additional information **[Observed]**

### Progressive Feature Unlocking (Verification + Tier Based)
- **Options Trading Levels**: Tiered permissions system **[Observed]**
  - Level 1: basic calls/puts
  - Level 2: cash-secured puts, covered calls
  - Level 3: spreads, condors, butterflies (typically requires 3-6 months activity + Instant or Gold account)
- **Banking Tiers**: Standard vs. Premier based on Assets Under Custody and direct deposit **[Observed]**
- Feature unlocking tied to both verification completion AND account activity/assets **[Observed]**

### Notable patterns
- Three-point selfie for stronger identity verification **[Observed]**
- Progressive feature unlocking based on activity, not just verification
- Clear tiered options system — users understand what they need to do to unlock more
- Bank linking via Plaid for instant verification

### Anti-patterns observed
- Vague "coming days" timeline for approval — no specific SLA communicated
- Additional verification steps on new device sign-in can block access to crypto and debit card features

---

## 3.5 Mercury (Business Banking)

### Screen-by-screen sequence

**Screen 1 — Online Application Start**
- Fully digital, browser-based application **[Observed]**
- ~10 minutes estimated completion time **[Observed]**
- No in-person visits required **[Observed]**

**Screen 2 — Company Information**
- Physical business address (commercial or residential, no P.O. boxes) **[Observed]**
- Company formation documents upload (Articles of Incorporation, PDF) **[Observed]**
- IRS-issued EIN document (Form CP575, Form 147c, completed SS-4, or IRS website screenshot temporarily) **[Observed]**

**Screen 3 — Owner Information**
- For each individual with 25%+ ownership **[Observed]**:
  - Full legal name
  - Residential address
  - Government ID: international passport or U.S. government ID

**Screen 4 — Approval & Activation**
- Accounts operational within hours to days after approval **[Observed]**
- Immediate virtual card issuance upon approval **[Observed]**
- Can begin transacting immediately after virtual card issued **[Observed]**

### Notable patterns
- **10-minute application** is fastest business banking onboarding observed
- **Immediate virtual card** upon approval — don't wait for physical card to start transacting
- Supports international founders with U.S.-formed companies **[Observed]**
- Paperless — all document submission via secure upload portal

### Anti-patterns observed
- P.O. boxes and virtual addresses rejected — excludes some early-stage businesses
- Temporary IRS screenshot acceptance suggests process flexibility but also verification weakness

---

## 3.6 Brex (Business Cards & Banking)

### Screen-by-screen sequence

**Screen 1 — Business Verification**
- Complete business verification before proceeding **[Observed]**
- EIN verification via IRS letter (Form CP 575 or 147-C) **[Observed]**
- Company website required **[Observed]**

**Screen 2 — Financial Services Application**
- Personal ID: state ID, U.S. driver's license, or passport (must be active/unexpired) **[Observed]**
- SSN for regulatory compliance (not used for credit checks) **[Observed]**
- Beneficial owners (25%+ ownership) information **[Observed]**
- Controlling officers (CEO, CFO, COO) information **[Observed]**

**Screen 3 — Address Verification**
- Valid U.S. physical address **[Observed]**
- Supporting documentation: utility bills, lease agreements, bank statements (within last 3 months) **[Observed]**

**Screen 4 — Account Setup**
- Card autopay: select funding source (Brex account or external bank) **[Observed]**
- Card policy setup: expense management rules **[Observed]**

**Screen 5 — Fund Account**
- Add initial funds to Brex business account **[Observed]**

**Screen 6 — Periodic Re-verification**
- Address, industry, and beneficial ownership confirmation by account/card admins **[Observed]**

### Notable patterns
- **Explicit "not used for credit checks"** messaging for SSN — addresses major anxiety point
- Card policy setup during onboarding — compliance built into activation, not afterthought
- Periodic re-verification acknowledges regulatory requirement for ongoing KYC

### Anti-patterns observed
- Company website requirement excludes pre-launch startups
- Physical address verification documents (3-month limit) can be hard for very new businesses

---

## 3.7 Plaid (Identity Verification Infrastructure)

### Screen-by-screen sequence (as verification provider)

Plaid provides the IDV infrastructure that other fintechs embed. Their flow screen sequence:

**Screen 1 — ACCEPT_TOS**: Terms of service acceptance **[Observed]**
**Screen 2 — VERIFY_SMS**: Phone number verification via SMS **[Observed]**
**Screen 3 — KYC_CHECK**: Data source verification — name, address, DOB, phone, ID numbers checked against trusted databases **[Observed]**
**Screen 4 — DOCUMENTARY_VERIFICATION**: Document upload — real-time photo capture (not from photo library) **[Observed]**
- OCR processing + optional fraud detection (25+ fraud signals: visual tampering, suspicious metadata, inconsistent content) **[Observed]**
**Screen 5 — RISK_CHECK**: Fraud assessment **[Observed]**
**Screen 6 — SELFIE_CHECK**: Liveness verification — short video confirming user is real person, matched against document photo **[Observed]**

### Customization
- Screen sequence customizable via dashboard templates **[Observed]**
- Steps can be included/excluded based on risk profile **[Observed]**
- Embedded in host app via Plaid Link component **[Observed]**

### Notable patterns
- Real-time capture only (not from photo library) — anti-fraud measure
- 25+ fraud signal scanning on documents
- Configurable flow — not all screens required for all use cases
- Webhook-based status updates for async processing

---

## 3.8 Fintech Lane — Category Synthesis

### Common patterns (what multiple companies do the same way)
- **Document + selfie is the standard**: every fintech requires photo ID upload AND face verification
- **Progressive disclosure of requirements**: don't show all steps at once, reveal as user progresses
- **Mobile-first design**: camera-based capture, not file upload, is the primary document collection method
- **Immediate partial access**: virtual cards (Mercury), basic transfers (Revolut), or limited features before full verification
- **Multi-channel verification prompts**: email + push + in-app banners (Revolut, Stripe, Wise)

### Config-specific patterns (unique to fintech/KYC)
- **Dynamic form rendering** (Stripe): same integration adapts to country, business type, and capabilities
- **Incremental vs. upfront collection** (Stripe): platform chooses friction timing
- **Plan selection AFTER verification** (Revolut): don't monetize until identity confirmed
- **Progressive feature unlocking** (Robinhood): options trading levels, banking tiers gated by activity + verification
- **Live video verification** (Amazon Seller Central, though marketplace): human-verified identity for highest trust
- **Periodic re-verification** (Brex): ongoing compliance, not one-time check

### Copy patterns
- **Why-we-need-this language**:
  - "We need this to verify your identity and keep your account secure" **[Inferred — common pattern]**
  - "Required by financial regulations to protect you" **[Inferred]**
  - "Not used for credit checks" (Brex — for SSN specifically) **[Observed]**
  - "Regulated by [authority]" — FSCS badges, FCA mentions **[Observed — Revolut/Monzo]**
- **Friction-justification copy**:
  - "This takes about 10 minutes" (Mercury) **[Observed]**
  - "Hold steady for a clear scan" — actionable micro-copy during document capture **[Observed — greenmoov.app]**
  - "Great lighting = quick scan" — pre-capture guidance **[Observed — greenmoov.app]**
  - "Almost there!" — progress encouragement **[Observed — greenmoov.app]**
- **Waiting state copy**:
  - "Your application is being reviewed" **[Inferred — common]**
  - "We'll email you within [timeframe]" — Robinhood says "coming days" **[Observed]**
  - "Your background check is in progress" (Uber) **[Inferred]**
- **Rejection copy**:
  - Stripe provides `disabled_reason` codes (e.g., "rejected.fraud") **[Observed]**
  - Remediation prompts to "provide or correct" information **[Observed]**
  - Specific guidance on what to fix is generally weak across platforms **[Inferred]**

### Key differences from SaaS self-serve
- **Compliance is the primary constraint**, not conversion optimization
- **Waiting states are real** — minutes to days, not instant
- **Rejection is a real flow** — users can fail onboarding, requiring remediation paths
- **Progressive trust unlocking** — features unlock incrementally, not all at once
- **Document capture is a product in itself** — camera quality, lighting, framing all affect success
- **Every pixel communicates security posture** — design must convey trust
- **Regional variation** — same product has different flows per country
- **39% cite waiting time as top abandonment reason; 34% cite excessive personal information requests** **[Observed — INSART]**
- **54% abandonment rate in financial IDV** (Forrester) **[Observed — greenmoov.app]**

---

# LANE 4: Agency / Professional Services Client Onboarding

## 4.1 HubSpot (Partner Agency Onboarding)

### Screen-by-screen sequence

**Partner Onboarding (Agency becomes HubSpot Partner)**

**Screen 1 — Partner Agreement**
- Sign Partner Agreement **[Observed]**
- Administrative setup: assign partner seats, setup partner employees, grant admin permissions **[Observed]**
- Setup directory profile **[Observed]**
- Upload bank & tax information **[Observed]**

**Screen 2 — Kickoff Call**
- Meet with dedicated Partner Development Manager **[Observed]**
- Develop strategic plan for expanding HubSpot practice **[Observed]**
- Plan for driving sales **[Observed]**

**Six Major Milestones (First 90 Days)** **[Observed]**:
1. Sign agreement
2. Assign partner seats
3. Setup partner employees
4. Grant admin permissions
5. Setup directory profile
6. Upload bank/tax info

### Client Onboarding (Agency onboards their clients into HubSpot)

**Phase 1 — Client Prep**
- Collect client information (logins, business context) **[Observed]**
- Set SMART goals **[Observed]**
- Review the sale details **[Observed]**
- Create implementation timeline **[Observed]**

**Phase 2 — Portal Setup**
- Add portal users **[Observed]**
- Configure content preferences (hosting, templates) **[Observed]**
- Connect social accounts **[Observed]**
- Set up email compliance **[Observed]**
- Install tracking code **[Observed]**
- Upload databases **[Observed]**
- Enable analytics **[Observed]**
- Explore integrations **[Observed]**

**Phase 3 — Marketing to Sales Handoff**
- Define sales processes **[Observed]**
- Create handoff blueprints **[Observed]**
- Implement CRM connections **[Observed]**

**Phase 4 — Sales to Services Handoff**
- Understand service processes **[Observed]**
- Connect service tools to HubSpot **[Observed]**

### Automation
- Workflow automation triggered by deal close: welcome emails, task assignments, scheduled check-ins **[Observed]**
- Onboarding services range from $10,000 to $24,000 **[Observed]**
- Professional onboarding engagement ~6 weeks **[Observed]**

---

## 4.2 Teamwork (Agency Project Management)

### Screen-by-screen sequence

**Screen 1 — Client Account Creation**
- Unlimited client users at no extra cost **[Observed]**
- Customizable client access with tailored permissions based on project needs **[Observed]**
- Clients can: add comments, create tasks and task lists, create milestones, log time **[Observed]**

**Screen 2 — Project Dashboard**
- Customizable views tracking intake to delivery **[Observed]**
- AI-powered automation and templates **[Observed]**
- Unified task tracking, budgets, and timelines **[Observed]**

**Screen 3 — Onboarding Setup**
- Set expectations and communication protocols **[Observed]**
- Discuss goals **[Observed]**
- Templates and checklists for new client onboarding **[Observed]**

**Screen 4 — Ongoing Collaboration**
- In-platform approval workflows **[Observed]**
- Resource and team management for forecasting **[Observed]**
- Time and budget tracking for billable hours **[Observed]**
- Smart reporting for status updates **[Observed]**

### Notable patterns
- Unlimited client users removes friction of "how many seats" conversations
- Clients can be active participants (create tasks, log time), not just viewers

---

## 4.3 Monday.com (Client Portal Builder)

### Screen-by-screen sequence

**Screen 1 — Branded Login Page**
- Prebuilt and branded login experience **[Observed]**
- Custom domain support **[Observed]**

**Screen 2 — Customizable Portal Pages**
- Multiple pages structured by topic/action **[Observed]**
- Left sidebar with reorderable page navigation **[Observed]**
- Content organized through intuitive content sections **[Observed]**

**Screen 3 — Project Status Dashboard**
- Real-time project status: progress, milestones, upcoming deliverables **[Observed]**
- Live data pulled directly from Monday.com boards **[Observed]**
- Personalized content using placeholders that display variable info based on signed-in client **[Observed]**

**Screen 4 — Communication & Collaboration**
- Client-to-team chat on board items **[Observed]**
- Task review and approvals with comments and change requests **[Observed]**
- File sharing capabilities **[Observed]**
- Clients can trigger predefined Monday.com automations **[Observed]**

**Screen 5 — Document Management**
- Secure access to files and reports **[Observed]**
- Real-time data synchronization **[Observed]**

### Notable patterns
- Portal builder is no-code — fast deployment
- Client-triggered automations is unique — empowers clients to initiate workflows
- Personalized content via placeholders — each client sees their own data without manual customization
- Mobile-responsive design

---

## 4.4 Agency Intake & SOW Patterns (Cross-Platform)

### Client Intake Form Structure **[Observed — composite from Paperform, AgencyAccess, Clariva, Softr]**

**Common fields**:
- Company name and website
- Contact information (primary + backup)
- Budget range (often presented as ranges, not open field)
- Timeline expectations
- Project goals and success metrics
- Key stakeholders and approval chain
- Technical constraints and existing integrations
- Content ownership and delivery expectations
- Competitive landscape context
- Brand guidelines and existing assets

**UX patterns**:
- Multi-step experience breaking questions into sections **[Observed]**
- Conditional logic that adapts based on responses (e.g., if budget < threshold, route to different track) **[Observed]**
- Brand asset upload capability **[Observed]**
- Thank you / confirmation page with next-step expectations **[Observed]**
- Progress indicator through intake stages **[Inferred]**

### SOW / Scope Agreement Structure **[Observed — composite from OneSuite, Alex Berman, CoSchedule]**

**Standard sections**:
1. Project overview (1 paragraph: outcome + why it matters to client)
2. Specific deliverables (clear bullet points, no vague phrases)
3. Timeline & milestones (phased schedule with named milestones and dates)
4. Client responsibilities (access, approvals, asset deadlines, response times)
5. Success metrics (2-3 measurable criteria defining "done")
6. Revision rounds (cap on included revisions)
7. Payment terms (tied to deliverable milestones)
8. Scope change clause ("additions require written approval and may cost extra")
9. Acceptance criteria (approval timeline)

**Digital presentation**: 23-slide PowerPoint format available for formal SOW walkthrough **[Observed]**

### Agency Onboarding Process (4-Stage Model) **[Observed — Clariva]**

1. **Intake**: Validate project viability (budget, timeline, stakeholders)
2. **Questionnaire**: Deeper context (brand, past experience, decision-making culture)
3. **Brief Review & Sign-off**: Written brief with completeness standards — named final approvers (not just roles)
4. **Kickoff & Handoff**: Confirmation meeting with documented agreements

### Kickoff Meeting Structure **[Observed — composite]**
- Introductions: team members from both sides with roles
- Review of intake findings and SOW
- Confirm communication cadence and tools
- Agree on escalation procedures
- Review first milestone timeline
- Q&A
- Document all decisions in shared space

---

## 4.5 Agency Lane — Category Synthesis

### Common patterns (what multiple companies do the same way)
- **Client portal as relationship hub** — not just project management but the primary client touchpoint
- **Unlimited/generous client seats** — reducing friction of adding stakeholders (Teamwork, Monday.com)
- **Branded experience** — white-label portals matching agency branding
- **Structured intake forms** — multi-step with conditional logic, not a single page
- **SOW as contract AND onboarding artifact** — the scope document IS the onboarding plan

### Config-specific patterns (unique to agency/professional services)
- **Named approver requirements** — not just "the client" but "Sarah, VP Marketing" as final sign-off
- **Revision caps explicitly stated** — scope management built into onboarding artifacts
- **Payment milestones tied to deliverables** — financial structure embedded in onboarding plan
- **Client responsibilities section** — explicit obligations for the client (response times, asset delivery, approvals)
- **Escalation procedures defined** — what happens when things go wrong, agreed upfront
- **Decision-making culture assessment** — intake forms ask about how the client organization makes decisions

### Copy patterns
- **Headline structures**: "Welcome to your [Agency] portal", "Your project at a glance", "Getting started"
- **Intake copy**: "Tell us about your business", "What does success look like?", "What's your budget range?"
- **SOW copy**: "What's included", "What you'll provide", "How changes work"
- **CTA language**: "Review and approve", "Submit feedback", "Schedule check-in"
- **Expectation setting**: "You'll hear from us within 24 hours", "Your dedicated team is [names]"

### Key differences from SaaS self-serve
- **Relationship-first**, not product-first — human introductions are integral to onboarding
- **Scope negotiation** — onboarding includes agreeing on what will be done, not just learning a product
- **Client has significant obligations** — asset delivery, approvals, response times
- **Payment is part of onboarding** — milestone-based invoicing tied to project phases
- **No self-serve path** — everything involves human coordination
- **Kickoff meeting is the activation event**, not a product action

---

# CROSS-LANE SYNTHESIS

## Universal Patterns Across All Four Categories

1. **Branded, white-labeled experience** — every category uses customized portals reflecting the provider's brand
2. **Progressive disclosure** — information revealed step-by-step, not all at once
3. **Magic links / passwordless access** — reducing login friction across enterprise (Rocketlane, GuideCX), marketplace (Airbnb Instant Book), and agency portals
4. **Multi-channel communication** — email + in-app + SMS used across all categories
5. **Mobile-responsive design** — every platform supports mobile access

## Category-Specific Activation Events

| Category | Activation Event | Timeline |
|----------|-----------------|----------|
| Enterprise Implementation | Kickoff meeting completed + first milestone achieved | Days to weeks |
| Marketplace Seller | First listing published | Minutes to hours |
| Marketplace Buyer | First purchase/booking | Minutes |
| Fintech KYC | Identity verification approved | Minutes to days |
| Agency Client | SOW signed + kickoff completed | Days |

## Friction Hierarchy (Lowest to Highest)

1. **SaaS self-serve** (not covered but implied baseline): email → product → value in minutes
2. **Marketplace buyer**: minimal friction, account + first purchase
3. **Marketplace seller**: moderate friction — verification + listing creation
4. **Fintech consumer**: moderate-high friction — KYC + document upload + waiting
5. **Fintech business**: high friction — business docs + owner verification + waiting
6. **Agency client**: high friction — intake + SOW + kickoff (but human-supported)
7. **Enterprise implementation**: highest friction — handoff + kickoff + mutual action plan + multi-week timeline (but fully supported)

## Copy & UX Meta-Patterns

### Anxiety Reduction Techniques (Observed Across All)
- "You can change this later" (Shopify, Airbnb)
- "This takes about X minutes" (Mercury, Brex)
- "I'm not sure" as valid option (Shopify)
- Progress bars without step counts during signup (Shopify)
- Trust badges and regulatory mentions (Revolut, Brex)

### Waiting State Design (Fintech-Specific but Applicable)
- Explicit status labels: "initiated", "verified", "pending", "completed" — not vague "processing"
- Timeline expectations communicated upfront
- Multi-channel reminders (email + push + in-app banner)
- 39% of users cite waiting time as top abandonment reason
- Automated verification preferred over manual review by users

### Two-Sided Trust Building (Marketplace-Specific)
- Verification requirements for sellers build buyer confidence
- Platform metrics shown to sellers prove marketplace viability
- Earnings projections reduce supplier-side anxiety
- Fees (Etsy $15) serve dual purpose: revenue AND trust signal

---

## Research Gaps & Open Questions

1. **Detailed rejection screen copy** — specific error messages shown to users when documents fail are poorly documented across all platforms
2. **Exact screen layouts** — while component lists are well-documented, pixel-level layout details require access to products (Mobbin and Page Flows have screenshots but behind paywall)
3. **A/B test results** — platforms rarely share specific conversion data on onboarding variants
4. **Workday implementation screens** — enterprise on-premise implementations have very limited public documentation
5. **First-transaction guidance** — most platforms document how to do the first transaction but not if there's specific guided first-transaction UX vs. just the normal product flow
6. **Fiverr gig creation details** — limited documentation on the actual gig wizard screen sequence beyond overview/pricing tabs
7. **Uber post-activation new driver guidance** — specific "first ride" onboarding experience not publicly documented

## Sources

### Tier 1 (Official Documentation)
- [Rocketlane Customer Portal 2.0](https://www.rocketlane.com/blogs/customer-portal)
- [GuideCX Customer Views in 2.0](https://help.guidecx.com/en/articles/12663058-customer-views-in-2-0)
- [GuideCX Customer Roles](https://help.guidecx.com/en/articles/8411944-customer-roles-view-as-customer)
- [OnRamp Customer Portal](https://onramp.us/product/customer-portal)
- [Stripe Connect Hosted Onboarding](https://docs.stripe.com/connect/hosted-onboarding)
- [Stripe Connect Identity Verification](https://stripe.com/docs/connect/identity-verification)
- [Wise User Onboarding Docs](https://docs.wise.com/guides/product/kyc/wise-kyc/redirect-to-wise/user-onboarding)
- [Revolut Identity Verification Help](https://help.revolut.com/help/profile-and-plan/profile-plan/verifying-identity/how-do-i-verify-my-identity/)
- [Robinhood Open Account](https://robinhood.com/us/en/support/articles/open-my-account)
- [Mercury Eligibility](https://support.mercury.com/hc/en-us/articles/28770467511060-Eligibility)
- [Brex Application](https://www.brex.com/support/submitting-an-application)
- [Plaid Identity Verification Docs](https://plaid.com/docs/identity-verification)
- [Shopify Payments Setup](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/account-setup)
- [Shopify Setup Guide](https://shopify.dev/docs/api/app-home/patterns/compositions/setup-guide)
- [Amazon Seller Registration Guide](https://sell.amazon.com/sell/registration-guide)
- [Etsy New-Shop Onboarding](https://www.etsy.com/seller-handbook/article/1241780194948)
- [Etsy Dashboard Help](https://help.etsy.com/hc/en-us/articles/360000343908)
- [Airbnb Listing Setup](https://www.airbnb.com/resources/hosting-homes/a/how-to-finish-listing-your-space-461)
- [Uber Driver Onboarding Engineering](https://www.uber.com/en-IE/blog/driver-onboarding-funnel/)
- [Fiverr Seller Profile Help](https://help.fiverr.com/hc/en-us/articles/360010558598)
- [HubSpot Partner Onboarding](https://www.hubspot.com/services/onboarding/partner)
- [Teamwork Client Users](https://www.teamworkpm.net/product/client-users/)

### Tier 2 (Research & Industry)
- [Candu: Shopify Onboarding Teardown](https://www.candu.ai/blog/shopify-onboarding-flow)
- [Eleken: Fintech Onboarding Simplification](https://www.eleken.co/blog-posts/fintech-onboarding-simplification)
- [Greenmoov: Identity Verification UX Best Practices](https://greenmoov.app/articles/en/identity-verification-ux-best-practices-complete-guide-to-frictionless-kyc-design)
- [INSART: Anatomy of Trust in Fintech UX](https://insart.com/anatomy-of-trust-fintech-ux-onboarding-dropoff/)
- [Rocketlane: Sales-to-CS Handoff Guide](https://www.rocketlane.com/blogs/sales-to-customer-success-handoff)
- [SkipUp: First Implementation Meeting Checklist](https://blog.skipup.ai/sales-implementation-handoff-meeting-checklist)
- [Moxo: Go-Live Planning Checklist](https://www.moxo.com/blog/go-live-planning-checklist)
- [ECOSIRE: ERP Go-Live Checklist](https://ecosire.com/blog/erp-go-live-checklist-launch-guide)
- [Arrows: Mutual Action Plan Template](https://arrows.to/resources/mutual-action-plan-template)
- [Clariva: Agency Client Onboarding](https://www.clariva.io/client-onboarding)
- [Mobbin: Revolut & Wise Flows](https://mobbin.com/explore/flows/e4aafa30-7130-45e4-98c5-13d87634a9c4)
- [Userbrain: TransferWise UX Teardown](https://www.userbrain.com/blog/ux-teardown-transferwise-money-transfer-service)
- [Page Flows: Stripe Onboarding](https://pageflows.com/post/desktop-web/onboarding/stripe/)

### Tier 3 (Supporting)
- [Medium: Airbnb Host Onboarding Design](https://medium.com/@louart67/designing-a-mobile-become-a-host-onboarding-flow-fc0c6e648c75)
- [The UXologist: Airbnb Onboarding Analysis](https://www.theuxologist.com/psychology-case-study/airbnb-dull-onboarding)
- [Medium: Uber Driver Signup Flow](https://medium.com/@mpholganza/flow-of-the-day-1-uber-driver-signup-32ab8051818d)
