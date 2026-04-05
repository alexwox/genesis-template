# Onboarding Screen Implementations: SaaS Self-Serve & B2C Subscription

> Research date: April 2026
> Sources: 25+ teardowns from Supademo, Candu, UserGuiding, GoodUX/Appcues, Growth.Design, UX Collective, Page Flows, Mobbin, ScreensDesign, ReallyGoodUX, practitioner blogs
> Evidence tags: **[Observed]** = from screenshots/teardowns with visual evidence; **[Inferred]** = from descriptions without screenshots; **[Uncertain]** = limited or conflicting evidence

---

## LANE 1: SaaS Self-Serve Onboarding Screens

---

### 1. Notion

**Sources**: [Supademo teardown](https://supademo.com/user-flow-examples/notion), [Candu teardown](https://www.candu.ai/blog/how-notion-crafts-a-personalized-onboarding-experience-6-lessons-to-guide-new-users), [UserOnboard](https://www.useronboard.com/user-onboarding-teardowns/)

**Activation event**: First structured workspace page created or AI-generated
**Time-to-value**: ~3–6 minutes

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Sign-up** | Single-column centered | Email field, Google SSO button, Apple SSO | "Log in or sign up" |
| 2 | **Profile setup** | Single-column centered | Name field, optional profile photo upload | "Set up your profile" |
| 3 | **Workspace detection** | Single-column with card | Domain-based team detection prompt, "Join existing" vs "Create new" options | "It looks like your team is already using Notion" |
| 4 | **Use-case segmentation** | Full-page, 3-card selector | Three large cards: Work / Personal / School | "How are you planning to use Notion?" |
| 5 | **Workspace naming** | Single-column centered | Text field for workspace name, preview showing name in sidebar | "Name your workspace" |
| 6 | **Dashboard with checklist** | Full product UI, left sidebar + main area | Onboarding checklist (4–6 items), template suggestions, AI page generator button, sidebar navigation | Checklist items: "Import data," "Create a page," "Try Notion AI" |
| 7 | **AI-generated starter page** | Full product UI, two-panel (chat + preview) | AI prompt input, live page generation preview, edit controls | "Describe what you want to create" |
| 8 | **Post-activation scaffolding** | Full product UI | Featured templates, learning guides, use-case suggestions, Calendar/desktop app prompts | "Get started with templates" |

**[Observed]**

#### Segmentation UX
Single question with 3 large visual cards: Work, Personal, School. Answer shapes templates, starter workflows, and default workspace layout. No multi-select. No follow-up questions on role or team size. **[Observed]**

#### Empty State Design
Workspace arrives pre-populated with an onboarding checklist and template suggestions. AI can generate a functional starter page. No true "blank canvas" — the closest is an empty page within the structured workspace. **[Observed]**

#### Activation Prompt
Onboarding checklist tracks completion with visible progress. Items include "Create a page," "Import data," "Try Notion AI." Checklist persists past initial activation. **[Observed]**

#### Notable Patterns
- Intent-based filtering happens *before* the user sees the product
- AI-generated starter page shifts user from "builder" to "editor" — reacting rather than creating
- Post-activation scaffolding continues beyond first value moment (templates, guides)
- Workspace naming creates psychological ownership

#### Anti-Patterns Observed
- Calendar, desktop app, and meeting integration prompts appear before full activation — retention features surfaced too early **[Observed]**
- Unlimited template variety can create decision paralysis for exploratory users **[Inferred]**

---

### 2. Figma

**Sources**: [Supademo teardown](https://supademo.com/user-flow-examples/figma), [UserOnboard](https://www.useronboard.com/how-figma-onboards-new-users/), [Page Flows](https://pageflows.com/screens/6f301104-6ece-4e25-a000-868d45042abc/)

**Activation event**: First real layout designed inside a Figma file
**Time-to-value**: ~30 minutes

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Sign-up** | Single-column centered | Email field, Google SSO, Apple SSO | "Sign up for free" |
| 2 | **Email verification** | Single-column centered | Verification code entry | "Check your email" |
| 3 | **Profile setup** | Single-column centered | Name field, account type selection | "Tell us about yourself" |
| 4 | **Feature tour** | Full-page overlay on product | Step-by-step guided tour of canvas tools, layers panel, properties panel | Tool-specific labels and brief descriptions |
| 5 | **Workspace with example files** | Full product UI, file browser | Pre-loaded "Figma Basics" and "FigJam Basics" files, "Create new" button, template gallery | File names visible in workspace |
| 6 | **Blank canvas (with scaffolding)** | Full product UI, canvas | Toolbar, layers panel, properties panel, available templates panel | Standard tool labels |
| 7 | **AI layout generation** (optional) | Full product UI, chat panel | Text prompt input, live layout preview on canvas | "Describe your design" |

**[Observed]**

#### Segmentation UX
Minimal — no "what's your job?" question. The product treats all users as capable designers learning a professional tool. **[Observed]**

#### Empty State Design
Blank canvas is the default starting point, but surrounded by scaffolding: pre-loaded interactive example files with real layers/components/constraints, feature tour, and template gallery. Example files are unlocked and fully editable — not a simplified training mode. **[Observed]**

#### Activation Prompt
Feature tour maps the tool environment (canvas, layers, properties). No checklist. The pre-loaded example files are the primary activation vehicle — learning by manipulating real design artifacts. **[Observed]**

#### Notable Patterns
- Doesn't simplify the tool — contextualizes its complexity
- Pre-loaded example files replace external documentation
- Feature tour is load-bearing (skipping it costs more time than taking it)
- Collaboration features appear after solo activation, not before

#### Anti-Patterns Observed
- 30-minute time-to-value is long by PLG standards — high dropout risk for non-designers **[Observed]**
- Example files must be discovered; they don't auto-open **[Inferred]**
- AI output is inspirational, not production-ready — momentum shifts to manual work **[Observed]**

---

### 3. Slack

**Sources**: [UserGuiding teardown](https://userguiding.com/blog/slack-user-onboarding-teardown), [UserOnboard](https://www.useronboard.com/how-slack-onboards-new-users/), [UX Planet](https://uxplanet.org/3-subtle-ways-slack-have-created-an-effortless-onboarding-flow-ac42f069baea), [Userpilot](https://userpilot.com/blog/slack-onboarding/)

**Activation event**: Sending and receiving messages in a workspace with teammates
**Time-to-value**: ~5–10 minutes

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Homepage CTA** | Full marketing page | Primary CTA button, Google SSO, Apple SSO | "Made for people. Built for productivity." / "Get Started Free" |
| 2 | **Email entry** | Single-column centered, minimal | Email field, "Continue" button | "Enter your work email" |
| 3 | **Verification** | Single-column centered | 6-digit code entry field | "Check your email for a code" |
| 4 | **Welcome screen** | Single-column with illustration | Slack UI icons, playful illustration, single CTA | "Welcome to Slack!" |
| 5 | **Workspace creation** | Single-column centered | Company/team name field | "What's the name of your company or team?" |
| 6 | **Channel creation** | Single-column with preview | Text field, real-time sidebar preview showing channel being added | "What's your team working on right now?" |
| 7 | **Teammate invites** | Single-column centered | Email invite fields (3 slots), "Skip this step" link | "Who else is on your team?" |
| 8 | **Product UI with Slackbot** | Full product UI, channel view | Slackbot welcome message, channel list, message compose box, tooltips | Slackbot: "Hello! I'm here to help you get started" |

**[Observed]**

#### Segmentation UX
No explicit role/job question. Workspace creation question ("What's your team working on right now?") doubles as channel naming and implicitly segments by use case. Slack uses email domain detection to connect users with existing workspaces. **[Observed]**

#### Empty State Design
Empty channels are filled with Slackbot messages, helpful tips, and contextual tooltips. Every blank space becomes a knowledge hub — instructional content appears where user content will eventually live. **[Observed]**

#### Activation Prompt
Slackbot delivers a conversational onboarding inside the product (message-based). Tooltips guide attention to key UI elements. No formal checklist — the chat interface IS the onboarding. **[Observed]**

#### Notable Patterns
- Personalization questions build interface components in real-time (channel name → visible in sidebar preview)
- "Lazy sign-up" via Google SSO reduces friction to near-zero
- Slackbot interaction mirrors the product's core use case (messaging)
- Empty states are never truly empty — always instructional

#### Anti-Patterns Observed
- Teammate invitation step before the workspace has value can feel premature **[Inferred]**
- Heavy dependency on team adoption — solo user activation is weak **[Observed]**

---

### 4. Linear

**Sources**: [Supademo teardown](https://supademo.com/user-flow-examples/linear), [Candu teardown](https://www.candu.ai/blog/linear-onboarding-teardown)

**Activation event**: First issue completed and resolved
**Time-to-value**: ~60 seconds to first issue creation

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Welcome** | Full-page centered, minimal | Logo, "Continue" button | "Welcome to Linear" |
| 2 | **Theme selection** | Full-page centered, 2-option | Light mode / Dark mode visual toggle | "Choose your theme" |
| 3 | **Team name** | Single-column centered | Single text field | "Name your workspace" |
| 4 | **Import** | Single-column centered | Three options: GitHub, Jira, "I'll do this later" | "Import your existing issues" |
| 5 | **Teammate invites** | Single-column centered | Email field, "Skip for now" link | "Invite your team" |
| 6 | **Notifications** | Single-column centered | Slack integration, email toggle, skip option | "Set up notifications" |
| 7 | **Command menu tutorial** | Product UI overlay | Cmd+K demonstration, animated highlight | "Press ⌘K to open the command menu" |
| 8 | **Workspace with checklist** | Full product UI | Pre-populated demo data, "Get familiar with Linear" checklist, issue list | Checklist: "Create an issue," "Use the command menu," "Set a priority" |
| 9 | **First issue creation** | Full product UI, inline | Cursor blinking in issue title field, labels/priority/status fields | Placeholder: "Issue title" |

**[Observed]**

#### Segmentation UX
None. No role selection, no permissions setup, no workflow configuration. Linear deliberately omits segmentation — the product is opinionated about who it's for. **[Observed]**

#### Empty State Design
Pre-populated demo data models the ideal state: clearly named projects ("Mobile App," "API"), issues scoped to hours, 2-week cycle rhythm. Demo data serves as behavioral training — users learn by seeing the ideal, not reading about it. Each empty state has: subtle animation, single explanation, one action button. **[Observed]**

#### Activation Prompt
Task-driven checklist: "Create an issue," "Use the command menu," "Set a priority." Each task surfaces a product feature in context. No product tour, no tooltips, no modals — learning through doing. **[Observed]**

#### Notable Patterns
- Command menu (Cmd+K) introduced as the *primary* interaction model before any content exists — signals who the product is for
- Theme selection is the first personalization moment — product configures for user, not vice versa
- Domain auto-join turns individual signup into team adoption
- 7 screens, ~60 seconds. Jira: 15+ screens with department dropdowns and approval workflows
- The welcome email is delayed and contains only 3 links: Linear Method, Guide, Changelog

#### Anti-Patterns Observed
- Workspace URL pre-filled with auto-generated slug rather than user's domain **[Observed]**
- Users who skip optional steps may miss integration framing entirely **[Inferred]**

---

### 5. Canva

**Sources**: [UserOnboard](https://www.useronboard.com/how-canva-onboards-new-users/), [UX Collective](https://uxdesign.cc/onboarding-personalisation-lessons-from-canva-b65e83f06cae), [GoodUX/Appcues](https://goodux.appcues.com/blog/canvas-user-tailored-onboarding-flow), [UserTesting](https://www.usertesting.com/blog/canva-case-study)

**Activation event**: First design created (even using a template)
**Time-to-value**: ~3–5 minutes

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Sign-up** | Single-column centered | Google SSO, Facebook SSO, email option | "Sign up for free" |
| 2 | **Segment selection** | Full-page, multi-card grid | 6–8 cards: Teacher, Student, Personal, Small Business, Large Company, Non-profit, etc. | "What will you be using Canva for?" |
| 3 | **Role/particulars** | Single-column | Dropdown or cards for specific role within segment | Varies by segment: "What kind of teacher?" / "What's your role?" |
| 4 | **Confirmation** | Single-column with animation | Success animation, transition to dashboard | "You're all set!" |
| 5 | **Homepage/Dashboard** | Full product UI, template-first | Template grid organized by use case, "Create a design" button, search bar, category tabs | "What will you design today?" |
| 6 | **Template browser** | Full product UI, gallery | Filtered templates matching segment, drag-and-drop preview | Category-specific template names |
| 7 | **Editor** | Full product UI, canvas | Drag-and-drop canvas, element panels, contextual tooltips | Tooltips on first interaction with each tool |

**[Observed]**

#### Segmentation UX
Two-step segmentation: first "What will you be using Canva for?" (6–8 role cards), then a follow-up on specific role within that segment. Results personalize template recommendations and dashboard layout. **[Observed]**

#### Empty State Design
No true empty state — the dashboard is a template-first gallery. Users never face a blank canvas without context. Templates are organized by their declared segment. The "Create a design" button leads to canvas sizes appropriate for the user's use case. **[Observed]**

#### Activation Prompt
Contextual tooltips appear on first interaction with each editor tool. Interactive challenges build creative confidence. Template selection IS the activation path — creating something from a template is the first value moment. **[Observed]**

#### Notable Patterns
- Template-first dashboard means value is visible before any action is taken
- Segmentation directly shapes the template gallery — users see relevant designs immediately
- Addresses emotional barriers: research found users felt intimidated by design tools, so onboarding builds creative confidence through small wins
- Drag-and-drop functionality surfaces immediately — no learning curve gatekeeping

#### Anti-Patterns Observed
- No explicit progress tracking or checklist — users may not know what to try next after first design **[Inferred]**
- Template overwhelm possible with hundreds of options visible at once **[Inferred]**

---

### 6. Miro

**Sources**: [SaaSFrame](https://saasframe.io/examples/miro-sign-up-flow-6), [SaaSBoarding](https://blog.saasboarding.com/p/miros-onboarding-the-complete-flow), [Kate Syuma interview](https://www.elliottpoppel.com/p/kate-syuma)

**Activation event**: First board created with meaningful content
**Time-to-value**: ~5–10 minutes

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Sign-up** | Single-column centered | Google SSO, Slack SSO, email field | "Sign up free" |
| 2 | **Email verification** | Single-column centered | Code entry | "Verify your email" |
| 3 | **Name & role** | Single-column centered | Name field, role dropdown | "What's your name?" / "What's your role?" |
| 4 | **Use case selection** | Multi-card selector | Cards for primary use cases: brainstorming, project planning, diagramming, workshops, etc. | "What brings you to Miro?" |
| 5 | **Team size** | Single-column, buttons | Size brackets (Just me, 2-5, 6-20, 21-50, 50+) | "How many people will use Miro?" |
| 6 | **Teammate invites** | Single-column | Email fields, skip option | "Invite teammates" |
| 7 | **Board with templates** | Full product UI | Template gallery overlaying empty board, category filters | "Start with a template" |

**[Inferred — 7-screen flow confirmed by SaaSFrame, exact copy approximate]**

#### Segmentation UX
Multi-step: role dropdown, then use-case card selection, then team size. Data shapes template recommendations and feature emphasis. **[Inferred]**

#### Empty State Design
Empty board overlaid with template gallery — the empty state IS the template selector. Board tools visible but secondary to template choice. **[Inferred]**

#### Notable Patterns
- Kate Syuma's "six steps of holistic user onboarding" framework drove activation improvements
- Focus on compressing time-to-value from days to minutes
- Template gallery overlay on empty board means the first thing users see is possibilities, not blankness

#### Anti-Patterns Observed
- Welcome email is generic — doesn't leverage job title or use case data from signup **[Observed]**
- Email verification as first step after signup creates friction before value **[Observed]**

---

### 7. Loom

**Sources**: [Supademo/Medium teardown](https://medium.com/@thiago.hcarv/product-teardown-loom-444a10641329), [Grow & Tell](https://dock.us/grow-and-tell/inside-looms-redesigned-onboarding-process), [Onboard Me](https://substack.com/home/post/p-152597826)

**Activation event**: First video recorded and shared
**Time-to-value**: ~2 minutes (for users who arrived via a shared Loom)

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Shared video page** (pre-signup) | Full-page video player | Video player, "Record a Loom" CTA (bottom left), "Get Loom Free" CTA (top right) | "Record a Loom — for free" |
| 2 | **Sign-up** | Single-column centered | Google SSO, email field | "Sign up for free" |
| 3 | **Browser extension install** | Single-column with illustration | Chrome/browser extension install prompt, demo animation | "Add Loom to Chrome" |
| 4 | **Workspace setup** | Single-column centered | Workspace name field, team/personal toggle | "Set up your workspace" |
| 5 | **Recording interface** | Full-page overlay on screen | "Start Recording" button (dominant), camera toggle, screen/cam selection, recording mode | "Start Recording" |
| 6 | **Post-recording** | Full-page with video preview | Shareable link (auto-generated), title field, share options | "Your Loom is ready!" / Link auto-copied |

**[Observed for video page and recording interface; Inferred for mid-flow screens]**

#### Segmentation UX
No explicit role/job question in the primary flow. The product's viral loop means most users arrive already knowing what Loom does (from watching a colleague's video). **[Observed]**

#### Empty State Design
The recording interface IS the empty state — and it has one dominant action: "Start Recording." No content library to browse, no dashboard clutter. **[Observed]**

#### Activation Prompt
"Start Recording" button with zero competing actions. Unambiguous CTA is the entire activation strategy. Post-recording, the shareable link is auto-generated. **[Observed]**

#### Notable Patterns
- Users experience value BEFORE signup (watching someone else's Loom)
- Viral loop: each video is a product demo for the viewer
- Videos default to 1.2x playback speed — addresses "I'm too busy" objection
- Instant shareable link eliminates export/download friction
- Recording interface has minimal chrome — the product disappears during use

#### Anti-Patterns Observed
- Browser extension install creates a friction step between signup and first recording **[Observed]**
- Team/workspace setup feels premature for individual first-time recorders **[Inferred]**

---

### 8. Airtable

**Sources**: [Supademo teardown](https://supademo.com/user-flow-examples/airtable), [Candu teardown](https://www.candu.ai/blog/airtable-vibecoding-onboarding), [Candu wizard analysis](https://www.candu.ai/blog/airtables-best-wizard-onboarding-flow)

**Activation event**: First AI-generated workspace built and ready to use
**Time-to-value**: Fast — within onboarding session

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Sign-up** | Single-column centered | Google SSO button, email option | "Sign up for free" |
| 2 | **Omni AI chat — company** | Two-panel (chat left, product right) | Conversational AI interface, single question at a time | "Where do you work?" |
| 3 | **Omni AI chat — industry** | Two-panel | Progressive disclosure question | "What industry?" |
| 4 | **Omni AI chat — team** | Two-panel | Progressive disclosure question | "What team are you on?" |
| 5 | **Dashboard with curated prompt** | Full product UI, personalized | Personalized workspace suggestion using company name + team, "Build it" button, template alternatives below | "For the marketing team at [Company], I suggest starting with..." |
| 6 | **AI build confirmation** | Two-panel (chat left, live preview right) | Clarifying questions, "Build it" confirmation | Clarifying questions specific to use case |
| 7 | **Live AI workspace generation** | Full product UI, real-time | Sections populating live (campaign manager, database views), progress animation | Sections appear and populate in real-time |
| 8 | **Completed workspace** | Full product UI | Functional workspace with tables, views, and data structure ready to use | 14-day trial timer visible |

**[Observed]**

#### Segmentation UX
Conversational AI chat (Omni) collects firmographic data one question at a time — feels like a chat conversation, not a form. Data is immediately used to personalize the workspace suggestion. **[Observed]**

#### Empty State Design
No empty state exists in the new flow. The AI generates a functional workspace before the user reaches the product. If users skip AI, template alternatives provide structured starting points below the curated suggestion. **[Observed]**

#### Activation Prompt
The curated prompt IS the activation: "For the marketing team at [Company], I suggest starting with [specific workspace]." One click on "Build it" triggers the AI build. The live build-out makes the product demonstrate its own capability. **[Observed]**

#### Notable Patterns
- Conversational data collection (progressive disclosure through chat) vs. traditional forms
- Curated prompt uses the user's own company name and team — proves the product was "listening"
- Real-time AI build-out is a live product demo during onboarding
- 2025 shift from wizard-based to AI-native ("vibecoding") onboarding
- Templates serve as structured fallback for users who don't want AI path

#### Anti-Patterns Observed
- 14-day trial timer visible from first login creates commercial pressure before full activation **[Observed]**
- Clarifying questions between "Build it" and workspace creation add steps **[Observed]**
- AI-first path may feel overly directive for exploratory users **[Inferred]**

---

### 9. Webflow

**Sources**: [Memberstack guide](https://www.memberstack.com/blog/high-converting-multi-step-onboarding-flows-with-webflow), [Flowout](https://www.flowout.com/blog/designing-onboarding-experience-with-webflow), [SaaSUI](https://www.saasui.design/pattern/onboarding/vercel)

**Activation event**: First site published or first meaningful design edit
**Time-to-value**: ~15–30 minutes

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Sign-up** | Single-column centered | Google SSO, email/password fields | "Get started — it's free" |
| 2 | **Role/skill level** | Single-column with cards | Cards for role: Designer, Developer, Marketer, Founder, Student, Other | "What best describes you?" |
| 3 | **Use case** | Single-column with cards | Cards: Portfolio, Business site, Blog, Landing page, Ecommerce, Client project | "What are you building?" |
| 4 | **Experience level** | Single-column | Buttons: New to Webflow, Some experience, Expert | "How familiar are you with Webflow?" |
| 5 | **Dashboard** | Full product UI | Template gallery, "Blank site" option, project list | "Start a new project" |
| 6 | **Template browser / Blank canvas** | Full product UI, designer | Visual editor with canvas, elements panel, style panel, Webflow University link | Tool-specific labels |

**[Inferred — based on practitioner reports and Webflow patterns; exact copy approximate]**

#### Segmentation UX
Three-step segmentation: role, use case, experience level. Shapes template recommendations and potentially tutorial depth. **[Inferred]**

#### Notable Patterns
- Multi-step segmentation is more granular than most competitors
- Template gallery serves as the bridge between signup and building
- Webflow University link embedded in empty states

#### Anti-Patterns Observed
- Complex visual editor has a steep learning curve not fully addressed by onboarding alone **[Inferred]**
- Limited specific teardown evidence available for 2024-2025 flow **[Uncertain]**

---

### 10. Vercel

**Sources**: [Page Flows](https://pageflows.com/post/desktop-web/onboarding/vercel/), [SaaSUI](https://www.saasui.design/pattern/onboarding/vercel), [Vercel docs](https://vercel.com/docs/getting-started-with-vercel/import)

**Activation event**: First project deployed
**Time-to-value**: ~5–10 minutes (for users with existing repos)

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Homepage** | Marketing page | "Start Deploying" CTA, framework logos | "Develop. Preview. Ship." |
| 2 | **Sign-up** | Single-column centered | GitHub SSO, GitLab SSO, Bitbucket SSO, email | "Sign Up" |
| 3 | **Email verification** | Single-column centered | Verification code / email check | "Verify your email" |
| 4 | **Plan selection** | Single-column with comparison | Hobby (free) vs Pro vs Enterprise cards | "Choose your plan" |
| 5 | **Import project** | Two-panel (repo list + config) | Git provider connection, repository list, "Import" buttons | "Import your existing project" |
| 6 | **Project configuration** | Single-column with form | Framework auto-detection, project name, root directory, environment variables, build settings | "Configure Project" |
| 7 | **Deploy** | Full-page with progress | Build log streaming, deployment progress bar | "Deploying..." |
| 8 | **Deploy success** | Full-page celebration | Live preview URL, "Visit" button, "Go to Dashboard" | "Congratulations! Your project is now live" |
| 9 | **Dashboard** | Full product UI | Project list, deployment history, domains, analytics | Project name with deployment status |

**[Observed — 25 screens total in Page Flows teardown from Nov 2023]**

#### Segmentation UX
No explicit role question. Git provider selection and framework auto-detection implicitly segment users. Plan selection (Hobby/Pro/Enterprise) is the primary segmentation mechanism. **[Observed]**

#### Empty State Design
Import project screen doubles as the empty state — you're either importing or starting from a template. The deployment experience IS the onboarding — seeing your code go live is the value moment. **[Observed]**

#### Activation Prompt
"Import" button on repository list is the primary CTA. Framework auto-detection reduces configuration decisions. The deploy progress screen with live build logs maintains engagement during the wait. **[Observed]**

#### Notable Patterns
- Developer-centric: Git provider SSO means users authenticate with their code hosting platform
- Framework auto-detection eliminates a common configuration hurdle
- Build log streaming during deployment is both informational and engagement-sustaining
- The celebration screen ("Congratulations!") with live URL is a strong dopamine hit
- Entire flow is oriented around a single action: get your code live

#### Anti-Patterns Observed
- 25 screens is high for a developer tool — but many are necessary configuration steps **[Observed]**
- Users without existing repos face a cold start problem **[Inferred]**

---

## LANE 2: B2C Subscription First-Session Flows

---

### 1. Duolingo

**Sources**: [UserGuiding teardown](https://userguiding.com/blog/duolingo-onboarding-ux), [The UXologist](https://www.theuxologist.com/psychology-case-study/habit-forming-within-onboarding), [ReallyGoodUX](https://www.reallygoodux.io/blog/duolingo-user-onboarding), [UX Collective](https://uxdesign.cc/duolingos-onboarding-2-years-on-3cbccad139f7), [Reteno gallery](https://gallery.reteno.com/flows/web-screens-duolingo)

**First value moment**: Completing first lesson
**Paywall timing**: After value delivery (freemium model; premium upsells appear after engagement)

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Welcome** | Full-page, mascot-forward | Duo the owl mascot, "Get Started" button | "The free, fun, and effective way to learn a language!" |
| 2 | **Language selection** | Full-page, scrollable list | Language flags with names, search | "I want to learn..." |
| 3 | **Referral source** | Single-column, radio buttons | Options: TikTok, YouTube, TV, Friends, School, Other | "How did you hear about Duolingo?" |
| 4 | **Experience level** | Single-column, 3-4 buttons | "I'm new," "I know some basics," "I'm intermediate," "I'm advanced" | "How much [language] do you know?" |
| 5 | **Motivation** | Single-column, card selector | Cards: Travel, Culture, Career, School, Brain training, Other | "Why are you learning [language]?" |
| 6 | **Daily goal** | Single-column, slider/options | 5 min/day (casual), 10 min (regular), 15 min (serious), 20 min (intense) | "What's your daily learning goal?" |
| 7 | **First lesson** (before signup!) | Full product UI, gamified | Interactive language exercises, progress bar, hearts, XP counter | Lesson-specific content |
| 8 | **Signup prompt** | Modal/full-page | "Create a profile to save progress," Google SSO, Apple SSO, email | "Create a free account" |
| 9 | **Profile creation** | Single-column | Name, age, email/password | "Save your progress" |
| 10 | **Push notification opt-in** | System dialog with pre-prompt | iOS permission dialog, custom pre-prompt frame | "Duo wants to remind you to practice!" |
| 11 | **Dashboard** | Full product UI | Skill tree / learning path, streak counter, daily goal progress, leaderboard | XP and streak prominently displayed |

**[Observed]**

#### Personalization Questionnaire
5 questions before first lesson: language, referral source, experience level, motivation, daily goal. Format: large buttons/cards, single-select, one question per screen. ~90 seconds total. **[Observed]**

#### Paywall Timing
Freemium model — core lessons are free. Premium upsells (Super Duolingo) appear after users have formed a habit. Ads and heart limits create friction that premium removes. In 2024-2025, Duolingo has been more aggressive with premium promotion: moving the free Practice Hub to a less visible menu, promoting paid Video Calls on the home screen. Subscriptions now represent 85% of revenue. **[Observed]**

#### First-Value Acceleration
Users complete an actual lesson BEFORE creating an account. The lesson uses gamification (XP, progress bar, sound effects) to create dopamine hits immediately. This is the signature move: value before commitment. **[Observed]**

#### Habit Hooks
- Streak counter (visible from day 1, loss aversion kicks in quickly)
- Daily goal with progress ring
- Push notifications (Duo mascot reminders — famously persistent)
- Leaderboards and XP competition
- Streak freeze and streak repair purchases
- Foot-in-the-door technique: small daily commitment → increasing engagement **[Observed]**

#### Push Notification Opt-in
Appears AFTER first lesson completion, using a pre-prompt screen before the iOS system dialog. Has been criticized for appearing too early — before users fully understand the product's value. Notifications include motivational messages with funny captions. **[Observed]**

#### Visual Style
Illustration-heavy, playful, character-driven. Duo the owl mascot is central to the brand. Bright green, bold colors, rounded shapes. Animations throughout (celebrations, character reactions). Gamification visual language: XP counters, progress bars, hearts, leaderboards. **[Observed]**

#### Notable Patterns
- Value-before-signup is the defining pattern — lesson happens before account creation
- Gamification is structural, not decorative (XP, streaks, leaderboards)
- Progressive commitment: small daily goal → streak → competition → premium
- Platform differences: iOS gets features first, Android months later, web limited

#### Anti-Patterns Observed
- Notification permission requested before deep product understanding **[Observed]**
- 2024-2025 premium push feels increasingly aggressive — moving free features to less visible locations **[Observed]**
- Long onboarding (10+ screens) could cause dropout, mitigated by lesson-before-signup **[Observed]**

---

### 2. Headspace

**Sources**: [GoodUX/Appcues teardown](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence), [ReallyGoodUX](https://www.reallygoodux.io/blog/headspaces-mindful-onboarding-sequence), [Page Flows](https://pageflows.com/post/ios/onboarding/headspace/), [App Fuel](https://theappfuel.com/examples/headspace_onboarding), [Sub Club podcast](https://subclub.com/episode/how-headspace-optimized-revenue-by-gating-content-shreya-oswal-and-keya-patel-headspace)

**First value moment**: First guided breathing exercise or meditation
**Paywall timing**: After goal selection, before first full session (aggressive gating tested in 2024)

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Welcome carousel** | Full-page, swipeable slides | Character illustrations, app USP descriptions | "Your guide to health and happiness" |
| 2 | **Experience level** | Single-column, 3 buttons | Beginner, Some experience, Regular practitioner | "Have you meditated before?" |
| 3 | **Session length** | Single-column, 3 buttons | 3 minutes, 5 minutes, 10 minutes | "How long would you like to meditate?" |
| 4 | **Goal selection** | Single-column, multi-select cards | Sleep, Stress, Focus, Anxiety, Self-improvement (multi-select allowed) | "What brought you to Headspace?" |
| 5 | **Routine anchoring** | Single-column, time-based options | Morning routine, Lunch break, Evening wind-down, Before bed | "When would you like to meditate?" |
| 6 | **Summary** | Single-column with recap | Selected preferences summarized, "Start" CTA | "Here's your plan" / "Let's begin" |
| 7 | **Account creation** | Single-column | Email, password, Google SSO, Apple SSO | "Create your account" |
| 8 | **Paywall / Free trial** | Full-page with pricing | Annual plan, monthly plan, 7-day free trial toggle | "Start your free trial" |
| 9 | **Personalized home** | Full product UI | Recommended content based on goals, daily meditation prompt, sleep stories | "Today's meditation" |
| 10 | **First session** | Full-page, minimal | Audio player, timer, background animation | Guided meditation audio |

**[Observed]**

#### Personalization Questionnaire
4 questions, ~1 minute total: experience level, session length, goals (multi-select), routine timing. Questions anchored to existing routines rather than arbitrary times. The shift to allowing multi-select on goals increased free trial conversion by 10%. **[Observed]**

#### Paywall Timing
Aggressive. Headspace experimented with gating 100% of content behind a free trial. Product leaders stated this "can result in a significant lift in paid users" and found that early commitment via free trial boosts engagement vs. free users. Paywall appears after goal selection but before the first substantive session. **[Observed]**

#### First-Value Acceleration
Breathing exercise as a "loading screen" during onboarding — users experience immediate stress relief before any setup. This is value delivery disguised as a wait state. **[Observed]**

#### Habit Hooks
- Daily positive quotes notification (opt-in)
- Meditation routine reminders tied to selected time
- Streak tracking
- Progressive course structure (sessions build on each other)
- Celebrity content (Matthew McConaughey sleep stories) as engagement driver **[Observed]**

#### Push Notification Opt-in
Two types offered: daily positive quotes AND meditation routine reminders. Framed around the user's chosen schedule, making the ask feel supportive rather than intrusive. **[Observed]**

#### Visual Style
Illustration-heavy, playful, character-driven. Whimsical custom illustrations and animations. Warm color palette. Design deliberately makes meditation feel approachable and non-intimidating. Not photographic — entirely illustrated world. **[Observed]**

#### Notable Patterns
- Breathing exercise as loading screen is the standout UX innovation — immediate value
- Routine anchoring to existing habits (not just "set a time") leverages habit-stacking
- Multi-select goals increased conversion — forcing single-choice was losing users
- Design addresses the "meditation is hard/serious" objection through whimsy

#### Anti-Patterns Observed
- Early paywall gate (before first session) creates a pay-before-value dynamic **[Observed]**
- 100% content gating tested in 2024 may push away users who need to experience value first **[Observed]**

---

### 3. Noom

**Sources**: [Reteno gallery](https://gallery.reteno.com/flows/app-screens-noom), [Mobbin](https://mobbin.com/explore/flows/c1404418-d156-4add-9abe-6b0b94d72628), [ScreensDesign](https://screensdesign.com/showcase/noom-weight-loss-food-tracker), [PrettySweet](https://prettysweet.com/noom-quiz/)

**First value moment**: Personalized weight loss plan with projected timeline
**Paywall timing**: After 77-step quiz and personalized plan presentation

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Welcome** | Full-page with progress bar | Logo, "Take the quiz" CTA | "Take the 90-second quiz" |
| 2–12 | **Assessment quiz** (10–12 core questions) | Single-column, one question per screen | Height/weight inputs, goal weight slider, gender cards, age input, diet habit selectors, motivation cards, health risk checkboxes | "What's your goal weight?" / "Why do you want to lose weight?" |
| 13–30 | **Psychological assessment** | Single-column with sliders and cards | Eating trigger identification, stress pattern questions, diet history, behavioral sliders | "When you eat more than planned, it's usually because..." |
| 31–50 | **Educational content** | Single-column with illustrations | Mini-lessons about behavior change, food categorization system (red/yellow/green), coaching preview | "Food isn't good or bad — it's about caloric density" |
| 51–70 | **Values clarification** | Single-column, interactive | Goal exploration exercises, lifestyle preference inputs | "What matters most to you about your health?" |
| 71–75 | **Personalized plan reveal** | Full-page with animation | Dynamic goal timeline, projected weight loss dates, personalized program summary | "Based on your answers, here's your personalized plan" |
| 76 | **Paywall** | Full-page with pricing | 7-day free trial, 2-month plan, 15-minute countdown timer, weekly price breakdown | "Start your free trial — $X/week" |
| 77 | **Payment** | Single-column | Payment form, Apple Pay, credit card fields | "Complete your purchase" |

**[Observed — 77 steps confirmed by ScreensDesign]**

#### Personalization Questionnaire
The longest in this study: 77 steps total, including ~10 biometric questions, ~15 psychological/behavioral questions, ~20 educational micro-lessons, and ~10 values/goals clarification exercises. Format: one question per screen, large touch targets, progress bar visible throughout. Behavioral sliders encourage genuine self-reflection. **[Observed]**

#### Paywall Timing
After the ENTIRE 77-step quiz and personalized plan reveal. The investment of time creates sunk-cost pressure. The plan includes projected weight loss dates personalized to user's data, making it feel like "your plan" is ready and waiting. 15-minute countdown timer adds urgency. Price shown as weekly cost to reduce sticker shock. **[Observed]**

#### First-Value Acceleration
The personalized plan WITH projected dates IS the first value moment. Users see "You can reach [goal weight] by [date]" — this transforms a quiz into a planning session. Educational mini-lessons throughout the quiz also deliver value during what would otherwise be data collection. **[Observed]**

#### Habit Hooks
- Daily articles and micro-lessons
- Food logging with color-coded system (red/yellow/green)
- AI coaching + optional human coach escalation
- Goal tracking against projected timeline
- Community features **[Observed]**

#### Push Notification Opt-in
Appears after plan presentation, framed as "coaching reminders." **[Inferred]**

#### Visual Style
Clean, clinical but warm. Not playful — the design communicates science and credibility. Charts and projections. Progress bars throughout the quiz reinforce investment. **[Observed]**

#### Notable Patterns
- The quiz IS the product demo — educational content embedded in assessment
- Sunk-cost escalation: by the time users reach the paywall, they've invested 10+ minutes
- Personalized projected dates are the strongest conversion mechanism
- Psychology-first approach differentiates from pure calorie-counting apps
- "90-second quiz" framing vs. actual 77-step experience — deliberate under-promising

#### Anti-Patterns Observed
- 77 steps is an extreme commitment before any in-app value delivery **[Observed]**
- "90-second quiz" copy is misleading — actual completion time is 10–15 minutes **[Observed]**
- 15-minute countdown timer on paywall is a pressure tactic that may erode trust **[Observed]**

---

### 4. Calm

**Sources**: [GoodUX/Appcues teardown](https://goodux.appcues.com/blog/calm-app-new-user-experience), [Reteno gallery](https://gallery.reteno.com/flows/app-screens-calm), [Page Flows](https://pageflows.com/post/ios/onboarding/calm/)

**First value moment**: First breathing exercise (during onboarding)
**Paywall timing**: After goal selection, before full content access

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Breathing exercise** | Full-page, animated | Expanding/contracting circle animation, "breathe in/breathe out" text | "Take a deep breath" |
| 2 | **Goal selection** | Single-column, multi-select | Cards: Reduce stress, Sleep better, Improve focus, Build self-esteem, Reduce anxiety, Increase happiness | "What brings you to Calm?" |
| 3 | **Account creation** | Single-column | Apple SSO, Google SSO, email/password | "Create your account" |
| 4 | **Paywall / Free trial** | Full-page with pricing | $69.99/year, 7-day free trial, "Subscribe" button | "Start your 7-day free trial" |
| 5 | **Experience level** | Single-column, 3 buttons | Beginner, Some experience, Experienced | "How comfortable are you with meditation?" |
| 6 | **Personalized home** | Full product UI with tooltips | Recommended sessions based on goals, Daily Calm featured, categories | "Good morning — here's what we suggest" |
| 7 | **Meditation section** | Full product UI with tooltip | Guided meditation cards, series, timer | Tooltip: "Start here" |
| 8 | **Sleep section** | Full product UI with tooltip | Sleep stories, soundscapes, Matthew McConaughey story featured | Tooltip: "Check out sleep stories" |
| 9 | **First guided session** | Full-page, minimal | Audio player, timer, nature background animation | Guided meditation audio |

**[Observed]**

#### Personalization Questionnaire
2 questions: goal selection (multi-select, 6 options) and experience level. Minimal — the app lets content discovery do the personalization work after initial setup. **[Observed]**

#### Paywall Timing
Appears AFTER goal selection but BEFORE first full content access. Users have only experienced the breathing exercise as value at this point. $69.99/year with 7-day free trial is the primary offer. This is the confirmed biggest drop-off point. **[Observed]**

#### First-Value Acceleration
Breathing exercise on the very first screen — before any questions, before account creation, before payment. This is instant value delivery disguised as an app loading state. The exercise is the fastest time-to-value of any app in this study. **[Observed]**

#### Habit Hooks
- Daily Calm (new session every day)
- Streak tracking
- Progressive difficulty (beginner → intermediate → advanced)
- Celebrity sleep stories as engagement hooks
- Nature sounds and scenes as ambient use **[Observed]**

#### Push Notification Opt-in
Positioned after initial setup, framed as daily reminders for meditation practice. **[Inferred]**

#### Visual Style
Photography + nature-heavy. Calming blue and dark tones. Atmospheric backgrounds (mountains, water, night sky). Minimal illustration — photographic and ambient. Animations are slow and smooth (breathing circle, water ripples). Heavily branded around "nature as calm." **[Observed]**

#### Notable Patterns
- Breathing exercise first screen is the gold standard for "value before anything"
- Tooltips on each section prevent overwhelm — direction equals calmness
- Celebrity content (McConaughey) as premium engagement driver
- Nature-photography visual identity differentiates from Headspace's illustration style

#### Anti-Patterns Observed
- Paywall before first full session means users pay before experiencing core value **[Observed]**
- $69.99/year is a high price to commit to after only a breathing exercise **[Observed]**

---

### 5. Peloton

**Sources**: [Built In teardown](https://builtin.com/articles/user-onboarding-process-peloton), [Page Flows](https://pageflows.com/post/ios/onboarding/peloton/), [Mobbin](https://mobbin.com/explore/screens/5dc9a49c-c40d-4750-a03a-bd5a0452ba7d), [Dev Community](https://dev.to/paywallpro/fitness-app-onboarding-guide-data-motivation-completion-an0)

**First value moment**: First workout completed
**Paywall timing**: Free trial offer (30-day for App One/App+) before content access

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Splash screen** | Full-page, branded | Logo, tagline | Peloton brand |
| 2 | **Introduction slides** | Full-page, swipeable carousel | 2–3 slides showing app capabilities | Feature highlights |
| 3 | **Sign-up** | Single-column | Apple SSO, Google SSO, email option | "Get Started" (not "Start trial") |
| 4 | **Password creation** | Single-column | Password field with requirements | "Create your password" |
| 5 | **Username** | Single-column | Username field | "Choose a username" |
| 6 | **Location** | Single-column | Location input | "Where are you located?" |
| 7 | **Profile photo** | Single-column | Photo upload, skip option | "Add a profile photo" |
| 8 | **Interest selection** | Multi-select grid | Workout type cards: Cycling, Running, Strength, Yoga, Meditation, HIIT, Stretching | "What draws you to fitness?" |
| 9 | **Motivation question** | Single-select | Cards: Weight loss, Strength, Mental health, Competition, General fitness | Motivation-specific routing |
| 10 | **Notifications opt-in** | System dialog with pre-prompt | Permission request | "Stay on track with reminders" |
| 11 | **Health data permission** | System dialog | HealthKit/Health Connect integration | "Connect your health data" |
| 12 | **Free trial offer** | Full-page with pricing | 30-day free trial, plan comparison | "Get Started" (deliberate non-transactional language) |
| 13 | **Trial confirmation** | Single-column | Confirmation message, trial dates | "Your trial has started" |
| 14 | **Personalized recommendations** | Full product UI | Workout recommendations matching interests and motivation | "Recommended for you" |

**[Observed for structure; exact copy approximate]**

#### Personalization Questionnaire
2 key questions: interest selection (multi-select workout types) and motivation (single-select). Motivation routes the entire content experience — competition-motivated users see leaderboards, mental-health users see meditation content. **[Observed]**

#### Paywall Timing
Free trial offer (30 days) appears after profile setup and interest selection but before workout access. Critical copy finding: changing "Start 14-day trial" to "Get Started" significantly improved conversion. Less transactional language reduces drop-off. **[Observed]**

#### First-Value Acceleration
After trial activation, personalized workout recommendations appear immediately based on interest and motivation selections. Getting users to complete the first workout is identified as the critical line between lapsed and active users. **[Observed]**

#### Habit Hooks
- Achievement/milestone system
- Leaderboards (for competition-motivated users)
- Streak tracking
- Scheduled classes creating appointment-based engagement
- Social features (following, high-fives)
- Equipment integration (bike/tread data) **[Observed]**

#### Push Notification Opt-in
During onboarding, after interest selection. Framed as workout reminders. **[Observed]**

#### Visual Style
Photo-heavy, high-energy. Dark backgrounds with bright accent colors. Professional photography of instructors and workouts. Premium, aspirational aesthetic. Video previews of classes. **[Observed]**

#### Notable Patterns
- Branching paths accommodate different user types (buyer, gift recipient, secondhand)
- CTA copy optimization ("Get Started" vs "Start Trial") had measurable conversion impact
- Motivation-based content routing is sophisticated — not just interest matching
- 30-day trial is generous compared to 7-day standard

#### Anti-Patterns Observed
- 14 screens is a long onboarding for a fitness app — potential dropout **[Observed]**
- Profile photo step adds friction without adding value **[Inferred]**

---

### 6. HelloFresh

**Sources**: [Mobbin](https://mobbin.com/explore/flows/ef1760f9-73b0-4e12-bb86-8533d52ae48f), [Baymard Institute](http://baymard.com/ux-benchmark/case-studies/hellofresh), [HelloFresh app](https://www.hellofresh.com/app)

**First value moment**: First meal box selected and customized
**Paywall timing**: Immediate (payment required for first box, but with heavy discount)

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Landing / Welcome** | Full-page with hero image | Food photography, discount offer, "Get Started" CTA | "Get up to $X off your first box" |
| 2 | **Plan selection** | Single-column with cards | Plan options: Meat & Veggies, Veggie, Family, Quick & Easy, Pescatarian | "Choose your plan" |
| 3 | **Servings & frequency** | Single-column with selectors | Number of people (2, 4), meals per week (3, 4, 5) | "How many people? How many meals?" |
| 4 | **Account creation** | Single-column | Email, password, social SSO | "Create your account" |
| 5 | **Delivery address** | Single-column form | Address fields, delivery day selection | "Where should we deliver?" |
| 6 | **Payment** | Single-column form | Credit card, Apple Pay, PayPal | "Add payment method" |
| 7 | **Meal preferences** | Multi-select grid | Dietary preference tags: No pork, No beef, No fish, Spicy, etc. | "Any preferences we should know about?" |
| 8 | **This week's menu** | Full product UI, meal grid | Meal cards with photos, descriptions, cooking times, "Add" buttons | "Pick your meals for this week" |
| 9 | **Order confirmation** | Single-column with summary | Order summary, delivery date, meal list | "Your first box is on its way!" |

**[Inferred — based on Mobbin flow structure and app documentation; exact copy approximate]**

#### Personalization Questionnaire
3 questions woven into plan selection: plan type (dietary style), household size, meals per week. Then dietary preference tags as post-payment customization. This is commerce-oriented personalization, not interest exploration. **[Inferred]**

#### Paywall Timing
Payment is required before meal selection. The discount offer ("$X off your first box") and the "cancel anytime" messaging reduce friction. Unlike other B2C apps, there's no free trial — the first box IS the trial, just heavily discounted. **[Inferred]**

#### First-Value Acceleration
Meal selection screen with appetizing photography is designed to create anticipation and ownership. Seeing your specific meals for the week makes the subscription feel real. Physical product arrival is the true first value moment. **[Inferred]**

#### Habit Hooks
- Weekly meal selection deadline creates recurring engagement
- New menu items weekly
- Recipe collection / favorites
- Easy customization and swap functionality
- Skip week flexibility reduces cancellation pressure **[Inferred]**

#### Visual Style
Food photography-heavy. Clean, white backgrounds. Appetizing meal images as the primary visual element. Warm, inviting color palette. Minimal illustration — photography does the selling. **[Inferred]**

#### Notable Patterns
- Commerce-first onboarding: payment before full product access is standard for physical goods
- Heavy discounting on first box reduces barrier to entry
- Plan selection IS segmentation — dietary preferences shape the entire product experience
- Physical delivery creates forced engagement (you have to cook the meals)

#### Anti-Patterns Observed
- Payment before any product experience is high-friction for uncertain users **[Inferred]**
- Cancellation process uses dark patterns (retention maze) — not part of onboarding but affects brand trust **[Observed]**

---

### 7. Spotify

**Sources**: [Medium deep-dive](https://medium.com/@smarthvasdev/deep-dive-into-spotifys-user-onboarding-experience-f2eefb8619d6), [Medium PM analysis](https://medium.com/@TheAhmadkabir/how-spotify-onboards-new-users-and-what-id-improve-as-a-pm-c05b4eb318df), [Page Flows](https://pageflows.com/post/desktop-web/onboarding/spotify/), [Mobbin](https://mobbin.com/explore/flows/2ca9968b-a50d-4910-89e7-e894023d7d21)

**First value moment**: First personalized playlist playing
**Paywall timing**: Freemium — free tier with ads, Premium upsells throughout

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Welcome** | Full-page, dark theme | Logo, value prop, "Sign up free" and "Log in" buttons | "Millions of songs. Free on Spotify." |
| 2 | **Sign-up method** | Single-column | Google SSO, phone number, email options | "Sign up to start listening" |
| 3 | **Email & password** | Single-column form | Email field, password field, "Next" button | (Standard form fields) |
| 4 | **Personal info** | Single-column form | Name, date of birth (required for age verification), gender with "Prefer not to say" option | "Tell us about yourself" |
| 5 | **Terms acceptance** | Single-column | Terms & conditions, marketing opt-in toggles | "Agree & continue" |
| 6 | **Artist selection** | Full-page grid | Artist tiles with photos, multi-select, "Choose 3 or more" prompt, genre filter | "Choose artists you like" |
| 7 | **Podcast selection** | Full-page grid | Podcast cover art tiles, multi-select | "Choose podcasts you enjoy" |
| 8 | **Home feed** | Full product UI | Personalized playlists, "Made for You" section, recently played, browse categories | "Made for [Name]" |

**[Observed for structure; Inferred for exact 2024 copy]**

#### Personalization Questionnaire
2 preference screens: artist selection (choose 3+ from visual grid) and podcast selection. Plus demographic data (DOB, gender) collected during signup for content personalization and age verification. No explicit "what do you use music for?" question. **[Observed]**

#### Paywall Timing
Freemium model — never behind a paywall for basic use. Free tier includes ads and shuffle-only on mobile. Premium upsells appear contextually: after ad breaks, when users try premium features (offline, skip limits). No hard paywall in onboarding. **[Observed]**

#### First-Value Acceleration
Artist/podcast selection immediately generates personalized playlists visible on the home feed. Music starts playing within minutes of account creation. The "Made for You" section proves the personalization is working from session one. **[Observed]**

#### Habit Hooks
- Discover Weekly (new playlist every Monday)
- Daily Mix playlists
- Year-in-review (Wrapped)
- Social sharing of listening activity
- Offline downloads (premium only — creates lock-in)
- Algorithmic recommendations that improve with use **[Observed]**

#### Push Notification Opt-in
Not prominent in onboarding flow — appears later, often after first session or next day. Framed around new music and playlist updates. **[Inferred]**

#### Visual Style
Dark theme dominant. Bold, vibrant accent colors (green brand color). Album art and artist photography. Minimal UI chrome — content-forward. Not illustration-heavy — photographic and typography-driven. **[Observed]**

#### Notable Patterns
- Freemium eliminates paywall friction entirely from onboarding
- Artist/podcast visual grid makes preference selection feel like browsing, not form-filling
- "Millions of songs. Free on Spotify." — one of the most effective value props in B2C
- Music playing within minutes is the fastest path to value in entertainment
- DOB collection serves both personalization and compliance (age verification)

#### Anti-Patterns Observed
- No "skip for now" option on signup — must commit to create account **[Observed]**
- Gender field feels unnecessary for music recommendations **[Inferred]**

---

### 8. Netflix

**Sources**: [UX Planet](https://uxplanet.org/netflix-review-of-the-first-time-user-experience-84271bacba9e), [Page Flows](https://pageflows.com/post/desktop-web/onboarding/netflix/), [UserOnboard](http://www.useronboard.com/how-netflix-onboards-new-users/), [NextLeap teardown](https://assets.nextleap.app/submissions/NetflixNewUserOnboarding-f251aeb5-8e65-4276-9a63-8c3c13412f3b.pdf)

**First value moment**: First show/movie streaming
**Paywall timing**: Before content access (subscription required)

#### Screen Sequence

| # | Screen | Layout | Components | Key Copy |
|---|--------|--------|------------|----------|
| 1 | **Landing page** | Full-page hero with background | Value prop text, FAQ section, single email field, "Get Started" button | "Unlimited movies, TV shows, and more." / "Watch anywhere. Cancel anytime." |
| 2 | **Email entry** | Single-column centered | Email field (may be pre-filled from landing), "Next" button | "Create a password to start your membership" |
| 3 | **Password creation** | Single-column | Password field | "Create your password" |
| 4 | **Plan selection** | Single-column with comparison cards | Premium (pre-selected), Standard, Standard with Ads — feature comparison | "Choose the plan that's right for you" |
| 5 | **Payment** | Single-column | Credit card, PayPal, gift code | "Set up your payment" |
| 6 | **Profile creation** | Single-column | Profile name, optional avatar selection from Netflix character icons, parental controls toggle | "Who's watching?" |
| 7 | **Language selection** | Single-column | 50+ language options | "Select your language" |
| 8 | **Genre preferences** | Full-page grid | Genre tiles with like/dislike/neutral rating (3-choice system) | "What do you like to watch?" |
| 9 | **Show/movie selection** | Full-page grid | Show/movie posters, multi-select | "Select a few shows you enjoy" |
| 10 | **Home feed** | Full product UI | Personalized content rows, "Because you liked..." sections, auto-playing trailers | Category rows with personalized selections |

**[Observed]**

#### Personalization Questionnaire
3 steps post-payment: profile creation (with avatar), genre preference (3-choice: like/dislike/neutral), and show/movie selection. Simplified 3-choice system on genres ensures higher completion rates vs. extensive rating systems. **[Observed]**

#### Paywall Timing
Before ANY content access. Payment required before streaming. Premium plan pre-selected by default (anchor pricing). Free trial was removed globally in 2020. The "cancel anytime" messaging and content previews on the landing page partially offset the pay-first barrier. **[Observed]**

#### First-Value Acceleration
Genre and show preferences immediately generate personalized rows on the home feed. Auto-playing trailers reduce the decision friction of "what to watch." Content is available instantly after payment — no waiting period. **[Observed]**

#### Habit Hooks
- Autoplay next episode
- "Continue Watching" row (most prominent position)
- New release notifications
- Profile-based recommendations (family members can't corrupt your algorithm)
- Download for offline viewing
- Weekly new content drops **[Observed]**

#### Push Notification Opt-in
Not in onboarding flow. Email notifications for new releases are default-on. Push notifications appear on mobile after first session. **[Inferred]**

#### Visual Style
Dark theme, cinematic. Content imagery dominates — movie posters and show stills. Red brand accents (CTAs). Minimal UI — the content IS the interface. Auto-playing video backgrounds. Premium, theatrical aesthetic. **[Observed]**

#### Notable Patterns
- Landing page is extremely minimal — one value prop, one CTA, FAQ for objection handling
- Premium plan pre-selected nudges toward higher revenue per user
- No social login options — forces owned account creation for billing control
- Profile system enables multi-user households (retention mechanism)
- 3-choice genre rating (like/dislike/neutral) vs. 5-star systems — simpler, higher completion

#### Anti-Patterns Observed
- No free trial or content preview before payment — high-friction for uncertain users **[Observed]**
- Pricing not visible on landing page — discovered at step 4 **[Observed]**
- Pre-selecting Premium plan may feel manipulative **[Inferred]**

---

## CROSS-CUTTING SYNTHESIS

### Common Patterns Across SaaS Self-Serve (6+ companies do the same)

| Pattern | Companies | Confidence |
|---------|-----------|------------|
| **Google SSO as primary signup** | All 10 | **[Observed]** |
| **Segmentation before product access** | Notion, Canva, Slack, Miro, Airtable, Webflow (6/10) | **[Observed]** |
| **Template/pre-built content as first touchpoint** | Notion, Figma, Canva, Miro, Airtable, Webflow (6/10) | **[Observed]** |
| **Skip option on teammate invites** | Notion, Linear, Slack, Miro, Loom (5/10) | **[Observed]** |
| **Single-column centered layout for signup** | All 10 | **[Observed]** |
| **Empty states filled with instructional content** | Notion, Figma, Slack, Linear, Canva, Airtable (6/10) | **[Observed]** |
| **Workspace/project naming step** | Notion, Slack, Linear, Miro, Loom (5/10) | **[Observed]** |
| **No credit card during onboarding** | All 10 (freemium or free trial without payment) | **[Observed]** |

### Common Patterns Across B2C Subscription (5+ companies do the same)

| Pattern | Companies | Confidence |
|---------|-----------|------------|
| **Goal/motivation question early in flow** | Duolingo, Headspace, Calm, Noom, Peloton (5/8) | **[Observed]** |
| **Multi-select on preference screens** | Duolingo, Headspace, Calm, Peloton, Spotify, Netflix (6/8) | **[Observed]** |
| **Free trial with time limit** | Headspace, Calm, Noom, Peloton, HelloFresh (5/8) | **[Observed]** |
| **Personalized content/plan as first value** | All 8 | **[Observed]** |
| **Push notification opt-in during onboarding** | Duolingo, Headspace, Calm, Peloton (4/8) | **[Observed]** |
| **Photo/illustration-heavy visual design** | All 8 | **[Observed]** |
| **One question per screen** | Duolingo, Headspace, Noom, Calm, Peloton (5/8) | **[Observed]** |
| **Experience/skill level question** | Duolingo, Headspace, Calm, Peloton (4/8) | **[Observed]** |

### Key Differences Between SaaS and B2C Approaches

| Dimension | SaaS Self-Serve | B2C Subscription |
|-----------|-----------------|-------------------|
| **Segmentation purpose** | Shape workspace/templates | Shape content recommendations |
| **Paywall timing** | No paywall (freemium) or delayed | Early (after personalization, before full value) |
| **First value type** | User creates something | User consumes something |
| **Empty state strategy** | Fill with scaffolding/templates | Don't show empty — lead to content immediately |
| **Onboarding length** | 5–9 screens (median 7) | 8–77 screens (median 10–12) |
| **Personalization depth** | 1–3 questions (role, use case) | 3–10+ questions (goals, habits, biometrics) |
| **Account creation timing** | Required first (SSO reduces friction) | Often delayed until after value delivery |
| **Team dynamics** | Teammate invites in flow | Individual-only |
| **Habit formation** | Built into product use (workspace stickiness) | Explicitly designed (streaks, reminders, gamification) |
| **Activation metric** | Create/complete a work artifact | Consume content or complete an exercise |
| **Visual style** | Clean, minimal, professional | Emotive, photography/illustration-heavy |

### Copy Patterns

#### Recurring Headline Structures

**SaaS:**
- Value proposition as tagline: "Made for people. Built for productivity." (Slack), "Develop. Preview. Ship." (Vercel)
- Direct question: "How are you planning to use Notion?" "What brings you to Miro?"
- Imperative + benefit: "Start Recording" (Loom), "Create a design" (Canva)

**B2C:**
- Superlative claim: "Millions of songs. Free on Spotify." "Unlimited movies, TV shows, and more." (Netflix)
- Emotional/aspirational: "The free, fun, and effective way to learn a language!" (Duolingo), "Your guide to health and happiness" (Headspace)
- Personal question: "What brings you to Calm?" "Why are you learning [language]?"

#### CTA Language

| CTA Pattern | Examples | Frequency |
|-------------|----------|-----------|
| **"Get Started"** | Peloton, Netflix, Webflow | Most common SaaS + B2C |
| **"Sign up free"** | Slack, Canva, Miro, Figma | SaaS standard |
| **"Start your free trial"** | Headspace, Calm, Noom | B2C subscription standard |
| **Action-specific** | "Start Recording" (Loom), "Build it" (Airtable), "Deploy" (Vercel) | High-performing SaaS |
| **Non-transactional** | "Get Started" replacing "Start trial" (Peloton) | Tested improvement |
| **"Continue"** | Linear, Notion, Spotify | Progress-oriented |

#### Microcopy Patterns

- **Skip language**: "I'll do this later" (Linear), "Skip this step" (Slack), "Skip for now" — always present on non-essential steps
- **Social proof embedded**: User counts, company logos rarely appear in onboarding itself — they're on marketing pages, not inside the flow
- **Progress indicators**: B2C apps almost universally use progress bars; SaaS rarely does (except Noom with 77 steps)
- **Reassurance copy**: "Cancel anytime" (Netflix, HelloFresh), "No credit card required" (SaaS standard), "Free forever" (various)

---

## Research Gaps

| Gap | Impact | Recommended Follow-up |
|-----|--------|----------------------|
| Webflow's actual 2024-2025 onboarding screens not documented in teardowns | Medium — reduces SaaS sample detail | Direct product walkthrough or Mobbin/Page Flows access |
| Miro's exact screen copy and segmentation question wording | Low — structure is confirmed | Direct product walkthrough |
| HelloFresh's detailed screen-level onboarding UX | Medium — physical product onboarding is distinct category | Mobbin paid access or direct walkthrough |
| 2025-2026 updates to all flows | High — SaaS onboarding evolves rapidly with AI integration | Re-research on 6-month cycle |
| Conversion rate data for each flow | High — would validate which patterns actually work | Proprietary; requires case studies or benchmark reports |
| A/B test results beyond Peloton and Headspace | High — most patterns are observed but not causally validated | Industry benchmark reports (Mixpanel, Amplitude) |

---

## Source List

1. [Supademo — Notion Onboarding Teardown](https://supademo.com/user-flow-examples/notion) — Tier 2
2. [Candu — How Notion Crafts Personalized Onboarding](https://www.candu.ai/blog/how-notion-crafts-a-personalized-onboarding-experience-6-lessons-to-guide-new-users) — Tier 2
3. [Supademo — Figma Onboarding Teardown](https://supademo.com/user-flow-examples/figma) — Tier 2
4. [UserOnboard — How Figma Onboards New Users](https://www.useronboard.com/how-figma-onboards-new-users/) — Tier 2
5. [UserGuiding — Slack Onboarding Teardown](https://userguiding.com/blog/slack-user-onboarding-teardown) — Tier 2
6. [UX Planet — Slack Onboarding Flow](https://uxplanet.org/3-subtle-ways-slack-have-created-an-effortless-onboarding-flow-ac42f069baea) — Tier 2
7. [Userpilot — Slack Onboarding](https://userpilot.com/blog/slack-onboarding/) — Tier 2
8. [Supademo — Linear Onboarding Teardown](https://supademo.com/user-flow-examples/linear) — Tier 2
9. [Candu — Linear Anti-Onboarding Teardown](https://www.candu.ai/blog/linear-onboarding-teardown) — Tier 2
10. [UserOnboard — How Canva Onboards New Users](https://www.useronboard.com/how-canva-onboards-new-users/) — Tier 2
11. [GoodUX/Appcues — Canva Onboarding](https://goodux.appcues.com/blog/canvas-user-tailored-onboarding-flow) — Tier 2
12. [UserTesting — Canva Case Study](https://www.usertesting.com/blog/canva-case-study) — Tier 1
13. [SaaSFrame — Miro Sign-Up Flow](https://saasframe.io/examples/miro-sign-up-flow-6) — Tier 2
14. [SaaSBoarding — Miro Onboarding](https://blog.saasboarding.com/p/miros-onboarding-the-complete-flow) — Tier 2
15. [Supademo — Airtable Onboarding Teardown](https://supademo.com/user-flow-examples/airtable) — Tier 2
16. [Candu — Airtable Vibecoding Onboarding](https://www.candu.ai/blog/airtable-vibecoding-onboarding) — Tier 2
17. [Page Flows — Vercel Onboarding](https://pageflows.com/post/desktop-web/onboarding/vercel/) — Tier 2
18. [Medium — Loom Product Teardown](https://medium.com/@thiago.hcarv/product-teardown-loom-444a10641329) — Tier 3
19. [Grow & Tell — Loom Onboarding](https://dock.us/grow-and-tell/inside-looms-redesigned-onboarding-process) — Tier 2
20. [UserGuiding — Duolingo Onboarding](https://userguiding.com/blog/duolingo-onboarding-ux) — Tier 2
21. [The UXologist — Duolingo Habit-Forming](https://www.theuxologist.com/psychology-case-study/habit-forming-within-onboarding) — Tier 2
22. [UX Collective — Duolingo Onboarding Testing](https://uxdesign.cc/duolingos-onboarding-2-years-on-3cbccad139f7) — Tier 2
23. [GoodUX/Appcues — Headspace Onboarding](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence) — Tier 2
24. [Sub Club — Headspace Revenue Optimization](https://subclub.com/episode/how-headspace-optimized-revenue-by-gating-content-shreya-oswal-and-keya-patel-headspace) — Tier 1
25. [ScreensDesign — Noom Teardown](https://screensdesign.com/showcase/noom-weight-loss-food-tracker) — Tier 2
26. [PrettySweet — Noom Quiz](https://prettysweet.com/noom-quiz/) — Tier 3
27. [GoodUX/Appcues — Calm Onboarding](https://goodux.appcues.com/blog/calm-app-new-user-experience) — Tier 2
28. [Built In — Peloton Onboarding](https://builtin.com/articles/user-onboarding-process-peloton) — Tier 1
29. [Page Flows — Spotify Onboarding](https://pageflows.com/post/desktop-web/onboarding/spotify/) — Tier 2
30. [UX Planet — Netflix First-Time UX](https://uxplanet.org/netflix-review-of-the-first-time-user-experience-84271bacba9e) — Tier 2
31. [Mobbin — HelloFresh Onboarding](https://mobbin.com/explore/flows/ef1760f9-73b0-4e12-bb86-8533d52ae48f) — Tier 2
