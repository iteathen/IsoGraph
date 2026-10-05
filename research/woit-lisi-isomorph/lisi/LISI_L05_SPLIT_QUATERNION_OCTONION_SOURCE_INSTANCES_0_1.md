# L05 Split-Quaternion / Octonion / Split-Octonion Source Instances 0.1

**Status:** SOURCE-LOCAL NATIVE COMPOSITION-ALGEBRA INSTANCES / PRE-SEAL  
**Native:** `LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_1.isg`  
**Source:** L05 §2, source multiplication tables (1)

## Source carriers

This file renders the remaining multiplication-table carriers needed alongside the already-native quaternion and the separate complex/split-complex instances:

~~~text
214200 = split-quaternion carrier H'
214300 = octonion carrier O
214400 = split-octonion carrier O'
~~~

Every carrier has:
- an explicit finite basis;
- vector-space semantics over the Lisi real scalar carrier;
- the complete source basis multiplication table;
- the source conjugation on basis elements;
- an explicit diagonal/off-diagonal composition metric;
- a composition norm.

H' additionally instantiates the associative unital-algebra schema.

O and O' deliberately do **not** instantiate an associative-algebra schema.

## Signatures

The native basis metrics are:

~~~text
H' : (+,-,+,-)
O  : (+,+,+,+,+,+,+,+)
O' : (+,+,+,+,-,-,-,-)
~~~

so split versus positive-definite structure is carried by primitive scalar pairings rather than by a name.

## Conjugation

All three use the composition-algebra anti-involution schema 215001:

~~~text
KAPPA(e0)=e0
KAPPA(ei)=-ei for i>0
KAPPA(xy)=KAPPA(y)KAPPA(x)
KAPPA^2=id.
~~~

The octonion instances therefore do not inherit the associativity assumption of the older associative anti-involution schema.

## Closure effect

Together with:

- `LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_1.isg`;
- `LISI_BT01_QUATERNION_COEFFICIENT_TRANSPORT_0_3.isg`;

this supplies the full displayed C/C'/H/H'/O/O' multiplication-table family needed by `L-SSC-125`.

A separate Core-0.21 closure packet must still verify the complete dependency graph before that frozen census item may be promoted.

No Clifford/triality consequence is inferred merely from having the algebra tables.
