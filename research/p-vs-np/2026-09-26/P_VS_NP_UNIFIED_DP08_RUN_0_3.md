# P vs NP unified graph — DP 0.8 run 0.3

**Status:** experimental discovery over unified graph; no P-vs-NP resolution claim  
**Input:** `P_VS_NP_UNIFIED_0_2.isg`  
**DP:** unqualified 0.8 successor candidate

## Declared objectives

### PNP-EQ

Establish `P = NP`.

### PNP-SEP

Establish `P != NP`.

### PNP-RESOLVE

Establish exactly one of the two terminal outcomes under the official problem semantics.

### PNP-PROOF-AUDIT

Classify a concrete proposed proof route against the represented barriers and model/bridge obligations.

## 1. The semantic core is smaller than the usual narrative

Because `P ⊆ NP` is already established, the two terminal objectives reduce to:

```text
PNP-EQ:
    prove NP ⊆ P

PNP-SEP:
    prove exists L in NP \ P.
```

So the already-known inclusion is not an open support obligation.

This is elementary mathematics, not a new theorem, but it matters for IsoGraph support analysis: the target graph should not keep re-proving both inclusions.

## 2. NP-completeness acts as an objective adapter

Cook-Levin gives a source-backed adapter:

```text
arbitrary NP language
    <=p
SAT.
```

For PNP-EQ, once reduction-closure of P is admitted, the entire reverse-inclusion target can be concentrated onto:

```text
SAT in P.
```

Thus the equality route has a quotient-like topology:

```text
NP subset P
    <- sufficient from
SAT in P
+ SAT NP-hard
+ P closed backward under <=p.
```

The exact closure edge is missing from the native formal graph, so this route is currently **semantically source-backed but internally graph-incomplete**.

### DP consequence

The highest-value immediate foundation repair is not another lower-bound paper.

It is to close the reduction-closure edge so the equality route is mechanically self-contained.

## 3. Cook-Levin proof internals are objective-dependent support

For objective:

```text
PNP-EQ answer only
```

once `NPcomplete SAT` is accepted as a pinned source theorem, the internal chain:

```text
GenNP -> ... -> SAT
```

is not uniquely necessary support for the final equality implication.

For objective:

```text
proof reconstruction / provenance / independent verification
```

the internal reduction chain is load-bearing evidence.

Therefore:

```text
theorem endpoint sufficient for downstream use
    !=
proof internals globally unnecessary.
```

This is a clean DP target-scope split.

## 4. The separation circuit target is deliberately stronger than PNP-SEP

The base separation objective needs:

```text
exists L in NP \ P.
```

The official circuit route asks for the stronger statement:

```text
a specific NP-complete problem
has no polynomial-size unrestricted circuit family.
```

That is sufficient because P languages have polynomial-size circuits.

Therefore Natural Proofs constrains a **strengthened sufficient target**, not PNP-SEP definitionally.

This has two consequences:

1. failure of the circuit route is not evidence for `P = NP`;
2. a future separation proof need not inherit the Natural-Proofs barrier unless its topology factors through the natural circuit-lower-bound target.

## 5. Barriers are post-route filters, not premises of the semantic problem

The unified graph now makes the ordering explicit:

```text
choose / construct candidate proof topology
    ->
classify method behavior
    ->
apply relevant barrier falsifier
```

not:

```text
P-vs-NP problem
    ->
must simultaneously cross
relativization + Natural Proofs + algebrization.
```

There is no source-backed universal conjunction of barriers.

## 6. Barrier coordinates are non-substitutable

Current source controls establish:

```text
nonrelativizing
    !=
non-algebrizing.
```

Natural-Proofs status is a different axis again.

Therefore one barrier coordinate cannot be used as an implicit proxy for another.

For a candidate proof, unresolved method classification remains separate QU:

```text
R = relativization status
N = naturality status
A = algebrization status
M = computational-model scope
U = uniform/nonuniform scope.
```

## 7. The current graph exposes two different kinds of QU

### Semantic/model QU

Examples:

- exact Coq-model to official-Turing-model bridge;
- uniform/nonuniform bridge details.

These are about **what theorem has actually been represented**.

### Search-space QU

Examples:

- unknown alternate equality proof;
- unknown alternate separation proof;
- unknown barrier-crossing topology.

These are about **what proof topologies may exist**.

DP must not collapse them.

A complete semantic rendering does not imply a complete proof-search space.

## 8. No global minimum support claim is available

The unified graph contains sufficient routes but not an exhaustive candidate space.

Therefore:

```text
minimum sufficient proof of P=NP:
    QU

minimum sufficient proof of P!=NP:
    QU

minimum barrier-crossing support:
    QU.
```

Any such claim would repeat exactly the representation error discovered in the Navier work: minimum inside one frozen factorization is not global minimum across factorizations.

## 9. First new structural lead from the unified view

The equality and separation sides have different kinds of concentration.

### Equality concentration

NP-completeness lets one **compress a universal class inclusion objective** onto one complete problem.

### Separation strengthening

The circuit route **strengthens an existential class-separation objective** into a nonuniform lower-bound target.

So the two common strategies move in opposite structural directions:

```text
equality route:
    universal objective
        -> concentrated complete representative

separation circuit route:
    existential objective
        -> strengthened nonuniform lower bound.
```

This asymmetry is important for discovery.

It suggests that searching both sides with the same proof-shape heuristics is structurally unjustified.

## 10. Practical next graph work

Before deeper discovery, complete 0.3 by:

1. inserting the missing `FSAT` node in the formal Cook-Levin chain;
2. deriving/pinning P-closure under polynomial reductions;
3. rendering the exact Coq/L-to-standard-TM model bridge used by the official target;
4. rendering the uniform-to-circuit implication used by the official separation route;
5. then rerunning DP.

Only after these semantic bridges close should the campaign spend significant effort on new proof mechanisms.

## 11. Current disposition

```text
P = NP:
    OPEN

P != NP:
    OPEN

new theorem resolving either:
    NONE

unified graph:
    materially improved
    but not globally complete

most important current work:
    close semantic bridge defects
    before more literature exploration
```
