# Glycan cleavage NEI semantic scope contract 0.4

**Status:** successor scope contract after DP-fed A12
**Date:** 2026-09-27
**Supersedes for current campaign routing:** GLYCAN_NEI_SCOPE_CONTRACT_0_3.md while retaining all earlier scopes
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1
**Inputs:** verified primitive graph + A1-A12 + A8 correction

Version 0.4 adds exact operator/action and dominance-aware language scopes exposed by qualified DP followed by Core-0.19 semantic admission.

## Q-G-EFFECTIVE-SUSCEPTIBILITY

Fix one frozen instance.

For raw operator e define the exact non-target support value:

~~~text
S*_e
=
{ r in RL minus TG |
  M(e,r) }.
~~~

The identity object is this exact set over the represented non-target carrier.

Scoped SAME means exact set equality.

One non-target site whose M incidence differs is a separating witness and proves scoped DISTINCT.

Susceptibility differences only on TG do not separate this value.

## Relation to Q-G-SUSCEPTIBILITY

Earlier Q-G-SUSCEPTIBILITY used the full represented susceptibility vector over RL.

Therefore:

~~~text
full susceptibility SAME
->
effective susceptibility SAME.
~~~

The converse need not hold when operators differ only on retained target sites.

No source tuple is deleted; this is a narrower behavioral scope.

## Q-G-PHASE-TRANSFORMER exact classification

A12 G-IA266 proves:

~~~text
Q-G-EFFECTIVE-SUSCEPTIBILITY SAME
IFF
Q-G-PHASE-TRANSFORMER SAME.
~~~

Thus effective susceptibility is an exact finite identity invariant for one-phase behavior over all valid states.

This replaces the earlier merely sufficient full-vector criterion when treatment behavior is the identity question.

It does not identify raw operator objects globally.

## Q-G-PHASE-DOMINANCE

For raw operators define:

~~~text
e1 <=phase e2
IFF
for every valid state/ideal:
    e2 removes at least everything e1 removes.
~~~

A12 G-IA268 proves exact equivalence:

~~~text
e1 <=phase e2
IFF
S*_e1 subseteq S*_e2.
~~~

This is a preorder, not an NEI SAME result.

Mutual phase dominance is exactly effective-susceptibility / phase-transformer SAME.

Strict dominance remains DISTINCT at the effective-support value scope.

## Q-G-DOMINANCE-LANGUAGE-BASIS

Fix one instance, its raw alphabet EL, and its exact effective-susceptibility preorder <=M.

A12 defines:

~~~text
B_M
=
the <=Msub-minimal raw solving words,
~~~

where <=Msub combines strict-position subsequence embedding with symbol-wise susceptibility dominance.

The identity object for complete-language reconstruction is the pair:

~~~text
(
    exact <=M relation on EL,
    exact finite B_M set
).
~~~

Under the fixed alphabet/correspondence, this pair reconstructs:

~~~text
T solves
IFF
exists B in B_M:
    B <=Msub T.
~~~

Scoped SAME means equality of both the preorder and the finite basis value under the declared alphabet correspondence.

This is an exact alternate complete-language representation.

## Q-G-IDEAL-ACTION

Fix the raw non-target descendant poset.

For operator e define its exact action on every removed ideal I:

~~~text
I -> R_e(I).
~~~

The identity object is the complete ideal-transformer function.

A12 proves this scope has the same classes as Q-G-EFFECTIVE-SUSCEPTIBILITY / Q-G-PHASE-TRANSFORMER.

The facts that R_e is meet-preserving and not generally join-preserving are properties of this value, not identity declarations.

## Global identity boundary

None of these scopes establish global natural identity of raw enzymes/operators.

Two raw operator referents may be:

~~~text
Q-G-EFFECTIVE-SUSCEPTIBILITY SAME
Q-G-PHASE-TRANSFORMER SAME
Q-G-IDEAL-ACTION SAME
~~~

while remaining separately represented source objects.

Conversely a strict effective-support difference makes the scoped values DISTINCT but does not independently settle whatever broader natural-object identity question a future domain theory might ask.

## QU boundary

The frozen 0.1 effective support and ideal action are exact.

No QU is needed for these scopes.

If susceptibility becomes uncertain in a successor model, Q-G-EFFECTIVE-SUSCEPTIBILITY and all downstream action/dominance/basis identity scopes must depend on the qualified QU realization family.

Missing such authority means INCOMPLETE, not semantic UNKNOWN.
