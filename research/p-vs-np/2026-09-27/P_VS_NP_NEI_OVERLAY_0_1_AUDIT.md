# P versus NP NEI overlay 0.1 — identity audit

**Status:** research audit

## Findings

### F1 — constructor identity was previously underrepresented

Before the NEI audit, successor/list/configuration objects could retain duplicate referents with identical constructor fields.

That made exact natural identity underdetermined even where the intended mathematical datatype had extensional constructor identity.

Successors now add exact identity laws for:

- successor values;
- list cells;
- configurations.

### F2 — raw SI distinction is not used as natural DISTINCT

The overlay does not infer:

```text
different numeric SI
    -> natural DISTINCT.
```

DISTINCT requires exact object-theory evidence/model closure.

### F3 — structural equivalence is not global SAME

Same relation extension, same computed language, same hash, same transition behavior, or same DP role is not automatically global natural identity.

These can be identity evidence or scoped quotient equality.

### F4 — scoped quotient identity is essential

The same two objects can correctly be:

```text
global DISTINCT
and
scoped SAME
```

without contradiction.

Primary case:

```text
different witness prefixes
    global list identity: DISTINCT

same continuation-acceptance residual
    residual scope: SAME.
```

This is exactly NEI 0.4's scoped-quotient discipline.

### F5 — QU is load-bearing for residual identity

If future continuation behavior is not fully known, residual identity cannot be decided from the currently materialized transitions alone.

The complete QU realization family must remain in the query.

Missing QU is incomplete/unqualified.

### F6 — no probabilistic identity evidence is currently needed

The present P-vs-NP identity layer uses exact evidence and QU.

No Bayes factor, prior, posterior, or probability distribution is invented.

If probabilistic evidence is later introduced, NEI 0.4 lineage/dependence rules apply.

## Current identity dispositions

| Query | Current disposition |
|---|---|
| exact natural successor/list/config constructor identity | exact, derived from primitive laws |
| positive terminal vs negative terminal | DISTINCT |
| duplicate same-field configuration control | SAME |
| global relation-object identity | INCOMPLETE pending identity-domain authority |
| global realization identity from same `L` alone | INCOMPLETE |
| future-behavior configuration identity | QU-mediated scoped query |
| residual-prefix identity | QU-mediated scoped query |

No global SAME is inferred from a scoped quotient.
