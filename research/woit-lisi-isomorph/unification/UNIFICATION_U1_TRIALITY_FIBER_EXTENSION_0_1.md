# U1.1 — Triality / Fiber Extension Audit

**Status:** REJECTED — GLOBAL EXTENSION  
**Residual disposition:** L-ALG TRIALITY PRESERVED OUTSIDE U1.0  
**Native:** UNIFICATION_U1_TRIALITY_FIBER_EXTENSION_0_1.isg  
**Certificate:** UNIFICATION_U1_TRIALITY_FIBER_EXTENSION_0_1.json  
**Parent:** U1.0-PC

## Tested synthesis hypothesis UH-001B

Test the stronger form of UH-001:

> Lisi's quaternionic division-algebra / vector–negative-chiral–positive-chiral triality extends as a total, source-faithful structure over Woit's U1.0 projective family, including the compactification patch, while preserving U0, Woit projective conventions, pseudoreal structure, and both source reconstructions.

UH-001B is **not admitted** as a U-edge.

The failure is structural rather than a failed search for a preferred coordinate formula.

## 1. Finite-chart transport survives at the incidence level

On the frozen U0 chart:

~~~text
Woit:
    t = Z s

Lisi:
    tilde(chi) = v psi

mapping:
    Z = v
    s = psi
    t = tilde(chi)
~~~

Let KAPPA be quaternion conjugation.

The already-pinned W01 -> W05 homogeneous-coordinate transform is:

~~~text
(q1,q2) = (KAPPA(t), KAPPA(s))
q = KAPPA(Z).
~~~

Because KAPPA reverses multiplication order:

~~~text
t = Z s

implies

KAPPA(t)
    = KAPPA(s) KAPPA(Z)

so

q1 = q2 q.
~~~

This is exactly the W05 affine relation for the same represented projective geometry.

Therefore:

~~~text
finite U0 graph/incidence reconstruction:
    PASS

W01/W05 represented-geometry invariance:
    PASS

required algebraic transport:
    conjugation + homogeneous-coordinate swap
    + left/right multiplication side-swap
~~~

The side-swap is not optional. Treating the transformed coordinate as though it retained the same left-action presentation would mix the two source conventions.

## 2. What this does not prove

The finite calculation proves transport of the **graph/incidence relation**.

It does not yet prove transport of L05's full source-specific cyclic triality tensor and role automorphisms.

The current Lisi source traversal explicitly still lacks:
- the complete L05 equation census;
- all multiplication/signature cases;
- all triality-specific sign and conjugation convention matching;
- full native closure of the source triality identities.

The reusable primitive triality schema 185006 is generic and explicitly does not identify itself with the source-specific Spin(8), division-algebra, or generation trialities.

Therefore:

~~~text
full source-specific triality chart transport:
    QU / NOT YET SOURCE-CLOSED
~~~

No synthesis step may use the generic schema to silently fill this source gap.

## 3. Compactification-patch obstruction

U1.0 adds the Woit projective point at infinity and its inherited vertical chiral plane:

~~~text
G_infinity = { (0,t) }.
~~~

U1.0 deliberately defines no:

~~~text
v = infinity
Gamma(infinity)
division-algebra product at infinity
triality vector element at infinity.
~~~

Lisi's quaternionic triality interface uses three algebraic roles:

~~~text
V
S_minus
S_plus
~~~

with the vector role represented by a division/composition-algebra carrier and related to the chiral roles by multiplication / Clifford / trilinear triality structure.

A **total global** triality action over U1.0 would therefore need one of the following at the compactification patch:

1. extend the vector carrier from H to H union {infinity} with source-backed multiplication, norm, Clifford, and triality semantics; or
2. provide an exact source-backed rule showing that the cyclic triality action preserves the U1.0 family without interpreting the compactification point as an algebra element.

Neither structure is present in the selected Woit source, selected Lisi source, or forced by U0.

Option 1 violates the U1.0 no-fictional-algebra-at-infinity guard.

Option 2 is currently absent.

Hence the strong global extension is obstructed.

## 4. Pseudoreal compatibility remains unproved for triality

Woit's projective real structure is pseudoreal:

~~~text
J^2 = -1
~~~

on the vector-space carrier, becoming projectively involutive.

Quaternion conjugation KAPPA instead satisfies:

~~~text
KAPPA^2 = +1.
~~~

The project already treats these as distinct structures.

U0 preserves their scoped relationship, but the current source record does not prove that Lisi's full triality automorphism commutes with, intertwines, or otherwise preserves Woit's global pseudoreal J across U1.0.

Therefore:

~~~text
U1.0 pseudoreal structure:
    PRESERVED

global triality / J compatibility:
    QU / NOT ESTABLISHED
~~~

Rejecting UH-001B avoids changing Woit's source geometry to manufacture this compatibility.

## 5. Reconstruction audit

With UH-001B rejected and no new global triality edge inserted:

~~~text
U0 finite reconstruction:
    PASS

Lisi affine reconstruction:
    PASS

Woit U1.0 reconstruction:
    PASS

W01/W05 represented geometry:
    PASS

unsupported Lisi operator at infinity:
    ABSENT

source-specific triality chart transport:
    QU

triality / Woit pseudoreal compatibility:
    QU

global vector/triality role at infinity:
    FAIL — SOURCE STRUCTURE ABSENT

new algebra required at infinity for a total triality action:
    YES

UH-001B global extension:
    REJECTED
~~~

## 6. Conservative boundary

The result does **not** reject Lisi's triality structure.

It rejects attaching that structure as a total global action over the present U1.0 compactification.

The maximum currently justified attachment is:

~~~text
finite H chart:
    U0 incidence/action survives exact chart transport

Lisi triality residual:
    remains available on its source algebraic carrier
    pending source-specific transport closure

infinity patch:
    Woit structure only
    no Lisi algebra/triality invented
~~~

Thus U1-TC remains structurally consistent through U1.0-PC, while the strong U1.1-TR extension is rejected.

## 7. Consequence for later work

Do not repair U1.1 by weakening Woit's projective geometry or by silently compactifying Lisi's algebra.

Two legitimate later routes remain:

1. complete the L05 triality source treatment and test a strictly affine/chart-local triality transport without claiming a global patch action;
2. revisit triality at U3-OT, where an octonionic/triality extension is an explicit new level and lower U0/U1 reconstruction can be tested independently.

A separate project-generated compactified-triality theory would require a new synthesis hypothesis and a new candidate branch. It is not source-inherited U1.1.
