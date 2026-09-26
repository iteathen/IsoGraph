# Project Discovery — Ising / MWC DP 0.7 Campaign

**Date:** 2026-09-25  
**Status:** COMPLETE exploratory campaign  
**Authority effect:** none  
**Qualification effect:** none  
**Base branch:** `research/core-0.19-implicit-assertions@c2a62af9cbacbea68f5ca3ab9112d6b966fb0764`  
**Discovery protocol under test:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md`

## Purpose

Test DP 0.7 primitive-first derived structural views on two independently sourced systems:

- physics: finite one-dimensional nearest-neighbor Ising chain with binary spins, periodic boundary, external field, canonical Boltzmann weighting;
- biochemistry: n-site Monod-Wyman-Changeux allosteric molecule with two concerted conformations, binary site occupancy, conformation-dependent ligand binding, grand-canonical-style Gibbs weighting.

The campaign asks whether a structural common core emerges from independently frozen primitive-oriented renderings without using domain labels as comparison evidence.

## Blindness discipline

During source rendering:

1. do not use literature that explicitly maps the Ising and MWC systems to one another;
2. do not choose relation labels to align across systems;
3. use independent SI and stable-label namespaces;
4. do not add a primitive/relation because it would make the pair match;
5. record source assumptions and residual/omitted structure independently.

Only after both renderings are frozen may DP 0.7 compare them.

## Comparison discipline

The later comparison may use shared mathematical semantics only where both source freezes independently require the same mathematical operation or statistical-mechanical construction.

Domain words such as:

```text
spin
magnet
ligand
receptor
active
inactive
allostery
cooperativity
```

are hidden from structural evidence.

## Falsifiers

The campaign fails if DP:

- declares full isomorphism by ignoring coupling-topology differences;
- treats binary state count alone as sufficient correspondence;
- uses matching scientific vocabulary as evidence;
- imports the known literature connection after the freeze and cites it as discovery evidence;
- erases source-specific residuals;
- or promotes an unresolved relation to exact equivalence.

## Result status

```text
independent source freezes:           COMPLETE
independent native renderings:        COMPLETE
blind comparison freeze:              COMPLETE
DP 0.7 pass:                           COMPLETE
common-core / residual record:         COMPLETE
post-hoc validation:                   COMPLETE
whole-structure isomorphism:           FALSIFIED
partial structural correspondence:     ESTABLISHED
DP 0.7 qualification effect:           NONE
```

## Outputs

- independent source freezes;
- independent native structural renderings;
- blind comparison view;
- DP 0.7 pass;
- common-core / residual record;
- final development disposition.

This is exploratory evidence for DP 0.7, not qualification evidence.
