# AI-Driven Adaptive Interviewing for Expert Knowledge Extraction

**Research date:** 2026-04-04
**Scope:** Systems that dynamically generate questions based on previous answers to explore a knowledge space

---

## 1. Systems That Exist Today

### 1.1 SparkMe — The State of the Art in Adaptive Semi-Structured Interviewing

| Field | Detail |
|---|---|
| **Paper** | "SparkMe: Adaptive Semi-Structured Interviewing for Qualitative Insight Discovery" |
| **Authors** | David Anugraha, Vishakh Padmakumar, Diyi Yang (Stanford SALT-NLP) |
| **Date** | February 2026 |
| **Tier** | Tier 1 — peer-reviewed arXiv preprint with user study (n=70) and open-source code |
| **URL** | https://arxiv.org/abs/2602.21136 |
| **Code** | https://github.com/SALT-NLP/SparkMe |

**What it is.** A multi-agent LLM interviewer that formulates adaptive semi-structured interviewing as an *optimization problem*. It balances three competing objectives:

1. **Coverage** of a predefined interview topic guide
2. **Discovery** of emergent themes that arise organically during conversation
3. **Interview cost** (measured by conversational length)

**How it works.** SparkMe performs *deliberative planning via simulated conversation rollouts* to select questions with high expected utility. The system:

- Maintains an explicit topic guide (JSON-configurable)
- Before asking each question, simulates multiple possible conversation trajectories
- Scores each candidate question by its expected contribution to coverage + discovery, discounted by cost
- Selects the highest-utility question

**Results.**
- +4.7% topic guide coverage over best baseline
- Richer emergent insights with fewer conversational turns
- User study: 70 participants across 7 professions (impact of AI on workflows)
- Domain experts rated SparkMe interviews as surfacing "profession-specific insights not captured by prior approaches"

**Significance for knowledge extraction.** SparkMe is the closest existing system to an "adaptive knowledge extractor." Its utility function explicitly models the trade-off between systematically covering known-important areas (coverage) and pursuing novel threads the expert reveals (discovery). This is exactly the coverage-vs-novelty trade-off needed for extracting proprietary knowledge.

---

### 1.2 Modular AI-Powered Interviewer with Expertise Profiling

| Field | Detail |
|---|---|
| **Paper** | "Modular AI-Powered Interviewer with Dynamic Question Generation and Expertise Profiling" |
| **Authors** | Aisvarya Adeseye, Jouni Isoaho, Seppo Virtanen, Mohammad Tahir |
| **Date** | November 2025 |
| **Tier** | Tier 2 — arXiv preprint with user evaluation |
| **URL** | https://arxiv.org/abs/2601.11534 |

**What it is.** A locally-hosted LLM interviewer that dynamically generates contextually appropriate questions and profiles participant expertise in real-time.

**Key innovation.** Real-time expertise profiling — the system assesses the interviewee's knowledge level during the conversation and adjusts question difficulty and depth accordingly. Uses a modular prompt engineering pipeline rather than a monolithic prompt.

**Results.** High satisfaction (mean 4.45/5) and engagement (mean 4.33/5). Privacy-preserving (local LLM).

---

### 1.3 Beyond the Resumé — Belief-Convergence Interviewing

| Field | Detail |
|---|---|
| **Paper** | "Beyond the Resumé: A Rubric-Aware Automatic Interview System for Information Elicitation" |
| **Authors** | Harry Stuart, Masahiro Kaneko, Timothy Baldwin (MBZUAI) |
| **Date** | March 2026 |
| **Tier** | Tier 1 — arXiv preprint with simulated experiments and open-source code |
| **URL** | https://arxiv.org/abs/2603.01775 |
| **Code** | https://github.com/mbzuai-nlp/beyond-the-resume |

**What it is.** An LLM-based interview system that uses Bayesian belief updating to guide question selection. The interviewer maintains calibrated beliefs about an applicant's rubric-oriented latent traits, and selects questions that maximally reduce uncertainty.

**Key innovation.** *Belief convergence as stopping criterion* — the system detects when additional questions yield diminishing belief updates, signaling information saturation. Correctly recovered applicant archetypes 76.1% of the time in simulated interviews.

