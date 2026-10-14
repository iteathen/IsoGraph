# Lisi Quaternion Coefficient Transport 0.1

**Status:** NATIVE SOURCE/REPRESENTATION TRANSPORT — PARTIAL PRE-SEAL
**Native:** LISI_BT01_QUATERNION_COEFFICIENT_TRANSPORT_0_1.isg
**Source:** L05 §§2–4.2
**Depends on:** LISI_BT01_SOURCE_INSTANCE_0_1.isg and neutral schemas 185001, 185003, 187500, 188000, 188100, 188101.

## Purpose

This artifact keeps Lisi's source convention explicit instead of rewriting the positive chiral spinor as an unconjugated quaternion.

L05 identifies:

~~~text
vector v                 <-> quaternion element v
negative spinor psi      <-> quaternion element psi
positive spinor chi      <-> conjugated representative tilde(chi)
~~~

and gives:

~~~text
tilde(chi) = v psi.
~~~

The native transport represents that statement literally.

## Quaternion coefficient carrier

189200 is the source quaternion coefficient carrier.

The file gives it:
- a four-real-dimensional basis;
- associative unital algebra structure;
- composition/norm structure;
- the source division-algebra anti-involution KAPPA.

The source's multiplication-order reversal is represented through 188000.

## Chiral/vector representation maps

The exact bijections are:

~~~text
189220 : source vector role V       -> H coefficient carrier
189221 : source Q_minus             -> H coefficient carrier
189222 : source Q_plus              -> H coefficient carrier
~~~

189222 is interpreted with the source basis convention:

~~~text
Q_plus coefficient chi
    maps to
tilde(chi) = chi^b tilde(e_b).
~~~

Thus the tilde is inside the representation map, not dropped.

188101 then states that source action 189135 is exactly transported to quaternion product 189205.

## Chosen complex-structure comparison view

For the bridge comparison only, basis element 189212 is chosen as one imaginary quaternion unit u.

The file records:
- KAPPA(u) = -u;
- u^2 = -1;
- J_H(x) = x u.

Associativity gives:

~~~text
J_H^2 = -identity.
~~~

The coefficient presentation then instantiates neutral paired-complex-structure action schema 187500 with:

~~~text
parameter = H
S_minus   = H
S_plus    = H
ACT       = quaternion multiplication
J_minus   = J_H
J_plus    = J_H.
~~~

For fixed v:

~~~text
v (x u) = (v x) u,
~~~

so left multiplication intertwines the right complex structure.

## Evidence boundary

The choice of the particular imaginary basis unit is a comparison-view choice, not a physical or source-preferred direction.

The source supplies the quaternion algebra and its basis. Any unit imaginary quaternion gives an equivalent candidate complex presentation.

## What this establishes

~~~text
source Lisi chiral action
    -- exact source coefficient transport -->
quaternion multiplication
    + right complex structure
    -> neutral 187500 action-intertwiner package.
~~~

This is the first convention-preserving native route from Lisi's original real chiral presentation into the lowest BT01 common-action frontier.

## What remains open

- constructing the induced complex scalar carrier explicitly rather than only the square-minus-one real structure;
- mapping the resulting complex pair to the 187206 projective quotient;
- comparing the chosen complex presentation with Woit's source twistor complex structure;
- source-role NEI and residual reconstruction.
