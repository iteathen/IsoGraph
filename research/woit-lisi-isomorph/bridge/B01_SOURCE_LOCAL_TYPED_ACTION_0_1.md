# B01 Source-Local Typed-Action Instantiation 0.1

**Status:** SOURCE-SEMANTIC COMMON CORE ESTABLISHED / PRIMITIVE INSTANTIATION PENDING  
**Candidate:** B01.0 typed chiral action  
**Cross-track theorem status:** NOT YET AN ISOMORPHISM

## Neutral B01.0

The neutral signature requires:

~~~text
V        vector-like carrier
S_minus  one chiral spinor-like carrier
S_plus   opposite chiral spinor-like carrier
A        typed action

A : V x S_minus -> S_plus
~~~

plus source-appropriate linearity/bilinearity.

The labels minus/plus are neutral role handles; they do not force an author's chirality naming convention.

## Woit source instantiation

W01 section 2.2 states that complexified four-dimensional vectors are two-by-two complex matrices and identifies them as linear maps:

~~~text
V = Hom(S_R, S_L).
~~~

Therefore ordinary linear-map application gives the source-local typed relation:

~~~text
A_W : V x S_R -> S_L
A_W(v,s) = v(s).
~~~

W01 further represents a twistor spacetime point by a two-plane S_R inside T=C4 and identifies tangent vectors with Hom(S_R,T/S_R), with T/S_R playing S_L.

This B01.0 instantiation is independent of Lisi and does not require triality or a Clifford-algebra name.

**Disposition:** SOURCE-SUPPORTED.

## Lisi source instantiation

L05 explicitly identifies:
- a vector carrier v;
- negative-chiral spinor psi;
- positive-chiral spinor chi;
- Clifford/division multiplication satisfying chi = v psi.

Therefore:

~~~text
A_L : V x S_minus -> S_plus
A_L(v,psi) = chi.
~~~

The source additionally supplies a stronger Clifford/division/triality refinement.

**Disposition:** SOURCE-SUPPORTED.

## Common quotient now justified

At the source-semantic level both tracks independently instantiate:

~~~text
two chiral role carriers
+ vector-like carrier
+ typed vector action from one chirality to the other.
~~~

This is stronger than shared vocabulary and weaker than a full Clifford/triality equivalence.

### What is not yet established

- equality of dimensions under a pinned real/complex convention;
- the same quadratic form/signature;
- the same reality condition;
- the Clifford-square relation on the Woit projection;
- natural identity of the chiral carriers;
- the quaternionic/projective representation transform;
- physical-role equivalence.

Thus the correct current statement is:

~~~text
B01.0 common structural quotient:
    SOURCE-SUPPORTED

B01.1 Clifford refinement on both sides:
    NOT YET ESTABLISHED

Woit-Lisi isomorphism:
    NOT CLAIMED
~~~

## Next proof obligation

Instantiate B01.0 into native primitive field/vector/linear-map schemas on each side, then test whether the homogeneous typed action descends to the B02 projective-incidence relation.
