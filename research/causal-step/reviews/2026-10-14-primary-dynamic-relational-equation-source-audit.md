# Dynamic-relational physics primary-equation source audit — first source-depth campaign

**Date:** 2026-10-14, `research/causal-step` research branch.  
**Human research priority:** Joshua Oshiro requested a **substantially complete, source-faithful comparative dataset** spanning all physical and mathematical models expressible as **dynamic relational rules**, before conducting Causal Step native-source emergence or apparent-gravity tests.  
**AI-assisted work:** original source paper review, equation extraction, citation follow-up, formal comparison and blocker taxonomy.  
**Status:** **substantive source-technical progress, not a complete systematic review and not a theory equivalence proof**. No native causal rewrite generator modified or exercised this turn.

## 1. What was actually added

The previously preserved [197-row, 16-field corpus v0.3](../references/2026-10-14-cross-domain-comparison-corpus-v0.3.json) was supplemented by a first citation follow-up with **11 distinct works not already recorded under the same titles**, including the missed 2024 "effective order" paper. The frozen [v0.4 corpus](../references/2026-10-14-cross-domain-comparison-corpus-v0.4.json) therefore has **208 source RECORDS, 194 simple DOI/arXiv/URL keys**; residual duplicates and aliases remain. The later [v0.6 audited index](../references/2026-10-14-cross-domain-comparison-corpus-v0.6.json) retains those 208 rows and 194 simple source keys, adds two further original math source audits and corrects a publisher-verified authorship metadata error. The source documents are not 208 separate theories.

[Corpus v0.5](../references/2026-10-14-cross-domain-comparison-corpus-v0.5.json) attaches actual mathematical definitions and equation-page locators for **14 original primary works** in [first six](../references/2026-10-14-priority-primary-equation-extraction-batch-01.json), [next four](../references/2026-10-14-priority-primary-equation-extraction-batch-02.json), and [four more](../references/2026-10-14-priority-primary-equation-extraction-batch-03.json), plus **two previously saved 2026 primary-source equation pilots**. [Fourth source extraction batch](../references/2026-10-14-priority-primary-equation-extraction-batch-04.json) adds **Bianconi's actual discrete matrix action and Oreshkov's quantum-process validity equations**. These are source equation *extractions*, not reproduced full external proofs. Some entries have aliases/versions and are linked to the same study with explicit caveats.

The [first-hop citation follow-up](../references/2026-10-14-citation-snowball-batch-01.json) explicitly surfaced Behr and Krivine's *guarded* rewrite composition, SqPO unknown-context deletion, generalized concurrent rules, moment-bisimilarity, network oscillator/hypergraph Laplacian, coupled-cell hypernetworks, and directed hypergraph reachability. It is **one selective pass**, not full backward and forward citation saturation.

## 2. A necessary distinction found in an original 2024 mathematical source

