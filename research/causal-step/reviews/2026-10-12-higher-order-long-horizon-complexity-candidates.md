# Higher-order causal rewriting — extended 3,000/8,000-rewrite candidate tests

**Recorded:** 2026-10-12 (America/Los_Angeles)  
**Direction:** researcher requested substantially longer tests on the most promising prior high-order complexity candidates.  
**Implementation/review:** AI-assisted isolated numerical controls.  
**Authority:** exploratory, finite, synthetic higher-order rewrite results. **No emergent physical particle, metric, gravitational field, computational universality or unbounded complexity theorem is established.** The two Causal Step premises remain unchanged.

## 1. What was tested — exactly

The earlier [complexity-capacity audit](2026-10-12-persistent-complexity-capacity-filter.md) screened 864 k-ary trajectories at 120 rewrites and 28 selected control trajectories at 400. It identified **seven rule/initial-context settings** with potential state-dependent higher-order feedback:

| Order `k` | Sampled rule ID | Initial node states | Starting incidence | Mutation on | Interpretation |
|---:|---:|---|---|---:|---|
| 3 | 4 | all zero | one genuine triple | 1 (invert all firing participants) | feedback persists despite uniform initial states |
| 3 | 28 | mixed | complete 3-edges on four nodes | 1 | overlapping interaction |
| 4 | 0 | all zero | one genuine 4-hyperedge | 1 | state-rewrite feedback |
| 4 | 21 | mixed | one genuine 4-hyperedge | 2 (XOR each source bit by group parity) | scheduling-sensitive border case |
| 5 | 21 | mixed | one genuine 5-hyperedge | 2 | higher-order feedback |
| 5 | 81 | mixed | complete 5-edges on six nodes | 2 | FIFO may be simple-periodic |
| 5 | 4 | mixed | complete 5-edges on six nodes | 1 | overlapping interaction |

These are fixed **complete rewrite rules**, including chosen `weights/ranks/newborn-state/source retention` parameters and the indicated collective participant-bit mutation. The initial node states and actual higher-order incidences are preserved; no physics interpretation is assigned to bits.

**Expanded horizons and independent processing guards:**
- Rerun all **28** reference configurations (seven starting contexts × two schedulers × mutation on/off) to **3,000** events.
- Rerun all **14** state-changing trajectories to **8,000** events, plus **four** matched fixed-state controls for k3 rule 4 and k4 rule 0 (**18** total).
- Rerun the seven state-changing **random-schedule** conditions at **8,000** with an alternate PRNG seed offset of **982451653** (**seven** additional trajectories). FIFO is deterministic; changing the seed would not make an independent experiment.
- Total: **53 actually executed longer-run trajectories, 284,000 simulated rewrite firings** (overlapping candidate settings rerun from initial conditions at different horizons and scheduling seeds, not 53 independent physical rule discoveries).

The source [replay runner](../experiments/hypergraph-long-horizon.mjs) uses incidence indices plus a Fenwick eligibility tree instead of rescanning all hyperedges after every update. The *simulated update semantics* are unchanged: atomic rank-k hyperedges only; evaluate all k participant states as one relation; for every fired relation optionally consume it, mutate all participants according to the specified rule, create **exactly one** node with the original specified newborn-bit rule, and emit all prescribed newborn-containing higher-order hyperedges. No pairwise spring, Euclidean coordinates, gravity, mass, imposed spatial dimension or numerical Newtonian integration is introduced.

The expanded independent **operational safety guards** are **12,000 nodes and 250,000 live hyperedges**. No test reached either; the largest recorded state contained **8,006 nodes**, and the largest live-edge count was **208,001**. These limits are nonphysical and the horizon itself is observation censoring.

### Source-fidelity verification

Before long tests, every previously saved 400-step selected reference case was re-executed with the optimized source. Comparing **16** fields for **28** trajectories—including steps, all node/edge/frontier counts, depth, bit-change/old-edge-reactivation counts and exact first/last local transition signatures—produced **448/448 exact matches and zero mismatches**. [Immutable verification record](../experiments/results/2026-10-12-higher-order-long-source-agreement-400.json). This establishes matching measured source behavior over the tested interval, **not** a proof of arbitrary-step equivalence.

## 2. Quantitative results

The previously defined **provisional complexity screen** requires a productive eligible frontier at the observed horizon; at least **three** distinct event signatures over the final **64** rewrites; at least **two** recent events newly activating previously ineligible higher-order hyperedges; and **no exact local event period `p<=12`** in that 64-event window. The extended runner additionally inspects exact `p<=128` across the final **256** events and the number of distinct length-three local event words.

