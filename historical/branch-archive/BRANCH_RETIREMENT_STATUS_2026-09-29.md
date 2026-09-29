# Branch Retirement Status — 2026-09-29

**Status:** stale development refs retired; final campaign-ref cleanup pending merge  
**Owner direction:** remove stale development branches after preserving exact provenance; retain only branches with an explicit continuing archival/compatibility role.

This record supplements the 2026-09-25 retirement record. It does not rewrite historical qualification dispositions.

## Retain — intentional archival / compatibility refs

### Core 0.19 qualification archive

`archive/core-0.19-qualification-2026-09-26@d96ce1340c49d1cfb9fb0e7d3ea33ecb40b8efa6`

Retain. This is an explicitly named pre-squash qualification archive preserving historical commit topology.

### Navier–Stokes compatibility branch

`work/navier-stokes-proof-isograph-20260921@32e37600b390059b78bf64ab5db767b09cdd3398`

Retain. Existing project governance records that an external private manuscript/transmittal references this branch. Current maintained research is on main, but the compatibility ref remains intentionally live.

These two refs are not classified as stale.

## Retire — superseded version lines / completed PR provenance

### Old MSS / valuation DP 0.8 candidate

`candidate/dp08-sufficiency-valuation-20260926@03318348a4363019d37dd2aa0d80aba2b75c8958`

Disposition: retire.

Reason:
- the version number collided with the separately qualified clue-preserving DP 0.8;
- PR #48 is closed and preserved as historical provenance;
- the general MSS / valuation work was reviewed, corrected, and preserved as DP 0.9 through PR #59;
- the exact DP 0.9 successor was subsequently qualified by Experiment 053.

### Rendering-discovery DP 0.8 working line

`research/dp08-rendering-discovery-20260926@0b5836d6a5e5f52f78d02ac92b6b475c2751058a`

Disposition: retire.

Reason:
- this line uses the superseded MSS/valuation DP 0.8 assignment;
- later current authority and publications supersede its routing assumptions;
- its exact head is retained here for provenance and its durable publication outputs already promoted separately remain on main.

### Rendering-modernization work branch / PR #49

`work/rendering-modernization-dp08-20260926@5107d74ee5379c537bae37657bd2de30dc1fcf34`

Disposition: retire after PR #49 closure.

Reason:
- PR #49 contains useful historical modernization research;
- the PR/head remains durable provenance;
- it is stacked on the superseded DP 0.8 MSS/valuation branch and must not be merged into current authority;
- PR #49 was explicitly closed during this campaign with a provenance/disposition note.

## Retire — superseded research checkpoint

`research/p-vs-np-isograph-20260926@84e6d217ad42a5f20f1a4810c53a16f75dc44f83`

Disposition: retire.

Reason:
- it is an intermediate P-vs-NP research checkpoint;
- corrected primitive-logic P-vs-NP research and later continuation-support publication material are already preserved on main;
- current research routing is main-owned and this checkpoint is not current authority.

## Retire — superseded intermediate Core 0.19 experiment refs

`experiment/029-core-0-19@61c5b14b39bd327df43d6c699d5f9c0ac6ebc7af`

`experiment/030-core-0-19-qu-discharge@6702ba10576c724fc564e9a5573f8f75ae7676cd`

Disposition: retire by explicit owner cleanup direction.

The 2026-09-25 retirement record preserved their exact heads and explained that they were superseded intermediate qualification states, to be retained until collision-safe archival or an explicit owner decision to retire them. The current unified cleanup campaign supplies that explicit decision.

Current qualified Core 0.19 evidence and the dedicated Core 0.19 archive remain preserved. Deleting these two working refs does not rewrite the frozen historical outcomes.

## Already retired automatically

`research/dp09-mss-valuation-20260928`

PR #59 was squash-merged after review; repository automatic branch cleanup removed the source ref. PR #59 and merge commit `b859fe5e280378ac15f06f0c6b62e1279b701e0b` preserve the successor research provenance.

## Cleanup invariant

Branch retirement deletes only Git refs. It does not:
- rewrite commits already preserved by merged or closed PR provenance;
- rewrite historical qualification records;
- convert candidate research into authority;
- delete the two explicitly retained archive/compatibility refs above.

After the unified family PR is merged, the temporary campaign branch should also be removed if repository automatic cleanup does not remove it.


## Executed retirement result

The one-shot cleanup workflow successfully removed the following live refs:

- `candidate/dp08-sufficiency-valuation-20260926`
- `experiment/029-core-0-19`
- `experiment/030-core-0-19-qu-discharge`
- `research/dp08-rendering-discovery-20260926`
- `research/p-vs-np-isograph-20260926`
- `work/rendering-modernization-dp08-20260926`

`research/dp09-mss-valuation-20260928` had already been removed by repository automatic head-branch cleanup after PR #59 merged.

After retirement, the only non-main refs intentionally present are:

- active campaign: `qualification/family-cleanup-ei-20260929`;
- historical archive: `archive/core-0.19-qualification-2026-09-26`;
- externally referenced compatibility ref: `work/navier-stokes-proof-isograph-20260921`.

The one-shot cleanup workflow/request were removed immediately after successful execution and are not part of the retained project surface.
