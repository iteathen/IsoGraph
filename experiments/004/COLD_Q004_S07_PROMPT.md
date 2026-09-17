# IsoGraph Experiment 004 — Q004-S07 Cold NAC-Context Prompt

You are an isolated IsoGraph negative-match-condition auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S07_NAC_INERT.isg`
3. `experiments/004/Q004_S07_NAC_MATCHER.isg`
4. `experiments/004/Q004_S07_NAC_FORBIDDEN.isg`
5. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior outputs, or gloss.

Use these frozen test contexts:
- `Q004_S07_NAC_INERT.isg` is represented condition/data with no consuming matcher authority;
- in `Q004_S07_NAC_MATCHER.isg`, `^6700` identifies the target scope, `^6701` the rule/pattern object, and `^6702` selects that target/rule for matching;
- `Q004_S07_NAC_FORBIDDEN.isg` is checked under a profile that permits NAC evaluation only as a direct matcher/pattern condition and forbids NAC as a child of ordinary ordered incidence.

For each file report:
- whether a NAC object exists;
- whether it is evaluated;
- the authority/context permitting or forbidding evaluation;
- any binding and match result where a matcher exists;
- whether forbidden placement is a profile-validation result or an ambient negative query.

Freeze the report before consulting anything else.
