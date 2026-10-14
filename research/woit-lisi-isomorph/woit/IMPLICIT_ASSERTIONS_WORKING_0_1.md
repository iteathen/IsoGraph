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
