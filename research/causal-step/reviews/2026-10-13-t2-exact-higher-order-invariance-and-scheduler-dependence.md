# T2: 8,000-rewrite observer-level relabeling, scheduling, and event-provenance replay

**Recorded:** 2026-10-13 (America/Los_Angeles). **Project:** Causal Step, separate from Woit/Lisi. **Status:** executed exact finite-computational evidence; **not** evidence for particle, gravity, quantum or cosmological emergence, nor semantic IsoGraph qualification.

**Research direction:** Joshua Oshiro — continue the mechanism-level research on truly higher-order causal networks, specifically T2 of the [new foundational comparison](2026-10-13-asynchronous-causal-physics-mechanism-comparison.md). **Execution / observer design:** AI-assisted. **Historical results and rule authorship:** retain original research attribution and provenance, never overwrite earlier source.

## 1. Frozen source and reproduction

- **Unmodified original engine:** [`hypergraph-long-horizon.mjs`](../experiments/hypergraph-long-horizon.mjs), Git blob SHA **`87a420edfb3e562d7fcbacf4ca607b1e6952ac08`**.
- **Unmodified 8,000 historical comparison CSV:** [`2026-10-12-higher-order-long-8000-summary.csv`](../experiments/results/2026-10-12-higher-order-long-8000-summary.csv), Git blob SHA **`d2d40f87d59a5a94d2df71a69543e521f6ad807f`**.
- **New non-invasive reproduction harness:** [`hypergraph-t2-invariance-replay.cjs`](../experiments/hypergraph-t2-invariance-replay.cjs), research observer only. Git blob SHA **`bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e`** at full-campaign collection.
- **Evidence manifest:** [`2026-10-13-t2-complete-h8000-evidence-manifest.json`](../experiments/results/2026-10-13-t2-complete-h8000-evidence-manifest.json). It pins per-output Git blobs, tested context/scheduler/seed/mutation, relabels, first negative steps and historical comparator.

**Execution environment:** local V8 isolate with Node-compatible `process`, `fs`, `path` adapters. The harness reads the original runner as source text, removes CLI import/print side effects, and instruments precise original insertion anchors while preserving all bit-mutation functions, eligibility predicates, Fenwick scheduler indexing, input hyperedge-rank rules, offspring-generation rules, original numerical histories, and resource limits. It does **not** change or replace the committed generator. A standalone Node-22 reproduction entry point checks exact Git blob SHA-1 for engine and baseline CSV before replaying the same observer experiment; Node-22 execution of that entry point **was not claimed in this research cycle**. The actually run path is the V8 isolate.

The observer-derived execution **does** introduce an intentionally relabeled *copy* of the input state and a selectively *transported* event-occurrence selection sequence. These are diagnostic interventions in a derived experiment, **not modifications to the original generator or claims about physical temporal gauge**. The frozen run itself is independently regenerated at its original selected parameters and checked against historical outputs.

## 2. Why the test is mechanistic, not just numerical

The original rules operate on one **atomic rank-k hyperedge** of participating nodes. Eligibility depends on the total participant bit count; the firing event may mutate all its participants, consume or retain that hyperedge, create one newborn, and emit prescribed genuinely rank≥3 hyperedges combining the newborn and subsets of the original participants. The runner tracks actual edge **occurrences**, including repeat incidences that must not be collapsed into one pairwise shadow.

For each original history, the observer records an **event receipt**:

`(event index, canonical edge-occurrence provenance, sorted (canonical participating node, prestate bit) pairs, frontier before, input Hamming weight, newborn state, changed participant count, old-edge overlap count, old formerly-ineligible occurrences activated, canonical new hyperedge occurrence set, frontier after, node count, living edge count)`.

A unique occurrence key combines initial incidence or the **birth-event step** with the canonical source/newborn participant set. Because a newborn is identified by the event that created it, and all starting nodes are carried through an explicitly bijective initial-node permutation, this preserves the witnessed event history for the tested conditions. The observer compares **each actual receipt at each of the full 8,000 events**, not merely two summary statistics or rolling hashes. Digests are included for navigation only and are not correctness or collision-free identity evidence.

