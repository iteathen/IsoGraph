# Experiment 019 — Authoring Audit

The 14 cases are fresh relative to the historical Experiment 015 integrated holdout and specifically target the now-current Core 0.18 + QU 0.1 + NEI 0.4 + DP 0.1–0.6 composition.

Public serializer fields expose shapes only. Hidden expected values are stored only in experiments/019/hidden/ASSERTIONS.json.

The cold packet excludes hidden assertions, scorer, audit, previous evidence, repository map, agent guidance and expected outputs.

A deterministic scorer self-test must accept a perfect synthetic report and reject a report that incorrectly turns I04 structural correspondence into DP-authorized SAME.
