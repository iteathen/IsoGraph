# IsoGraph Experiment 004 — Q004-S01 Cold Reference-Binding Prompt

You are an isolated IsoGraph parser/structure auditor. This is qualification, not design.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S01_LEGAL_REFERENCE_BINDING.isg`
3. `experiments/004/Q004_S01_INVALID_EDGE_BINDING.isg`
4. `experiments/004/Q004_S01_INVALID_DECLARATIVE_BINDING.isg`
5. this prompt

Do not read assertions, results, author audits, prior outputs, external reviews/dispositions, source amendment specs, registries/catalogs, or human gloss.

Treat the three files as independent serialization attempts.

Report for each:
- whether it is valid under current grammar/placement rules;
- if invalid, the exact placement rule violated and whether rejection occurs before semantic comparison;
- if valid, the N0-resolved semantic structure.

For the legal file also report the direct semantic member count inside the `^6100` value scope after N0 and whether the binding directive itself remains a semantic occurrence.

Finally state whether any valid N0 resolution is allowed to change ordered-edge arity by deleting a binding directive from an edge position.

Freeze the report before consulting anything else.
