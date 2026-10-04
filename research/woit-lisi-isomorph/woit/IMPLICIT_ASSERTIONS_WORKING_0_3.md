# Woit Working Implicit Assertions 0.1

**Status:** WORKING IA CORPUS — NO FIXED-POINT CLAIM  
**Profile:** IMPLICIT_ASSERTION_PROFILE_0_1.md

## W-IA-BT01-001 — Euclidean quaternion data admit a chiral Cl(0,4) package

**Disposition:** DERIVED_SOURCE_MATHEMATICAL_CONSEQUENCE  
**Native witness:** WOIT_BT01_DERIVED_CHIRAL_CLIFFORD_IA_0_1.isg

### Premises

- W-A0-034 — H has a chosen C2 presentation.
- W-A0-039 — Euclidean vector uses the quaternion/Pauli matrix formula.
- W-A0-041 — complexification is Hom(S_R,S_L).
- W-A0-045 — Euclidean quaternion norm is x KAPPA(x)=|x|².
- WOIT_BT01_EUCLIDEAN_QUATERNION_PARAMETER_TRANSPORT_0_1.isg — exact H and matrix representation.

### Consequence

The coefficient representation admits paired chiral actions:

~~~text
Gamma_minus(x,s)=x s
Gamma_plus(x,t)=-KAPPA(x)t
~~~

with:

~~~text
Gamma_plus Gamma_minus
=
Gamma_minus Gamma_plus
=
-|x|².
~~~

Thus it instantiates neutral schema 195100 / 195000 with the Cl(0,4) sign convention.

### Guard

This is not evidence that Woit proposes a Clifford-algebra unification layer. It is a derived representation consequence of the source Euclidean quaternion/spinor data.


## W-IA-BT01-002 — W01 and W05 HP1 conventions are related by conjugation plus swap

**Disposition:** DERIVED_SOURCE_MATHEMATICAL_CONSEQUENCE  
**Native witness:** WOIT_HP1_PROJECTIVE_CONVENTION_TRANSFORM_0_1.isg

### Premises

- W-A0-042 — W01 finite coordinate satisfies s_perp=Zs.
- W-A0-043 — W01 infinity is (0,1).
- W-A0-046 — W05 finite coordinate satisfies q=q2^{-1}q1 and infinity has q2=0.
- quaternion conjugation reverses multiplication order.

### Consequence

Map homogeneous coordinates by:

~~~text
(s,s_perp) -> (KAPPA(s_perp),KAPPA(s)).
~~~

Then the W05 affine coordinate is KAPPA(Z), W01 infinity maps to W05 infinity, and W01 origin maps to W05 origin.

### Guard

This is a coordinate/projective-handedness transform, not a claim that the two formulas may be used interchangeably without applying the transform.


## W-IA-W02-001 — self-dual Yang-Mills action differs by the topological residual functional

**Disposition:** DERIVED_SOURCE_MATHEMATICAL_CONSEQUENCE  
**Native witness:** W02_YANG_MILLS_SELFDUAL_ACTION_SOURCE_INSTANCE_0_1.isg

### Premises

- W-A0-063 Euclidean Hodge split;
- W02_EUCLIDEAN_HODGE_SELFDUAL_SOURCE_INSTANCE_0_2.isg;
- Hodge-compatible symmetric PAIR schema 209000;
- exact PLUS projection 209001.

### Consequence

For F=F^+ + F^-:

~~~text
PAIR(F,*F)=PAIR(F^+,F^+) - PAIR(F^-,F^-)
PAIR(F,F)=PAIR(F^+,F^+) + PAIR(F^-,F^-)
~~~

because the PLUS and MINUS sectors are PAIR-orthogonal.

Therefore:

~~~text
1/(2g^2) PAIR(F^+,F^+)
=
1/(4g^2) PAIR(F,*F)
+
1/(4g^2) PAIR(F,F).
~~~

### Guard

This IA proves the algebraic action relation only. It does not prove that PAIR(F,F) is topological; that remains a separate source/global obligation.