This is a deliberately weak **screen for interesting context-dependent dynamics**, not a certified measure of computational complexity, topological novelty, irreducible organized information or processing universality. Thresholds originated after exploratory inspection; no independent statistical hypothesis registration is claimed.

| Cohort | Executions | State-changing executions | State-changing still active | State-changing passing provisional screen | Resource censored |
|---|---:|---:|---:|---:|---:|
| 3,000-rewrite primary | **28** | **14** | **14** | **11** | **0** |
| 8,000-rewrite primary | **18** | **14** | **14** | **12** | **0** |
| 8,000-rewrite alternate random scheduling seed | **7** | **7** | **7** | **7** | **0** |

**No tested candidate lost productive rewriting during any observation window.** There is no mathematical or numerical guarantee that the 8,000-rewrite surviving candidates continue indefinitely.

### Full 8,000-run case-by-case disposition

| Order/rule | FIFO state-changing trajectory | Random-schedule state-changing trajectory | Research priority |
|---|---|---|---|
| **k3 / #4** | D64=3, reactivation events R64=64, no detected period <=128 in 256-event tail | D64=5, R64=62, no <=128 period | **Retain for structured-information tests** |
| **k3 / #28** | D64=3, R64=64, no <=128 period | D64=4, R64=62, no <=128 period | **Retain** |
| **k4 / #0** | D64=4, R64=63, no <=128 period | D64=4, R64=64, no <=128 period | **Retain** |
| **k4 / #21** | D64=**2**, R64=4: **insufficient signature diversity**, though still productive | D64=4, R64=12, no <=128 period | **Conditional / scheduler-sensitive** |
| **k5 / #21** | D64=5, R64=32, no <=128 period | D64=5, R64=33, no <=128 period | **Retain** |
| **k5 / #81** | Exact **period-5** local signatures in the last 64 **and** 256 events, R64=25 | D64=5, R64=37, no <=128 period | **Exclude the trivial FIFO trajectory**; retain rule-wide question |
| **k5 / #4** | D64=4, R64=63, no <=128 period | D64=5, R64=58, no <=128 period | **Retain** |

`D64` is local signature diversity over the final 64 events; `R64` is the **number of those 64 events** which newly activate at least one previously ineligible *existing* k-hyperedge. Values are **not** counts of distinct physical entities or independent Shannon information bits.

The k5/81 FIFO negative result is important: its local event trace is exactly period **5** in the measured trailing window despite continuous additional branching and **25** recent old-edge reactivation events. **An apparent ongoing “interaction” signal can itself be part of a small periodic automaton.** This is why neither periodicity, frontier growth nor reactivation can be used alone.

For k4/21 FIFO, D64=2 but no detected p<=128; it is **unresolved/low priority**, not a proved simple periodic regime. For k3/4 FIFO, the D64 count temporarily fell to **2 at step 3,000** then rose to **3 at 8,000**, showing that a single finite window can wrongly remove a promising trajectory. Its source rules were not changed.

### Matched fixed-state negative controls

- k3/4 (FIFO/random), mutation disabled, reaches 8,000 with **period-1 local event signatures**, no old-edge reactivation, and a persistent eligible frontier of **3**. Its node count reaches 8,003 because the model forcibly births one node per successful rewrite.
- k4/0 (FIFO/random), mutation disabled, also has **period-1** local event signatures and no old-edge reactivation, while its eligible frontier grows to **24,001**. A rapidly expanding frontier therefore **does not demonstrate expressive complexity**.
- Fixed-state controls for the other five settings were included through 3,000 but not duplicated at 8,000, and must not be presented as 8,000 matched controls.

### Alternate PRNG schedule-seed controls

A second seeded random event-selection order (offset +982451653) independently replayed the **seven** random-scheduled state-changing trajectories to 8,000. **7/7** remained active and passed the same provisional local-diversity/feedback criterion; **0** hit resource caps. The exact signature histories and frontiers differ across seeds, as expected. The FIFO stream is not independently tested by changing PRNG seeds.

This is **limited bounded scheduling robustness**, not proof that randomness is irrelevant or that the mutation operator generates intrinsically organized information rather than complex-looking trace noise. To evaluate that, a separate explicit information storage/transmission task and structural motif invariance are still required.

## 3. Measured growth and finite-scale warnings

The operational epoch count is a host rewrite count, not physical clock time or an established elementary causal-step unit. Node population necessarily increases by exactly one per successful rewrite. Consequently **every** primary 8,000-run survivor retained at least **8,003** nodes, whether complex-screen passing or trivially periodic. The output-size information alone is *fully programmed*.

