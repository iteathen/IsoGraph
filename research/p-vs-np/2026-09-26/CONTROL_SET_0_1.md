# P vs NP campaign — first barrier-signature control set 0.1

**Status:** control selection; exact individual renderings still pending

## Purpose

Choose successful results with different barrier behavior so DP can compare **what actually changes** when a method crosses one barrier but not another.

## C1 — machine-checked time hierarchy

Source:

`uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`

File:

`theories/HierarchyTheorem/TimeHierarchyTheorem.v`

Blob:

`bcf6bf1d1920cd09ebf1c1b21eabcd547e7fab83`

Result:

```text
for time-constructible f with n <= f(n),
exists P:
    P notin Timeo(f)
    AND
    P in TimeO(n f(n)^2)
```

Barrier signature now:

```text
R: QU until oracle-lift of this exact formal theorem/method is rendered
N: not applicable to this theorem as currently scoped
A: QU
U: uniform time-class separation
M: pinned Coq/L model
```

Do not label the exact formal theorem "relativizing" merely from family resemblance to diagonal arguments.

## C2 — restricted circuit lower bounds / parity control

Natural-Proofs source explicitly states that weaker AC0-natural proofs are sufficient for the classical parity lower bounds of Furst-Saxe-Sipser, Yao, and Hastad.

Control purpose:

```text
successful restricted lower bound
+
Natural-Proofs-style property
```

Barrier signature now:

```text
R: QU
N: source-supported natural-proof relationship at AC0 scope
A: QU
U: nonuniform restricted-circuit target
M: Boolean circuits
```

Exact theorem source and rendering still to be frozen before discovery uses internal proof structure.

## C3 — nonrelativizing but algebrizing separation

Aaronson-Wigderson explicitly classify known arithmetization-based separations including:

```text
MA_EXP notsubset P/poly
```

as nonrelativizing results that nevertheless algebrize.

Control purpose:

```text
cross ordinary relativization
but
remain blocked by algebrization for stronger targets
```

Barrier signature:

```text
R: NONRELATIVIZING — source-backed at result/method-family level
N: QU
A: ALGEBRIZING — source-backed
U: nonuniform circuit separation
M: arithmetized/oracle-extension framework
```

This is the first high-value comparison control because it falsifies:

```text
nonrelativizing -> barrier-free
```

## Use discipline

These controls are not interchangeable.

Do not compare their internal proof mechanisms until each control has an exact or explicitly partial source rendering.

The first comparison question is only:

```text
which barrier coordinates differ?
```

not:

```text
which proof is closest to proving P != NP?
```
