# Meir–Wigderson structured-set route — exact HJP obstruction 0.2

**Status:** derived exact negative result in the current naturalization campaign; no new circuit lower bound  
**Parent:** `MEIR_WIGDERSON_SET_CERTIFICATE_DP08_0_1.md`  
**Sources:** Meir–Wigderson set-certificate theorem; Håstad–Jukna–Pudlák Section-4 target.

## 1. HJP target

Use:

```text
F(x,y)
  =
OR_{i=1..s}
  AND_{j=1..m}
    (NOT x_(i,j) OR NOT y_(i,j))
```

with:

```text
N = 2*s*m.
```

For the holdout regime:

```text
s ≈ m ≈ sqrt(N/2).
```

A pair `(i,j)` is **false** when:

```text
x_(i,j) = 1
AND
y_(i,j) = 1.
```

`F(z)=0` exactly when every row contains at least one false pair.

## 2. Exact frozen-transversal subcube

Define:

```text
Z*
  =
{ z :
    for every row i,
    x_(i,1)=1
    AND
    y_(i,1)=1 }.
```

Then every row has the first pair false, so:

```text
Z* ⊆ F^{-1}(0).
```

The set has exactly:

```text
|Z*| = 2^(N-2s)
```

elements.

If `X` is uniform on `Z*`, then:

```text
H(X) = N - 2s.
```

Thus its entropy deficit is only:

```text
k = 2s = Theta(sqrt(N))
```

in the symmetric HJP regime.

This is precisely the scale relevant to the attempted `r,q,k = Theta(sqrt(N))` certificate route.

## 3. Every target-repair coordinate set is immediately certifiable

Let `R` be any coordinate set such that flipping only coordinates in `R` can change some `z in Z*` from:

```text
F(z)=0
```

to:

```text
F(z xor R')=1
```

for some `R' ⊆ R`.

To make the output `1`, at least one row `i` must become true.

But row `i` contains the permanently false first pair:

```text
x_(i,1)=y_(i,1)=1.
```

Therefore any repair of row `i` must change at least one of:

```text
x_(i,1)
y_(i,1).
```

Hence every target-repair-capable `R` contains at least one coordinate that is **fixed to 1 throughout X**.

So the marginal `X|R` cannot have full support.

The empty outside witness:

```text
Q = empty
```

is already a certificate for `R`.

Therefore:

```text
p_R = 0
```

for every HJP-repair-capable coordinate set `R`.

## 4. Consequence

No theorem whose only hypothesis is:

```text
H(X) >= N - Theta(sqrt(N))
```

can guarantee an HJP-repair-capable set `R` with certificate-free/full-support behavior for arbitrary `X ⊆ F^{-1}(0)`.

The explicit `X = Uniform(Z*)` is a counterexample.

This is stronger than the earlier observation that Meir–Wigderson averages over uniform `r`-sets.

The problem is not merely the averaging measure.

There exist high-entropy HJP zero-side distributions for which **all target-aligned repair sets are bad**.

Disposition:

```text
entropy-only structured HJP certificate bridge:
    FALSIFIED
```

## 5. Why the original Meir–Wigderson theorem is not contradicted

Theorem 1.13 guarantees a lower bound on the average `p_R` over **all** `r`-subsets.

It does not say the good `R` must be capable of changing the HJP target.

For `X = Uniform(Z*)`, many unstructured coordinate sets can retain full support even though every HJP-repair-capable set intersects the frozen transversal and is certifiable.

Thus:

```text
good information-theoretic set
    !=
target-useful set.
```

No conflict with the source theorem occurs.

## 6. Sparsity of a simpler row-local family

Even before the explicit counterexample, the row-local family is extremely sparse.

For sets of size `r` lying wholly inside one row of width `2m`:

```text
#row-local = s * C(2m,r)

#all r-sets = C(2sm,r).
```

For `s >= 1`:

```text
C(2m,r) / C(2sm,r) <= s^(-r),
```

hence the row-local measure is at most:

```text
s^(1-r).
```

At `r,s = Theta(sqrt(N))` this is:

```text
2^(-Theta(sqrt(N) log N)),
```

far smaller than the theorem's global-average scale `2^(-Theta(r))`.

This counting fact alone did not prove impossibility, but it explains why the global average gives no localization to the HJP geometry.

## 7. Direct row-wise application also fails parametrically

Suppose one tries to apply the Meir–Wigderson set theorem inside one row, treating the row as a universe of only:

```text
n_row = 2m
```

coordinates.

The theorem requires:

```text
(q+r)(2k+r+1) <= n_row / 4000.
```

For the desired HJP-aligned scale:

```text
r = Theta(m),
```

the left side is already at least:

```text
r(r+1) = Theta(m^2)
```

even with `q=k=0`, while the right side is only `Theta(m)`.

So the source theorem cannot simply be reapplied row-by-row at the needed scale.

## 8. New naturalization requirement

Any surviving structured-set route must add information beyond global entropy.

Examples of admissible missing support include:

- a condition forbidding low-codimension frozen transversals;
- row/pair regularity that persists after the circuit-induced partition;
- a target-side expansion property ensuring many rows remain repairable after conditioning;
- a downstream notion weaker than full support that is still sufficient for the k-limit argument.

None is currently established.

## 9. DP disposition

```text
MW-STRUCT as originally posed:
    FALSIFIED

uniform-set certificate theorem:
    RETAINED

entropy-only localization to HJP repair sets:
    IMPOSSIBLE by explicit high-entropy counterexample

next missing support:
    target-aligned anti-freezing / expansion invariant
    OR weaker-than-full-support consumer
```

No naturalization theorem, barrier escape, unrestricted lower bound, or P-vs-NP result is claimed.
