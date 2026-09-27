# Glycan cleavage NEI pass 6 — dynamic/static formulation identity 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0-A6 + NEI passes 1-5
**Authority:** qualified NEI 0.4 + QU 0.1

A6 proves bidirectional equivalence among three formulations of the same raw treatment-word acceptance relation:

1. original saturated cleavage execution;
2. raw-node static phase assignment;
3. SIG-type static phase assignment.

This pass records only scoped value identity among those relations.

## Q-G-WORD-ACCEPTANCE

Fix one concrete instance.

For a raw treatment word T define the Boolean value:

~~~text
ACCEPT(T)
=
TRUE iff T reaches TG.
~~~

Any representation computing exactly this Boolean for every raw T represents the same Q-G-WORD-ACCEPTANCE function/value.

## G-N054 — dynamic execution and raw-node phase assignment are word-acceptance SAME

G-IA148 gives, for every raw word T:

~~~text
dynamic execution accepts T
IFF
there exists a valid raw-node phase assignment for T.
~~~

Therefore the two formulations are Q-G-WORD-ACCEPTANCE SAME.

They remain different proof/representation artifacts.

## G-N055 — raw-node and SIG-type assignment are word-acceptance SAME

G-IA156 gives:

~~~text
raw-node assignment exists for T
IFF
SIG-type assignment exists for T.
~~~

Therefore those acceptance functions are scoped SAME.

Raw occurrence identities remain recoverable only from the source/occurrence map.

## G-N056 — all three formulations are solution-language SAME

By transitivity:

~~~text
original dynamic problem
=
raw-node assignment relation
=
SIG-type assignment relation
~~~

under Q-G-INSTANCE-SOLUTION-LANGUAGE.

Hence they also have:

- the same solvability Boolean;
- the same minimum treatment length;
- the same complete set of raw minimum treatment words.

## G-N057 — solvability Boolean equals the exact susceptibility-coverage Boolean

A6 proves:

~~~text
instance solvable
IFF
forall non-target r:
    exists e in EL: M(e,r).
~~~

Thus the dynamic solvability result and this finite exact Boolean predicate are scoped SAME under the solvability-value query.

This does not identify the underlying structures.

## G-N058 — type-level optimum-family identity is exact

Because type assignment preserves membership of every raw treatment word individually, the set of minimum raw words computed from the type-level formulation is Q-G-INSTANCE-OPTIMUM-FAMILY SAME to the original.

No witness-family expansion is needed for treatment words.

## G-N059 — static formulation identity does not imply algorithm identity

Different procedures can solve or verify the static phase-assignment constraints.

Equality of accepted words does not make those algorithms, data structures, or proofs globally SAME.

## G-N060 — no new raw object identity or semantic UNKNOWN

No result identifies raw sites, operators, traces, words, or source artifacts globally.

The frozen 0.1 acceptance relation is exact, so no semantic UNKNOWN or QU refinement is introduced.

## Pass-6 NEI disposition

~~~text
new cross-formulation scoped SAME laws: 5
new solvability-value identity law:       1
raw-object global identity results:       0
semantic UNKNOWN results:                 0
QU refinements:                           0
~~~

The next implicit pass checks whether the existential phase assignment contains further exact removable structure.
