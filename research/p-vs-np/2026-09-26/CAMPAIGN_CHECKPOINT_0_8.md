# P vs NP IsoGraph campaign — checkpoint 0.8

**Branch:** `research/p-vs-np-isograph-20260926`

## New bridge

A colored-limit capacity recurrence now gives an exact sufficient upper bound on the size of any HJP transversal family with no accepted lower `k`-limit.

For a proper partial transversal `Y`:

```text
accepted Y:
    capacity = sum of k largest child capacities

rejected Y:
    capacity = minimum row-sum of child capacities.
```

For the original HJP target all proper partial transversals are accepted, so:

```text
U(empty)=k^s,
```

recovering HJP's exact `(m/k)^s` partition threshold.

## Significance

The failed Meir–Wigderson structured-set route required full support on target-aligned coordinate sets.

The HJP consumer needs only an accepted lower `k`-limit.

The new recurrence operates directly at that weaker consumer interface.

So:

```text
full-support route:
    falsified as unnecessarily strong

colored-limit capacity:
    exact alternate sufficient factorization
```

## Remaining naturalization obligations

```text
L:
    show small capacity is large for random truth tables

C:
    show small capacity, or a sufficient certificate for it,
    is AC0-constructive.
```

No naturalization is claimed until both close.

## Authority

No new circuit lower bound beyond HJP.

No unrestricted lower bound.

No P-vs-NP theorem.

No qualified IsoGraph authority changed.
