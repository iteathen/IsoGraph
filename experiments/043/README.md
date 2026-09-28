# Experiment 043 — ternary critical-cover width search at threshold 12

**Status:** exact finite critical-cover search
**Date:** 2026-09-27
**Internal parent:** A23 threshold critical-cover representation

## Search space

Treatment alphabet:

    {0,1,2}.

Candidate paths:

    every run-compressed singleton path of length 6
    = 3 * 2^5
    = 96 paths.

Threshold treatment universe:

    U_12
    = every run-compressed treatment word of length 12
    = 3 * 2^11
    = 6,144 words.

For each path P define forbidden set:

    D_12(P)
    = { w in U_12 | P is not a subsequence of w }.

## Search objective

Find a large inclusion-minimal cover:

    union D_12(P) = U_12

such that every selected path is essential.

The search is heuristic only for cover size:

- start from all 96 candidate paths;
- repeatedly randomize deletion order;
- delete a path whenever the remaining family still covers U_12;
- retain the largest inclusion-minimal cover found over deterministic seeded trials.

## Exact verification of the best cover

For the selected family verify:

1. its forbidden sets cover all 6,144 threshold words;
2. every selected path has a private length-12 word covering every other selected path but not it;
3. paths are distinct and run-compressed;
4. enumerate increasing treatment lengths above 12 until at least one full-family solution is found, within the declared bound.

Items 1-3 alone establish:

    every one-path deletion has a length-12 solution
    while the full family has no length-12 solution,

so every selected path is load-bearing for the exact optimum and witness width equals the selected family size.

## Boundary

The randomized minimization does not prove the largest possible critical cover at threshold 12.

It produces an exact verified lower bound on achievable ternary witness width.