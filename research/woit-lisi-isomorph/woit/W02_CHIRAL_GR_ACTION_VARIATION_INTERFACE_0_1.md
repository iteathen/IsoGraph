# W02 Chiral-GR Action / Variation Interface 0.1

**Status:** SOURCE-LOCAL ACTION/VARIATION INTERFACE — GEOMETRIC RECONSTRUCTION OPEN  
**Native:** W02_CHIRAL_GR_ACTION_VARIATION_INTERFACE_0_1.isg  
**Source:** W02 §IV.3

## Source action

W02 cites the chiral gravitational action:

~~~text
integral Sigma^(dot A dot B) wedge R_(dot A dot B).
~~~

This artifact represents:
- a tetrad/configuration carrier;
- a connection carrier;
- a Sigma carrier;
- a curvature carrier;
- a bilinear integrated contraction PAIR;
- maps tetrad -> Sigma and connection -> curvature;
- the action as their exact pairing.

The formula itself is therefore explicit rather than a label.

## First variations

The source states:
- varying the connection gives the torsion-free Levi-Civita relation;
- varying the tetrad gives the Einstein equations.

211000 supplies an explicit first-variation/stationarity interface.

The source instance records the two claimed equivalences:

~~~text
stationary in connection
    <-> torsion-free relation

stationary in tetrad
    <-> Einstein relation.
~~~

## Why this remains partial

The following carriers/relations are not yet primitive-expanded:
- tetrad/frame-bundle construction;
- Sigma as the self-dual Sym2(S_R)-valued two-form built from the tetrad;
- spin connection;
- curvature construction;
- torsion-free predicate;
- Einstein predicate;
- analytic meaning of first variation.

Therefore:

~~~text
W-A0-068 action/variation statement:
    AXIOMATIC INTERFACE PRESENT

W-A0-068 primitive geometric closure:
    OPEN

W-A0-068 parent assertion:
    PARTIAL
~~~

This artifact exists to prevent the later full rendering from silently changing the source action or its two variational roles while the geometry is expanded.
