# IsoGraph Final Product Maintenance

**Status:** project operating requirement  
**Durable final product:** `IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx` in the repository root beside `README.md`  
**Library publication mirror:** `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx` when the product surface permits replacement  
**Repository semantic authority:** versioned specifications, qualification records, and the current qualified-module manifest remain controlling

## Governing rule

The accumulated IsoGraph family reference is a final product of the project and MUST be kept current.

A change is not operationally complete when it changes the current qualified family, promotion state, integration status, or public authority routing but leaves the accumulated reference stale.

After any change that materially affects the maintained family surface, update the maintained DOCX in the same branch/work cycle. This includes unqualified successor/candidate family material when repository-facing documentation presents it as part of the current project family, even though the candidate is not yet semantic authority.

Material changes include at least:

- new or revised Core / extension / Discovery Protocol / DTS successor or candidate specifications that are part of the maintained family surface;
- new or revised qualification plans that materially change the described family/successor state;
- maintained discovery-reference material that the family document is expected to route or summarize;

- Core qualification or promotion;
- qualified extension/module qualification or promotion;
- Discovery Protocol qualification/promotion;
- current integrated-stack qualification status;
- native-vocabulary authority changes;
- qualification-infrastructure changes that alter how current status is interpreted;
- authority-manifest changes;
- repository status/routing changes that change what a reader should treat as current;
- retirement or replacement of current semantic authority.

## Branch synchronization rule

The repository-root accumulated family reference is a **branch-maintained product**, not a main-only afterthought.

For any branch whose diff against its main merge-base changes a maintained family surface, that branch MUST also change:

`IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`

in the same branch before the synchronization check may pass.

This rule applies whether the family change is:

```text
qualified authority
unqualified successor/candidate specification
family-facing qualification/routing state
maintained discovery-family reference
```

The DOCX must preserve qualification status exactly. Adding an unqualified candidate to the accumulated reference does not promote it.

The synchronization gate is intentionally branch-wide rather than last-commit-only. A branch cannot clear an earlier stale family-spec change by adding an unrelated later commit.

Mechanical enforcement:

- `.github/workflows/family-reference-sync.yml` runs on pushes to every branch and on pull requests;
- `tools/check-family-reference-sync.mjs` compares the branch against its main/base merge point and requires a changed root DOCX when family-affecting paths changed;
- normal `Verify` runs the same guard;
- both CI surfaces also verify the DOCX is a valid ZIP package.

The guard proves that the accumulated product changed with the family surface. It does not prove document semantic completeness or visual quality. Human/agent maintenance still MUST perform the content refresh, render, page-by-page visual QA, and accessibility checks required below.

### Non-triggering work

Not every repository change requires republishing the accumulated family reference. Pure implementation, experiment evidence, test harness, CI plumbing, historical frozen evidence, or unrelated research work does not trigger maintenance unless it changes what the maintained family reference should say.

The CI path matcher is deliberately narrower than the whole repository and should be revised when new maintained family surfaces are introduced.

---

## Canonical maintained artifact

The durable maintained accumulated final product is the repository-root file:

`IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`

It MUST remain beside `README.md` on the default branch.

The ChatGPT Library path:

`/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`

is a publication mirror/projection of the repository artifact, not the only durable storage location. A blocked Library replacement does not prevent repository final-product maintenance from completing, but the Library mirror MUST continue to be described as stale until its own stable record is verified current.

Do not create a succession of parallel files named “final”, “revised”, or “latest” as a substitute for maintaining the repository-root copy.

When updating the final product:

1. read the current live `main` state first;
2. pin the exact latest semantic-authority snapshot represented by the document; repository-only storage/maintenance commits that merely add, route, or record the DOCX do not by themselves stale the document or require a self-referential repin;
3. update the authority map, current-status tables, affected module/Core sections, integration boundaries, source inventory, hashes, and references;
4. preserve the distinction between module qualification and integration qualification;
5. preserve immutable historical failed/partial dispositions;
6. state clearly that the accumulated document is a convenience/final reference product, not a replacement for exact versioned semantic authority;
7. render the DOCX and visually inspect every page before replacing the repository-root artifact; publish the same verified bytes to the Library mirror when that surface is writable.

## Blocked Library publication mirror

A Project-attached Library record may be readable while the available Library mutation API is not permitted to replace it in place.

If an in-place replacement fails because Project attachment or Project knowledge mutation is unsupported:

1. do not generate another duplicate-safe Library copy;
2. preserve the exact already-verified current DOCX that was intended for the canonical record;
3. record the exact repository snapshot, page count, byte size, DOCX SHA-256, canonical stable Library ID, preserved-copy stable Library ID, and the infrastructure error;
4. keep describing the canonical Library record as stale until that stable ID itself is re-read and verified current;
5. do not weaken the final-product requirement; the repository-root DOCX remains the durable maintained product;
6. complete the Library mirror replacement through a product surface or API that is authorized to mutate the Project-attached record;
7. remove any temporary Library duplicate only after the Library stable ID is verified current and only when cleanup does not alter Project attachment membership.

Current unresolved incidents are recorded under `maintenance/`. The active record at the time of this rule update is [maintenance/FINAL_PRODUCT_OUTSTANDING_2026-09-26.md](maintenance/FINAL_PRODUCT_OUTSTANDING_2026-09-26.md).

### Editable working source

The current editable Library working source may be maintained at:

`/IsoGraph/working/IsoGraph_Family_Reference_WORKING_SOURCE.docx`

It is a convenience editing surface, not semantic authority and not a substitute for the repository-root final product. Future edits may begin from either the verified repository-root DOCX or this exact working-source version, but the completed, QA-verified bytes MUST be committed back to the repository-root artifact in the same work cycle.

Preserve the working-source stable Library identity when practical; path-based overwrite is permitted when stable-ID version upload is unavailable.

## Completion rule

For a promotion or authority change:

```text
repository authority updated
+
qualification/provenance recorded
+
STATUS / AGENTS / README routing updated as applicable
+
repository-root accumulated final-product DOCX updated and visually verified
=
repository work cycle complete
```

If the repository-root DOCX cannot be updated in the current execution environment, record the repository work as complete but the final-product maintenance step as explicitly outstanding. A stale Library mirror alone does not make the repository final product stale; record the Library publication projection separately.

## Historical documents

Older integrated/reference DOCX files may remain as historical snapshots.

They are not the maintained final product and should not be updated in parallel unless a specific archival correction is required.
