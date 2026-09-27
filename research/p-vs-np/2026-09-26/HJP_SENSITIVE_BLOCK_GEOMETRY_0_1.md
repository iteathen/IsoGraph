# HJP holdout — exact sensitive-block geometry 0.1

**Status:** derived exact target-structure result; novelty outside the IsoGraph corpus not asserted  
**Target:** HJP Section-4 function `F`.

## 1. False-pair counts

For a zero input `z`, define:

```text
t_i(z)
  =
# { j :
      x_(i,j)=1
      AND
      y_(i,j)=1 }.
```

Because `F(z)=0`:

```text
t_i(z) >= 1
```

for every row.

## 2. Minimal sensitive blocks

A minimal coordinate block `B` changes `F(z)` from `0` to `1` iff:

1. it targets exactly one row `i`;
2. for every false pair in row `i`, it flips exactly one of the two coordinates;
3. it flips no unnecessary coordinates.

Therefore row `i` contributes exactly:

```text
2^(t_i(z))
```

minimal sensitive blocks, each of size:

```text
t_i(z).
```

Hence the total number of minimal sensitive blocks is:

```text
sum_i 2^(t_i(z)).
```

This can be exponentially large in `m` even though one-bit sensitivity is small.

At the all-ones input:

```text
t_i = m
```

for every row, so there are:

```text
s * 2^m
```

minimal sensitive blocks of size `m`.

## 3. Exact block sensitivity

For every zero input:

```text
bs(F,z) = 2s.
```

### Lower bound

For each row `i`, form two repair blocks:

```text
B_i^x =
    all x-coordinates belonging to false pairs in row i

B_i^y =
    all y-coordinates belonging to false pairs in row i.
```

Each block repairs every false pair in that row and changes `F` to `1`.

The `2s` blocks are pairwise disjoint.

Thus:

```text
bs(F,z) >= 2s.
```

### Upper bound

Every sensitive block must make at least one row true.

Assign each sensitive block in a pairwise-disjoint family to one row it makes true.

For a fixed row, every repair block must contain at least one coordinate from each false pair.

At any one false pair there are only two coordinates.

Therefore at most two pairwise-disjoint sensitive blocks can be assigned to one row.

With `s` rows:

```text
bs(F,z) <= 2s.
```

Combining the bounds:

```text
bs(F,z) = 2s.
```

## 4. Holdout scaling

For:

```text
s ≈ sqrt(N/2),
```

both ordinary sensitivity and block sensitivity on zero inputs are only:

```text
Theta(sqrt(N)).
```

So replacing the failed one-bit-sensitivity natural property by ordinary block sensitivity does **not** restore a linear-in-`N` boundary measure.

## 5. Structural lesson

The HJP target does not obtain its useful geometry from a large number of **disjoint** local directions.

It obtains it from a very large **multiplicity of overlapping medium-radius repair blocks**:

```text
few disjoint directions
but
many overlapping structured repairs.
```

This distinguishes three quantities:

```text
ordinary sensitivity
block sensitivity
structured repair multiplicity
```

which must not be identified.

## 6. Discovery implication

A target-compatible naturalization should investigate a statistic sensitive to:

```text
abundance + geometry of medium-radius repair blocks
```

rather than merely:

```text
number of sensitive coordinates
or
maximum number of disjoint sensitive blocks.
```

Usefulness, largeness and AC0 constructivity of such a statistic remain QU.
