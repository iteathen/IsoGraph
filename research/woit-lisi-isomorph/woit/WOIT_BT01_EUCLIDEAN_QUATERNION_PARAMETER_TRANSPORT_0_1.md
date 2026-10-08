# Woit BT01 Euclidean Quaternion Parameter Transport 0.1

**Status:** SOURCE-LOCAL NATIVE REPRESENTATION TRANSPORT — PRE-SEAL  
**Native:** WOIT_BT01_EUCLIDEAN_QUATERNION_PARAMETER_TRANSPORT_0_1.isg  
**Source support:** W-A0-039–041 and W05 quaternionic presentation

## Purpose

This artifact makes Woit's real Euclidean/quaternion parameter and its complex matrix/Hom representation distinct native objects connected by an explicit representation map.

## Real scalar and quaternion side

Local handles 189300–189306 represent the source real scalar field interface.

189310 is an independent quaternion carrier with:
- vector operations 189311–189314;
- product 189315;
- unit 189316;
- conjugation 189317;
- imaginary basis 189318,189319,189320.

It instantiates exact finite quaternion presentation 193100.

## Real-to-complex scalar embedding

189307 instantiates corrected field-embedding schema 193302 from the real scalar carrier into Woit's existing complex scalar carrier 189000.

No surjectivity onto the complex field is asserted.

## Complexified vector/Hom carrier

Existing source parameter carrier:

~~~text
189030 = V_C = Hom(S_R,S_L) = M(2,C)
~~~

is given explicit complex vector operations 189322–189325 and an exact four-complex-dimensional basis 189326–189329.

Source interpretation:

~~~text
189326 = I
189327 = -i sigma1
189328 = -i sigma2
189329 = -i sigma3.
~~~

## Restriction of scalars

189330 gives the real scalar action on the same complexified carrier by corrected schema 193303.

Thus the complex Hom carrier can be used as a real vector space without identifying the real and complex scalar fields.

## Quaternion-to-matrix embedding

189331 is an injective real-linear map:

~~~text
H -> Res_R(Hom(S_R,S_L)).
~~~

It maps the source quaternion basis exactly:

~~~text
1 -> I
i -> -i sigma1
j -> -i sigma2
k -> -i sigma3.
~~~

This is the native version of W01's Euclidean matrix formula.

## What this closes

~~~text
specific H parameter:
    CLOSED through 193100

R -> C embedding:
    CLOSED through corrected 193302

complexification/restriction typing:
    CLOSED through 193303

real-linear H -> complex Hom embedding:
    CLOSED through 193400

source basis alignment:
    EXPLICIT NATIVE INCIDENCE
~~~

## What remains

- the standard real/complex fields themselves remain abstract field instances rather than analytic/topological constructions;
- matrix multiplication/Pauli identities are not needed for the vector-role embedding and are not imported;
- source chiral action compatibility with 189331 is still represented at the higher action-alignment layer;
- no physical-role identity is claimed.
