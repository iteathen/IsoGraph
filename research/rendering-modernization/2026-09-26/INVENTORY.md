# IsoGraph Rendering Modernization Inventory — 2026-09-26

**Status:** active modernization inventory  
**Base:** DP 0.8 successor branch lineage at `03318348a4363019d37dd2aa0d80aba2b75c8958`  
**Policy:** frozen evidence is never edited in place.

The repository currently contains 60 native `.isg` files. They do not all represent maintained formulas/applications.

## A. Active mutable formula/application research renderings

### Navier–Stokes forced-blowup family — modernize in place by successor revision

Current research renderings:

- `research/navier-stokes-proof/NAVIER_STOKES_FORCED_BLOWUP_0_1.isg`
- `research/navier-stokes-proof/REDUCED_FORMULA_0_2.isg`
- `research/navier-stokes-proof/STANDARD_PHYSICAL_EQUIVALENCE_0_1.isg`
- `research/navier-stokes-proof/FRESH_SYNTHESIS_S0_3.isg`
- `research/navier-stokes-proof/S0_4_ATOMIC_MINIMALITY.isg`
- `research/navier-stokes-proof/S0_5_GENERATOR_CLOSURE.isg`
- `research/navier-stokes-proof/DP_DISCOVERY_0_1.isg`
- `research/navier-stokes-proof/DP_DISCOVERY_0_2_FRESH.isg`

Disposition: **upgrade target**. Preserve all existing revisions; create successor renderings/views where semantics change.

### Ising / MWC application pair

- `research/project-discovery/2026-09-25-ising-mwc-dp07/ISING_RENDER_0_1.isg`
- `research/project-discovery/2026-09-25-ising-mwc-dp07/MWC_RENDER_0_1.isg`
- `research/project-discovery/2026-09-25-ising-mwc-dp07/COMMON_CORE_0_1.isg`

Disposition: **upgrade target; first wave**. Existing 0.1 renderings are exploratory and do not claim exact source-rendering qualification.

## B. Qualified exact-rendering predecessor artifacts — preserve, create successors only

The six `translation-v2/*/NATIVE.isg` artifacts in the DP 0.7 three-positive-control campaign are ESR-qualified at their exact bytes and promoted only for that campaign.

Subjects:

- Ising;
- lattice gas;
- XOR;
- GF(2);
- Newtonian oscillator;
- Hamiltonian oscillator.

Their `blind-v2` copies are byte-identical promotion payloads.

Disposition: **immutable predecessor evidence**. Any modernization must create new successor artifacts with new qualification burden.

## C. Older positive-control skeletal renderings — historical research only

The six original case renderings and their `blind/` copies are pre-ESR skeletal predecessors.

Disposition: preserve for provenance; do not modernize in place.

## D. Qualification/test fixtures — not application modernization targets

- Experiment 004 native fixtures;
- Experiment 005 obligation-sufficiency fixture;
- Experiment 023 barrier fixture.

Disposition: frozen/qualification fixtures; do not edit.

## E. Native vocabularies — not formula/application renderings

- QU vocabulary;
- NEI vocabularies;
- DTS vocabulary.

Disposition: separately versioned semantic companions; not part of this campaign.

## F. Historical archive

- archived Connect4 game-theory candidate under `historical/branch-archive/`.

Disposition: immutable archive. A current Connect4 rendering, if modernized, must be recovered from the current Connect4 research authority rather than editing this archive.

## G. Non-native early rendering artifact

- `experiments/001/ISOGRAPH_001.md`

Disposition: historical methodology/provenance; not rewritten.

## First-wave order

1. Ising 0.2 exact-source-oriented successor.
2. MWC 0.2 exact-source-oriented successor.
3. Recompute the Ising/MWC common-core successor from those new renderings.
4. Navier–Stokes family modernization.
5. Successor views for the six ESR-qualified positive-control renderings.
6. Cross-repository audit for current Connect4 / JSMinSys / other application IsoGraph renderings.

The inventory is expected to grow if the cross-repository audit finds additional maintained renderings.
