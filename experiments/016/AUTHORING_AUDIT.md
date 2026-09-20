# Experiment 016 — Authoring Audit

**Status:** pre-trigger deterministic authoring review

## Isolation review

Public holdout contains no hidden expected answer table.

Public prompt exposes only answer-key names, types and enum domains. Boolean examples are explicitly declared placeholders.

Hidden semantic assertions exist only in:
- `experiments/016/hidden/ASSERTIONS.json`.

Cold runner forbids:
- `hidden/`;
- `ASSERTIONS`;
- scorer files;
- author audit;
- qualification reviews;
- Experiment 016 evidence.

## Coverage review

The 18 cases cover:
- derived SAME;
- derived DISTINCT;
- positive probabilistic evidence without SAME;
- negative probabilistic evidence without DISTINCT;
- BF/posterior separation;
- correlated evidence;
- qualified conditional independence;
- QU-conditioned evidence without distribution;
- robust evidence across QU;
- lawful marginalization;
- missing QU fail-closed;
- shared versus split equal-valued unknowns;
- exact evidence without infinite score;
- UNKNOWN plus non-neutral posterior;
- scoped quotient versus global identity;
- lineage duplication;
- anti-circular QU restriction;
- answer-free identity query contexts.

## Scorer review

The scorer checks exact case IDs/keys/values, reasoning presence, authority provenance, cold self-audit and module assessment.

The scorer self-test:
1. constructs a perfect synthetic report and requires QUALIFIES;
2. flips Q03's exact SAME field and requires DOES_NOT_QUALIFY.

## Known limitation

This authoring audit is not independent semantic qualification. Its purpose is only to catch packet/scorer/oracle leakage and mechanical defects before spending the single external call.

