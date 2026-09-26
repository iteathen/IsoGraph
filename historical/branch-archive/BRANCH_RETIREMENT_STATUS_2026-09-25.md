# Branch Retirement Status — 2026-09-25

This record classifies non-`main` branches after the DTS 0.1 merge, Navier–Stokes research preservation, and Connect4 historical qualification archival.

It is a provenance/cleanup record. It does not itself delete Git refs.

## Current canonical main

At the start of this retirement pass:

`main@31395a64aa0ede37d67c926babd17f92c4c391ff`

This includes:
- qualified DTS 0.1 and the DTS-inclusive integrated stack;
- reviewed Navier–Stokes research preservation;
- historical Connect4 qualification archive for the old Experiment 017/018 branches.

## RETAIN — externally referenced compatibility branch

Do not delete or rename:

`work/navier-stokes-proof-isograph-20260921`

Reason:
- a private Navier–Stokes manuscript/transmittal references this branch;
- canonical maintained research now lives at `main:research/navier-stokes-proof/**`;
- compatibility rules are recorded in `research/navier-stokes-proof/BRANCH_REFERENCE_COMPATIBILITY.md`.

## SAFE TO RETIRE — exact merged PR heads

These branch refs still point at exactly the heads that were already merged by the listed PRs:

| Branch | Exact head | Merged PR |
| --- | --- | ---: |
| `qualification/qrc-0-1-infrastructure-20260918` | `7f408eeb32df5449720d81b9f8d66a08c1c1c59e` | #13 |
| `qualification/module-campaign-009-20260918` | `06759035b3e9eb960320a8aaa9293b27a3a9cdac` | #14 |
| `qualification/module-campaign-010-20260918` | `60bfae83fb1210ed2bad64098a4ae75c8365287f` | #15 |
| `qualification/module-campaign-012-20260918` | `06d062f77efd8f4c7ab6d7046f760f70766cd510` | #16 |
| `qualification/module-campaign-013-20260918` | `fe2ecfcafddc1d462f7b26eef4c51090185bc638` | #17 |
| `qualification/module-campaign-014-20260918` | `e3490b2103adf88d16cf2731c89b61968bf54abd` | #18 |
| `qualification/module-campaign-011-20260918` | `4a12b103e473c60f2edadb2ff952fd4f579917a1` | #19 |
| `qualification/module-campaign-015-20260918` | `29e1f535f90a1ffdbfdd04de4a6c37b56850d8b9` | #20 |
| `qualification/module-promotion-final2-20260918` | `f766c7fcbc3a3c87fc48d510380f1bc055c56d87` | #21 |

These refs are redundant branch pointers; their merged PR provenance is durable.

## SAFE TO RETIRE — fully contained in main

At the audit point these branches had `ahead_by = 0` relative to `main`, so they carry no commit not already reachable from `main`:

- `qualification/module-promotion-20260918`
- `qualification/module-promotion-final-20260918`
- `qualification/nei-0-4-016-20260919`
- `work/connect4-isograph-qualification-1-1-20260918`
- `work/connect4-isograph-qualification-20260918`
- `work/document-design-ideals-20260918`
- `work/observation-first-discrepancy-nei-dp-20260918`
- `work/spec-sanity-observation-core-0-18-20260918`

## SAFE TO RETIRE — collision-safe historical archive completed

The following two branches contained valid qualification evidence but could not be directly merged because their original `experiments/017` and `experiments/018` paths now collide with newer current IsoGraph experiments:

- `qualification/connect4-q-017-20260919@1954a88bbec52e589dddfadaccdf2c467017b109`
- `qualification/connect4-game-theory-018-20260919@37c2b05efe54181d1e35abf78bec41ab25186338`

PR #36 preserved their complete unique branch deltas under inert archive roots:

- `historical/branch-archive/qualification-connect4-q-017-20260919/**`
- `historical/branch-archive/qualification-connect4-game-theory-018-20260919/**`

Mechanical preservation audit before merge:
- q qualification branch: 24 / 24 unique files exact blob matches;
- game-theory qualification branch: 25 / 25 unique files exact blob matches;
- total: 49 / 49 exact blob matches;
- mismatches: 0.

Frozen dispositions remain:
- Connect4 q congruence: `QUALIFIES`, 18 / 18 PASS, run `35479007618`;
- Connect4 game-theory 1.2: `QUALIFIES`, 16 / 16 PASS, run `35479497878`.

## Cleanup boundary

Retirement means deleting only the redundant branch refs after durable preservation is confirmed.

Do not:
- rewrite current qualification history;
- delete archived evidence;
- reinterpret historical PASS/FAIL/PARTIAL/QUALIFIES dispositions;
- delete the Navier–Stokes compatibility branch while the manuscript still references it.


## Follow-up classification — 2026-09-26

Reviewed against current `main@43490735f0073acccb4f900e247cd0db19681e1f` after Core 0.19 promotion and final-product maintenance work.

### RETAIN — Core 0.19 qualification archive

Do not delete or merge into current authority:

`archive/core-0.19-qualification-2026-09-26@d96ce1340c49d1cfb9fb0e7d3ea33ecb40b8efa6`

Reason:
- it preserves the pre-squash Core 0.19 qualification lineage;
- current `main` contains the promoted/squashed authority, not this historical commit topology;
- replaying the archive onto `main` would duplicate/reintroduce historical qualification states.

### CURATED PRESERVATION — Ising / MWC DP 0.7 exploratory research

Source branch:

`experiment/dp07-ising-mwc-v1@6f1368c6d6e110b6e97032ef0d629b6025b38b2c`

The branch contains a valid completed exploratory research payload under:

`research/project-discovery/2026-09-25-ising-mwc-dp07/**`

but also carries obsolete predecessor snapshots of Core 0.19 and DP 0.7. Therefore the branch MUST NOT be merged directly into current authority.

The research directory is preserved separately by exact source blob identity on the current-main integration branch. Once that preservation PR is merged and verified, this source branch is safe to retire.

The research remains explicitly non-qualification evidence and has no authority effect.

### SAFE TO RETIRE — contained by the Core 0.19 qualification archive

The following refs have no commits ahead of `archive/core-0.19-qualification-2026-09-26` and are redundant after archive preservation:

- `experiment/dp07-three-positive-controls-v1`
- `experiment/028-dp07-derived-views`
- `experiment/029-core-0.19`
- `research/core-0.19-implicit-assertions`

Deleting these refs, when branch-deletion capability is available, does not authorize deletion or rewriting of the archive branch or the historical evidence it preserves.

### RETAIN HISTORICAL SIDE REFS — do not merge into current authority

These branches diverge from the preserved accepted lineage and contain superseded intermediate qualification states:

- `experiment/029-core-0-19@61c5b14b39bd327df43d6c699d5f9c0ac6ebc7af` — terminates at the earlier Experiment 029 23/24-era attempt;
- `experiment/030-core-0-19-qu-discharge@6702ba10576c724fc564e9a5573f8f75ae7676cd` — early fresh-case / QU-discharge planning lineage superseded by the corrected Experiment 030 mutation-regression path.

Do not merge either branch over current `experiments/029`, `experiments/030`, Core 0.19, qualification manifests, or workflows. Retain these refs until their unique historical branch states are collision-safely archived or an explicit owner decision retires them.
