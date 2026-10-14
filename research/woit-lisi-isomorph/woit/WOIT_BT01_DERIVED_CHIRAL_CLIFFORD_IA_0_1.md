# Woit BT01 Derived Chiral Clifford IA Instance 0.1

**Status:** WOIT-SIDE DERIVED IA / SOURCE-MATHEMATICAL CONSEQUENCE — NOT SOURCE-EXPLICIT  
**Native:** WOIT_BT01_DERIVED_CHIRAL_CLIFFORD_IA_0_1.isg

## Provenance boundary

Woit does not need to state Lisi's chiral block construction for this artifact.

The derivation uses only Woit-side source material:
- Euclidean vectors represented by the quaternion carrier H;
- the exact H -> M(2,C)=Hom(S_R,S_L) representation;
- Woit's positive Euclidean norm |x|²=x KAPPA(x);
- W05's H ~= C2 spinor presentation;
- standard algebraic block construction.

No Lisi source semantics are premises.

## Positive quaternion norm

195300 / 195301 instantiate 195110 on Woit's source quaternion carrier 189310.

Thus:

~~~text
N_W(x) = |x|²
~~~

is represented from quaternion conjugation/product, with its polarized positive bilinear form.

## Derived Cl(0,4) pair

The same source carrier then instantiates sign-correct chiral schema 195100:

~~~text
Gamma_minus(x,s) = x s
Gamma_plus(x,t)  = -KAPPA(x) t
Q_Cl(x)          = -N_W(x).
~~~

This is the coefficient-level form of the standard block operator:

~~~text
Gamma_W(x)
=
[ 0             -KAPPA(x) ]
[ x              0         ].
~~~

Under Woit's complex Pauli representation, KAPPA(x) corresponds to the Euclidean adjoint/conjugate matrix.

## Why this is IA, not A0

The premises are source-explicit, but packaging them into the complete chiral block operator is a mathematical consequence.

Therefore:

~~~text
Woit source quaternion/matrix data:
    SOURCE-EXPLICIT

Woit 195100 chiral Clifford pair:
    DERIVED IA / SOURCE-MATHEMATICAL CONSEQUENCE
~~~

The distinction is preserved for all later comparison and publication claims.

## Current limitations

- the exact H -> S_R and H -> S_L spinor representation maps are not yet native-instantiated here;
- this artifact is coefficient-level;
- no statement that Clifford structure is fundamental in Woit's theory is made;
- no cross-track equivalence is imported.