[Neuhäuser et al., *Learning the effective order of a hypergraph dynamical system* (Science Advances 2024)](https://doi.org/10.1126/sciadv.adh4053) separates:

- **topological order**: maximum hyperedge cardinality in the chosen topology;
- **dynamical order**: smallest local interaction arity needed to express the given dynamical function in an admissible decomposition;
- **effective order**: minimal interaction arity actually sufficient **jointly with that topology** for the specified complete update rule.

The paper proves a scope-qualified bound \(p_{\min}\le \min(k,p_{\mathrm{dyn}})\) for its selected **node-ODE additive/symmetric** hypergraph dynamics, under known local functions and hyperedge representation. Source original Eq.(1) uses \(\sin(\sum_{j\in E}(x_j-x_i))\), a joint interaction, while Eq.(2) sums \(\sin(x_j-x_i)\) and factors **exactly** via a weighted pairwise adjacency derived from B. **The same visual hyperedges need not carry irreducible multiway dynamics.**

**Implication for Causal Step:** Our original frozen simulator's k-rank alone cannot be mistaken for proof that the dynamical causal degree is k. But unlike the source paper's continuously evolving real oscillator field on fixed incidence, native Causal Step fires specific bit-enabled rank-k occurrences, consumes/retains them, mutates participant bits and births nodes; the relevant equivalence must preserve these operations. The T3 five-input directed AND formal witness is **not** the native system either.

## 3. Six original equation-level structural-bridge results

| Source and exact load-bearing equation | What the published math establishes | Risk in naive transfer |
|---|---|---|
| [Bick et al., *What Are Higher-Order Networks?* 2023](https://doi.org/10.1137/21M1414024), Defs 2.1/2.3 and §5.4.2 | Hypergraph incidences, simplicial face closure and **effective nonpairwise interactions induced even by phase reduction of pairwise dynamics** are distinct mathematical cases. | An emergent high-order term doesn't automatically mean a fundamental high-order interaction. |
| [Zhang–Lucas–Battiston 2023](https://doi.org/10.1038/s41467-023-37190-9), Eqs 1–6 | Higher-order Kuramoto-like dynamics on simplicial vs hypergraph incidence have different synchronizability because forced simplicial closure correlates topology. | Filling a native k-way event with dyadic/simplicial faces inserts assumptions and changes its behavior. |
| [Carletti–Fanelli–Nicoletti 2020](https://doi.org/10.1088/2632-072X/aba8e1), Eqs 1–3 | Specific hypergraph Laplacian coupling \(K^H_{ij}=\sum_\alpha(C_{\alpha\alpha}-1)e_{i\alpha}e_{j\alpha}\) and \(L^H=D-K^H\); authors explicitly say this *selected linear Laplacian dynamics* is equivalent to a weighted pairwise projection. | Successful weighted graph dynamics doesn't reconstruct native selected event occurrences, enabling or higher composition. |
| [Behr–Krivine 2021](https://doi.org/10.32408/compositionality-3-2), Eq29/Thm6 Eq72–73 | Shift/transport of application conditions and *associative guarded graph-rule composition* for admissible match pairs. | The 660 T4 triple blocks do **not** contradict associativity: those source events fail to remain admissible after intervention. |
| [Behr–Danos–Garnier 2020](https://doi.org/10.23638/LMCS-16(3:3)2020), Def5.1 | **Moment bisimulation**: selected observable exponential moment evolution can agree for different stochastic rewriting systems. | Equality of selected moments is intentionally weaker than complete microscopic event/intervention equivalence; CTMC rates/time would be new source assumptions. |
| [Koutny–Mikulski 2026](https://doi.org/10.1007/s11047-025-10060-7), Defs1–2/Thm1 | Finite reaction \(a=(R,I,P)\) enabled by \(R\subseteq U\), \(I\cap U=\emptyset\), parallel results with exact 1-safe Petri encodings. | Native single-event firing, distinct occurrence multiplicity, unbounded birth and bit-mutation are not those parallel fixed-species semantics. |

**Further source constraints:** [Aguiar–Bick–Dias 2023](https://doi.org/10.1088/1361-6544/ace39f), Def4.1, defines hypernetwork input-equivalence by typed edge size/weight and supports robust synchrony under its continuous cell dynamics; [Rideout–Sorkin 1999](https://doi.org/10.1103/PhysRevD.61.024002), Eq2, imposes **stochastic** discrete general covariance and Bell ratio conditions on binary causal poset birth. These are useful but different native objects.

## 4. Information-theoretic comparators and a subtle test-design hazard

The third batch extracts:

- [Koch-Janusz–Ringel, real-space mutual information RG (2018)](https://doi.org/10.1038/s41567-018-0081-4), original preprint Eq.(1): optimize \(I_\Lambda(H:E)\) between coarse variables and a **predefined external environment** in a Gibbs/Ising/dimer physical setup. A source-native coarse observer might preserve long-range prediction but still lose interventions or guard composition.
- [Fritz, Markov categories (2020)](https://doi.org/10.1016/j.aim.2020.107239), Definition 14.3 Eq14.1: a statistical observation \(s:X\to V\) is sufficient for specified statistical model \(p:\Theta\to X\) **only if a reconstructing stochastic morphism \(\alpha:V\to X\) exists**. Source inputs are abstract Markov categorical probability, not pregeometric dynamics.
- [Hoel–Albantakis–Tononi (2013)](https://doi.org/10.1073/pnas.1314922110): effective information can be larger for a chosen coarse model **because a separately uniform intervention ensemble is selected at that scale**. The source explicitly notes a macro-uniform perturbation prior reweights micro interventions. **Do not misinterpret a macro>micro effective-information result as a violation of data processing under a single fixed stochastic channel**.
- [Petz, quantum sufficient subalgebras (1986)](https://math.bme.hu/~petz/pdf/29suff.pdf), Thm4: relative entropy of two normal states restricted to a sufficient von Neumann subalgebra and its Connes cocycle supports an *operator-algebraic* sufficiency criterion under finite-relative-entropy and algebra hypotheses. It is not a theorem that our binary-state native source contains quantum Hilbert-space recovery.

The information-sufficiency methods reinforce the user's prior exact T3 result: the binary causal-order observer erases genuine joint enabling, while a fuller intervention observer can recover it. But choosing a different perturbation prior, an incomplete invariant, or a successful operator spectrum **changes the equivalence being tested**.

## 5. Two physics-facing checks that must stay conditional

**Discrete matrix entropic geometry:** [Ginestra Bianconi, *Quantum entropy couples matter with geometry* (2024)](https://doi.org/10.1088/1751-8121/ad6f7e), original preprint Eqs 1,8–11,20–21, explicitly begins with a **preselected finite-dimensional cell complex**, cochain state spaces, oriented boundary matrices, a **positive-definite Hermitian block metric matrix \(G\)**, and a discrete Dirac operator depending on metric and gauge variables. Her proposed action contains trace matrix-log/volume terms, \(S_+=\sigma\operatorname{Tr}\log G+\operatorname{Tr}[G(\log G-\log \widehat G)]-\operatorname{Tr}G\). A 3D lattice is separately assumed for a specialized example; the network topology is fixed in the study and variation of topology noted as future work. **None of those ingredients is automatically obtained from original Causal Step undirected event hyperedge dynamics.**

**Indefinite quantum causal order:** [Oreshkov–Costa–Brukner 2012](https://doi.org/10.1038/ncomms2076), original preprint Eqs4–6, defines **positive** process matrices \(W\) whose generalized Born probabilities are normalized for all local CPTP operations on explicitly supplied quantum Hilbert input/output spaces. Causal nonseparability differs from a classical rewrite history or a random scheduler with changing future choices. Distinct operational cause relations on Causal Step do not prove a quantum process matrix or indefinite physical spacetime.

These are **mathematical/physics original-source extracts**, not new empirical quantum/gravity evidence and not native transition equivalences.

## 6. Source and provenance quality corrections

1. The initially recorded moment-bisimulation LMCS article number was misidentified as 16(3:15); the publisher's [original issue](https://lmcs.episciences.org/6628) confirms **16(3:3), DOI 10.23638/LMCS-16(3:3)2020**. The source extraction was corrected in Git rather than silently rewriting history.
2. The CSL 2018 paper *Rule Algebras for Adhesive Categories* and its later 2020 LMCS version are publication variants. The 2018 theorem/locator should **not** be copied as though its equation numbers were those of the 2020 source.
3. The previous 2026 J. Phys. Complexity roadmap entry in the broad source tranche is credited to the wrong lead author there. The actual [IOP review DOI](https://doi.org/10.1088/2632-072X/ae3c4e) has Aida Abiad and collaborators, not Bick as leading author; this is documented as an **open metadata correction** in [v0.5](../references/2026-10-14-cross-domain-comparison-corpus-v0.5.json) and will be corrected in the next canonical source index.
4. A significant number of earlier source-register DOIs and abstract claims remain **pending direct-original verification**. Our present source-tranche coverage is still conditional.
5. Source exact-quote/equation versions are not theorems proven by this agent. Paper authors retain credit; our contribution is source matching and critical comparison.

## 7. What is source-data complete and what is not

**Results now actually saved and reviewed:**

- 208 indexed literature record rows (including aliases), 194 simple citation identifiers across 16 domains in corpus v0.5.
- **18** original primary-paper source-equation/definition extraction cases (16 this campaign, plus two previous 2026 pilots) stored with page/section/equation locators and exact preloaded assumptions.
- **One selective first-hop source reference search** adding 11 previously absent source papers. This proves the literature index was incomplete; it is not an independently complete citation-saturation pass.
- Version and DOI corrections, original source negative controls and typed mapping obstacles explicitly recorded.

**Not complete:**

- Two independent domain-wise query/citation passes with held-out novelty check (C1).
- Extracting original mathematical dynamical operators/assumptions for all priority distinct structural families (C2).
- Formal exclusion/negative source campaign with independent source citation/adjudication (C3).
- Exact source-to-native representation map, rigorous bisimulation/faithful observer tests for any external dynamical model (C4).
- Any emergent physical quantum, geometry, photons, mass, gravity, spacetime or observational dark-sector prediction (C5).

A **bibliographic count is not data completeness**. For the eventual user's requested broad comparison the most valuable deliverables are **versioned source equations and their failure witnesses**, not merely a row list. The source-level progress does, however, establish useful candidate tests and rules out several superficial identifications.

## 8. Next research batch recommendation

**Source-first, breadth-balanced:** Continue domain citation/technical extraction particularly where zero fully detailed source audits remain: quantum processes (now one), topological field/gauge (string-net as a conditional quantum Hamiltonian example), stochastic master-equation processes, chemical constrained operators, nonlocal gravitation and causal-set continuum operators. Preserve actual cited equations and assumption burden per original paper. Do not put new physical dynamics in the original generator to match a published model. Expand the corpus *only* for distinct papers or formal mechanisms not already represented under aliases; prioritize papers with known surprising negative results.

**Research integration:** Once a frozen source-equation corpus has covered the relevant relational transition families and independently justified search saturation, design a **separate, read-only common structural comparison observer** that can compare true native k-way bit guard/action/offspring/occurrence rules to each paper's typed process. Specify whether the preserved object is actual micro-rewrite, an observable moment, a Markov coarse state, or a full admissible intervention family. A match at one level is not a match at every level.

No new original Causal Step simulation or physical correspondence assertion occurred. The two founding provisional premises and frozen T1–T4 evidence remain unchanged, with no main, Woit/Lisi or qualified specification changes.

## 9. Supplemental physics-conditional original equations

A further original-PDF inspection supplied two **equation-level sources** recorded in [batch 04](../references/2026-10-14-priority-primary-equation-extraction-batch-04.json) and indexed in [v0.6](../references/2026-10-14-cross-domain-comparison-corpus-v0.6.json).

**[Bianconi, *Quantum entropy couples matter with geometry* (2024)](https://doi.org/10.1088/1751-8121/ad6f7e).** Original arXiv-v4 Eqs. (1), (8)–(11), and (20)–(21) explicitly begin with a **preselected two-dimensional cell complex** carrying cochains over nodes, edges and faces, an **assumed positive-definite Hermitian metric matrix**, and a metric/gauge-dependent Dirac operator. Two action variants contain matrix-log/trace relative-entropy-like terms. The author chooses a three-dimensional lattice separately for a specialized example; topology remains fixed in this framework, while dynamic topology variation is noted as future work. Consequently an unordered, bit-mutating Causal Step occurrence cannot be promoted to an oriented cell, a quantum spinor or the given metric without independent mathematical definitions and a faithful transfer.

**[Oreshkov–Costa–Brukner, *Quantum correlations with no causal order* (2012)](https://doi.org/10.1038/ncomms2076).** Original preprint Eqs. (4)–(6) specify a positive process matrix W whose generalized Born probabilities are normalized for local **CP/CPTP quantum instruments** on supplied Hilbert input/output spaces. A causally separable mixture of definite orders is a special case. The native simulator's one-at-a-time **classical rewrite scheduling and state-sensitive T4 conflicts do not establish quantum causal nonseparability**; the local quantum probabilities/Hilbert operator model have not emerged from our rules.

**Attribution and metadata correction:** The original [2026 IOP higher-order roadmap](https://doi.org/10.1088/2632-072X/ae3c4e) lists **Aida Abiad** as first author, followed by Alex Arenas and Ágnes Backhausz et al. The earlier broad seed mislabeled its lead author as Bick, a different coauthor. The corrected [v0.6 record](../references/2026-10-14-cross-domain-comparison-corpus-v0.6.json) preserves previous source identity/erroneous attribution as provenance. The LMCS moment-bisimulation source's DOI was likewise corrected against the journal original to **10.23638/LMCS-16(3:3)2020** in batch 02.

**Scope:** The current source-depth count is **16 newly extracted original works plus two earlier pilots = 18 independently named papers**, represented on **21** bibliography rows because some are recorded through multiple versions or aliases. These are scoped mathematical definitions/theorem statements, **not complete rederived external proofs** and **not any faithful map to native Causal Step transitions**. The survey still has no qualified search saturation, native dynamical cross-theory equivalence, or physical-emergence result.
