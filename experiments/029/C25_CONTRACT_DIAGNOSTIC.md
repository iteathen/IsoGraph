# Experiment 029 — C25 Contract Diagnostic

**Status:** FORMAL RUN REMAINS DOES_NOT_QUALIFY — PUBLIC WIRE AMBIGUITY IDENTIFIED  
**Workflow run:** `36232906621`  
**Frozen source SHA:** `db80f31a84b103210f5772740f5fdfc2ffe15bae`  
**Evidence commit:** `55975f0571b3862b60a0c5130d8c0045c968f1bd`  
**Formal score:** 25 / 26 PASS; C25 failed

## Frozen result

The reasoner returned for C25:

```json
{
  "mutation_control_passes": true,
  "familiar_form_repair_allowed": false
}
```

Its reason was:

> Adversarial mutations must be preserved; silent repair toward familiar forms is a qualification failure.

The reason cited Core 0.19 section 18.11.

## Contract defect

The public field:

```text
mutation_control_passes
```

is ambiguous between:

1. **qualification meaning:** the mutated distinction survived rendering and cold reconstruction, so the mutation-preservation qualification control passes; and
2. **test-detection meaning:** the adversarial control successfully detected familiar-form repair, so the test itself “passes” by catching the defect.

The hidden scorer intended meaning (1).

The semantic explanation clearly applied the Core 0.19 rule correctly but serialized the boolean under meaning (2).

Therefore the frozen Experiment 029 disposition remains immutable:

```text
DOES_NOT_QUALIFY
```

It is not rescored.

## Corrective action

Use a fresh focused regression with unambiguous fields that separately ask:

- whether the decoder preserved the mutated distinction;
- whether the exact-rendering qualification passes;
- whether familiar-form repair is allowed.

The regression must include both:

- a correctly preserved mutation; and
- a familiar-form repair failure.

All other Experiment 029 cases remain frozen evidence at their original disposition.
