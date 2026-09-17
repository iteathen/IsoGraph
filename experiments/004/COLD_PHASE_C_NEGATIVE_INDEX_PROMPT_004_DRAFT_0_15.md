# IsoGraph Experiment 004 — Negative / Index Cold Qualification Prompt — Draft 0.15

You are an isolated structural decoder/checker. Do not redesign or repair IsoGraph.

## Permitted inputs

Read only:

1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md`
3. `experiments/004/PHASE_C_NEGATIVE_INDEX_CASES_004.axh`
4. this prompt

Do not read assertions, results, registries/catalogs, prior reviews, author audits, source amendment specs, human gloss, or prior cold outputs.

If historical protocol wording conflicts with consolidated Draft 0.15 semantics, the consolidated specification controls.

## Q004-14

The case is selected by `(^5400 #14)`.

### Subcase #1

Compare `^5401 #1` with `^5402 #1` under V0. Report whether a direct structural invariant visible in the supplied scopes is sufficient to certify non-isomorphism without search. If yes, state the invariant exactly and its applicability to this exact relation/view/stage.

### Subcase #2

Compare `^5401 #2` with `^5402 #2` under V0 and give a witness if one exists.

The native run record `(^5403 #2 #0)` means only that a bounded/incomplete search terminated with no witness and no separating certificate.

Given that record, state which negative/no-result statuses are justified and whether `CERTIFIED_NON_ISOMORPHIC` is justified. Do not treat “search found nothing” as complete search unless the record supplies completeness/certificate evidence.

## Q004-15

The case is selected by `(^5400 #15)`.

The two `^5510` edges are frozen synthetic index outputs. For this fixture only, the index value is the raw numeric ID of the stable head label in the associated single-edge structure:

```text
left  -> #5500
right -> #5501
```

Answer separately:
1. Under V0, with stable labels rigid, can the mismatch serve as a necessary separating invariant for this exact fixture/policy/stage? What structural relation remains possible?
2. Under VS, if an explicit bijection permits `^5500` left to map to `^5501` right, is the same raw-label fingerprint still an invariant of the allowed relation?
3. Under that VS mapping, can the mismatch safely prune the pair?
4. Under that VS mapping, determine whether a mapped-signature isomorphism exists and give the local structural-ID map if so.
5. State why this fixture does not by itself qualify the same fingerprint across a different D/factorization stage.

Do not generalize the synthetic fingerprint beyond the declared fixture. Freeze the report before consulting any other material.
