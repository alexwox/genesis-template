# Observation-Based Methods for Extracting Undocumented Workflows

*Research compiled: 2026-04-04*

This report covers methods for extracting workflows and decision logic that exist only in people's heads — the "dark playbooks" referenced in `thoughts/workflow-based-orgs.md`. These are processes with no system logs, no digital trails, and no documentation. The only way to surface them is through direct observation and structured elicitation.

---

## 1. Source Registry

| # | Source | URL | Tier | Date | Domain |
|---|--------|-----|------|------|--------|
| S1 | NN/g — Contextual Inquiry | nngroup.com/articles/contextual-inquiry | 1 | ~2022 | UX Research |
| S2 | Wikipedia — Contextual Inquiry | en.wikipedia.org/wiki/Contextual_inquiry | 2 | Ongoing | Reference |
| S3 | Wevalgo — DILO How-To Guide | wevalgo.com/know-how/opex-assessment-tools/dilo | 2 | ~2023 | OpEx Consulting |
| S4 | MindTools — DILO Analysis | mindtools.com/auinqv7/dilo-day-in-the-life-of-analysis | 2 | ~2023 | Management |
| S5 | KM Insider — Knowledge Retention Playbook | kminsider.com/topic/the-complete-knowledge-retention-playbook | 2 | ~2025 | Knowledge Mgmt |
| S6 | Hoffman, Crandall & Shadbolt — CDM for Expert Knowledge | journals.sagepub.com/doi/10.1518/001872098779480442 | 1 | 1998 | Academic (HF) |
| S7 | IHMC — Protocols for Cognitive Task Analysis | ihmc.us/wp-content/uploads/2025/06/Protocols-for-Cognitive-Task-Analysis.pdf | 1 | ~2008 | Academic (CTA) |
| S8 | Stanton — Hierarchical Task Analysis | eprints.soton.ac.uk/73988/1/Hierarchical_Task_Analysis_Stanton.pdf | 1 | ~2006 | Academic (HF) |
| S9 | IxDF — Hierarchical Task Analysis | interaction-design.org/literature/topics/hierarchical-task-analysis | 2 | Ongoing | Design Education |
| S10 | Beyer & Holtzblatt — Contextual Design | en.wikipedia.org/wiki/Contextual_design | 1 | 1998 | Academic (HCI) |
| S11 | McKinsey — Process Insights | mckinsey.com/capabilities/operations/our-insights/how-good-are-your-internal-operations-really | 1 | ~2023 | Consulting |
| S12 | Umbrex — Lean Operations Diagnostic Guide | umbrex.com/resources/lean-operations-diagnostic-guide | 2 | ~2024 | Consulting |
| S13 | Perez-Castillo et al. — MARBLE Framework (BPA) | alarcos.esi.uclm.es/ALARNET2/FILES/Articulos/2011-Inf%20and%20Soft%20Technology-Perez%20Castillo.pdf | 1 | 2011 | Academic (SE) |
| S14 | MailMiner — Email Process Discovery | www-inf.telecom-sudparis.eu/SIMBAD/tools/MailMiner | 1 | ~2016 | Academic |
| S15 | Skan AI — Observation-Based Process Discovery | skan.ai/blogs/observation-based-process-discovery | 3 | ~2025 | Vendor |
| S16 | Brooks — Consulting Discovery Playbook 2026 | medium.com/@avery.brooks_59610/consulting-discovery-playbook-2026 | 3 | Mar 2026 | Blog |
| S17 | arxiv — InvisibleMentor (Screen Recording Analysis) | arxiv.org/html/2509.26557v1 | 1 | 2025 | Academic (AI) |
| S18 | Lean 6 Sigma Hub — Gemba Walk in Define Phase | lean6sigmahub.com/gemba-walk-during-define-phase | 3 | ~2024 | Lean Practice |
| S19 | IGI Global — Fundaments of BPA | igi-global.com/chapter/fundaments-of-business-process-archeology/96611 | 1 | ~2013 | Academic (SE) |

---

## 2. Methods Ranked: Depth of Extraction vs. Time Investment

