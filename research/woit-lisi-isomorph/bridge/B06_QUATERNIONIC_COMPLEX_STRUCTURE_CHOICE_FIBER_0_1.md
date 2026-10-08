# B06 — Quaternionic Complex-Structure Choice Fiber 0.1

**Status:** HIGH-INTEREST TRANSPORT CANDIDATE / SIDE-ORIENTATION UNRESOLVED

## Observation

BT01 requires a passage from real/quaternionic chiral carriers to a complex two-dimensional presentation before projectivization.

For H, choosing a unit imaginary quaternion u with:

~~~text
u^2 = -1
~~~

gives an orthogonal complex structure by multiplication by u.

The unit imaginary quaternions form a two-sphere.

W05 explicitly identifies the CP1 twistor fiber with the sphere of orthogonal complex structures on R4=H.

Therefore the apparent "extra choice of complex structure" required by BT01 is not just an arbitrary auxiliary parameter on the Woit side: it is geometrized by the twistor CP1 fiber itself.

## Why this may bridge to Lisi

L05's quaternionic vector/chiral-spinor relation is initially a real/quaternionic relation.

To expose it as a complex projective incidence relation one needs a compatible complex presentation of the chiral quaternion carriers.

The family of such quaternionic complex structures is again parameterized by unit imaginary quaternion directions.

This suggests a transport architecture:

~~~text
real quaternionic chiral relation
+ complex-structure choice u
-> complex chiral linear relation
-> graph/projectivization
-> Euclidean twistor incidence.
~~~

The choice parameter may therefore be part of the bridge rather than disposable setup.

## Critical side/orientation fork

Quaternion multiplication is noncommutative.

There are distinct natural operations:
- left multiplication L_u;
- right multiplication R_u.

For fixed left multiplication L_v:

~~~text
L_v R_u = R_u L_v
~~~

by associativity.

Thus a right-multiplication complex structure is automatically compatible with the parameterized left action.

By contrast, arbitrary left multiplications L_v and L_u do not commute.

W05 displays its twistor real structure using multiplication by j in its chosen complex coordinates, and separately describes the CP1 family of orthogonal complex structures on H.

The campaign must therefore determine which left/right complex-structure family corresponds to:
- Woit's relevant twistor fiber/chirality;
- Lisi's negative chiral carrier;
- Lisi's positive chiral carrier after the tilde/conjugation convention.

This is not a notation issue. Left/right choice tracks Spin(4) chirality/orientation structure.

## Candidate B06 levels

### B06.0 — choice locus

~~~text
U = { u in H | u^2 = -1, |u|=1 }.
~~~

### B06.1 — complex-structure action

For each u, choose one source-authorized handedness:

~~~text
J_u = L_u
or
J_u = R_u.
~~~

### B06.2 — action compatibility

For the chiral action A_v require:

~~~text
A_v J_minus(u) = J_plus(u) A_v.
~~~

This instantiates neutral schema 187500.

### B06.3 — projective family

The compatible complex presentation feeds 187300/187206/187207 and yields the BT01 projective incidence family.

## Source status

### Woit
- H/C2 relation: source-present;
- CP1 as twistor fiber: source-present;
- CP1 as sphere of orthogonal complex structures on R4=H: source-present;
- exact left/right/chirality routing needed by BT01: not yet pinned.

### Lisi
- quaternionic chiral carriers: source-present;
- division/Clifford multiplication: source-present;
- Euclidean-twistor identification of quaternionic dual relation: source-present;
- explicit CP1 choice-fiber parameterization: not source-stated;
- compatible complex-choice family: mathematical representation transform, not yet native-mapped.

## Falsifier

B06 weakens or fails if the complex-structure family that makes Lisi's action linear belongs to the opposite chiral/orientation component from the Woit twistor fiber and no source-authorized chirality exchange maps one to the other.

## Current disposition

~~~text
choice-of-complex-structure family:
    MATHEMATICALLY NATURAL

Woit CP1 realization:
    SOURCE-SUPPORTED

Lisi need for compatible complex presentation:
    BRIDGE-DERIVED

exact side/chirality identification:
    OPEN

B06 as cross-track isomorph:
    NOT CLAIMED
~~~

## Side-swap lemma

Native support 188000–188002 proves the generic transport

~~~text
KAPPA o L_u o KAPPA = R_KAPPA(u).
~~~

For an imaginary quaternion unit, KAPPA(u)=-u. Thus the left/right choice families are algebraically connected; source-role/chirality compatibility remains open.
