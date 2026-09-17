# IsoGraph

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Current status

IsoGraph is in active research incubation. The work was incubated inside `iteathen/CUDA-JS` before being extracted into this standalone repository. Migration provenance is recorded in `MIGRATION.md`.

### Current qualified authority

The current self-contained qualified semantic authority is:

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

Draft 0.17 makes one narrow descriptive correction to the core bare-ID mechanism: what Draft 0.16 called `structural identity` is now explicitly **Semantic Identity (SI)**, a representation-level referential identity. The operational behavior of bare IDs is unchanged: sharing, occurrence semantics, namespace hygiene, reference preservation, alpha-renaming, matching, allocation, reconstruction, and comparison retain their Draft 0.16 behavior.

SI equality or inequality is not, merely by existing, independent evidence for any stronger theory-, profile-, or extension-owned identity relation. Draft 0.17 defines no Natural Entropic Identity semantics and adds no identity-collapse rule, temporal identity law, entropy measure, syntax, primitive, comparison relation, or extension-loading mechanism.

Draft 0.16's qualified obligation-sufficiency clarification layer is retained unchanged, including:

- claim-bounded dependency-closed proof obligations;
- proof-method neutrality within frozen qualification constraints;
- claim-typed witness sufficiency;
- context-scoped witness quotients;
- exact witness-family certificates with verified coverage;
- local factorization-node claims versus factorization-space completeness.

Experiment 005 qualified those Draft 0.16 rules with **8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN** after isolated cold reconstruction, post-freeze scoring, and an independent scorer-blind verifier that returned `VERIFIED` with no unresolved obligations.

### Historical qualified authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md` remains immutable historical authority at its recorded revision and preserves the exact semantics/evidence qualified by Experiment 005.
- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md` remains immutable historical qualification evidence for Experiment 004. Experiment 004 completed with final audited dispositions **15 PASS / 6 PARTIAL / 0 FAIL / 0 UNKNOWN**; none of its surviving partials demonstrated a representation-expressiveness failure.

Draft 0.17 does not retroactively reinterpret historical artifacts.

## Native text files

New native-text IsoGraph artifacts use the `.isg` extension. Historical `.axh` artifacts remain under their recorded names. The extension has no semantic authority; see `NATIVE_FORMAT.md`.

## Performance claim boundary

The qualified Draft 0.16 performance semantics remain unchanged in Draft 0.17: IsoGraph does not prescribe implementation algorithms, storage layouts, runtimes, or hardware strategies, and it does not mandate proof/search work stronger than the dependency-closed claim being made once qualified evidence has discharged that claim.

## Naming rule

- **IsoGraph** is the current project name and the name used by current repository artifacts.
- **Semantic Identity (SI)** is the core representation-level identity/addressing concept for bare IDs.
- Pre-IsoGraph wording remains recoverable from Git history and pinned historical authorities rather than serving as current terminology.
- Exact legacy source identifiers may retain their original spelling only when needed to identify immutable historical evidence.

See `STATUS.md` for current authority state and `MIGRATION.md` for extraction provenance.
