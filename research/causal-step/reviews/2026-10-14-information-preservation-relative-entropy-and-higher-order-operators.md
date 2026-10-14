# Causal Step — information preservation, classical recovery, and higher-order incidence operators

**Research cycle:** 2026-10-14 (America/Los_Angeles)  
**Track:** Causal Step on permanent `research/causal-step` branch, independent of Woit and Lisi  
**Human direction:** Joshua Oshiro — compare existing genuinely higher-order causal relational patterns with outside foundational physics without presupposing geometry, quantum states, a fundamental clock or a predetermined level of difficulty.  
**AI-assisted contributions:** source-claim audit, source-compatible exact finite comparator, independent controls, alternative observer ranking, code/evidence and documented interpretation.  
**Status:** **executed exact finite mathematical research and external-theory comparison**, not physical mechanism verification or a qualified IsoGraph theorem.

## 1. Original scientific question and decisive scope boundary

The supplied October 2026 news/physics synopsis brought together AdS/CFT, holographic quantum error correction, tensor networks, quantum relative entropy, Bianconi's entropy/gravity approach, and Dorau–Much's 2026 semiclassical Einstein-equation argument. These are **different frameworks** with different input assumptions. An apparent common use of the word *information* is not itself a structural isomorphism.

Continue the priority from [the existing T3 exact higher-order intervention witness](2026-10-13-t3-causal-order-interval-observer-noninjectivity.md) and [T4 operational concurrency/coherence](2026-10-13-t4-operational-concurrency-higher-order-coherence.md): find what an observer retains, what it irreversibly loses and which extra operational or higher-order information would permit recovery. Do not elevate finite sampled graph data to quantum physics or a cosmological explanation.

**Critical declared model distinction:** The new experiment is the **directed AND-input comparator constructed in T3**, not a rewrite of the original **unordered rank-k, bit-mutating, hyperedge-growing native generator**. Five named source ports feed one named target. A rank-4 event occurrence has three *jointly required* source inputs. Three distinct occurrences are alternative paths to enable the target. This makes all 32 source-activation subsets and all 120 three-occurrence models enumerable. The T3 original source file Git blob is **`2bad02a08ccf8bccf0e6e73216dcb63fe9365e7f`**.

New source: [standalone Node/V8 finite experiment](../experiments/2026-10-14-classical-recovery-and-incidence.cjs). Actual execution: [machine-readable full result with source-blob pin](../experiments/results/2026-10-14-information-recovery-and-incidence-exact.json). The original T3 witness is recreated internally and checked by exact source degree, source-mask, six differing intervention cases, and Gram polynomial controls. Independently implemented Python `itertools` checks reproduced the 120-model and four-orbit counts, six intervention masks, Gram polynomials, and **minimum nine probes / ten optimal subsets**. The committed standalone Node CLI was prepared, but **not separately executed**; the actually executed path used a local V8 isolate.

## 2. Exact finite observation and recovery test

### Full operational source versus identical pairwise causal shadow

Fix labeled source ports a,b,c,d,e and target x.

- **H0:** abc→x, abd→x, abe→x.
- **H1:** abc→x, ade→x, bde→x.

Every event is one **three-input conjunction**, and the target is enabled when **at least one** of the three event input sets is fully present (OR). H0 and H1 each have **three distinct rank-4 occurrences**, all five source ports link to the same sink in their naive binary causal shadow; their **complete pairwise causal order is identical**. However, 6 of 32 possible named-source subsets give different target-enable responses: `abd`, `abe` favor H0; `ade`, `bde`, `acde`, `bcde` favor H1. H0 enables 7 of 32 masks, H1 enables 9 of 32.

For a uniformly chosen source-subset intervention I and deterministic observed enablement bit Y, the two **joint distributions** P_H(I,Y) differ in total variation **6/32 = 0.1875**. If the model is represented only by the identical binary causal-order shadow, the remaining structure cannot distinguish them. The order-equality is scoped to the defined projection; it does not assert that either mechanism has a physical causal spacetime metric.

### Artificial noise and finite classical KL divergence

The deterministic P and Q have disjoint support at each mask where their enabling outputs differ. Consequently **D_KL(P||Q) is infinite** despite finite total variation. To test finite information loss, the experiment declares a **purely observer-side binary output flip probability** η = 0.1, 0.25 or 0.5. This is not a physical randomness/entropy law, and it is not installed in the simulator's source dynamics.

At η = 0.1, the **full** pair `(I,Y)` has

\[
 \operatorname{TV}(P,Q)=(6/32)(1-2\eta)=0.15,
 \qquad
 D_{\rm KL}(P\Vert Q)=
 (6/32)(1-2\eta)\ln[(1-\eta)/\eta]
 \simeq 0.329584\ {\rm nats}.
\]

The exact numeric results for progressively lossy **deterministic observers** are:

