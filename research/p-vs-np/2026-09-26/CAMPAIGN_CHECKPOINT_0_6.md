# P vs NP IsoGraph campaign — checkpoint 0.6

**Branch:** `research/p-vs-np-isograph-20260926`

## New source correction

Meir–Wigderson already prove a multi-coordinate certificate theorem.

For coordinate sets `R` of size `r`, their Theorem/Lemma 1.13 gives a nontrivial average probability of retaining full conditional support against short outside certificates under an entropy/parameter bound.

They explicitly propose using `r approximately sqrt(n)` toward deeper circuit lower bounds.

## New bottleneck

The HJP holdout needs target-aligned row/pair geometry.

The source theorem averages over arbitrary uniform r-sets.

Therefore the current bridge is:

```text
uniform random r-set certificate control
    ->
HJP-structured r-set control
    ->
limitfulness/usefulness consumer
```

Both arrows remain QU.

## Campaign impact

Do not spend work reinventing a block-coordinate certificate theorem in the abstract.

Focus instead on:

1. structured-set selection compatible with HJP rows/pairs;
2. the downstream theorem that converts structured full support into the limit property;
3. only then the AC0 constructivity/largeness audit.

No P-vs-NP theorem or new circuit lower bound is claimed.
