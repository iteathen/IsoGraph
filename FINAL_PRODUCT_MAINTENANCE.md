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
