# Cross-repository IsoGraph rendering audit — 2026-09-26

**Purpose:** identify maintained application renderings outside the IsoGraph repository so modernization does not stop at repository boundaries.

## Connect4

Canonical research owner:

`iteathen/Connect4@research/semantic-quotient`

Current qualified application authorities:

- game theory / logic: `CONNECT4_LOGIC_AUTHORITY_1_2`;
- hot-loop performance research: `ISOMAX_HOT_LOOP_GRAPH_AUTHORITY_0_3`.

Current unqualified application rendering:

- Lazy SMP full decode 0.2.

Current RBA research surface:

- `RBA-QU-0015`;
- topology placement 0.8.

### Modernization branch

`research/isograph-dp08-modernization-20260926@6d386c180d98f4be6dc96b8c72db769a4d75620f`

Successor-only additions:

1. `research/isograph/CONNECT4_GAME_THEORY_CORE019_SUPPORT_0_1.*`
   - derived W/D/L support over qualified 1.2;
   - exact residual DRAW only at completed W/D/L classification scope;
   - explicit non-consequence: partial CPC non-detection != DRAW;
   - no gameplay-authority effect.

2. `research/isograph/optimization/ISOMAX_HOT_LOOP_GRAPH_0_4_CANDIDATE.*`
   - DP 0.8 sufficiency/valuation successor;
   - no-draw, win-only, and CPC-owned-win evidence;
   - predictive no-win bounds separated from terminal DRAW semantics;
   - valuation conclusions remain host/workload/metric scoped;
   - current qualified 0.3 remains unchanged.

3. `research/isograph/successor/CONNECT4_LAZY_SMP_SEARCH_METHOD_0_3.*`
   - objective-scoped successor over full decode 0.2;
   - WAKE is a nonessential-support candidate for the current host observation path only;
   - metrics-before-winner remains objective-dependent;
   - shared-cache CPC_EXACT provenance remains workload-scoped measured structure.

4. RBA modernization disposition:
   - no native rewrite;
   - minimality/canonical presentation and cost/scaling are already explicit QU;
   - no valuation profile -> no preferred realization.

Mechanical connector-side checks on the three new native files:

- balanced `()`, `[]`, `{}`;
- every used stable label declared;
- zero undeclared labels;
- all companion JSON parses successfully.

Current qualified Connect4 authority bytes were not modified.

## JSMinSys

Default branch checked:

`iteathen/JSMinSys@main`

Result:

- no native `.isg` files on current main;
- implementation/source revisions are inputs to Connect4-owned research renderings and exact-source packets;
- no parallel JSMinSys research authority should be created merely for modernization.

## Governance consequence

Connect4 research remains canonically owned by `research/semantic-quotient`.

The IsoGraph repository should index the cross-repository successors but should not duplicate Connect4 semantic authority locally.

## Remaining cross-repository work

- review whether any other repositories contain maintained, non-historical IsoGraph application renderings;
- if found, classify each as current authority, active unqualified successor, or historical/frozen evidence before editing;
- preserve repository-specific ownership.
