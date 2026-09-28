# Experiment 047 — final review

**Status:** PASS after clue-preserving implementation repair
**Date:** 2026-09-27
**Authoritative workflow run:** 36358828377, attempt 1
**Authoritative source SHA:** 55088c2450e689654e77ca1b70c758cb2df66933
**Implementation:** Node.js v26.7.0 only
**Optimization revision:** `dense-bitset-watchers-v1`
**Internal parent:** A27 witness width 113

## Preserved discrepancy history

The first threshold-20 run reported an apparent threshold word with no failing length-10 path and aborted before semantic output.

An independent Node verifier then exhaustively checked all run-compressed words at lengths 19 and 20 using a direct greedy subsequence implementation.

It established:

    length-19 universal words: 0
    length-20 universal words: 0

and directly falsified the allegedly universal word at index 69,905.

Inspection localized the defect: the scaled hot loop set `PL=10` but its manually unrolled transition kernel still consumed only `p0..p8`.

The minimum repair added `p9`, the tenth transition, and a fail-closed `PL===10` specialization guard.

See `DISCREPANCY_REVIEW_0_1.md` and the anomaly evidence for immutable provenance.

## Search surface

The repaired Node run evaluated:

    candidate path length:       10
    candidate paths:             1,536
    threshold treatment length:  20
    threshold words:             1,572,864
    deterministic deletion runs: 128

The exact path/word surface is:

    1,536 * 1,572,864
    = 2,415,919,104

candidate subsequence pairs.

## Exact result

The repaired search produced:

    best trial:                  2
    best cover size:             173
    threshold uncovered words:   0
    missing private witnesses:   0
    private witnesses:           173 / 173

Therefore:

    witness width = 173.

The direct frozen glycan realization is:

    173 independent singleton-susceptibility chains
    x
    10 non-target nodes per chain
    =
    1,730 non-target nodes.

By A25-A27, complete threshold coverage plus one private threshold witness per selected path is a complete exact witness-width certificate.

## Exact incidence scale

Total failure incidence:

    1,066,066,944

The dense exact path/threshold failure bit matrix occupies:

    301,989,888 bytes.

This is one bit per path/threshold pair and avoids storing more than one billion path IDs.

## Node performance

Frozen timing breakdown:

| stage | time |
| --- | ---: |
| word generation | 0.055 s |
| transition table | 0.302 s |
| exact incidence construction | 38.759 s |
| watcher initialization | 0.043 s |
| 128-trial search | 80.264 s |
| exact verification | 0.049 s |
| **total** | **119.472 s** |

At the previous dense-bitset Experiment-046 scale, the exact path/word surface was eight times smaller and measured 15.469 s total.

The observed scaling ratio is:

    119.472 / 15.469
    ≈ 7.72.

This is a runner/revision/workload observation only and not an asymptotic theorem.

## Witness-width consequence

The unconditional finite ternary witness-width lower-bound sequence is now:

    24 -> 35 -> 54 -> 75 -> 113 -> 173.

The width-173 family falsifies universal:

    J_h = OPT

for every fixed:

    h <= 172

even in deterministic singleton-susceptibility three-enzyme chain forests.

## Search boundary

The 128 deterministic randomized deletion orders do not solve Maximum Minimal Set Cover to optimality.

The experiment proves only:

    maximum threshold-20 critical-cover size >= 173.

It does not establish:

- the maximum threshold-20 witness width;
- unconditional unbounded ternary witness width;
- an exact growth law;
- an asymptotic Node runtime bound.

## Engineering lesson from the discrepancy

The false universality observation was caused by stale manual unrolling after a geometry change.

Performance-specialized unrolling remains allowed, but future scaled kernels must fail closed through a specialization guard and should include an independent semantic spot-check or mechanically generated coverage check.