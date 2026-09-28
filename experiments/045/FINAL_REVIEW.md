# Experiment 045 — final review

**Status:** PASS — Node.js authoritative rerun  
**Date:** 2026-09-27  
**Semantic-authority workflow run:** 36357819191, attempt 1  
**Semantic-authority source SHA:** ea602d9d7a062ad32c63b7b46081b7386ae6b594  
**Latest performance-regression run:** 36357981537, attempt 1  
**Latest performance source SHA:** f9734d7a758c0d048c58ae4f054b2958d5f6cd49  
**Implementation:** Node.js v26.7.0  
**Latest Node optimization revision:** `lean-watched-coverers-v7`  
**Internal parent:** A25 Maximum Minimal Set Cover view

## Implementation policy

The active glycan algorithm campaign is Node.js only.

The earlier C++ Experiment 045 run `36356875817` is retained as historical comparison evidence but is **not active campaign implementation authority**.

The native implementation and obsolete native workflow were removed after the owner clarified the Node-only constraint.

## Search surface

The authoritative Node run evaluated the same frozen workload:

- ternary treatment alphabet;
- every 384 run-compressed singleton path of length 8;
- complete threshold universe `U_16` of 98,304 irredundant treatment words;
- 128 deterministic deletion orders;
- exact total threshold coverage verification;
- exact one-private-witness-per-selected-path verification.

The final Node implementation uses:

- branchless typed-array subsequence transitions;
- flat typed failure incidence;
- exact transposed path/word incidence;
- two-watched-coverer maintenance for the deletion search;
- typed linked event buffers;
- no C/C++, Rust, WebAssembly, or native extension.

## Exact result

Node reproduced the same exact critical cover:

~~~text
best cover size:             75
best trial:                  52
threshold uncovered words:   0
missing private witnesses:   0
private witnesses:           75 / 75
~~~

Therefore:

~~~text
witness width = 75.
~~~

The direct frozen glycan realization is:

~~~text
75 independent singleton-susceptibility chains
x
8 non-target nodes per chain
=
600 non-target nodes.
~~~

By A25, the inclusion-minimal threshold cover alone certifies witness width exactly.

No next-length optimum localization is required for the width claim.

## Deterministic search identity

The authoritative Node run reproduced the exact cover-size histogram from the historical implementation:

~~~text
62: 3
63: 3
65: 9
66: 10
67: 15
68: 17
69: 13
70: 28
71: 13
72: 6
73: 2
74: 6
75: 3
~~~

It also reproduced the same best trial and the same selected width-75 path family.

This is strong implementation-regression evidence that the Node search preserves the frozen deterministic search semantics.

## Node performance campaign

Same frozen Node workload, successive implementations:

| revision | incidence | search | total |
| --- | ---: | ---: | ---: |
| baseline Node | 1.985 s | 6.091 s | 8.092 s |
| V2 flat incidence / private invariant | 1.684 s | 2.334 s | 4.033 s |
| V3 branchless incidence / packed cover | 0.383 s | 3.070 s | 3.465 s |
| V4 branchless incidence / separate cover | 0.419 s | 3.547 s | 3.981 s |
| V5 two watched coverers | 0.380 s | 2.060 s | 2.615 s |
| V6 typed watched coverers | 0.420 s | 1.749 s | 2.289 s |
| **V7 lean watched coverers** | **0.385 s** | **1.056 s** | **1.639 s** |

The historical C++ execution step on the same GitHub runner class was approximately:

~~~text
2.265 s
~~~

from workflow log timestamps.

The cleaned V7 run reproduced the same deterministic cover-size histogram, the same best trial, the same width-75 selected family, zero uncovered threshold words, and all 75 private witnesses.

Against the historical native execution-step timing:

~~~text
1.639 / 2.265
=
0.724x
~~~

on these frozen runs.

Equivalently, the V7 Node execution was about 28% faster than the historical native reference timing for this workload on the recorded GitHub runner measurements.

This is a runner/revision/workload benchmark observation only. It is not a general claim that Node.js is faster than C++.

## Structural optimization result

The decisive Node optimization was not a language escape.

The baseline maintained exact cover counts for every threshold word after every path deletion.

V5/V6 instead maintain two selected coverers per threshold word, analogous to watched-constraint propagation:

- a path is undeletable exactly when it is the sole watcher of at least one threshold word;
- removing a nonprivate watcher searches only for replacement coverers of words currently watching that path;
- no exact coverage information needed by the greedy deletion decision is lost.

Frozen V6 counters:

~~~text
total path/word incidence:    16,403,328
watch replacement events:     46,660,401
replacement scans:            128,204,116
max trial event count:        444,572
~~~

The same 128 deletion orders and exact final verification remained intact through V7. V7 also removed hot-loop diagnostic counters and one redundant liveness branch after those quantities were no longer needed for correctness.

## Witness-width consequence

The unconditional finite ternary witness-width lower bound is now actively verified under the Node-only campaign as:

~~~text
24 -> 35 -> 54 -> 75.
~~~

The width-75 instance still uses only deterministic independent singleton-susceptibility chains.

It rules out universal `J_h=OPT` exactness for every `h<=74` in that restricted subclass.

## Boundary

The 128 randomized deletion trials do not establish that 75 is the maximum threshold-16 critical-cover size.

The result proves only:

~~~text
maximum threshold-16 critical-cover size >= 75.
~~~

Unconditional unbounded ternary witness width remains open.

The Node-only performance result is likewise revision/runner/workload-specific and must not be generalized into a language-wide speed claim.
