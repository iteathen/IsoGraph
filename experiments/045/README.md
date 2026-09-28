# Experiment 045 — ternary threshold-16 maximum-minimal-cover search

**Status:** exact finite critical-cover construction search
**Date:** 2026-09-27
**Internal parent:** A25 witness-width / Maximum Minimal Set Cover view

## Purpose

Seek a larger explicit ternary witness-width construction at the next symmetric scale.

## Finite incidence system

- treatment alphabet: {0,1,2};
- candidate paths: every run-compressed singleton word of length 8;
- candidate path count: 3 * 2^7 = 384;
- threshold treatment length: 16;
- threshold universe U_16: every run-compressed ternary word of length 16;
- |U_16| = 3 * 2^15 = 98,304.

For path P:

    D_16(P) = { w in U_16 | P is not a subsequence of w }.

## Search

Build the complete 384 x 98,304 subsequence-failure incidence relation once.

For each deterministic randomized deletion trial:

1. start with all 384 path-forbidden sets selected;
2. maintain the exact number of selected sets covering every threshold word;
3. maintain the XOR identity of coverers so a count dropping 2->1 identifies the new private-witness owner in O(1);
4. remove a selected path iff it currently owns no private threshold word;
5. finish at an inclusion-minimal cover.

Run 128 seeded deletion orders and retain the largest verified minimal cover found.

## Exact verification

For the retained cover:

- every word in U_16 must be forbidden by at least one selected path;
- every selected path must own at least one private word in U_16;
- all selected paths must be distinct/run-compressed.

By A25, these checks alone imply:

    witness width = selected cover cardinality.

The direct glycan realization consists of one independent singleton-susceptibility chain of length 8 per selected path.

## Boundary

The randomized search does not solve Maximum Minimal Set Cover to optimality.

The experiment reports an exact achievable witness-width lower bound only.

## Implementation constraint

This campaign is **Node.js only**.

Native C/C++, Rust, WebAssembly, or other implementation-language substitutions are not accepted as the active experimental implementation.

Performance pressure is intentional: use typed arrays, compact integer encodings, allocation discipline, data locality, and hot-loop restructuring in Node.js.

Historical run `36356875817` used a C++ harness and is retained only as non-authoritative historical comparison evidence. Its width result must be independently reproduced by the Node.js implementation before admission into the active campaign.
