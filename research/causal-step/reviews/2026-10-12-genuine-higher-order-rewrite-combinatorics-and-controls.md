# True higher-order hypergraph branching: combinatorial counts, finite sweeps, and feedback controls

**Recorded:** 2026-10-12. **Research direction:** Joshua Oshiro. **Implementation and analysis:** AI-assisted.  
**Research status:** reproducible finite **toy model** results, not a physical theorem, a canonical unbounded hypergraph representation, particle emergence, or publication-ready spacetime correspondence.

> **Researcher correction, 2026-10-12:** In this investigation **“steady state” means a noncollapsing/persistent configuration, including indefinite growth**. It does **not** require fixed graph cardinality, recurrence or equilibrium. Sections discussing the impossibility of *exact full-graph cycles* address a stronger property **not required by the researcher**. In fact, the current runner disallows node deletion and emits at least one new higher-order hyperedge on every successful rewrite, so **structural nonemptiness is guaranteed by construction**; an “absorbed” graph still retains structure. Follow-up analysis has now classified the finite-run productive survival correctly and established an explicit **inductive perpetual-branching rule family** with verified 1,200-rewrite examples. See [noncollapse definition, 1,344 sufficient perpetual-rule settings and six witness runs](2026-10-12-noncollapse-definition-and-perpetual-branching-certificates.md). This correction supersedes any implication below that failure to reach a fixed point is failure to achieve the requested steady state.

## Scientific question and researcher constraint

The researcher recalls trying many rewrite-rule and initial-node combinations to detect steady states, recognizes that the number of **possible rewrite rules** explodes much faster than the cost of storing a few additional nodes, and **explicitly requires genuinely higher-order interactions rather than pairing**. Researcher wording, including earlier context and the exact correction, is preserved in [DISCUSSION_LOG.md](../DISCUSSION_LOG.md).

The new [standalone code](../experiments/hypergraph-rewrite-lab.mjs) uses an **atomic unordered hyperedge** of rank `k >= 3`. Rule eligibility depends on **the complete set of all `k` simultaneously participating node states**. It does **not** infer hyperedge existence from pairwise edges. Every successful rewrite creates exactly one *new* node, optionally consumes its input hyperedge, and emits newborn-containing hyperedges of size at least 3.

The branch is independent from the archived Model A browser program. It does **not** execute that program, import its spring law or use Newtonian distance, mass, velocity, coordinate dimensions, time integration or forced conservation. One host rewrite is a discrete event in the **toy** relation semantics; it is not yet demonstrated to equal the researcher's physically intended causal-step unit.

## 1. Explicit counting model: not interchangeable with counts of physical laws

For `k` **labeled** old nodes with one new node `x`:

```text
H(k) = Σ[r=3..k] C(k,r) = 2^k - 1 - k - C(k,2)
    = number of possible already-existing higher-order hyperedge positions

M(k) = Σ[j=2..k] C(k,j) = 2^k - k - 1
    = number of new hyperedge positions that include x
      and at least two of the k old nodes
```

| Old participants `k` | Potential old rank≥3 edges `H(k)` | Old-edge subsets `2^H` | Newborn-containing rank≥3 edges `M(k)` | Output subsets `2^M` |
|---:|---:|---:|---:|---:|
| 3 | 1 | 2 | 4 | 16 |
| 4 | 5 | 32 | 11 | 2,048 |
| 5 | 16 | 65,536 | 26 | 67,108,864 |

If every one of `2^k` **labeled binary participant-state patterns** has its own freely chosen newborn bit and output-hyperedge subset, the complete deterministic lookup table count is

```text
(2^(M(k)+1))^(2^k) = 2^((M(k)+1)*2^k)

k=3: 2^40
k=4: 2^192
k=5: 2^864
```

These counts include representational redundancy under node permutations and exclude many other changes (node deletion, multiple simultaneous sources, field states, ordered hyperedges, nonbinary labels, output patterns without a newborn, and so on). They are **combinatorial possibility bounds under a declared encoding**, not counts of inequivalent physical rules.

### Restricted permutation-symmetric rule family actually tested

To work within compute limits, a **much smaller** rule family was defined:

- choose any nonempty subset of **aggregate Hamming weights** `0..k` as enabling conditions; `2^(k+1)-1` choices;
- choose a nonempty subset of output **rank layers** `r=3..k+1`; for each selected layer create **all** subsets of the `k` old nodes of size `r-1`, attaching the newborn; `2^(k-1)-1` choices;
- newborn binary state: `0`, `1`, parity, complementary parity, or majority (**5** choices);
- input hyperedge is consumed or retained (**2** choices), but it can fire **at most once**.