At 8,000 the five strongest cross-scheduler rule/initial-context settings are `k3:{4,28}`, `k4:{0}`, and `k5:{21,4}`. The remaining two (`k4:21`, `k5:81`) remain **strongly scheduler-dependent**. This selection is for **follow-up research efficiency**, not a mathematical ranking of universality or an assertion that others are forever incapable of expressive dynamics.

A selected local event signature is a four-component tuple `(input Hamming weight, newborn bit, number of mutated old node bits, whether at least one old formerly inactive hyperedge was newly activated)`. Different global hypergraphs can have the same signature stream. Conversely a simple local stream may hide nontrivial global incidence. Distinct three-event words over a trailing 256-event window, and period lengths up to 128, were recorded to make that incompleteness visible. **No full-hypergraph isomorphism/compression/physical observable was validated.**

## 4. Reproducibility and GitHub records

**Execution:** This work executed the pinned source in a **local V8 execution environment with Node-compatible filesystem/path/process adapters**. It used **no GitHub Actions, hosted test runners, browser animation, or physical simulation infrastructure**. No Node 22 host executable execution of this specific committed file is claimed. Numerical CSV/JSON evidence was saved as independently recoverable GitHub commits during the run.

**Frozen manifest and compact summaries:**
- [Run manifest, exact source and recorded SHA references](../experiments/results/2026-10-12-higher-order-long-horizon-manifest.json)
- [All 28 primary 3,000-step trial summaries](../experiments/results/2026-10-12-higher-order-long-3000-summary.csv) and [checkpoints](../experiments/results/2026-10-12-higher-order-long-3000-checkpoints.csv)
- [All 18 primary 8,000-step trial summaries](../experiments/results/2026-10-12-higher-order-long-8000-summary.csv) and [checkpoints](../experiments/results/2026-10-12-higher-order-long-8000-checkpoints.csv)
- [All seven 8,000-step alternate-scheduler seed summaries](../experiments/results/2026-10-12-higher-order-long-8000-alt-seed-summary.csv) and [checkpoints](../experiments/results/2026-10-12-higher-order-long-8000-alt-seed-checkpoints.csv)
- [448-field exact baseline agreement audit](../experiments/results/2026-10-12-higher-order-long-source-agreement-400.json)
- [Per-context individual full checkpoint JSONs](../experiments/results/) with naming `2026-10-12-higher-order-long-k{3,4,5}-h{3000,8000}-...`, preserving separate source contexts and stage-specific executions.
- [Self-contained optimized replay source](../experiments/hypergraph-long-horizon.mjs). Typical usage: `node hypergraph-long-horizon.mjs 5 8000 results 0 21 both active`, or for independent random schedule seed: `node hypergraph-long-horizon.mjs 5 8000 results 982451653 21 random active`.

**Longer-horizon output restrictions:** Dense hyperedge histories are regenerated deterministically by the committed script rather than all stored as gigantic raw graph snapshots. Checkpoint observations, full run parameters, source hash, per-run seeds and rule IDs are saved. Complete bit-level output equivalence is empirically checked for the existing 400-run prefix, not formally proved for all steps.

## 5. Remaining falsifiers / next experiment, without inventing physics

1. Test **functional rather than visual/statistical** complexity: a perturbation of one labeled or relationally identified source motif must lead to a reliably discriminable held-out output in the later hypergraph, and be conditionally modifiable by a different intersecting higher-order relation. Define readout and mutual-information nulls without relying on globally assigned node IDs.
2. Test whether the functional result is independent of an arbitrary **random scheduler** and robust under relabeling, initial incidence patterns, and two-hyperedge simultaneous matches.
3. Permit separately controlled, competing **higher-order structural loss or reorganization**, so survival is not automatically guaranteed by node birth. Do not introduce Euclidean distances, Newtonian forces or entropy-driven compression to accomplish this.
4. Keep the user's **noncollapse plus complexity-capacity** criteria mandatory; longer simulation alone can only make empirical finite-window claims. The k5/81 FIFO p=5 counterexample shows why blindly granting “survival + feedback” is insufficient.

**Conclusion:** The new 8,000-rewrite executions strengthen *finite-window* evidence that **five selected full rule/initial-condition settings** sustain higher-order interaction-like variety under both schedulers. Two others are scheduler-conditional, including a directly measured simple repeating case. **None is certified to represent physical reality, computation universality or particles.**
