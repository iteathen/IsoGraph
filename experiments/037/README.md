# Experiment 037 — set-valued partition lower bound

**Status:** exact lower-bound experiment
**Date:** 2026-09-27
**Internal parent:** GLYCAN_CLUE_DERIVATIONS_A17_PARTITION_BOUND_0_1.md

## Goal

Test the exact partition lower bound PLB on genuinely set-valued susceptibility without arbitrary singleton assignment.

## Exact quantities per reachable state

- D = exact remaining treatment distance;
- SEG = maximum single-path minimum compatible-block count;
- PLB = maximum, over all set partitions of the enzyme alphabet, of the sum of exact per-group path usage lower bounds.

Required:

    SEG <= PLB <= D.

## Exhaustive surface

- all nonempty set-valued susceptibility assignments with three enzymes on all rooted forests through n=4;
- all nonempty set-valued susceptibility assignments with two enzymes on n=5 rooted forests;
- every reachable state of every instance.

Singleton assignments are included naturally as controls but are not privileged.

## Measurements

- SEG tightness;
- PLB tightness;
- fraction of states where PLB is strictly stronger than SEG;
- gap distributions;
- which alphabet partition sizes attain the best bound.

## Acceptance

PASS requires zero SEG>PLB violations and zero PLB>exact-distance violations.