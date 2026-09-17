# IsoGraph

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Current status

IsoGraph is in active research incubation. The work was incubated inside `iteathen/CUDA-JS` before being extracted into this standalone repository.

The imported research lineage is content-addressed. Its exact source checkpoint is recorded in `MIGRATION.md`, and the pre-extraction state remains recoverable from Git history and that immutable source revision.

Current semantic authority for new work is self-contained in:

- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

That document consolidates the surviving semantics of:

1. `CORE_SPEC_DRAFT_0_13_CONSOLIDATED_CANDIDATE.md`
2. `CORE_SPEC_DRAFT_0_14_CANDIDATE.md`
3. `CORE_SPEC_DRAFT_0_15_CANDIDATE.md`

The three source documents remain historical evidence for why current rules exist; a current decoder no longer needs to replay them to determine current semantics. The consolidation adds no domain operator, structural class, comparison relation kind, or irreducible primitive.

The rename changes project identity only. It does not change primitive status, structural semantics, qualification results, revision identity, or the meaning of previously recorded evidence.

## Operating description

> IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Naming rule

- **IsoGraph** is the current project name and the name used by current repository artifacts.
- Pre-IsoGraph wording remains recoverable from Git history and the pinned migration checkpoint rather than serving as current terminology.
- Exact legacy source identifiers may retain their original spelling only when needed to identify an immutable historical source.

See `STATUS.md` for the current qualification state and `MIGRATION.md` for extraction provenance.
