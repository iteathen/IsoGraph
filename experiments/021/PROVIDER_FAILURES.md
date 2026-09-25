# Experiment 021 provider failures

**Disposition:** infrastructure/provider failures  
**Semantic reports produced:** 0  
**Scores produced:** 0  
**Candidate/corpus implication:** none

## Workflow run 36183338156

Source SHA: `aa1e08cb4050c2ca79091059cc47c08539c337eb`

- deterministic preflight: PASS;
- API attempts: 2;
- final HTTP status: 503;
- packet SHA-256: `9aa8782f9d8189443f4a33b9831c601702c0416f1226833218d33f0ca6ed5a6b`;
- semantic status: `PROVIDER_FAILURE`;
- no model report;
- no score.

## Workflow run 36183579627

Source SHA: `8374f4d6be306b4a4465e1af9f2ac2cf7a066364`

- deterministic preflight: PASS;
- API attempts: 2;
- final HTTP status: 503;
- packet SHA-256: `731236680add6ee631c3ee0827800b97d5a1d02264f67a3e7ffa9260188c05f1`;
- semantic status: `PROVIDER_FAILURE`;
- no model report;
- no score.

Both failures used the same transition corpus, comparison views, hidden assertions, DTS candidate, and deterministic scorer.

Because no semantic output exists, neither run carries a TI discovery disposition.

The next retry may reduce the *transport packet* to obligation-sufficient summaries of already-qualified Core/QU/DP authority. This does not change the DTS candidate, transition corpus, comparison views, hidden assertions, or expected propositions.
