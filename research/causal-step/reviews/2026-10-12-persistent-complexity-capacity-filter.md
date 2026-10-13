# Higher-order Causal Step research — persistence plus nontrivial complexity capacity

**Date:** 2026-10-12. **Research origin:** Joshua Oshiro. **Formalized filter, implementation and analyses:** AI-assisted.  
**Status:** exploratory computational **selection filter**, not qualified physical law, computation-universality proof, evidence for particle emergence or a publication-ready causal-graph topology correspondence.  
**Experiment source:** standalone [complexity screen](../experiments/hypergraph-complexity-screen.mjs), [independent horizon/seed runner](../experiments/hypergraph-complexity-holdout.mjs), derived from [higher-order hypergraph rewrite lab](../experiments/hypergraph-rewrite-lab.mjs). Archived original Model A HTML is untouched.

## Researcher's exact additional criterion

> All right. Another filter you can use is the ones that form very simple reoccurring patterns indefinitely can pretty much be ruled out. Only the ones that exhibit behavior of being able to represent some complexity are actually valid for this.

This **adds a second necessary research condition** to the researcher's previously clarified meaning of “steady state”: **the system must not collapse** and its dynamics must demonstrate **capacity to represent/generate nontrivial complexity**. A monotone ever-growing node count or a certified infinite chain of identical local reproduction steps is **not sufficient** to call a candidate scientifically viable.

**Key scope correction:** distinguish a low-complexity **orbit/trajectory** under specified initial hypergraph, node states and scheduler from an incapable **rule** over every admitted initial configuration. An indefinitely repeating simple trajectory can be screened out *as an explanatory example*; discarding the entire rule as fundamentally incapable requires broader evidence, or a scoped mathematical impossibility argument. A simple local transition repeated many times may still produce complex global relational topology, so a *locally simple signature* is only a **preliminary warning** until global structural novelty and causal-processing capability are checked.

## Relevant independent background (analogies, not imported model physics)

