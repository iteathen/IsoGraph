# Experiment 046 — final review

**Status:** PASS  
**Date:** 2026-09-27  
**Workflow run:** 36358154727, attempt 1  
**Frozen source SHA:** f5a3c78fe89fc3ed24bfe3f1493b4977e0dbb26e  
**Implementation:** Node.js v26.7.0 only  
**Optimization revision:** `csr-two-pass-intrusive-watchers-v1`  
**Internal parent:** A26 Node-verified witness width 75

## Search surface

Experiment 046 scaled the ternary critical-cover construction one symmetric level beyond Experiment 045:

~~~text
candidate path length:      9
candidate paths:            768
threshold treatment length: 18
threshold words:            393,216
deterministic trials:       128
~~~

The full path/threshold row matrix was not materialized.

The Node implementation instead:

1. generated branchless subsequence-transition tables;
2. counted failure incidence in one complete pass;
3. recomputed incidence in a second complete pass while filling a threshold-word -> failing-path CSR;
4. initialized exact two-watcher state;
5. ran 128 deterministic intrusive-watcher deletion searches;
6. verified the retained best cover directly from the CSR.

No C/C++, Rust, WebAssembly, native addon, or native helper was used.

## Exact result

Best verified inclusion-minimal cover:

~~~text
selected paths:             113
best trial:                 43
threshold uncovered words:  0
missing private witnesses:  0
private witnesses:          113 / 113
~~~

Therefore, by A25/A26:

~~~text
witness width = 113.
~~~

The direct frozen glycan realization uses:

~~~text
113 independent singleton-susceptibility chains
x
9 non-target nodes per chain
=
1,017 non-target nodes.
~~~

No branching, multi-enzyme susceptibility, QU, stochasticity, or biochemical ambiguity is required.

## Critical-cover distribution

Across the 128 deterministic deletion orders, minimal-cover sizes ranged from 97 through 113.

The largest observed size was:

~~~text
113
~~~

and occurred twice.

This remains a feasible exact lower bound. The randomized deletion sequence does not prove that 113 is the maximum threshold-18 minimal-cover cardinality.

## Memory / incidence scale

Exact total failure incidence:

~~~text
132,324,864
~~~

The compact `Uint16Array` coverer CSR occupies:

~~~text
264,649,728 bytes
~~~

before smaller offset/watcher arrays.

Avoiding the full fixed-stride row matrix prevented an approximately 1.2 GB `Uint32Array` allocation.

## Node performance

Frozen timing breakdown:

| stage | time |
| --- | ---: |
| word generation | 0.013 s |
| transition table | 0.070 s |
| failure-count pass | 2.712 s |
| CSR fill / transpose | 2.971 s |
| watcher initialization | 0.017 s |
| 128-trial search | 5.839 s |
| exact verification | 0.023 s |
| **total** | **11.646 s** |

For comparison, Experiment 045 Node v7 used the same search semantics at the preceding scale and completed in 1.639 s total.

The Experiment-046 path/word product is eight times larger:

~~~text
768 * 393,216
/
(384 * 98,304)
=
8.
~~~

Measured total runtime grew by approximately:

~~~text
11.646 / 1.639
=
7.11x.
~~~

This is a runner/revision/workload scaling observation only, not an asymptotic theorem.

## Witness-width consequence

The unconditional finite ternary witness-width lower-bound sequence is now:

~~~text
24 -> 35 -> 54 -> 75 -> 113.
~~~

The width-113 family rules out universal:

~~~text
J_h = OPT
~~~

for every:

~~~text
h <= 112
~~~

even in deterministic three-enzyme singleton chain forests.

## Boundary

Experiment 046 does not establish:

- maximum threshold-18 witness width;
- unconditional unbounded ternary witness width;
- a polynomial or exponential growth law for maximum witness width;
- a universal performance law for Node.js.

It establishes one exact width-113 finite construction and demonstrates that the Node-only implementation can scale the exact critical-cover search to the declared 302-million path/word comparison surface.


## Dense-bitset regression

A second exact Node run used `dense-bitset-watchers-v2` at source SHA `4f4105c0cb49b000d7e320d5754f3b0380dc68ae`.

It reproduced exactly:

~~~text
best trial:                 43
best cover size:            113
threshold uncovered words:  0
missing private witnesses:  0
complete cover histogram:   identical
~~~

Thus the dense bitset is an exact implementation substitute for the sparse coverer CSR on this workload.

Memory comparison for the main incidence structure:

~~~text
sparse Uint16 coverer CSR:
    264,649,728 bytes

dense one-bit incidence:
     37,748,736 bytes
~~~

The bitset uses about one seventh of the main incidence storage.

Performance comparison:

~~~text
CSR V1 total:
    11.646 s

dense-bitset V2 total:
    15.469 s
~~~

The bitset is slower here because watcher replacement scans bit blocks rather than walking a compact path-id list.

Its purpose is scaling pressure: at the next symmetric level, a sparse path-id CSR approaches multi-gigabyte storage while the exact bit matrix remains a few hundred megabytes.

The active campaign therefore keeps both lessons:

- sparse coverer lists are faster at moderate density/scale;
- dense incidence bits are the preferred memory representation when path-id storage becomes dominant.

Both are Node.js-only implementations.
