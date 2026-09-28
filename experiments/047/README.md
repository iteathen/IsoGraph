# Experiment 047 — Node-only ternary threshold-20 critical-cover search

**Status:** exact finite critical-cover construction search
**Date:** 2026-09-27
**Internal parent:** A27 witness width 113
**Implementation constraint:** Node.js only

## Purpose

Scale the exact ternary witness-width construction one symmetric level beyond Experiment 046 while preserving the Node-only implementation constraint.

## Finite incidence system

- treatment alphabet: `{0,1,2}`;
- candidate paths: every run-compressed singleton word of length 10;
- candidate path count: `3 * 2^9 = 1,536`;
- threshold treatment length: 20;
- threshold universe `U_20`: every run-compressed ternary word of length 20;
- `|U_20| = 3 * 2^19 = 1,572,864`.

For candidate path `P`:

    D_20(P) = { w in U_20 | P is not a subsequence of w }.

## Node implementation

Use the exact dense transposed bitset representation validated by Experiment 046:

1. compact `Uint8Array` path/word storage;
2. branchless per-threshold-word subsequence transition tables;
3. one-bit exact failure incidence per path/threshold pair;
4. two watched coverers per threshold word;
5. intrusive typed-array watcher lists;
6. monotone path-id replacement cursor;
7. 128 deterministic deletion orders;
8. exact post-search threshold coverage/private-witness verification.

No C/C++, Rust, WebAssembly, native addon, or native helper is permitted.

## Expected incidence storage

The dense failure matrix requires:

    1,572,864 * ceil(1,536/32) * 4
    = 301,989,888 bytes

for the primary exact incidence bitset.

This avoids the much larger sparse path-id CSR expected at this density.

## Exact certification

For the retained best cover:

- every threshold word must be forbidden by at least one retained path;
- every retained path must own at least one private threshold word;
- all retained paths must be distinct/run-compressed.

By A25-A27:

    exact witness width = retained cover cardinality.

## Acceptance

PASS requires:

- Node.js implementation;
- zero uncovered threshold words;
- zero retained paths without a private threshold witness;
- exact witness width equal to selected cover size;
- exact witness width >= 113.

## Boundary

The 128 deterministic deletion orders do not optimize Maximum Minimal Set Cover globally.

The experiment establishes an exact achievable finite lower bound only.