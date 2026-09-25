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
