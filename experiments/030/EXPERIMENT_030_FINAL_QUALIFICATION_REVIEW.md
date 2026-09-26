# Experiment 030 — Core 0.19 Mutation-Preservation Final Qualification Review

**Candidate:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`  
**Candidate SHA-256:** `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`  
**Focused burden:** Core 0.19 section 18.11 mutation preservation  
**Formal disposition:** **QUALIFIES**  
**Successful workflow run:** `36233426103`  
**Frozen regression SHA:** `8bd51f07f300fa5e57bef25ce914536024f55513`  
**Evidence commit:** `0e6e1220e549e1cc4c03392f1257ce124a559257`

## Result

```text
R01 preserved mutation:      PASS
R02 familiar-form repair:    PASS
case coverage:               2 / 2 PASS
mismatches:                  0
scoring guards:              all true
module assessment:           SUPPORTED
formal disposition:          QUALIFIES
```

Cold packet SHA-256:

`b302cfdd401700612422c77c66d506af6c0e333e7466cc0b0333fcfc39cff4a6`

Frozen report SHA-256:

`4dd36d15fd00164f80d75a95af456cc8ccac63dd4832284cb0e6e3daf7aecd46`

Selected semantic model:

`gemini-3-flash-preview`

The successful provider response occurred on API attempt 2.

## Why Experiment 030 exists

Experiment 029 formally scored 25 / 26 cases PASS and remained:

```text
DOES_NOT_QUALIFY
```

Its only failed case was C25.

The C25 semantic explanation correctly stated that familiar-form repair is a qualification failure under Core 0.19 section 18.11, but the public key:

```text
mutation_control_passes
```

was ambiguous between:

- the rendering/reconstruction preserving the mutation; and
- the adversarial test successfully detecting a failure.

The frozen Experiment 029 score is not changed.

See:

`experiments/029/C25_CONTRACT_DIAGNOSTIC.md`

## Corrected public contract

Experiment 030 replaced the ambiguous key with three separate questions:

```text
decoder_preserved_mutated_distinction
exact_rendering_qualification_passes
familiar_form_repair_allowed
```

It used fresh cases rather than replaying C25.

### R01

A coefficient mutation `+7 -> -7` was represented and reconstructed exactly.

Required result:

```text
decoder preserved mutation:       true
exact-rendering qualification:    true
familiar-form repair allowed:     false
```

PASS.

### R02

A quantifier mutation `exists -> forall` was represented exactly, while the hypothetical decoder repaired it back to `exists`.

Required result:

```text
decoder preserved mutation:       false
exact-rendering qualification:    false
familiar-form repair allowed:     false
```

PASS.

## Infrastructure history

The first Experiment 030 semantic attempt, workflow `36233313237`, produced malformed truncated JSON before hidden scoring.

It is preserved as infrastructure evidence and has no semantic disposition.

A deterministic regression then required at least 16,384 output tokens for the high-thinking call. The successful rerun used that hardened budget.

## Core 0.19 cumulative evidence

Experiment 030 does not independently re-prove every Core 0.19 obligation.

Promotion review combines:

### Experiment 029

Workflow `36232906621`:

- C01-C18 implicit-assertion cases: **18 / 18 PASS**;
- C19-C24 and C26 exact-rendering policy cases: **7 / 7 PASS**;
- C25 frozen wire-shape failure retained;
- all scorer guards true.

### Experiment 030

Workflow `36233426103`:

- fresh corrected section-18.11 regression: **2 / 2 PASS**;
- all scorer guards true;
- formal disposition `QUALIFIES`.

### Concrete exact-rendering predecessor evidence

Six source-to-native renderings were qualified under Core 0.19 section 18 / ESR 0.1 and explicitly Q7-promoted:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2/PROMOTION_0_1.json`

That record pins:

```text
all_six_qualified = true
q7_promotion = PASS
contract = ESR-0.1
core_requirement = Core 0.19 section 18
```

Each promoted rendering passed the campaign's source freeze, coverage/closure, two cold reconstructions, source/reconstruction sameness, mutation controls, verification, and promotion gates.

## Conclusion

The focused C25 regression closes the only unresolved Core 0.19 qualification burden from Experiment 029 without rewriting the failed historical run.

The exact tested Core 0.19 candidate revision is therefore supported for cumulative promotion over qualified Core 0.17 + Core 0.18, subject to the separate final Core 0.19 qualification authority record.