Rule-space size: `(2^(k+1)-1)*(2^(k-1)-1)*5*2`, yielding:

| `k` | Finite symmetric families | Tested rule sample | Initial weight orbits per rule | Schedulers |
|---:|---:|---:|---:|---|
| 3 | 450 | 192 | 4 | FIFO, seeded random |
| 4 | 2,170 | 192 | 5 | FIFO, seeded random |
| 5 | 9,450 | 192 | 6 | FIFO, seeded random |

Sampling: seeded `mulberry32` permutation with seed `20261012+997*k`, **without replacement** among this explicit restricted family, using canonical binary initial-node states with `0..k` ones. The previously selected hash is **only a deterministic random source**, not a claim of a universal physical generator. The rule itself is invariant under arbitrary permutations of old participant positions, but an asynchronous scheduler's presentation-level effects are a separate issue.

**Computational limits, not physics:** 2,000 nodes, 16,000 hyperedges, 400 rewrites per single/mixed rule trial (160 for coupled). No recorded production sweep hit node or edge budgets. **Reaching the rewrite-count horizon means censored, not sustained forever.**

## 2. Confirming that hyperedges are not disguised pairwise links

For each `k=3,4,5`, two **different higher-order hypergraphs with exactly the same complete pairwise `K_k` projection** were constructed:

1. one genuine full `k`-hyperedge;
2. every `(k-1)` proper-face hyperedge, but **no** `k`-hyperedge (at `k=3`, these are three passive pairwise diagnostic links).

The same `k`-hyperedge rewrite rule fired **six** times in the first configuration within the six-rewrite observation window, and **zero** times in the second. The engine permits pairwise records only as *passive null controls*; no rule evaluates pairs. This is a direct programmatic counterexample to **identifying a complete pairwise projection with the actual higher-order relation**.

The result is scoped: an augmented pairwise model with auxiliary nodes/labels **might encode** a higher-order relation. Such an encoding would need to carry and audit the additional structure. The control disproves a naive lossless reduction to the pairwise projection **alone**, not computational simulability by all possible pairwise formalisms.

[Executed rank 3/4/5 null-control JSON](../experiments/results/2026-10-12-higher-order-irreducibility-controls.json).

## 3. First fixed-arity randomized finite rule sweep

Each initial graph has `k` nodes and one genuine `k`-hyperedge. Node states are immutable in this first layer. Only `k`-hyperedges activate the selected `k` rule; an output of rank `k+1` may exist but **does not fire** in this fixed-arity test.

| Arity | Trials | Initially no eligible rewrite | Activated, then absorbed | Continued to 400-rewrite observation limit | Resource stops |
|---:|---:|---:|---:|---:|---:|
| 3 | 1,536 | 680 | 396 | 460 | 0 |
| 4 | 1,920 | 970 | 462 | 488 | 0 |
| 5 | 2,304 | 1,134 | 676 | 494 | 0 |
| **All** | **5,760** | **2,784** | **1,534** | **1,442** | **0** |

**Strong negative finding:** All **1,534** fixed-rank trials that absorbed **after** an initial rewrite stopped after **exactly one** rewrite. With immutable node states, this restricted output template usually either fails immediately or continues reproducing eligible children within the finite horizon. **It has not generated a nontrivial steady-state attractor.** An initial null rewrite is not a discovered stable structure.

Files (all executable-derived, committed): [rank-3 rules](../experiments/results/2026-10-12-higher-order-k3-rules.csv), [rank-3 trials](../experiments/results/2026-10-12-higher-order-k3-trials.csv), [rank-4 rules](../experiments/results/2026-10-12-higher-order-k4-rules.csv), [rank-4 trials](../experiments/results/2026-10-12-higher-order-k4-trials.csv), [rank-5 rules](../experiments/results/2026-10-12-higher-order-k5-rules.csv), [rank-5 trials](../experiments/results/2026-10-12-higher-order-k5-trials.csv); each rank has a matching summary JSON.

### Controls for source/scheduling/label dependence

- For each sampled fixed-rank rule/initial Hamming weight, the two scheduler choices yielded the same **absorbing-versus-horizon classification**. This does **not** establish identical trajectory, hypergraph isomorphism, or independence from all update strategies.
- Additional selected permutation controls tested three rule types over **all labeled initial bit patterns** for k=3/4/5, in **24/48/96 trials**, and found **zero changes in the recorded summary signature** within weight-preserving relabel classes. This limited sample does **not** prove exact label invariance of the generated graph or all rules.
- The artificial observation limit and restricted immutable states explain why a “continuing to 400” result cannot be called an equilibrium or an infinite survival theorem.

