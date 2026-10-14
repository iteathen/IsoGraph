# T3 — Causal-order and interval observers versus genuine higher-order event structure

**Recorded:** 2026-10-13. **Project:** Causal Step. **Status:** locally executed finite exact mathematics plus non-invasive event-observer replays; *not* qualified IsoGraph semantics, physical geometry, particle emergence, quantum dynamics, or dark-sector explanation. **Research direction:** Joshua Oshiro's existing higher-order, pre-metric causal network investigation and its requested T3 continuation. **Formulation, executable observer, experiments and comparison:** AI-assisted. **Independent original physics:** credited below.

**Previous gates:** [T2 executed 8,000-event provenance/relabeling tests](2026-10-13-t2-exact-higher-order-invariance-and-scheduler-dependence.md), [mechanism comparison defining E0–E4](2026-10-13-asynchronous-causal-physics-mechanism-comparison.md), and [entropy-observer noninjectivity counterexample](2026-10-13-entropy-observable-completeness-vs-causal-generative-structure.md). The two researcher-originated Causal Step premises and the noncollapse + complexity-capacity research filters remain unchanged.

## 1. The decisive semantic caution: three different objects

Do not silently identify:

1. **A native unordered rank-k active hyperedge** in the archived Causal Step rewrite runner: a joint participant set whose bits determine whether a scheduled firing occurs; it is *not* by itself a directed source-to-target causal arrow. The rule creates newborns and higher-order offspring.
2. **A separately defined typed directed causal hyperedge** of form $(a,b,c)\longrightarrow x$: a joint-input activation condition; its binary source-to-target shadow is an explicitly *forgetful observer*. Used for exact counterexamples, **not installed as a new primitive in the archived simulator**.
3. **An event-level precedence partial order** derived from a history of actual rewrite occurrences. Such a derived order needs an explicit dependency rule: source-node birth, hyperedge creation, state write/read, read/write conflict, or other intervention-relevant relation. The host's ordered simulation update index gives one total *execution* sequence, not an independently derived physical causality theorem.

An **interval cardinality** is defined only after selecting one of these causal-order maps. Order-theoretic **antichain width** is not a physical spatial dimension. Event index and graph-link count are not a measured spacetime interval or the user's newly defined unit *causal step* without a further proof.

## 2. Primary external context and assumption ledger

