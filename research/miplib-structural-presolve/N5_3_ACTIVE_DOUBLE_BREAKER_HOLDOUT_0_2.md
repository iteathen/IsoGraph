# n5-3 active double-breaker fresh-seed holdout 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Prior result

The exact active double-generator benchmark 0.1 used seeds 0..4 and 15-second solves. Its median relative gap improved from 0.5091687745 (baseline) to 0.4451358824 (double breaker), with 3 paired gap wins and 2 losses.

That result is directional and may reflect short-horizon or seed noise.

## Frozen holdout

Recompute the same exact active-support certificate from the SCIP-transformed `n5-3` model:

- exactly two selected active involution generators;
- breaker 1 chosen by the same lexicographic rule;
- breaker 2 chosen by the same independent-composition rule;
- both breakers must replay-certify before solving.

Use **fresh seeds 5, 6, 7**, unseen by benchmark 0.1.

On the same transformed residual, SCIP symmetry disabled:

A. baseline;  
B. both exact active breakers.

Run 60 seconds per variant.

Record primal, dual, relative gap, absolute primal-dual bound width, nodes, LP iterations, and wall time. Report structural front-end overhead separately.

## Directional confirmation criterion

A confirmation requires:

- double-breaker median gap < baseline median gap; and
- double breaker wins at least 2 of 3 paired final-gap comparisons.

The exactness of the breakers does not depend on the timing outcome.
