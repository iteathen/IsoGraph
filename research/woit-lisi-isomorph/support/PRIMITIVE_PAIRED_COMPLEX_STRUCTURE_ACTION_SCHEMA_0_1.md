# Primitive Paired Complex-Structure Action Schema 0.1

**Status:** RESEARCH-LOCAL BRIDGE SUPPORT — CURRENT LOWEST BT01 ACTION FRONTIER  
**Native:** PRIMITIVE_PAIRED_COMPLEX_STRUCTURE_ACTION_SCHEMA_0_1.isg

## Purpose

This schema removes a convention error from the quaternionic-to-complex bridge.

The bridge does not require the parameter carrier to be a complex vector space, and it does not require raw quaternion multiplication to be complex-linear under one arbitrarily chosen copy of C inside H.

Instead it requires two chiral carriers with compatible square-minus-one complex structures and an action that intertwines them.

## 187500

Start with:
- a base field F;
- a parameter carrier V with no scalar structure required;
- F-vector spaces S_minus and S_plus;
- a parameterized action ACT(v,s,t), linear in s;
- linear maps J_minus and J_plus.

Require:

~~~text
J_minus^2 = -identity
J_plus^2  = -identity

ACT(v, J_minus(s))
    =
J_plus(ACT(v,s)).
~~~

The last equation is the intertwiner law.

When F is the real field and J_minus/J_plus are complex structures, each ACT_v is complex-linear between the induced complex vector spaces.

## Why this is lower than 187300

187300 begins after the complex vector-space structures are already chosen.

187500 records the source data from which that complex-linear presentation arises:
- real/algebraic chiral carriers;
- square-minus-one structure maps;
- compatibility of the action with those maps.

Thus the current bridge chain is:

~~~text
187500
paired complex structures + intertwining action
    ->
derived complex-linear presentation 187300
    ->
graph / projective quotient 187206-187207
    ->
twistor-style incidence candidate.
~~~

## Source significance

Woit explicitly separates the Euclidean real vector subspace from its complexification and represents complexified vectors as Hom(S_R,S_L).

Lisi starts with real chiral Clifford spinors and quaternionic multiplication, then also gives the standard complex Pauli-matrix representation of the quaternions.

The exact source-local J_minus/J_plus maps remain to be pinned. This schema states the obligation without choosing their handedness in advance.

## Non-coverage

This schema does not assert:
- which side quaternion scalars act on;
- that J_minus equals J_plus;
- that either J is Woit's projective twistor real structure;
- Majorana reality;
- Clifford square relations;
- dimensions;
- projective incidence.

Those are separate refinements.
