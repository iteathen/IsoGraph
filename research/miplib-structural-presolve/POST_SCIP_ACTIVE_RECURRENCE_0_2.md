# Post-SCIP active-support recurrence 0.2 — second holdout block

**Date:** 2026-10-06  
**Status:** frozen before results.

## Sample

Reuse exactly the 20 models admitted by the frozen recurrence-0.3 selection rule and successful execution run `37542901613`. Admission was determined only by benchmark order, prior-sample exclusion, and raw size <= 5,000 rows / <= 5,000 columns:

1. `mc11`
2. `mcsched`
3. `mik-250-20-75-4`
4. `neos-1171737`
5. `neos-2657525-crna`
6. `neos-3024952-loue`
7. `neos-3046615-murg`
8. `neos-3381206-awhea`
9. `neos-3627168-kasai`
10. `neos-3754480-nidda`
11. `neos-4338804-snowy`
12. `neos-4387871-tavua`
13. `neos-4954672-berkel`
14. `neos-860300`
15. `neos17`
16. `neos5`
17. `ns1208400`
18. `ns1830653`
19. `peg-solitaire-a3`
20. `pg`

No structural outcome from recurrence 0.3 is used for admission.

## Corrected exact pipeline

For each model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`;
2. before export, record exact active transformed variable/constraint names;
3. export the transformed MPS;
4. encode the complete coefficient system as a vertex-colored subdivision graph, adding ACTIVE / EXPORT_ONLY support to variable and row colors;
5. run BLISS;
6. replay every returned generator against all vertex colors and the full edge set;
7. count only generators moving at least one ACTIVE transformed variable;
8. compute ACTIVE variable orbits only.

## Outcomes

- `EXACT_ACTIVE_POST_SCIP_SYMMETRY`: at least one exact generator moves active SCIP variables.
- `EXPORT_ONLY_SYMMETRY`: variable-moving exact generators exist but move no active variable.
- `NO_VARIABLE_MOVING_GENERATOR`: no variable-moving generator exists in the encoded transformed model.

This is the independent recurrence test for the corrected commercial signal. No solve benchmark is part of this screen.
