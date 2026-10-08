# L05 Quaternion Triality Product Recovery 0.1

**Status:** SOURCE-MATHEMATICAL CONSEQUENCE — QUATERNIONIC SLICE / PRE-SEAL  
**Native:** `LISI_L05_QUATERNION_TRIALITY_PRODUCT_RECOVERY_0_1.isg`  
**Depends on:** `LISI_L05_QUATERNION_TRIALITY_SOURCE_INSTANCE_0_1.isg`, `LISI_BT01_QUATERNION_COEFFICIENT_TRANSPORT_0_3.isg`  
**Primary source obligation:** the L05 statement that the division-algebra product is recoverable from the triality form.

## Native relation

`206110(v,m,h)` means that the quaternion coefficient `h` is reconstructed from the scalar triality functional:

~~~text
p |-> T(v,m,p)
~~~

through the nondegenerate composition bilinear form.

For every positive-chiral probe `p`, let `hp` be its exact quaternion coefficient. Then:

~~~text
T(v,m,p,r)
    iff
B(hp,h,r).
~~~

No multiplication relation occurs in the definition of `206110`.

## Existence

The native file separately states that if:

~~~text
hv = coeff(v)
hm = coeff(m)
h  = hv * hm
~~~

then `206110(v,m,h)`.

This follows from the already-native definition:

~~~text
T(v,m,p) = B(coeff(p), hv*hm).
~~~

## Uniqueness

The native file also states:

~~~text
RECOVER(v,m,h1)
and
RECOVER(v,m,h2)

implies

h1 = h2.
~~~

The support is:
- `189222` is an exact bijection from the positive-chiral role to the quaternion coefficient carrier;
- `189207` is the nondegenerate composition bilinear form;
- therefore equality of all scalar pairings against all positive-chiral probes determines one unique quaternion coefficient.

## Closure effect

This discharges the **product-recovery subclause on the quaternionic slice** of:

- `L-SSC-018`;
- `L-SSC-129`.

It does not close either frozen census item as a whole. The ordinary complex/octonionic and split-composition cases remain to be rendered.

## Firewall

No Woit semantics, twistor incidence, bridge mapping, or synthesis hypothesis is used.
