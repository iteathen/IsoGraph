# Experiment 012 — Authoring Audit

**Status:** pre-freeze.

## Freshness

R02 is a new termination/well-founded-ranking topology and is not a replay of the matching/cut, recurrence, uniqueness, or other prior discovery holdouts.

## R01 oracle correction

The public prompt states the legal state set before the cold run:

```text
CORRESPONDENCE | DORMANT | INCOMPLETE
```

when no separator exists.

This avoids reproducing Experiment 010 D06's hidden restriction. `REJECTED` remains illegal.

## R02 mapping burden

The hidden mapping family is structural rather than lexical:

- A01 <-> B01: admissible step relation;
- A02 <-> B02+B04: finite ranking/layer structure and finite lower bound;
- A03 <-> B03: strict decrease;
- A04 <-> B05: infinite path implies endless descent;
- A05 <-> B06: impossibility;
- A06 <-> B07: termination.

The explicit derivation of Beta's layer assignment from its frozen acyclic dependency structure remains a method-specific residual even though B02 participates in the common ranking role.

## Overclaim contract

The public prompt explicitly names all four required rejected concepts. The hidden scorer uses QRC 0.1 semantic recognition and does not require exact canonical strings.

## Leakage

The cold packet excludes Experiment 010 evidence and all hidden assertions. The correction to legal R01 states is public protocol clarification, not a hidden expected answer.

## Scorer controls

Regression tests require:

- a complete valid synthetic report to qualify;
- R01 representational-difference rejection to fail;
- omission of `SAME_ALGORITHM` to fail;
- omission of the key one-to-subgraph ranking mapping to fail.

No known qualification-bearing ambiguity remains.
