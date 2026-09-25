# Experiment 018 — provider failures before focused-packet revision

The first frozen cumulative packet at SHA 4a98dab50e491caded78f7012b3da9be98eb5a99 received only provider failures.

Workflow run 36176965999:
- attempt 1: HTTP 503 after the runner's permitted in-run retry; no semantic report; no score;
- attempt 2: HTTP 503 after the runner's permitted in-run retry; no semantic report; no score.

These are infrastructure/provider failures, not Discovery Protocol dispositions.

The candidate semantics, public cases, hidden assertions and expected propositions were not changed afterward.

The cold packet was then reduced according to Core obligation-sufficiency discipline: already-qualified DP 0.1–0.4 texts are treated as pinned baseline authority rather than re-sent for semantic requalification. The focused packet retains all load-bearing successor/dependency texts for D01–D14.

No failed provider attempt is reclassified as semantic evidence.
