# MIPLIB semantic transposition follow-up 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Targets

Use the six `LEAD_ONLY` instances from the preserved second recurrence block:

- `mcsched`
- `neos-1171737`
- `neos-3381206-awhea`
- `neos-3627168-kasai`
- `neos-4387871-tavua`
- `neos-4954672-berkel`

Include `glass4` solely as the known positive control.

## Exact semantic test

Reuse semantic-transposition 0.1:

- HiGHS 1.15.1 presolved residual;
- coarse candidate grouping by objective/domain/integrality and one-hop coefficient/bound signature;
- exact decimal-rationalized LP relaxation in Z3;
- for a candidate variable swap, prove every swapped affected row side is implied by the complete relaxation;
- involution + equal objective/domain then proves an objective-preserving semantic transposition.

A semantic-only positive must **not** already be an exact formulation row-multiset swap.

## Frozen budget

- first 10 candidate pairs per target in lexicographic order;
- 2.5 second Z3 timeout per implication query;
- any Z3 UNKNOWN is inconclusive, never a certificate.

The purpose is a bounded falsifier for deeper semantic equivalence, not an exhaustive equivalence search.
