# Experiment 047 — discrepancy review 0.1

**Status:** IMPLEMENTATION_DEFECT_CONFIRMED / structural anomaly falsified
**Date:** 2026-09-27
**Failed workflow run:** 36358541334, attempt 1
**Failed source SHA:** ec0537fd4ea1d224451c5919db0d3b7b7ed9a33c
**Independent verifier run:** 36358722695, attempt 1
**Verifier source SHA:** b7cc753fc20cd519b03f455e5e0e1182a072ca72
**Implementation constraint:** Node.js only

## Observation

The first threshold-20 Experiment 047 run aborted while initializing watchers because threshold word index 69,905 appeared to have no failing candidate path:

    all-path family leaves threshold word 69905 uncovered

If true, one run-compressed length-20 treatment word would contain every one of the 1,536 run-compressed ternary length-10 path words as a subsequence.

The observation was preserved before repair.

## Independent falsification

A separate Node-only verifier used a direct greedy subsequence scan and did not reuse Experiment 047's branchless transition-table incidence calculation.

It exhaustively checked all 786,432 run-compressed length-19 words and all 1,572,864 run-compressed length-20 words against all 1,536 run-compressed length-10 paths.

Result:

    length-19 universal words: 0
    length-20 universal words: 0

    observed index 69905:
        word = 01020102010201020102
        independently universal = false

Therefore the apparent universality clue is falsified.

## Defect owner

Inspection of the scaled Experiment-047 hot loop found the exact local defect.

The runner set PL=10, but the manually unrolled subsequence transition sequence still declared and consumed only p0 through p8: nine path symbols.

There was no p9 and no tenth transition.

Thus Experiment 047 tested only each path's first nine symbols while believing it was testing all ten.

## Repair disposition

    IMPLEMENTATION_DEFECT_CONFIRMED

Minimum causal repair:

1. add p9 = paths[po + 9];
2. apply the tenth branchless transition;
3. add an explicit guard binding the manually unrolled kernel to PL === 10;
4. rerun from a fresh SHA;
5. retain the failed run and verifier evidence unchanged.

No semantic theorem or threshold rule is changed.

## Discovery disposition

    apparent threshold-20 universality:
        FALSIFIED

    external connection to subsequence universality
    of regular languages:
        remains independently relevant

The defect is also an engineering clue:

> Manual hot-loop unrolling can make a performance-specialized kernel silently incomplete when a scale parameter changes.

For future scaled experiments, every manually unrolled semantic dimension MUST have a matching explicit specialization guard or mechanical coverage check.

This is not a reason to abandon unrolling. It is a reason to make the performance specialization fail closed when its declared geometry changes.