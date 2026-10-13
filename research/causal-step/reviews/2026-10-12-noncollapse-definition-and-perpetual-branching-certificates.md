# Correction: “steady state” means survival/noncollapse, including perpetual branching

**Researcher clarification:** 2026-10-12, verbatim in [Causal Step discussion log](../DISCUSSION_LOG.md).  
**Disposition:** Substantive correction of the **evaluation criterion**, not a change to any previously executed rule, initial condition, or trial data.  
**Evidence:** source-executed bounded sweeps and newly checked rule-level mathematical certificates.  
**No inference:** physical persistence, particles, spacetime, gravity, entropy, or real-world causality.

> **Later researcher correction — second necessary research filter (same date):** “The ones that form very simple reoccurring patterns indefinitely can pretty much be ruled out. Only the ones that exhibit behavior of being able to represent some complexity are actually valid for this.” Therefore the 1,344 perpetual rule settings and 59 sampled certificates below **prove productive noncollapse only**; the uniform-state repeated witness must **not** be misclassified as demonstrating useful complexity. The rule-wide capacity is a distinct, initial-condition-dependent question. See [the higher-order complexity-capacity screen and falsification controls](2026-10-12-persistent-complexity-capacity-filter.md). Neither the original theorem nor the finite data is revised.

## 1. Correct meaning and three distinct questions

Joshua Oshiro explicitly states:

> I feel like you misunderstood what I meant by steady state. I meant a state that does not collapse. It can grow forever. We just need to see it not collapse.

The assistant previously treated this as **exact fixed state / equal graph cardinality / repeating global state**. That requirement was **not what the researcher asked for**. “Steady state” is now interpreted within this research as **noncollapse/persistence**, permitting indefinitely expanding or changing graphs. A halted graph retaining an intact relational structure is **not necessarily collapsed**. Conversely, continuation until an artificial step cutoff does not certify eternal persistence.

Separate these questions explicitly:

1. **Structural survival:** Does a specified, nontrivial relational structure remain present? This requires a declared witness criterion—not merely integer `nodes>0`.
2. **Productive survival:** Is at least one executable genuinely higher-order rewrite still available, and is there a rule-sustained lineage that can continue?
3. **Indefinite survival:** Can structural or productive noncollapse be proved under an explicitly defined unrestricted-resource rewrite system, or is it only observed up to a finite computational horizon?

Do **not** use “fixed point,” “periodic orbit,” “constant population,” “stationary mean,” or “bounded size” as **necessary** success criteria. These may be extra diagnostics, not the user's target.

### Core limitation: structural collapse was excluded from this laboratory

The committed [higher-order rewrite runner](../experiments/hypergraph-rewrite-lab.mjs) implements the following for every **successful** rewrite:

```text
|V_(t+1)| = |V_t| + 1
newborn-containing higher-order hyperedges emitted >= 1
at most one source hyperedge consumed
```

Therefore `|V_(t+1)|>|V_t|` and `|E_(t+1)|>=|E_t|`, when counting all live hyperedges (not just *eligible* edges) and assuming an existing nonempty relation. The source hyperedge may be marked fired and ineligible, but is not an erased *structure* in every case; even if consumed, replacement relations remain. No tested rule ever deletes nodes, and the run starts with at least one edge. Thus **zero successful rewrites can produce a truly empty hypergraph**. The earlier trial classifications measure **no eligible rewrite** versus **still eligible at a horizon**, not disappearance of structural existence.

Consequently, it is scientifically incorrect to report the formerly **“absorbed”** trials as **“collapsed”** without defining a stronger property that was actually lost. The current model is structurally predisposed not to collapse; any blanket 100% graph-existence survival result is **trivial** and not physical evidence.

## 2. Actual finite-window productive survival, reclassified

The original rule/initial-state data remain unchanged. A run with `status=limit` was **still producing eligible high-order rewrites** when its numerical observation limit was reached and did **not** hit a resource ceiling. It is a finite-horizon **candidate for persistent growth**, not a “failure to achieve steady state.”

