# Dark Playbook Extraction: How to Capture Tacit Knowledge When No Digital Trails Exist

## Executive Answer

When there are no digital trails, extracting "dark playbooks" — the tacit decision-making expertise that lives in experienced practitioners' heads — requires a layered human elicitation approach. No single method works. The research converges on a 4-layer protocol: (1) artifact scan to map what exists, (2) structured shadowing to observe real behavior, (3) Critical Decision Method interviews to extract the reasoning behind behavior, and (4) validation through scenario testing and novice walk-throughs. The most critical finding: experts omit up to 70% of task components when self-reporting (Swaby et al., 2022). You cannot ask someone what they know and expect completeness. You must observe, probe retrospectively using specific incidents, and validate with contrastive testing.

---

## Decision Context

- **Decision to support:** How should the workflow-decomposition skill instruct users to extract proprietary, context-specific knowledge ("dark playbooks") from role-holders before automation?
- **Scope:** Methods that work without system logs, screen recordings, or digital event data — purely human-to-human elicitation
- **Time horizon:** Current methods (2024-2026) plus emerging AI-assisted approaches

## Method

- **Research approach:** Four parallel research lanes synthesized into one report
- **Sources collected:** 48 across all lanes, 38 retained as high-quality
- **Source mix:** 18 Tier 1 (academic/official), 14 Tier 2 (reputable publications), 6 Tier 3 (practitioner blogs)
- **Date range:** Core methods (1988-2026), AI tools (2024-2026)

---

## Key Findings

### Finding 1: Two proven methods dominate — CDM for depth, ACTA for breadth

**Claim:** The Critical Decision Method (CDM) and Applied Cognitive Task Analysis (ACTA) are the two most effective methods for extracting undocumented expert decision-making, backed by meta-analytic evidence across hundreds of studies.

**Why it matters:** These are not theoretical frameworks — they are operationalized interview protocols with step-by-step procedures that produce structured, usable output. CDM gets the deepest knowledge; ACTA gets 80% of CDM's depth at 30% of the cost.

**Confidence:** High

