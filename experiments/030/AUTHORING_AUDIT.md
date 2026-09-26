# Experiment 030 — Authoring Audit

**Status:** PASS BEFORE EXTERNAL SEMANTIC EXECUTION

## Scope

Experiment 030 corrects only the ambiguous Experiment 029 C25 public wire contract.

It does not rescore Experiment 029 and does not change Core 0.19 candidate bytes.

Fresh cases:

- R01: represented mutation is reconstructed exactly;
- R02: represented mutation is silently repaired toward a familiar canonical form.

The public fields unambiguously separate:

- whether the decoder preserved the mutated distinction;
- whether exact-rendering qualification passes;
- whether familiar-form repair is allowed.

## Isolation

Cold-permitted files are exactly:

1. `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`;
2. `experiments/030/CASES.md`;
3. `experiments/030/COLD_PROMPT.md`.

Excluded:

- Experiment 030 hidden assertions/scorer;
- Experiment 029 evidence and diagnostic;
- prior decoder outputs;
- status/routing files.

## Deterministic gates

Scorer self-test:

- perfect report qualifies;
- mutation-preservation error is rejected;
- failed self-audit is rejected.

Runner dry-run:

- exact three-file packet membership;
- exact Core 0.19 hash;
- exactly two cases;
- hidden/prior evidence excluded.

## Promotion interpretation

A successful Experiment 030 result closes only the section-18.11 mutation-preservation burden that Experiment 029 C25 could not formally discharge because its public boolean was ambiguous.

Full Core 0.19 promotion would then rely on:

- Experiment 029 frozen PASS for C01-C24 and C26;
- Experiment 030 fresh PASS for R01-R02;
- six ESR-qualified/Q7-promoted predecessor renderings as concrete section-18 reconstruction evidence.

## Resource discipline

One batched external semantic call is authorized for R01-R02.
