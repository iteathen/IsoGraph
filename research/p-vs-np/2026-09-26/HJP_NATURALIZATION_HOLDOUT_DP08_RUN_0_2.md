# HJP holdout — DP 0.8 run 0.2: single-coordinate naturalization seam

**Status:** experimental discovery synthesis; open problem remains open  
**Input:** `HJP_HOLDOUT_SENSITIVITY_TULC_0_1.md`

## 1. The four-obligation QU collapses to a two-endpoint interpolation

The prior run represented a candidate naturalization by:

```text
(T,U,L,C).
```

After the exact sensitivity derivation:

```text
target-specific endpoint:
    (YES, YES, NO, YES)

known natural endpoint:
    (NO, YES, YES, YES)
```

Therefore `U` and `C` are not the unresolved coordinates in the known interpolation.

The open seam is:

```text
find Psi with
    T = YES
    L = YES

while retaining
    U = YES
    C = YES.
```

## 2. The known natural property cannot be repaired by quantitative tuning alone

The target has:

```text
sens(F,z) <= O(sqrt(N))
```

at every zero-input.

The known natural property requires:

```text
sens(f,z) = Theta(N)
```

on a large set of zero-inputs.

This is an asymptotic structural mismatch, not a constant-factor miss.

Therefore changing:

- the `100` constant;
- approximate-counting accuracy;
- a lower-order threshold term;

cannot make the known high-sensitivity property accept the HJP target while preserving the same linear-sensitivity form.

A qualitatively different target-compatible statistic is required.

## 3. Candidate property family must respect block semantics without becoming small

The HJP target obtains its hard-side lower bound through pair/block structure and a target-preserving restriction.

The exact-target/block property is useful and constructive but not large.

Therefore the naturalization problem is now a representation question:

```text
which quotient/projection of the target's block structure
is broad enough to be large,
cheap enough to be AC0-constructive,
and still strong enough to feed the limit argument?
```

This is a legitimate DP search target.

It is not equivalent to preserving the full block decomposition.

## 4. Do not require natural random functions to share literal block coordinates

A property that quantifies over one fixed partition of the `N` input coordinates into HJP pairs/rows risks being too small or target-specific.

Naturalization should therefore test whether the lower-bound consumer needs:

```text
literal fixed block coordinates
```

or only some invariant such as:

```text
existence of a large family of restrictions
whose surviving accepting/rejecting sets
have the required k-limit relation.
```

The second formulation is more representation-invariant.

Its largeness and constructivity are unknown.

Disposition:

```text
candidate abstraction: QU
```

## 5. Potential distribution shift is separate from ordinary naturality

One could also seek a property large under a structured random-function distribution tailored to block semantics.

But Definition 2.3 uses uniform random functions, and the 2026 paper only extends the barrier to certain biased distributions where matching AC0 PRFs can be constructed.

Therefore:

```text
large under custom structured distribution
    !=
natural in the current barrier sense.
```

Such a move changes the barrier model and requires a matching PRF analysis.

Do not treat it as a free repair of `L`.

## 6. Current highest-value exact question

The next useful question is:

```text
Can HJP usefulness be restated solely in terms of
a restriction/limit invariant that:

1. the holdout target satisfies,
2. a uniform random function satisfies with constant probability,
3. an AC0 truth-table circuit can recognize?
```

If yes, the known open naturalization may close.

If no candidate can satisfy these, that is still not a non-naturalizability theorem unless the candidate space is exhaustive.

## 7. No promotion

No natural property has been found.

No barrier has been escaped.

No stronger circuit lower bound has been established.

The new result is the exact localization:

```text
known natural neighbor fails at target acceptance T,
not at usefulness U, largeness L, or constructivity C.
```
