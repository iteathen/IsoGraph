# n5-3 optimized end-to-end replication 0.4

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Optimized end-to-end holdout 0.3 used fresh seeds 15–21 and found:

- 7/7 both variants optimal;
- structural end-to-end wall wins: 6/7;
- median wall: 44.91 s baseline vs 36.97 s structural;
- median end-to-end ratio: ~0.872;
- structural frontend: ~0.198 s;
- median nodes: 1547 vs 1022;
- median LP iterations: 225391 vs 168165.

This replication is frozen only because 0.3 was positive.

## Protocol

Use the identical exact pipeline and exact breakers:

~~~text
t_C0021 >= t_C0026
t_C0027 >= t_C0028
~~~

The optimized bulk graph builder, active-support filtering, BLISS replay, and breaker selection must reproduce the same certificates. No algorithmic changes are allowed.

## Fresh seeds

~~~text
22 23 24 25 26 27 28
~~~

For each seed:

- A: official original `n5-3`, SCIP default symmetry/presolve, one thread, 90-second limit;
- B: the full optimized structural frontend followed by SCIP on the transformed residual with symmetry disabled and the two exact breakers, normal residual re-entry presolve, one thread, 90-second limit.

Alternate execution order by seed parity.

## Main metric

Among pairs where both variants solve optimally:

- paired end-to-end wall wins/losses;
- median end-to-end wall ratio;
- nodes;
- LP iterations.

The structural frontend cost is included in every B end-to-end comparison.

A successful replication requires at least 5/7 paired end-to-end wins and median end-to-end ratio < 0.95. This threshold is predeclared before seeds 22–28 are run.
