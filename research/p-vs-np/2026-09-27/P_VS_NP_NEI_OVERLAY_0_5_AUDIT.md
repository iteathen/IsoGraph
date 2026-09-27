# P versus NP NEI overlay 0.5 — corrective audit

**Status:** corrective research successor
**Predecessor:** P_VS_NP_NEI_OVERLAY_0_4.isg
**Qualified authorities:** NEI 0.4, QU 0.1

## Defect found in overlay 0.4

The high-level semantic descriptions of Q-RESIDUAL, Q-EXISTS, Q-MIN, Q-COUNT and constructor identity were largely correct.

The native serialization was not strong enough to support the certainty it appeared to claim.

Several native records contained opaque local handles for:

- query scope/context;
- fixed evidence state;
- admissible identity-model family;
- exact identity theorem/certificate;
- QU possibility universe/constraints/closure/realization family.

Those handles were not themselves expanded or pinned to immutable supporting semantics in the overlay.

Despite that, predecessor 0.4 attached:

- exact SAME/DISTINCT result roles to concrete controls;
- exact theorem/evidence roles;
- OPEN QU status to generic continuation queries.

That violates the qualified fail-closed discipline:

~~~text
opaque evidence/model handle
    != exact evidence/model authority

missing QU realization-family authority
    != OPEN QU

query template
    != derived identity result.
~~~

## Correction

Overlay 0.5 removes all native SAME/DISTINCT/UNKNOWN result roles.

It removes unsupported exact-evidence/theorem/model-family claims.

Every query record 160000..160011 is explicitly marked:

~~~text
INCOMPLETE / UNQUALIFIED.
~~~

Every QU-backed query state is explicitly:

~~~text
INCOMPLETE_SCOPE
~~~

rather than OPEN.

The concrete subject/configuration data remain available as test inputs, but no final NEI result is serialized until complete native/pinned evidence is present.

## Mechanical state

~~~text
query records:                12
SAME/DISTINCT/UNKNOWN roles:   0
OPEN QU states:                0
QU INCOMPLETE_SCOPE states:    5
delimiter residuals:           0
~~~

## Semantic disposition

The semantic conclusions documented in P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md remain usable when directly supported by:

- corrected primitive bundle 0.4;
- qualified NEI 0.4;
- qualified QU 0.1 where applicable;
- explicit query scope.

The native overlay itself no longer pretends to be that proof.

## Predecessor disposition

~~~text
P_VS_NP_NEI_OVERLAY_0_4.isg:
    historical research artifact
    NOT current native NEI application authority

P_VS_NP_NEI_OVERLAY_0_5.isg:
    current fail-closed native query-template overlay
~~~
