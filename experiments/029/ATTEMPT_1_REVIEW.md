# Experiment 029 — Attempt 1 Review

**Workflow run:** `36232906621`  
**Frozen SHA:** `db80f31a84b103210f5772740f5fdfc2ffe15bae`  
**Evidence commit:** `55975f0571b3862b60a0c5130d8c0045c968f1bd`  
**Frozen disposition:** `DOES_NOT_QUALIFY`

## Result

The semantic decoder answered C01-C24 and C26 exactly as the hidden contract required.

C25 was the only scorer mismatch:

```text
expected:
    mutation_control_passes = false

actual:
    mutation_control_passes = true
```

The same frozen answer also stated:

```text
familiar_form_repair_allowed = false
```

and its reason said that adversarial mutations must be preserved and silent repair toward familiar forms is a qualification failure under Core 0.19 section 18.11.

## Contract defect

The public field name:

`mutation_control_passes`

admits two readings:

1. the rendering/reconstruction path passes the mutation-preservation qualification; or
2. the mutation test/control successfully detects the repair defect.

The hidden assertion intended reading 1.

The external answer used reading 2 while giving the correct Core semantic judgment.

This is a serializer/qualification-contract ambiguity. It is not evidence that the Core 0.19 candidate permits familiar-form repair.

## Disposition rule

The frozen attempt remains `DOES_NOT_QUALIFY`.

It is not rescored.

Before rerun, the public contract will rename the field so it asks directly whether the rendering/reconstruction path passes the mutation-preservation gate.

The hidden assertion and deterministic scorer test will be updated to the same unambiguous field.

No Core 0.19 semantic bytes change.
