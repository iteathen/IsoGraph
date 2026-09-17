# IsoGraph Experiment 004 — Q004-16 Cold Class Non-Vacuity Prompt — Draft 0.15

You are an isolated IsoGraph structural-class auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/003/STRUCTURAL_CLASS_SCHEMA_CONTRACT_006.md`
3. `experiments/004/Q004_16_CLASS_NONVACUITY_004.axh`
4. this prompt

Do not read assertions, results, class catalogs, registries, prior reviews, author audits, source amendment specs, or external-review material.

If historical schema-contract wording conflicts with consolidated Draft 0.15 semantics, the consolidated specification controls.

For this synthetic fixture the native record roles are:

```text
(^5600 SCHEMA)
(^5601 SCHEMA SLOT)
(^5602 SCHEMA SLOT ABSTRACT_REQUIRED_SUBSTRUCTURE_PATTERN)
(^5603 INSTANCE SCHEMA SLOT ASSIGNED_SUBSTRUCTURE)
```

The `^5602` abstraction is a required structural pattern over the assigned substructure; its variables are lexically owned by nested abstractions.

## Task

1. Reconstruct schema `1601`: list parameter slots and every required pattern/constraint actually present.
2. Reconstruct schema `1602`: list parameter slots and reproduce its abstraction pattern exactly.
3. Apply the required pattern of schema `1602` to assignments `1701`, `1702`, and `1703` using current variable-binding rules. Report bindings for matches and structural failure reasons for non-matches.
4. Evaluate the non-vacuity/selectivity burden separately for schemas `1601` and `1602`.
5. Do not reject `1602` merely because assigned substructures are much larger than the fixed constraint pattern. State whether parameter size alone decides vacuity.
6. State whether this fixture is sufficient to promote `1602` as a qualified reusable structural class, distinguishing non-vacuity evidence from full class qualification.
7. If you make any claim that one schema/factorization is simpler or minimal, state the declared metric/partial order. Otherwise do not make that claim.

Freeze the result before consulting anything else.
