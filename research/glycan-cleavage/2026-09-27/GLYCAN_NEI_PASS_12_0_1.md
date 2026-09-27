# Glycan cleavage NEI pass 12 — effective action and dominance-basis identity 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0-A12 + A8 correction + NEI passes 1-11 + NEI scope contract 0.4
**Authority:** qualified NEI 0.4 + QU 0.1

A12 admits the strongest operator-identity result yet available in the frozen 0.1 model: phase behavior is classified exactly by susceptibility restricted to removable non-target sites.

## G-N094 — effective susceptibility SAME iff phase-transformer SAME

Under Q-G-EFFECTIVE-SUSCEPTIBILITY and Q-G-PHASE-TRANSFORMER:

~~~text
S*_e1 = S*_e2
IFF
C_e1 = C_e2
on every valid state.
~~~

This is exact by G-IA266.

Therefore the finite effective-support set is a complete invariant for one-phase behavior in the frozen model.

## G-N095 — effective susceptibility SAME iff ideal-action SAME

The active-state and removed-ideal representations are exact complements.

Thus:

~~~text
Q-G-EFFECTIVE-SUSCEPTIBILITY SAME
IFF
Q-G-IDEAL-ACTION SAME.
~~~

No stronger raw-operator identity follows.

## G-N096 — full susceptibility identity is strictly finer than treatment-action identity when target tuples differ

If two raw operators have equal full susceptibility vectors, they are effective-susceptibility SAME.

But operators may differ on:

~~~text
M(e,t)
with t in TG
~~~

while having equal S*_e.

Then they are:

~~~text
full Q-G-SUSCEPTIBILITY DISTINCT
but
Q-G-EFFECTIVE-SUSCEPTIBILITY SAME
and
Q-G-PHASE-TRANSFORMER SAME.
~~~

This is a hidden scoped equivalence exposed by the DP residual audit.

## G-N097 — strict phase dominance is not identity

A12 proves:

~~~text
e1 <=phase e2
IFF
S*_e1 subseteq S*_e2.
~~~

If the inclusion is strict, the effective-support values are DISTINCT under Q-G-EFFECTIVE-SUSCEPTIBILITY.

Therefore useful dominance/absorption does not become SAME.

Mutual phase dominance is exactly phase-transformer SAME.

## G-N098 — absorption equivalence is sequence-transformer identity only

When e1 <=phase e2:

~~~text
[e1,e2]
[e2,e1]
[e2]
~~~

are Q-G-SEQUENCE-TRANSFORMER SAME.

The individual operator values e1 and e2 are not SAME under effective susceptibility when the dominance is strict.

This prevents sequence-level absorption from leaking into raw-operator identity.

## G-N099 — dominance-aware basis plus preorder is complete-language SAME to the raw solution language

Fix the exact effective-support preorder <=M of one instance.

A12 proves:

~~~text
T solves
IFF
exists B in B_M:
    B <=Msub T.
~~~

Therefore the pair:

~~~text
(<=M, B_M)
~~~

is an exact alternate representation of L_global.

Under Q-G-INSTANCE-SOLUTION-LANGUAGE it is scoped SAME to the original dynamic language representation.

## G-N100 — B_M and B_global need not be the same set value

B_global uses raw subsequence minimality only.

B_M also quotients the generator relation by susceptibility dominance.

Therefore the two finite basis sets can differ even though, together with their respective expansion relations, each reconstructs the same L_global.

Do not assert:

~~~text
B_M SAME B_global
~~~

as raw set values unless exact set equality is separately established for the instance.

## G-N101 — meet-preserving closure is an action property, not a natural-object identity result

G-IA264 establishes that each ideal action is a meet-preserving closure operator.

This can be used as a derived structural view and a cross-domain comparison signature.

It does not classify two raw operators SAME merely because both satisfy the same algebraic laws.

Exact action equality still requires G-N094/G-N095 support.

## G-N102 — no semantic UNKNOWN or QU refinement appears

The effective supports and ideal actions are exact finite values under the frozen deterministic model.

Result:

~~~text
new semantic UNKNOWN:
    0

new QU refinement:
    0
~~~

Broader natural identity of raw operator objects remains INCOMPLETE absent independent domain identity authority.

## Pass-12 NEI disposition

~~~text
new exact scoped identity laws:     5
new identity-boundary laws:         4
raw-object global identity results: 0
semantic UNKNOWN results:           0
QU refinements:                     0
~~~

Qualified DP may now be reapplied to the admitted phase algebra and dominance-aware language basis.
