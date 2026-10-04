# BT01 Chiral Clifford Coefficient Alignment 0.1

**Status:** STRONG SCOPED ALGEBRAIC ALIGNMENT — PRE-SEAL  
**Native:** BT01_CHIRAL_CLIFFORD_COEFFICIENT_ALIGNMENT_0_1.isg

## Inputs

### Woit side
Derived IA package:
- quaternion carrier 189310;
- product 189315;
- conjugation 189317;
- positive norm 195301;
- Clifford quadratic form 195303;
- forward chiral action 189315;
- reverse chiral action 195304.

Evidence status: source-derived IA, not source-explicit.

### Lisi side
Source-explicit package:
- quaternion carrier 189200;
- product 189205;
- conjugation 189209;
- composition norm 189208;
- Clifford quadratic form 195201;
- forward chiral action 189205;
- reverse chiral action 195202.

Evidence status: source-explicit.

## Comparison view

196000 is an algebraic field isomorphism between the separately rendered Woit and Lisi real scalar carriers.

196001 is a semilinear involutive-algebra isomorphism between their quaternion carriers.

It maps the exact source bases:

~~~text
1_W -> 1_L
i_W -> i_L
j_W -> j_L
k_W -> k_L.
~~~

Because 196001 preserves:
- addition/scalars through 196000;
- product;
- unit;
- conjugation;

it also transports the quaternion norm constructed from conjugation.

## Clifford transport

The native comparison explicitly requires:

~~~text
Q_Cl^W(v_W)
    --196000-->
Q_Cl^L(v_L)
~~~

whenever:

~~~text
v_W --196001--> v_L.
~~~

It likewise transports both chiral actions:

~~~text
Gamma_-^W(v,m)=p
    <->
Gamma_-^L(Fv,Fm)=Fp

Gamma_+^W(v,p)=m
    <->
Gamma_+^L(Fv,Fp)=Fm
~~~

under the bijective algebra map.

## Strongest current scoped conclusion

At the coefficient/algebraic level:

~~~text
Woit-derived chiral Cl(0,4)
    is representation-isomorphic to
Lisi source-explicit quaternionic chiral Cl(0,4)
~~~

under the pinned algebraic comparison view.

This is stronger than:
- equal dimensions;
- matching basis matrices;
- matching action shape.

The full product/conjugation/quadratic/action package transports.

## Scope guard

This is not a claim that:
- Woit proposes Clifford unification;
- the physical roles of the structures are identical;
- Woit's global twistor fibration equals Lisi's triality/exceptional extension;
- the full theories are isomorphic.

Those remain residual or post-seal questions.

## Provenance asymmetry

The same algebraic structure has different evidentiary status:

~~~text
Lisi:
    SOURCE-EXPLICIT

Woit:
    DERIVED IA / SOURCE-MATHEMATICAL CONSEQUENCE
~~~

That asymmetry is part of the result and must not be normalized away.
