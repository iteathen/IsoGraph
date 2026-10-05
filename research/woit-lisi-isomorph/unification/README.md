# Woit–Lisi Unification Workbench

**Status:** ACTIVE EXPLORATORY SYNTHESIS  
**Primary objective:** construct a minimal conservative unified formulation from source-faithful Woit and Lisi structures.

This directory contains project-generated synthesis artifacts.

Nothing here is attributed to Peter Woit or Garrett Lisi unless separately sourced.

## Current architecture

~~~text
Woit source treatment ----+
                          |
                          v
                    shared kernel U0
                          |
                          v
                    unification U
                          ^
                          |
Lisi source treatment ----+
~~~

The historical bridge work supplied the first U0 kernel.

The new work begins where bridge-finding stopped: attach compatible residuals and determine whether one structure can reconstruct meaningful parts of both programs simultaneously.

## Current kernel

`UNIFICATION_KERNEL_U0_0_1.isg` freezes the initial synthesis interface.

It is based on:
- the quaternionic/chiral action correspondence;
- the scoped chiral Clifford alignment;
- projective/twistor incidence;
- Spin(4) role structure;
- pseudoreal/complex-structure transport;
- the BT01 falsifier suite.

## Leading candidate

**U1-TC — twistor/Clifford amalgam**

U1 now has a first concrete phase:

**U1.0-PC — projective compactification**

The finite Lisi quaternionic action is identified with the finite Woit graph family through U0; Woit's infinity fiber then compactifies the incidence family without defining a fictional Lisi operator at infinity.

Use Woit's global twistor geometry as the first geometric extension of U0 and test whether Lisi's Clifford/triality residuals admit a chart-consistent, pseudoreal-compatible extension over it.

The first U1 result must reconstruct U0 on every local chart.

### U1.1-TR result

The strong global triality/fiber extension has now been tested and **rejected**.

The finite U0 graph/incidence relation survives the W01↔W05 projective convention change when quaternion conjugation, homogeneous-coordinate swap, and the induced left/right multiplication side-swap are all retained. However, a total Lisi triality action over the U1.0 compactification would require a source-backed vector/algebra role at the infinity patch, or an exact source-backed family-preservation law. Neither is currently present.

No Lisi operator, division-algebra element, or triality role is invented at infinity. L-ALG therefore remains a preserved residual outside U1.0, and U1-TC remains structurally consistent through U1.0-PC rather than being expanded by force.

## Later candidates

- U2-DYN — Woit chiral YM/GR + Lisi gauge/gravity/Higgs/Cartan dynamics.
- U3-OT — octonionic/triality extension.
- U4-EX — exceptional realization, including E8 only if lower levels survive.

## Files

- `../UNIFICATION_TARGET_REVISION_0_1.md` — objective change from bridge search to constructive unification.
- `UNIFICATION_SYNTHESIS_PROTOCOL_0_1.md` — synthesis rules, reconstruction requirements, and promotion vocabulary.
- `UNIFICATION_KERNEL_U0_0_1.isg` / `.md` — current shared synthesis kernel.
- `UNIFICATION_RESIDUAL_PORTS_0_1.md` — W/L residual classification and first interaction hypotheses.
- `UNIFICATION_CANDIDATE_MANIFEST_0_1.json` — machine-readable candidate state.
- `UNIFICATION_U1_PROJECTIVE_COMPACTIFICATION_0_1.isg` / `.md` / `.json` — first constructive U1 candidate: Woit's global projective family as a conservative compactification of Lisi's affine chiral graph relation.
- `UNIFICATION_U1_TRIALITY_FIBER_EXTENSION_0_1.isg` / `.md` / `.json` — U1.1 audit: finite chart transport survives, but the strong global triality extension is rejected at the compactification patch.

## Firewall

Exploratory synthesis may proceed now from frozen evidence.

Formal promotion remains blocked until both source treatments independently seal and the synthesis survives post-seal NEI/DP/DTS, reconstruction, falsifiers, and relevant obstruction audits.
