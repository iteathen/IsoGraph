# DP 0.7 — Three Exact Positive Controls

**Date:** 2026-09-25  
**Status:** COMPLETE — PASS 3 / 3 FROZEN POSITIVE CONTROLS  
**Branch:** `experiment/dp07-three-positive-controls-v1`  
**Base:** `research/core-0.19-implicit-assertions@c2a62af9cbacbea68f5ca3ab9112d6b966fb0764`  
**Protocol under test:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md`  
**Authority effect:** none  
**Qualification effect:** three-positive-control stage passed; full DP 0.7 specification promotion is not claimed by this campaign alone

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
                           +-- exact ESR qualification
                                |
                           Q7 promotion
                                |
                         blind DP 0.7 pass
                                |
                     mechanical exact-role gate
                                |
                        recovered witness
                                |
                      hidden exact oracle
```

The discovery runner may inspect only paths listed under `discovery_inputs` in `DISCOVERY_INPUT_MANIFEST.json`.

The `oracle/` directory and `SCORING_CONTRACT.md` are withheld until the accepted blind output is frozen.

## No global negative claims

A failed candidate mapping may be falsified locally under a frozen view.

The campaign never claims that no other isomorphism exists merely because a mapping was not found.

Failure to recover the hidden positive witness is a false-negative result for the tested discovery path, not proof of structural absence.

## Translation qualification

The original blind run used native structural skeletons that had not first passed exact source-to-native rendering qualification.

Under Core 0.19 section 18 and ESR 0.1:

```text
source
-> exact qualified native rendering
-> only then DP
```

Therefore:

```text
run 36213568767
    = retained diagnostic evidence
    != current qualification evidence
```

Six v2 source-to-native bundles were rebuilt and independently qualified under ESR 0.1.

All six passed and were explicitly Q7-promoted at:

`f13aca1420327d7c1dc9a95ff78df44ffd820170`

The blind `blind-v2` payload uses the promoted native/signature blobs.

## Exact-witness enforcement development

Subsequent qualification attempts exposed three separate execution/harness problems, all preserved as evidence rather than rewritten:

1. provider quota/high-demand failures;
2. model promotion of incomplete support audits to `EXACT_WITNESS`;
3. exhaustive-output truncation and inconsistent role classification.

The campaign added:

- a pinned generic transformation semantic authority;
- DP 0.7 exact-support closure requirements;
- exhaustive per-symbol role coverage;
- literal-aware counterpart validation;
- a mechanical gate before `PARSED_REPORT.json` acceptance;
- sufficient model output budget for the exhaustive report.

Rejected runs remain diagnostic evidence.

## Final accepted run

**Workflow:** `36228776786`  
**Experiment SHA:** `414405f1cd527b529464ab2fb63ec7695d5f5165`  
**Evidence commit:** `500c6e398331694d922267c9bc38cfa563e6d89e`  
**Pre-oracle freeze:** `183882e2877cc594ba7ca1e6aff3344ba09d9517`  
**Mechanical role-coverage audit:** PASS  
**Hidden score:** `SCORE_0_4.json`  
**Final report:** `FINAL_REPORT_0_4.md`

Frozen packet:

`ee6dad3d2e27841a5ebae87ceaa6f4880ab4de0d05d7161e5bd60ab515fa972a`

Frozen report:

`838d283002e3205a1703899b45abe79e68020b4171bd01ac5e3472a19e05664e`

## Hidden-oracle result

```text
case-01: KNOWN_POSITIVE_WITNESS_RECOVERED
case-02: KNOWN_POSITIVE_WITNESS_RECOVERED
case-03: KNOWN_POSITIVE_WITNESS_RECOVERED

accepted exact witnesses: 3 / 3
three-positive-control stage: PASS
```

The final report recovered, among other load-bearing distinctions:

- case 01: affine binary-state mapping, exact parameter transport, common beta, configuration-independent energy residual, normalized-ensemble preservation;
- case 02: Boolean/GF(2) value bijection, operation table, selected-member support, target/RHS, local and global satisfaction;
- case 03: `p=m v=m qdot`, bidirectional Newton/Hamilton reconstruction, and accounted Hamiltonian representation residuals.

## Scope of the result

This campaign establishes:

> With exact ESR-qualified/Q7-promoted renderings, pinned generic transformation authority, an oracle-blind packet, DP 0.7 exact-support rules, and mechanical role-coverage enforcement, the tested external reasoner recovered all three frozen exact positive correspondences.

It does not establish:

- that the structures are domain-unrecognizable to a pretrained reasoner;
- that every broader DP 0.7 qualification target has been tested;
- a new Core primitive;
- a global negative-isomorphism oracle.

See `FINAL_REPORT_0_4.md` and `SCORE_0_4.json` for the final scored evidence.
