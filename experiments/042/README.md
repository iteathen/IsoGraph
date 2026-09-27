# Experiment 042 — ternary witness width 24

**Status:** exact finite witness verification
**Date:** 2026-09-27
**Internal parent:** A21 ternary witness-width lower bound

## Goal

Verify an explicit three-enzyme singleton path family whose exact optimum requires all 24 path constraints to witness.

## Candidate family

Twenty-four run-compressed length-5 singleton paths over {0,1,2}:

    10210
    20120
    01202
    01020
    21202
    02101
    10120
    21020
    21021
    01010
    01012
    02021
    20121
    02102
    20210
    12010
    20202
    01201
    02012
    12101
    12012
    10102
    10212
    10201

## Exact finite checks

Enumerate every run-compressed treatment word of length 10:

    3 * 2^9 = 1536 candidates.

Required:

1. no length-10 word covers all 24 paths;
2. for every path p_i, at least one length-10 word covers the other 23 paths;
3. enumerate length-11 run-compressed words and find at least one word covering all 24 paths.

These conditions imply:

    OPT(full family) = 11
    OPT(full family without p_i) <= 10

for every i, hence witness width exactly 24.

Because every path is a singleton-susceptibility chain, corrected A8/A20 path-language equivalence maps this family directly to a frozen glycan instance of 24 independent chains (120 non-target nodes) with the same optimum.

## Boundary

This experiment proves only the explicit lower bound:

    ternary witness width >= 24.

It does not prove unbounded witness width.

The candidate was found by an exploratory minimal-empty-intersection search over length-10 treatment words; the verification here is independent and exhaustive over the declared finite treatment-word spaces.