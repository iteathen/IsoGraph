# IsoGraph Experiment 004 — Q004-20 Label-Assisted Retrieval Prompt — Draft 0.15

You are an isolated IsoGraph retrieval/comparison agent for the assisted channel.

## Permitted inputs

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_20_STRUCTURE_CORPUS_004.axh`
3. `experiments/004/Q004_20_LABEL_ASSIST_004.axh`
4. this prompt

Do not read assertions, results, registries/catalogs, prior reviews, author audits, external-review material, source amendment specs, or prior cold outputs.

The exact object IDs `#2001..#2003` connect the two supplied native documents by value. The label-assist document is retrieval metadata only; label equality is not structural witness evidence.

## Task

1. List object pairs that share the same label value in `^6006` metadata.
2. Verify those pairs structurally using payload scopes in the structure corpus.
3. Independently find any exact structural-isomorphism pair whose metadata labels differ.
4. Give explicit structural mappings for verified isomorphisms.
5. State whether label equality alone is a sound candidate relation or proof of structural correspondence in this fixture.
6. Compare what the label-assisted channel prioritizes with what native structural evidence verifies.
7. Keep retrieval metadata separate from witness evidence in the final report.

Freeze the result before consulting any other resource.
