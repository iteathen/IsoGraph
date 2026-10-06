# MIPLIB recurrence screen 0.3 — second holdout block

**Date:** 2026-10-06  
**Status:** frozen before results.

## Selection

Starting immediately after `mas76` in the preserved MIPLIB 2017 benchmark-v2 order, scan forward and select the first 20 instances satisfying:

- raw variables <= 5,000;
- raw constraints <= 5,000;
- not already present in the initial 24-instance campaign.

Selection uses only instance name/order and raw dimensions. No structural-analysis or solve result may affect admission.

## Structural test

For each admitted model:

1. run HiGHS 1.15.1 presolve;
2. perform six-round coefficient-aware bipartite refinement;
3. for every candidate variable pair within the frozen cap, test the exact **general two-variable swap**:
   - same objective coefficient/domain/integrality;
   - swapping the two variables transforms the complete multiset of affected rows, including bounds and all coefficients, exactly onto itself.

Report:

- `EXACT_GENERAL_SWAP`;
- `LEAD_ONLY`;
- `NO_SIGNAL`.

No timing benchmark is part of this screen. Any exact positive becomes a separate stronger-incumbent holdout.
