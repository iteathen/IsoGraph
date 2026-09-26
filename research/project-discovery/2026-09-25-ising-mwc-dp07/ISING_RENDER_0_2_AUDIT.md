# Ising rendering 0.2 modernization audit

**Status:** source-faithful successor candidate; not ESR-qualified  
**Predecessor:** `ISING_RENDER_0_1.isg` preserved unchanged  
**Source freeze:** `ISING_SOURCE_FREEZE_0_1.md`  
**Native:** `ISING_RENDER_0_2.isg`  
**Signature:** `ISING_RENDER_0_2_SIGNATURE.json`

## What changed

The 0.1 rendering represented the correct broad dependency shape but left the load-bearing Hamiltonian and normalization formulas in prose.

The 0.2 successor natively represents:

- finite cyclic site family;
- complete configurations;
- one ±1 spin value for every configuration/site pair;
- periodic successor relation;
- exact frozen energy convention
  `E(σ) = -J Σ_i σ_i σ_{i+1} - h Σ_i σ_i`;
- `w(σ)=exp(-βE(σ))`;
- `Z=Σ_σ w(σ)`;
- `P(σ)=w(σ)/Z`.

## Unsupported predecessor addition removed

The 0.1 rendering included a magnetization-style weighted observable.

The frozen 0.1 source interpretation does not supply an exact observable formula as part of the rendered semantic object. The 0.2 exact-source-oriented successor therefore does not carry that observable merely because it is conventional for Ising models.

This is not a claim that magnetization is invalid or unimportant. It is an exact-rendering boundary.

## Core 0.19 / DP posture

- explicit source structure remains distinct from later implicit assertions;
- no implicit-assertion syntax was invented;
- any derived consequences belong in a separate support/discovery view;
- the native formula remains primitive-first and source-scoped;
- DP 0.8 sufficiency/valuation analysis must name its objective separately.

## Qualification state

This author-side modernization is not ESR promotion.

Required before exact-source qualification:

- full Q1 coverage map;
- native parse/closure audit;
- two fresh native-only reconstructions;
- canonical source/reconstruction comparison;
- adversarial mutation controls;
- scorer-blind verification.