**Two distinct questions, never conflated:**

1. **Transported schedule equivariance:** If source event occurrence `e` fires at step `t`, choose the correspondingly relabeled occurrence `P(e)` at step `t` in the relabeled copy. Do its participant states, offspring, reactivations, full boundary measurements and possible subsequent event conditions stay in exact correspondence? This tests the current source's local transition-law equivariance *along specified lawful histories*.
2. **Untransported operational scheduling:** With the same raw FIFO or numeric pseudorandom selection and the same seed but permuted node IDs, are the **same canonical occurrences** selected? This checks the implementation scheduler/coupling, not the theory's inherent invariance under all scheduler choices.

Changing raw numbered labels can change the sorted order of emitted hyperedges and hence the Fenwick eligible-index order. A fair covariance claim must specify whether the scheduler is part of the dynamical law or extrinsic host bookkeeping. The original host's tick/rewrite index remains **not a physical clock unit**.

## 3. Execution results

All seven original rule/context settings with **both FIFO and random event schedulers** were replayed through 8,000 rewrites. Two initial label permutations (rotation and reversal) were used for each of the **eight rank-3/rank-4 histories**, and rotation for all six rank-5 histories; the rank-5 #21 FIFO case additionally received reversal. Every transported replay went the full 8,000 events.

| Arity / rule | Original histories | Full transported relabels | First differing event under untransported relabel, FIFO / random |
|---|---:|---:|---|
| **k3 / #4**, zero/single | 2 | 4 | 2 / 2 |
| **k3 / #28**, mixed/overlap | 2 | 4 | 54 / 3 |
| **k4 / #0**, zero/single | 2 | 4 | 2 / 2 |
| **k4 / #21**, mixed/single | 2 | 4 | 2 / 2 |
| **k5 / #21**, mixed/single | 2 | 3 | 2 / 2 |
| **k5 / #81**, mixed/overlap | 2 | 2 | 12 / 2 |
| **k5 / #4**, mixed/overlap | 2 | 2 | 12 / 2 |
| **TOTAL** | **14** | **23** | **14/14 differ within first 400** |

The complete results are:

- **14/14 original histories** agree with their archived 8,000-step runs on **126/126** checked scalar fields (9 fields per history). All are observation-horizon censored, not proved infinite.
- **23/23 transported, relabeled histories** have exact **full 8,000-event receipt equality AND selected 17-field numerical summary equality**, not just matching hashes.
- **14/14 untransported rotation controls** diverge from baseline at the first event occurrence specified in the table; in **all 14**, the first differing receipt has a **different canonical selected-edge occurrence**, not just reordered output metadata.
- **7/7 FIFO/random pairs** have different full event-receipt digests under the original labeled configuration. This is evidence of distinct chosen histories, not proof that all effective observables differ.
- **No physical law, force, metric, quantum state, entropy driver or new core rewrite rule** was installed.

Total executed source rewrite evaluations in the eight substantive result batches: **112,000 original + 184,000 transported + 11,200 raw-relabel diagnostic prefixes = 307,200**. Auxiliary smoke tests are not included. This is a count of locally executed *synthetic rewriting events*, not an amount of physical time.

**Important preserved negative:** Historical k5/#81 FIFO event-local signatures show an exact **period five in the final measured 64 and 256 events**; the local-period counterexample survives. k4/#21 FIFO has an insufficiently diverse local tail but the random schedule passes the old exploratory filter. T2 does not change or supersede these findings. The new event histories are invariant **conditioned on matching event choices**, even when those choices produce an uninteresting periodic local trace.

## 4. The mechanistic inference and the precise limits

**Observed positive:** For these 23 selected 8,000-rewrite histories, a specified bijective initial node relabeling plus transport of the exact event-occurrence sequence produces the same fully labeled-invariant event receipts under the original k-ary source rules. The result directly tests *actual enabled joint interactions*, emitted higher-order occurrences, provenance and observable effects of bit mutation and hyperedge reactivation. In the experiment's **specified category of actual histories with transported scheduling**, the two representations behave equivalently at the examined observer level.

