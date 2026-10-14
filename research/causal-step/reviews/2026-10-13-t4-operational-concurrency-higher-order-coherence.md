# T4 — Operational causality from higher-order rewrite commutation, conflict and three-event coherence

**Recorded:** 2026-10-13 (America/Los_Angeles). **Track:** Causal Step, independent of Woit/Lisi. **Research direction:** Joshua Oshiro, who requires genuine higher-order, pre-metric causal structure, causal succession rather than physical clock time, internal rather than merely output-level comparisons, and separate noncollapse plus complexity-capacity filters. **Research formulation, code and evidence interpretation:** AI-assisted. **Status:** executed scoped finite mathematics / unchanged-source observer replays; **not** physical verification, a newly adopted physical premise, or qualified IsoGraph authority.

**Predecessors:** [T2 8,000-event relabel controls](2026-10-13-t2-exact-higher-order-invariance-and-scheduler-dependence.md), [T3 order/interval information loss](2026-10-13-t3-causal-order-interval-observer-noninjectivity.md). All historical failures remain.

## 1. Exact meaning of operational independence

For an actual higher-order state H, preserve **each distinct hyperedge occurrence** with its full participant set (rank ≥3), source-bit state, life/fired status and mutation/birth rule. Eligibility depends on the **joint** participant input, not a pairwise shadow. Two different event occurrences e,f are *coenabled* if both source rules are independently eligible in H.

An **operational commuting square** requires:

1. Both e and f initially enabled.
2. Each remains enabled after executing the other first.
3. Executing e then f and f then e leads to **the same complete resulting state under a declared equivalence**.

The equivalence fixes every pre-existing node and hyperedge occurrence, including incidence multiplicity and alive/fired/eligible flags, and identifies each of the two new nodes by the **specific event occurrence producing it**, instead of arbitrary host numeric birth order. It compares all newborn bits/depth and all emitted k-ary incidence occurrences. Numeric Fenwick storage and selection order is intentionally excluded (T2 already showed those are representation-dependent), as are diagnostic per-order counters that are not part of the generative state. This is **not** a claim of equivalence under every future scheduler.

Separate outcomes:

- **COMMUTE:** all three tests pass, so two selected firings are locally independent under the declared complete-state observer.
- **DISABLING CONFLICT:** at least one operation disables the other in the reverse order; conflict can be asymmetric in which order is permitted.
- **COENABLED ORDER SENSITIVITY:** both operation orders remain executable but reach different complete states; enablement agreement is insufficient.
- **HIGHER COMPOSITION FAILURE:** every pair can commute from the initial state but a third event changes enablement in an attempted three-step permutation.

A conflict is a **branching alternative**, not automatically an arrow saying one actual event had to precede the other. Event **creation** and **reactivation** are separate directed conditional-enabling relations. The host rewrite index merely numbers executed simulation steps and is not a fundamental time unit or identified with the researcher's new causal-step unit.

## 2. Source fidelity and executed method

Frozen unmodified source: [hypergraph-long-horizon.mjs](../experiments/hypergraph-long-horizon.mjs), Git blob SHA **87a420edfb3e562d7fcbacf4ca607b1e6952ac08**. Frozen [T2 observer helper](../experiments/hypergraph-t2-invariance-replay.cjs), SHA **bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e**. Original 2026-10-12 8,000-rewrite comparison CSV SHA **d2d40f87d59a5a94d2df71a69543e521f6ad807f**. None was changed.

Four new diagnostics:

- [Two-event full squares](../experiments/2026-10-13-t4-two-event-squares.cjs)
- [Consecutive actual-source event dependency](../experiments/2026-10-13-t4-adjacent-dependency.cjs)
- [Exhaustive small initial-state families](../experiments/2026-10-13-t4-exhaustive-local-commutation.cjs)
- [Three-event composition coherence](../experiments/2026-10-13-t4-three-event-coherence.cjs)

Execution uses a local **V8 isolate** with Node-compatible stubs, compiling the *exact source* only after guarded insertion of event/state observers. An independent local two-step reducer follows the pinned original source's birth/bit/keep/rank-mask rules. It was checked against **364/364 complete immediate original-source next states** at sampled checkpoints and **3,584/3,584** complete next states along consecutive actual source events. These checks cover reproducible finite original histories but are not independent physical replications. No separate Node-22 execution of the prepared CLI entry points is asserted.