The fundamental tradeoff: methods that extract deeper decision logic require more time and skill from the observer. Methods are ordered from highest extraction depth to lowest, with time cost noted.

### Tier A — Deep Extraction (Captures Decision Logic + Tacit Knowledge)

| Method | What It Extracts | Time Cost | Sources |
|--------|------------------|-----------|---------|
| **Cognitive Task Analysis (CTA) / Critical Decision Method** | Expert decision logic, cue recognition, uncertainty handling, mental models, "what-if" reasoning | HIGH (4–8 hrs per expert, multi-pass) | S6, S7 |
| **Contextual Inquiry (Beyer & Holtzblatt)** | Full work practice: flow, sequence, artifacts, culture, physical environment. Tacit workarounds. | HIGH (2 hrs per session + interpretation) | S1, S2, S10 |
| **Participatory Shadowing with Decision Journaling** | Real-time decision rationale, negative knowledge ("what not to do"), failure forensics | HIGH (full days + journaling overhead) | S5 |

### Tier B — Solid Extraction (Captures Steps, Sequences, Waste, Variation)

| Method | What It Extracts | Time Cost | Sources |
|--------|------------------|-----------|---------|
| **DILO (Day In the Life Of)** | Full-day activity breakdown, VA/NVA split, environment issues, quotes, root causes | MEDIUM-HIGH (1 full day per observation + analysis) | S3, S4 |
| **Gemba Walk (Lean Diagnostic)** | Waste categories, bottlenecks, workarounds, normalized inefficiencies | MEDIUM (2–4 hrs per walk) | S11, S12, S18 |
| **Hierarchical Task Analysis (HTA)** | Goal-subgoal decomposition, plan structures, error points, training needs | MEDIUM (iterative, analyst-driven) | S8, S9 |

### Tier C — Surface Extraction (Captures What Happens, Not Why)

| Method | What It Extracts | Time Cost | Sources |
|--------|------------------|-----------|---------|
| **Process Discovery Workshops (As-Is Mapping)** | Consensus process map, handoffs, system interactions, known exceptions | MEDIUM (3–4 hr sessions) | S16 |
| **Process Archaeology (Artifact Analysis)** | Hidden process traces from emails, spreadsheets, legacy systems | VARIABLE (depends on artifact volume) | S13, S14, S19 |
| **Digital Observation / Screen Recording** | Click-level digital workflows, app-switching patterns, copy-paste chains | LOW (automated capture) but shallow on decisions | S15, S17 |

### Key Insight
No single method is sufficient. The most reliable approach combines **Tier C methods for broad coverage** (workshops to get the stated process, artifact analysis for traces) with **Tier A methods for depth** (CTA/CDM on the critical decision nodes identified). This is how you move from "what they do" to "why they do it that way."

---

## 3. Step-by-Step Shadowing / Observation Protocol

Synthesized from DILO (S3), Contextual Inquiry (S1, S10), and Knowledge Retention (S5) best practices.

### Phase 0: Pre-Conditions (Days -7 to -1)

1. **Get organizational permission.** Check with HR, unions, works councils. Observation can be killed mid-flight by employee representatives if not pre-cleared. [S3: "We have seen job observations stopped halfway through by unions."]
2. **Define the extraction objective.** Use this hierarchy:
   - **Level 1:** Qualitative stories and examples (fast, low-cost)
   - **Level 2:** Rough VA/NVA time split
   - **Level 3:** Precise NVA identification + root causes
   - **Level 4:** Statistically representative sample (20+ observations)
3. **Select subjects.** Ideal: average performers who are willing and verbal. Avoid only observing star performers (survivorship bias) or only weak performers (deficit bias). When possible, observe 2–3 people doing the same role to surface variation.
4. **Pre-learn the domain.** Study any existing SOPs, process docs, or system manuals. Visit the physical workspace with a guide. The less you need to ask basic questions during observation, the less you disrupt the subject's natural behavior.
5. **Prepare your capture template.** Columns: `Timestamp | Activity | System/Tool | Who Involved | Subject's Words (verbatim) | Observer Notes | VA/NVA Classification | Decision Point? (Y/N) | Cues Used`