**Observed negative:** Original FIFO and seeded-random **numerical coupling** are not relabel-equivalent on these cases. A stable raw PRNG seed does not couple permutations of ordered edge-occurrence lists into the same physical event: its draws select eligible-list ranks, and ranks are not invariant under storage-label-dependent insertion order. FIFO likewise chooses creation/index order, not a canonical causal condition.

**Do not overstate random scheduling:** In an *ideal mathematical* scheduler sampling uniformly over eligible hyperedge **occurrences**, relabeling supplies a bijection between eligible occurrence sets, so its **conditional one-step probability kernel** is permutation-equivariant if the local rule is. A deterministic seeded PRNG choosing the same rank under different enumeration orders **need not produce identical sample paths**. T2 tested seed coupling and conditional replay, not a distributional statistical comparison, nor a formal theorem for all reachable states. Treat stochastic covariance, pathwise equality, and FIFO canonicality as distinct obligations.

**What T2 does NOT prove:**

- Universal isomorphism of all possible infinite histories, all interventions, or scheduler-independent final configurations.
- That the runner's host `rewrite` index is a physical Causal Step, or any Euclidean distance, Lorentz factor or gravitational effect.
- Robust global complexity, stable information processing, particle-like excitation, emergence of Hilbert dynamics or general relativity.
- That a naive binary DAG captures the source's genuine k-way enabling conditions. The earlier [exact k-ary vs binary intervention witness](../experiments/results/2026-10-13-higher-order-causal-projection-and-scheduling.json) remains an independent negative result.
- Anything about final physical dimensionality, dark matter/dark energy ontology, or measured cosmic acceleration.

**Technical limitations:** The current observer receipts intentionally track selected, newly emitted and newly activated hyperedge occurrences and aggregate current frontier/live counts, **not** a full canonical enumeration of all extant edge states at every prefix or an exhaustive output distribution. Permutations are specifically rotation/reversal of the small initial node set (not all `n!`), while newborn labels are identified by the matched birth event. The comparison is strong **for its scoped histories**, not global structural equivalence. Node states are binary toy variables; source rule families have fixed sampled arity `k∈{3,4,5}` for these trials, but this is **experimental sampling**, not an adopted bound on fundamental dimensionality or rank.

## 5. Two distinct next decisions

**D1 — Do not conflate source-covariance with scheduler independence.** Keep current FIFO and random historical evidence unchanged. A new **separately versioned observer/selection experiment**, if justified, should compare:

- exact distribution-level uniform eligible-occurrence kernels on small reachable k-ary states;
- FIFO source-index artifacts versus structurally defined event categories, with multiplicity and provenance retained;
- commuting independent rewrite operations versus overlapping higher-order firings whose enabling state changes after the first operation.

The choice of a physically realized selection rule is a **further dynamical assumption**, not recoverable solely from the observed relabeling property.

**D2 — Prioritize original T3 next:** Study whether causal-order interval counts, antichain neighborhoods or other dimension-free observers can recover the genuine higher-order enabling and event provenance, with controls where identical pairwise projections conceal different interventions. Use **full true k-way incidence first** and compute binary partial-order observers only as explicitly lossy projections. Continue to reject fixed 3D/4D dimensions, imported metric, masses, and arbitrary entropy-pressure dynamics.

## 6. Saved audit

[Complete manifest](../experiments/results/2026-10-13-t2-complete-h8000-evidence-manifest.json) and eight [results](../experiments/results/) allow exact reproduction. The two-source SHA check in the standalone harness **fails closed** if the frozen engine or historical CSV changes. All results and source input references were read back from GitHub before this review. No GitHub Actions, merge, Woit/Lisi changes or original generator edits occurred.

**Research provenance:** This work follows Joshua Oshiro's substantive 2026-10-13 handoff and the original two Causal Step research premises. The new T2 observer, experiment scaffolding, conditional-covariance interpretation and analysis are AI-assisted; the original higher-order toy model, previously recorded negative results, and external physics literature retain their independent provenance. No new physical premise was adopted.
