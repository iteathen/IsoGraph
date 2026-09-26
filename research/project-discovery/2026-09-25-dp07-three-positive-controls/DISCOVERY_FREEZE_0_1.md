# Blind discovery freeze 0.1

**Status:** FROZEN BEFORE ORACLE SCORING
**Workflow run:** `36213568767`
**Workflow attempt:** `1`
**Experiment SHA:** `c0723b683cd997a64d1594c0b2be78f41da0ca85`
**Model:** `gemini-3.5-flash`
**Cold outcome:** success
**Packet SHA-256:** `69fe9d134e3f2f8a11713b69ff238590d59b24fb33a79a487e7ef8c76ead84a6`
**Report SHA-256:** `4aa6a937d618ee51c55384b9af808b6966bfbb9a5d28fc1c73b79a308c6ef58a`

This checkpoint freezes the external discovery output before oracle/scoring review.

## Unscored dispositions returned by the blind reasoner

```text
case-01: EXACT_WITNESS
case-02: EXACT_WITNESS
case-03: PARTIAL_WITNESS
```

These are the reasoner's own dispositions and are not accepted scoring results.

## Conceptual transformations proposed

### case-01

The reasoner proposed:

```text
x_i = 2 y_i - 1
y_i = (x_i + 1)/2
```

and attempted to transport the pair and one-body coefficients.

### case-02

The reasoner proposed:

```text
F <-> 0
T <-> 1
parity-combination <-> addition in the two-element field
constraint conjunction <-> simultaneous row satisfaction
```

### case-03

The reasoner proposed:

```text
p = m v
v = dq/dt
dp/dt = -kq
=> m d2q/dt2 + kq = 0
```

and the reverse first-order reconstruction.

## Pre-scoring cautions visible in the report

Without consulting the hidden oracle, the raw report contains statements that require later checking against the frozen native roles, including:

- cardinality statements inferred from role-node counts;
- explicit raw-ID mapping claims;
- a case-01 parameter-transport formula;
- case-03 native-role correspondences.

No correction is made in this freeze.

The exact external report remains:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/evidence/run-36213568767/PARSED_REPORT.json`

This document exists only to establish the pre-oracle checkpoint.