| Declared observer | Cells | Total variation | Relative entropy in nats | Exact shared reference recovery of both distributions? |
|---|---:|---:|---:|---|
| Full named intervention and response | 64 | 0.150 | 0.329584 | **Yes** |
| Every 3-source probe separately plus all other masks pooled with response | 22 | 0.150 | 0.228507 | **No** |
| Only number of active sources and response | 12 | 0.050 | 0.054360 | **No** |
| Response alone | 2 | 0.050 | 0.005868 | **No** |
| Named source input but no response | 32 | 0 | 0 | **No** |
| The constant complete binary causal shadow | 1 | 0 | 0 | **No** |

The **equal 0.15 TV of the full and three-source-pooled observers is a meaningful negative control**: equality of one scalar distinguishability measure for a pair does **not** establish complete sufficiency/recoverability. Their KL divergences differ and the reference recovery map fails to reconstruct the original distribution after the pooling.

For a deterministic readout T with finite strictly positive source reference Q, the program explicitly verifies for **each observer and each η** the classical chain identity:

\[
D(P\Vert Q)=D(TP\Vert TQ)+
\sum_z P_T(z)\,D(P(X\mid z)\Vert Q(X\mid z)).
\]

The loss term is nonnegative. For the classical reference-based inverse `R_Q(x|z)=Q(x)/Q_T(z)` within each fiber `T(x)=z`, exact recovery of P and Q requires the source conditionals to agree in every observed fiber. The program checks this by reconstruction and total variation. The η=0.5 control makes P=Q and all divergences zero; it is a **trivial indistinguishability case**, not a recovery of mechanism labels.

