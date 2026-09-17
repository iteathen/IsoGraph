# IsoGraph

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Current status

IsoGraph is in active research incubation. The work was incubated inside `iteathen/CUDA-JS` before being extracted into this standalone repository. Migration provenance is recorded in `MIGRATION.md`.

### Current qualified authority

The current self-contained qualified semantic authority is:

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`

Draft 0.16 adds no syntax, primitive, structural class, comparison relation kind, or D/E transformation kind. It qualifies a narrow proof/evidence-sufficiency clarification layer:

- claim-bounded dependency-closed proof obligations;
- proof-method neutrality within frozen qualification constraints;
- claim-typed witness sufficiency;
- context-scoped witness quotients;
- exact witness-family certificates with verified coverage;
- local factorization-node claims versus factorization-space completeness.

Experiment 005 qualified these rules with **8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN** after isolated cold reconstruction, post-freeze scoring, and an independent scorer-blind verifier that returned `VERIFIED` with no unresolved obligations.

The exact tested pre-promotion semantic artifact remains preserved as:

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`

The qualified authority is mechanically derived from that tested blob and changes only title/status/provenance material.

### Historical qualified authority

`CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md` remains immutable historical qualification evidence for Experiment 004. Experiment 004 completed with final audited dispositions **15 PASS / 6 PARTIAL / 0 FAIL / 0 UNKNOWN**; none of its surviving partials demonstrated a representation-expressiveness failure.

Draft 0.16 does not retroactively reinterpret Draft 0.15 evidence.

## Native text files

New native-text IsoGraph artifacts use the `.isg` extension. Historical `.axh` artifacts remain under their recorded names. The extension has no semantic authority; see `NATIVE_FORMAT.md`.

## Performance claim boundary

Draft 0.16 does not prescribe implementation algorithms, storage layouts, runtimes, or hardware strategies. Its qualified performance contribution is semantic: IsoGraph does not mandate proof/search work stronger than the dependency-closed claim being made once qualified evidence has discharged that claim.

## Naming rule

- **IsoGraph** is the current project name and the name used by current repository artifacts.
- Pre-IsoGraph wording remains recoverable from Git history and the pinned migration checkpoint rather than serving as current terminology.
- Exact legacy source identifiers may retain their original spelling only when needed to identify immutable historical evidence.

See `STATUS.md` for qualification state and `MIGRATION.md` for extraction provenance.