**Significance.** The Bayesian belief-update mechanism is directly applicable to knowledge extraction: maintain beliefs about what the expert knows in each sub-area, ask questions that maximally reduce uncertainty, and stop when beliefs converge.

---

### 1.4 CoMAI — Collaborative Multi-Agent Interview Framework

| Field | Detail |
|---|---|
| **Paper** | "CoMAI: A Collaborative Multi-Agent Framework for Robust and Equitable Interview Evaluation" |
| **Date** | March 2026 |
| **Tier** | Tier 2 — arXiv preprint with real-world deployment |
| **URL** | https://arxiv.org/abs/2603.16215 |

**What it is.** A multi-agent framework using finite-state machine coordination across four specialized agents (question generation, security, scoring, summarization). Deployed for university admissions.

**Results.** 90.47% accuracy (30.47% improvement over single-agent, 19.05% over human interviewers). 84.41% candidate satisfaction.

---

### 1.5 MimiTalk — Dual-Agent Qualitative Research AI

| Field | Detail |
|---|---|
| **Paper** | "MimiTalk: Revolutionizing Qualitative Research with Dual-Agent AI" |
| **Date** | November 2025 |
| **Tier** | Tier 1 — multi-study comparison (121 AI vs 1,271 human interviews) |
| **URL** | https://arxiv.org/abs/2511.03731 |

**What it is.** A dual-agent constitutional AI framework integrating a supervisor model (strategic oversight) and a conversational model (question generation) for qualitative research.

**Key findings.** AI interviews *outperformed* human interviews in information richness, coherence, and stability. Human interviews remained superior in capturing cultural and emotional nuances.

---

### 1.6 LLM-as-an-Interviewer — Dynamic Evaluation Framework

| Field | Detail |
|---|---|
| **Paper** | "LLM-as-an-Interviewer: Beyond Static Testing Through Dynamic LLM Evaluation" |
| **Date** | December 2024 (ACL Findings 2025) |
| **Tier** | Tier 1 — peer-reviewed at ACL |
| **URL** | https://arxiv.org/abs/2412.10424 |
| **Code** | https://github.com/interview-eval/interview-eval |

**What it is.** Uses multi-turn interview interactions to evaluate LLMs — dynamically modifies questions, provides feedback, and generates follow-up questions. While aimed at LLM evaluation rather than human knowledge extraction, the architecture is directly transferable.

---

### 1.7 Commercial/Applied Systems

| System | What it Does | URL |
|---|---|---|
| **CogniCache** | AI-guided interviews (chat + voice), auto-transcription, intelligent follow-ups, publishes structured knowledge for RAG systems | https://www.cognicache.net |
| **TRAIBE** | Captures institutional knowledge from emails, documents, interviews; delivers AI-powered answers with citations in <3 seconds | https://www.traibe.ai |
| **Traversal Knowledge Bank** | Auto-discovers operational context from telemetry and team behavior, with human refinement | https://traversal.com |
| **ExpertPack** | Structured knowledge capture for AI agents | https://expertpack.ai |

---

## 2. Technical Approaches for Dynamic Question Generation Targeting Novel Knowledge

### 2.1 The Core Problem: Common vs. Proprietary Knowledge

The fundamental challenge is that an LLM already "knows" most of what's publicly available. When interviewing an expert, the system must distinguish:

- **Common knowledge** — information already embedded in the LLM's training data (not worth extracting)
- **Proprietary/novel knowledge** — experiential wisdom, tacit know-how, organizational context, edge cases, counter-intuitive insights (high extraction value)

Three research streams directly address this:

#### 2.1.1 Probing the Knowledge Boundary (Yang et al., UIUC, Feb 2026)

| Field | Detail |
|---|---|
| **URL** | https://arxiv.org/abs/2602.00959 |
| **Code** | https://github.com/ulab-uiuc/KnowledgeExtraction |

The most directly relevant paper. Proposes an **interactive agentic framework** that treats a black-box LLM as "an environment to be explored" and systematically maps its knowledge boundaries.

**Four exploration policies (ranked by effectiveness):**