| Exact campaign | Initially ineligible | Activated then no eligible rewrite | Still productive at horizon | Resource censored |
|---|---:|---:|---:|---:|
| Rank 3, 400 rewrites | 680 | 396 | **460** | 0 |
| Rank 4, 400 rewrites | 970 | 462 | **488** | 0 |
| Rank 5, 400 rewrites | 1,134 | 676 | **494** | 0 |
| **Fixed rank total (5,760 runs)** | **2,784** | **1,534** | **1,442** | **0** |
| Mixed ranks 3/4/5, 400 rewrites (640 runs) | 272 | 96 | **272** | 0 |
| Five-node initial-incidence variation, 200 rewrites (1,024 runs) | 154 | 204 | **666** | 0 |

In the fixed-rank sweep **1,442 out of 2,976 runs that initially activated** continued through 400 rewrites. In the mixed-rank sweep **272 of 368 initially activated** runs did so. These fractions are **descriptions of a deliberately chosen rule distribution and initial-condition family**, not objective probabilities for natural laws or “infinite-life” likelihood estimates.

A stopped rewrite engine is not a destroyed graph, and continuing productive growth need not show any fixed point.

The earlier supplementary 160-rewrite coupled-state comparisons found **301** mutable and **378** matched fixed-state runs still productive at the horizon (out of 1,440 runs on each side, with **750 initially activated** on each side). The state mutations alter the relative distribution of halting/continuing; they are arbitrary test operators, not physically derived stability laws.

## 3. Constructive theorem: perpetual productive branching in a restricted, unlimited-resource system

For each `k>=3` in this **particular immutable-binary-state, one-hyperedge-at-a-time, fixed-rank symmetric rule family**, choose the following **sufficient conditions**:

**All-one construction:** Start from a single, active rank-`k` hyperedge whose `k` node bits are all `1`. Select a rule that:
- enables its input at Hamming weight `k`;
- creates a newborn whose bit is the constant `1`;
- emits the output hyperedge rank-`k` layer, i.e. for every size-(k−1) subset of source nodes, creates one new `k`-hyperedge containing the newborn;
- may retain or consume the fired source relation.

**All-zero construction:** Replace all occurrences of bit `1` above with bit `0`, and input-enabled Hamming weight `k` with weight `0`.

In either construction, all old nodes participating in the next eligible rank-`k` rewrite and the newborn have the same bit. **Each firing generates exactly k new eligible rank-`k` hyperedges** of the same type. The fired source is no longer eligible (whether consumed or marked fired). Other eligible hyperedges cannot disappear merely because another was fired: nodes are immutable in this version. Therefore the eligible frontier obeys, from one starting eligible hyperedge,

```text
F(0) = 1
F(t+1) = F(t) - 1 + k
F(t) = 1 + (k-1)t > 0   for every finite t.
|V(t)| = k + t.
```

**Proof:** Induction on t. The hypothesis says at least one eligible same-bit rank-k hyperedge exists. On any allowed scheduler choice, firing one removes **one** eligible object from the frontier, creates **k** new same-bit rank-k hyperedges, each enabled, and does not disqualify unrelated eligible edges. Thus the frontier remains nonzero. There can be another rewrite for every finite t, with unbounded resources and no externally imposed termination. **This is a rigorous perpetual-growth result within the exact restricted rewriting definitions**, not a claim that real physical reality is generated by these rules.

In the actual finite `k∈{3,4,5}` symmetric rule enumerations, the above sufficient conditions certify:

| k | Restricted rule settings in family | Provably perpetually branching by all-one construction | By all-zero construction | Distinct certified configurations | Among 192 sampled rules, certified |
|---:|---:|---:|---:|---:|---:|
| 3 | 450 | 32 | 32 | **64** | **23** |
| 4 | 2,170 | 128 | 128 | **256** | **20** |
| 5 | 9,450 | 512 | 512 | **1,024** | **16** |
| **Total** | **12,070** | **672** | **672** | **1,344** | **59** |

