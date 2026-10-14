# Woit HP1 Projective Convention Transform 0.1

**Status:** SAME-AUTHOR SOURCE-PRESENTATION TRANSFORM — PRE-SEAL  
**Native:** WOIT_HP1_PROJECTIVE_CONVENTION_TRANSFORM_0_1.isg

## Two source conventions

### W01 — Euclidean Twistor Unification

W01 uses homogeneous quaternion coordinates:

~~~text
(s, s_perp)
~~~

with affine coordinate:

~~~text
Z = s_perp s^{-1}
s_perp = Z s.
~~~

Its chosen origin is:

~~~text
(1,0)
~~~

and its point at infinity is:

~~~text
(0,1).
~~~

### W05 — Notes on the Twistor P1

W05 writes homogeneous coordinates:

~~~text
[q1,q2]
~~~

with affine coordinate:

~~~text
q = q2^{-1} q1.
~~~

Thus its affine origin is represented by [0,1], while the omitted/infinity class has second coordinate zero and may be represented by [1,0].

## Exact transform

Quaternion conjugation reverses multiplication order.

Define:

~~~text
(q1,q2) = (KAPPA(s_perp), KAPPA(s)).
~~~

If W01 has:

~~~text
s_perp = Z s,
~~~

then:

~~~text
KAPPA(s_perp)
 = KAPPA(s) KAPPA(Z).
~~~

Therefore the W05 affine coordinate is:

~~~text
q = KAPPA(Z).
~~~

No commutativity assumption is used.

The distinguished points transform correctly:

~~~text
W01 infinity (0,1)
    -> conjugate + swap
W05 infinity (1,0)

W01 origin (1,0)
    -> conjugate + swap
W05 origin (0,1).
~~~

## Native roles

- 200000 — componentwise conjugation + swap of homogeneous pair;
- 200001 — affine coordinate conjugation Z -> KAPPA(Z);
- 200002 — Woit source provenance handle.

## Disposition

This is a presentation transform between two Woit quaternionic-projective conventions.

It is not a change of the represented HP1 geometry.

Any global IsoGraph rendering must keep the two coordinate conventions distinct and connect them through this transform rather than combining their formulas directly.
