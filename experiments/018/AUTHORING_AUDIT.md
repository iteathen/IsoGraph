# Experiment 018 — Authoring Audit

**Status:** deterministic pre-trigger authoring review

The 14 cases cover every DP 0.5 qualification target plus DP 0.6's authority-routing correction.

Public serializer fields expose types/enums only. Hidden expected values exist only in `experiments/018/hidden/ASSERTIONS.json`.

The cold packet excludes hidden assertions, scorer, audit, prior evidence, repository/agent guidance and expected results.

The scorer self-test must accept a perfect synthetic report and reject a report with D11 incorrectly assigning identity authority to DP.

This audit is mechanical isolation/coverage review only; it is not semantic qualification.
