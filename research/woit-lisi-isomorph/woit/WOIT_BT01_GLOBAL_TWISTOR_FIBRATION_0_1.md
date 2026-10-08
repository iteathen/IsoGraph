# Woit BT01 Global Twistor Fibration Source Instance 0.1

**Status:** SOURCE-LOCAL AXIOMATIC GLOBAL FIBRATION — ALGEBRAIC/PROJECTIVE PART  
**Native:** WOIT_BT01_GLOBAL_TWISTOR_FIBRATION_0_1.isg  
**Source:** W01 Appendix A.3.3 with W05 quaternion/C2 support

## Quaternion coordinates on both chiral spinor spaces

202003 and 202004 are exact real-linear bijections:

~~~text
H -> S_R
H -> S_L.
~~~

They use W01's conventional identification:

~~~text
s = s1 + s2 j.
~~~

The source quaternion basis is mapped to each chiral C2 basis as:

~~~text
1 -> e1
i -> i e1
j -> e2
k -> i e2.
~~~

This makes the source statement T=C4=H2 explicit without identifying H with C as a field.

## Twistor space

202100 is a four-complex-dimensional carrier with exact direct sum:

~~~text
T = S_R direct-sum S_L
~~~

through schema 201000.

Its basis is the images of the two source bases of S_R and S_L.

202113 is the exact projective quotient:

~~~text
PT = P(T).
~~~

Thus the algebraic/projective meaning of CP3 is represented without enumerating projective points.

## HP1 source chart

202120 is a source HP1 carrier represented through W01's explicit chart:

~~~text
HP1 = AFF(H) union {infinity}
~~~

at the set/chart level through schema 201001.

202121 is the affine quaternion injection and 202122 is W01's distinguished infinity point.

This does not by itself assert the topology HP1=S4.

## Affine twistor planes

For each source quaternion Z:

~~~text
202125(Z,s,t)
~~~

is the exact complex-linear graph embedding:

~~~text
s in S_R
    |->
(s, Zs) in T.
~~~

The Z action is not hidden: Z is first mapped by source 189331 into Hom(S_R,S_L), then evaluated by source action 189031.

202123(Z,t) is membership in the resulting two-complex-dimensional graph plane.

Injectivity in s is explicit.

## Infinity plane

202124(t) is membership in the embedded S_L plane.

This is the projective fiber above W01's homogeneous infinity (0,1).

## Twistor projection

202126 is a total function:

~~~text
pi : PT -> HP1.
~~~

A projective twistor point q maps to affine point AFF(Z) exactly when it has a nonzero representative in the graph plane of Z.

It maps to infinity exactly when it has a representative in the S_L infinity plane.

This is W01's source projection "complex line -> quaternionic line it generates" expressed through its affine graph convention.

## Fiber dimension

Every finite graph plane is the injective complex-linear image of S_R, which has exact complex dimension two.

The infinity plane is the injective image of S_L, also exact complex dimension two.

Therefore each projective fiber is the projectivization of a two-complex-dimensional plane: the source CP1 fiber.

No extensional list of fiber points is used.

## Closure disposition

The native artifact closes the algebraic/projective content of:
- W-A0-027 local two-plane/Hom geometry;
- W-A0-042 affine (s,Zs) coordinates;
- W-A0-043 infinity (0,1);
- W-A0-044 projection and CP1 fibers.

It substantially closes W-A0-028 and W-A0-036, but those assertions also identify the base with topological S4. That topology remains a separate open obligation.

W-A0-037 (fiber as sphere of orthogonal complex structures) also remains separate.
