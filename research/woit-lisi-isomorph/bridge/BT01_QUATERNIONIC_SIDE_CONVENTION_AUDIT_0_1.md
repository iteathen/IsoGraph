# BT01 Quaternionic Side / Complex-Structure Convention Audit 0.1

**Status:** CURRENT CONVENTION AUDIT  
**Date:** 2026-10-03

## 1. Why a side audit is necessary

Quaternions are noncommutative.

Statements such as "choose C inside H and quaternion multiplication is complex-linear" are incomplete unless they specify:
- which C-module structure is used;
- which side the scalars act on;
- which side the quaternion multiplication acts on;
- whether the source carrier is H itself or a chiral representation identified with H.

The bridge must not erase this distinction.

## 2. Woit source conventions

W05 writes a quaternion as:

~~~text
q = z1 + z2 j
~~~

with z1,z2 complex.

Its twistor real structure is left multiplication by j:

~~~text
rho_tw(q) = j q,
~~~

which is antilinear in the displayed complex coordinates and satisfies square minus identity before projectivization.

W01 separately realizes Euclidean vectors as a real four-dimensional subspace of M(2,C), complexifies to all M(2,C), and then identifies complexified vectors with:

~~~text
Hom(S_R,S_L).
~~~

Therefore the complex-linear map used by BT01 on the Woit side is the matrix/Hom representation between distinct chiral C2 carriers.

It must not be conflated with saying that raw left multiplication on one fixed complex presentation of H is C-linear.

## 3. Lisi source conventions

L05 begins with real division-algebra/chiral-spinor coefficient carriers and the quaternion multiplication table.

It identifies the Clifford chiral representative matrices with those multiplication coefficients.

For the quaternionic sp(3) construction it also gives the standard Pauli-matrix representation:

~~~text
e0 = sigma0
e1 = -i sigma1
e2 = -i sigma2
e3 = -i sigma3,
~~~

and states that this replaces the quaternionic 3x3 matrix presentation by a 6x6 complex representation.

Thus Lisi independently supplies a route from the real/quaternionic relation to a complex matrix representation.

The exact map of the positive chiral division representative, which uses a tilde/conjugation convention, remains load-bearing.

## 4. Correct neutral invariant

The source-independent invariant should therefore not be:

~~~text
H is one fixed complex vector space
and left multiplication is C-linear.
~~~

It should be:

~~~text
real/algebraic chiral carrier S_minus
real/algebraic chiral carrier S_plus
square-minus-one structures J_minus, J_plus
parameterized action A_v

A_v J_minus = J_plus A_v.
~~~

This is native schema 187500.

After choosing the compatible complex structures, A_v becomes a complex-linear map between the induced complex chiral spaces.

## 5. Relation to Woit's pseudoreal twistor map

The square-minus-one structures used to make chiral carriers complex must not automatically be identified with Woit's antilinear twistor map rho_tw.

W05 itself displays multiple intertwined structures:
- the ordinary complex coordinate structure;
- quaternion multiplication by j;
- the induced antipodal projective real structure.

The source-native maps must be distinguished before NEI can ask whether any are naturally the same.

## 6. Current disposition

~~~text
raw quaternion multiplication = common complex-linear map:
    REJECTED AS OVERLY COARSE

complex matrix / chiral-Hom presentation exists on Woit:
    SOURCE-SUPPORTED

complex matrix representation exists on Lisi:
    SOURCE-SUPPORTED

paired-complex-structure intertwiner schema:
    NATIVE-CLOSED AS 187500

exact Woit <-> Lisi convention mapping:
    OPEN
~~~

This correction strengthens BT01 by removing an unjustified common convention rather than weakening source fidelity.

## 7. Choice-fiber consequence

The compatible-complex-structure choice is now tracked separately as B06. Left- and right-multiplication choices must remain distinct until the source chirality/orientation routing is pinned. See B06_QUATERNIONIC_COMPLEX_STRUCTURE_CHOICE_FIBER_0_1.md.
