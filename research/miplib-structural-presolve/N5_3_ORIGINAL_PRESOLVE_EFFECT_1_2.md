# n5-3 original presolve-effect audit 1.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Do the two exact mapped original inequalities change SCIP's own presolve result in a way that could explain the repeated time-to-optimum improvement?

## Gate

Recompute the same exact active-support BLISS certificates and direct original→transformed mapping used by holdout 0.6. No variant is inspected unless the two original inequalities are licensed.

## Variants

Starting independently from the official original `n5-3` model, run presolve only:

A. default SCIP;  
B. aggressive static symmetry (`usesymmetry=5`, `symtiming=2`, strong SBCs on, dynamic propagation off);  
C. default SCIP + exact original breakers;  
D. aggressive static symmetry + exact original breakers.

Record:

- transformed active variable count;
- transformed constraint count;
- presolve time;
- constraint-handler histogram;
- symmetry-named constraints;
- whether the four target variables survive;
- exported transformed MPS linear row/column/nonzero dimensions.

This is a mechanism audit, not a performance benchmark.
