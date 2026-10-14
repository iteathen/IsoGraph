# BT01 Exact Affine Source-Formula Witness 0.1

**Status:** SOURCE-FORMULA REFINEMENT OF THE AFFINE COMMON QUOTIENT — PRE-SEAL
**Parent result:** BT01_AFFINE_QUATERNIONIC_COMMON_QUOTIENT_0_1.md

The affine common quotient is not only an abstract H/R4 parameter match. The two independently frozen source formulas coincide under the already established role maps.

## Woit

On the finite HP1 chart, W01 writes the quaternionic line as:

~~~text
(s, Zs),     Z in H.
~~~

The input coordinate s has the Woit S_R role and Zs has the S_L/output role.

## Lisi

L05 writes its division-algebra chiral spinor representative as:

~~~text
(psi, tilde(chi))
~~~

with primary relation:

~~~text
tilde(chi) = v psi.
~~~

The established chiral role map is:

~~~text
psi        <-> S_R
tilde(chi) <-> represented S_L/Q_plus output
v          <-> Euclidean quaternionic parameter.
~~~

## Exact witness

Set:

~~~text
Z = v
s = psi.
~~~

Then:

~~~text
Zs = v psi = tilde(chi),
~~~

so:

~~~text
Woit: (s, Zs)
Lisi: (psi, tilde(chi))
~~~

are the same affine quaternionic graph formula in the pinned representation view.

No chirality swap is required. No new basis change is required. The Lisi tilde convention remains explicit on the output representation.

## Scope

The witness covers the finite H chart.

Woit's additional homogeneous point at infinity (0,1), its fiber, and the global HP1/CP3 organization remain source residuals, exactly as recorded in the parent affine-common-quotient result.

## Cross-reference discipline

Lisi later states that a dual quaternionic relation is Euclidean twistor incidence and cites Woit. This witness does not use that citation as a premise; it follows from the primary source equations already rendered independently.

## Disposition

~~~text
affine parameter:
    exact representation alignment

affine source equation:
    exact formula alignment candidate

local graph/projective line:
    PASS under pinned representation view

global HP1:
    Woit residual

cross-track NEI SAME:
    NOT CLAIMED
~~~
