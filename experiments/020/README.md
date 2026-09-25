# Experiment 020 — DTS real-transition development corpus

**Status:** development evidence; not qualification  
**Branch:** `research/dts-0.1`  
**Purpose:** Phase 3/4 source-anchored transition representation and reconstruction

This experiment tests whether DTS 0.1 role factorization can represent real transitions without inventing closure and whether the represented anatomy reconstructs the declared target-state projection exactly.

Cases:

- `S01` — sequential lexical classification from IsoGraph's qualified-rejection helper;
- `S02` — IsoMax worker successful branch-publication path;
- `N01` — IsoMax worker preparation, retained as a structurally different negative control for later TI work.

The fixtures are implementation/testing normalization only. They are not a second IsoGraph substrate and are not DTS semantic serialization.

## Reconstruction claim

For each fixture:

```text
source projection
+ declared DTS anatomy operations
-> exact declared target projection
```

The checker also verifies that preserved/introduced/removed/changed role lists agree with the source and target projections.

The claim is deliberately scoped. Omitted source/runtime effects are qualified outside the projection; omission is not interpreted as absence.

No TI is asserted in Experiment 020. TI discovery begins only after reconstruction passes.
