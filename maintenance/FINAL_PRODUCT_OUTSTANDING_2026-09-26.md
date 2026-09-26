# Final-Product Maintenance Outstanding — 2026-09-26

**Status:** OUTSTANDING — ChatGPT Library publication mirror only  
**Repository-root final product:** CURRENT and durable  
**Current semantic authority:** direct Core 0.19 full-stack qualification complete  
**Pinned semantic-authority snapshot represented by the DOCX:** `main@ef5414b1733b3619356039722a7280cc94ac49d4`

## Repository final product — complete

The accumulated family reference is now stored durably in the repository root beside `README.md`:

`IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`

Verified repository artifact:

- materialization commit: `5356bcd845d0ce4d3f373d14af4514ae027833b7`;
- Git blob SHA: `85a35eb1455e8620f15ce6696dc4e63e9aa8277c`;
- size: 58,188 bytes;
- SHA-256: `a25daa5e0592a6eb8be80aa2e7a0d941b5ecbede215bbc2c7c720857887b4b3c`;
- page count: 19;
- exact byte identity with the fully QA-verified Library working source: confirmed.

Materialization workflow run:

`36273489329`

The run passed all required gates:

- reconstructed base64 length: 77,584 characters;
- decoded DOCX size: 58,188 bytes;
- exact SHA-256 match;
- DOCX ZIP integrity test PASS;
- root artifact commit PASS;
- temporary staging removal PASS;
- one-shot materializer workflow removal PASS.

The earlier materialization run `36258581587` failed before publication because staging bytes were not yet exact. It produced no root artifact and has no semantic/qualification effect. The successful run used individually Git-hash-verified staging pieces and removed all temporary staging afterward.

## Semantic state represented by the document

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

The DOCX pins the semantic-authority snapshot `ef5414b1733b3619356039722a7280cc94ac49d4`. Later maintenance-only commits that store, route, or document the DOCX do not change semantic authority and therefore do not create an infinite self-reference requirement to repin the document.

Historical Experiments 027–030 and Experiment 031 attempts 1–2 retain their original dispositions/classifications. No historical result was rewritten.

## QA of the exact repository bytes

The exact repository bytes are the same bytes previously fully verified as the editable working source.

QA completed before repository publication:

- all 19 rendered pages visually inspected;
- no clipping;
- no overflow;
- no broken glyphs;
- no broken tables;
- no pagination defects;
- accessibility audit: 0 high / 0 medium / 0 low findings.

Page 1 pins `main@ef5414b1733b3619356039722a7280cc94ac49d4` and states the Experiment 031 full-stack result. Page 19 repeats the same pinned semantic snapshot and current integration authority.

## Editable working source

The current editable Library working source remains:

- path: `/IsoGraph/working/IsoGraph_Family_Reference_WORKING_SOURCE.docx`;
- stable Library ID: `libfile_ed48dd1e9e308191bfb1233de5bed7f7`;
- Library version: `2`;
- backing file ID: `file_00000000120481fd9e12bae09ae70bd5`;
- size: 58,188 bytes;
- SHA-256: `a25daa5e0592a6eb8be80aa2e7a0d941b5ecbede215bbc2c7c720857887b4b3c`.

It is a convenience editing surface. The repository-root DOCX is now the durable maintained project artifact.

### Library read-cache observation

After the successful path-based overwrite, `files.list` reports Library version 2 and backing file `file_00000000120481fd9e12bae09ae70bd5`.

An unversioned read through the working-source stable Library ID, and even a read requesting `version_id=2` through that stable ID, may still return cached version-1 bytes. A direct read of the exact current backing file returns the verified version-2 document.

Future verification should resolve the current backing file/version with Library listing metadata and then verify the exact backing file bytes.

## What remains outstanding — Library publication mirror only

The Project-attached Library publication record remains stale:

- Library path: `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx`;
- stable Library ID: `libfile_574bb4d579ec8191a25778e6db9c6cce`;
- backing file ID at the latest verified read: `file_000000003d7081fd80a194ae6fa35a41`;
- size: 71,245 bytes;
- page count: 35;
- modified time: `2026-09-26T00:21:42.016763+00:00`;
- page 1 identifies `main@419f3d13ab5480d72fcd78f51502e5928bf5280f` and the older Core 0.18 / DP 0.1–0.6-era family.

This Library record MUST NOT be described as current.

In-place replacement is rejected by the available Library API with:

`project_library_mutation_unsupported`

Message:

`Project attachment and knowledge mutations are not available through files.manage_library.`

This is a publication/storage-projection restriction. It is not a semantic, qualification, rendering, document-content, or repository-final-product failure.

No additional `(3)`, `(4)`, “final”, “latest”, or “revised” Library copies are to be created.

## Required Library-mirror closure

When a product surface or API capable of mutating the Project-attached Library record is available:

1. re-fetch live semantic authority;
2. compare it with the semantic snapshot represented by the repository-root DOCX;
3. if semantic authority is unchanged, publish the exact repository-root bytes to the existing Library stable record;
4. if semantic authority changed, refresh and fully QA the repository-root DOCX first;
5. re-read the Library stable ID/backing file after publication;
6. verify the Library copy matches the repository-root SHA-256 and page count;
7. mark this incident closed only after the Library stable record itself is verified current.

The owner requirement is satisfied for durable project storage: the accumulated family reference is now version-controlled beside `README.md` and must remain current there.
