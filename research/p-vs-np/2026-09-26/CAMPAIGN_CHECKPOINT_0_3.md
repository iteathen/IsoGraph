# P vs NP IsoGraph campaign — checkpoint 0.3

**Branch:** `research/p-vs-np-isograph-20260926`  
**Status:** exact AC0-natural interface plus HJP unresolved naturalization boundary integrated

## New durable units

- `AC0_NATURAL_BARRIER_RENDER_0_1.isg`
- `AC0_NATURAL_BARRIER_RENDER_0_1_AUDIT.md`
- `AC0_PARITY_AC0_NATURAL_COMPARISON_DP08_0_2.md`
- `HJP_NATURALIZATION_HOLDOUT_SOURCE_REGISTRY_0_1.md`
- `HJP_NATURALIZATION_HOLDOUT_RENDER_0_1.isg`
- `HJP_NATURALIZATION_HOLDOUT_RENDER_0_1_AUDIT.md`
- `HJP_NATURALIZATION_HOLDOUT_DP08_RUN_0_1.md`

## Strongest exact representation result

An AC0-natural barrier is triggered by a **naturalized property bundle**:

```text
usefulness
+ largeness
+ AC0 constructivity
```

matched against the relevant PRF parameters.

It is not triggered merely by a named theorem such as the Switching Lemma.

Thus barrier analysis must operate over known naturalization/extraction transforms, not only literal proof syntax.

## HJP boundary result

The unresolved HJP holdout has a dual-role restriction:

```text
R-circuit — generic candidate-circuit simplification
R-target  — target-specific semantic closure after restriction
```

The current naturalization gap sits on the function-side replacement:

```text
find Psi:
    target accepted
    + useful at holdout strength
    + large
    + AC0-constructive.
```

This remains QU.

## Novelty status

No P-vs-NP theorem.

No unrestricted circuit lower bound.

No solution of the HJP naturalization open problem.

The campaign has narrowed the next search to explicit obligation vectors rather than unconstrained proof invention.

## Next exact unit

Construct the `(T,U,L,C)` comparison of HJP-specific and natural neighboring properties, then run DP only on the missing obligation transitions.
