# README Mission-Alignment Review — 2026-09-29

**Status:** complete pending final merge verification  
**Repository baseline:** `main@54c6f9aa2a9ecf2110a1d7013991f74f05ca000e`  
**Current family target:** Core 0.17–0.21 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1

## Inventory

The repository-wide inventory found 34 README surfaces before removal of the temporary inventory report itself.

Twenty-five README files under `experiments/` are frozen experiment evidence. They were reviewed as provenance surfaces but deliberately not rewritten to current vocabulary, because doing so would mutate historical evidence.

The mutable/current front-door review covered:

- `README.md`;
- `evidence/external/README.md`;
- `extensions/dts/profiles/README.md`;
- `historical/branch-archive/README.md`;
- `research/glycan-cleavage/2026-09-27/README.md`;
- `research/navier-stokes-proof/README.md`;
- `research/p-vs-np/README.md`;
- `research/publications/2026-09-27/README.md`.

## Corrections

### Root README

- Reframed the project from a primarily cross-domain/isomorphism description to the current exact-representation + discovery + evidence-generation mission.
- Removed P-versus-NP as the repository-wide `active research lead`; P-vs-NP, glycan, and Navier–Stokes are now explicitly application campaigns/testbeds.
- Made Core 0.19 / 0.20 / 0.21 progression explicit: assertion/support discipline, primitive closure, Source Semantic Census conservation, no silent scope shrinkage, Schema Closure, and IA closure invalidation.
- Updated the Discovery Protocol narrative through DP 0.10 and added the DP Experimental Warrant -> EI observation-generation boundary.
- Updated constitutional barriers with `missing definition != QU`, `primitive premises != primitive assertion body`, Schema Closure/materialization/termination distinctions, `experiment != proof`, and independent soundness/coverage gates.
- Corrected the repository map and current-status section so Core 0.21 and EI 0.1 are explicit current components.

### Application READMEs

- Glycan: labeled the DP 0.1–0.7 execution historical and added a current-family continuation path requiring a Core 0.21 successor rendering before new discovery work.
- Navier–Stokes: separated historical rendering dependencies from the current family; corrected the old rule that routed omitted proof structure through QU; missing known semantics are now explicitly incomplete, not QU.
- P-vs-NP: corrected current repository Discovery authority from DP 0.1–0.8 to DP 0.1–0.10; made its next-experiment language campaign-relative rather than repository-global; preserved the explicit OPEN theorem status.

### Other front doors

- External validation: clarified that stronger internal Core 0.21 controls do not create external validation and added frozen census/scope information to the minimum packet.
- DTS profiles: preserved DTS ownership of transition anatomy while making Core 0.21 Schema Closure and DP/EI boundaries explicit.
- Publications: separated publication communication from semantic authority/routing.
- Historical branch archive: updated already-completed retirement state without changing frozen archived evidence.

## Current motif enforced

~~~text
faithful source scope
-> complete Source Semantic Census
-> primitive closure / exact Schema Closure
-> preserve residuals + genuine QU
-> recursive IA to a revision-relative fixed point
-> DP search / discrepancy / MSS / valuation / warrant
-> EI observation generation when warranted
-> evidence returns to the family
-> conclusions admitted only by their owning authority
~~~

## Permanent guard

`tools/audit-readme-mission.mjs` is invoked by Verify and checks the current front doors for the current family/mission markers and known stale formulations.

Historical experiment READMEs remain interpreted under the revision at which they were produced rather than being cosmetically modernized.