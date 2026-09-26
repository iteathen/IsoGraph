# Final-Product Maintenance Outstanding — 2026-09-26

**Status:** OUTSTANDING — canonical Project-attached Library publication/storage projection only  
**Current semantic authority:** direct Core 0.19 full-stack qualification complete  
**Pinned repository snapshot for the verified current working-source DOCX:** `main@ef5414b1733b3619356039722a7280cc94ac49d4`

## What is complete

The current semantic family and direct integration qualification are complete at the repository level.

Experiment 031 directly qualified:

```text
Core 0.17
+ Core 0.18
+ Core 0.19
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.7
+ DTS 0.1
```

Qualification evidence:

- workflow run: `36256020851`;
- frozen execution SHA: `cd5d3b9f0281ba2bf222e4c2541f90ab4c4dac7b`;
- evidence commit: `8091d5ae4e7a184461b53caebd8352bc24c67de7`;
- full-stack cases: 32 / 32 PASS;
- mismatches: 0;
- all scoring guards: true;
- all module assessments: `SUPPORTED`;
- formal disposition: `QUALIFIES`;
- promotion PR: #44;
- promotion merge: `ef5414b1733b3619356039722a7280cc94ac49d4`;
- post-merge Verify: `36256333700` — SUCCESS.

Historical Experiments 027–030 and Experiment 031 attempts 1–2 retain their original dispositions/classifications. No historical result was rewritten.

## Current editable final-product working source

The accumulated family reference was refreshed after Experiment 031 and is current as an editable working source:

- title: `IsoGraph_Family_Reference_WORKING_SOURCE.docx`;
- Library path: `/IsoGraph/working/IsoGraph_Family_Reference_WORKING_SOURCE.docx`;
- stable Library ID: `libfile_ed48dd1e9e308191bfb1233de5bed7f7`;
- Library version: `2`;
- current backing file ID: `file_00000000120481fd9e12bae09ae70bd5`;
- size: 58,188 bytes;
- page count: 19;
- SHA-256 of the exact verified DOCX bytes: `a25daa5e0592a6eb8be80aa2e7a0d941b5ecbede215bbc2c7c720857887b4b3c`;
- pinned document snapshot: `main@ef5414b1733b3619356039722a7280cc94ac49d4`.

The refreshed document now states that the exact current composition including Core 0.19 is directly integration-qualified by Experiment 031, 32/32 PASS with formal `QUALIFIES`, and routes the current integration record to:

`qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_19_2026-09-26.md`

QA completed after the refresh:

- all 19 rendered pages visually inspected;
- no clipping;
- no overflow;
- no broken glyphs;
- no broken tables;
- no pagination defects;
- accessibility audit: 0 high / 0 medium / 0 low findings.

The exact version-2 backing file was re-read directly. Page 1 pins `main@ef5414b1733b3619356039722a7280cc94ac49d4` and states the Experiment 031 full-stack result. Page 19 repeats the same pinned snapshot and current integration authority.

### Library read-cache observation

After the successful path-based overwrite, `files.list` reports Library version 2 and backing file `file_00000000120481fd9e12bae09ae70bd5`.

An unversioned read through the stable Library ID, and even a read requesting `version_id=2` through that stable ID, may still return cached version-1 bytes. A direct read of the exact current backing file returns the verified version-2 document.

Therefore future verification should first resolve the current backing file/version with Library listing metadata, then verify the exact backing file bytes. Do not infer staleness solely from the cached stable-ID read path.

## What is not complete

The canonical accumulated final-product Library record remains stale and Project-attached:

- canonical path: `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`;
- stable Library ID: `libfile_574bb4d579ec8191a25778e6db9c6cce`;
- backing file ID at the latest verified read: `file_000000003d7081fd80a194ae6fa35a41`;
- size: 71,245 bytes;
- page count: 35;
- modified time: `2026-09-26T00:21:42.016763+00:00`;
- page 1 still identifies `main@419f3d13ab5480d72fcd78f51502e5928bf5280f` and the older Core 0.18 / DP 0.1–0.6-era family.

Therefore the canonical Project-attached final product MUST NOT be described as current.

## Failure classification

In-place upload to the canonical stable Library ID is rejected by the available Library API with:

`project_library_mutation_unsupported`

Message:

`Project attachment and knowledge mutations are not available through files.manage_library.`

This is an infrastructure/storage-projection restriction. It is not a semantic, qualification, rendering, or document-content failure.

No additional `(3)`, `(4)`, “final”, “latest”, or “revised” Library copies are to be created.

Future accumulated-reference maintenance should continue at:

`/IsoGraph/working/IsoGraph_Family_Reference_WORKING_SOURCE.docx`

The working source is mutable and current; it is not a second canonical published final product.

## Required closure

When a product surface or API capable of mutating the Project-attached canonical Library record is available:

1. re-fetch live `main`;
2. determine whether qualified authority has materially changed since the working source's pinned snapshot;
3. if unchanged, use the exact current working-source version to replace the canonical stable Library record in place;
4. if changed, refresh and fully QA the working source first;
5. re-read the canonical stable ID/backing file after publication;
6. verify the canonical document pins the correct repository snapshot and declares the current family/integration status;
7. verify page count and visual integrity;
8. keep the dedicated working-source record for future maintenance;
9. mark this incident closed only after the canonical stable ID itself is verified current.

The owner requirement remains unchanged: the accumulated family reference is a final product and must be kept updated.
