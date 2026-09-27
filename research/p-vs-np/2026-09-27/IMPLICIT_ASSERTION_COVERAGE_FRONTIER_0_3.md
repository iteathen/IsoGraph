# P versus NP implicit-assertion coverage frontier 0.3

**Status:** current operational coverage record; not a universal completeness claim
**Successor to:** IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_2.md

## Machine-audited state

Current indexed closure through A24 plus A21 correction:

~~~text
admitted assertions:            341
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
~~~

Authoritative index:

IMPLICIT_ASSERTION_INDEX_0_8.json

Superseded assertion IDs not present in the admitted set:

~~~text
IA-013
IA-304
IA-305.
~~~

## Corrective changes since frontier 0.2

### A21

Predecessor IA-304/305 incorrectly treated all-legal-transition simulation as a complete characterization of continuation dominance/residual equality.

Corrected closure:

~~~text
IA-337 exact dominance = live-child recursive dominance
IA-338 Q-RESIDUAL SAME = mutual live dominance
IA-339 all-legal simulation is sound but incomplete.
~~~

IA-306 remains sound and is re-supported directly.

### A24

Native NEI/QU support restrictions now explicitly require:

~~~text
incomplete query -> no exact result
opaque evidence/model handle -> no semantic authority
QU OPEN -> recoverable R(Q)
scoped quotient equality -> scoped relation only
NEI result -> downstream of independent identity authority.
~~~

## Current NEI route

Semantic scope authority:

P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md

Native query templates:

P_VS_NP_NEI_OVERLAY_0_5.isg

Overlay 0.5 is intentionally fail-closed:

~~~text
query templates:              12
templates marked INCOMPLETE:  12
SAME/DISTINCT/UNKNOWN roles:   0
OPEN QU states:                0
INCOMPLETE_SCOPE QU states:    5
~~~

Predecessor overlay 0.4 is historical and must not be used as current native identity-result authority.

## Seeded candidate closure

All seeded candidate families except CA-001 have corresponding later admitted results.

CA-001 global numeral-normal-form uniqueness remains intentionally unadmitted:

- not needed on the P-vs-NP truth path;
- current represented predicate/induction closure does not justify promoting the full theorem without additional support.

This is a tracked non-admission, not a missed assertion.

## Operational fixed point

For the targeted audit surface:

~~~text
NEI/QU status discipline
global/scoped identity discipline
implicit support refs/cycles
local-simulation exactness
seeded-candidate disposition
~~~

a no-new-defect pass has been reached.

This does not claim all mathematical consequences are enumerated.

## Strongest surviving research seam

The prior factorization/accessibility seam survives unchanged:

~~~text
primitive structural law
+
polynomially constructible exact factorization
+
polynomial retained representation
+
polynomial next-operation closure
+
locally certified target semantics
+
polynomial source-ranked progress.
~~~

All identity use must route through the corrected scope contract and fail-closed native template rules.

## Remaining boundaries

- Core 0.20 unqualified.
- Selected primitive machine convention <-> exact official P-vs-NP convention remains QU_UNEXPANDED.
- Concrete native NEI result records remain unqualified until evidence/model-family structure is instantiated.
- Universal implicit semantic completeness is not claimed.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
