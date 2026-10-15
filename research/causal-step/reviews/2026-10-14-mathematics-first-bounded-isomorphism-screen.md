# Bounded mathematics-first structural correspondence screen — 2026-10-14

**Status:** A small **executed** exact algebraic/relational screen and independent partial recount, not a comprehensive original-paper search, not a source-native whole-process bisimulation, and not a derived physics result. **Branch:** research/causal-step. Native source unchanged at blob 87a420edfb3e562d7fcbacf4ca607b1e6952ac08. Human research instruction: Joshua Oshiro requested a quick search for possible low-hanging isomorphisms in the existing mathematical corpus. Assistant supplied the finite comparison and proof scope. Source mathematics and source physical category kept separate under [math-first v0.3](../references/2026-10-14-math-first-source-comparison-contract-v0.3.json).

## Result A — genuinely invertible structural representation, not a physical mapping

For a **finite typed hypergraph with named occurrence identities**, let H=(V,E,ι) where ι(e) is the participant set of hyperedge occurrence e. Form the bipartite incidence graph with two **distinct vertex types V and E**, and one incidence arc (v,e) iff v∈ι(e). Store node bit labels, occurrence alive/fired labels and optional producing-event provenance on corresponding typed vertices. The inverse reads each occurrence vertex's neighbors and its attributes. Thus decode(encode(H))=H on named finite states, or equality under explicitly typed renamings.

**Why not simply a graph equivalence:** An *ordinary untyped/pairwise clique projection* forgets the E-vertex partition and can merge two distinct occurrences with identical members. Native Causal Step permits different occurrences on identical node sets; the bipartite **occurrence vertex** is essential. **27,648** finite instance encode-decode replays passed. This constructive inverse applies to this typed representation class, not automatically to Milner's bigraph place/link rules, Carletti physical dynamics or arbitrary causal graph rewriting.

## Result B — exact source-style read/inhibit representation of Causal Step eligibility

Native occurrence eligibility is:

~~~text
En_H(e; b,W) ⇔ alive_e ∧ not_fired_e ∧ rank(e)=k
                  ∧ sum_{v in participants(e)} b_v ∈ W
~~~

The original Ehrenfeucht–Rozenberg source definition ([MECH-25](../references/2026-10-14-priority-primary-equation-extraction-batch-07.json)) has reactions (R,I,P), enabled iff R⊆T and I∩T=∅, with R,I,P nonempty and R∩I=∅. The following construction **preserves those nonempty original-source restrictions**, which would fail at native source input weight 0 or k if omitted. For each known rank-k occurrence e and each subset S⊆ι(e) with |S|∈W, construct one reaction:

~~~text
R_(e,S) = {always_present, alive_e, unfired_e} ∪ S
I_(e,S) = {always_absent} ∪ (ι(e)  S)
P_(e,S) = {eligible_marker_e}
~~~

The input state contains always_present but never always_absent, contains bit-one participant species, and includes alive/unfired occurrence status tags exactly when true. **Proof:** the positive and inhibiting conditions together hold iff S equals the **unique** set of currently bit-one participants of occurrence e, and e is alive and unfired. Such S is in the constructed clause family iff its cardinality is in W. Therefore the source-valid reaction-system product-union result is *exactly the set of marked native eligible occurrences*, including independently named duplicate-incidence occurrences.

This is a **complete eligible-frontier observer for any frozen finite state**, but NOT a one-step dynamics equivalence: original reaction systems output all enabled products simultaneously over a fixed species catalogue; native Causal Step selects one event, flips/mutates participant bits under selected mutation, retires or marks an occurrence, produces a fresh node and offspring hyperedges. Encoding newborn names would require extending the finite source reaction alphabet. No result shows the original reaction-system global successor reproduces the native next hypergraph.

**Exact executed tests:** 10,752 complete local truth-table/status cases (k=3–5, every source weight mask incl. 0/k and the empty W, all bit masks and alive/fired Boolean values), and 145,152 three-occurrence frontier contexts (including two independently identified duplicate hyperedge occurrences); **0 mismatches**.

