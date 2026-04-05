# AI-Assisted Methods for Capturing Tacit/Expert Knowledge

**Research date:** April 4, 2026
**Scope:** Tools, techniques, and approaches (2023–2026) using AI to extract undocumented knowledge from practitioners

---

## 1. Methods Ranked by Maturity and Effectiveness

### Tier 1 — Production-ready, deployed at enterprise scale

| Method | Maturity | Evidence | Key example |
|---|---|---|---|
| **Operational record mining** (emails, tickets, logs → context graphs) | High | Deployed at Commerzbank, VW, Zurich Insurance; measurable gap reduction (50% → 5%) | Interloom |
| **Process mining + task mining** (system logs + desktop activity capture) | High | Multi-billion-dollar market (Celonis, UiPath); captures clicks, app switches, screenshots | Celonis Task Mining, Skan AI |
| **Automated process discovery from IT systems** (zero-setup reverse-engineering of workflows from ticketing/CRM data) | High | ASOS expanded knowledge coverage 30% → 90%; HubSpot deployment | Edra AI |
| **Structured video interviews → machine-readable process maps** | Medium-High | 70% onboarding time reduction at Appen; enterprise-critical workflow discovery for $800M medtech | Sugarwork (now Decidr) |
| **Cognitive ontology for industrial expert knowledge** | Medium-High | 95% accuracy on decisions previously requiring senior engineers; 3-week deployments in semiconductor | Aitomatic |

### Tier 2 — Functional, proven in narrower contexts

