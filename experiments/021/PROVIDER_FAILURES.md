# Experiment 021 provider failure — workflow run 36183338156

**Disposition:** infrastructure/provider failure  
**Semantic report:** none  
**Score:** none  
**Candidate/corpus implication:** none

The first Experiment 021 trigger at source SHA `aa1e08cb4050c2ca79091059cc47c08539c337eb` passed deterministic preflight and then received HTTP 503 on both API attempts permitted by the in-run retry policy.

Persisted metadata:

- workflow run: `36183338156`;
- packet SHA-256: `9aa8782f9d8189443f4a33b9831c601702c0416f1226833218d33f0ca6ed5a6b`;
- API attempts: `2`;
- final HTTP status: `503`;
- semantic status: `PROVIDER_FAILURE`;
- cold outcome: `failure`;
- score outcome: `skipped`.

No model output was produced, so this run is not a TI discovery disposition.

The transition corpus, comparison views, hidden assertions, DTS candidate, and scorer remain unchanged for the retry.
