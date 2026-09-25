# Experiment 023 — Interpretation-barrier structural discovery

**Status:** Phase 7 development experiment; not qualification

This experiment freezes the normative Section 0 barrier lists from:

- Core 0.18;
- QU 0.1;
- NEI 0.4;
- DP 0.5;
- DP 0.6;
- DTS 0.1.

The source phrases are preserved exactly in `SOURCE_BARRIERS.json`.

`BARRIERS.isg` is the ordinary IsoGraph structural rendering used for discovery.

## Anti-circular representation rule

The experiment does **not** declare one shared `interpretation-barrier` relation.

Each source module uses its own local relation label:

```text
Core 0.18  ^97310
QU 0.1     ^97311
NEI 0.4    ^97312
DP 0.5     ^97313
DP 0.6     ^97314
DTS 0.1    ^97315
```

Term SIs are source-local. Even identical phrases in different modules receive different SIs.

Within one source barrier group, a left term with multiple `!=` targets is represented as a fork sharing the same source-local left SI. This preserves source topology without asserting cross-module equivalence.

The lexical strings in `SOURCE_BARRIERS.json` are provenance/display labels for the corresponding source-local SIs; they do not create structural identity.

## Question

Does DP recover a useful cross-module common factor from these independently authored non-collapse structures, or are there multiple materially different barrier families that only look similar in prose?

Valid outcomes include:
- one supported reusable common generator;
- several distinct barrier families;
- partial/common-core correspondence only;
- no useful factorization.

No source specification is refactored merely because the repeated `X != Y` surface form exists.
