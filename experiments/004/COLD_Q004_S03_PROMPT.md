# IsoGraph Experiment 004 — Q004-S03 Cold Variable-Ownership Prompt

You are an isolated IsoGraph variable-ownership auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S03_VARIABLE_OWNERSHIP.isg`
3. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior outputs, or gloss.

For this synthetic fixture only, `^6300` selects the subcase, `^6301` supplies a body asserted to be closed, `^6302` is an explicit qualified open-interface declaration whose listed variables are owned/exposed by the referenced object, and `^6303` supplies that open object's body. These test-record roles do not add language primitives.

For cases `#1..#3` report:
- all variable occurrences;
- their owner, if one exists;
- whether the represented object is well-formed under the declared closed/open contract;
- whether implication itself supplies an owner;
- whether any unowned variable receives implicit universal, existential, or wildcard semantics.

Freeze the report before consulting anything else.