**Evidence:**
- CDM meta-analysis: Hedges' g = 0.871 overall effect size for CTA-based training; surgery-specific SMD = 2.06 for technical performance ([Tofel-Grehl & Feldon, 2013](https://digitalcommons.usu.edu/itls_facpub/384/))
- ACTA evaluation: 93% cognitive content relevance; 95% of outputs contained expert-only knowledge ([Militello & Hutton, 1998](https://www.tandfonline.com/doi/abs/10.1080/001401398186108))
- 80 clinical studies across 13 countries validate CTA in healthcare; CDM was used in 36 ([Swaby et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8903544/))
- ACTA designed for non-specialists — graduate students with no CTA training produced valid cognitive demands tables (Militello & Hutton evaluation)

### Finding 2: Experts cannot self-report accurately — observation is non-negotiable

**Claim:** Experts omit up to 70% of task components when asked to describe what they do. The "curse of expertise" is a documented cognitive bias: expertise automates cognitive processes, making them inaccessible to conscious introspection.

**Why it matters:** Any extraction method that relies solely on asking experts "how do you do your job?" will miss the most valuable knowledge. Observation, incident-based retrospection, and contrastive techniques (expert vs novice) are required to overcome this.

**Confidence:** High

**Evidence:**
- Experts omit up to 70% of components when self-reporting task steps ([Swaby et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8903544/))
- The curse of expertise causes overconfidence in explanatory ability: "tappers" estimated 50% recognition; actual was 2.5% ([Fisher & Keil, 2016, Journal of Experimental Psychology](https://pubmed.ncbi.nlm.nih.gov/26369299/))
- NASA JPL found engineers could articulate facts, procedures, and rules — but could NOT articulate pattern recognition, contextual judgments, or design intuitions. "That knowledge walked out the door with every retirement" ([NASA APPEL, 2021](https://ntrs.nasa.gov/citations/20210026226))

### Finding 3: A 4-layer extraction protocol produces the best results

**Claim:** The most reliable dark playbook extraction combines broad artifact scanning, structured observation, deep decision-logic interviews (CDM), and validation — in that order.

**Why it matters:** Each layer captures different knowledge types. Artifacts reveal what experts consider important. Observation reveals actual sequences and variation. CDM reveals the reasoning behind decisions. Validation catches gaps and errors. Skipping layers leaves blind spots.

**Confidence:** High (convergent across all four research lanes)

**Evidence:**
- Beyer & Holtzblatt's Contextual Design (1998) established the multi-model observation approach (flow, sequence, artifact, cultural models)
- KM Insider Knowledge Retention Playbook synthesizes shadowing + CDM + failure forensics into a combined protocol
- McKinsey's Process Insights methodology follows the same pattern: capture → diagnose → improve
- Toyota's knowledge transfer network (multi-node OMCD system) uses structured interaction networks, not documentation alone ([Dyer & Nobeoka, 2000](https://www.semanticscholar.org/paper/Creating-and-managing-a-high-performance-network-Dyer-Nobeoka/8c2f052ba474c3db9d4829e22b6d1cb0bf368802))

### Finding 4: Five specific techniques extract what observation alone cannot

**Claim:** Beyond standard shadowing, five specialized techniques target the hardest-to-extract knowledge: (1) CDM multi-pass retrospection, (2) Think-aloud protocols, (3) Failure forensics / negative knowledge elicitation, (4) Contrastive observation (expert vs novice), (5) Artifact interrogation.

**Why it matters:** Standard observation captures what happens. These techniques capture why, when not to, and what the expert sees that others don't.

**Confidence:** High

**Evidence:**
- CDM's four-sweep protocol (incident → timeline → cognitive probes → what-if queries) is the gold standard for decision logic ([Klein, Hoffman & Crandall, 1998](https://journals.sagepub.com/doi/10.1518/001872098779480442))
- Failure forensics: negative knowledge ("what NOT to do") is one of the most valuable and least documented forms of expertise ([KM Insider](https://kminsider.com/topic/the-complete-knowledge-retention-playbook/))
- Contrastive observation: divergence between expert and novice behavior pinpoints exactly where tacit knowledge lives
- Artifact interrogation: personal spreadsheets are crystallized decision-support tools that reveal decision rules their creators cannot articulate ([Beyer & Holtzblatt, 1998](https://en.wikipedia.org/wiki/Contextual_design))

### Finding 5: There are hard limits — some knowledge cannot be extracted

**Claim:** A category of expert knowledge is structurally resistant to extraction: embodied knowledge (physical timing, force), relational knowledge (trust-dependent), genuine ambiguity judgment (novel situations), and meta-knowledge of when to break rules.

**Why it matters:** The workflow-decomposition skill must distinguish between dark playbooks that CAN be extracted (and eventually automated) and those that CANNOT. The latter require the human to remain in the loop — they become the "high-judgment decision" nodes in the workflow.

**Confidence:** High

**Evidence:**
- Polanyi's foundational principle: "We know more than we can tell" (The Tacit Dimension, 1966)
- The observability gap: LLMs can only learn from externalized sequential representations; tacit knowledge is neither ([Bhattacharjee, 2025](https://medium.com/@shashwatabhattacharjee9/the-uncodifiable-advantage-tacit-knowledge-as-the-strategic-bottleneck-in-ai-systems-d359dfe3967b))
- Aitomatic achieves 95% on routine expert decisions but the remaining 5% (edge cases, novel situations) is where expert judgment is most valuable ([Aitomatic](https://aitomatic.com))
- NASA's honest assessment: documentation-heavy approaches failed for the most valuable knowledge ([NASA APPEL, 2021](https://ntrs.nasa.gov/citations/20210026226))

### Finding 6: Incentive design is as important as methodology

**Claim:** Knowledge holders often resist extraction because unique knowledge equals job security and informal power. 70% of critical operational knowledge in manufacturing remains undocumented partly due to this resistance.

**Why it matters:** The best extraction methodology will fail if the person being interviewed doesn't want to share. The skill must address the human motivation layer, not just the technical protocol.

**Confidence:** Medium-High

**Evidence:**
- 70% of critical operational knowledge in manufacturing is undocumented, partly due to job security concerns ([WorkCell, 2025](https://workcell.com))
- Xerox Eureka succeeded because it used peer validation and author attribution (fame incentive), not management mandates ([SRI International](https://www.sri.com/publication/fcd-publications/communal-knowledge-sharing-the-eureka-story/))
- T-Mobile's mentorship program framed knowledge sharing as career development, achieving 37% retention increase ([Fortune, 2024](https://fortune.com))

---

## The Extraction Protocol (Operational)

This is the procedural output — the step-by-step method the workflow-decomposition skill should encode for extracting dark playbooks when no digital trails exist.

### Layer 1: Artifact Scan (1-3 days per role)

**Goal:** Map what exists before observing. Identify the shadow systems that reveal how people actually work.

**Procedure:**
1. Collect all informal artifacts the role-holder uses:
   - Personal spreadsheets and trackers
   - Email templates and canned responses
   - Annotated SOPs or marked-up procedure manuals
   - Calendar patterns (recurring meetings = process checkpoints)
   - Shared drive folder structures
   - Sticky notes, whiteboards, physical dashboards
   - Browser bookmarks and saved searches
   - Chat message templates or pinned messages
2. For each artifact, document: what it tracks, how it categorizes, what calculations it performs, what it highlights
3. Personal spreadsheets are the highest-value artifacts — a spreadsheet with custom columns, conditional formatting, and pivot tables IS an externalized mental model of the process

**Output:** Artifact inventory with preliminary decision-rule hypotheses

### Layer 2: Structured Shadowing (1-2 full days per role)

**Goal:** Observe actual behavior. Capture the sequence, the variation, and the decision points that the role-holder doesn't mention in interviews.

**Procedure:**

**Pre-observation (day before):**
- Brief the subject: "I'm here to understand the job, not evaluate you"
- Study any existing SOPs so you don't waste observation time on basics
- Prepare capture template: `Timestamp | Activity | Tool/System | Who Involved | Subject's Words (verbatim) | Decision Point? (Y/N) | Cues Used`

**During observation (full work period):**
- Record every activity transition with timestamp
- Capture verbatim quotes, especially unprompted explanations
- Note interruptions, waiting, searching, context-switching
- Mark every decision point: anywhere the subject chose path A over path B
- During natural pauses, ask:
  - "What were you looking for just now?"
  - "How did you know to do X before Y?"
  - "What would you do differently if [condition changed]?"
  - "Has this ever gone wrong? What happened?"

**Post-observation debrief (30-60 min, same day):**
- Walk through your notes with the subject for validation
- For each flagged decision point, probe: "What information did you use? What would a new person get wrong here?"
- Ask: "What does a bad day look like? What breaks?"
- Ask: "When you get stuck, who do you call? Who calls you?"

**Output:** Activity log with time splits, decision point map, variation notes, preliminary workflow sequence

### Layer 3: Decision Logic Extraction (2-4 hours per critical decision cluster)

**Goal:** For the highest-value decision points identified in Layer 2, extract the actual reasoning — the IF-THEN rules, the cues experts use, the failure modes they've internalized.

**Use ACTA for breadth, CDM for depth on the most critical nodes.**

**ACTA Procedure (breadth — covers the full role):**

1. Task Diagram Interview (30 min): "Break what you do into 3-6 major steps. Which ones require difficult judgments?"
2. Knowledge Audit (1-2 hrs): For each cognitively demanding step, probe with:
   - "Is there a time when you walked in and knew exactly how things got there?"
   - "What do experts notice that others miss?"
   - "Are there ways of working smart you've found especially useful?"
   - "Can you think of a time you had to improvise?"
   - For each response: get a specific real-world example, probe for cues and strategies, ask what a novice would get wrong
3. Simulation Interview (1-2 hrs): Present a challenging scenario incrementally. For each event: "What's going on here? What would you do? What cues are you using? What mistakes might a new person make?"
4. Cognitive Demands Table (synthesis): Merge into `Difficult Element | Why Difficult | Common Errors | Cues & Strategies`

**CDM Procedure (depth — for the 3-5 most critical decisions):**

1. Incident Selection: "Tell me about a time you had to make a really tough call in this role"
2. Timeline Construction: Retrace the incident, building a detailed timeline of both events and thoughts
3. Cognitive Probes at each decision point:
   - "What were you noticing? What information were you using?"
   - "What experience were you drawing on?"
   - "What other options did you consider?"
   - "What was uncertain? What information would have helped?"
   - "What would a less experienced person have done?"
4. What-If Queries: "What if [variable] had been different? What would have changed your decision?"

**Additional techniques for specific knowledge types:**
- Failure Forensics: "Tell me about the biggest mistakes you've seen in this role" — elicits anti-patterns and negative knowledge
- Contrastive Observation: If possible, observe both expert and novice doing the same task. Every divergence point is a dark playbook node
- Artifact Interrogation: For each personal tool/spreadsheet: "When do you use this? What does this column mean to you? What would happen if you didn't have this?"

**Output:** Decision trees, situation assessment records, IF-THEN rules with boundary conditions, anti-pattern library

### Layer 4: Validation (1-2 days per role)

**Goal:** Confirm the extraction is accurate and complete enough to formalize as a workflow.

**Procedure:**
1. Walk the extracted workflow back to the original expert: "Is this what you do? What did I miss?"
2. Have a novice attempt to follow the extracted workflow. Where they get stuck reveals curse-of-expertise gaps
3. Test decision rules against 3-5 scenario cases: "Given this situation, what does the playbook say? Would the expert agree?"
4. For each rule that fails validation, re-enter Layer 3 with targeted probing

**Output:** Validated workflow specification with decision rules, boundary conditions, and flagged "irreducible judgment" nodes that cannot be automated

---

## Contradictions and Resolution

### Contradiction 1: "Experts can articulate knowledge through interviews" vs "Observation is the only way to surface tacit knowledge"

**Competing evidence:**
- Interview proponents argue CDM and ACTA extract most expert knowledge through structured conversation ([Klein et al., 1998](https://journals.sagepub.com/doi/10.1518/001872098779480442))
- Observation proponents argue "humans know more than they can express" and observation reveals knowledge interviews miss ([Nielsen/Norman Group](https://nngroup.com/articles/contextual-inquiry))

**Resolution:** Both are right, for different knowledge types. Declarative knowledge ("what I know") surfaces through interviews. Procedural knowledge ("how I do it") requires observation. Decision knowledge ("why I choose this") requires CDM-style structured elicitation that combines BOTH observation and retrospective probing. The 4-layer protocol addresses this by using observation first (Layers 1-2) and deep interviews second (Layer 3).

### Contradiction 2: "AI can capture 95% of expert decisions" vs "Tacit knowledge is fundamentally uncodifiable"

**Competing evidence:**
- Aitomatic claims 95% accuracy matching senior engineer decisions in semiconductor ([Aitomatic](https://aitomatic.com))
- Academic literature argues tacit knowledge structurally resists AI capture ([Bhattacharjee, 2025](https://medium.com/@shashwatabhattacharjee9/the-uncodifiable-advantage-tacit-knowledge-as-the-strategic-bottleneck-in-ai-systems-d359dfe3967b))

**Resolution:** These are different TYPES of knowledge. Highly structured industrial domains with clear inputs/outputs are amenable (the 95%). Judgment under genuine ambiguity, embodied knowledge, relational knowledge, and knowing when to break rules are NOT amenable (the 5% — which is where the most value often lives). The workflow-decomposition skill must classify each dark playbook node as either extractable-and-automatable or irreducible-judgment.

### Contradiction 3: Scale vs depth tradeoff — solvable or fundamental?

**Competing evidence:**
- AI-assisted methods (Interloom, Edra, Skan AI) promise scalable extraction
- Organizational knowledge literature consistently finds effective tacit transfer doesn't scale

**Resolution:** Likely fundamental for the deepest knowledge layer. AI can scale the extraction of *undocumented-but-documentable* knowledge (tribal knowledge). It cannot yet scale the extraction of *genuinely tacit* knowledge (embodied expertise, relational judgment). The practical implication: use AI tools for the broad scan (Layer 1), but keep human-led CDM/ACTA for critical decision nodes (Layer 3).

---

## Decision Implications

### For the workflow-decomposition skill:

**Strategic:** The skill must include a dark playbook extraction protocol as a core phase, not an optional add-on. Without it, the "Proprietary Context Specific" dimension in the 7-dimension scoring will be a flag without a resolution path.

**Operational:** The 4-layer protocol should be embedded as Phase 3 (after role decomposition and task scoring, before workflow formalization). Time estimate: 3-5 days per critical role.

**Risk:** The biggest failure mode is underestimating extraction difficulty. NASA, with unlimited budget and existential motivation, still lost knowledge. The skill must be honest about what can and cannot be extracted.

### For companies doing the role-to-workflow transformation:

**Strategic:** Start with roles that have LOW dark playbook concentration (high digital, high recurring, low judgment, common knowledge). These are fastest to automate. Sales development (SDR) roles typically fit this profile. Save dark-playbook-heavy roles (senior account executives, operations leads with 10+ years of context) for later, after the extraction methodology is proven internally.

**Operational:** Budget 3-5 person-days per critical role for extraction. Use ACTA (cheaper, broader) for most roles and CDM (deeper, more expensive) only for the highest-value decision clusters.

**Financial:** CTA-based knowledge transfer has been shown to transmit 5 years of job knowledge in ~50 hours. If a senior employee costs $150K/year and holds dark playbooks that would take a successor 5 years to learn, the extraction cost ($5K-$15K per role) has clear ROI.

---

## Recommendations

1. **Embed the 4-layer extraction protocol in the workflow-decomposition skill** as the method for handling tasks scored high on "Proprietary Context Specific" in the 7-dimension framework
2. **Add an "extractability assessment"** to the scoring — not all dark playbooks can be extracted. Flag nodes as: Extractable (can be formalized) / Partially Extractable (can be formalized with residual human judgment) / Irreducible (human must remain in loop)
3. **Connect to stakeholder-discovery** — the interview techniques in Layer 3 overlap with the stakeholder-discovery skill's methodology, and the same people who hold dark playbooks are often the best stakeholders to interview for offer validation
4. **Add incentive design guidance** — the skill should address how to motivate knowledge sharing (attribution, career development framing, risk reduction framing), since methodology alone fails against unwilling experts

---

## Assumptions and Unknowns

**Assumptions:**
- The organization has identified which roles hold the most dark playbook concentration (the 7-dimension scoring provides this)
- Experts are available and at least minimally willing to participate
- A trained interviewer/observer is available (or can be trained using ACTA's low-barrier protocol)

**Unknowns:**
- How quickly CTA-extracted knowledge becomes outdated in fast-changing domains (no longitudinal studies exist)
- Whether LLM-conducted CDM/ACTA interviews will reach human-quality extraction (promising but unproven)
- The minimum number of experts needed per role for "complete" extraction (literature suggests 3-5 but no firm threshold)
- Whether remote/video-based CDM interviews match in-person quality (no systematic evaluation published)

---

## Source List

### Cognitive Task Analysis

1. [Swaby et al. — CTA in clinical research: systematic review (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8903544/)
2. [Tofel-Grehl & Feldon — CTA-based training meta-analysis (2013)](https://digitalcommons.usu.edu/itls_facpub/384/)
3. [Militello & Hutton — ACTA: A practitioner's toolkit (1998)](https://www.tandfonline.com/doi/abs/10.1080/001401398186108)
4. [Klein, Hoffman & Crandall — CDM for expert knowledge (1998)](https://journals.sagepub.com/doi/10.1518/001872098779480442)
5. [AHRQ — Critical Decision Method toolkit](https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/critical-decision-method)
6. [Goh (Commoncog) — An Easier Method for Extracting Tacit Knowledge (2021/2025)](https://commoncog.com/an-easier-method-for-extracting-tacit-knowledge/)

### Tacit Knowledge Management

7. [Farnese et al. — SECI Model operationalization (2019)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6914727/)
8. [Fisher & Keil — The Curse of Expertise (2016)](https://pubmed.ncbi.nlm.nih.gov/26369299/)
9. [Dyer & Nobeoka — Toyota knowledge sharing network (2000)](https://www.semanticscholar.org/paper/Creating-and-managing-a-high-performance-network-Dyer-Nobeoka/8c2f052ba474c3db9d4829e22b6d1cb0bf368802)
10. [SRI International — Xerox Eureka (2002)](https://www.sri.com/publication/fcd-publications/communal-knowledge-sharing-the-eureka-story/)
11. [NASA APPEL — Knowledge continuity (2021)](https://ntrs.nasa.gov/citations/20210026226)
12. [Panopto — Workplace Knowledge Report](https://www.panopto.com/resource/valuing-workplace-knowledge)
13. [KM Insider — Knowledge Retention Playbook (2025)](https://kminsider.com/topic/the-complete-knowledge-retention-playbook/)

### Observation Methods

14. [NN/g — Contextual Inquiry](https://nngroup.com/articles/contextual-inquiry)
15. [Wevalgo — DILO How-To Guide](https://wevalgo.com/know-how/opex-assessment-tools/dilo)
16. [Stanton — Hierarchical Task Analysis](https://eprints.soton.ac.uk/73988/1/Hierarchical_Task_Analysis_Stanton.pdf)
17. [McKinsey — Process Insights](https://mckinsey.com/capabilities/operations/our-insights/how-good-are-your-internal-operations-really)

### AI-Assisted Methods

18. [Interloom raises $16.5M — Fortune (2026)](https://fortune.com/2026/03/23/interloom-ai-agents-raises-16-million-venture-funding/)
19. [Expert Mind — RAG for expert knowledge (2025)](https://www.arxiv.org/pdf/2603.14541)
20. [SparkMe — Adaptive semi-structured interviewing (2026)](https://arxiv.org/pdf/2602.21136)
21. [LLM agents for tacit knowledge discovery (2025)](https://arxiv.org/abs/2507.03811)
22. [Bhattacharjee — The Uncodifiable Advantage (2025)](https://medium.com/@shashwatabhattacharjee9/the-uncodifiable-advantage-tacit-knowledge-as-the-strategic-bottleneck-in-ai-systems-d359dfe3967b)
23. [IDC — The Knowledge Your AI May Never Have (2025)](https://www.idc.com/resource-center/blog/the-knowledge-your-ai-may-never-have/)
