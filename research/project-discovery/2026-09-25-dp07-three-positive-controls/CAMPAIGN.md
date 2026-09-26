# DP 0.7 — Three Exact Positive Controls

**Date:** 2026-09-25
**Status:** REOPENED — EXACT TRANSLATION QUALIFICATION REQUIRED
**Branch:** `experiment/dp07-three-positive-controls-v1`
**Base:** `research/core-0.19-implicit-assertions@c2a62af9cbacbea68f5ca3ab9112d6b966fb0764`
**Protocol under test:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md`
**Authority effect:** none
**Qualification effect:** none; prior DP run is diagnostic only

## Purpose

Test whether DP 0.7 can rediscover independently known exact correspondences from primitive-oriented IsoGraph renderings without receiving the correspondence witness.

There is no real-world negative-pair oracle. Every case is a positive control.

1. Ising spin model <-> lattice gas.
2. XOR-SAT <-> linear equations over GF(2).
3. Newton-form harmonic oscillator <-> Hamiltonian phase-space oscillator.

## Doctrine

For each case:

```text
source A -> independent freeze -> native rendering A
source B -> independent freeze -> native rendering B
                           |
                           +-- freeze
                                |
                         blind DP 0.7 pass
                                |
                        recovered witness
                                |
                      hidden exact oracle
```

The discovery runner may inspect only paths listed under `discovery_inputs` in `DISCOVERY_INPUT_MANIFEST.json`.

The `oracle/` directory is withheld until scoring.

## No global negative claims

A failed candidate mapping may be falsified locally under a frozen view.

The campaign never claims that no other isomorphism exists merely because a mapping was not found.

Failure to recover the hidden positive witness is a false-negative result for the tested discovery path, not proof of structural absence.

## Prepared outputs

- six independent source freezes;
- six native renderings;
- blind discovery prompt;
- positive scoring contract;
- three withheld oracle witnesses;
- machine-readable discovery-input manifest.

No discovery result has been generated yet.


## First-run result

See `FINAL_REPORT_0_1.md` and `SCORE_0_1.json`.

The first run recovered all three conceptual known-positive correspondences, with one clean exact native witness and two partial witnesses. Case 01 also exposed a control-scope defect requiring correction before rerun.


## Exact-rendering correction

The first DP run used native structural skeletons that had not first passed exact source-to-native rendering qualification.

Under current Core 0.19 section 18 and ESR 0.1:

```text
source
-> exact qualified native rendering
-> only then DP
```

Therefore:

```text
run 36213568767
    = retained diagnostic evidence
    != current DP 0.7 qualification evidence
```

The campaign is reopened at the translation layer.

Discovery remains blocked until all six v2 translations pass the exact rendering contract.