| Policy | Mechanism | Effectiveness |
|---|---|---|
| Sequential Associative Probing | Iterative "what else?" prompts | Baseline (weakest) |
| Self-Reflective Refinement | Critic-actor loop that audits previous outputs to find gaps | Moderate |
| **Recursive Taxonomy Explorer** | **Hierarchical tree decomposition of the topic into sub-fields, then exhaustive leaf-node mining** | **Best (Pareto-optimal)** |
| Multi-Perspective Parallel Probing | N expert personas probing simultaneously | Strong but not Pareto-optimal |

**Three-stage knowledge quality pipeline:**

1. **Vector filtering** — cosine similarity > 0.92 = automatic merge (removes exact duplicates)
2. **LLM adjudication** — for ambiguous range 0.70–0.92, an LLM judge decides if two knowledge atoms are truly distinct
3. **Domain-relevance auditing** — Bloom's Taxonomy criteria filter out meta-statements and generic fluff

**Saturation detection (when to stop):**
- Growth rate < 1% per turn
- Extraction efficiency < 10% (novel atoms / raw atoms)
- Fewer than 3 novel atoms per turn
- Maximum 15 turns

**Key finding:** Recursive taxonomy dominates because it *forces the model past its "comfort zone"* of high-probability tokens. By decomposing to fine-grained sub-topics, it accesses long-tail parametric memory.

**Application to expert interviews:** Invert this framework. First run the Recursive Taxonomy on the LLM alone to map *what it already knows*. Then, when interviewing the expert, specifically target the gaps and ask about areas where the LLM's knowledge saturates quickly or produces low-confidence outputs.

#### 2.1.2 Knowledge Boundary Discovery via RL (AAAI 2026)

| Field | Detail |
|---|---|
| **URL** | https://arxiv.org/abs/2603.21022 |

Uses reinforcement learning to automatically discover an LLM's knowledge boundary by generating two types of questions:
- **Within-boundary** — questions the LLM can confidently answer
- **Beyond-boundary** — questions the LLM cannot answer

The RL agent uses *entropy reduction as reward signal*, treating the exploration as interaction with a partially observable environment. Must handle hallucination — distinguishing genuine knowledge from fabricated responses.

**Application:** Use KBD to pre-compute "beyond-boundary" questions for a domain, then ask the expert specifically those questions. This systematically targets proprietary knowledge.

#### 2.1.3 KA2L: Knowledge-Aware Active Learning (March 2026)

| Field | Detail |
|---|---|
| **URL** | https://arxiv.org/abs/2603.17566 |

Probes an LLM's latent space to identify the distribution of known vs. unknown knowledge. Uses a hidden-state decoding method to generate questions about knowledge the model has *not yet mastered*.

**Results:** 50% reduction in annotation and computation costs while achieving better performance across nine open-source LLMs.

---

### 2.2 Tree-Based and Graph-Based Question Generation

#### Auto-HKG + Cognitive GraphRAG (Wang et al., Jan 2026)

| Field | Detail |
|---|---|
| **Paper** | "Beyond Static Question Banks: Dynamic Knowledge Expansion via LLM-Automated Graph Construction and Adaptive Generation" |
| **URL** | https://arxiv.org/abs/2602.00020 |

Automatically constructs hierarchical knowledge graphs from source material, then uses graph-based reasoning over a "learner mastery graph" to generate personalized questions. The mastery graph tracks what is known vs. unknown and targets gaps.

#### KNIGHT (Feb 2026)

| Field | Detail |
|---|---|
| **URL** | https://arxiv.org/abs/2602.20135 |
| **Code** | https://github.com/ErfanShm/knight-mcq |

Constructs topic-specific knowledge graphs that enable controlled difficulty levels and multi-hop question generation. Key insight: a reusable KG representation makes question generation "a cheap read over the graph" rather than repeatedly processing source text.

#### PolyG: Adaptive Graph Traversal (2025)

| Field | Detail |
|---|---|
| **URL** | https://arxiv.org/abs/2504.02112 |

Classifies question types and uses different graph traversal strategies for each. Dynamically generates database queries per question type rather than using fixed traversal.

---

### 2.3 Socratic AI Systems

#### SocraticAI (Princeton NLP)

| Field | Detail |
|---|---|
| **URL** | https://princeton-nlp.github.io/SocraticAI/ |

Multi-agent system where a Reasoner, Perceiver, and Verifier conduct Socratic dialogue. Agents *treat each other as potentially unreliable*, encouraging granular decomposition and critical evidence-seeking. Records complete reasoning traces.

