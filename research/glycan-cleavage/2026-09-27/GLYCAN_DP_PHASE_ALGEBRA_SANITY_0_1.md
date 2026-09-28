# Glycan DP phase-algebra finite sanity check 0.1

**Status:** finite sanity evidence only; not a proof substitute
**Date:** 2026-09-27
**Parent:** GLYCAN_DP_IMPLICIT_ADMISSIONS_A12_0_1.md

A small exhaustive model check was run against the DP-fed phase-algebra claims.

## Enumeration scope

For each n=1..4:

- raw non-target carrier = {0,...,n-1};
- every subset of possible acyclic child-to-parent edges i->j with i<j;
- every upward-closed active set / dual order ideal;
- every possible susceptibility support subset;
- for dominance checks, every support pair S1 subseteq S2.

The checker implemented the original operational phase semantics:

~~~text
repeatedly remove one active susceptible terminal node
until none remain.
~~~

It then compared that operational result against the candidate closed forms/algebra.

## Checks

### Resistant-frontier formula

Compared:

~~~text
operational saturated active result
~~~

against:

~~~text
upward_closure(active intersection resistant_support).
~~~

Cases checked:

~~~text
8,512
~~~

Mismatches:

~~~text
0
~~~

### Meet preservation

Compared:

~~~text
R_e(I intersection J)
~~~

against:

~~~text
R_e(I) intersection R_e(J).
~~~

Cases checked:

~~~text
71,804
~~~

Mismatches:

~~~text
0
~~~

### Dominance absorption

For every tested S1 subseteq S2, checked both:

~~~text
R_2(R_1(I)) = R_2(I)

R_1(R_2(I)) = R_2(I).
~~~

Cases checked:

~~~text
42,405
~~~

Mismatches:

~~~text
0
~~~

### Effective-support converse

For every distinct susceptibility-support pair, searched the complete tested ideal domain for a state distinguishing their phase transformers.

Transformer/state comparisons searched:

~~~text
62,236
~~~

Distinct support pairs with no distinguishing tested state:

~~~text
0
~~~

This is consistent with G-IA266.

## Join-preservation negative control

The explicit two-resistant-child counterexample from G-IA265 was also retained:

~~~text
R_e(I union J)
!=
R_e(I) union R_e(J).
~~~

Thus the sanity campaign was not biased toward finding only algebraic equalities.

## Disposition

~~~text
finite sanity evidence:
    SUPPORTS A12

semantic authority:
    direct proofs in A12

proof replacement:
    NO
~~~
