# L05 Complex and Split-Complex Source Instances 0.1

**Status:** SOURCE-LOCAL NATIVE COMPOSITION-ALGEBRA INSTANCES / PRE-SEAL  
**Native:** `LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_1.isg`  
**Source:** L05 §2 and §4.1

## Purpose

This extends the L05 native reduction beyond the quaternionic slice using only source-explicit two-dimensional algebra data.

Two separate carriers are represented:

~~~text
214000 = ordinary complex division-algebra carrier
214100 = split-complex composition-algebra carrier
~~~

Both are vector spaces over the existing Lisi real scalar carrier.

## Ordinary complex instance

Basis:

~~~text
e0 = 1
e1 = i
~~~

with:

~~~text
e0 e0 = e0
e0 e1 = e1
e1 e0 = e1
e1 e1 = -e0

KAPPA(e0) = e0
KAPPA(e1) = -e1

B(e0,e0)=+1
B(e1,e1)=+1
B(e0,e1)=0.
~~~

The file instantiates:
- exact two-dimensional basis schema 187600;
- associative unital algebra schema 185001;
- composition-algebra schema 185003;
- algebra anti-involution schema 188000.

## Split-complex instance

Basis:

~~~text
e0' = 1
e1' = I
I^2 = +1
~~~

with:

~~~text
KAPPA(e0') = e0'
KAPPA(e1') = -e1'

B(e0',e0')=+1
B(e1',e1')=-1
B(e0',e1')=0.
~~~

Thus the split signature is native rather than hidden in the label "split complex".

## Closure effect

This supplies exact native support for the ordinary-complex and split-complex subcases of `L-SSC-125`.

It does not yet close that frozen census item because the quaternion, split-quaternion, octonion, and split-octonion source cases must all be represented at the same source scope.

It also does not yet instantiate the L05 chiral Clifford/triality constructions over these carriers; that is the next source-local layer.

## Firewall

No Woit or synthesis semantics are used.