#### Requirements Elicitation Follow-Up Questions (CMU, July 2025)

| Field | Detail |
|---|---|
| **URL** | https://arxiv.org/abs/2507.02858 |
| **Code** | https://github.com/anmolsinghal98/Requirements-Elicitation-Follow-Up-Question-Generation |

LLM-generated follow-up questions performed *as well as human-authored questions* in clarity, relevancy, and informativeness. *Outperformed* human questions when guided by a framework of common interviewer mistake types.

---

## 3. Evidence of Effectiveness vs. Human Interviewers

| Study | Scale | Key Finding | Source |
|---|---|---|---|
| **MimiTalk** | 121 AI vs 1,271 human interviews | AI outperformed on information richness, coherence, stability; humans better on cultural/emotional nuance | arXiv:2511.03731 |
| **SparkMe** | 70 participants, 7 professions | Domain experts rated AI interviews as surfacing insights "not captured by prior approaches" | arXiv:2602.21136 |
| **CoMAI** | University admissions deployment | 90.47% accuracy (19.05% improvement over human interviewers) | arXiv:2603.16215 |
| **70K field experiment** (hiring) | 70,000 applicants | AI-interviewed candidates 12% more likely to get offers, 18% more likely to start, 17% more likely to stay 30 days | Chicago Booth Review, Mar 2026 |
| **micro1** (developer hiring) | 37,000 applicants | 54% success rate vs 34% control; conversational quality 7.80 vs 5.41 | micro1.ai research |
| **CMU requirements elicitation** | Controlled experiment | LLM questions ≥ human quality; outperformed when guided by mistake taxonomy | arXiv:2507.02858 |

**Consistent pattern:** AI interviewers match or exceed humans on *structured information extraction* (coverage, consistency, richness). Humans retain advantage on *emotional rapport*, *cultural sensitivity*, and *reading non-verbal cues*.

---

## 4. Key Limitations and Failure Modes

### 4.1 Known Failure Modes

| Failure Mode | Description | Evidence |
|---|---|---|
| **Comfort-zone inertia** | LLMs default to high-probability, generic responses; interviewees may do the same without push-back | Knowledge Boundary (2602.00959) |
| **Hallucination in knowledge assessment** | When trying to determine its own knowledge boundary, the LLM may fabricate confident-sounding claims | KBD (2603.21022) |
| **Emotional/cultural blindness** | AI misses non-verbal cues, cultural context, emotional subtext | MimiTalk (2511.03731) |
| **Domain-specific fine-tuning degrades breadth** | Specializing the interviewer model on a domain reduces its ability to explore adjacent areas | Knowledge Boundary (2602.00959) |
| **Semantic deduplication is imperfect** | Vector similarity misses logical negations and subtle technical differences | Knowledge Boundary §3.3 |
| **Expert accommodation** | Experts may "dumb down" responses for an AI interviewer, withholding complex tacit knowledge they'd share with a human peer | Not directly studied; inferred from hiring interview studies |
| **Saturation ≠ completeness** | Extraction stopping criteria detect when *marginal returns diminish*, not when all knowledge has been captured | Knowledge Boundary §3.1 |
| **No ground truth for open-ended domains** | There's no way to verify you've extracted "all" of an expert's knowledge | Knowledge Boundary §1 |

### 4.2 Structural Limitations

- **No system yet combines** the Knowledge Boundary framework (what does the LLM already know?) with adaptive interviewing (SparkMe-style). This is the key missing piece.
- **Tacit knowledge remains hard.** Experts often can't articulate their tacit knowledge even when asked directly. No current system addresses the "you don't know what you don't know" problem from the expert's side.
- **Validation is still open.** No system verifies extracted knowledge against ground truth in real expert domains — all evaluations use either simulated interviewees or subjective quality ratings.

---

## 5. Technical Architecture: How to Build This

Based on synthesizing all the above research, here is the architecture for a system that dynamically generates questions, tracks learning, identifies gaps, and targets the highest-value gap:

### 5.1 Pre-Interview: Map the LLM's Knowledge Boundary

**Before talking to the expert**, run the Knowledge Boundary probing framework on the domain:

