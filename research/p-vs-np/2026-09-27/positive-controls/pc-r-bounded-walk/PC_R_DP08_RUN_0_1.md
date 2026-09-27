# PC-R algorithm-hidden DP run 0.1

**Status:** positive-control discovery result; no P-vs-NP theorem
**Frozen source:** `PC_R_SOURCE_FREEZE_0_1.md`
**Primitive input:** `PC_R_PRIMITIVE_0_1.isg`
**Implicit closure:** `PC_R_IMPLICIT_ASSERTIONS_0_1.md`
**NEI/QU overlay:** `PC_R_NEI_QU_0_1.md`

## 1. Observation-first result

The primitive source exposes:

- a finite closed-world binary relation;
- a bounded list witness;
- exact adjacency of consecutive witness elements;
- start/end equality conditions;
- a list-length bound.

It does **not** expose a search traversal or recurrence.

Implicit closure recovers the following exact factorization:

```text
full prefix
    ->
(current vertex, remaining budget)
    ->
bounded future truth.
```

The earlier prefix disappears from the future truth condition.

## 2. Recovered elimination mechanisms

### T2 — bounded sufficient statistic: RECOVERED

The state pair:

```text
(v,r)
```

is future-sufficient.

Its reachable range is polynomially bounded and directly constructible from the input list/budget structure.

This does not require computing exact Q-RESIDUAL identity.

### T4 — polynomial exact aggregate recurrence DAG: RECOVERED

The primitive clauses force:

```text
R(v,0) = [v=t]

R(v,r+1)
=
[v=t]
OR
OR_{E(v,u)} R(u,r).
```

There are polynomially many `(v,r)` nodes.

The DAG can be built from explicit relation data and exact Boolean operations.

### T1 — sound local dominance/simulation: NOT REQUIRED FOR THE POLYNOMIAL RESULT

Statistic equality supplies a trivial mutual simulation/identity certificate, but the control did not need a nontrivial one-way dominance law.

No claim is made that local outdegree/order gives dominance; PC-R-F3 falsifies a natural version.

### T3 — polynomial hitting set: NOT INDEPENDENTLY RECOVERED

The derivation does not construct a polynomial set of complete witness walks guaranteed to hit every YES instance.

It avoids enumerating complete walks by aggregating state truth.

### T5 — separate compact rejection invariant: NOT NEEDED / NOT COUNTED

A FALSE root value follows from the completed recurrence DAG.

Calling the whole table a rejection invariant would merely rename T4, so no independent T5 recovery is counted.

## 3. Accessibility audit

The control separates semantic compression from access.

The exact objective value `R(v,r)` is one bit, but that is not the reason the projection is tractable.

The actual exact chain is:

```text
primitive local semantics
    ->
future-sufficient state pair
    ->
polynomial number of state pairs
    ->
locally constructible OR recurrence
    ->
exact root truth.
```

Every step has an independent construction route from represented input data.

## 4. Falsifier outcomes

Survived:

- exact `(v,r)` sufficiency;
- recurrence decomposition;
- polynomial state-range bound.

Rejected:

- current vertex alone;
- remaining budget alone;
- raw outdegree as dominance;
- “two-valued objective” as a tractability explanation.

## 5. DP judgment

This positive control independently recovers the campaign's **sufficient-statistic + aggregate-recurrence** route without being supplied a known solver.

The strongest lesson for the main P-vs-NP residual is not:

```text
find the minimum semantic quotient.
```

It is:

```text
find a cheaply constructible future-sufficient state
whose exact local recurrence has polynomial retained support.
```

## 6. Novelty status

The bounded-state recurrence is **STANDARD_KNOWN_CONSEQUENCE**.

Its role as a blind positive control and its comparison against the current IsoGraph T1-T5 decomposition are **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN** only.

No external novelty review was performed or required.

## 7. Truth status

```text
P = NP:  OPEN
P != NP: OPEN
```
