# Experiment 030 — Core 0.19 Mutation-Preservation Regression Plan

**Status:** frozen focused regression design  
**Candidate:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`  
**Candidate SHA-256:** `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`  
**Predecessor run:** Experiment 029 workflow `36232906621`  
**Predecessor formal disposition:** `DOES_NOT_QUALIFY` — 25 / 26 cases passed  
**Corrected burden:** Experiment 029 C25 public serializer ambiguity only

## Goal

Discharge the Core 0.19 section 18.11 adversarial mutation-preservation burden using a fresh focused holdout whose public answer fields cannot conflate “the qualification control passes” with “the adversarial test successfully detected a failure.”

## Frozen predecessor interpretation

Experiment 029 remains immutable.

Its C25 reasoner output correctly stated that familiar-form repair is a qualification failure, but serialized:

```json
"mutation_control_passes": true
```

under an ambiguous public key.

No Experiment 029 score is changed.

All other Experiment 029 cases C01-C24 and C26 passed their frozen hidden assertions.

## Fresh cases

Experiment 030 uses two new mutation cases:

- R01 — mutation is represented and cold-reconstructed exactly;
- R02 — mutation is represented correctly but the cold decoder repairs it toward a familiar canonical form.

Public fields are:

```text
decoder_preserved_mutated_distinction
exact_rendering_qualification_passes
familiar_form_repair_allowed
```

No field uses the ambiguous phrase “mutation control passes.”

## Promotion rule

If both R01 and R02 pass under the unchanged Core 0.19 candidate, the combined Core 0.19 evidence is:

- Experiment 029 C01-C24 and C26 frozen PASS;
- Experiment 030 R01-R02 fresh PASS, replacing only the ambiguous C25 wire burden;
- six ESR-qualified/Q7-promoted exact source-rendering bundles as concrete section-18 reconstruction evidence.

This combination may support Core 0.19 promotion after a final revision-specific qualification review.

## Resource discipline

Use one batched external semantic call for R01-R02 after deterministic scorer and runner self-tests pass.
