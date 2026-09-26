# Final-Product Maintenance Outstanding — 2026-09-26

**Status:** OUTSTANDING — Library publication/storage projection only  
**Semantic/repository authority:** unchanged  
**Pinned repository snapshot for the verified current DOCX:** `main@f813b278dbefbd07e1ec2424926c2393368532a4`

## What is complete

Core 0.19 qualification and promotion are complete at the repository level. The accumulated family reference was rebuilt against the pinned snapshot above and was already visually inspected page-by-page before this incident.

The preserved current build is:

- title: `IsoGraph_Family_Reference_Joshua_Oshiro_2026(2).docx`;
- Library path: `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026(2).docx`;
- stable Library ID: `libfile_ed48dd1e9e308191bfb1233de5bed7f7`;
- backing file ID: `file_00000000f8c881fdad2a0af44717415b`;
- size: 58,122 bytes;
- page count: 19;
- SHA-256 of the exact preserved DOCX bytes: `0b6353e5dbca7034e36af7d415b1ed09924f1ef3aa770b3f896218a37b5f1a49`.

This execution re-read page 1 and page 19 from that stable Library record. Page 1 identifies:

`main@f813b278dbefbd07e1ec2424926c2393368532a4`

and declares the current family as Core 0.17 + qualified Core 0.18 + qualified Core 0.19, QU 0.1, NEI 0.4, DP 0.1–0.7, and DTS 0.1. Page 19 repeats the pinned snapshot and the revision-scoped authority discipline.

The originally generated source snapshot `file_00000000ada081fda959c567004d5950` is no longer visible. This does not invalidate the preserved current build above.

## What is not complete

The canonical accumulated final-product Library record remains stale:

- canonical path: `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`;
- stable Library ID: `libfile_574bb4d579ec8191a25778e6db9c6cce`;
- backing file ID at the latest verified read: `file_000000003d7081fd80a194ae6fa35a41`;
- size: 71,245 bytes;
- page count: 35;
- modified time: `2026-09-26T00:21:42.016763+00:00`;
- page 1 still identifies `main@419f3d13ab5480d72fcd78f51502e5928bf5280f` and the older Core 0.18 / DP 0.1–0.6-era family.

Therefore the canonical final product MUST NOT be described as current.

## Failure classification

An in-place upload to the canonical stable Library ID was retried using the exact preserved current DOCX as the source.

The available Library API rejected the mutation with:

`project_library_mutation_unsupported`

Message:

`Project attachment and knowledge mutations are not available through files.manage_library.`

This is an infrastructure/storage-projection restriction. It is not a semantic, qualification, rendering, or document-content failure.

No additional `(3)`, `(4)`, “final”, “latest”, or “revised” Library copies are to be created.

## Required closure

When a product surface or API capable of mutating the Project-attached canonical Library record is available:

1. re-fetch live `main`;
2. confirm whether the accumulated reference still needs the exact 19-page build recorded above or has become stale because authority changed again;
3. if the recorded build is still current, replace the canonical stable Library record in place using the exact preserved 58,122-byte DOCX;
4. re-read the canonical stable ID, not merely the filename;
5. verify page 1 pins the correct live snapshot and declares the current family;
6. verify the canonical document has 19 pages for this build and that the final page preserves the pinned-snapshot/integration-boundary statement;
7. remove the temporary `(2)` copy only if permissions permit and doing so does not alter Project attachment membership;
8. update or retire this outstanding record only after the canonical stable ID itself has been verified current.

The owner requirement remains unchanged: the accumulated family reference is a final product and must be kept updated.
