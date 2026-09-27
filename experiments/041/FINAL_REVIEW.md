# Experiment 041 — final review

**Status:** PASS
**Date:** 2026-09-27
**Successful workflow run:** 36354941346, attempt 1
**Frozen source SHA:** 8a0e5f124f3b1d174619b40f227975ddc7424b0e
**Failed infrastructure predecessor:** run 36354858591, attempt 1, failed before semantic output because the compact realization harness rejected n>28.

## Result

Four explicit three-enzyme singleton path families were verified with exact witness widths 4, 5, 6, and 7.

| family | paths | total nodes | full OPT | max one-path-deletion OPT | direct glycan OPT |
| --- | ---: | ---: | ---: | ---: | ---: |
| W4 | 4 | 12 | 6 | 5 | 6 |
| W5 | 5 | 25 | 9 | 8 | 9 |
| W6 | 6 | 29 | 9 | 8 | 9 |
| W7 | 7 | 31 | 9 | 8 | 9 |

Every family satisfies:

    OPT(full family) > OPT(full family with any one path removed).

Therefore the minimum path-family cardinality needed to witness the exact optimum is exactly the full family size for each listed case.

## Width-7 witness

Paths:

    02021
    02120
    12021
    1212
    2010
    2012
    2102

Measured:

    OPT = 9
    max six-path subfamily OPT = 8.

One optimum word:

    012010201.

the realization contains seven independent singleton-susceptibility chains totaling 31 non-target nodes under retained target structure, and the exact glycan optimum is also 9.

## Interpretation

The joint-path witness width is not bounded by the treatment alphabet cardinality: three enzyme labels can require at least seven simultaneously load-bearing path constraints to witness the exact optimum.

This also refutes every universal claim J_h=OPT for h<=6 in the three-enzyme frozen subclass.

## Boundary

The experiment does not prove witness width is unbounded for a fixed three-enzyme alphabet.

The next discovery target is a scalable construction or a systematic search for width 8 and beyond, followed by a proof or falsifier for unbounded witness width.

No external novelty claim is made.