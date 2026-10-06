# MIPLIB dominance / factorization screen 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Sample

Use the 24 models already selected without outcome-based additions:

- initial prototype: `mad`, `glass4`, `supportcase26`, `bppc4-08`;
- recurrence-0.1 sample: `50v-10`, `reblock115`, `ran14x18-disj-8`, `gen-ip002`, `gen-ip054`, `ic97_potential`, `pk1`, `n5-3`, `neos859080`, `neos-911970`, `seymour1`, `p200x1188c`, `b1c1s1`, `markshare2`, `mas74`, `exp-1-500-5-5`, `markshare_4_0`, `qap10`, `cost266-UUE`, `mas76`.

All analysis starts after HiGHS 1.15.1 presolve.

## Exact factorization

Build the row-variable incidence graph. Multiple nontrivial connected components are an exact decomposition signal because no constraint couples variables across components and the linear objective is additive.

## Exact binary substitution dominance

For binary variables `x` and `y`, license deletion of `x` in favor of `y` only when:

1. a row proves `x=y=1` impossible by interval activity;
2. replacing `x=1,y=0` with `x=0,y=1` is objective-nonworsening;
3. for every row:
   - upper-only row: coefficient change `a_y-a_x <= 0`;
   - lower-only row: `a_y-a_x >= 0`;
   - two-sided/equality row: `a_y-a_x = 0`;
   - unbounded row: unrestricted.

Then every feasible solution using `x` has a no-worse feasible replacement using `y`; mutual exclusion ensures the replacement state is available. Therefore an optimum exists with `x=0`.

Candidate mutual-exclusion pairs are generated only from rows containing at most 200 binary variables, with a 200,000-pair cap per instance. A null result is bounded by that detector and is not a universal no-dominance claim.

## Directional timing

For the first exact dominated variable in each positive instance, compare 10 seconds on:

- the unchanged HiGHS residual with presolve off;
- the same residual with the dominated zero-valued column deleted, presolve off.

Exactness comes from the substitution certificate; timings are directional only.
