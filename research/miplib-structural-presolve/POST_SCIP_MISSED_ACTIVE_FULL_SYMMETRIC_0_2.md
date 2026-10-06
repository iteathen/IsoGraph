# Post-SCIP missed-active full-symmetric screen 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Targets

The four independent second-block active-symmetry positives classified as `NO_VISIBLE_SCIP_RECOVERY`:

- `mcsched`
- `neos-1171737`
- `neos-3381206-awhea`
- `ns1208400`

## Exact active-coordinate test

For each symmetry-off SCIP residual:

1. preserve SCIP's ACTIVE / EXPORT_ONLY variable partition in the exact coefficient subdivision graph;
2. run BLISS and replay every generator used;
3. compute variable orbits using only ACTIVE variable actions;
4. choose the largest nontrivial ACTIVE orbit, tie-breaking lexicographically;
5. for every exact generator, inspect its induced action on ACTIVE model variables;
6. retain generators whose ACTIVE action is exactly one transposition inside the selected orbit and fixes every other ACTIVE variable;
7. build the undirected transposition graph on the selected orbit.

If that transposition graph is connected, the induced action contains the full symmetric group on the ACTIVE orbit because transpositions along the edges of any connected graph generate the full symmetric group.

The generator may also permute EXPORT_ONLY state; that does not weaken the active-coordinate group certificate because its complete graph action remains an exact automorphism.

## Output

Report orbit size, number of active-coordinate transposition generators, transposition-graph components, and whether the selected active orbit is certified full symmetric.

No timing benchmark is included in this screen.