Experiment settings: the seven earlier selected k3/k4/k5 rule and initial-incidence contexts, FIFO and seeded-random historical schedulers, and original state-mutating versus matched mutation-disabled source control, producing **28 source histories** to **129 rewrites** each. Prior 8,000-step results, synthetic complexity criteria and their failures are unchanged.

## 3. Sampled coenabled two-event squares over the native histories

For selected original states at prefix counts 0,1,2,3,4,8,16,32,64,128, take deterministic bounded samples of currently eligible source occurrences (first, last, and evenly spaced), up to **seven pairs per shared-participant bucket**. This is a sample, not every possible pair in the growing state.

| Measure | k3/k4 | k5 | Combined |
|---|---:|---:|---:|
| Distinct coenabled pair interventions | 2,117 | 2,170 | **4,287** |
| Full-state commuting squares | 1,612 | 1,708 | **3,320** |
| One or both reverse orders disabled | 484 | 168 | **652** |
| Both executable, full successor states different | 21 | 294 | **315** |
| Disjoint-participant pairs that commute | 416/416 | 288/288 | **704/704** |
| Pairs sharing participants | 1,701 | 1,882 | **3,583** |
| Of overlapping pairs, nevertheless commute | 1,196 | 1,420 | **2,616** |

The 3,583 overlapping pairs partition into **2,616 commuting**, **652 disabling**, and **315 coenabled-but-noncommuting** cases. Shared source participation is therefore insufficient to declare either dependence or independence. The **315 both-order-legal different-output cases** prove that an enablement-only observer would miss information load-bearing for internal process comparison.

[Executed rank-3/4 source evidence](../experiments/results/2026-10-13-t4-two-rewrite-squares-k3-k4-129.json) · [rank-5 source evidence](../experiments/results/2026-10-13-t4-two-rewrite-squares-k5-129.json).

## 4. Actual historical adjacent event pairs reveal more than producer ancestry

Within each of the 28 actual executed 129-rewrite histories, classify all **128 consecutive event pairs** against the state **before the first event**. This yields **3,584 adjacent-event comparisons**, each with full-source next-state agreement.

| Exact local classification | Number |
|---|---:|
| Second event occurrence did not yet exist; first creates it | **228** |
| Second existed but was initially ineligible; first activates it | **357** |
| Second was **already enabled** before first | **2,999** |
| Of preenabled: two-event full-state commuting | **2,737** |
| Of preenabled: one reverse direction disables the other | **124** |
| Of preenabled: both orders possible, different outputs | **138** |
| Of commuting preenabled: **shared participants** | **2,076** |
| Of preenabled: order-sensitive beyond direct new birth | **262** |

This exposes two different information losses in naive event-order representations:

- A **conservative shared-touch order** would assign apparent precedence between the 2,076 preenabled, overlapping source events which actually commute in the two-step test. Shared read access need not be a physical causal dependency.
- A **creator-only ancestry order** does not encode the 262 immediately coenabled-but-order-sensitive cases. These are about interference and conditional alternatives, not a necessary universal chronological arrow.

The 228 directly newborn-created selected occurrences and 357 reactivated old occurrences provide **positive immediate enabling evidence**, but not automatically a unique global event partial order. These are bounded source-trace observations, not proof of a physical conservation or causal-time law.

[Executed k3/k4 adjacent controls](../experiments/results/2026-10-13-t4-adjacent-event-dependence-k3-k4-129.json) · [k5 controls](../experiments/results/2026-10-13-t4-adjacent-event-dependence-k5-129.json).

## 5. Exhaustive finite initial-state control: independence depends on the state

The same original rule coefficients are extracted programmatically from the frozen engine; an independently full-source-checked local reducer then enumerates **all binary participant-state assignments** for three explicitly selected **small counterfactual initial-incidence families**. This changes only the initial *mathematical test input*, not the original generator or archived source histories:

1. All k-subsets of k+1 initial vertices, giving k+1 overlapping rank-k occurrences.
2. Two rank-k source occurrences with disjoint participant sets on 2k vertices.
3. Two **distinct occurrences** with *the same rank-k incidence* (a controlled duplicate-incidence condition, not a claim that the original runner initially seeds duplicates).

