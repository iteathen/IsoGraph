# Primitive Hodge-Graded Endomorphism / Einstein-Block Schema 0.1

**Status:** RESEARCH-LOCAL CHIRAL-GR SUPPORT  
**Native:** PRIMITIVE_HODGE_GRADED_ENDOMORPHISM_SCHEMA_0_1.isg

## 210000 — parameterized curvature endomorphism with block condition

210000 starts from an exact Hodge eigensplit (205511).

A carrier R parametrizes linear endomorphisms of the two-form carrier:

~~~text
ACT(r,-):F -> F.
~~~

The unary predicate EIN is defined exactly by preservation of both Hodge sectors:

~~~text
EIN(r)
IFF
r maps PLUS into PLUS
and
r maps MINUS into MINUS.
~~~

Relative to the direct sum:

~~~text
F = PLUS direct-sum MINUS,
~~~

this is precisely the statement that both off-diagonal blocks vanish.

## Why this is the right abstraction boundary

W02's source statement is pointwise/algebraic: curvature may be viewed as an endomorphism of the six-dimensional two-form space, and Einstein equations correspond to zero off-diagonal blocks.

The schema therefore does not enumerate:
- manifold points;
- frame-bundle points;
- connection coefficients.

Those structures are not discarded. They remain separate obligations needed to show how a spin connection produces a particular r in R.

## Disposition

~~~text
six-dimensional Hodge block semantics:
    CLOSED_SCHEMA

curvature-from-connection construction:
    OUTSIDE THIS SCHEMA

Einstein-equation dynamical equivalence:
    SOURCE-SPECIFIC INSTANTIATION REQUIRED
~~~