The formula per uniform-state construction is `2^k * 2^(k-2) * 2 = 2^(2k-1)`: the enabling weight bit is fixed, the remaining k weight bits are optional, the rank-k output bit is fixed, the remaining k−2 output-rank bits optional, and input-edge retain/consume choice arbitrary. The two state-mode classes do not overlap.

The 1,344 certificates are a **sufficient lower bound** on provably perpetually branching settings in the full restricted family, **not** an exhaustive characterization of all indefinitely productive rules. Nonuniform / periodically evolving state paths may also persist.

### Independent longer witness re-execution

Selected [three rules from the saved 192-rule sample](../experiments/results/2026-10-12-certified-nonterminating-branching-rules.csv) were actually re-executed through **1,200 rewrites** under both FIFO and seeded-random scheduling, preserving original resource ceilings (2,000 nodes, 16,000 hyperedges):

| k | Sampled rule ID | Uniform input state | Rewrites achieved | Eligible frontier after 1,200 | Nodes | Resource stops |
|---:|---:|---|---:|---:|---:|---:|
| 3 | 4 | All ones | 1,200 | **2,401** | 1,203 | 0 |
| 4 | 0 | All zeros | 1,200 | **3,601** | 1,204 | 0 |
| 5 | 91 | All zeros | 1,200 | **4,801** | 1,205 | 0 |

Both schedulers reached the same frontier counts, although individual ancestral chain depths differed. The mathematical proof is **not based on the 1,200-step observational horizon**; it follows from the rule preconditions and inductive transition.

- [59 sampled rule certificates, including both scheduler outcomes at 400](../experiments/results/2026-10-12-certified-nonterminating-branching-rules.csv)
- [Six re-executed 1,200-step numerical witnesses](../experiments/results/2026-10-12-certified-branching-1200-rewrite-witnesses.csv)
- [Source implementation and exact `weights`, `ranks`, `mode` semantics](../experiments/hypergraph-rewrite-lab.mjs)

## 4. How to design a genuinely discriminating noncollapse test

**Do not simply reward “never halts,” growing node count, or “has at least one node”; those could be mechanically guaranteed.** The next independent test should:

1. Declare a **nontrivial structural witness** that must persist (for example connected interacting hyperedges, a relational motif with specific branching/rewrite functionality, or a suitable invariance under allowed node relabeling). Don't treat a disconnected inert node as proof of persistent dynamics.
2. Include controlled **competing higher-order rewrite consequences** that can preserve, dissolve, fuse, or reorganize those witnesses, with **no preset spatial costs or Newtonian forces**. Deletion is not asserted to be fundamental; it is one optional falsification mechanism, tested separately.
3. Search for structural survivals that do **not** follow trivially from an invariant forcibly built into every allowed rewrite. Investigate interactions of several atomic hyperedges (overlapping LHS structures), not just one isolated activated edge.
4. Report **survival/eventual loss as a function of actual causal rewrite count**, with independent source/seed and initial incidence sweeps, alternative scheduler choices, and increasing resource ceilings; horizon-stopped runs are **right-censored**.
5. Where possible, derive an **inductive persistence certificate or explicit finite counterexample**. Only a theorem can establish indefinite survival for a precisely defined infinite-resource rule family; finite simulation alone cannot.

Do not conflate “system has not collapsed” with “physical particle has formed,” “has converged,” “has selected spacetime dimension,” or “has stable thermodynamic equilibrium.”

**Revised disposition:** We **have** demonstrated both broad finite-horizon productive survival **and** a restricted explicit family with provable perpetual branching. We **have not** tested noncollapse of physically meaningful structure against a general high-order adversarial/competitive rewrite space. Earlier stronger requirements of exact full-graph recurrence were an assistant misunderstanding and are withdrawn as a required criterion.