## Result C — selected hypergraph Laplacian is an exact yet incomplete observer

[Carletti–Fanelli–Nicoletti MECH-07](../references/2026-10-14-priority-primary-equation-extraction-batch-02.json) defines for a fixed hypergraph the off-diagonal operator K_ij = Σ_e (|e|−1)B_ei B_ej, with L=D−K. This has an exact weighted-pairwise graph representation as a **selected linear operator**. That operator need not reconstruct higher-order incidence.

**Explicit seven-vertex proof witness:** Let A consist of seven Fano triples 012,034,056,135,146,236,245. Construct B by swapping named vertices 1↔2 in all triples, without moving the **fixed named-input intervention**. Each of the 21 unordered pairs occurs once in either design, so K_ij=2 off the diagonal for both and their L are identical. Yet the native bit assignment with ones at named vertices {1,3,5}, zeros elsewhere and W={3} enables the rank-3 occurrence 135 in A, and **no** rank-3 occurrence in B. This proves selected operator equality **does not recover fixed-label higher-order guard response**. These two designs **are isomorphic when simultaneously relabeling the node identities and intervention**; no distinct *unlabeled* isomorphism classes are asserted.

This is a more discriminating failure than mismatched numbers: two mathematical representations yield **exactly equal** operator results while disagreeing on which named legal events exist.

## Result D — source-actual state dependency blocks a static conflict graph

Original [T4](../experiments/results/2026-10-13-t4-exhaustive-local-commutation.json) remains an exact negative. The local screen rechecked the pinned k3/rule-4 active-bit-flip case (weights bitmask 11, newborn bit-one, original rank-3 output). Pair e=012 and f=013 in the same complete-overlap initial incidence is coenabled in both bit masks 0 and 1. At mask 0, firing either disables the other; at mask 1, the two legal orders complete an equivalent commuting square. The selected rule ID and incidence are unchanged. **A context-insensitive pairwise event-conflict graph cannot reflect this behavior.**

The original **83** state-sensitive T4 signatures and **660** initially pairwise-commuting triples that fail full composition remain prior archival findings; we did not rerun that exhaustive campaign.

## Additional candidates that DO NOT yet qualify as isomorphisms

- Zwiebach closed-string field algebra has genus-indexed graded **higher-arity compositions**. Matching arity alone is insufficient: original BRST, graded state space, generalized Jacobi sums and surface sewing remain load-bearing; no mapping to native event changes or T4 third-event legality constructed. Preserve source's claimed broad physical context but **do not infer strings/gravitation** from this screen.
- Original causal-set chain/link propagation and retarded order operators may be source-faithful *observers* and useful relational fragments. They are not automatically native event-generation laws, and the source's continuum/field premises are not transferable without proof.
- Guarded adhesive graph rewriting and contextual Petri systems offer candidate frameworks for constructing process-level matches, but **source-consistent guarded event creation/bit mutation/freshness, occurrence identity and triple coherence are not yet represented and checked**.

## Reproduction and evidence boundary

- [Executed local Node.js replay source](../experiments/2026-10-14-bounded-isomorphism-pass.cjs) · [exact output](../experiments/results/2026-10-14-bounded-isomorphism-pass.json) · [independent Python check](../experiments/2026-10-14-bounded-isomorphism-independent.py) · [evidence manifest](../experiments/results/2026-10-14-bounded-isomorphism-evidence-manifest.json) · [machine-readable candidate register](../references/2026-10-14-bounded-isomorphism-candidate-screen-01.json).
- Source bytes recorded by exact Git blobs; the replay and independent subset check ran locally with zero failures. Neither original native engine main run, exhaustive T4 rerun, original external full theorem rederivation, nor a new broad emergence simulation was performed.
- **C1** systematic literature saturation, **C2** technical source readiness, **C3** contrary source sweep and **C4** faithful whole-process cross-theory mapping remain **OPEN**. This result is **two exact fragment correspondences and two precise limits**, not a novel universal physics law or particle/gravity/light derivation. Keep Woit/Lisi, qualified IsoGraph authority and main untouched.
