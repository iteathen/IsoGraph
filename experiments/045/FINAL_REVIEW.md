# Experiment 045 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36356875817, attempt 1
**Frozen source SHA:** 2d1db57c9c8be4116ad4f2e2bff28f2922913aff
**Internal parent:** A25 Maximum Minimal Set Cover view

## Search surface

- ternary treatment alphabet;
- every 384 run-compressed singleton path of length 8;
- complete threshold universe U_16 of 98,304 irredundant treatment words;
- complete 37,748,736 path/word incidence surface built once;
- 128 deterministic incremental deletion trials.

## Best verified critical cover

- selected paths: 75;
- threshold uncovered words: 0;
- missing private witnesses: 0;
- private witnesses: 75 / 75;
- direct glycan realization: 75 independent length-8 chains = 600 non-target nodes.

Therefore:

    witness width = 75.

By threshold padding, no treatment word of length <=16 solves the full family.

The experiment intentionally did not enumerate the next treatment length because A25 proves that an inclusion-minimal threshold cover already certifies witness width exactly.

## Search distribution

Across 128 seeded deletion-minimal covers:

- best size: 75;
- size 75 occurred 3 times;
- size 74 occurred 6 times;
- most covers fell between 67 and 71.

This confirms that cover cardinality depends materially on the deletion/minimization path.

## Interpretation

The unconditional finite ternary witness-width lower bound rises:

    24 -> 35 -> 54 -> 75.

The width-75 instance still uses only independent deterministic singleton-susceptibility chains.

It rules out universal J_h exactness for every h<=74 in that restricted subclass.

## Boundary

The randomized search does not establish that 75 is the maximum threshold-16 critical-cover size.

Separate exploratory exact-feasibility probes at the preceding threshold also showed that failure to find a larger cover is not an infeasibility certificate.

## Stringology clue

Private deletion witnesses should not be conflated with globally minimal absent subsequences.

A targeted audit of the frozen 75 private path/witness pairs found that only a minority satisfy the stronger minimal-absent-subsequence condition. The relevant exact notion for this campaign remains:

    absent relative to one private witness
    +
    present for every other selected path.

Minimal-absent-subsequence literature remains a useful comparison/tool source, not the definition of critical-cover private witnesses.