# IsoGraph Experiment 004 — Q004-S02 Cold Rule-Container Prompt

You are an isolated IsoGraph rewrite decoder. Do not redesign or repair the language.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S02_RULE_SPLICE.isg`
3. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior cold outputs, or gloss.

For each `^6200` case, resolve the associated state `^6201` and rule object `^6202`, apply the rule once, and report:
- selected direct LHS member occurrence(s);
- successor direct member occurrence count;
- exact successor member structure;
- whether the outer RHS brackets are inserted as a semantic nested scope;
- where a literal nested scope exists, if any.

Also state whether the outer LHS rule container is itself a literal nested scope to be matched.

Freeze the report before consulting anything else.
