# W02 Hodge Eigenspace / Spin(4) Lie-Algebra Source Instance 0.1

**Status:** SOURCE-LOCAL REPRESENTATION WITNESS  
**Native:** W02_HODGE_SPIN4_LIE_SOURCE_INSTANCE_0_1.isg  
**Source:** W02 §IV.2, using the corrected Euclidean Hodge instance 0.2

## Distinct right/left Lie-algebra roles

207100 and 207110 are separate three-dimensional source-role carriers.

Each instantiates the exact su(2)-type Lie-algebra schema 207001.

They are kept distinct even though they have the same abstract structure:

~~~text
207100 -> source SU(2)_R factor role 204213
207110 -> source SU(2)_L factor role 204212.
~~~

The role relation does not claim a differential construction of the Lie algebra from the global group; topology/smooth structure is outside this artifact.

## Hodge eigenspaces as 3D carriers

The corrected Hodge source artifact gives:

~~~text
PLUS  = self-dual eigenspace
MINUS = anti-self-dual eigenspace.
~~~

This artifact restricts the inherited two-form vector operations to each subspace and gives exact three-element bases:

~~~text
PLUS:
  f01+f23
  f02+f31
  f03+f12

MINUS:
  f01-f23
  f02-f31
  f03-f12.
~~~

Thus both eigenspaces are exact three-dimensional real vector spaces.

## Source correspondence

207120 is an exact linear bijection:

~~~text
self-dual two-forms -> su(2)_R role.
~~~

207121 is an exact linear bijection:

~~~text
anti-self-dual two-forms -> su(2)_L role.
~~~

The displayed basis maps are a source-compatible normalization witness; W02's load-bearing claim is the chiral-factor correspondence, not one privileged basis normalization.

## Lie-algebra semantics

207122 and 207123 are the infinitesimal-rotation Lie brackets transported through the two exact correspondence maps.

The source eigenspaces therefore instantiate exact Lie-algebra carriers, and 207120/207121 are Lie-algebra isomorphisms through schema 184008.

This makes the phrase "self-dual forms correspond to su(2)_R" reconstructible rather than a label-only relation.

## Closure result

Together with:
- `W02_EUCLIDEAN_HODGE_SELFDUAL_SOURCE_INSTANCE_0_2.isg`;
- `W02_MINKOWSKI_HODGE_COMPLEX_SOURCE_INSTANCE_0_1.isg`;

this closes W-A0-063 at the current algebraic source scope:

~~~text
Euclidean:
  star^2=+1
  self-dual <-> su(2)_R
  anti-self-dual <-> su(2)_L

Minkowski:
  star^2=-1
  complexification
  +/-i chiral eigenspaces.
~~~

No smooth Lie-group differentiation or global bundle semantics is claimed here.
