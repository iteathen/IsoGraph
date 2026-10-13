# Topology and holography as potential structural comparators for Causal Step

**Research initiated:** 2026-10-13 by Joshua Oshiro, user-originated idea that topology and holography may have overlapping structural content with generative causal hypergraph networks.  
**Work:** AI-assisted public-literature source audit, exact small cut example, ranked research leads and negative controls.  
**Qualification status:** External mathematical/theoretical physics *comparators* only. **No mapping to the Causal Step substrate, matter, spacetime, actual entanglement, gravity, or real physics has been established.**  
**Research source register:** [21 individually annotated public sources](../references/2026-10-13-topology-holography-source-register.json).  
**Original user statement:** [DISCUSSION_LOG.md](../DISCUSSION_LOG.md), 2026-10-13 entry.

## 0. Critical separation of terms

The user is exploring whether substantially simpler **causal generative structure**, including genuinely high-order interacting hyperedges and possibly unbounded growth/arity, can underlie complex physical behavior. The project currently lacks proven quantum Hilbert spaces, canonical quantum states, 3D or 4D spatial geometry, spacetime metrics, gauge/matter/Higgs fields, black-hole surfaces, and gravitational dynamics. The user's earlier publication threshold requires rigorous node/topological semantics and objective claim-appropriate evidence before declaring a physical causal-topology connection.

The word **topology** is used in several inequivalent ways across prior art:
- **abstract hypergraph incidence** (sets of co-participating vertices, higher-rank edges);
- **simplicial/cell-complex topology** (downward closure/boundary operators and attaching maps);
- **causal-order topology** (partial orders, thickened antichains and nerves);
- **embedded knot/link/ribbon topology** (knotting and linking require additional structure not present in a bare abstract hypergraph);
- **boundary/entanglement wedge topology** (quantum/gravitational model with boundary and usually geometry already specified).

The word **holography** is similarly overloaded:
- entropy/area bounds in gravitational spacetimes (Bousso);
- AdS/CFT-inspired bulk/boundary operator reconstruction by quantum error correction (HaPPY);
- abstract **weighted hypergraph min-cut entropy** constraints (Bao et al.; Walter and Witteveen);
- quantum-geometric tensor-network bulk/boundary maps (group field theory);
- recent mathematical entropy-cone inequalities.

These are **distinct constructions**. A matching graph picture, “area law,” common entropy inequality, or fixed number of degrees of freedom does not establish an ontological equality. Invariants require a **specified representation map and equivalence criterion**.

## 1. Ranked mathematical leads: closest genuinely reusable pieces

### A1 — Hypergraph min-cut entropy theory and its proven limits

