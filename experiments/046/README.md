# Experiment 046 — Node-only ternary threshold-18 critical-cover search

**Status:** exact finite critical-cover construction search
**Date:** 2026-09-27
**Internal parent:** A26 Node-verified witness width 75
**Implementation constraint:** Node.js only

## Purpose

Scale the exact ternary witness-width construction one symmetric level beyond Experiment 045 while preserving the Node-only performance constraint.

## Finite incidence system

- treatment alphabet: `{0,1,2}`;
- candidate paths: every run-compressed singleton word of length 9;
- candidate path count: `3 * 2^8 = 768`;
- threshold treatment length: 18;
- threshold universe `U_18`: every run-compressed ternary word of length 18;
- `|U_18| = 3 * 2^17 = 393,216`.

For candidate path `P`:

~~~text
D_18(P)
=
{ w in U_18 |
  P is not a subsequence of w }.
~~~

## Node implementation strategy

Use Node.js typed arrays only.

1. Generate all path/threshold words into compact `Uint8Array` storage.
2. Build branchless per-word subsequence transition tables.
3. Build exact per-path forbidden-word rows using one reusable temporary `Uint32Array`.
4. Transpose to a compact threshold-word -> path-coverer CSR in `Uint16Array`.
5. Release row incidence before the search.
6. Run the V6 two-watched-coverer deletion search with typed linked replacement events.
7. Run 128 deterministic deletion orders.
8. Verify the retained best cover exactly by rescanning the compact transposed coverer relation.

No C/C++, Rust, WebAssembly, native addon, or native helper is permitted.

## Exact certification

For the retained cover:

- every threshold word must be forbidden by at least one retained path;
- every retained path must have at least one private threshold word;
- all retained paths must be distinct and run-compressed.

By A25/A26:

~~~text
exact witness width
=
retained cover cardinality.
~~~

The direct frozen glycan realization uses one independent singleton-susceptibility length-9 chain per retained path.

## Search boundary

The 128 deterministic deletion orders generate feasible inclusion-minimal covers.

They do not solve Maximum Minimal Set Cover to optimality.

The experiment establishes an exact achievable lower bound only.

## Performance measurements

Record separately:

- word generation / transition-table time;
- incidence construction time;
- transpose/watch initialization time;
- 128-trial search time;
- exact verification time;
- total time;
- total failure incidence;
- watcher replacement events/scans;
- peak typed event count;
- memory-relevant incidence cardinalities.

Performance measurements are runner/revision specific and do not alter semantic correctness.
