# L05 Cyclic Trilinear / Product-Recovery Source Instance 0.2

**Status:** SOURCE-LOCAL NATIVE TRIALITY-FORM INSTANCE / PRE-QUALIFICATION  
**Native:** `LISI_L05_TRILINEAR_PRODUCT_RECOVERY_SOURCE_INSTANCE_0_2.isg`  
**Predecessor:** 0.1 superseded before closure promotion  
**Frozen target:** `L-SSC-129`

## Correction from 0.1

Revision 0.1 incorrectly instantiated cyclicity directly on raw coefficient triples.

That is not the source's typed cyclicity because the positive-chiral role is represented in the tilde/conjugated basis.

Revision 0.2 represents the three typed role transports explicitly.

For each source coefficient family:

~~~text
V -> Q_minus:
    same coefficient

Q_minus -> Q_plus:
    h -> KAPPA(h) in the Q_plus coefficient map

Q_plus -> V:
    represented tilde coefficient -> KAPPA -> ordinary coefficient
~~~

The typed triality form and these three maps instantiate schema 185006.

## Trilinear form

The coefficient-level scalar form remains:

~~~text
T(x,y,z) = B(z, x*y)
~~~

and is transported to the distinct source roles through the already-closed L128 coefficient maps.

## Product recovery

Schema 220000 defines recovery exclusively through the scalar functional and nondegenerate pairing and then identifies that recovery graph exactly with the source product graph.

Thus the source statement that multiplication can be recovered from the triality form is native.

## Source discrepancy

C, C', H, H', and O' satisfy the represented typed cyclicity in the finite source tables.

The version-of-record O table produces the same two cyclic failures already exposed by L126. Those failures are preserved as `INCONSISTENT_SOURCE` evidence; no repair is used.

## Firewall

No Woit, bridge, or synthesis semantics are used.
