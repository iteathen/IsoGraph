# IsoGraph Experiment 004 — Q004-20 Structural-Only Retrieval Prompt — Draft 0.15

You are an isolated IsoGraph structural retrieval/comparison agent.

## Permitted inputs

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_20_STRUCTURE_CORPUS_004.axh`
3. this prompt

Do not access `Q004_20_LABEL_ASSIST_004.axh`, assertions, results, registries/catalogs, glosses, prior reviews, author audits, external-review material, source amendment specs, or prior cold outputs.

## Task

The corpus contains three object records selected by exact IDs `#2001`, `#2002`, and `#2003`.

Using only discovery-visible native structure of their payload scopes:
1. generate every pair that is an exact structural-isomorphism candidate;
2. verify each candidate under ordinary closed structural comparison;
3. give an explicit mapping for every verified pair;
4. identify non-isomorphic pairs and the structural distinction that separates them;
5. report the candidate/verified pair that a structural-only discovery path should surface;
6. distinguish candidate retrieval from structural verification in the report.

Do not invent or infer source/domain labels. None are available in this run. Freeze the result before consulting any other resource.
