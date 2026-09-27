# Experiment 040 — fixed-h joint-path falsifier

**Status:** exact path-language falsification experiment
**Date:** 2026-09-27
**Parent:** A18 / Experiment 039

## Purpose

Experiment 039 found J3 exact on its entire small three-enzyme glycan surface.

Do not generalize that observation without a falsifier search.

## Three-enzyme search

Generate all singleton-susceptibility run-compressed path words over {A,B,C} through bounded length.

For every four-path family compute:

- exact full joint cover optimum;
- maximum exact optimum over all three-path subfamilies.

Search for:

    full optimum > J3.

Choose the smallest counterexample by total path length, then maximum path length, then lexical order.

Any such family is directly realizable as four disjoint non-target glycan chains attached beneath retained target structure.

## Two-enzyme control

Generate run-compressed binary path families through a larger bounded length and test whether:

    full optimum = J2.

This control is finite evidence only; absence of a counterexample is not a universal theorem.

## Acceptance

Experiment succeeds as a falsification experiment if it completes the declared finite search and records either:

- a concrete J3 counterexample, or
- a bounded no-counterexample result.

No desired outcome is hard-coded.