**Primary articles:**
- Ning Bao, Newton Cheng, Sergio Hernández-Cuenca and Vincent P. Su, [*The Quantum Entropy Cone of Hypergraphs*](https://doi.org/10.21468/SciPostPhys.9.5.067), *SciPost Physics* **9**, 067 (2020), [full arXiv text](https://arxiv.org/html/2002.05317v1).
- Michael Walter and Freek Witteveen, [*Hypergraph min-cuts from quantum entropies*](https://doi.org/10.1063/5.0043993), *Journal of Mathematical Physics* **62**, 092203 (2021), [institutional PDF](https://ir.cwi.nl/pub/31291/31291.pdf).
- Bao et al., [*A Gap Between the Hypergraph and Stabilizer Entropy Cones*](https://arxiv.org/abs/2006.16292), preprint updated December 2021 (2020 submitted).

**Established math, explicitly scoped:** For an undirected weighted hypergraph `H=(V,E,w)` with designated terminals, a cut splits `V` into two parts; a hyperedge contributes to the cut if and only if it has **at least one** vertex on **each** side. The min-cut function for boundary subset `A` minimizes the sum of nonnegative weights over cuts respecting the terminal boundary assignment. These are **well-defined combinatorial functions**, without assuming an ambient Euclidean embedding.

The graph holographic entropy cone sits *within* the broader hypergraph-cut cone. Bao et al. show hypergraph and stabilizer entropy cones coincide up to four parties; their subsequent work explicitly refutes equality for all higher parties, exhibiting particular six-qubit stabilizer vectors not representable by the hypergraph min-cut model. Walter–Witteveen prove that finite weighted hypergraph min-cut vectors are **asymptotically approximable up to uniform scale** by entropies of stabilizer quantum states in a suitable quantum tensor-network construction: hypergraph-cut cone `⊆` stabilizer cone. That constructive realization presupposes its own Hilbert spaces, GHZ resources, tensor states and large local dimension; it **does not** derive quantum entanglement directly from the Causal Step hypergraph.

**Directly reusable piece:** Compute *observable* cut vectors and inequality signatures for finite high-order Causal Step snapshots, using independently declared terminal-selection and weight conventions, and compare to exact null graphs, random hypergraphs and equivalent relabelings. Do **not** call the output “physical entropy” unless a separate state-to-measurement map is proved. Use exact small-rank contraction methods where their stated hypotheses apply.

**Negative lesson:** A hyperedge of order `k` is not a clique or a set of pairwise interactions; projecting to the 2-section loses information. Conversely, not every hypergraph cut vector belongs to the holographic entropy cone, and not every stabilizer-state entropy vector belongs to the hypergraph cone. The 2020 equivalence conjecture was **disproved**—do not cite only the initial positive paper.

### A2 — Recover topology from causal order rather than assume geometry

**Primary articles:**
- Seth Major, David Rideout, Sumati Surya, [*On Recovering Continuum Topology from a Causal Set*](https://doi.org/10.1063/1.2435599), *Journal of Mathematical Physics* **48**, 032501 (2007).
- Same authors, [*Stable Homology as an Indicator of Manifoldlikeness in Causal Set Theory*](https://arxiv.org/abs/0902.0434) (2009), [full HTML](https://arxiv.org/html/0902.0434v2).

These authors construct **thickened antichains** in a **locally finite causal partial order**, turn them into nerve simplicial complexes, and extract homology. Under faithful manifoldlike embedding and sufficiently dense sprinkling/separation of scales, the procedure recovers aspects of continuum spatial topology. The numerical continuation tests stability windows and alternative nonmanifoldlike constructions, reporting a **necessary but not sufficient** manifoldlikeness indicator.

**Why particularly relevant:** This offers a mathematically explicit chain **order → derived topology → persistence across a thickening parameter**; it does not require presupposing 3D for the *definition* of a candidate order complex. However, the recovery theorem **does presuppose** that the causal set approximates a known manifoldlike continuum and uses antichain and density conditions. A generic high-order rewrite incidence is **not** already a poset: one must separately define ordered events and transitive causal precedence. Host execution order or ad hoc ancestor labels cannot be silently substituted for physical time.

**First checks:** On an independently defined event-precedence DAG derived from genuine k-way rewrite provenance, ask whether antichain/nerve homology has **stable scale windows**. Compare to branching trees, rewired incidence-null systems, transitive percolation and synthetic faithfully sprinkled 2D/3D controls. Treat any close value of “dimension” as an estimator-dependent observation, never as a dimensionality target or hardcoded cap.

### A3 — A provable expressive boundary *beyond* hypergraph incidence

**Primary article:** Bao, Cheng, Hernández-Cuenca and Su, [*Topological Link Models of Multipartite Entanglement*](https://doi.org/10.22331/q-2022-06-20-741), *Quantum* **6**, 741 (2022).

The authors construct information models based on **topological links** and prove existence of link entropy vectors not representable by the graph/hypergraph min-cut framework under study. They also extend combinatorial contraction methods with additional nontrivial knot-theoretic oracles.

**Causal Step significance:** There are exact representational deficits even in the rich abstract-hypergraph information framework. Higher-order co-incidence is not automatically sufficient to encode **linking, knotting, ambient embedding or ribbon framing**; adding those structures cannot be smuggled into an originally pre-spatial ontology. This supplies a future **representation-audit** rather than a justification to add three spatial dimensions.

### A4 — Conditions for holographic quantum-geometric bulk/boundary maps

**Primary article:** Eugenia Colafranceschi, Goffredo Chirco and Daniele Oriti, [*Holographic maps from quantum gravity states as tensor networks*](https://doi.org/10.1103/PhysRevD.105.066005), *Physical Review D* **105**, 066005 (2022).

They explicitly partition quantum geometric data on an **open graph** into bulk and boundary sectors, define maps in the **tensorial group field theory / loop quantum gravity spin representation**, and derive conditions on entanglement making the maps **isometric**, a necessary holographic reconstruction property.

**Piece:** A *precise conditional property*—isometry/reconstruction—rather than a vague claim that “the information is on the boundary.” **Gap:** Spin labels, Hilbert states, selected graph boundary and quantum geometric kinematics are already assumed. They are not a natural consequence of raw causal hypergraph branching.

## 2. Foundational analogies with explicit unavoidable assumptions

| Reference | Grounded result useful for comparison | What it assumes / cannot establish |
|---|---|---|
| [Bianconi & Rahmede 2016 — Network Geometry with Flavor](https://doi.org/10.1103/PhysRevE.93.032315) | Growing simplicial-complex ensembles, generalized area-law behavior, quantum network-state encoding; interesting network growth laws. | Fixed chosen `d` and simplicial-closure/attachment rules; generalized statistical “area” is not a derived gravitational Bekenstein–Hawking area. |
| [Bianconi & Rahmede 2017 — Emergent Hyperbolic Network Geometry](https://doi.org/10.1038/srep41974) | Hyperbolic-like large-scale geometry in selected simplicial networks. | Specific attachment law, simplicial geometry, topology/metric comparison convention; no emergence of physical spatial dimension from an unbounded causal hypergraph. |
| [Pastawski–Yoshida–Harlow–Preskill 2015 — HaPPY code](https://doi.org/10.1007/JHEP06(2015)149) | Exact toy bulk-to-boundary error-correcting map, reconstruction from redundant boundary sectors, RT-type entropy analogues. | Preselected perfect tensors, quantum Hilbert spaces, holographic boundary and bulk tessellation. Classical graph redundancy is not a quantum error-correcting code. |
| [Bao et al. 2015 — Holographic Entropy Cone](https://doi.org/10.1007/JHEP09(2015)130) | Reduction of RT surface entropy inequalities to ordinary graph-min-cut geometry, with precise MMI and related constraints. | Classical geometric holographic bulk, boundary subregions, assigned gravitational/quantum entropy notion. Hypergraph-cut data need not satisfy holographic MMI. |
| [Konopka–Markopoulou–Severini 2008 — Quantum graphity](https://doi.org/10.1103/PhysRevD.77.104029) | Graph-theoretic toy energy-driven transition to a relatively ordered/local low-dimensional phase; link to gauge-like excitations. | Fixed vertex number `N`, a specially selected Hamiltonian, energy and quantum/graph degrees; mostly pairwise graphs, not unrestricted true higher-order hypergraph incidence. |
| [Levin–Wen 2005 — String-net condensation](https://doi.org/10.1103/PhysRevB.71.045110) | Exact quantum spin-system families with emergent gauge/fermionic excitations, linking persistent organization to particle-like phenomena. | Chosen lattice/dimension, Hilbert states and Hamiltonian; not proof of actual Standard Model particles or emergence from unassumed pre-space. |
| [Bilson-Thompson–Markopoulou–Smolin 2007 — quantum gravity and Standard Model](https://doi.org/10.1088/0264-9381/24/16/002) | Ribbon-network braiding and noiseless subsystems with proposed first-generation fermion correspondence. | **Three-dimensional embedded** framed ribbon graphs and selected local quantum moves; no evidence that unembedded arbitrary hyperedges naturally braid or give real particles. |
| [Surya–X–Yazdi — causal-set de Sitter entropy](https://arxiv.org/abs/2008.07697) | In selected 2D/4D dS causal-set scalar-field setting, raw field entropy has a volume law; a **spectral truncation** is needed for an area law. | Matter field, dimension, geometry, vacuum/correlation prescription and chosen cutoff. **Area law may be cutoff-dependent**; cannot use as primitive force. |
| [Machet–Wang 2021 — horizon entropy of a causal set](https://doi.org/10.1088/1361-6382/abe957) | Causal-horizon molecule area relations may fail or become nonlocal for null hypersurfaces; examines spacetime mutual information as alternative. | Preexisting horizon, null/spacelike surfaces, continuum approximation and dimension; not a bare-graph derivation of entropy. |
| [Bousso 2002 — The holographic principle](https://doi.org/10.1103/RevModPhys.74.825) | Careful covariant entropy/area bound and physical context. | Light sheets, null directions, geometry, gravity and meaningful entropy definition; an eventual outer-level constraint, not a rule to impose pre-spacetime. |

## 3. Newer topology/holography work through October 2026

**2026 peer reviewed:** Joydeep Naskar and Sai Satyam Samal, [*Topological entanglement entropy meets holographic entropy inequalities*](https://doi.org/10.1103/hvf8-jcff), *Physical Review D* **114**, 026025 (July 2026), prove that entanglement entropies of specified **gapped two-dimensional topological ground states** satisfy holographic entropy inequalities. Therefore passing the same inequality tests **does not, on its own, identify a unique bulk holographic gravitational origin**. Their domain assumes a quantum topologically ordered medium and does not validate Causal Step's causal graphs.

**2026 peer reviewed:** Xin-Xiang Ju and Yang Zhao, [*The holographic multi-entropy cone*](https://doi.org/10.1007/JHEP09(2026)253), *Journal of High Energy Physics* **2026**, 253 (September 24, 2026), extend holographic entropy vectors to **multi-entropy** coordinates and give exact multicontraction-map certificates and facet inequalities for `n=3,4` **including the purifier**. Their further conjectures are **not** proved. This supplies higher-party algebraic benchmark candidates **only after** a meaningful quantum-information map exists.

**2026 conditional preprint:** Bowen Zhao, [*Graph models for covariant holographic entropy I*](https://arxiv.org/abs/2602.04888), arXiv **v2 (April 27, 2026)**, constructs an HRT graph directly from causal structure of **entanglement wedges** under an *exposed-region* condition. The proof is a **Conditional No-Short-Cut Theorem**; entanglement-wedge configurations outside the condition are only partly addressed. **Do not repeat the earlier v1 title or broad conclusion as an unconditional proof of equivalence of covariant and static holographic entropy cones.** This is an intriguing late-stage *causal → holographic graph* bridge, but it presupposes the gravitational HRT setting, not bare causal rewrites.

A further related source is the earlier [Hayden et al. *Holographic duality from random tensor networks*](https://arxiv.org/abs/1601.01694) (2016), where high-bond-dimension quantum tensor constructions realize graph-associated bulk/boundary entanglement relations. The geometry/tensor/Hilbert structure is selected in the model.

## 4. Exact, executed four-party higher-order cut counterexample

The strongest **small exact witness** is a four-vertex hypergraph carrying one unit-weight hyperedge:

```text
V = {A, B, C, P}
E = {{A, B, C, P}} with w=1
T = V  (all four are designated boundary terminals; P purifier)
```

The abstract cut value `S(X)=Σ_{e∩X≠∅, e∩(V\X)≠∅}w(e)` is **one** for every nonempty proper subset `X`, and zero for empty/full `X`.

Thus tripartite information

```text
I3(A:B:C) =
 S(A) + S(B) + S(C)
 - S(AB) - S(AC) - S(BC)
 + S(ABC)
 = 1+1+1 -1-1-1 +1 = +1.
```

For a classical **holographic RT** entropy vector, the **monogamy of mutual information** requires `I3<=0`; the single rank-4 hyperedge **violates** this stronger holographic constraint. Its abstract cut vector is, however, the entropy vector of an appropriate four-party GHZ state (within a chosen information normalization). The four-vertex `K4` **2-section** with unit-weight pairwise edges has `S(single)=3`, `S(pair)=4`, `S(ABC)=3`, giving `I3=0`.

This is directly consistent with Bao et al.'s 2020 explanation: **hypergraph-cut entropy vectors can lie outside the holographic graph cone** and rank-4 GHZ is a simple non-ordinary-graph example. It is an **exact representation-loss / model-class distinction**, not an assertion that every pairwise auxiliary-node encoding is impossible and **not a measured physical entropy**.

Executed numerical verification of this finite combinatorial construction:
- [Minimal reproducible source](../experiments/2026-10-13-hypergraph-entropic-cut-witness.mjs), no extra dependencies.
- [Frozen exact cut vector and I3 values](../experiments/results/2026-10-13-hypergraph-entropic-cut-witness.json).
- Source asserts every proper cut has unit weight and verifies `I3=+1` versus `I3(K4)=0`. **No Causal Step rewrite rules or historical Model A dynamics are changed.**

## 5. Non-circular bridge map: mark every missing arrow

The project cannot currently identify any of these proposed layers without adding model assumptions. Keep independent comparison types explicit:

```text
SOURCE HYPOTHESIS:
  Causal Step high-order rewrite histories H_t
          |
          |  A. Construct candidate directed order from exact rewrite provenance?
          v       [not yet canonical causal time or physically measured]
  partial order / event intervals → candidate antichains/nerve homology
          |
          |  B. Distinguish chosen terminals and weights from emergent ones?
          v       [possible finite hypergraph cut diagnostics]
  boundary-partition cut vectors → hypergraph entropy inequalities
          |
          |  C. Derive quantum state/Hilbert/reconstruction map, if possible?
          v       [missing; GHZ/tensors currently imposed in external models]
  quantum/entanglement-coding observables
          |
          |  D. Independently reconstruct stable geometry/physical dimension?
          v       [missing; not implied by homology, area-like cut or exponent]
  gravitational correspondence / holographic boundary
          |
          v
  physical measured predictions and external verification [missing]
```

**Warning:** These arrows are **research questions**, not a proven causal chain and certainly not a plan to insert external quantum states or a guessed bulk metric into the foundational rule. The user forbids assuming a 12D or any other dimensional ceiling to make desired output; dimension, if meaningful, must be measured independently and remain uncapped in the ontology.

## 6. Most valuable finite tests (observational unless a new rule is independently justified)

| Priority | Test and prerequisites | Positive indication | Falsification / null behavior |
|---|---|---|---|
| **T1** | Enumerate exact finite `k>=3` hypergraph cut vectors for fixed causal-rewrite snapshots, **with terminal and weight choice treated as explicit observer controls**. | Reproducible cut constraints and representation-dependent information losses, invariant under relabelings preserving terminals/weights. | Agreement vanishes under relabeling, requires tuned boundary/weights, disappears upon changing snapshot/rule/initial condition, or simple null graphs yield same result. Do not automatically call the cuts physical entropy. |
| **T2** | Construct a mathematically explicit precedence relation on actual rewrite *events*, test antichain thickening/nerve homology and stability over sampling/thickness parameters. | Stable, nontrivial homology across a scale range, clearly separated from simple tree/percolation nulls, no input chosen dimension. | No legitimate partial order from rewrite provenance, highly unstable topology, or fake stability from choosing a manifoldlike initial graph. Only interpret as conditional topology evidence. |
| **T3** | Define a finite bulk-like structural motif and several distinct boundary-like observation partitions **without presupposing geometric bulk and boundary**, then test erasure/recovery of a held-out perturbation. | Redundant relational encoding survives removal of some observers and lets a boundary subset reconstruct a distinguished internal event. | Reconstruction only from chosen node IDs or explicit direct parent labels; ordinary random graphs do as well; no state dependence. Even success is **classical relational redundancy**, not a quantum holographic code. |
| **T4** | For candidate matter-like persistent structures, compare abstract incidence with enriched *link* or *framing* representations (separate, explicit hypotheses). | Proof of what linking/homotopy data is preserved or lost by a proposed representation map. | Requires prescribing ambient 3D embedding or dynamics that directly insert a target particle. Do not claim the Causal Step origin already has braiding. |
| **T5** | Compare scale-dependent boundary cuts and coarse-grained capacity with synthetic random and constrained hypergraph growth. | Robust, independently scaled surface-like **combinatorial** boundary relation. | “Area law” follows from fixed valence, chosen `d`, a tuned spectral truncation, an artificial cap, or a boundary selected using desired geometry. |

**Further substantive research priority:** Finish the user-requested tests for genuine **noncollapse + nontrivial information processing**, then consider cut/homology/coding diagnostics. The existing 8,000-step higher-order candidates provide deterministic finite trajectories but **do not yet have independently justified physical boundary or quantum-state semantics**. Thus any new measurement must be a *non-invasive comparator*; it should not change the original generator's rule or insert entropic back-pressure.

## 7. Evidence qualification and publication gate

- **Well-grounded mathematical / published theory:** hypergraph cuts and their quantum representation theorem; six-party non-equivalence counterexample; topological-link representational extension; conditional causal-set-to-topology recovery; isometric tensor-network code conditions. These results hold **only under their published assumptions**.
- **Source-derived numerical evidence:** previous 8,000-step synthetic hypergraph rewrites and today's exact finite 4-way cut witness. Both concern toy structures and chosen rules.
- **Unverified research links:** any claim that Causal Step produces Hilbert spaces, the Standard Model, emergent 3D/4D, real holographic gravity, black-hole entropy, or a genuinely independent boundary coding layer. **No objective empirical demonstration of those physical connections exists in the reviewed materials.**
- **Negative findings to preserve:** a hypergraph cut can violate holographic MMI; some stabilizer entropy vectors escape hypergraph-cut models; link entropies can escape both graph and hypergraph models; causal horizon area-laws depend on hypersurface/operator cutoffs; newer covariant HEC proposals have conditional proof regimes; even a shared holographic inequality may arise in non-gravitational topological phases.
- **Publication position:** Comparative literature research and well-defined mathematical diagnostics can be written internally, but a Causal Step *physical causal graph ↔ topology ↔ holography correspondence* is **not publication-ready** by the researcher's existing requirements. No merged semantic upgrade or modified physics was performed.

## Provenance

- **Joshua Oshiro originated the research lead**: topology and holography may offer useful structural pieces for emergent causal hypergraph networks and asked to research public sources.
- **Third-party researchers originated each cited theory and theorem**; external sources are credited through direct publication links and the registered bibliography.
- **AI-assisted work**: source comparison, rankings, negative-case synthesis, explicitly bounded bridge maps/test plans, and the independently executed four-party combinatorial counterexample.
- **Recorded:** 2026-10-13; all conclusions labeled by evidentiary class. No new fundamental Causal Step premise, physical law, representational equivalence or publication claim.

**Extended bibliography:** [machine-readable register with 21 publication/preprint resources](../references/2026-10-13-topology-holography-source-register.json).
