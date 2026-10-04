# B03 Real-Structure Split 0.1

**Status:** REQUIRED CORRECTION TO B03

The original B03 candidate grouped "antilinear involution / fixed real carrier / chirality" too coarsely.

W05 shows that Euclidean twistor structure requires a distinct case.

## B03.R — ordinary real involution

~~~text
sigma antilinear
sigma^2 = +1
fixed-point carrier may be nonempty.
~~~

This is appropriate for conventional real forms and some Majorana/conjugation structures.

## B03.Q — quaternionic/pseudoreal structure

~~~text
rho antilinear
rho^2 = -1
on the vector/spinor carrier
~~~

After projectivization:

~~~text
[rho]^2 = +1.
~~~

The Woit twistor P1 has no fixed projective points under this structure; geometrically it is the antipodal real structure.

## Why the distinction matters

Collapsing B03.R and B03.Q would falsely identify:
- a real fixed-point structure;
- a quaternionic/pseudoreal structure.

Both involve antilinear maps, but their squares, fixed-point behavior, and projective geometry differ.

## Woit disposition

Euclidean twistor P1:
- B03.Q is SOURCE-SUPPORTED.

Other Woit real-form/conjugation structures may instantiate B03.R or different transition-specific structures and must be treated separately.

## Lisi disposition

L05 division-algebra conjugation itself squares to +1.

But the quaternionic chiral carrier can also support a pseudoreal complex structure after choosing the quaternionic-to-complex presentation.

Whether the load-bearing Lisi twistor-incidence carrier instantiates B03.Q under the exact source convention remains to be derived.

## Current rule

B03 is no longer one candidate node.

Track:
- B03.R;
- B03.Q;
- explicit maps between them only when source/mathematical support exists.

## Native B03.Q support

The generic pseudoreal/projective branch is now represented by ../support/PRIMITIVE_PSEUDOREAL_PROJECTIVE_STRUCTURE_0_1.isg using IDs 187400–187402.

Woit source instantiation remains to be mapped into those IDs; Lisi-side source relevance remains open.
