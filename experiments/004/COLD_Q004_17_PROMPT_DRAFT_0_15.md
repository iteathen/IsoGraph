# IsoGraph Experiment 004 — Q004-17 Base Native-Record Prompt — Draft 0.15

Act as an isolated native-structure decoder. Do not redesign or repair IsoGraph.

This run preserves the original Q004-17 base fixture as one current-semantics reconstruction probe. It does **not** by itself qualify every native-record burden introduced by Draft 0.15; Q004-17B is the separate successor pressure for those additional fields.

## Permitted inputs

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_17_NATIVE_RECORDS_004.axh`
3. this prompt

Do not read `Q004_17_ASSERTIONS_004.json`, Q004-17B material, result files, author audits, external reviews, human gloss, registries/catalogs, source amendment specs, or prior cold outputs.

## Task

Using raw native IDs only:
1. find the three record-type identities that are operands of `^4705` schema-field declarations;
2. for each type, list exact direct member IDs in its declared field scope;
3. find every instance declared by `(^4700 INSTANCE TYPE)`;
4. for each instance, enumerate every `(^4701 INSTANCE FIELD VALUE)` relation exactly;
5. for any field whose value is a scope, reproduce the direct ordered-incidence members of that scope;
6. trace the `^4720` reference chain among instances;
7. state whether mapping-like and residual-like substructures are physically present in the native payload or require an external human/JSON sidecar to recover topology;
8. state whether human names for `^n` field roles are necessary to reconstruct the exact record graph;
9. state precisely what this base fixture does **not** establish about the full current E1NR burden.

Do not guess English meanings for labels. Report raw topology first, then any genuine ambiguity. Freeze the result before consulting any other resource.