### Phase 1: Briefing the Subject (15 min)

- Introduce yourself and the purpose: "I'm here to understand the job, not evaluate you."
- Explicitly state this is NOT a time-and-motion study, NOT a performance review.
- Ask them to work as normally as possible and narrate when comfortable.
- Agree on ground rules: you may ask clarifying questions during natural pauses; they can ask you to stop at any time.

### Phase 2: Observation (2–8 hours, ideally a full work period)

**Core Rhythm: Observe → Note → Probe (in pauses)**

- Record every activity transition with a timestamp.
- Capture verbatim quotes, especially when the subject explains "why" unprompted.
- Note environmental factors: interruptions, waiting, searching, context-switching.
- Mark every decision point you observe. A decision point is anywhere the subject chose path A over path B. Flag these for Phase 3 probing.
- Don't intervene, correct, or suggest. Don't comment on VA/NVA classifications.
- During natural idle moments (waiting for a system, on hold, walking between locations), ask probing questions:
  - "What were you looking for just now?"
  - "How did you know to do X before Y?"
  - "What would you do differently if [condition changed]?"
  - "Has this ever gone wrong? What happened?"
- Respect breaks. Ask if they want company during coffee/lunch — these are often the richest moments for informal knowledge sharing.

### Phase 3: Post-Observation Debrief (30–60 min, same day)

1. **Timeline walkthrough.** Walk through your notes with the subject. For each major activity block, ask: "Did I capture this right?"
2. **Decision point deep-dive.** For each flagged decision point, use Critical Decision Method probes:
   - "What information did you use to make that call?"
   - "What would a new person get wrong here?"
   - "What's the worst thing that could happen if this goes differently?"
   - "Is there a rule of thumb you're using?"
3. **Exception elicitation.** Ask: "Today seemed [normal/unusual] — what does a bad day look like? What breaks?"
4. **Network mapping.** Ask: "When you get stuck, who do you call? Who calls you?"
5. **Artifact collection.** Photograph or copy any worksheets, checklists, sticky notes, personal spreadsheets, or annotated printouts used during the day. These are physical traces of undocumented process.

### Phase 4: Analysis and Synthesis (1–3 hours per observation)

1. **Clean the observation log.** Fill in gaps while memory is fresh.
2. **Build the Beyer & Holtzblatt work models:**
   - **Flow model:** Who communicated with whom, about what, through which channels?
   - **Sequence model:** What was the exact step-by-step sequence for each major task?
   - **Artifact model:** What documents/tools/spreadsheets were used and how?
   - **Cultural model:** What norms, pressures, or power dynamics shaped behavior?
3. **Classify activities** using the categories from `thoughts/workflow-based-orgs.md`:
   - Internal vs. External responsibility
   - Digital vs. Physical
   - Recurring workflow vs. One-off project
   - High-value vs. Low-value decision
   - Proprietary context-specific vs. Common knowledge
   - High-judgment vs. Low-judgment
4. **Extract decision rules.** For each decision point, write a provisional IF-THEN rule:
   - `IF [cues observed] AND [context condition] THEN [action taken] BECAUSE [rationale given]`
   - Flag confidence: did the subject articulate this clearly, or is this your inference?
5. **Validate with a second observer** if available (inter-rater reliability).

### Phase 5: Cross-Subject Synthesis

When multiple people in the same role have been observed:

1. **Identify the canonical sequence** — the steps everyone does.
2. **Identify variations** — where do people diverge? These often mark the highest-value decision nodes and the most proprietary tacit knowledge.
3. **Map the decision tree** — for each variation, what conditions drive the divergence?
4. **Quantify the time splits** — what percentage of time is spent on each activity category? This directly feeds the ROI model in `thoughts/workflow-based-orgs.md`.

---

## 4. How to Extract Decision Logic (Not Just Steps)

This is the hardest part. Most observation methods capture *sequence* well but miss *reasoning*. Here are five techniques specifically for decision logic extraction, ranked by evidence strength.

