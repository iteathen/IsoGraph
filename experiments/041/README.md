# Experiment 041 — joint-path witness-width falsifier ladder

**Status:** exact falsifier experiment
**Date:** 2026-09-27
**Parents:** A18, A19, Experiments 039-040

## Purpose

Test whether a fixed three-enzyme alphabet nevertheless permits the number of paths required to witness the exact optimum to grow beyond 4.

Define the witness width of a path family F:

    W(F) = minimum |H| such that H subseteq F
           and OPT_PATH(H)=OPT_PATH(F).

For a family of size k, W(F)=k exactly when:

    OPT_PATH(F) > max OPT_PATH(F without one path).

## Candidate ladder

Verify the following singleton-susceptibility run-compressed path families over {0,1,2}.

### Width 4

    010
    012
    101
    210

Expected full optimum 6, every three-path subfamily <=5.

### Width 5

    10102
    12012
    20202
    01202
    02121

Expected full optimum 9, every four-path subfamily <=8.

### Width 6

    20210
    01010
    02121
    21201
    1020
    20120

Expected full optimum 9, every five-path subfamily <=8.

### Width 7

    02021
    02120
    12021
    1212
    2010
    2012
    2102

Expected full optimum 9, every six-path subfamily <=8.

## Independent checks

For each family:

1. compute full joint-path optimum;
2. compute J_(k-1) over every one-path deletion;
3. construct disjoint singleton glycan chains under retained target structure;
4. compute exact glycan optimum by forward ideal-state BFS;
5. verify glycan optimum equals joint-path optimum.

## Acceptance

PASS requires all four witness families to satisfy:

    full optimum > J_(k-1)

and direct glycan realization equality.

This establishes only the explicit lower bound W>=7 for some three-enzyme instances. It does not by itself prove witness width is unbounded.