# Experiment 049 Attempt 2 Review

**Workflow run:** 36363872197  
**Source SHA:** c2cc58612525fb9616017f04f6ac1feb97d8dbc9  
**DP 0.8 SHA-256:** `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`  
**Formal candidate disposition:** none

## Observation

The provider completed, the public field/type/enum contract was satisfied, all structural guards and self-audits passed, and hidden scoring reported 12 / 24 exact-case matches.

The mismatches are concentrated in bookkeeping-label granularity rather than the protocol's required behavior. Examples include:

- `LOCAL_DEFECT_CONFIRMED` versus `IMPLEMENTATION_DEFECT_CONFIRMED`;
- `NO_REPAIR_ESTABLISHED` versus `SCOPE_MISMATCH`;
- `OPEN_STRUCTURAL_LEAD` versus `STRUCTURE_ESTABLISHED`.

DP 0.8 explicitly says its repair/discovery outcomes are **illustrative bookkeeping labels, not new semantic statuses**. Several public cases do not establish a unique granularity among those labels.

## Disposition

    QUALIFICATION ORACLE OVER-CONSTRAINED
    DP 0.8 semantic qualification: NOT ADJUDICATED

The run is not retroactively rescored.

## Corrective qualification design

A fresh holdout must score the normative behavior directly:

- whether a violated contract is established;
- whether repair is justified;
- whether expected/reference authority is improperly privileged;
- whether a structural lead survives or is falsified;
- whether QU/NEI/scope boundaries are preserved;
- whether dependency invalidation propagates;
- whether derived views remain outside Core absent a semantic need.

The fresh cases must remain blind as to bug/clue/both/neither and must not require one non-normative bookkeeping label when several are compatible.
