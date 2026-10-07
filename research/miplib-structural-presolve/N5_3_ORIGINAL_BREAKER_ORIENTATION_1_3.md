# n5-3 original-breaker orientation robustness 1.3

**Date:** 2026-10-06
**Status:** frozen before results.

## Question

The exact original-model breakers on `n5-3` have produced two successful fresh-seed replications. Is that gain robust to the arbitrary representative orientation, or does it depend on choosing the current lexicographic direction?

For each exact two-cycle symmetry, either inequality orientation preserves at least one representative of every solution orbit.

## Exact gate

Recompute the unchanged exact discovery/mapping pipeline and require:

Transformed pairs:
- `t_C0021 <-> t_C0026`
- `t_C0027 <-> t_C0028`

Direct original mappings:
- `C0021 <-> C0026`
- `C0027 <-> C0028`

All mapping/certificate gates from the original-injection campaign remain mandatory.

## Variants

A. original `n5-3`, SCIP default.

B. current orientation:
~~~text
C0021 >= C0026
C0027 >= C0028
~~~

C. reversed orientation:
~~~text
C0026 >= C0021
C0028 >= C0027
~~~

The one-time structural frontend wall is added to both B and C end-to-end time.

## Fresh seeds

`67,68,69,70,71,72,73`.

60 seconds per variant. Rotate execution order by seed modulo 3 so no variant is systematically first.

## Robustness classification

Among seeds where baseline and the compared external variant both solve optimally:

An orientation is directionally positive if:
- at least 5/7 end-to-end wins versus baseline; and
- median end-to-end / baseline wall < 0.95.

Classification:
- `ORIENTATION_ROBUST`: both B and C are directionally positive.
- `ORIENTATION_SENSITIVE`: exactly one of B/C is directionally positive.
- `NO_ROBUST_GAIN`: neither is directionally positive.

All paired optimal objectives must agree within numeric tolerance.
