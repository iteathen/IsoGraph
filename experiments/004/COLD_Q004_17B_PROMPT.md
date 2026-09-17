# IsoGraph Experiment 004 — Q004-17B Cold Current Native-Record Prompt

Act as an isolated native-structure decoder. This is a successor/addendum to Q004-17; it does not rewrite the original fixture or hidden assertions.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_17B_NATIVE_RECORDS_004.isg`
3. this prompt

Do not read `Q004_17B_ASSERTIONS_004.json`, Q004-17 assertions/results, author audits, source amendment specs, external reviews/dispositions, class registries/catalogs, human gloss, or prior cold outputs.

Do not guess English meanings for stable labels. Work from raw topology.

## Task

1. Find every record-type declaration `(^4740 TYPE FIELD_SCOPE)` and reproduce the exact direct field IDs of each type.
2. Find every instance declaration `(^4741 INSTANCE TYPE)` and associate each instance with its declared type.
3. For every instance, enumerate all `(^4742 INSTANCE FIELD VALUE)` relations exactly.
4. Reproduce every scope-valued field and every body supplied through `^4743`.
5. Trace all references among instances `9100..9105` and body objects.
6. Identify every place where two distinct fields on the same record carry distinct scope-valued structures rather than one overloaded residual/list field.
7. Identify which instance contains both an opaque algorithm-like identity and an exact revision literal plus an input/body-stage reference, using raw IDs only.
8. Identify which instance contains a first-class `!` condition object together with separate boundary/context and consumer/reference fields, using raw IDs only.
9. Identify the terminal record that links other record instances and report its complete topology.
10. State whether any external human/JSON sidecar is required to reconstruct this complete raw record graph.

Do not infer domain names. Report topology first, ambiguity second. Freeze the result before consulting any other material.
