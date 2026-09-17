# Experiment 006 — Proof Alpha

**Cold-visible benchmark artifact.**

Names, citations, theorem titles, and historical interpretation have been deliberately removed. Treat this as one independently supplied proof argument.

## Goal

Establish target statement `GA` about a continuous self-map of a compact simplex-like state space.

## Steps

### A01 — state space

Let `X` be an n-dimensional simplex represented by nonnegative coordinates whose sum is 1. Its codimension-one boundary faces are obtained by setting one coordinate to 0.

### A02 — contradiction assumption

Let `F : X -> X` be continuous. Assume, for contradiction, that there is no point `x` with `F(x) = x`.

Because the coordinates of both `x` and `F(x)` sum to 1, for every point that is not fixed there exists at least one coordinate index `j` with:

```text
F(x)_j < x_j
```

### A03 — arbitrarily fine finite structure

Choose a sequence of triangulations/subdivisions `K_k` of `X` whose maximum simplex diameter tends to 0.

### A04 — local labels from displacement

For every vertex `v` of `K_k`, choose one index `j` satisfying:

```text
F(v)_j < v_j
```

and assign label `j` to `v`.

### A05 — boundary compatibility

If `v` lies on boundary face `j`, then `v_j = 0`. Since `F(v)_j >= 0`, the inequality required for label `j` cannot hold there.

Therefore vertices on boundary face `j` never receive label `j`.

### A06 — finite parity/existence obstruction

A combinatorial parity lemma for a labeled subdivision with the boundary condition from A05 implies that the number of n-simplices carrying every label is odd; in particular, at least one fully labeled simplex exists in every `K_k`.

### A07 — select one witness per refinement

For each `k`, choose a fully labeled simplex `sigma_k` and a point `x_k` in `sigma_k`.

Compactness permits passage to a subsequence with:

```text
x_k -> x
```

for some `x in X`.

### A08 — all local label witnesses converge together

For each coordinate index `j`, `sigma_k` has a vertex `v_(k,j)` labeled `j`.

Because the mesh diameter tends to 0 and `x_k` lies in the same simplex:

```text
v_(k,j) -> x
```

for every `j`.

### A09 — local inequalities become a global fixed-point condition

For each `j`, the label condition gives:

```text
F(v_(k,j))_j < v_(k,j)_j
```

Continuity and the common limit imply:

```text
F(x)_j <= x_j
```

for every coordinate `j`.

Both coordinate vectors have total sum 1, so all these inequalities must actually be equalities. Hence:

```text
F(x) = x
```

### A10 — contradiction

A09 contradicts A02. Therefore target statement `GA` holds.

## Explicit proof-specific machinery

The argument visibly uses:

```text
finite subdivisions
local coordinate labels
boundary-label exclusion
an odd-parity/full-label combinatorial lemma
mesh refinement
compactness + limiting continuity
```

Do not assume this machinery appears literally in another proof merely because the final target is related.