[Relabel rank-3/4/5 files](../experiments/results/) contain the controlled numeric signatures.

## 4. Cross-rank interaction 3 → 4 → 5

A separate mixed-rule campaign installed one rule each for ranks 3, 4 and 5 simultaneously. Each run started with one rank-3 hyperedge, and children could activate higher-rank rules when emitted.

**640** executed trials: **272 initially inert**, **96 activated then absorbed**, **272 still productive at rewrite 400**, **zero resource stops**. Source-level firing counters—not merely existence of output edges—show:

| Actual firing participation | Number of the 640 trials |
|---|---:|
| At least one rank-3 rewrite | 368 |
| At least one rank-4 rewrite | 192 |
| At least one rank-5 rewrite | 80 |
| At least one at **all three ranks** | **80** |

This establishes genuinely multi-order rule application **inside the toy model**. It does not establish physical interactions or an unbounded order hierarchy.

[Mixed rule combinations](../experiments/results/2026-10-12-higher-order-multi-rules.csv), [trial data with actual fired-rank counts](../experiments/results/2026-10-12-higher-order-multi-trials.csv).

## 5. Controlled coupling: source rewrites alter overlapping relations

Fixed-state rewrites leave other existing relations' eligibility unchanged. An independent follow-up modified **all the source hyperedge's binary participant states simultaneously**, using one of four *arbitrary* k-state transformations: invert all, XOR everyone with aggregate parity, majority consensus, or invert all only if at least half are active. The exact same candidate rule, initial Hamming-weight state, scheduler, and deterministic random seed was evaluated with **zero state mutation** as control.

This makes old **overlapping** hyperedges become newly eligible or ineligible after an interaction; eligibility is recomputed after each rewrite. Unlike force mechanics, this does not assume space or distance. It still presupposes explicitly programmed aggregate update functions and may be highly presentation-dependent.

| Rank | Matched mutated/control pairs | Mutated: old-overlap reactivated in runs | Mutated: absorbed after ≥2 rewrites | Fixed-state control: old-overlap reactivation |
|---:|---:|---:|---:|---:|
| 3 | 384 | 43 | 11 | 0 |
| 4 | 480 | 45 | 5 | 0 |
| 5 | 576 | 46 | 3 | 0 |
| **Total** | **1,440** | **134** | **19** | **0** |

The **continuing/absorbing classification changed** for 39, 29, and 29 matched pairs at arity 3, 4 and 5 (97/1,440 overall). Mutated runs continuing at 160: **103, 93, 105**; controls: **138, 118, 122**. No cap reached. All counts are outcomes of the chosen toy rules and canonical starts, **not independently discovered physics**.

These tests produce the first verified instances in this new experiment where a rewrite changes which **previously existing** higher-order relation can fire. Only a minority of tested runs display that interaction; rich nontrivial, indefinite steady dynamics remain **unverified**.

[Rank-3 coupled trials](../experiments/results/2026-10-12-higher-order-k3-coupled-trials.csv), [rank-4](../experiments/results/2026-10-12-higher-order-k4-coupled-trials.csv), [rank-5](../experiments/results/2026-10-12-higher-order-k5-coupled-trials.csv), and each rank's control summary JSON.

## 6. Why a nontrivial exact steady state is impossible in this particular rule family

Every successful transition **creates exactly one node and never removes a node**:

```text
|V_{t+1}| = |V_t| + 1   for each successful rewrite.
```

Consequently the full graph-state (even modulo node relabeling) **cannot return to a previous finite state** after any nonzero number of successful rewrites. The only exact finite fixed points permitted by this family are **absorbing graphs with no eligible rule**. In a graph growing without bound, a stationary law for some **coarse-grained/normalized observable** might still exist, but this requires a separately specified observable, scale/horizon checks, tests for convergence, and suitable controls. A nearly flat eligible-edge queue across 50 events is not proof of global stationarity.

To study genuine nonabsorbing dynamical stationary patterns or cycles, a **different separately labeled rule family** would have to include deletion, fusion, state-only rewrites, or an explicitly justified quotient/recurrent observable. Such features must not be silently inserted as primordial physics merely to make attractive output.

## 7. Reproducibility, limitations, and next controls

