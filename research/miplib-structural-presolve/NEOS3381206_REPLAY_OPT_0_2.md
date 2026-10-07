# neos-3381206 exact replay optimization 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The optimized original-breaker holdout on `neos-3381206-awhea` found a useful solver-only effect but a 5.35 s structural frontend. Stage profiling showed:

- SCIP presolve: ~0.036 s
- export: ~0.039 s
- HiGHS parse: ~0.007 s
- sparse materialization: ~0.002 s
- bulk graph data: ~0.016 s
- igraph construction: ~0.001 s
- BLISS: ~0.382 s
- exact generator replay + selection: **~4.849 s**

The current exact replay function reconstructs the complete graph edge set separately for every BLISS generator. This is implementation overhead, not structural work.

## Frozen optimization

Compare:

A. current replay/selection implementation;  
B. optimized replay/selection that materializes the exact undirected edge set once, then reuses it for all generator checks.

The optimized path must preserve, exactly:

- accepted generator count;
- active-moving generator count;
- every generator permutation;
- vertex-color preservation;
- edge preservation;
- lexicographically selected breaker;
- selected generator index;
- moved-variable count.

No certificate may be skipped or weakened.

## Measurement

On the same SCIP-transformed `neos-3381206-awhea` graph:

- one warm-up;
- five complete replay+selection passes per implementation;
- alternate execution order;
- report median/min/max wall and speed ratio.

If the exact outputs differ, the experiment fails.
