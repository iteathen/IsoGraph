# mcsched exact S2 longer holdout 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The fresh-seed 20-second S2 holdout on `mcsched` certified the exact two-variable action but produced only a tiny median-gap improvement and 2/5 paired gap wins. That is not confirmation.

## Exact treatment

Recompute from the official MIPLIB model:

1. SCIP 10.0.2 presolve with symmetry disabled.
2. Active-support filtering.
3. Exact coefficient-colored graph construction.
4. BLISS generator enumeration and replay.
5. Require the largest active orbit to have size 2 and induced action order `2! = 2`.
6. Add the exact canonicalization `x_1 >= x_2` for the lexicographically ordered orbit.

No breaker may be hard-coded without reproducing the certificate.

## Fresh holdout

Seeds: `8,9,10,11,12`.

For each seed, on the same transformed residual:

- A: fresh SCIP default symmetry, normal presolve;
- B: SCIP symmetry disabled + exact S2 canonicalization, normal presolve.

Time limit: 60 seconds per variant. Alternate execution order by seed parity.

Report status, primal, dual, gap, bound width, nodes, LP iterations, and wall time. Report structural frontend cost separately.

## Confirmation rule

Directional confirmation requires both:

- lower median gap in B than A; and
- at least 3/5 paired gap wins.

If both variants solve optimally on a majority of seeds, compare time-to-optimum instead.