For each of the 7 original selected rules, compare active mutation and the matched mutation-disabled control. The family-wide enumeration is complete for these finite inputs, **not** for all reachable or unbounded networks.

| Initial test family | Exact binary states enumerated | Coenabled event pairs | Commute | Disable | Both orders legal, different |
|---|---:|---:|---:|---:|---:|
| Complete k+1 overlap | **576** | 5,178 | 4,407 | 741 | 30 |
| Two disjoint inputs | **7,424** | 4,704 | **4,704** | 0 | 0 |
| Duplicate incidence, distinct event occurrences | **288** | 220 | 174 | 26 | 20 |
| **Total** | **8,288** | **10,102** | **9,285** | **767** | **50** |

**83 specific event-pair signatures** change outcome class as the source **binary state changes**, despite retaining the same source rule, same occurrence identities and same incidence pattern. For example, the k3 rule #4 active-mutation pair of rank-3 occurrences sharing sources {0,1} is a disabling conflict under some bit assignments and an exact commuting square under others.

This **rejects a fixed incidence-only independence relation as adequate for these rule contexts**. A state-indexed operational predicate remains possible. Distinct occurrences with identical incidence also cannot be silently merged, because they have separate identities and possibly different effects; this complements T3's earlier probability/multiplicity counterexample.

[Full exact 8,288-state enumeration](../experiments/results/2026-10-13-t4-exhaustive-local-commutation.json).

## 6. Three-event coherence: initial pairwise diamonds are not enough

The higher-order composition test exhaustively enumerates all **three-event triples** of initially coenabled occurrences in the same finite complete-overlap family and tests all three pairs at the initial state. For each triple where all three pairs commute *initially*, attempt **all six orders** with a full-state comparison that maps newborn IDs by their producing event occurrence.

- **6,116** initially coenabled triples over all seven source rule contexts, their 2 active/fixed modes and all binary input states.
- **4,724** of these have three commuting two-event squares at the **same initial state**.
- **660/4,724** nevertheless have **at least one blocked three-event ordering**, because an intervening event changes eligibility. **Initial pairwise independence does not imply higher-composition coherence.**
- **4,064/4,724** have all six orders legal and the full final output states identical under the declared equivalence.
- **0** fully legal six-order triple groups with unequal outputs were found in this *finite* family. This is **not** a confluence theorem for arbitrary triples. For partially blocked groups the permitted subset's endpoint equivalence was not the classification question.
- In total, **28,344** three-event route attempts; **26,544** ran to completion.

**Concrete example:** rule k4/#0, active flip mutation, initial bitmask zero on five vertices, and rank-4 events with old participant sets {0,1,2,3}, {0,1,2,4}, {0,1,3,4}. All three pairwise source interventions commute at the beginning, but every attempted third event is disabled after the first two. The original rule is not altered. This is a purely combinatorial **third-event obstruction**, not an empirically discovered third particle interaction.

[Full triple-coherence experiment and negative witness](../experiments/results/2026-10-13-t4-three-event-coherence.json).

## 7. Useful structural content — but no promoted law

A **derived candidate state-indexed independence query** can be expressed without any background metric:

\[
I_H(e,f)\iff e,f\in E(H)\ \wedge\
 f\in E(H_e)\ \wedge\ e\in E(H_f)\
 \wedge\ (H_e)_f\sim_{H;e,f}(H_f)_e.
\]

This is a reproducible **comparison test**, not a new physics axiom. It separates source-level **producer**, **conditional activation**, **disabling conflict**, **coenabled order dependence**, **local independence**, and **higher-composition failure**. A single binary causal order or all-pairs touch graph discards some of these distinctions.

Two narrow mathematical explanations follow from the *actual source implementation*, conditional on both chosen firings remaining within operational resource limits and on comparing complete states modulo event-born numbering:

