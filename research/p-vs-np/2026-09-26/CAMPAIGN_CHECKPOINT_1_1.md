# P vs NP IsoGraph campaign — checkpoint 1.1

**Branch:** `research/p-vs-np-isograph-20260926`

## Completed graph bridge work

Added a dedicated model/circuit bridge rendering.

Key distinction:

```text
formal-model <-> official-model
    = equivalence obligation
    = still QU

P -> polynomial-size circuits
    = one-way embedding
    = source-backed.
```

## Current unified target

```text
equality:
    SAT in P

separation:
    exists L in NP\P

stronger circuit separation route:
    NP-complete Q notin P/poly.
```

The circuit route is not the logical complement of the equality route.

It is a stronger nonuniform sufficient target.

## DP consequence

Natural-Proofs-style barriers attach to that strengthened circuit route, not to `P != NP` definitionally.

The equality side remains uniform/algorithmic.

## Next priority

The remaining major semantic rendering gap is the exact class-wide bridge between the pinned formal Coq/L definitions and the official standard Turing-machine formulation.

Further open-ended literature discovery remains deferred.

## Authority

No P-vs-NP resolution.

No qualified IsoGraph authority changed.