- **Major, Rideout, Surya**, [*On Recovering Continuum Topology from a Causal Set*](https://doi.org/10.1063/1.2435599) and [*Stable Homology as an Indicator of Manifoldlikeness*](https://arxiv.org/abs/0902.0434). Thickened antichains, nerve complexes and stable homology recover continuum features *conditionally*, for causal sets appropriately and faithfully embedded in suitable manifoldlike/global-hyperbolic geometry. Inextendible antichain and scale/thickening conditions are load-bearing. **No theorem automatically supplies topology for arbitrary raw Causal Step hypergraphs**, and simple antichain width is not their full nerve-complex construction.
- **Benincasa–Dowker**, [*The Scalar Curvature of a Causal Set*](https://doi.org/10.1103/PhysRevLett.104.181301), [corrected arXiv record](https://arxiv.org/abs/1001.2725): retarded order-interval layer contributions yield an effective scalar wave/curvature operator in an assumed **four-dimensional manifoldlike continuum approximation**. The corrected preprint flags a published equation/definition typo. **T3 did not use fixed-dimension weights, calculate Ricci curvature or test a 4D continuum limit**. It tests the input order-observer's information content instead.
- The earlier [F17 source entry](../references/2026-10-13-fundamentals-emergence-candidate-register.json) already registered topology recovery as an observer bridge. No new external fundamental-physics claim is adopted.

The essential question is not whether an interval formula is mathematically valid, but whether the map from **complete higher-order causal/event mechanisms** to **order or interval observables** is separating under a specified equivalence. This new work holds the metric, Hilbert, mass and physical dimensionality assumptions *out* of the primitive mechanism.

## 3. Exact formal witness A: same entire partial order, nonisomorphic k-ary causation

Consider five typed source nodes $a,b,c,d,e$ and sink $x$. Each hyperedge is one genuinely rank-4 directed **joint-input event occurrence**; its three sources must all be present for $x$ to become enabled.

- **H0:** $(a,b,c)\to x$, $(a,b,d)\to x$, $(a,b,e)\to x$.
- **H1:** $(a,b,c)\to x$, $(a,d,e)\to x$, $(b,d,e)\to x$.

Both have **exactly three** rank-4 occurrences, the same six nodes, the same full binary source-target shadow $\{a,b,c,d,e\}\to x$, and hence the same entire transitive-closed partial order and all **labeled interval observer values**, not just the same histogram. Both have the same **maximum antichain width 5**, **5 comparable event pairs**, interval-interior histogram $\{0:5\}$, and **33 antichains including the empty set**.

They are **not even unlabeled-isomorphic as directed hypergraphs**, since the source-incidence degree multisets are distinct:

- H0: $[1,1,1,3,3]$.
- H1: $[1,2,2,2,2]$.

All **32** subsets of the five possible active sources were enumerated with the actual Boolean joint-enabling predicate. **6/32** distinguish the models (2 enable only H0, 4 only H1). For example, $\{a,b,d\}$ enables only H0; $\{a,d,e\}$ only H1.

Thus, within the **specified directed joint-input semantic domain**, any function of *the complete binary partial order alone* fails to reconstruct the distinct multi-source enabling behavior. This is stronger than a mere numerical interval collision. It is a bounded **noninjectivity theorem with an explicit witness**, not a claim that the underlying Universe has this graph or that causality truly reduces to a directed hypergraph with an AND interpretation.

### Exact controls

The [standalone source](../experiments/2026-10-13-t3-order-interval-observer.cjs) computes transitive closure, every interval-interior size, comparable/incomparable pairs, cover relations, strict ancestor counts, antichain width via a bipartite matching formulation of Dilworth's theorem, and antichain count for small posets. It passed chain, discrete, rooted tree, star and diamond nulls. A separate six-vertex example's observer signatures were preserved under **720/720 exhaustive node relabelings**, with no coordinate system.

## 4. Exact formal witness B: interval statistics can lose information even *inside* order theory

Enumerating all **1,024** forward-directed graph presentations on five labeled vertices (ten possible arrows), taking transitive closure and quotienting by all vertex permutations yielded **63 nonisomorphic five-element partial orders**. Every finite partial order has at least one linear extension, so forward-labeled DAG enumeration covers these finite posets.

The restricted summary observer
$$
\Phi(P)=\bigl(\#\text{ comparable pairs},\,
               \text{histogram of interior cardinalities of every strict interval},\,
               \text{maximum antichain width}\bigr)
$$
has **22 groups** with two or more distinct unlabeled order types giving the same $\Phi$.

The first collision returned was for two genuinely nonisomorphic partial orders with **4 comparable pairs**, width **3**, and **4** zero-interior intervals. Their distinct canonical closure strings and generating arrows are frozen in the evidence output; their source-event counts differ (2 versus 3), demonstrating that additional observables could separate them.

Consequences:

- Same **summary interval statistics** do not guarantee same **complete partial order**.
- Same **complete partial order** does not guarantee same **typed k-ary mechanism** (Witness A).
- Neither implication may be reversed as a theorem unless a domain-specific *separating* observer/inverse is proved.
- The original finite entropy-cut noninjectivity example constitutes a third **different** observer, not a substitute for this order-only result.

## 5. Executed replay C: actual native higher-order generator traces depend on the *chosen* event-order map

Source-fidelity: historical [\`hypergraph-long-horizon.mjs\`](../experiments/hypergraph-long-horizon.mjs) blob **\`87a420edfb3e562d7fcbacf4ca607b1e6952ac08\`** and unchanged prior [T2 observer instrument](../experiments/hypergraph-t2-invariance-replay.cjs) blob **\`bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e\`**, executed through the new derived observer in a **local V8 isolate**. The previously verified 8,000-step trajectories remain original. T3 replayed **256 rewrites** in each of **14** active-mutation conditions (7 k3/k4/k5 rule/context settings × FIFO/random) for **3,584 additional synthetic rewrite events**, without changing rewrite rules or installing a physical clock.

We deliberately computed *two alternative partial orders on the same event receipts*:

- **B (birth/provenance lower-information map)**: event $i$ precedes $j$ if event $i$ created the hyperedge occurrence selected by $j$, or created a source node used by $j$. Take transitive closure. This has known incompleteness for causal state write/read effects and is **not claimed to contain all causal constraints**.
- **T (conservative last-touch extension)**: add precedence from the prior event *accessing each participant node* to the next event that accesses it; keep B edges, then close transitively. This is an intentionally conservative dependency overapproximation: it can impose precedence between independent reads. It is **not proved minimal or physically correct**.

**All 14/14** histories produced **different** order measurements under B versus T. The widest example:

| k / rule / scheduler | B comparable pairs | T comparable pairs | B maximum antichain | T maximum antichain |
|---|---:|---:|---:|---:|
| k3 / 4 / FIFO | 1,101 | 31,282 | 170 | 6 |
| k3 / 4 / random | 1,763 | 17,467 | 104 | 26 |
| k4 / 21 / FIFO | 1,332 | 32,472 | 184 | 3 |
| k4 / 21 / random | 3,682 | 23,206 | 80 | 17 |
| k5 / 81 / FIFO | **540** | **32,640** (total order) | **206** | **1** |
| k5 / 81 / random | 968 | 32,255 | 113 | 5 |

All **14** conditions' complete interval histograms, cover counts, ancestor distributions, readout widths and source parameters are in [the actual executed JSON](../experiments/results/2026-10-13-t3-exact-order-and-256-rewrite-observers.json). At 256 events, a total order has $\binom{256}{2}=32{,}640$ comparable pairs, demonstrating exactly how strong the conservative touch definition can be. These dramatic differences are **not competing measurements of a physical cosmological quantity**: they show how much the observer's unstated causal-dependency convention matters.

**Negative inference:** One cannot declare a causal-set-style dimension, topological invariant or Ricci-scalar signal from order intervals in these histories until a physically justified *event precedence / independence* relation has been specified and held fixed through the proposed representation map.

## 6. Exact one-step kernel D: stochastic distribution versus raw scheduler coupling

After T2 demonstrated 14/14 failures of *same-seed sample-path correspondence* under ordinary relabeling, we performed a separate small **distribution-level conditional-kernel** comparison. For each of the 7 source rule/context settings × FIFO/random scheduler × 2 initial label permutations, take eligible **rank-k event occurrences** at the first three rewrite steps, transporting the preceding chosen events so that corresponding states really are compared.

- **28 transported relabeling comparisons**, **84 distinct compared state-pairs**.
- **84/84** matched the exact set of currently eligible higher-order occurrences (including canonical origin and true k-ary participants), and hence matched the formal **uniform conditional kernel**: each occurrence has probability $1/m$ for $m$ eligible occurrences.
- **29/84** of these same snapshots chose a **different occurrence** using the original raw FIFO / equal numeric seeded-PRNG eligible-index selection. This is compatible with distributional equivariance and pathwise coupling failure.
- Observed eligible frontiers in these snapshots range from **1 to 14**. This result applies to the sampled states with exactly transported preceding events, not all possible reachable states or a demonstrated law of physical stochasticity.

An exact independent **multiplicity control** has two eligible occurrences with the same incidence and one with another. Uniform sampling *over occurrences* induces incidence probabilities **2/3 and 1/3**. Illegally deduplicating incidences and then sampling uniformly gives **1/2 and 1/2**. This is an especially direct warning against quotienting distinct selected-edge occurrences before defining a causal transition kernel. Probability distributions, chosen sample paths, final-state equivalence and underlying causal rewriting are distinct scopes.

[Exact kernel source](../experiments/2026-10-13-t3-occurrence-kernel.cjs) and [executed result](../experiments/results/2026-10-13-t3-occurrence-kernel-exact.json). Frozen runner and T2 source hashes checked. Local execution used a V8 isolate; a Node.js reproduction CLI was prepared but **was not independently executed in this cycle**. The observed uniform law is a **candidate mathematical control, not an adopted generative or physical selection law**.

## 7. What was established, what failed, and what remains underdetermined

| Statement | Status | Warrant or obstacle |
|---|---|---|
| Full binary causal order reconstructs arbitrary joint k-ary enabling | **REJECTED IN STATED TEST DOMAIN** | Nonisomorphic rank-4 H0/H1, identical entire order, differing interventions 6/32 |
| Interval histogram + pair counts + antichain width uniquely identifies five-event partial orders | **REJECTED** | 63 unlabeled partial orders, 22 collision groups |
| Exact small-poset relabeling invariance of selected order statistics | **PASS IN CONTROL** | 720/720 relabelings |
| Causal-event order from native unordered hypergraph rewriting is unique without a dependency definition | **NOT ESTABLISHED** | Birth-only versus touch views differ for 14/14 actual 256-step histories |
| An exact uniform eligible-occurrence conditional kernel is label-equivariant on matched observed states | **PASS IN CONTROL** | 84/84 state-pair comparisons, conditional event transport |
| Same raw FIFO/PRNG numeric selection is a relabel-invariant *sample-path coupling* | **FAIL IN CONTROL** | 29/84 distinct occurrence choices, consistent with earlier 14/14 8,000-rewrite T2 prefixes |
| Event multiplicity may be erased before constructing a distribution over event occurrences | **REJECTED IN TEST** | 2/3 versus 1/2 induced incidence probability |
| Scalar curvature, physical 3D/4D, Einstein gravity, quantum dynamics, physical clocks, dark matter/energy are derived | **NOT TESTED OR ESTABLISHED** | Mandatory extra structure and empirical constraints remain missing |

## 8. Prioritized next research (T4 preparation)

1. **Define a minimal *operational* event-dependency test:** on small original rank-k states, determine whether two candidate rewrite firings can be swapped **without changing enablement or the joint observable successor hypergraph modulo an explicitly declared isomorphism**. Distinguish read/read compatibility, read/write and overlapping write/write. Unlike conservative last-touch edges, this uses the actual rule and intervention response. No physical metric required. Negative nonconfluence must be preserved.
2. **Bracket dependence-order uncertainty:** Compare minimal event-creator ancestry, exact two-rewrite commutation/conflict dependencies and conservative touch order. Only if an observer remains invariant across the *justified* dependency definitions should it be promoted as a geometric clue.
3. **Carry genuine incidence and occurrence multiplicity explicitly** when mapping to directed causal event networks. Observe loss and compare with a well-scoped Rideout–Sorkin sequential-growth consistency test; do not assume a single total order or a physical birth-clock.
4. **Retest noncollapse and complexity capacity separately**: the archived 8,000-rewrite survival is finite/right-censored; rank-5 #81 FIFO period-5 local behavior and rank-4 #21 scheduler dependence remain negative controls. A larger horizon alone is not proof of organized information processing.
5. **Only later** use manifoldlike/causal-set-curvature and thickened-antichain homology machinery with all source assumptions declared. In particular, do not insert a 4D coefficient to force geometry, or equate a nerve topology with original hyperedge incidence. Any cosmological result eventually faces the independent O01–O14 observations.

## 9. Preservation and provenance

- [Exact T3 finite+trace diagnostic source](../experiments/2026-10-13-t3-order-interval-observer.cjs).
- [Executed exact 32-intervention witness, 1,024-DAG census, 720 relabeling tests and 14 × 256 native rewrite histories](../experiments/results/2026-10-13-t3-exact-order-and-256-rewrite-observers.json).
- [Exact conditional-kernel / multiplicity source](../experiments/2026-10-13-t3-occurrence-kernel.cjs) and [executed evidence](../experiments/results/2026-10-13-t3-occurrence-kernel-exact.json).
- [T2 full 8,000-horizon manifest](../experiments/results/2026-10-13-t2-complete-h8000-evidence-manifest.json), frozen untouched.
- [Researcher-originated context](../DISCUSSION_LOG.md), [current consolidated project dossier](../README.md), and [project provenance ledger](../../../provenance/IDEA_PROVENANCE_LEDGER.json).

**No new physical Causal Step premise; no hypothetical force/entropy term; no fixed dimensionality; no modified historical runner or historical outcome; no Core promotion; no GitHub Actions; no Woit/Lisi interference; no merge.** This is the strongest negative so far against treating an order-only observer as a complete higher-order causal process representation, not evidence that relational emergence is impossible.