- **Source:** [hypergraph-rewrite-lab.mjs](../experiments/hypergraph-rewrite-lab.mjs), self-contained Node-compatible ECMAScript module, no dependencies. Exact active firing semantics and order-specific output layers are in the code, not a screenshot. Distinct phases are `sweep`, `multi`, `controls`, `symmetry`, `coupled`. Representative commands are in the header.
- **Execution method:** source was executed in a local V8 isolate with Node-style filesystem/path/process adapters and results saved through the connected GitHub repository. **Not GitHub Actions; not a Node process test of the committed file itself.** JavaScript source parsed and the run function executed, and results were reread from GitHub. This distinguishes runtime compatibility from numerical output.
- **Executed trial count:** 5,760 immutable fixed-rank + 640 mixed + 2,880 matched coupled/control + 1,024 varied five-node initial-incidence runs = **10,304**, plus **168** illustrative initial-relabel and three higher-order-versus-2-section controls. Each family has a distinct observation cap and bounded definition.
- **Input restrictions:** binary *immutable* or binary *aggregate-mutating* node states; one local hyperedge match per rewrite; output contains the newborn and at least two older nodes; finite ranks 3, 4, 5 (with rank-6 outputs passive); chosen input-weight predicate; node birth on every productive update; one or several rules per run. No general multi-hyperedge left-hand-side matching, nested/hyperedge-valued nodes, causal-order covariance theorem, field theory or universal hypergraph class.
- **Scaling:** full unbounded hypergraph rewriting is **not** exhausted by any tested family. Counts of rules are relative to the representation. No inference about elementary particles, stable bound states, intrinsic dimension, neutrinos, protons, cosmology, matter fields or gravity.
- **Independent next tests:** broaden left-hand-side patterns to *multiple* interacting hyperedges, allow changes in higher-order incidence without compelled node growth (controlled), use an explicit exact or bounded-certificate graph equivalence where needed, broaden initial hypergraph sampling beyond the five-node incidence sweep, and test holdouts/relabel invariance/resource limits before calling any pattern intrinsic.

**Interpretive status:** The user-required genuinely higher-order relation has been implemented and verified against lossy pairwise projections. The most informative negative result is the absence of a demonstrated nontrivial steady state under **strictly birth-only rewrite semantics**; the most informative positive result is that changing all members of a k-ary relation can change the future eligibility of other overlapping k-ary relations without installing a Euclidean physical background. **No physical identification has been made.**


## 8. Five-node structural initial-condition sweep (later controlled extension)

The earlier sweeps deliberately started with **one** k-hyperedge and varied node-state Hamming weights; that is only one point in the much larger space of **initial higher-order incidence**. At five labeled nodes, all rank-3, rank-4 and rank-5 hyperedge positions total `C(5,3)+C(5,4)+C(5,5)=10+5+1=16`, giving **65,536** possible labeled incidence configurations (including empty). This is not a count modulo graph isomorphism.

The source runner's separately labeled `initial` phase created **64 combinations of rank-3, -4 and -5 rules**, each with a **fixed binary node state pattern**, and ran each ruleset against **eight chosen incidence masks**—five deliberately contrasted structures (one triple, all ten triples, all five 4-edges, one 5-edge, all 16 hyperedges), plus three seeded random masks. Each setting used FIFO and seeded-random scheduling, giving `64×8×2=1,024` trials. All had a 200-rewrite horizon and no node/edge resource limit was reached.

| Category | Trials |
|---|---:|
| Initially no activated rewrite | 154 |
| Activated, later absorbed | 204 |
| Still rewriting at 200-event horizon | 666 |
| Resource-censored | 0 |
| Trials that actually fired rank 4 | 654 |
| Trials that actually fired rank 5 | 424 |

**50 of the 64 fixed rule/state sets** changed their absorbing-versus-horizon outcome when only the initial hyperedge incidence pattern changed (comparison within the FIFO scheduler). This is **direct evidence of initial-incidence dependence in the toy**, not a general theorem about physical initial conditions.

A reproducible example is ruleset **0**, with fixed initial node bitmask **28**. Starting with one selected triple (`0x0001`) yields **zero** rewrites, while activating all ten possible triples (`0x03ff`) continues through all **200** updates under the same rules; initializing all five 4-hyperedges (`0x7c00`) also continues through 200, and actually fires **three** order-4 rewrites. The value of a possible relation is not inferable from the pairwise projection or node count alone.

- [Ruleset assignments and fixed initial bits](../experiments/results/2026-10-12-higher-order-initial-incidence-rules.csv)
- [Every executed incidence/run and rank firing](../experiments/results/2026-10-12-higher-order-initial-incidence-trials.csv)
- [Numerical summary](../experiments/results/2026-10-12-higher-order-initial-incidence-summary.json)

**Caution:** Only eight of 65,536 labeled topologies were sampled per ruleset, and only 64 rulesets; these tests do not establish an attractor, a universal causal law, or an unbounded hypergraph theorem. The next candidate experiment must expand **multi-hyperedge left-hand-side rewrite patterns** and test exact representation-aware invariance and temporal stability, not infer physics from finite censored growth.
