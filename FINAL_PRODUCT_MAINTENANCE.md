# IsoGraph Final Product Maintenance

**Status:** project operating requirement  
**Final product:** `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx` in the ChatGPT Library  
**Repository authority:** versioned specifications, qualification records, and current qualified-module manifest remain semantically controlling

## Governing rule

The accumulated IsoGraph family reference is a final product of the project and MUST be kept current.

A change is not operationally complete when it changes the current qualified family, promotion state, integration status, or public authority routing but leaves the accumulated reference stale.

After any change that materially affects the current family, update the maintained DOCX in the same work cycle.

Material changes include at least:

- Core qualification or promotion;
- qualified extension/module qualification or promotion;
- Discovery Protocol qualification/promotion;
- current integrated-stack qualification status;
- native-vocabulary authority changes;
- qualification-infrastructure changes that alter how current status is interpreted;
- authority-manifest changes;
- repository status/routing changes that change what a reader should treat as current;
- retirement or replacement of current semantic authority.

## Canonical maintained artifact

The canonical accumulated final product is:

`/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`

Do not create a succession of parallel files named “final”, “revised”, or “latest” as a substitute for maintaining this copy.

When updating the final product:

1. read the current live `main` state first;
2. pin the exact `main` snapshot SHA in the document;
3. update the authority map, current-status tables, affected module/Core sections, integration boundaries, source inventory, hashes, and references;
4. preserve the distinction between module qualification and integration qualification;
5. preserve immutable historical failed/partial dispositions;
6. state clearly that the accumulated document is a convenience/final reference product, not a replacement for exact versioned semantic authority;
7. render the DOCX and visually inspect every page before replacing the maintained Library file.

## Blocked canonical replacement

A Project-attached Library record may be readable while the available Library mutation API is not permitted to replace it in place.

If an in-place replacement fails because Project attachment or Project knowledge mutation is unsupported:

1. do not generate another duplicate-safe Library copy;
2. preserve the exact already-verified current DOCX that was intended for the canonical record;
3. record the exact repository snapshot, page count, byte size, DOCX SHA-256, canonical stable Library ID, preserved-copy stable Library ID, and the infrastructure error;
4. keep describing the canonical Library record as stale until that stable ID itself is re-read and verified current;
5. do not weaken the final-product requirement or treat the preserved copy as a second canonical product;
6. complete the in-place canonical replacement through a product surface or API that is authorized to mutate the Project-attached record;
7. remove a temporary duplicate only after the canonical stable ID is verified current and only when cleanup does not alter Project attachment membership.

Current unresolved incidents are recorded under `maintenance/`. The active record at the time of this rule update is [maintenance/FINAL_PRODUCT_OUTSTANDING_2026-09-26.md](maintenance/FINAL_PRODUCT_OUTSTANDING_2026-09-26.md).

### Editable working source

While the Project-attached canonical Library record cannot be mutated through the available API, maintain the editable source document at:

`/IsoGraph/working/IsoGraph_Family_Reference_WORKING_SOURCE.docx`

This working source is not a second canonical final product. It is the mutable source used for future accumulated-reference edits, rendering/QA, and eventual in-place publication to the canonical Library record. Preserve its stable Library identity when practical; path-based overwrite is permitted for this working source when stable-ID version upload is unavailable.

## Completion rule

For a promotion or authority change:

```text
repository authority updated
+
qualification/provenance recorded
+
STATUS / AGENTS / README routing updated as applicable
+
accumulated final-product DOCX updated and visually verified
=
work cycle complete
```

If the DOCX cannot be updated in the current execution environment, record the repository work as complete but the final-product maintenance step as explicitly outstanding. Do not silently describe the accumulated reference as current.

## Historical documents

Older integrated/reference DOCX files may remain as historical snapshots.

They are not the maintained final product and should not be updated in parallel unless a specific archival correction is required.
