# PC-R implicit assertion closure 0.1 — bounded-walk control

**Status:** control-local exact implicit assertions
**Primitive premise:** `PC_R_PRIMITIVE_0_1.isg`
**Source premise:** `PC_R_SOURCE_FREEZE_0_1.md`
**Global campaign authority:** Core 0.19 implicit-assertion discipline; Core 0.20 primitive closure is experimental only.

These assertions are deliberately derived *after* the source/primitive freeze. None is source-explicit.

## PC-R-IA-001 — a bounded witness induces a bounded remaining-step budget

Let `n=LENGTH(VL)`.

For a nonempty witness prefix ending at vertex `v`, define `r` as the number of further edge steps still permitted before the source bound `LENGTH(w)<=n` would be exceeded.

For a complete source witness, at most `n-1` edge steps occur.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-002 — bounded future truth depends only on current vertex and remaining budget

Define:

```text
R(v,r)
```

to mean:

> there exists a continuation from current vertex `v` to target `t` using at most `r` additional represented edges.

For two partial source witnesses with the same current vertex `v` and the same remaining budget `r`, the already traversed prefix contributes no additional condition to legal future continuation.

Therefore the pair:

```text
(v,r)
```

is an exact future-sufficient statistic for the control objective.

**Support:**

The source truth test after a prefix contains only:

- the current endpoint;
- the closed-world edge relation;
- the fixed target;
- the remaining length allowance.

There is no source condition banning repeated vertices or depending on the earlier prefix.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-003 — base recurrence

```text
R(v,0)
IFF
v=t.
```

**Proof:**

With zero additional edge steps permitted, the only admissible successful continuation is the empty continuation, which succeeds exactly when the current endpoint already equals the target.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-004 — one-layer recurrence

For every natural `r`:

```text
R(v,r+1)
IFF
(v=t)
OR
exists u:
    E(v,u)
    AND
    R(u,r).
```

**Forward:**

Any successful continuation of at most `r+1` steps either uses zero steps, forcing `v=t`, or has a first represented edge `E(v,u)`; removing that first edge leaves a successful continuation of at most `r` steps.

**Reverse:**

If `v=t`, zero steps suffice. Otherwise an edge `E(v,u)` followed by a continuation witnessing `R(u,r)` gives a continuation within `r+1` steps.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-005 — source truth is the root recurrence value

For every well-formed instance with `n=LENGTH(VL)`:

```text
PC-R(VL,E,s,t)
IFF
R(s,n-1).
```

The source witness contains its start vertex, so a witness of length at most `n` uses at most `n-1` edges.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-006 — the recurrence state space is polynomially bounded

The number of distinct vertex identities occurring in `VL` is at most `n`.

The relevant budgets are:

```text
0,...,n-1.
```

Therefore at most:

```text
n^2
```

exact pairs `(v,r)` need be represented.

Repeated vertex identities in the input list can only decrease this count.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-007 — every recurrence layer is constructible from the previous layer by local exact operations

Given the truth values for all `R(u,r)`, the values `R(v,r+1)` are determined by:

- equality with `t`;
- closed-world lookup/scan of represented `E(v,u)` tuples;
- finite OR over matching successors.

The complete relation extension is part of the input, so no semantic oracle is required.

A direct finite scan is polynomial in the explicit input size.

**Disposition:** ADMITTED EXACT.

## PC-R-IA-008 — a polynomial exact aggregate recurrence DAG exists

Create one node for each relevant pair `(v,r)`.

Use `PC-R-IA-003` for layer zero and `PC-R-IA-004` for each next layer.

The resulting exact OR-recurrence DAG contains polynomially many state nodes and polynomially many input-edge incidences per layer.

Thus it is independently constructible without enumerating all witness walks.

**Disposition:** ADMITTED EXACT.

**Campaign connector:** this is an independently recovered instance of T4.

## PC-R-IA-009 — the pair statistic supplies a sound incomplete residual-identity certificate

Map every partial witness prefix `p` to:

```text
J(p)=(last(p),remaining_budget(p)).
```

Then:

```text
J(p)=J(q)
    ->
C_p=C_q
```

for the PC-R continuation language under the fixed instance.

Therefore equal statistics imply Q-RESIDUAL SAME.

The converse is not asserted. Distinct vertices or budgets can coincidentally have identical continuation languages.

**Disposition:** ADMITTED EXACT.

**Campaign connector:** this is an independently recovered instance of a polynomial future-sufficient statistic (T2), without claiming a minimum exact quotient.

## PC-R-IA-010 — exact residual identity is unnecessary for the recurrence construction

The recurrence construction retains `(v,r)` even when two distinct states happen to be Q-RESIDUAL SAME.

Its polynomial bound follows from the explicit statistic range, not from computing the coarsest semantic quotient.

**Disposition:** ADMITTED EXACT SUPPORT OBSERVATION.

## Falsifier PC-R-F1 — current vertex alone is not sufficient

Take vertices:

```text
v -> u -> t.
```

From `v):

- budget 1 cannot reach `t`;
- budget 2 can reach `t`.

Therefore `v` alone does not determine bounded future truth.

## Falsifier PC-R-F2 — remaining budget alone is not sufficient

With budget zero:

- state `(t,0)` is accepting;
- state `(d,0)` for `d!=t` is rejecting.

Therefore budget alone is insufficient.

## Falsifier PC-R-F3 — larger local outdegree is not sound continuation dominance

Let `p` have one edge directly to `t`.

Let `q` have two edges, both to dead vertices with no route to `t`.

Then:

```text
outdegree(p) < outdegree(q)
```

but `p` has an accepting continuation that `q` lacks.

Raw local branching count is not a sound dominance law.

## Falsifier PC-R-F4 — semantic Q-EXISTS compactness is not the construction

The Boolean value `R(v,r)` has only two outputs.

That fact does not itself construct the values.

The polynomial result comes from the independently derived local recurrence plus polynomial state range and explicit-input access.

## Classification

The recurrence and bounded-state reasoning are standard known consequences of finite directed-walk semantics.

Their decomposition into the campaign's T2/T4 and NEI/accessibility distinctions is **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN**, not an external novelty claim.
