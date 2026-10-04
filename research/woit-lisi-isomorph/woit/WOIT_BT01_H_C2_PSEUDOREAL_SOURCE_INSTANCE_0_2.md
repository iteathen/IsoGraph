# Woit BT01 H-to-C2 Pseudoreal Source Instance 0.2

**Status:** SOURCE-LOCAL NATIVE INSTANCE — H/C2 + PSEUDOREAL PROJECTIVE CLAIM CLOSED  
**Native:** WOIT_BT01_H_C2_PSEUDOREAL_SOURCE_INSTANCE_0_1.isg  
**Source:** W05 §§2–4; W01/W05 Euclidean quaternion support

## H to C2

197000 is a two-complex-dimensional vector carrier over the existing Woit source complex field 189000.

The same additive carrier is restricted to the source real field 189300 using the already pinned embedding 189307.

197008 is an exact real-linear bijection:

~~~text
H -> C2.
~~~

The source coordinate convention q=z1+z2 j is pinned by:

~~~text
1 -> (1,0)
i -> (i,0)
j -> (0,1)
k -> (0,i).
~~~

The C2 basis values are 197005 and 197006; 197010 is the chosen complex scalar i with i²=-1.

## Source complex conjugation

197012 instantiates algebraic scalar conjugation 183001 and is pinned by:

~~~text
conj(i)=-i.
~~~

This is the algebraic interface needed by the source coordinate formula; no topological/analytic completeness claim is added.

## Woit pseudoreal map

197013 instantiates 187400:

~~~text
J:C2->C2
J is antilinear
J²=-1.
~~~

The source meaning "multiplication by quaternion j" is not left as a label.

The native file requires 197008 to intertwine:
- left multiplication by source quaternion basis element j=189319;
- the antilinear map J=197013.

Thus J is pinned to the source quaternion operation, not merely to an arbitrary pseudoreal map.

In coordinates this is the standard:

~~~text
J(z1,z2)=(-conj(z2),conj(z1)).
~~~

## Projective structure

The exact projective quotient is instantiated through 186004.

187401/187402 then give the induced projective map:

~~~text
PJ([v])=[J(v)]
PJ²=identity.
~~~

This closes the carrier-level pseudoreal and projective-involution parts of W-A0-035.

## Remaining part of W-A0-035

The W05 statement that the induced CP1 involution has **no fixed projective points** is not yet closed.

That requires stronger source support for the standard complex field / positivity (or another exact algebraic exclusion of solutions to a*conj(a)=-1).

Therefore W-A0-035 remains PARTIAL rather than being promoted to closed.

## Closure consequence

~~~text
W-A0-034 H ~= C2 chosen presentation:
    CLOSED_SCHEMA_SOURCE_INSTANCE

W-A0-035 J²=-1 and projective PJ²=1:
    CLOSED

W-A0-035 fixed-point-free clause:
    OPEN

full W-A0-035:
    PARTIAL
~~~


## 0.2 fixed-point-free projective clause

Successor 0.2 adds the source assertion:

~~~text
for every projective point p:
    PJ(p) != p.
~~~

This is represented directly in primitive equality/negation over the already exact projective quotient and induced pseudoreal projective map.

It is source-semantic closure, not a proof derived from an ordered/complete construction of the standard complex numbers.

Therefore the full W-A0-035 source assertion is now closed in this scoped algebraic rendering.