- S. Wolfram, “Universality and complexity in cellular automata,” *Physica D* **10** (1984), DOI [10.1016/0167-2789(84)90245-8](https://doi.org/10.1016/0167-2789(84)90245-8): distinguishes homogeneous, simple recurring, chaotic and complex localized organization (the familiar four-class categorization). This does **not** equate complexity with maximal randomness or prove a particular hypergraph model universal.
- C. G. Langton, “Computation at the edge of chaos: Phase transitions and emergent computation,” *Physica D* **42** (1990), DOI [10.1016/0167-2789(90)90064-V](https://doi.org/10.1016/0167-2789(90)90064-V): emphasizes **information transmission, storage and modification** as useful capabilities to test. “Edge of chaos” is not prescribed as a physical origin condition.
- A. Dhar, P. Lakdawala, G. Mandal and S. R. Wadia, “Universal Cellular Automata and Class 4,” 1994 [arXiv:cond-mat/9409080](https://arxiv.org/abs/cond-mat/9409080): observes that a class assignment depends importantly on initial conditions, providing a concrete caution against rejection of an entire rule after one repetitive run.

The proposed higher-order capability gate is our **new**, bounded research criterion, not an assertion that cellular-automaton classification directly describes physical spacetime.

## Two independent gates and explicit statuses

**P — Persistence/noncollapse:** retain candidate behaviors where a specified nontrivial relational witness persists and/or rewriting remains productive. A program stopping at its horizon is **right-censored**, not proof of indefinite survival; a mathematically proven perpetual constructor is stronger, though possibly trivially self-replicating. An absorbing state is not automatically *structural collapse*: the current birth-only laboratory never deletes nodes and retains nonempty hyperedges. Do **not** reward this trivial structural nonemptiness.

**C — Nontrivial complexity capacity:** probe whether admitted initial conditions and higher-order interactions can generate **multiple causally dependent, distinguishable forms of organization** rather than merely firing the same local signature forever. A full future claim should test representation-invariant motif variety, structured novelty, sustained context-dependent feedback, information storage/transmission/modification, sensitivity to perturbation, and robustness across scheduler, initial hypergraph and horizon. **Neither raw node count, Shannon entropy by itself, algorithmic-looking noise nor any arbitrarily chosen scalar complexity score suffices.**

Preliminary **screen tags** are *not* formal “valid/invalid physical law” judgments:

- `initially-inert`: no productive rewriting under the tested start; does not demonstrate emergence.
- `stopped-rewriting`: rewrite activity ceased; graph may remain structurally nonempty.
- `simple-periodic-local-tail`: recent local event stream has an exact small period and limited alphabet; deprioritize **this trajectory** as evidence of complexity.
- `structured-dynamics-candidate`: **only provisional**, activity survives the horizon; recent local rewrite signatures remain diverse and aperiodic under a short-period test, while existing overlapping hyperedges continue to be activated through collective state changes.
- `complexity-not-yet-established`: neither decisive complexity evidence nor a sufficient simple-pattern rejection.

## What exactly the executed screen measured

The first test reused **the exact deterministic base rule enumeration and source functions** from the previously saved higher-order rewrite laboratory. For each `k∈{3,4,5}`, 12 rules were **deliberately selected**, **six** with a mathematically certified homogeneous perpetuity witness and **six** otherwise, among the prior first-192-rule deterministic sample. These are **not** representative random samples of all `k`-ary rules; the enrichment of certified-simple candidates biases any proportions.

For each rule, cross:

- three node-state starts: all-zero, all-one and a mixed canonical binary assignment;
- one single `k`-hyperedge versus all `k`-hyperedges on `k+1` initial nodes (overlap-rich);
- FIFO versus seeded-random eligible-edge selection;
- unchanged binary node states versus an explicit aggregate-`k)-participant mutation function **matched** to that rule and starting configuration.

Therefore `12×3×2×2×2 = 288` trajectories per `k`, **864 total**. The first observation horizon was **120 productive rewrites**; the same resource safeguards as the original lab applied (2,000 nodes, 16,000 hyperedges). **No tested run reached either budget.**

A local-event signature is `(input k-node Hamming weight, newborn bit, number of participant-bit changes, whether any previously ineligible OLD higher-order hyperedge became newly eligible)`. The program separately records coarse structural overlap with unfired hyperedges and the *number of distinct combined signatures*. A previously ineligible edge may share **one or more** participants; a separate diagnostic counts instances of `≥2` shared participants.

For the last **64** rewrite events, record:
- `D64`: number of distinct local state/causal-transition signatures;
- `R64`: number of rewriting events that **reactivated at least one existing** formerly ineligible higher-order hyperedge;
- `p64`: the smallest exact signature period `p=1,…,12`, if any.

The provisional `structured-dynamics-candidate` tag requires: still productive at horizon; **`D64≥3`**, **`R64≥2`**, and **no exact `p≤12`**. A `simple-periodic-local-tail` warning requires productive continuation but an exact `p≤12` and `D64≤2`. The other cases remain unresolved. **These numerical thresholds are exploratory and were refined after inspecting an initial, more permissive 120-event screen.** They are **not preregistered independent statistical validation**, a definition of true complexity, or a mathematical upper bound on reachable behavior. In particular, “no period ≤12” does not establish mathematical aperiodicity or computation universality.

## Executed 120-rewrite results

| Fixed interaction rank | Tested trajectories | Initially inert | Stopped rewriting after activation | Productive, simple periodic local tail | Productive, candidate ongoing diverse feedback | Other unresolved |
|---:|---:|---:|---:|---:|---:|---:|
| 3 | 288 | 84 | 62 | **85** | **18** | 39 |
| 4 | 288 | 112 | 92 | **64** | **12** | 8 |
| 5 | 288 | 84 | 77 | **88** | **14** | 25 |
| **Total** | **864** | **280** | **231** | **237** | **44** | **72** |

All source-recorded trajectories were finite, none hit node/edge budgets. The **44 candidates** are only **eight distinct selected rule predicates across ranks**, with multiple starts, mutation variants and scheduler choices; they do **not** establish 44 different complex physical systems.

**Source-mechanics check:** The screen's single-initial-hyperedge trajectory simulator was compared directly against the older source's `coupledTrial()` function for **432 matched cases** across k=3/4/5. Both engines agreed in each case on stop/continuation classification, executed rewrites, live hyperedge count and eligible frontier (**zero observed mismatches**). This does not test every complex-graph isomorphism or the “overlap-rich” extension independently.

## Same complete rule can generate both simple and more varied trajectories

A useful **controlled counterexample to indiscriminate pruning** is k=5, sampled rule **ID 21**, with the same aggregate participant-state mutation operator `mode=2`, under FIFO scheduling:

- all-zero single-k-hyperedge start: after 120 events, exact **period-1 local signature**, with **zero recent old-edge reactivations**;
- mixed-state single-k-hyperedge start: after 120 events, **five** distinct event signatures in its last 64 events, **24** last-window reactivation events, no detected period at most 12.

The rule/aggregate mutation and scheduler are unchanged; **only the initial binary node states differ**. Other examples exist (k=4 ID 21, k=5 ID 63, with different topology or scheduler also involved).

**Therefore:** the simple all-zero trajectory merits deprioritization as an explanation of observed complexity; its existence **does not establish that the complete rule is incapable of complex behavior**. Conversely, the mixed-state case is still only a **candidate** based on local diagnostics.

## Follow-up: longer horizon plus alternate scheduling seed

A **separately reproducible holdout program** selected 7 rule-and-input configurations (k3: IDs 4, 28; k4: IDs 0, 21; k5: IDs 21, 81, 4), each with two schedulers and matched state-mutation-off/on controls, **28 trajectories** total. These were re-executed at a **400-rewrite horizon**:

- All **28** remained productively active at 400; none touched node or hyperedge caps.
- Of the **14** state-changing trajectories, **12** still passed the provisional recent-nonperiodic-feedback screen; two continued branching but no longer passed the stronger filter.
- **Zero** of the 14 fixed-state controls received the strict feedback-candidate tag.

The same 28 cases were rerun at 400 using a **different seeded-random scheduling sequence** (`+982451653` to the original PRNG seed). All **14 FIFO** runs are deterministic and unaffected by the seed; only the **14 seeded-random** runs constitute a genuinely changed scheduling control. Outcome counts remained 12/14 state-changing candidates, with no resource-censored cases. This is evidence of some **bounded scheduler robustness**, not independent sampling over rule/initial-hypergraph space or a theorem of indefinite complexity.

The holdout runner reproduces **all 28** of the first 400-rewrite datasets **exactly**, byte-equivalent after comparing the JSON `rows` objects. The separate source and per-arity datasets are:

- [Runnable source for 120-event complexity screen](../experiments/hypergraph-complexity-screen.mjs) and [source for 400-event/alternate-seed holdouts](../experiments/hypergraph-complexity-holdout.mjs).
- [k3 120-event CSV](../experiments/results/2026-10-12-complexity-screen-k3-trials.csv), [k4](../experiments/results/2026-10-12-complexity-screen-k4-trials.csv), [k5](../experiments/results/2026-10-12-complexity-screen-k5-trials.csv); each has companion summary JSON.
- [k3 400-event holdout](../experiments/results/2026-10-12-complexity-holdout-k3-400.json), [k4](../experiments/results/2026-10-12-complexity-holdout-k4-400.json), [k5](../experiments/results/2026-10-12-complexity-holdout-k5-400.json); each has `seed982451653` counterpart in the same folder.

## Implication for previously certified perpetual rules

The earlier restricted rule family contains **1,344** explicitly constructed perpetual-branching settings (of 12,070 symmetric parameterizations across k3/4/5), with **59** in the originally sampled 192-rule-per-rank pools. The certificate comes from **homogeneous-state input** and a constant-birth state that emits same-rank eligible hyperedges: `F(t)=1+(k-1)t>0`.

Those certificates prove **nontermination of a trivial homogeneous branching witness**, not any ability to store/transmit/transform nontrivial information. The researcher has explicitly asked to **screen out indefinitely repetitive trivial behavior** as an inadequate explanatory candidate. Thus each such **uniform witness trajectory** is **not a passed complexity demonstration**, even though the rule's broader expressive capacity remains unresolved until other starts or structural-coupling patterns are tested.

Do **not** misinterpret these observations as a theorem that *every* one of those rules is intrinsically incapable of complex behavior: their weight masks may admit other configurations; graph incidence may carry additional structure even when node bits are uniform; and different state-update functions are **different full rules**. Showing feedback after **adding** an aggregate mutation mechanism to the base rule does not retroactively establish the original immutable-state rule was complex.

## Next higher-quality qualification tests (still research, not publication)

1. **Define a structural information task**, not just a threshold score: an exact/approximate graph-invariant motif as stored state, a localized perturbation that can propagate via overlapping higher-order relations, and an output readout that distinguishes inputs in held-out cases. Storage + transmission + conditional modification is more persuasive than a noisy trace.
2. **Apply larger and independently generated starting higher-order hypergraphs**, including non-isomorphic incidence patterns, and test exact relabeling/alternative-scheduler controls. Do not identify a complete 2-section/pairwise projection with a true hyperedge.
3. **Use causal/provenance support for novelty:** exclude added node IDs and simple size growth from “new information”; monitor bounded structural motifs and their distinct causal roles; use compression/randomized null controls, with specified comparison scope.
4. **Test noncollapse when loss is possible:** introduce a separate, precisely labeled interaction family that can disrupt and reorganize a persistent higher-order motif. The prior birth-only rules are biased toward perpetual nonemptiness, so require a nontrivial survival witness, not merely any surviving edge.
5. **Longer horizon and mathematical certification:** prove perpetual structural/functional survival only when possible from exact rules; use finite horizons as right-censored evidence otherwise. Robustness and possible computation universality are stronger optional research questions, not assumptions.

**Current disposition:** The user's added second filter is now active as a **research-prioritization screen**: simple indefinitely repeating behavior is insufficient; demonstration of conditional higher-order complexity merits deeper investigation. The k3/4/5 toy experiments have **44 provisional structured-dynamics candidates at 120 events**, but none yet meets a claim of proven physical, universal or unbounded complexity generation. The two original Causal Step working premises and all archived Model A code are unchanged.
