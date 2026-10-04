# BT01 Graph-Projectivization Common Core 0.1

**Status:** STRONGER PROVISIONAL COMMON-CORE RESULT — PRE-SEAL  
**Neutral schemas:** 187200–187208  
**Cross-track admission:** still forbidden until full-track sealing

## Result

The leading bridge can now be expressed without named high-level objects.

Given a typed bilinear action:

~~~text
A : V x S_minus -> S_plus,
~~~

fix v in V.

Then:

~~~text
A_v : S_minus -> S_plus
~~~

is linear.

Its graph is:

~~~text
Gamma_v = { (s, A_v(s)) }.
~~~

Linearity implies Gamma_v is a linear subspace of the paired chiral carrier.

Simultaneous nonzero scalar rescaling preserves Gamma_v, so its nonzero points admit a projective quotient.

The resulting parameterized incidence is:

~~~text
[v-source parameter]  v
[projective class]     [s : A_v(s)]
incidence              [s : A_v(s)] belongs to P(Gamma_v).
~~~

This is exactly the neutral transformation from B01 typed chiral action to B02 parameterized projective incidence.

## Why this is the likely abstraction frontier

This representation is stronger than:

~~~text
"both use spinors"
or
"both use quaternions".
~~~

It preserves:
- two chiral roles;
- a parameter/vector role;
- the typed action;
- linearity;
- simultaneous projective scaling;
- the family of projective incidence subsets indexed by the parameter.

It discards:
- author's names;
- E8;
- triality beyond what is needed for the action;
- a specific real form;
- a specific projective dimension;
- physical interpretation.

Those discarded structures can be restored as residuals/refinements.

## Woit-side source support

W01 section 2.2 gives V=Hom(S_R,S_L), so ordinary evaluation supplies A_W.

W01's twistor description gives a two-plane in C4 at a spacetime point and tangent vectors Hom(S_R,T/S_R).

Its Euclidean appendix further gives CP3 -> HP1 with CP1 fibers.

Thus Woit independently contains both endpoint presentations of BT01:
- typed action;
- projective incidence geometry.

## Lisi-side source support

L05 gives the algebraic presentation explicitly:

~~~text
chi = v psi
~~~

between vector, negative-chiral spinor, and positive-chiral spinor roles.

It then explicitly says the quaternionic case of the dual relation is Euclidean twistor incidence.

Thus Lisi independently supplies the algebraic side and names the geometric representation transform.

## What remains unresolved

The current result does not yet prove that the Woit and Lisi source instantiations are the same natural object.

Still required:
1. primitive source mappings into 187200–187208;
2. exact two-complex-dimensional source witnesses where used;
3. quaternionic real-structure compatibility;
4. sign/conjugation convention matching;
5. reconstruction of Woit's CP3/HP1 fibration from the neutral quotient;
6. residual accounting;
7. NEI disposition;
8. post-seal blind comparison.

## Falsifier

The bridge fails at this level if either source-local relation cannot be represented as the same typed bilinear action and homogeneous projective-family schema after preserving its required reality/chirality guards.
