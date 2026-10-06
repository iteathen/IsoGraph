# n5-3 active double-generator symmetry benchmark 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Corrected input

The active-support audit corrected the SCIP MPS export confound.

For `n5-3` after SCIP 10.0.2 presolve with symmetry disabled:

- 2,142 variables remain active;
- 212 additional exported columns are not active SCIP variables;
- BLISS returns 208 variable-moving generators on the export graph;
- **206 generators move export-only variables**;
- **2 generators move active variables**;
- the two active generators together move 168 active variables arranged into 84 size-2 active variable orbits;
- fresh SCIP re-entry with symmetry on/off shows no visible recovery of this active symmetry.

The earlier orbit-max benchmark targeted the largest export-only orbit and is not commercial evidence. The earlier single-breaker benchmark selected one of the two active 84-variable generators and remains valid.

## Exact composition test

Recompute the exact active-tagged subdivision graph and recover the two active-moving generators.

Before adding more than one breaker, mechanically require:

1. each active generator is an involution;
2. their moved active-variable supports are disjoint;
3. therefore the generators commute on active variables;
4. each selected breaker pair lies within the corresponding generator support and has identical ordered domain/objective attributes.

If those conditions hold, choose the lexicographically first moved pair from each generator and add one ordering inequality per generator.

Because the supports are disjoint, applying one generator cannot change the orientation constraint selected for the other. Every solution orbit therefore has an objective-equal representative satisfying both breakers.

If the supports overlap or the conditions fail, stop without benchmarking; do not assume simultaneous breaker safety.

## Benchmark

On the same SCIP-transformed residual, with SCIP presolve and symmetry disabled, run five paired 15-second trials for seeds 0..4:

A. baseline;  
B. the previously used single active-generator breaker;  
C. both independently certified active-generator breakers.

Report primal, dual, gap, nodes, LP iterations, and medians. Exactness is structural; timings are directional.
