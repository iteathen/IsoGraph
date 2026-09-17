# IsoGraph Status

**Project state:** research incubation / pre-qualification  
**Repository:** `iteathen/IsoGraph`  
**Default branch:** `main`

## Current authority

Current semantic authority is cumulative:

1. `CORE_SPEC_DRAFT_0_13_CONSOLIDATED_CANDIDATE.md`
2. `CORE_SPEC_DRAFT_0_14_CANDIDATE.md`
3. `CORE_SPEC_DRAFT_0_15_CANDIDATE.md`

Draft 0.15 is the latest corrective amendment. It adds no domain operator, structural class, or irreducible primitive.

## Current claims

IsoGraph currently has a specified experimental representation/discovery discipline and migrated historical experiment corpus. It does **not** yet establish that the current representation is independently qualified, that its structural-only discovery path achieves useful corpus-scale recall, or that any candidate structural class is promoted.

The active program is falsification/qualification rather than vocabulary expansion.

## Immediate work

1. Reissue cold prompts and fixtures where Draft 0.15 changed authority.
2. Add the supplemental qualification cases identified by the external-review disposition.
3. Execute isolated cold decoders/verifiers with strict permitted-input boundaries.
4. Freeze outputs before unblinding scorer assertions.
5. Classify discrepancies before any specification repair.
6. Independently verify positive mappings/certificates.

## Historical naming

The project was incubated as **IsoGraph** inside `iteathen/CUDA-JS`. Frozen historical artifacts retain that name as provenance. New work uses **IsoGraph**.

See `MIGRATION.md` for the exact source checkpoint.
