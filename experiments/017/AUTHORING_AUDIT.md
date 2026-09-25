# Experiment 017 — Authoring Audit

**Status:** deterministic pre-trigger authoring review

## Isolation review

Public holdout contains no hidden expected-answer table.

The public prompt exposes only answer-key names, types and enum domains. Boolean examples are explicitly serializer shapes, not expected truth values.

Hidden semantic assertions exist only in:
- `experiments/017/hidden/ASSERTIONS.json`.

The cold runner forbids:
- `hidden/`;
- `ASSERTIONS`;
- scorer files;
- author audit;
- qualification reviews;
- Experiment 017 evidence;
- repository/agent guidance.

## Coverage review

The 12 cases cover:
- different semantic quantities with different values;
- aligned quantity with a remaining discrepancy;
- explicit metadata versus derived semantic predicate;
- true decoder error plus surviving discovery lead;
- hidden-distinction splitting;
- scoped quotient without global identity;
- unknown load-bearing projection rejection;
- dependency-cone invalidation;
- exact mechanical fast repair;
- bounded observation-first search;
- anomaly ending as ordinary error;
- equal values without semantic alignment.

## Scorer review

The scorer checks exact case IDs/keys/values, reasoning presence, authority provenance, cold self-audit and module assessment.

The scorer self-test:
1. constructs a perfect synthetic report and requires `QUALIFIES`;
2. flips C07 projection legality and requires `DOES_NOT_QUALIFY`.

This audit is not independent semantic qualification. It only protects the single external call from mechanical/oracle-leakage defects.
