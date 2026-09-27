# Experiment 044 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36356468957, attempt 1
**Frozen source SHA:** 01b95f6e963f53c26cbe2670760bbc2780d71c5f
**Internal parents:** A23/A24 critical-cover line

## Verified family

- treatment labels: 3;
- selected paths: 54;
- every path is run-compressed singleton susceptibility of length 7;
- direct frozen glycan realization: 54 independent chains / 378 non-target nodes.

## Threshold verification

Threshold:

    L = 14.

Complete irredundant treatment universe:

    |U_14| = 24,576.

Exhaustive result:

- no treatment word of length <=14 solves the full family;
- every selected path has a private length-14 word that solves the other 53 paths;
- private witnesses: 54 / 54;
- duplicate paths: 0;
- non-run-compressed paths: 0.

Therefore every one-path deletion strictly lowers the optimum and:

    witness width = 54.

## Exact optimum

All 49,152 run-compressed length-15 words were enumerated.

Full-family length-15 solutions:

    695.

First frozen witness:

    010201021012012.

Therefore:

    OPT = 15.

## Interpretation

The unconditional finite three-enzyme witness-width lower bound rises from:

    24 -> 35 -> 54.

The width-54 obstruction uses only independent deterministic singleton chains.

It therefore rules out universal J_h exactness for every h<=53 even in this restricted subclass.

## Search boundary

Candidate generation used exploratory critical-cover search and does not establish that 54 is the largest possible threshold-14 critical family.

The result is an exact achievable lower bound, not a maximum-cover theorem and not an unconditional proof of unbounded ternary witness width.

A22's conditional complexity consequence remains separate:

    cited PCCSP hardness + P!=NP
    ->
    no universal constant ternary witness-width bound.
