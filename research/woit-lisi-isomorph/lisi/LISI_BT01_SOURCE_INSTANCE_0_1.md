# Lisi BT01 Source Instance 0.1

**Status:** SOURCE-LOCAL NATIVE AXIOMATIC INSTANCE — PARTIAL / PRE-SEAL
**Native:** LISI_BT01_SOURCE_INSTANCE_0_1.isg
**Primary source:** L05, Division Algebras, Triality, and Exceptional Magic, §§2–4.2
**Source assertions:** L-A0-027–032

## Native role map

| ID range | Source role |
|---|---|
| 189100–189106 | real scalar carrier and field-operation handles |
| 189110–189114 | negative real chiral spinor carrier Q_minus |
| 189120–189124 | positive real chiral spinor carrier Q_plus |
| 189130–189134 | real quaternionic vector carrier V |
| 189135 | source vector/chiral-spinor multiplication ACT_L |
| 189140–189151 | four-real-dimensional basis witnesses for V, Q_minus, Q_plus |
| 189160 | source provenance handle |

## What is asserted natively

The file applies the stronger neutral schema 187200 over the source real presentation:

~~~text
V, Q_minus, Q_plus are real vector spaces
ACT_L : V x Q_minus -> Q_plus
ACT_L is bilinear.
~~~

It also applies 187601 to all three four-real-dimensional carriers.

This is the direct source-side structure represented in L05:
- vector, negative real chiral spinor, and positive real chiral spinor coefficient sets;
- quaternion/division multiplication;
- equivalent Clifford multiplication;
- quaternionic Cl(0,4) case.

## Source convention guard

The source writes the positive chiral division representative as tilde(chi), and gives:

~~~text
tilde(chi) = v psi
~~~

while the Clifford coefficient relation is written as chi = Gamma(v) psi.

The native relation 189135 therefore records the **typed structural action** but does not erase the tilde/conjugation convention.

The exact representation map from 189120 into the division-algebra tilde carrier remains a source-local dependency.

## Complex presentation remains downstream

L05 separately gives the Pauli-matrix complex representation of quaternions.

This file does not prematurely treat Q_minus/Q_plus as complex vector spaces.

The next source transport is:

~~~text
real Lisi instance 187200
-> source-authorized complex representation
-> convention-safe 187500/187300 presentation
-> projective BT01 transform.
~~~

## Closure boundary

This is a native axiomatic source instance, not complete primitive closure:
- real scalars are not yet the fully rendered standard real field;
- quaternion multiplication-table semantics remain source support below 189135;
- the tilde/conjugation representation map remains open;
- the complex lift is not asserted here.
