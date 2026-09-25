# Experiment 017 — Core 0.18 Final Qualification Review

**Candidate:** `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md`  
**Qualified base:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`  
**Formal semantic disposition:** **QUALIFIES**  
**Primary semantic run:** GitHub Actions `36175838410`  
**Frozen primary qualification SHA:** `8439b49cf8836eb2748c1c1cb401de28f0181211`

## Result

Experiment 017 exercised all Core 0.18 qualification obligations through 12 fresh proposition-specific cases.

```text
case coverage:         12 / 12 PASS
mismatches:            0
scoring guards:        all true
semantic judgments:    1 successful frozen report
successful API calls:  1
provider-failure requests after accidental retrigger: 2
primary HTTP status:   200
semantic disposition:  QUALIFIES
```

The frozen scorer established:

- different semantic quantities are not treated as conflicting values before alignment;
- aligned quantities may still expose a real discrepancy;
- explicit metadata and derived semantic properties are not collapsed;
- a genuine decoder error may be repaired while a structural discovery lead survives;
- hidden distinctions split a coarse comparison model rather than forcing one value to win;
- scoped equivalence remains scoped and does not become global identity;
- unresolved potentially load-bearing structure cannot be projected away;
- exact dependency invalidation propagates to dependent claims without being classified as a framework defect;
- exact mechanical corruption retains the bounded fast-repair path;
- observation-first investigation may stop once the intended disposition is sufficiently supported;
- a seductive anomaly may terminate as ordinary implementation error;
- equal reported values do not establish semantic-quantity alignment.

## Primary run provenance

- Core 0.17 SHA-256: `348d59017047f7d64daba2066b9b3e068c629186ee3e767551cfcb9815fe36a8`
- Core 0.18 candidate SHA-256: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`
- cases SHA-256: `cf4d95722045d670afd2e999819ec105b28f45c779cec660f487dbf462fa0d60`
- prompt SHA-256: `9815857ccabc8ab7ab0d5686021ee0400c06d2bb520e6be310797eead5d6349e`
- packet SHA-256: `09ddcf7a093b26e28598eeed77b7d03cb6a1266c87082bd785a043518cd0d5d0`
- report SHA-256: `45c81a291a84daa1eecde0f0612742c3f33b480eb831ca7f80126d1fa69b1548`

## Evidence-persistence incident

The primary semantic call and score succeeded before the evidence-persist step. That step created a local evidence commit but its push was rejected because a trigger-only commit had advanced the branch.

The raw primary model report therefore did not enter repository history. GitHub Actions job logs preserve the exact packet/report hashes, complete scorer output, all guard values, and all per-case pass results. Re-running the semantic decoder solely to recreate the lost raw report would violate the resource discipline, so the primary result was not rerun.

The exact scorer result and metadata are preserved below as recovered records derived from that immutable job log.

## Accidental secondary trigger

The trigger-only commit caused workflow run `36175890127`.

That run:
- passed deterministic preflight;
- made two API attempts under the permitted in-run 5xx retry policy;
- received HTTP 503;
- produced no semantic report and no score;
- persisted its provider-failure metadata to the branch.

It is an infrastructure/provider failure and carries no semantic disposition. It does not supersede or weaken the successful frozen primary run.

## Promotion recommendation

Promote Core 0.18 as the current cumulative Core clarification layer over qualified Core 0.17, preserving both exact revisions. Core 0.18 is a narrow clarification and does not require rewriting historical Core 0.17 qualification evidence.

Historical Core qualifications remain interpreted at their original revisions.
