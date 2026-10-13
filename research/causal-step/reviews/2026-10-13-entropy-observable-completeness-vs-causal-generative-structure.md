# Completeness of entropy formulations when reconstructing causal generative structure

**Researcher-originated question:** 2026-10-13, Joshua Oshiro.  
**Status:** Independent AI-assisted mathematical/scientific **comparative research and exact finite null test**. It establishes no novel physical mechanism or causal-holographic correspondence.  
**Prior context:** [2026-10-13 topology/holography audit](2026-10-13-topology-holography-causal-hypergraph-source-audit.md) and [researcher's narrower interpretation of Bao et al. 2022](../DISCUSSION_LOG.md).  
**Core guard:** No primitive physical entropy, metric, spatial dimensionality, quantum Hilbert structure, causal-order operator, or gravitational law is inferred from an abstract cut function.

## 1. Exact research question and intellectual source

The researcher asks whether **existing formulations of entropy in topology and holography might be mathematically sound, widely interoperable and predictively useful yet incomplete for identifying a causal-network foundation**. Motivating comparison: the recently announced Navier–Stokes Millennium Prize forced-breakdown work and the researcher's independently studied five-track/“FiveRows” structure, in which energy accounting and the constructive obstruction mechanism occupy different roles. The research question is not “entropy is wrong” or “the present causal network already generates quantum gravity”; it is whether a **missing structural role or omitted observable** could frustrate a comparison of theories that nonetheless largely agree where measured.

The user’s complete wording is preserved separately in the [research discussion log](../DISCUSSION_LOG.md). Researcher interpretation of “entropy” as a possible primitive organizing/back-pressure principle is explicitly **different from** Shannon entropy, von Neumann entropy, quantum relative entropy, RT/QES geometric area, hypergraph cut functions or topological entanglement entropy. **No substitution across these definitions is authorized.**

## 2. Three distinct meanings of completeness

Let \(G\) be a mathematically specified causal generative network state (higher-order incidence, node labels or states, provenance/order and rewrite laws, when relevant) and \(\Phi(G)\) a **chosen set of entropy observables**. Fix an intended equivalence criterion \(\sim\) between underlying states.

1. **Formal correctness within a model:** Does \(\Phi\) satisfy the equations, proofs, inequalities and physical comparisons **for the theory's published input assumptions and observables**? A sound model can be correct without exhaustively characterizing its inputs.
2. **Observational sufficiency:** Is the chosen family of observables sufficient for the particular predicted or measured properties of interest? Two distinct underlying states may give identical \(\Phi\) yet differ under unmeasured operators, braiding, dynamical response or state preparation.
3. **Generative/reconstructive completeness:** Do \(\Phi\)'s values determine the equivalence class of the underlying generating system? This strong requirement is **not normally claimed** by entropy theory, but it matters if the research target is reconstructing origins.

Formally, \(\Phi\) is **separating** modulo \(\sim\) on a specified domain \(\mathcal G\) when

\[
\Phi(G_1)=\Phi(G_2)\quad\Longrightarrow\quad G_1\sim G_2
\quad \text{for all }G_1,G_2\in\mathcal G.
\]

Failure of this condition is **not** a flaw unless separating capacity was part of the theory's promised role. If the equivalence criterion includes future causal behaviors, a pair with identical entropy values but different admissible downstream rewrites witnesses the loss of behaviorally relevant structure through the observer map.

This distinction is useful for IsoGraph's original “invariant content under specified equivalence” task: the **same numerical invariant** across two descriptions establishes only agreement **on that invariant**, not full structural equivalence. “Clean integration” is evidence for the scoped relationship, not completeness of the total generating representation.

## 3. Concrete precedents: successful entropy observables with distinct physical structures

### 3.1 Topological entanglement entropy does not classify topological orders

Kitaev & Preskill, [*Topological Entanglement Entropy*](https://doi.org/10.1103/PhysRevLett.96.110404), *PRL* 96 (2006), derive \(\gamma=\log\mathcal D\), with \(\mathcal D=(\sum_a d_a^2)^{1/2}\), in the specified gapped 2D ground-state setting.

The toric-code and double-semion models each have four Abelian anyon sectors (\(d_a=1\)); thus both have \(\mathcal D=2\) and **the same \(\gamma=\log 2\)**. They are nonetheless **distinct topological phases with different braiding/topological-spin data**, as described e.g. by [*Boundary Topological Entanglement Entropy in Two and Three Dimensions*](https://doi.org/10.1007/s00220-021-04191-y) and the distinct toric-code/double-semion mutual statistics discussed in [Wildeboer–Seidel–Melko 2017](https://doi.org/10.1103/PhysRevB.95.100402).

**Meaning:** A correct universal entropy coefficient is an **incomplete phase classifier**, not an erroneous formula for the coefficient. Full structural discrimination needs richer data (braiding and fusion maps, not merely a scalar entropy).

### 3.2 Holographic area entropy admits additional quantum contributions

Faulkner, Lewkowycz & Maldacena, [*Quantum Corrections to Holographic Entanglement Entropy*](https://arxiv.org/abs/1307.2892), *JHEP* (2013), computed leading one-loop bulk entanglement corrections to the classical geometric RT expression. Engelhardt & Wall, [*Quantum Extremal Surfaces: Holographic Entanglement Entropy Beyond the Classical Regime*](https://doi.org/10.1007/JHEP01(2015)073), *JHEP* (2015), proposed extrema of generalized entropy, incorporating the area and bulk quantum entropy in an expanded framework.

The area term is a valid **leading-order quantity within its regime**, not a complete answer at arbitrary quantum order. **Scope correction:** This is an *order-by-order refinement* of a holographic prescription, not experimental proof that a causal generator or an entropy-like organizing force is missing.

### 3.3 Distinct observables carry additional quantum relations

Jafferis, Lewkowycz, Maldacena & Su, [*Relative Entropy Equals Bulk Relative Entropy*](https://doi.org/10.1007/JHEP06(2016)004), *JHEP* (2016), connect relative entropy and modular flow in bulk and boundary within a controlled perturbative gravitational regime. The state-relative and modular-operator information cannot be inferred simply by knowing one scalar von Neumann entropy.

These refined/extended observables do **not** automatically give a complete theory either, but they demonstrate that holographic reconstruction uses more than an area or entropy-cone vector alone.

### 3.4 Overlapping entropy inequalities need not specify a unique geometry

Naskar & Samal, [*Topological Entanglement Entropy Meets Holographic Entropy Inequalities*](https://doi.org/10.1103/hvf8-jcff), *PRD* 114 (2026), establish that quantum entanglement entropies for specified non-gravitational, gapped topologically ordered 2D ground states satisfy **holographic entropy inequalities**. A shared set of inequalities is **not sufficient evidence** for a unique AdS gravitational bulk.

Bao, Cheng, Hernández-Cuenca & Su [*A Gap Between the Hypergraph and Stabilizer Entropy Cones*](https://arxiv.org/abs/2006.16292) likewise exclude six-qubit stabilizer entropy vectors from the **chosen weighted hypergraph min-cut entropy class**. Their 2022 [topological-link paper](https://doi.org/10.22331/q-2022-06-20-741) exhibits a link-min-cut entropy vector not produced by that model. Neither theorem restricts **all representational or computational capacities of an arbitrary causal hypergraph**.

## 4. Executed exact null example: complete terminal cut vectors can conceal higher-order rewrite capability

A new [source script](../experiments/2026-10-13-entropic-observer-incompleteness-witness.mjs) calculates min-cut costs for **every** subset of the four designated terminals \(\{A,B,C,P\}\) in two genuinely higher-order hypergraphs. It exhaustively minimizes over all binary side choices for unobserved interior vertices.

- **Network H0:** four terminals and one weight-1 rank-4 hyperedge \(\{A,B,C,P\}\).
- **Network H1:** identical exterior weight-1 rank-4 edge, **plus** internal vertices \(x,y\) and a weight-2 rank-3 hyperedge \(\{A,x,y\}\).

For any terminal-side assignment, choosing \(x,y\) on the **same side as terminal A** incurs **zero** cost for the extra rank-3 edge. The original rank-4 edge ensures the old cut's cost cannot be lowered. Consequently the two models have **exactly the same entire 16-entry four-terminal min-cut entropy vectors**: zero for empty/full and one for every other terminal subset. Yet H0 and H1 differ in their higher-order incidence and in whether the pattern \(\{A,x,y\}\) is present to enable a possible separate, declared three-way rewrite.

This is a mathematical **non-injectivity counterexample for the specified full terminal min-cut readout**. It does not claim the internal vertices are physically observable or that a quantum entropy formula is wrong. One should not identify structural inequality with physical inequivalence without an independent equivalence criterion.

**Execution verified:** self-contained JavaScript source run against all **16** terminal assignments, with internal minimization (4 assignments when x,y present), and assertions for every cut and rewrite-pattern distinction. [Frozen machine-readable result](../experiments/results/2026-10-13-entropic-observer-incompleteness-witness.json). Repeating the experiment requires no physics simulator or entropy-force modification.

## 5. Specific analogy with the recent Navier–Stokes work (do not overclaim)

The Causal Step researcher is referring to the **September 2026 announced forced Navier–Stokes breakdown results** and to independently reconstructed five-row/finite-dimensional obstruction accounting in the [IsoGraph Navier–Stokes F05 FiveRows discussion](../../navier-stokes-proof/DP_DISCOVERY_0_2_FRESH_COMPARISON.md). That local discussion describes a **recurring five-row moment/debt interface** spanning base repair, correction-state rank, defect cancellation, chart transport and scaling. It is **not** verified as five independent finished solutions.

The [IsoGraph Reduced Formula G6](../../navier-stokes-proof/REDUCED_FORMULA_0_2.md) identifies **finite-energy closure as a separate downstream obligation**, using an energy-balance inequality and Gronwall-like estimate, rather than the geometry/oscillation/defect-cancellation engine generating the particular singular behavior. The distinction between **carrying a validity constraint** and **being the dynamical driver** is a fair conceptual analogy. It would be incorrect, however, to call the finite-energy condition redundant: it is a **load-bearing admissibility hypothesis** in the official whole-space alternative C.

**Public status (as of 2026-10-13):** On September 11 the Clay Mathematics Institute [acknowledged an announced Navier–Stokes result as “apparently settled”](https://www.claymath.org/news/navier-stokes-announcement/) but stated the evaluation and assignment of credit were still ongoing. The current CMI problem listing labels Navier–Stokes **Active**, not an officially awarded/resolved problem. The September announcement concerns the **smoothly forced breakdown alternatives C/D**, not resolution of unforced global regularity A/B. This source-status clarification is independent of whether the mathematical work will later be fully accepted.

**Inference boundary:** One carefully separated role in another proof does **not** demonstrate that physical entropy is a passive bookkeeping convention. It does justify *testing* that possibility rather than assuming every entropy-like quantity causes the structures it measures.

## 6. How an apparently correct entropy model could hinder Causal Step comparison

There are **three distinguishable explanations for a failure to match** a causal network to known entropy/holography:
1. **Missing observable:** a many-to-one entropy readout discards k-way causal provenance, internal topological motifs, temporal ordering, response to interventions or quantum phase information. The underlying system and its physical output could be correct, but the selected comparison map is not sufficiently discriminating.
2. **Missing model assumption or higher-order term:** a classical/leading-order holographic area formula needs known quantum corrections, boundary choices, etc. The mathematical comparison may be performed outside the validity domain of the model.
3. **Insufficient candidate network:** the causal rewrite system may genuinely lack quantum state composition, locality, field operators, genuine topology, relevant conservation constraints or enough productive complexity.

None of those diagnoses follows from a superficial failure to align equations. Use **complete comparison**, exactly declaring the equivalence criterion and every extra primitive/assumption and readout on both sides.

A proposed next research test (NOT executed): run original causal hypergraph rules unchanged, record event-provenance and k-way incidences, and attach an **independent observer-only cut readout**. Construct matched interventions that leave cut vectors unchanged but alter future rewrite eligibility, and test both configurations under identical rule/seed/scheduler. Candidate observables can then be added **one at a time**: incidence motifs, ordered event intervals, cut vectors over different terminal sets, local state-change and operational-recovery measurements. If an added observable separates structures previously identified by the entropy readout, that locates a **specific information-loss channel**.

A separate observer-vs-driver ablation should verify whether any candidate “entropy pressure” term enters the **update rule** or is only calculated after events. **The current no-metric causal rewrite experiments do not use a physical entropy force**. Thus matching a cut entropy observable at snapshots cannot establish entropy as the primitive organizing law the researcher is independently considering.

## 7. Current research judgment

- **Established:** Entropy-only readouts can be insufficient to distinguish physical/topological phases; higher-order observable/quantum corrections exist in holography; the same holographic inequalities can arise in a non-gravitational topological setting; selected hypergraph min-cut entropy representations have proven incompleteness relative to other entropy model classes; our exact constructed network pair has the same full terminal min-cut vector but different internal k-ary structure.
- **Not established:** That the holographic QES/JLMS framework is mathematically wrong or physically incomplete within its specified observables; that standard entropy laws miss a new fundamental force; that causal hypergraph dynamics reproduce the Standard Model, dimensional spacetime or black-hole horizons; or that any shared numerical cut pattern constitutes a uniquely identified common physical structure.
- **Most informative next action:** Treat **informational completeness of the chosen comparison map** as an independent falsification gate; do not let a possibly lossy entropy observable dictate what a foundational causal network can contain or how it must evolve.

**Provenance:** The completeness worry, motivation from a carried-versus-dynamical quantity, and proposed comparison with causal hypergraphs originate with Joshua Oshiro. Source research, the three-completeness distinction, the exact all-terminal cut counterexample and experimental test design are AI-assisted. Third-party results are attributed to their original authors, with no new claims of mathematical or physical discovery.

## Appendix: internal model equivalence and selection (2026-10-13)

**Researcher-specified decision problem:** A prior model may calculate correct outputs while failing to preserve the actual internal causal processes. The comparison must therefore be *model-to-model*, not merely observable-to-observable. Never call alternative formulations equivalent without specifying exactly which structure/operations and assumptions are preserved.

### Levels of correspondence (not interchangeable)

**L0: formal resemblance.** Same notation or analytical form, e.g. `-Tr rho ln rho`, but the `rho` operands denote different constructions.

**L1: genuine derivation.** One quantity is computed within the same underlying theory from states and regions, e.g. Kitaev–Preskill `gamma` from quantum-state entanglement entropies.

**L2: equal observable images.** Two distinct representations generate the same set of entropy vectors, or one is a proper subset of the other, for a specified number of parties. The identity of outputs does not guarantee a correspondence between states, internal relations or transformations.

**L3: controlled approximate physical mapping.** A stated quantum or semiclassical construction reproduces the other framework's entropy in a proven expansion or asymptotic limit, with correction terms and an applicability domain.

**L4: compositional structural equivalence.** A map preserves and—under the chosen relevant equivalence—can reconstruct relationships, k-way interactions, boundary/interior partitions, orientations and operator composition without hidden auxiliaries that change the claim.

**L5: mechanism/process equivalence.** A proposed state map `F:X→Y` preserves dynamical steps `F(T_X(s)) ~ T_Y(F(s))` for an explicitly stated `~`, including the allowed interventions and system histories; a reverse simulation or counterexample search must test that no relevant mechanism is lost. This is more demanding than L2 and cannot be inferred from entropy cones.

**L6: physical correspondence.** The common structure predicts additional independent observables beyond those used to construct the map, against realistic null models; agreement must not result from chosen boundary conditions or built-in update rules.

### Concrete equivalence audit

| Models | Actual warranted relationship | Internals that are not thereby shared |
|---|---|---|
| **Physical quantum von Neumann S; topological entanglement gamma** | `gamma` is an invariant derived from von Neumann subsystem entropies in gapped 2D topologically ordered phases (L1). | One gamma does not determine quantum statistics/braiding, full state, or its Hamiltonian. |
| **Physical quantum S; higher-order Hodge spectral S** | Same trace functional applied to different constructed matrices (L0). Baccini–Geraci–Bianconi use `rho_n=exp(-beta L_n)/Tr exp(-beta L_n)` for a chosen weighted simplicial complex, not necessarily a physical reduced quantum state. | Boundary maps/face closure, weight choices, beta and Laplacian spectra are not a Hilbert-system entanglement mechanism. |
| **Static RT surface entropy; weighted graph cuts** | Equivalent entropy-vector *cones* in the Ryu–Takayanagi classical static framework (L2); graph models encode cutting/gluing relations. | Graph edges do not become microscopic bulk causal events, fields or geometry dynamics. |
| **Graph-cut; higher-order hypergraph-cut** | Same general minimum-cut scoring idea, but rank≥3 hyperedges extend the set of possible entropy vectors. | A hyperedge is not interchangeable with its pairwise clique; neither static cut rule defines event evolution or quantum phase. |
| **Hypergraph-cut; stabilizer quantum entropies** | Entropy cone equality at up to four parties; Walter–Witteveen prove general weighted hypergraph mincut vectors approximable by stabilizer entropies up to overall scale, while higher-party equality is disproved. | Quantum Hilbert state, stabilizer operators and tensors are extra ontology; matching entropy vector does not imply same quantum time evolution. |
| **Hypergraph-cut; topological-link cut** | Link model attains entropy vectors, e.g. five-party ray15, excluded by an inequality for the chosen hypergraph min-cut model. | Does not establish any impossibility for general hypergraph causal computation. Link model assumes embedded loops in 3D and a different cut procedure. |
| **RT vs FLM / quantum extremal surface** | Same holographic physical program at different orders/approximations (L3), quantum entanglement contributes to generalized entropy. | An area-only leading term does not contain all subleading quantum correlations. |
| **Bianconi network-metric relative entropy vs quantum S or graph mincut** | Different proposed action using a quantum-relative-entropy-shaped functional of two geometry/matter-induced metric operators. It is not the same operand or numerical observable as subsystem entanglement or terminal mincut. | Requires geometry (and fields) as given inputs; modified field equations are a postulated dynamical extension rather than a pre-geometric rewrite derivation. |
| **Causal-set spacetime entropy vs quantum state theory** | Uses Wightman and commutator correlators of a chosen field on a chosen causal order, with cutoff/truncation dependence; same physical quantum objective in a different setting (L3 only under stated mapping). | Quantum field/correlations and known spacetime background in test cases are not derivable from the poset alone. |
| **Quantum relative entropy / multitime process tensor vs scalar entropy** | They supply additional state distinguishability, modular data or response to interventions. These are distinct enriched observers within specified quantum setups, not new primordial entropy laws. | Operational equality for a limited intervention family still does not identify unique inaccessible microscopic environments. |

**Concrete within-the-same-quantum-theory witness:** `|0><0|` and `|+><+|` both have physical von Neumann entropy `0` but give different `Z` measurement probabilities: `P(0)=1` vs `1/2`. Even a correct microscopic entropy functional is not injective as a state readout. The already executed [all-terminal hypergraph cut counterexample](../experiments/results/2026-10-13-entropic-observer-incompleteness-witness.json) shows a parallel problem when distinct internal higher-order interactions have identical entire boundary-cut vectors.

### Provisional starting choice, separated by research goal

**Most physically secure entropy target:** the established quantum state/operator algebra framework, beginning with physical subsystem **von Neumann entropy** and **relative entropy**. It defines what many of the other entropy papers are trying to reproduce. However, the entropy functions do not themselves define causal evolution; add state evolution and operational interventions if comparing physical mechanism. [Jafferis–Lewkowycz–Maldacena–Suh 2016](https://doi.org/10.1007/JHEP06(2016)004) and [Pollock et al. 2018](https://doi.org/10.1103/PhysRevLett.120.040405) illustrate richer comparisons, each with their own inputs.

**Closest source-level structural competitor:** a causal order and stateful higher-order event-rewrite history itself. If developing topology, the Major–Rideout–Surya **antichain/nerve homology** path is more naturally organized around causal precedence than entropy minimization, but its continuum-recovery theorem assumes manifoldlikeness. The Sorkin–Yazdi causal-set entropy requires an independently specified quantum field/correlation prescription. No existing cut-cone theorem shows either is the world's fundamental mechanism.

**Best inexpensive observable, not primary ontology:** weighted **hypergraph min-cuts** and optional Hodge spectral diagnostics, explicitly declaring boundaries, hyperedge weights, simplicial closure and normalization as presentation choices. Their exact tractability makes them good *falsifiers* for purported model equivalences; this is not evidence that nature evolves by minimizing cuts.

**Not recommended at the primordial stage:** extending Bianconi's given-metric gravity-from-entropy action, RT/QES with already-established bulk, or pre-embedded topological-link entropy into the foundational update law. Those import structure that Causal Step is seeking to derive.

**Decision gate before declaring two models 'the same':** freeze states/primitive relations, admitted source-to-target map, equivalence criterion, observers, transitions, interventions and physical domain. Test output agreement and diagram commutation **separately**; use matched counterexamples where one representation's entropy cannot distinguish states that have distinct future causal behaviors. No adopted physical entropy force or new third Causal Step premise results from this review.