### 4.1 Critical Decision Method (CDM) — Evidence: HIGH [S6, S7]

The gold standard. A multi-pass retrospective interview technique developed by Klein, Hoffman, and Crandall for studying naturalistic decision-making.

**Protocol:**
1. **Incident selection.** Ask the expert to recall a challenging or non-routine case.
2. **Free recall.** Let them tell the full story without interruption.
3. **Timeline construction.** Together, build a chronological timeline of events.
4. **Decision point identification.** Mark every point where a judgment was made.
5. **Deepening probes.** For each decision point:
   - "What were you noticing at this moment?"
   - "What options did you consider?"
   - "What information was missing?"
   - "How would a less experienced person have handled this?"
6. **What-if queries.** "If X had been different, would you have done the same thing?"

**Output:** Situation Assessment Records — structured descriptions of the cues, knowledge, goals, and expectancies that drove each decision.

**Key finding:** Experts often cannot articulate their decision logic through direct questions ("How do you decide X?") but can reconstruct it through incident retelling. The CDM works because narrative memory is richer than declarative self-knowledge.

### 4.2 Think-Aloud Protocol — Evidence: HIGH [S7, Wikipedia]

**Protocol:** Ask the subject to verbalize their thoughts continuously while performing a real task. Record everything. Transcribe and code.

**Two variants:**
- **Concurrent:** Subject narrates during work. Richer data but may alter performance.
- **Retrospective:** Subject watches a recording of their work and narrates. Less intrusive but loses some in-the-moment detail.

**Best for:** Digital work where screen recording + retrospective narration can be combined. The subject watches their own screen recording and explains each decision.

### 4.3 Failure Forensics / Negative Knowledge Elicitation — Evidence: MEDIUM [S5]

**Protocol:** After observation, ask: "Tell me about the biggest mistakes you've seen in this role — yours or others'."

**Why it works:** Negative knowledge ("what NOT to do") is one of the most valuable and least documented forms of expertise. Experts carry accumulated scar tissue from decades of failures. They rarely volunteer this proactively because organizations don't create structures for capturing it.

**Output:** A list of anti-patterns, each with: the mistake, the conditions that trigger it, the cue that should have prevented it, and the consequences.

### 4.4 Contrastive Observation — Evidence: MEDIUM [S5, S7]

**Protocol:** Observe both a novice and an expert performing the same task. Document every point where their behavior diverges.

**Why it works:** The divergence points are exactly where tacit expertise lives. The expert's "obvious" actions are invisible to them until contrasted with a novice's different approach.

### 4.5 Artifact Interrogation — Evidence: MEDIUM [S10, S13, S14]

**Protocol:** Collect all informal artifacts the expert uses (personal spreadsheets, annotated checklists, email templates, bookmarked reference pages). For each artifact, ask:
- "When do you use this?"
- "What does this column/field mean to you?"
- "How did this evolve over time?"
- "What would happen if you didn't have this?"

**Why it works:** Artifacts are crystallized decision support tools. A personal spreadsheet with color-coding and conditional formatting reveals the decision rules its creator applies mentally. The structure of the artifact mirrors the structure of the decision process.

---

## 5. How Consultancies Approach Process Discovery

### McKinsey [S11, S12]

McKinsey uses a three-stage "Process Insights" methodology:
1. **Capture:** Record activities from start to finish, increasingly using digital tools and screen capture alongside physical observation.
2. **Diagnose & Analyze:** Use automation and analytics to identify task variations, bottlenecks, and waste. Emphasis on quantification — McKinsey reported field technicians wasting up to 40% of their workday on non-value-adding activities.
3. **Improve:** Derive actionable insights for process reengineering.

Their Lean diagnostic approach emphasizes **Gemba walks** combined with **value-stream mapping** and **structured time studies** to build a fact-based case for change. The diagnostic requires "disciplined preparation including clear objectives, scope definition, the right team composition, a data-collection plan, and stakeholder governance."

### Standard MBB Problem-Solving Framework [S12, S16]

