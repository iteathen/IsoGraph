# P vs NP IsoGraph campaign — checkpoint 1.0

**Branch:** `research/p-vs-np-isograph-20260926`  
**Status:** unified graph equality route mechanically closed in pinned model

## Completed

- repaired Cook-Levin chain with `FSAT`;
- added source-supported backward closure of P under polynomial many-one reductions;
- derived exact pinned-model equivalence:

```text
P = NP
    iff
SAT in P.
```

- reran DP on the corrected unified graph.

## DP consequence

Equality and separation are now visibly asymmetric:

```text
equality:
    exact representative target = SAT in P

separation:
    exact target = exists L in NP \ P
    with unrestricted circuits only one stronger sufficient route.
```

Cook-Levin internals are optional for downstream answer-only use once `NPcomplete SAT` is admitted, but remain load-bearing for proof reconstruction/provenance.

## Remaining graph work

Priority:

1. official Coq/L <-> standard Turing-model bridge;
2. uniform P -> polynomial-size unrestricted circuit bridge;
3. concrete proof-topology barrier classification.

Additional literature exploration is deferred until those graph bridges are filled.

## Authority

No P-vs-NP resolution.

No qualified IsoGraph authority changed.
