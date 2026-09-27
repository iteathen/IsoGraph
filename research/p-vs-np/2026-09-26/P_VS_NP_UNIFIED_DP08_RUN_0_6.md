# P vs NP unified graph — DP 0.8 run 0.6

**Status:** experimental discovery over unified 0.4; no P-vs-NP resolution  
**Input:** `P_VS_NP_UNIFIED_0_4.isg`

## Objectives

### PNP-TRUTH

Resolve the mathematical class relation in the pinned model.

### PNP-OFFICIAL

Resolve the official P-vs-NP problem with authority transfer complete.

### PNP-PROOF-SEARCH

Discover sufficient proof topology for one terminal polarity.

These objectives are now separated because their support is not identical.

## 1. Two different unknowns were previously mixed

The unified graph exposes:

```text
Q_truth:
    SAT in P ?

Q_model:
    pinned formal P/NP model
      <-> official standard-TM P/NP model.
```

`Q_truth` is the mathematical open problem.

`Q_model` is a representation/authority bridge.

A proof of `SAT in P` inside the pinned model can be mathematically exact locally while still requiring `Q_model` before publication as an official solution.

Conversely, completing `Q_model` does nothing to settle `Q_truth`.

Therefore:

```text
truth discovery
    !=
authority-transfer qualification.
```

This is the first major consequence of folding the bridge into the unified graph.

## 2. The semantic core is now effectively closed except for the truth bit

All high-level structural support needed to state and transport the terminal alternatives inside the pinned model is represented.

The remaining mathematical unknown is not a missing reduction edge or barrier edge.

It is the polarity:

```text
SAT in P ?
```

Thus further expansion of known definitions, Cook-Levin internals, or barrier catalogues cannot by itself reduce the semantic truth QU.

Such work may improve provenance or proof-search guidance, but it is not a direct refinement of `Q_truth`.

## 3. The circuit route is a strict support enlargement

The direct separation target is:

```text
exists L in NP \ P.
```

The circuit route replaces this with the stronger nonuniform target:

```text
NP-complete Q notin P/poly-style envelope.
```

The integrated one-way bridge now makes the support inclusion explicit:

```text
strong nonuniform hardness
    -> uniform separation.
```

There is no reverse edge.

DP classification:

```text
nonuniform circuit lower bound
    = sufficient
    = stronger than necessary
    = nonessential for semantic separation support.
```

This is now a native graph result rather than a prose-only observation.

## 4. Natural-Proofs barriers therefore sit on an optional strengthening

Because the circuit route is a strict strengthening, Natural-Proofs-style barriers constrain that stronger fiber.

They do not attach to:

```text
P != NP
```

as a semantic requirement.

This does not weaken the barrier.

It changes its location:

```text
terminal theorem
    ->
choose strong circuit route
    ->
inherit circuit-route barrier obligations.
```

A future direct uniform separation proof may have different barrier anatomy.

## 5. The equality route does not pay the same strengthening tax

The equality side has an exact complete-problem representative:

```text
SAT in P.
```

No nonuniform strengthening is required.

Hence the common equality and separation routes are structurally asymmetric:

```text
equality:
    uniform membership target

separation via circuits:
    stronger nonuniform lower-bound target.
```

A search algorithm should not assign the same candidate-generation policy to both sides.

## 6. Route admission becomes mechanically testable

For every proposed new research subgraph `G`, require an explicit connector:

```text
G
  ->
SAT in P

or

G
  ->
SAT notin P

or

G
  ->
exists L in NP \ P

or another exact terminal-equivalent target.
```

If no connector is established:

```text
G is a control / method donor / speculative fiber,
not direct progress on P-vs-NP.
```

This test would have classified much of the earlier AC0/HJP work correctly before it absorbed campaign attention.

## 7. Discovery should now operate near the truth boundary

The graph suggests two primary direct search fronts.

### Equality-front

Target exactly:

```text
SAT in P.
```

Ask for structures sufficient to produce deterministic polynomial-time decision.

Known NP verification structure is already downstream-insufficient: it proves only SAT in NP.

The missing relation is a deterministic decision mechanism.

### Separation-front

Target exactly:

```text
exists L in NP \ P.
```

Do not add NP-hardness or nonuniform circuit structure unless a candidate method needs them.

This leaves open proof topologies that would be hidden by starting from SAT circuit complexity.

## 8. High-value IsoGraph lead — lower-bound transport without nonuniform strengthening

The equality graph has a powerful transport law:

```text
A <=p B
AND B in P
    -> A in P.
```

The separation graph lacks an equally general represented lower-bound transport law in the uniform model.

This asymmetry suggests a discovery question:

> Is there a uniform hardness invariant H, preserved or monotone under an exact class of polynomial reductions, such that H(L) is sufficient for `L notin P`?

Desired topology:

```text
H(A)
+ A <=p B
    -> H(B)

H(B)
    -> B notin P.
```

No such invariant is supplied or assumed.

If one existed with useful closure properties, it could let separation research use structurally convenient NP languages without immediately strengthening to P/poly.

Disposition:

```text
uniform lower-bound transport invariant:
    QU / HIGH-VALUE LEAD.
```

This is generated by the unified graph itself, not by a new literature search.

## 9. High-value IsoGraph lead — proof fibers can be compared by support inflation

For any candidate route, define its **support inflation** relative to the semantic terminal target as the additional represented obligations introduced by the route.

Examples:

```text
direct separation witness:
    low structural inflation

unrestricted-circuit route:
    adds nonuniform model
    + circuit representation
    + stronger lower-bound target
    + route-specific barriers.
```

This is not a universal cost or ranking.

It is a structural accounting view.

DP may use it to identify where a proof route creates avoidable packaging dependencies.

A smaller support cone is not assumed easier; IsoMax already falsified that inference in a computational setting.

## 10. No reason to expand the barrier catalogue yet

The current graph already contains enough barrier structure to enforce:

```text
barrier applies only after route classification.
```

Adding more named barriers without a candidate proof topology would enlarge the control layer but not refine `Q_truth`.

Therefore the next campaign pass should prioritize:

```text
candidate proof-support generation near
SAT in P
or
exists L in NP \ P,
```

not further barrier collection.

## 11. Qualification work can proceed independently

The model-equivalence bridge should be completed for eventual authority transfer.

But it should run as a separate qualification workstream.

It is not the mathematical discovery bottleneck.

This gives two independent workstreams:

```text
Discovery:
    attack Q_truth

Qualification:
    close Q_model.
```

One should not block the other.

## 12. Current disposition

```text
P = NP:
    OPEN

P != NP:
    OPEN

Q_truth:
    SAT in P ?
    OPEN

Q_model:
    class-wide official-model bridge
    QU

circuit separation route:
    exact one-way sufficient strengthening

new P-vs-NP theorem:
    NONE
```

## Next discovery unit

Remain inside IsoGraph.

Construct candidate support families immediately adjacent to:

```text
SAT in P
```

and:

```text
exists L in NP \ P.
```

For each candidate:

1. declare the exact terminal connector;
2. express unresolved support as QU;
3. apply DP;
4. reject candidates whose only contribution is another unconnected control;
5. use external research only when a specific QU edge needs source confirmation.