1. Use Recursive Taxonomy to decompose the domain into a hierarchical knowledge tree
2. At each leaf node, extract what the LLM "knows" (via multi-turn probing)
3. Apply the three-stage dedup pipeline to get clean knowledge atoms
4. Detect saturation at each leaf — low-saturation leaves = "LLM's knowledge is thin here"
5. Optionally, run KBD (RL-based) to generate explicit beyond-boundary questions

**Output:** A knowledge map with confidence scores per sub-topic, plus a set of pre-computed "gap questions."

### 5.2 Interview: Adaptive Multi-Agent Questioning

Adopt SparkMe's optimization framework but augment the utility function:

```
U(question) = α·coverage(q) + β·discovery(q) + γ·novelty(q) - δ·cost(q)
```

Where:
- **coverage(q)** = does this question fill a known gap in the topic guide?
- **discovery(q)** = could this question reveal an emergent theme? (simulated rollouts)
- **novelty(q)** = does this question target knowledge *beyond the LLM's boundary*? (from pre-interview map)
- **cost(q)** = expected conversational turns to get a useful answer

**Multi-agent roles:**
- **Planner** — maintains the knowledge map, selects next question via utility optimization
- **Interviewer** — generates natural, conversational questions from the Planner's selections
- **Listener** — extracts structured knowledge atoms from expert responses in real-time
- **Auditor** — checks extracted atoms against the LLM's existing knowledge, flags genuine novelty

### 5.3 Real-Time Knowledge Tracking

Maintain a dynamic knowledge graph during the interview:

1. Each expert response is parsed into candidate knowledge atoms
2. Atoms are checked against the pre-interview knowledge map:
   - **Already known** → mark as confirmed (low value)
   - **Contradicts LLM knowledge** → high value, flag for follow-up
   - **Novel (not in map)** → high value, attempt to locate in knowledge tree
3. Update coverage scores per sub-topic in real-time
4. Recalculate utility scores for candidate next questions

### 5.4 Gap Targeting

Use active learning principles (from KA2L and the Fisher information framework):

- Questions near the expert's knowledge boundary (where they're uncertain) are less informative than questions where they have clear expertise
- But questions that probe the *intersection* of "expert knows, LLM doesn't know" are highest value
- Use entropy reduction as the reward signal: select the question that maximally reduces uncertainty about the expert's unique knowledge

### 5.5 Stopping Criteria

Adapt the Knowledge Boundary saturation framework:
- Growth rate of *novel* knowledge atoms drops below threshold
- Belief convergence (Beyond the Resumé approach) — the system's model of the expert's knowledge stabilizes
- All high-priority gaps in the knowledge map have been addressed
- Expert signals fatigue or time limit reached

### 5.6 Post-Interview Processing

1. Deduplicate extracted knowledge (vector filtering + LLM adjudication)
2. Classify atoms by Bloom's Taxonomy level (factual, conceptual, procedural)
3. Validate against external sources where possible
4. Score each atom's novelty relative to the LLM's pre-interview knowledge boundary
5. Structure into a knowledge graph for downstream consumption (RAG, fine-tuning, etc.)

---

## 6. Full Citation Index

### Academic Papers