This finite classical sufficiency statement is mathematically analogous in *role*, not in quantum formalism, to [Dénes Petz's 1986 sufficiency result](https://math.bme.hu/~petz/pdf/29suff.pdf). Petz's von Neumann algebra theorem has an **operator-algebraic hypothesis** and its recovery meaning cannot be borrowed as a quantum result without a Hilbert-space state/channel construction.

### Exhaustive 120-model test: hypotheses, labels, and minimal sufficient probes

There are exactly \(\binom{\binom{5}{3}}{3}=\binom{10}{3}=120\) choices of three distinct rank-4 input-event occurrences. The program exhaustively enumerates **all** of them.

- **120/120** have distinct **full 32-mask binary intervention truth tables**; no two named source mechanisms in the stated family have identical complete observable response.
- Among **7,140 distinct model pairs**, **4,980** have exactly the **same full labeled binary causal-order shadow** but differing complete intervention responses. The 120 models have only **six** different labeled source-support shadows; 100 models share all five input→target links.
- Any source-activation subset with fewer than 3 active ports always disables the target; activating all 5 always enables it. Thus the **only informative single-shot deterministic interventions** for this family are the 10 three-port and 5 four-port masks.
- Exhausting **every one of the 2^15 subsets** of these 15 possible nonadaptive probes gives **minimum 9** masks needed to identify **all 120 named three-occurrence mechanisms**; **10** distinct nine-mask sets achieve that minimum.
- This is **hypothesis identification in an explicitly bounded and known class**, not full-state quantum error correction. It does not establish any recovery guarantee if rank, event number, hidden states, target interpretation or permitted physical interventions differ.

## 3. Exact incidence operator and topology control

The simple typed source-by-event incidence matrix for the H0/H1 mechanisms is a 5×3 matrix B with B_{i,e}=1 when source port i is a joint participant in event e. Compute a **plain combinatorial Gram matrix** \(K=B^\mathsf{T}B\), recording the overlap counts between the three event occurrences. This needs **no metric, spacetime dimension, quantum state or oriented cell structure**.

For the same binary-shadow H0/H1 pair, the exact matrices are

\[
K_0=\begin{pmatrix}3&2&2\\2&3&2\\2&2&3\end{pmatrix},
\quad
K_1=\begin{pmatrix}3&1&1\\1&3&2\\1&2&3\end{pmatrix}.
\]

They have distinct **exact characteristic polynomials**:

\[
\det(\lambda I-K_0)=\lambda^3-9\lambda^2+15\lambda-7,
\]
\[
\det(\lambda I-K_1)=\lambda^3-9\lambda^2+21\lambda-13.
\]

So a source-agnostic operator **derived from genuine joint incidence** distinguishes two mechanisms that the complete binary causal order cannot. It is not automatically physically meaningful, but it is a **concrete representational improvement**.

**Distinct null:** Declare instead a *bipartite incidence graph* with five source vertices, three typed event vertices and nine participant links. Treat that **observer construction** as a 1-dimensional graph cell complex with no 2-cells. Both H0 and H1 are connected and therefore share

\[
(b_0,b_1,b_2)=(1,2,0),\quad b_1=9-8+1=2.
\]

Thus these standard **graph homology counts** fail to distinguish the original pair even though the incidence Gram spectra distinguish them. Neither is a substitute for their k-way enabling semantics. Calling each k-way event a simplex with all its downward faces would add structure not yet justified by the source.

### Labels versus abstract isomorphism — essential control

Exhaustive permutation of all five **source labels** (120 relabelings) gives **four unlabeled isomorphism classes** among the 120 named models, with orbit sizes **10, 20, 30, 60**.

- The ordinary incidence Gram characteristic polynomial has only **three** values, so **two nonisomorphic abstract hypergraph types have the same spectrum**. Spectral equality alone is insufficient for *unlabeled* reconstruction in this small family.
- In this unusually small three-occurrence hypothesis class, combining Gram polynomial with the **full binary shadow**, or merely the declared bipartite graph homology class, **does separate the four unlabeled isomorphism classes**. This is an exhaustive **finite-class** positive result and must not be extrapolated to arbitrary hypergraph rank, incidence multiplicity or dynamics.
- Still, **2,280** pairs of *distinct named models* have the **same complete binary shadow and same Gram polynomial** but differ on named-port interventions. They are not necessarily nonisomorphic when labels may be freely permuted. Source-label symmetry and fixed operational input-port identity are **different equivalence criteria**, and the result records both rather than treating a harmless relabel as a physical distinction.

### Why this is not already Bianconi's discrete gravity

Ginestra Bianconi's [*Quantum entropy couples matter with geometry*](https://doi.org/10.1088/1751-8121/ad6f7e) studies **cell complexes**, with boundary maps among actual cell ranks, topological spinors, **metric-dependent Dirac operators**, and a **positive-definite metric matrix**. Its action uses a geometric generalized relative-entropy construction with additional matrix/volume terms. The current K=BᵀB is merely a binary typed-incidence overlap operator. Even if positive definite in this three-edge toy, **it is not the paper's dynamical metric, Dirac operator, density matrix or curvature**.

A genuine Bianconi-style operator bridge would need to:

1. Identify precisely what **cells**, their oriented boundaries and boundary-of-boundary identity mean for a source-native **hyperedge occurrence that fires, mutates bits and creates descendants**. The naive AND-event-to-simplex choice is not yet faithful.
2. Specify every extra relation the representation **introduces** (face closure, metric blocks, spin/gauge structure, boundary/coboundary, signs and dynamics). Show the original k-way event occurrence, event provenance, source-bit predicates and composition can be **reconstructed** or explicitly retain a residual.
3. Re-test T4's **83 state-dependent pairwise independence signatures** and **660 three-event composition failures**. Static incidence, even with its Gram or Hodge spectrum, cannot by itself determine all these state-dependent rewrite relations.
4. Only then consider physically motivated metric/quantum field hypotheses; no ad hoc entropy-pressure gradient or imposed 3D lattice.

The existing [detailed 2026-10-12 Bianconi audit](2026-10-12-bianconi-gravity-from-entropy-comparison.md) remains valid and historically untouched. Note that Bianconi's separate continuum [*Gravity from entropy* (2025)](https://doi.org/10.1103/PhysRevD.111.066001) **already starts with a Lorentzian metric and matter** and must not be confused with a proven pre-spacetime construction.

## 4. Quantum relative entropy and holographic recovery: actual hypotheses

[JLMS (2016)](https://doi.org/10.1007/JHEP06(2016)004) relates **boundary and bulk quantum relative entropies of nearby states** in a specified AdS/CFT construction **to leading order in the bulk gravitational coupling**, with an entanglement-wedge interpretation. [HaPPY holographic codes (2015)](https://doi.org/10.1007/JHEP06(2015)149) use deliberately constructed maximally entangled tensors and **bulk-to-boundary isometries**. They provide precise reconstructability structures, **not** a theorem that the existence of a combinatorial information-loss/recovery calculation implies holographic gravity.

[Dorau–Much, *From Quantum Relative Entropy to the Semiclassical Einstein Equations* (2026)](https://doi.org/10.1103/lmq8-nsty) computes a coherent scalar-field relative entropy on bifurcate Killing/local Rindler horizons and combines it with a **Bekenstein–Hawking entropy–area assumption** to recover semiclassical field equations. Thus **horizons, quantum fields and a local spacetime background are already input assumptions**. This is a later *effective-bridge* comparator, not a zero-structure microgenesis proof.

**Distinct vocabulary and object audit:**

| Construct | Actually available from Causal Step | Not available without additional derivation |
|---|---|---|
| Distinct genuine k-way event occurrence, source bit state, event provenance | Yes, in the original finite higher-order simulator | Full physical event ontology |
| Declared intervention response and arbitrary classical probability ensemble | Yes, as investigator-defined experiments | Natural quantum ensemble, unique quantum measure or stochastic law |
| Classical total variation / KL / deterministic data-processing identity | Yes, for the specified finite probability models | Quantum Petz channel/sufficiency |
| Participant-event incidence B and combinatorial Gram K | Yes, for a declared typed event construction | Canonical cell-complex boundary/metric/Dirac operators |
| Graph-complex Betti numbers after explicit bipartite replacement | Yes, observer-only and potentially lossy | Physically derived spatial topology |
| Quantum relative entropy and holographic code subspace | **No** | Positive quantum density/algebra states, admissible CPTP map, boundary/bulk dictionary and recovery |
| Semiclassical Einstein equations | **No** | Physical metric/curvature, matter stress tensor, horizons, entropy–area relation, continuum limit, independent empirical tests |

## 5. Candidate choices ranked by assumption burden and immediate discrimination

| Candidate next research bridge | Evidence already present | Main falsifier / gap | Disposition |
|---|---|---|---|
| **C1 — classical state/transition distinguishability on original T4 native rules** | New full finite recovery/observability result and source's 83 state-sensitive pair classes | Same readout but genuinely different native legal rewrite/intervention behavior | **FIRST**: fewest new assumptions, exact negatives available |
| **C2 — typed event incidence and operator invariants** | H0/H1 split by exact K spectrum despite same binary order, four small isomorphism types fully audited | Collapse of event identities, source bits, directional port roles or 660 T4 higher-composition controls | **SECOND**, in parallel with C1, with full source residual |
| **C3 — formal contextual read/inhibitor event or higher-dimensional rewriting semantics** | T4 producer/activation/conflict/commutation distinctions | No faithful typed/source-state mapping or composition guard | **NEXT**, build an observer only; preserve native generator |
| **C4 — quantum-code/Hilbert-channel reconstruction** | Mathematical analogy to observer sufficiency, JLMS/HaPPY external results | Actual Hilbert code, entangled tensors, quantum measurement and recovery map absent | **LATER** unless C1–C3 reveal genuine extra structure |
| **C5 — horizon-relative-entropy and Einstein-equation recovery** | Published Dorau–Much conditional bridge | Horizon, area law, QFT, energy stress/metric absent | **PHYSICS-LATE**, not ruled out, not currently warranted |

The ranking expresses **what can be tested without extra assumptions**, not a prediction that a physics breakthrough must be hard or slow. Should a mathematically stronger link unexpectedly emerge, investigate it promptly on its own burden of proof.

## 6. Precise next executable experiment

Apply the *same conditional distinguishability and sufficiency vocabulary to actual original T4 finite state transitions*, not only directed formal comparator models:

- Fix an actual frozen native rank-k state, rule and **eligible occurrence multiset**.
- Construct the exact *counterfactual event-selection outcome distribution* over every currently eligible distinct occurrence (if using a uniform per-occurrence control, mark it as a declared **test kernel**, as in T3).
- Compare full state/transition receipts with typed incidence, pairwise shadow, birth-provenance only, Gram-like spectra and other candidate projections; preserve exact event occurrence identity and all source bit assignments before any quotient.
- Compute which pairs of native source states or legal rewrites are collapsed under each observer despite **different intervention-response kernels**. Check preservation of **three-event higher coherence**, not only pairwise output equivalence.
- Test explicitly whether a proposed recovery map reconstructs **enabling and rewrite succession**, rather than merely reproducing an entropy scalar or selected histogram. Recheck under relabeling and held-out mutation/initial-state configurations.
- Record failure witnesses if no physically relevant reconstruction emerges; do not change native generator or force a metric to make a desired result pass.

**Scientific bottom line:** We found a concrete connection to the **mathematics of information sufficiency**, and showed that some higher-order operator measurements retain information lost by binary order. At the same time, we have exact negatives demonstrating why neither relative entropy, graph homology nor incidence spectra automatically contain the full causal mechanism. **No quantum behavior, gravity, particles, metric or holographic duality derived.**

## 7. Source and provenance routing

- [Executed Causal Step recovery/incidence experiment](../experiments/2026-10-14-classical-recovery-and-incidence.cjs).
- [Complete machine-readable finite evidence](../experiments/results/2026-10-14-information-recovery-and-incidence-exact.json).
- [Primary-source condition register I01–I06](../references/2026-10-14-information-recovery-geometry-assumption-register.json).
- [T3 exact causation-versus-order witness](2026-10-13-t3-causal-order-interval-observer-noninjectivity.md).
- [T4 actual rewrite intervention and higher composition evidence](2026-10-13-t4-operational-concurrency-higher-order-coherence.md).
- [Original research direction and exact user continuation](../DISCUSSION_LOG.md).

**Workstream:** one contiguous `research/causal-step` branch, no main merge, no Actions, no Woit/Lisi modification, no qualified IsoGraph semantic promotion. The fully correct original findings and negative cases remain historical and byte-preserved.
