# SCIP symmetry attribution follow-up 0.1

**Date:** 2026-10-06

SCIP 10.0.2 retained the `glass4` target variables/rows under both symmetry-on and symmetry-off presolve, while the default symmetry configuration produced one additional transformed constraint.

This follow-up asks whether that extra constraint is attributable to SCIP's symmetry machinery and whether it directly involves the independently certified IsoGraph pair `z1&3.4` / `z1&3.8`.

Procedure:

1. presolve the same official `glass4` model with SCIP default symmetry and with `misc/usesymmetry=0`;
2. compare transformed constraint names and constraint-handler types;
3. for constraints present only in the symmetry-on model, request their participating transformed variables where the handler exposes that interface;
4. separately inspect all transformed constraints whose handler name indicates symmetry;
5. record whether the target pair participates together.

No absence claim is made if the relevant SCIP constraint handler does not expose variables through the generic PySCIPOpt interface.