- **Disjoint source sets:** each firing tests and changes only its selected participants; newborn bit and edges depend only on those participants. Independent disjoint operations therefore retain each other's original inputs and should commute, including recomputed eligibility of every third hyperedge as a function of identical final node states. Evidence: **704/704** sampled and **4,704/4,704** exhaustive finite disjoint examples. A formally qualified all-state lemma is not asserted.
- **Mutation disabled:** no old participant bit changes, so distinct coenabled source occurrences remain jointly executable even with shared inputs, and their emitted newborn-specific hyperedges compose without interference. This is a **control operation**, not a proposed entropy/back-pressure-driven equilibrium or new fundamental law.

Two caveats matter: **source execution indices and diagnostics are not physics**, and the tested interchange does not equate raw FIFO/PRNG future choice streams. T2 already found their label/creation-order coupling differences. A local diamond is weaker than preservation of an infinite causal history.

## 8. Independently developed mechanisms worth comparing next

[Five primary-source concurrency/register entries](../references/2026-10-13-t4-operational-concurrency-mechanism-sources.json) were added without altering F01–F27 or the dark-sector observational gates.

- [Mazurkiewicz, *Theory of Traces* (1988)](https://doi.org/10.1016/0304-3975(88)90051-5) formalizes equivalence of interleavings by commuting independent action letters. Its **fixed independence hypothesis** must not be silently identified with the state-dependent k-way predicate, and T4's 660 triple blocks demand composition-level validation.
- [Ehrig et al., adhesive HLR graph transformations (2006)](https://doi.org/10.3233/FUN-2006-74103) proves concurrency/critical-pair theorems under specified typed attributed graph / adhesive HLR conditions. The native state-mutation, multiset occurrence, matching, and newborn source law have not been demonstrated to satisfy the theorem's full categorical/gluing hypotheses. Its proof can guide a **future faithful embedding**, not serve as existing Causal Step qualification.
- [Baldan, Busi, Corradini and Pinna, read/inhibitor event structures (2004)](https://doi.org/10.1016/j.tcs.2004.04.001) is an especially promising comparison for *read-only shared-context concurrency* and **asymmetric conflict**, preserving more causal information than a universal touch DAG.
- [Baldan et al., contextual net prefixes (2008)](https://doi.org/10.1007/978-3-540-89287-8_12) and [efficient contextual unfolding (2012)](https://doi.org/10.1016/j.tcs.2012.04.046) explicitly model read-only access and multiple event histories. Their net/token/boundedness assumptions need transfer tests before use with the noncollapsing, born-node higher-order toy.

These are established *independent theoretical antecedents*, not evidence that matter, 3D geometry, quantum states, gravitational fields or dark-sector effects have been obtained from Causal Step.

## 9. Scientific disposition and next verification

**Positive outcome:** For the sampled original rule family, a state-indexed, occurrence-aware and *intervention-tested* independence query captures real distinctions missed by birth-only and shared-touch order projections. Negative examples include asymmetric disabling, both-orders-legal unequal complete states, changes in pair independence under different source bits, and initial pairwise commuting triples that become blocked at the third step.

**Important limit:** This does **not establish a unique physical causal event partial order**. Event producer ancestry and conditional activation have directional evidence, while conflicts represent mutually exclusive alternatives and noncommuting coenabled pairs represent different potential histories. Turning the latter into one physical chronological arrow would presuppose what remains to be explained.

**Prioritized next phase — T4.1 / T5 preparation:** construct a *separately labeled observer-only* contextual event structure carrying occurrence multiplicity, producer/activation supports, symmetric/asymmetric conflict and state-indexed independence **plus explicit three-event coherence guards**. Test reconstruction against held-out historical higher-order trajectories (including k4/#21 and k5/#81 periodic negative controls), and study whether an independently justified contextual-net/DPO mapping preserves this richer process structure. If it fails, preserve the information-loss witness rather than modifying the primitive causal source. Only after this can candidate causal-set geometry, collective quantum behavior or gravity be compared on non-arbitrary grounds. Independent observational galaxy, cluster, CMB, growth, BAO/SN, GW, local tests remain obligatory for any dark-sector proposal.

**No modifications:** historical Model A 12-dimension withdrawal, original 8,000-step source and evidence, two working Causal Step premises, Woit/Lisi tracks, main, qualified IsoGraph authority; no GitHub Actions or merge. No new physical dimensionality ceiling, external physical clock, force/mass, Hilbert space or speculative entropy pressure was installed.
