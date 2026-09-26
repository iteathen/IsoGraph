# MWC rendering 0.2 modernization audit

**Status:** source-faithful successor candidate; not ESR-qualified  
**Predecessor:** `MWC_RENDER_0_1.isg` preserved unchanged  
**Source freeze:** `MWC_SOURCE_FREEZE_0_1.md`  
**Native:** `MWC_RENDER_0_2.isg`  
**Signature:** `MWC_RENDER_0_2_SIGNATURE.json`

## What changed

The 0.1 rendering preserved the concerted/global-conformation distinction but left most statistical-mechanical equations as a role skeleton.

The 0.2 successor natively represents:

- finite binding-site family;
- one binary occupancy per microstate/site;
- one global binary conformation per microstate;
- complete microstate construction from conformation plus occupancies;
- conformation-energy contribution;
- conformation/site/occupancy-dependent binding contribution;
- state energy as conformation energy plus finite sum of binding contributions;
- exact bound count `Σ_i x_i`;
- Gibbs factor `exp(-β(E_state - n_bound μ))`;
- partition over microstates;
- normalized probability;
- source-stated activity and occupancy observables only at the exact level frozen by the source: weighted aggregates/projections, without inventing a more specific formula.

## Deliberate non-additions

The source freeze does not pin:

- one exact receptor-specific binding-energy formula;
- kinetic conformational rates;
- site-neighbor coupling;
- a numeric encoding of inactive/active beyond a two-member domain.

The successor does not manufacture those details.

## Core 0.19 / DP posture

- source-explicit structure stays separate from derived support;
- no implicit-assertion primitive was invented;
- the concerted global conformation remains a source distinction, not a high-level label substituted for native structure;
- DP 0.8 support/valuation views must remain separate from this source rendering.

## Qualification state

This author-side modernization is not ESR promotion.

Required before exact-source qualification:

- full Q1 coverage map;
- native parse/closure audit;
- two fresh native-only reconstructions;
- canonical source/reconstruction comparison;
- adversarial mutation controls;
- scorer-blind verification.
