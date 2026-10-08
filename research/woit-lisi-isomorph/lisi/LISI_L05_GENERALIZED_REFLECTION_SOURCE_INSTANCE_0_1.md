# L05 Generalized Reflection Source Instance 0.1

**Status:** SOURCE-LOCAL REFLECTION FORMULAS / PARTIAL L-SSC-130 CLOSURE  
**Native:** `LISI_L05_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.isg`  
**Frozen target:** corrected `L-SSC-130` in `SOURCE_SEMANTIC_CENSUS_0_2.json`

## Signature branch

Relation `224000(s_u,phase)` renders the source factor:

~~~text
s_u = +1  -> phase = 1
s_u = -1  -> phase = i
~~~

using the Lisi real field, Lisi complex field, real-to-complex embedding, and source imaginary unit.

Each source family has an explicit unit-sign relation requiring:

~~~text
Q(u) = s_u
s_u in {+1,-1}.
~~~

## Ordered reflection formulas

For every source family C, C', H, H', O, O', the file renders the three reflection types:

~~~text
R_v^u:
    v   -> -s_u u KAPPA(v) u
    chi -> sqrt(s_u) KAPPA(u) tilde(chi)
    psi -> sqrt(s_u) KAPPA(psi) KAPPA(u)

R_m^u:
    chi -> sqrt(s_u) tilde(chi) KAPPA(u)
    psi -> -s_u u KAPPA(psi) u
    v   -> sqrt(s_u) KAPPA(u) KAPPA(v)

R_p^u:
    psi -> sqrt(s_u) KAPPA(u) KAPPA(psi)
    v   -> sqrt(s_u) KAPPA(v) KAPPA(u)
    chi -> -s_u u tilde(chi) u.
~~~

Products are represented as ordered binary chains. No associativity rewrite is used, so the octonion cases retain the source's right-first multiplication convention.

## Typed outputs

The source roles remain distinct.

The result of every reflection is placed in the corresponding complexified role carrier from `LISI_L05_COMPLEXIFIED_ROLE_CARRIERS_0_1.isg`.

For space-like `s_u=+1`, the phase is 1 and outputs lie in the embedded real subspace.

For time-like `s_u=-1`, the explicit phase is the source imaginary unit. This file does not silently identify the complexified output with a chosen real form.

## Still open for L-SSC-130

This file closes the explicit generalized-reflection **map formulas and signature-factor branch**.

The corrected census item also requires:

- source anti-invariance of the triality form under an individual generalized reflection, with role exchange/sign;
- invariance of even generalized-reflection compositions.

Those are intentionally separate next-layer relations.

The later source claim that time-like formulas with explicit i are real Lie-algebra automorphisms relative to an alternative anti-linear real structure is not folded into this §3 reflection item.

No Woit or synthesis semantics are used.
