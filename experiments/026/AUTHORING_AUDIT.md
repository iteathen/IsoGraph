# Experiment 026 — Authoring Audit

**Status:** deterministic pre-trigger review

## Freeze

DTS candidate:
- Git blob: `04170c1faa26ca8b76e211a0491ce76e358d111b`;
- SHA-256: `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`.

The holdout contains 20 fresh cases and does not reuse the development case text from Experiments 020–025.

## Public contract

The cold prompt publicly discloses:
- Q01-Q20 exact case IDs;
- every answer key;
- every enum domain;
- exact case ordering;
- nonempty reason requirement;
- nonempty authority list requirement;
- module assessment values;
- self-audit fields.

Boolean examples are explicitly type examples, not expected truth values.

## Hidden material

Only the expected semantic values are hidden in `experiments/026/hidden/ASSERTIONS.json`.

No hidden:
- string-length threshold;
- alias table;
- additional pair/case requirement;
- free-text token;
- serializer convention.

## Cold isolation

Permitted cold inputs:
- qualified dependency packet;
- exact DTS 0.1 candidate;
- fresh Q01-Q20 holdout;
- public qualification prompt.

Excluded:
- hidden assertions/scorer;
- this audit;
- prior DTS development Experiments 020–025;
- prior DTS results/reviews;
- repository/agent routing;
- qualification review.

## Scorer self-test

The deterministic scorer:
1. accepts a perfect synthetic 20-case report as `QUALIFIES`;
2. rejects a Q18 scoped-TI semantic flip as `DOES_NOT_QUALIFY`.

No external semantic resource is used during preflight.
