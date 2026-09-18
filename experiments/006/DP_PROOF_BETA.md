# Experiment 006 — Proof Beta

**Cold-visible benchmark artifact.**

Names, citations, theorem titles, and historical interpretation have been deliberately removed. Treat this as a second independently supplied proof argument.

## Goal

Establish target statement `GB` about a continuous self-map of a compact ball-like state space.

## Steps

### B01 — state space and boundary

Let `Y` be an n-dimensional closed ball-like space with boundary `dY`.

### B02 — contradiction assumption

Let `G : Y -> Y` be continuous. Assume, for contradiction, that `G(y) != y` for every `y in Y`.

### B03 — boundary-directed construction

For each `y`, consider the ray beginning at `G(y)` and passing through `y`. Because `G(y) != y`, this ray has a well-defined direction and meets the boundary `dY` at a distinguished point.

Define:

```text
r(y) = that boundary intersection
```

### B04 — retraction structure

The construction is continuous. When `y` already lies on `dY`, the selected boundary point is `y` itself.

Therefore:

```text
r : Y -> dY
r|dY = identity
```

So `r` is a retraction of `Y` onto its boundary.

### B05 — inclusion/retraction equation

Let:

```text
i : dY -> Y
```

be the inclusion. Then:

```text
r o i = id_dY
```

### B06 — transport through a functorial invariant

Apply a standard algebraic-topological invariant functor `H` in the relevant boundary dimension. Functoriality gives:

```text
H(r) o H(i) = identity on H(dY)
```

### B07 — incompatible invariant values

For the relevant degree:

```text
H(dY) is nontrivial
H(Y) is trivial
```

Thus `H(i)` maps the nontrivial boundary group through a trivial middle group.

### B08 — global obstruction

An identity endomorphism of a nontrivial group cannot factor through the trivial group.

This contradicts the equation from B06.

### B09 — no boundary retraction

Therefore the retraction constructed under the assumption in B02 cannot exist.

### B10 — contradiction

The only premise used to construct that retraction was the absence of a fixed point. Hence B02 is false and target statement `GB` holds.

## Explicit proof-specific machinery

The argument visibly uses:

```text
a continuous ray-to-boundary construction
a global retraction
boundary inclusion
functorial algebraic invariants
nontrivial boundary invariant versus trivial interior invariant
factorization-through-zero contradiction
```

Do not assume this machinery appears literally in another proof merely because the final target is related.
