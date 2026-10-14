# Lisi BT01 Chiral Clifford Source Instance 0.1

**Status:** SOURCE-EXPLICIT NATIVE CHIRAL CLIFFORD INSTANCE — PRE-SEAL  
**Native:** LISI_BT01_CHIRAL_CLIFFORD_SOURCE_INSTANCE_0_1.isg  
**Source:** L05 quaternionic Cl(0,4) construction

## Instantiation

The source quaternion coefficient carrier 189200 already provides:
- product 189205;
- unit 189206;
- conjugation 189209;
- composition bilinear form 189207;
- composition norm 189208.

This artifact instantiates sign-correct quaternion-to-chiral-Clifford schema 195100 and introduces only the derived Clifford-side handles:

| ID | Role |
|---|---|
| 195200 | negative Clifford bilinear form |
| 195201 | Clifford quadratic form Q_Cl=-N |
| 195202 | reverse chiral action Gamma_plus(v,p)=-conjugate(v)p |
| 195203 | source/provenance handle |

The forward chiral action is ordinary source quaternion multiplication 189205.

## Source formula

The represented pair is therefore:

~~~text
Gamma_minus(v,psi) = v psi
Gamma_plus(v,chi)  = -tilde(v) chi
Q_Cl(v)            = -N(v).
~~~

This is the source's Cl(0,4) sign convention.

## Closure consequence

Schema 195100 expands the two square relations:

~~~text
Gamma_plus(v,Gamma_minus(v,psi))
    = Q_Cl(v) psi

Gamma_minus(v,Gamma_plus(v,chi))
    = Q_Cl(v) chi.
~~~

The algebraic proof is carried by:
- associativity;
- conjugation;
- composition norm;
- the explicit sign relation.

No named Clifford algebra is used as a semantic leaf.

## Evidence status

~~~text
block/chiral form:
    SOURCE-EXPLICIT

specific quaternion carrier:
    NATIVE-CLOSED

195100 instance:
    PRESENT

triality / exceptional extension:
    RESIDUAL

cross-track Clifford equivalence:
    NOT CLAIMED
~~~