All three firms (McKinsey, Bain, BCG) use a variant of:
1. Define the problem → 2. Structure (MECE issue tree) → 3. Prioritize → 4. Hypothesize → 5. Analyze → 6. Synthesize → 7. Recommend

For process discovery specifically, this means: **hypothesis-led observation**. They don't observe blindly — they form a hypothesis about where value is being lost, then observe to confirm or refute it. This is faster but risks confirmation bias.

### The 30-Day Discovery Playbook [S16]

Modern consulting teams structure discovery into four weeks:
- **Week 1:** Capture operational inputs (interviews, documentation, SME input — increasingly asynchronous)
- **Week 2:** Build the process model (swimlane diagrams, system interactions, handoffs, exception paths)
- **Week 3:** Develop and validate requirements against the model
- **Week 4:** Produce implementation-ready deliverables

Key trend: **asynchronous discovery** — instead of workshops requiring 8-12 people in a room, SMEs contribute structured input on their own schedule. This reduces scheduling bottlenecks and captures more nuance from more people.

---

## 6. Process Archaeology: Reconstructing from Artifacts

When direct observation is impossible (the person left, the process ended, or you need pre-observation context), artifact analysis provides a forensic alternative.

### Email Mining [S14]
The MailMiner approach classifies emails into processes, instances, and activities using machine learning on:
- Email references and reply chains
- Named entities
- Correspondent patterns
- Exchange timing and history

This produces event logs suitable for process mining, reconstructed entirely from email metadata and content.

### Spreadsheet Archaeology [S13, S19]
Personal spreadsheets are the most underappreciated artifact. When someone builds a tracking spreadsheet with custom columns, conditional formatting, and pivot tables, they've externalized their mental model of the process. Reverse-engineering this artifact reveals:
- What data they track (= what they consider important)
- How they categorize it (= their decision framework)
- What calculations they perform (= the logic they apply)
- What they highlight or color-code (= their alert thresholds)

### The MARBLE Framework [S13]
A semi-automated approach to recovering business processes from legacy systems using the Knowledge Discovery Metamodel (KDM). Extracts business rules and process flows from source code and database schemas. Particularly relevant when processes have been partially encoded in software that was never documented.

### Practical Artifact Checklist
When entering an organization, collect:
- [ ] Personal spreadsheets and trackers
- [ ] Email templates and canned responses
- [ ] Calendar patterns (recurring meetings = recurring process checkpoints)
- [ ] Shared drive folder structures (hierarchy reflects process hierarchy)
- [ ] Annotated SOPs or marked-up procedure manuals
- [ ] Sticky notes, whiteboards, physical dashboards
- [ ] Browser bookmarks and saved searches
- [ ] Chat message templates or pinned messages

---

## 7. Contradictions and Open Questions

### Contradiction: Observation Alters Behavior
The Hawthorne effect is the elephant in the room. Every source acknowledges that being observed changes behavior, but they disagree on mitigation:
- **DILO practitioners** [S3] say the effect fades over a full day: "subjects relax as the day progresses."
- **Ethnographers** [S4, academic sources] argue you need weeks of immersion for behavior to normalize.
- **Digital observation** advocates [S15] argue computer vision eliminates the effect entirely.

**Assessment:** The truth depends on what you're extracting. For routine steps, the Hawthorne effect fades quickly. For decision logic under stress or ambiguity, it may persist — people make "safer" or more "by-the-book" decisions when watched. CDM/retrospective methods partially sidestep this by interrogating past incidents rather than live behavior.

### Contradiction: Interviews vs. Observation
- **Interview proponents** argue that experts can articulate most of their knowledge if asked the right questions.
- **Observation proponents** [S1, S5, S15] argue "humans know more than they can express" and only observation reveals tacit knowledge.

**Assessment:** Both are right, for different types of knowledge. Declarative knowledge ("what I know") surfaces through interviews. Procedural knowledge ("how I do it") requires observation. Decision knowledge ("why I choose this") requires CDM-style structured elicitation that combines observation with probing retrospection.

