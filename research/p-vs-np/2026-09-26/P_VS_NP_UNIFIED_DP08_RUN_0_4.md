# P vs NP unified graph — DP 0.8 run 0.4

**Status:** experimental discovery over bridge-closed unified graph  
**Input:** `P_VS_NP_UNIFIED_0_3.isg`

## 1. Equality-side support collapses exactly to one complete-problem membership test

After closing backward reduction closure:

```text
P = NP
    iff
SAT in P
```

inside the pinned model.

Therefore, for the declared **answer-only equality objective**:

```text
SAT in P
```

is an exact sufficient-and-necessary representative target.

This is not a new complexity theorem.

It is, however, an exact support collapse in the unified IsoGraph.

## 2. Cook-Levin proof-chain internals become provenance-dependent support

Once `NPcomplete SAT` is frozen as an admitted theorem:

### answer-only objective

The intermediate chain:

```text
GenNP -> ... -> FSAT -> SAT
```

can be bypassed downstream.

### proof-reconstruction objective

The same chain remains load-bearing evidence for why SAT is NP-hard.

So:

```text
proof internals
    are nonessential for one downstream objective

but
    essential for theorem provenance / reconstruction.
```

This is the same objective-scope distinction DP 0.8 found in other domains.

## 3. Equality-side proof search now has a clean bottleneck

Any constructive equality route through SAT must ultimately establish:

```text
SAT in P.
```

The certificate/verifier structure of SAT being in NP is not the missing part.

The missing part is a deterministic polynomial-time decision mechanism.

Thus the graph separates:

```text
easy verification
    already closed

from

deterministic polynomial-time solution
    open.
```

No amount of further Cook-Levin reduction-chain expansion changes that target.

## 4. Separation-side support does not collapse analogously

For separation:

```text
P != NP
    iff
exists L in NP \ P.
```

There is no represented theorem reducing every possible separation proof to one fixed witness language.

The circuit route through an NP-complete problem is sufficient, but stronger than necessary.

So the two sides remain structurally asymmetric:

```text
equality:
    exact representative compression to SAT

separation:
    existential witness space remains open;
    circuit route is one strengthening.
```

## 5. New search-discipline consequence

The graph now falsifies two inefficient campaign behaviors.

### Equality side

Do not spend discovery effort on arbitrary NP languages first.

Any result intended to prove equality can be projected onto:

```text
SAT in P
```

unless it uses a nonconstructive class-level proof topology.

### Separation side

Do not assume SAT/circuit lower bounds are the unique search target.

A valid separation witness may arise outside the represented circuit route.

This prevents importing the equality-side complete-problem concentration symmetry onto separation.

## 6. Barrier placement becomes sharper

Relativization can constrain either side depending on proof topology.

Natural Proofs applies only after selecting a natural circuit-lower-bound route.

Algebrization likewise depends on the candidate method.

Therefore the answer-only support graph contains **no barrier node at all** until a proof topology is supplied.

Barriers are falsifiers on proof candidates, not components of the theorem statement.

## 7. Remaining high-value graph work

With equality internally closed, the most important semantic defects are now:

1. official-model equivalence;
2. uniform P -> polynomial-size circuit bridge;
3. exact native barrier definitions for any concrete proof candidate;
4. broader positive controls for alternative separation topologies.

The first two are representation completeness work.

Only the latter two are discovery-space expansion.

## 8. Current result

```text
P = NP:
    OPEN

P != NP:
    OPEN

formal-model equality target:
    exactly concentrated to SAT in P

new resolution theorem:
    NONE
```

The unified graph is now substantially better aligned for future DP because the equality route no longer contains a missing folklore edge.
