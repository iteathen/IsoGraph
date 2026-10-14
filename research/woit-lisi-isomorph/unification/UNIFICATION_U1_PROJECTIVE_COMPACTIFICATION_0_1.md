# U1.0 — Projective Compactification of the Quaternionic Chiral Relation

**Status:** STRUCTURALLY_CONSISTENT_CANDIDATE — DECLARED SLICE ONLY  
**Native:** UNIFICATION_U1_PROJECTIVE_COMPACTIFICATION_0_1.isg  
**Parent kernel:** U0

## Synthesis hypothesis UH-001A

Woit's global projective twistor family is a conservative compactification of Lisi's affine quaternionic chiral relation under the already frozen BT01 mapping.

The synthesis is about the **graph/incidence family**, not a globally defined Lisi operator.

## Finite chart

The frozen source mapping is:

~~~text
Woit:
    (s, Zs), Z in H

Lisi:
    (psi, tilde(chi))
    tilde(chi) = v psi

mapping:
    Z = v
    s = psi
    Zs = tilde(chi).
~~~

Therefore each finite Lisi parameter v determines exactly the same local graph plane as Woit's affine parameter Z.

No new equation is introduced on the finite chart.

## Global completion inherited from Woit

Woit additionally supplies the algebraic/projective family:

~~~text
base:
    HP chart = H union {infinity}

finite plane:
    G_Z = { (s, Zs) }

infinity plane:
    G_infinity = { (0,t) | t in S_L }

projective fiber:
    P(G_Z) or P(G_infinity)

total projective space:
    PT

projection:
    pi: PT -> HP.
~~~

U1.0 inherits this structure from Woit.

## Conservative Lisi extension

The Lisi projection of U1.0 is defined by restriction to the affine H chart.

On that restriction:
- the added infinity point disappears;
- the infinity plane disappears;
- the finite graph relation reconstructs the original Lisi chiral action through the pinned BT01 representation map.

Thus U1.0 adds no equation to the source Lisi finite action.

## No operator at infinity

U1.0 does **not** define:

~~~text
v = infinity
Gamma(v)
~~~

or any analogous Lisi operator.

The global object is the projective incidence family.

At infinity only the inherited Woit vertical chiral plane exists.

This guard prevents a geometric compactification from being misreported as a source algebraic extension.

## Woit reconstruction

Forgetting:
- Lisi role labels;
- the synthesis interpretation;

leaves the inherited Woit algebraic/projective fibration unchanged.

The topology claim HP1=S4 remains outside the current U1.0 declared scope exactly as in the frozen BT01 projection.

## New synthesis content

There is one substantive project-generated relation:

> interpret the Woit global graph-plane family as a conservative compactification of the Lisi affine chiral graph family.

This relation is **SYNTHESIS_HYPOTHESIS UH-001A**.

Everything else is inherited or forced by U0.

## Native roles

| ID | Meaning |
|---|---|
| 205100 | U1.0 candidate |
| 205101 | U0 kernel handle |
| 205102 | inherited Woit HP chart/base |
| 205103 | inherited Woit projective twistor total space |
| 205104 | inherited Lisi affine quaternion parameter |
| 205105 | inherited Lisi finite chiral action |
| 205106 | inherited Woit finite graph-plane family |
| 205107 | inherited Woit infinity plane |
| 205108 | inherited Woit projective projection |
| 205110 | UH-001A compactification interpretation |
| 205111 | Lisi restriction/reconstruction view |
| 205112 | Woit forgetful/reconstruction view |
| 205113 | no-Lisi-operator-at-infinity guard |

## Falsifiers

Reject U1.0 if:

1. the affine restriction fails to reproduce the exact Lisi action;
2. the Woit graph family fails to reconstruct under forgetting the synthesis labels;
3. the compactification requires assigning an unsupported Lisi operator to infinity;
4. an alternate Woit HP1 coordinate convention changes the reconstructed incidence family rather than only coordinates;
5. the added infinity structure changes any finite Lisi relation.

## Current result

~~~text
U0 reconstruction on finite chart:
    PASS by frozen BT01 mapping

Lisi finite-slice reconstruction:
    PASS by restriction

Woit algebraic/projective-slice reconstruction:
    PASS by inheritance

new algebra at infinity:
    NONE

new synthesis relation:
    ONE — compactification interpretation

triality extension:
    NOT YET ATTACHED

full physical unification:
    NOT CLAIMED
~~~

This is the first constructive unification candidate of the retargeted campaign.
