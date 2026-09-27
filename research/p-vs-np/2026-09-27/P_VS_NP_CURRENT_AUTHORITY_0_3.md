# P versus NP campaign — current authority 0.3

Date: 2026-09-27
Branch: research/p-vs-np-primitive-logic-20260926

## Primitive authority

research/p-vs-np/2026-09-26/P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

Blob:

c38de5674ffa568c1297e8383b48b2ed77de7756

## Explicit assertion base

ASSERTION_BASE_A0_0_2.md

## NEI / QU routing

Qualified semantic authorities:

- NEI 0.4;
- QU 0.1.

Current semantic scope contract:

P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md

Current fail-closed native template:

P_VS_NP_NEI_OVERLAY_0_5.isg

## Implicit assertion authority

Current index:

IMPLICIT_ASSERTION_INDEX_0_10.json

State:

~~~text
357 admitted assertions
0 missing support references
0 support cycles
max normalized depth 11
~~~

Correction/successor rounds:

- IMPLICIT_ASSERTIONS_A21_CORRECTION_0_1.md
- IMPLICIT_ASSERTIONS_A24_NEI_NATIVE_SUPPORT_0_1.md
- IMPLICIT_ASSERTIONS_A25_DEAD_SUPPORT_FILTERING_0_1.md
- IMPLICIT_ASSERTIONS_A26_ROBUST_DEADNESS_0_1.md

## Discovery authority and current run

Qualified Discovery Protocol authority:

DP 0.7

Current P-vs-NP reapplication:

P_VS_NP_DP07_REAPPLY_0_1.md

Prior DP08-named artifacts remain experimental campaign history and are not protocol authority.

## Current strongest discovery seam

~~~text
cheap sound negative evidence
    removes provably dead support

cheap sound inclusion/equality evidence
    removes dominated/duplicate support

exact stable factorization or aggregate sharing
    compresses remaining mutually live incomparable support

with polynomial retained size
and polynomial next-operation cost.
~~~

## Required falsifier

The CNF-IA-011 all-live family must remain a negative control:

~~~text
dead-support prunes on x edges = 0.
~~~

Its compact alternate factorization prevents fixed-CNF blowup from being treated as a representation-independent lower bound.

## Current coverage

IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_4.md

## Remaining boundaries

- Core 0.20 unqualified.
- Official model-equivalence bridge still QU_UNEXPANDED.
- Concrete native NEI results still require complete instantiated authority.
- No P-vs-NP resolution.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
