# HJP colored-limit capacity recurrence 0.1

**Status:** derived exact sufficient criterion inside the HJP reduced product geometry; literature novelty not asserted  
**Purpose:** interpolate between HJP's target-specific lower-layer property and a possible natural property.

## 1. Product geometry

After the HJP Section-4 restriction, use the standard transversal representation:

```text
B = [m]^s
```

where each element of `B` chooses exactly one coordinate from each of `s` rows.

Represent a partial transversal `Y` as a set containing at most one row-value pair from each row.

For a family:

```text
F ⊆ B
```

define:

```text
F_Y
  =
{ X \ Y :
    X ∈ F
    AND
    Y ⊆ X }.
```

As in HJP, `Y` is a lower `k`-limit for `F` whenever:

```text
tau(F_Y) >= k+1,
```

where `tau` is minimum cover size.

## 2. Arbitrary acceptance coloring

Let:

```text
a(Y) ∈ {0,1}
```

record whether the Boolean function under study accepts the partial-transversal input represented by `Y`.

Call a family `F` **a-bad** when it has no accepted lower `k`-limit:

```text
for every partial Y:
    if a(Y)=1
    then
        Y is not a lower k-limit of F.
```

Equivalently, whenever `a(Y)=1`:

```text
tau(F_Y) <= k.
```

The HJP target-specific situation is the extreme case:

```text
a(Y)=1
for every |Y| < s.
```

## 3. Capacity recurrence

Define `U_a(Y)` recursively.

### Full transversal

If:

```text
|Y| = s,
```

set:

```text
U_a(Y) = 1.
```

### Accepted partial point

If:

```text
a(Y)=1,
```

define:

```text
U_a(Y)
  =
sum of the k largest values among

    { U_a(Y ∪ {c}) :
        c is a row-value coordinate
        from a row not already used by Y }.
```

If fewer than `k` children exist, sum all of them.

### Rejected partial point

If:

```text
a(Y)=0,
```

define:

```text
U_a(Y)
  =
min over unused rows r
    sum over values v in [m]
      U_a(Y ∪ {(r,v)}).
```

## 4. Capacity theorem

### Claim

For every `a-bad` family `F ⊆ B` and every partial transversal `Y`:

```text
| { X ∈ F : Y ⊆ X } |
    <=
U_a(Y).
```

In particular:

```text
|F| <= U_a(empty).
```

### Proof

Proceed by induction on the number of unused rows.

#### Base

If `|Y|=s`, at most one full transversal extends `Y`.

So:

```text
|F_Y| <= 1 = U_a(Y).
```

#### Accepted node

Suppose `a(Y)=1`.

Because `F` is `a-bad`, `Y` is not a lower `k`-limit.

Therefore:

```text
tau(F_Y) <= k.
```

Let `C` be a cover of `F_Y` with `|C|<=k`.

Every extension of `Y` in `F` contains at least one `c ∈ C`.

Hence:

```text
|F_Y|
  <=
sum_{c ∈ C}
  |F_(Y∪{c})|.
```

By induction:

```text
|F_(Y∪{c})| <= U_a(Y∪{c}).
```

The right side is at most the sum of the `k` largest child capacities.

Thus:

```text
|F_Y| <= U_a(Y).
```

#### Rejected node

Suppose `a(Y)=0`.

Choose any unused row `r`.

The extensions of `Y` partition disjointly according to their value in row `r`:

```text
|F_Y|
  =
sum_{v in [m]}
  |F_(Y∪{(r,v)})|.
```

By induction this is at most:

```text
sum_v U_a(Y∪{(r,v)}).
```

The identity holds for every unused row, so it holds for the minimum row sum.

Therefore:

```text
|F_Y| <= U_a(Y).
```

QED.

## 5. Partition/usefulness corollary

Suppose the zero-side structured family `B0` has size `M`, and a candidate circuit partitions it into at most `ell` cells.

If every cell had no accepted lower `k`-limit, the capacity theorem would give:

```text
size(cell) <= U_a(empty).
```

Therefore:

```text
M <= ell * U_a(empty).
```

Contrapositively, if:

```text
M > ell * U_a(empty),
```

then at least one partition cell has an accepted lower `k`-limit.

That is exactly the type of contradiction consumed by the HJP top-down argument.

So the recurrence supplies a sufficient lower-bound interface:

```text
large structured B0
+
small colored-limit capacity
    ->
limitful/useful at partition size ell.
```

## 6. HJP recovery control

For the HJP reduced target:

```text
a(Y)=1
for every proper partial transversal Y.
```

All nodes before depth `s` are therefore accepted.

By symmetry:

```text
U_a(Y) = k^(s-|Y|).
```

Hence:

```text
U_a(empty)=k^s.
```

The partition/usefulness condition becomes:

```text
m^s > ell * k^s
```

or:

```text
ell < (m/k)^s.
```

This exactly recovers the support threshold underlying HJP Lemma 4.1.

Thus the recurrence is a genuine interpolation of the HJP proof, not an unrelated heuristic.

## 7. Why this is different from the failed entropy route

The recurrence does **not** require:

```text
full support on an HJP repair coordinate set.
```

The frozen-transversal counterexample therefore does not directly falsify it.

Instead, it consumes the actual combinatorial object required by the HJP proof:

```text
accepted lower k-limits.
```

This is a smaller downstream contract than full support.

In DP terms:

```text
full-support certificate route
    was stronger than necessary
for the HJP consumer.
```

That is the key alternative factorization.

## 8. Naturalization coordinates

A candidate natural property can now be phrased through:

```text
U_a(empty)
```

rather than universal quantification over every partition.

The target-specific HJP property has small capacity.

The open questions are:

### L — largeness

For a uniformly random Boolean truth table, how often is:

```text
U_a(empty)
```

small enough to yield `ell = 2^(Omega(s))`?

### C — constructivity

Can the predicate:

```text
U_a(empty) <= threshold
```

or a sufficient upper-bound certificate for it be computed by polynomial-size AC0 on the truth table?

Neither is established.

## 9. Important boundary

The recurrence is an **upper bound on bad-family size**.

It need not equal the true maximum bad-family size.

That is sufficient for usefulness.

A looser recurrence may reduce the achievable lower-bound constant but remains semantically valid.

## 10. Current disposition

```text
HJP target acceptance:
    PASS

HJP usefulness recovery:
    PASS

entropy-only structured-set requirement:
    BYPASSED

random-function largeness:
    QU

AC0 constructivity:
    QU

new naturalization:
    NOT YET
```

This recurrence is the current highest-value bridge because it directly targets the actual HJP lower-limit consumer.