| Method | Maturity | Evidence | Key example |
|---|---|---|---|
| **LLM-based expert interviews** (AI conducts structured extraction interviews) | Medium | 94.9% knowledge recall in research; SparkMe shows 4.7% topic coverage improvement over baselines | SparkMe, LLMREI, RaPSIL |
| **Transcript-to-knowledge pipelines** (call recordings → QA pairs → RAG) | Medium | >90% accuracy; autonomously handles ~30% of calls | AI Knowledge Assist (IBM/academic) |
| **Computer vision desktop observation** (screen capture → process maps → agent training) | Medium | Deployed at enterprise clients; zero-integration capture across legacy systems | Skan AI, Linc AI |
| **Digital twin of knowledge workers** (AI clone trained on expert's communications and decisions) | Medium | $35M funding; deployed internally at Eightfold; early enterprise customers | Viven AI |

### Tier 3 — Emerging / research-stage

| Method | Maturity | Evidence | Key example |
|---|---|---|---|
| **AI-guided long-form knowledge extraction with coherence management** | Low-Medium | Conceptual framework; design patterns published but no widely-available product | Kurtis Kemple's coherence architecture |
| **GenAI SECI model** (generative AI augmenting Nonaka's knowledge creation spiral) | Low | Academic proposal (March 2026); introduces "Digital Fragmented Knowledge" concept | arXiv 2603.21866 |
| **LLM agent for organizational knowledge reconstruction** | Low | 94.9% recall in simulation; modeled as epidemiological diffusion | arXiv 2507.03811 |
| **Continuous screen recording as AI agent foundation** | Low-Medium | Open-source tooling exists (Screenpipe); conceptual pipeline proven | Screenpipe / Fazm |
| **ExpertPack structured knowledge for AI agents** | Low-Medium | Framework published; optimizes "EK ratio" for frontier model prompts | ExpertPack |

---

## 2. Specific Tools and Platforms Available Today

### Knowledge Extraction Platforms

| Platform | What it does | How it captures tacit knowledge | Pricing/access |
|---|---|---|---|
| **[Interloom](https://interloom.com)** | Builds "context graphs" from operational records | Ingests millions of emails, tickets, transcripts; uses MemoryRank to surface knowledge that leads to successful outcomes | Enterprise; $16.5M raised (March 2026) |
| **[Edra AI](https://edra.ai)** | Zero-setup process discovery from IT systems | Reads tickets, logs, messages from ServiceNow/Jira/Zendesk/Salesforce; reverse-engineers real workflows | Enterprise; founded by ex-Palantir |
| **[Aitomatic](https://aitomatic.com)** | Captures industrial expert knowledge as AI agents | Cognitive ontology encodes causal relationships and domain decision logic; SemiKong LLM for semiconductor | Enterprise/industrial |
| **[Sugarwork](https://sugarwork.com) (→ Decidr)** | Structured video interviews → process intelligence | Records expert interviews; converts to process maps, RACI docs, decision trees | Being integrated into DecidrOS |
| **[TRAIBE](https://traibe.ai)** | Institutional knowledge capture and delivery | Four-step: capture docs/emails → AI parse → human verify → deliver answers with citations | Enterprise |
| **[Viven AI](https://viven.ai)** | Digital twin of knowledge workers | Trains on expert's emails, calendars, chat, code repos, decisions; teammates query the twin | Enterprise; $35M raised |
| **[ProPlant.ai](https://proplant.ai)** | Industrial knowledge capture + training | AI agents conduct autonomous interviews with operators; creates training from tribal knowledge | Industrial; claims 80-90% training cost reduction |
| **[ExpertPack](https://expertpack.ai)** | Structures esoteric knowledge for AI agent prompts | Optimizes for "EK ratio" (knowledge frontier models can't produce independently); multi-layer retrieval | Developer tool |

### Process Discovery & Observation Platforms

| Platform | What it does | Capture method |
|---|---|---|
| **[Celonis Task Mining](https://celonis.com)** | Desktop activity capture + process mining | Client agent records clicks, copy/paste, app switches, optional screenshots |
| **[Skan AI](https://skan.ai)** | Computer vision process intelligence | Observes screens across all apps (including legacy/mainframe); auto-generates agent playbooks |
| **[Linc AI](https://withlinc.com)** | Three-agent process intelligence | Observes via screen recording/video; analyzes into process maps; generates SOPs |
| **[ClearWork](https://clearwork.io)** | Automated process discovery | Combines system logs with user activity data |
| **[ProcessMind](https://processmind.com)** | AI-powered process mining | Multi-source: clickstreams, telemetry, voice, documents |
| **[Fluency AWI](https://usefluency.com)** | Automatic process discovery + optimization | Addresses "the 70% problem" — work outside structured systems |

### Screen Recording & Analysis

| Platform | What it does |
|---|---|
| **[Augmend](https://augmend.com)** | Screen recording with AI summaries, chapters, and collaboration |
| **[ScreenMind](https://multaimind.com)** | Turns screen captures into searchable, continuously-learning knowledge base |
| **[ZASSHA](https://co-r-e.github.io/zassha_lp/)** | Extracts reproducible steps from screen recordings; exports to Word/PPT/Excel |
| **[Screenpipe](https://github.com/mediar-ai/screenpipe)** | Open-source 24/7 screen + audio capture with local AI processing |

---

## 3. What Works Now vs. What's Still Emerging

### Works now (deployable, proven results)

- **Mining operational records** for tacit knowledge. Interloom and Edra prove you can extract undocumented decision patterns from emails, tickets, and logs at scale. The key insight: tacit knowledge *does* leave traces in operational data — it just wasn't being harvested before.
- **Task mining / desktop observation.** Celonis and Skan AI capture what people actually do (not what they say they do) through desktop agents and computer vision. This is mature technology with enterprise adoption.
- **Structured video interviews converted to machine-readable formats.** Sugarwork demonstrated that guided interviews + AI processing can reduce onboarding time 70% and surface enterprise-critical workflows.
- **Domain-specific AI agents from expert knowledge.** Aitomatic shows that in structured domains (semiconductor manufacturing), encoding expert heuristics into cognitive ontologies produces agents that match 95% of senior engineer decisions.
- **Transcript-to-knowledge pipelines.** Extracting QA pairs and decision logic from call recordings works at >90% accuracy for routine knowledge.

### Emerging (promising, not yet proven at scale)

- **LLM-conducted expert interviews.** Research shows AI can interview effectively (SparkMe, RaPSIL), but maintaining coherence over long sessions and handling the full complexity of expert knowledge remains challenging. The "context pollution" problem is unsolved in production.
- **Digital twins of knowledge workers.** Viven AI is the most advanced attempt, but it's early (deployed internally only since 2025). The privacy, accuracy, and trust challenges are substantial.
- **Continuous screen recording as knowledge foundation.** The pipeline (capture → OCR/accessibility → structure → AI reasoning) is technically possible but raises major privacy/surveillance concerns and lacks mature tooling.
- **GenAI-augmented knowledge creation models.** Academic frameworks (GenAI SECI, GRAI) provide theoretical grounding but lack production implementations.
- **AI agents as apprentices.** The conceptual model — AI learns through delegation like a human apprentice — is compelling but implementations remain narrow (robotic manipulation, tutoring). No general-purpose "AI apprentice" for knowledge work exists.

---

## 4. The Gap: What AI Still Can't Do

### Hard limits

| Gap | Why it persists |
|---|---|
| **Embodied knowledge** | Physical timing, force, posture, micro-sequencing — experts can't verbalize it, and AI can't observe it from digital traces alone |
| **Relational/social knowledge** | Knowledge that exists only within community membership and trust relationships; depends on context AI can't inhabit |
| **Experiential judgment under genuine ambiguity** | Real-time adaptive reasoning in novel situations, where the expert's response emerges from thousands of prior experiences, not from any articulable rule |
| **Knowing *when* to break the rules** | Expert performance often involves knowing when standard procedures should be overridden — this meta-knowledge is the hardest to capture |
| **Sensory-motor coupling** | Physical expertise in surgery, craftsmanship, cooking, etc. — no digital capture method exists |

### Structural issues

- **The observability gap** (Bhattacharjee, 2025): LLMs trained on text can only learn from externalized, sequential representations. Tacit knowledge is neither externalized nor sequential by nature. This is not a scaling problem — it's architectural.
- **The articulation gap** (Agent Factory): Domain experts *cannot* easily write down what makes them effective. Any extraction method that depends on the expert fully articulating their knowledge will miss the most valuable parts.
- **Brittleness on edge cases**: AI systems trained on extracted knowledge perform well on routine cases but exhibit brittle performance on edge cases, ambiguous scenarios, and novel contexts — precisely where expert judgment is most valuable.
- **Knowledge verification**: Knowing whether extracted knowledge is *correct* and *complete* requires an expert reviewer — creating a dependency on the very resource you're trying to scale.

### What works as a bridge

The most effective current approaches acknowledge these limits and work around them:
1. **Hybrid human-AI extraction**: AI identifies patterns and generates hypotheses; humans validate and fill gaps (ExOAR framework, Aitomatic's cognitive ontology)
2. **Operational trace mining**: Sidesteps the articulation gap by extracting knowledge from *what experts did* rather than *what they say they did*
3. **Continuous observation + AI structuring**: Captures richer signal than interviews alone (Skan AI, Celonis Task Mining)
4. **Validation loops**: Building scenario-based testing to verify extracted knowledge before deployment (Agent Factory methodology)

---

## 5. Key Citations

| # | Source | Type | Date | URL |
|---|---|---|---|---|
| 1 | Interloom raises $16.5M — Fortune | Tier 2 (reputable publication) | Mar 2026 | https://fortune.com/2026/03/23/interloom-ai-agents-raises-16-million-venture-funding/ |
| 2 | GenAI SECI Model — arXiv | Tier 1 (academic) | Mar 2026 | https://arxiv.org/abs/2603.21866 |
| 3 | LLM Tacit Knowledge Discovery — arXiv | Tier 1 (academic) | Jul 2025 | https://arxiv.org/abs/2507.03811 |
| 4 | Decidr acquires Sugarwork | Tier 2 (company announcement) | 2025 | https://www.decidr.ai/news/decidr-to-acquire-sugarwork |
| 5 | SparkMe: Adaptive Semi-Structured Interviewing — arXiv | Tier 1 (academic) | Feb 2026 | https://arxiv.org/pdf/2602.21136 |
| 6 | AI Knowledge Assist for Conversational AI — arXiv | Tier 1 (academic) | Oct 2025 | https://arxiv.org/html/2510.08149v1 |
| 7 | From Transcripts to AI Agents — arXiv | Tier 1 (academic) | Feb 2026 | https://arxiv.org/abs/2602.15859 |
| 8 | Context Management for Knowledge Extraction — Kemple | Tier 3 (expert blog) | Sep 2024 | https://kurtiskemple.com/blog/unlocking-expert-minds-eight-patterns-for-interactive-knowledge-capture |
| 9 | The Knowledge Extraction Method — Agent Factory | Tier 3 (educational) | 2025 | https://agentfactory.panaversity.org/docs/Business-Domain-Agent-Workflows/the-knowledge-extraction-method |
| 10 | AI-Assisted Process Mining (ECIS 2025) | Tier 1 (academic conference) | 2025 | https://aisel.aisnet.org/ecis2025/bpm/bpm/7 |
| 11 | Tacit Knowledge is Not One Thing — Yu Sato | Tier 3 (blog/analysis) | Jan 2026 | https://medium.com/@yusato/tacit-knowledge-is-not-one-thing-and-that-is-why-ai-keeps-missing-it-1c07718293a2 |
| 12 | The Uncodifiable Advantage — Bhattacharjee | Tier 3 (blog/analysis) | 2025 | https://medium.com/@shashwatabhattacharjee9/the-uncodifiable-advantage-tacit-knowledge-as-the-strategic-bottleneck-in-ai-systems-d359dfe3967b |
| 13 | IDC: The Knowledge Your AI May Never Have | Tier 2 (analyst report) | 2025 | https://www.idc.com/resource-center/blog/the-knowledge-your-ai-may-never-have/ |
| 14 | Viven AI digital twin for workforces — Eightfold | Tier 2 (company announcement) | Oct 2025 | https://eightfold.ai/blog/meet-viven-ai/ |
| 15 | 24/7 Screen Recording as AI Foundation — Fazm | Tier 3 (technical blog) | 2025 | https://fazm.ai/blog/screenpipe-24-7-recording-ai-foundation |

---

## 6. Contradictions and Open Questions

### Contradictions

1. **"AI can capture 95% of expert decisions" vs. "tacit knowledge is fundamentally uncodifiable."** Aitomatic claims 95% accuracy on expert decisions in semiconductor; academic literature argues tacit knowledge structurally resists AI capture. Resolution: these are different *types* of knowledge. Highly structured industrial domains with clear inputs/outputs are more amenable than judgment-heavy domains (medicine, strategy, leadership). The 95% likely covers routine expert decisions, not edge-case judgment.

2. **"Zero-setup discovery" vs. "structured extraction is necessary."** Edra claims to discover processes without interviews; Agent Factory's methodology argues you *must* interview experts. Resolution: operational trace mining captures *what* happens; expert interviews capture *why* it happens and *when to deviate*. Both are needed for complete knowledge capture.

3. **"AI interviews are effective" vs. "coherence degrades over long sessions."** Research shows AI interviewers matching or exceeding human performance on metrics like topic coverage; Kemple's analysis shows context pollution is an unsolved problem. Resolution: AI interviews work well for shorter, structured extractions but degrade on the deep, multi-hour sessions where the most valuable tacit knowledge surfaces.

### Open questions

1. **Privacy and consent.** Screen recording, email ingestion, and digital twin creation raise profound questions. How do you capture operational knowledge without surveillance? Skan AI and Celonis process data locally; Viven AI accesses emails and calendars. Where is the line?

2. **Knowledge verification at scale.** If extracting knowledge requires expert validation, and expert time is the scarce resource, how do you create a virtuous cycle rather than just shifting the bottleneck?

3. **Knowledge decay.** Operational knowledge changes as processes change. Edra claims continuous learning; most platforms don't address how extracted knowledge is deprecated.

4. **The apprenticeship model gap.** Human apprentices learn by *doing* under supervision, receiving real-time correction, and gradually taking on more responsibility. No current AI system replicates this full cycle. The closest attempts (Viven digital twins, Aitomatic agents) focus on knowledge *replication* rather than knowledge *development*.

5. **Cultural and organizational resistance.** Capturing tacit knowledge often means making power dynamics visible. Experts may resist extraction if their unique knowledge is their job security. No tool addresses this human dimension.

6. **Composability.** Most tools capture knowledge in proprietary formats. There's no standard for "portable expert knowledge" that could move between platforms or be composed across tools.

---

## Summary: The Landscape in April 2026

The field has bifurcated into two distinct approaches:

**Approach A: Mine the traces.** Don't ask experts what they know — analyze what they *did*. Mine emails, tickets, screen recordings, and system logs. This is where the most mature tooling exists (Interloom, Edra, Celonis, Skan AI). The advantage: sidesteps the articulation gap. The limitation: captures behavioral patterns but misses the *reasoning* behind them.

**Approach B: Structure the conversation.** Use AI to conduct better interviews than humans can — with coherence management, adaptive questioning, and systematic validation. This is where the most interesting research is happening (SparkMe, Agent Factory methodology, Kemple's coherence architecture). The advantage: captures reasoning and judgment. The limitation: still depends on the expert being able and willing to articulate.

The companies attracting the most investment (Interloom $16.5M, Viven $35M) are betting on Approach A — that operational traces contain enough signal to reconstruct expert knowledge without requiring experts to articulate it. The academic research suggests this is partially correct but structurally incomplete: the most valuable knowledge (edge-case judgment, knowing when to break rules, embodied expertise) leaves no operational trace.

**The highest-potential approach is likely a hybrid**: mine operational traces to build a knowledge scaffold, then use AI-guided interviews to fill the gaps that trace mining can't reach, validated through scenario-based testing before deployment.
