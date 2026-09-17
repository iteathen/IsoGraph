# IsoGraph Experiment 004 — Phase C Cold Comparison Prompt — Draft 0.15

You are an isolated IsoGraph structural comparison agent. This is qualification, not design. Do not repair or extend IsoGraph.

## Permitted inputs

Read only:

1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md`
3. `experiments/004/PHASE_C_COMPARISON_CASES_004.axh`
4. this prompt

Do not access scorer assertions, results, prior reviews, author audits, source amendment specs, class registries/catalogs, human glosses, expected mappings, or prior cold outputs.

`STRUCTURAL_COMPARISON_PROTOCOL_006.md` supplies historical case-specific comparison machinery. If any historical wording conflicts with the consolidated Draft 0.15 authority, the consolidated specification controls.

For all three cases use V0; all stable labels in the supplied bundle are rigid and no mapped-signature remapping is permitted.

## Q004-11

For case `(^5000 #11)`:
1. test isomorphism between complete `^5001` and `^5002` scopes;
2. test strong/induced embedding from `^5001` into `^5002`;
3. test weak embedding from `^5001` into `^5002`;
4. give each valid mapping;
5. list every target relation among mapped objects that blocks a stronger relation or remains residual.

Do not change the relation signature after inspecting the pair.

## Q004-12

For case `(^5000 #12)`:
1. find the strongest V0 common core you can justify without mapping different stable labels to one another;
2. give a node mapping for that core;
3. classify every remaining load-bearing edge/node into the complete pairwise accounting roles required by the current specification;
4. state whether any relation may simply be omitted to enlarge the common core;
5. state the exact reconstruction obligation for each comparison-stage object from the reported pairwise accounting.

Do not use VS/VC mapping and do not conflate pairwise residuals with any source-local D residual.

## Q004-13

For case `(^5000 #13)`:
1. determine whether the two scopes are V0-isomorphic;
2. enumerate materially distinct bijective isomorphism witnesses produced by leaf symmetry;
3. state whether deterministic canonical labeling permits keeping only one witness without explicit automorphism/equivalence justification.

## Final report

For each case report:

```text
relation kind(s)
mapping(s)
residual/cut/excluded/projected accounting
any ambiguity
```

Freeze the report before consulting any other material.