### Open Question: Scaling Observation
Every method here is fundamentally artisanal — one trained observer per subject, one subject at a time. No source provides a convincing answer for how to extract undocumented workflows across an entire organization of hundreds or thousands of roles. Digital observation (screen recording + AI analysis) [S15, S17] is the leading candidate but currently captures only digital workflows, missing physical work, conversations, and the decision logic behind actions.

### Open Question: Observer Skill
All sources implicitly assume a skilled observer/interviewer. The quality of extraction depends enormously on the observer's ability to:
- Notice decision points as they happen
- Ask probing questions without leading
- Distinguish VA from NVA activity in an unfamiliar domain
- Build rapport that encourages candor

No source provides a credible estimate of how much training is required to develop these skills. DILO guides [S3] suggest practice observations, but CTA literature [S6, S7] suggests years of domain familiarity for deep extraction.

### Open Question: When Does Observation Fail?
Observation-based methods are weakest for:
- **Highly cognitive, non-visible work** (strategic planning, creative design, complex analysis) — the "work" happens inside someone's head and produces no observable steps between input and output.
- **Low-frequency, high-stakes decisions** — a CFO's decision to enter a new market may happen once per year. You can't shadow for that.
- **Distributed processes** — when a workflow spans 10 people across 3 time zones, no single observer can see the whole flow. Artifact analysis and process archaeology become necessary complements.

---

## 8. Synthesis: Recommended Approach for Workflow Extraction

Based on the evidence, here is a layered approach for systematically extracting undocumented workflows from an organization:

### Layer 1: Broad Scan (1-2 weeks)
**Method:** Artifact collection + stakeholder interviews + process archaeology
**Goal:** Build a rough inventory of all workflows per role. Identify the "dark playbooks" — the proprietary context-specific decisions that exist only in people's heads. Map which roles have the highest concentration of undocumented process.
**Output:** Role-workflow matrix with automation ROI estimates.

### Layer 2: Structured Observation (2-4 weeks)
**Method:** DILO observations + Gemba walks on priority roles
**Goal:** Capture the actual activity sequence, time splits, VA/NVA breakdown, and variation across people in the same role. Surface all the decision points.
**Output:** Sequence models, flow models, time-allocation breakdown per role category (per `thoughts/workflow-based-orgs.md`).

### Layer 3: Decision Logic Extraction (1-2 weeks per critical workflow)
**Method:** CDM interviews + think-aloud protocols + contrastive observation (expert vs. novice)
**Goal:** For the highest-value decision nodes identified in Layer 2, extract the actual IF-THEN decision rules, cues used, and failure modes.
**Output:** Decision trees, situation assessment records, anti-pattern libraries. These become the playbooks for AI agent workflows.

### Layer 4: Validation and Encoding (ongoing)
**Method:** Walk extracted workflows back to the people observed. Test decision rules against new cases. Encode into executable workflow definitions.
**Goal:** Confirm the extraction is accurate and complete enough to automate.
**Output:** Validated, executable workflow specifications ready for automation.

---

## 9. Key Citations (Quick Reference)

| Citation | What It's Best For |
|----------|-------------------|
| Beyer & Holtzblatt, *Contextual Design* (1998) | The definitive framework for work modeling through observation. Five work models. |
| Klein, Hoffman & Crandall, "Critical Decision Method" (1998) [S6] | Gold standard for extracting expert decision logic from non-routine incidents. |
| Stanton, "Hierarchical Task Analysis" (~2006) [S8] | Decomposing complex tasks into goal-subgoal hierarchies with plans. |
| Polanyi, *The Tacit Dimension* (1966) | Theoretical foundation: "We know more than we can tell." |
| Wevalgo DILO Guide [S3] | Most practical, step-by-step observation protocol for operational roles. |
| McKinsey Process Insights [S11] | How a tier-1 consultancy combines observation with digital analytics. |
| KM Insider Knowledge Retention Playbook [S5] | Best single source on shadowing protocols, decision journaling, failure forensics, and narrative capture. |
| Perez-Castillo et al., MARBLE Framework [S13] | Semi-automated recovery of business processes from legacy system artifacts. |
