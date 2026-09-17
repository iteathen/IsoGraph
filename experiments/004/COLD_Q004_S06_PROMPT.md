# IsoGraph Experiment 004 — Q004-S06 Cold Infix-Parsing Prompt

You are an isolated IsoGraph parsing auditor. Do not repair syntax or invent precedence.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S06_PARSE_01.isg`
3. `experiments/004/Q004_S06_PARSE_02.isg`
4. `experiments/004/Q004_S06_PARSE_03.isg`
5. `experiments/004/Q004_S06_PARSE_04.isg`
6. `experiments/004/Q004_S06_PARSE_05.isg`
7. `experiments/004/Q004_S06_PARSE_06.isg`
8. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior outputs, or gloss.

Treat each fixture file as an independent parse attempt. For each report whether it has one deterministic parse under the current qualification-freeze grammar. If invalid/ambiguous, state exactly why; do not choose a precedence or associativity.

Also state whether ordinary `()` may be introduced as transparent parser grouping to repair any failed case.

Freeze the report before consulting anything else.
