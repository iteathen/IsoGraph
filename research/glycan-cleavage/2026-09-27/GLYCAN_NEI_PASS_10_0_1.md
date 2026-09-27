# Glycan cleavage NEI pass 10 — finite path-basis and disjunctive-SCS identity 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0-A10 + A8 correction + NEI passes 1-9
**Authority:** qualified NEI 0.4 + QU 0.1

A10 replaces each maximal-path language by a finite unique subsequence-minimal basis and reconstructs the global finite basis through a finite family of ordinary common-supersequence constraints.

This pass records only exact value identities.

## Q-G-PATH-MINIMAL-BASIS

For one maximal non-target path P, identity object:

~~~text
B_P
=
the exact finite set of subsequence-minimal
valid block-pattern words generating COV(P).
~~~

Raw operator identity and order are part of the value.

## Q-G-DISJUNCTIVE-CS-LANGUAGE

For the retained finite family of path bases, identity object:

~~~text
the exact union over basis selections f
of the ordinary common-supersequence languages CS(f).
~~~

This is a language value, not identity of one particular product enumeration.

---

## G-N085 — path-language SAME iff finite path-basis SAME

A10 G-IA239/G-IA240 prove:

~~~text
COV(P1)=COV(P2)
IFF
B_P1 = B_P2.
~~~

Therefore:

~~~text
Q-G-PATH-COVER-LANGUAGE SAME
IFF
Q-G-PATH-MINIMAL-BASIS SAME.
~~~

The finite basis is an exact alternate representation of the whole upward-closed path language.

## G-N086 — path-language inclusion remains dominance, not identity

A10 G-IA241 gives a finite criterion for:

~~~text
COV(P1) subseteq COV(P2).
~~~

Strict inclusion makes the path-language values DISTINCT under Q-G-PATH-COVER-LANGUAGE even though the easier constraint is redundant in the global intersection.

Finite decidability of the dominance relation does not turn dominance into SAME.

## G-N087 — disjunctive common-supersequence language is solution-language SAME

A10 G-IA245 proves exact equality:

~~~text
L_global
=
union over selections f:
    CS(f).
~~~

Therefore the finite disjunctive common-supersequence representation is Q-G-INSTANCE-SOLUTION-LANGUAGE SAME to the original problem.

It is also Q-G-MINIMAL-SOLUTION-BASIS SAME after applying the unique minimal-basis projection.

## G-N088 — minimized MCS union is B_global SAME

A10 G-IA251 proves:

~~~text
B_global
=
subsequence-minimal elements of
union over f of MCS(f).
~~~

Thus the finite minimized MCS-union value and A9 B_global are Q-G-MINIMAL-SOLUTION-BASIS SAME.

Different intermediate selection/MCS records are not globally identified.

## G-N089 — optimum-family identity follows from the same finite construction

A10 G-IA252 extracts the complete optimum raw-word family as the shortest elements of the finite MCS union.

Therefore that extracted set is Q-G-OPTIMUM-WORD-FAMILY SAME to the original optimum family.

The associated minimum length is Q-G-OPTIMUM-VALUE SAME.

## G-N090 — singleton ordinary-SCS identity is a restricted collapse of the general value

Under singleton susceptibility, every path basis has one member.

The finite selection product therefore has one element and Q-G-DISJUNCTIVE-CS-LANGUAGE reduces exactly to one ordinary common-supersequence language.

This recovers NEI8 G-N073 without extending ordinary-SCS identity to the general set-valued model.

## G-N091 — basis-selection identity is not source-artifact identity

Two different:

- maximal-path enumerations;
- path-basis construction orders;
- selections f;
- MCS generation procedures

may represent the same exact language/basis value.

Scoped SAME of the resulting value does not imply global identity of those records, algorithms, or source paths.

## G-N092 — dominated raw labels remain distinct values unless susceptibility is equal

A10 preserves A9's distinction:

~~~text
e1 <=M e2
~~~

with strict inclusion is dominance, not Q-G-SUSCEPTIBILITY SAME.

A dominating replacement may preserve solvability/optimum length while changing the raw treatment word and therefore the complete raw witness-family value.

## G-N093 — no semantic UNKNOWN or QU refinement appears

All pass-10 objects are exact finite sets/functions derived from the deterministic frozen 0.1 model.

No identity-relevant unresolved realization family is introduced.

Therefore:

~~~text
semantic UNKNOWN results: 0
QU refinements:            0
~~~

Broader raw-object identity questions without independent authority remain INCOMPLETE rather than UNKNOWN.

---

## Pass-10 NEI disposition

~~~text
new exact scoped identity laws:     6
new identity-boundary laws:         3
raw-object global identity results: 0
semantic UNKNOWN results:           0
QU refinements:                     0
~~~

A full selected-family implicit re-pass is required next.

If it adds neither a new exact assertion nor a material support refinement, the following NEI re-pass must add neither a new identity result nor an identity/QU/scope refinement. Only then is the requested operational fixed point reached.