| # | Paper | Date | URL |
|---|---|---|---|
| 1 | SparkMe: Adaptive Semi-Structured Interviewing for Qualitative Insight Discovery | Feb 2026 | https://arxiv.org/abs/2602.21136 |
| 2 | Probing the Knowledge Boundary: An Interactive Agentic Framework for Deep Knowledge Extraction | Feb 2026 | https://arxiv.org/abs/2602.00959 |
| 3 | Modular AI-Powered Interviewer with Dynamic Question Generation and Expertise Profiling | Nov 2025 | https://arxiv.org/abs/2601.11534 |
| 4 | Beyond the Resumé: A Rubric-Aware Automatic Interview System for Information Elicitation | Mar 2026 | https://arxiv.org/abs/2603.01775 |
| 5 | CoMAI: A Collaborative Multi-Agent Framework for Robust and Equitable Interview Evaluation | Mar 2026 | https://arxiv.org/abs/2603.16215 |
| 6 | MimiTalk: Revolutionizing Qualitative Research with Dual-Agent AI | Nov 2025 | https://arxiv.org/abs/2511.03731 |
| 7 | LLM-as-an-Interviewer: Beyond Static Testing Through Dynamic LLM Evaluation | Dec 2024 | https://arxiv.org/abs/2412.10424 |
| 8 | Knowledge Boundary Discovery for Large Language Models | Mar 2026 | https://arxiv.org/abs/2603.21022 |
| 9 | KA2L: A Knowledge-Aware Active Learning Framework for LLMs | Mar 2026 | https://arxiv.org/abs/2603.17566 |
| 10 | Beyond Static Question Banks: Dynamic Knowledge Expansion via LLM-Automated Graph Construction | Jan 2026 | https://arxiv.org/abs/2602.00020 |
| 11 | KNIGHT: Knowledge Graph-Driven MCQ Generation with Adaptive Hardness Calibration | Feb 2026 | https://arxiv.org/abs/2602.20135 |
| 12 | PolyG: Adaptive Graph Traversal for Diverse GraphRAG Questions | 2025 | https://arxiv.org/abs/2504.02112 |
| 13 | Requirements Elicitation Follow-Up Question Generation | Jul 2025 | https://arxiv.org/abs/2507.02858 |
| 14 | iReDev: A Knowledge-Driven Multi-Agent Framework for Intelligent Requirements Development | 2025 | https://arxiv.org/abs/2507.13081 |
| 15 | Eliciting Secret Knowledge from Language Models | Oct 2025 | https://arxiv.org/abs/2510.01070 |
| 16 | ActiveRAG: Revealing the Treasures of Knowledge via Active Learning | Feb 2024 | https://arxiv.org/abs/2402.13547 |
| 17 | SocraticAI (Princeton NLP) | 2023–2025 | https://princeton-nlp.github.io/SocraticAI/ |

### Commercial/Applied Systems

| # | System | URL |
|---|---|---|
| 18 | CogniCache | https://www.cognicache.net |
| 19 | TRAIBE | https://www.traibe.ai |
| 20 | Traversal Knowledge Bank | https://traversal.com |
| 21 | ExpertPack | https://expertpack.ai |

### Effectiveness Studies

| # | Source | URL |
|---|---|---|
| 22 | "Does AI Beat Humans at Recruiting?" (Chicago Booth, 70K study) | https://www.chicagobooth.edu/review/2026/march/does-ai-beat-humans-recruiting |
| 23 | micro1 AI-Assisted Recruitment (37K study) | https://www.micro1.ai/research/quantifying-the-benefits-of-ai-assisted-recruitment |
| 24 | "The Hidden AI ROI Barrier: The Tribal Knowledge Gap" (Valere) | https://www.valere.io/hidden-ai-roi-barrier-tribal-knowledge-gap/ |

---

## 7. Key Takeaways

1. **The field is moving fast.** Six major papers dropped in Q1 2026 alone on adaptive AI interviewing. SparkMe is the current leader for adaptive semi-structured interviews.

2. **The biggest unsolved problem is the common-vs-novel distinction.** No deployed system yet combines knowledge boundary mapping (what the LLM knows) with adaptive interviewing (what to ask the human). The pieces exist separately — they need to be composed.

3. **Recursive taxonomy is the winning exploration strategy.** Across multiple papers, hierarchical decomposition of a topic into sub-fields, followed by exhaustive leaf-node exploration, consistently outperforms flat, sequential, or even multi-perspective approaches.

4. **Belief convergence is a promising stopping criterion.** Rather than arbitrary turn limits, monitoring when the system's beliefs about the expert's knowledge stop changing provides a principled stopping point.

5. **AI interviewers already match or exceed humans for structured information extraction.** The evidence base (MimiTalk n=1,392, hiring studies n=107,000) is large and consistent. The gap is in emotional/cultural nuance, not information coverage.

6. **The 80% tribal knowledge problem is real and commercially validated.** Multiple enterprise platforms (TRAIBE, CogniCache, Traversal) have launched specifically to address the ~80% of organizational intellectual capital that exists only as undocumented expert knowledge.

7. **The technical architecture is now clear.** Pre-map the LLM's knowledge boundary → interview with novelty-weighted utility optimization → track knowledge atoms in real-time → target gaps via active learning → stop when beliefs converge.
