# Glycan cleavage Discovery Protocol 0.1–0.7 run 0.2

**Status:** second discovery pass over DP-admitted A12 / NEI12 structure
**Date:** 2026-09-27
**Authority:** qualified cumulative DP 0.1–0.7
**Inputs:** GLYCAN_DP_IMPLICIT_ADMISSIONS_A12_0_1.md + GLYCAN_NEI_PASS_12_0_1.md

The first DP pass exposed the positive phase algebra:

~~~text
active filter
-> retain resistant active types
-> upward-close
~~~

This second pass asks for the dual failure/witness structure and the smallest exact state needed to evaluate a fixed word.

---

# 1. Reranking after A12

Highest-value protocols now are:

1. DP-02 constraint structure — characterize the exact blocker condition for failure;
2. DP-04 dependency topology — propagate blockers through descendant-before-ancestor order;
3. DP-08 residual analysis — compare active-filter state with its minimal blocker frontier;
4. DP-07 alternative factorization — convert repeated upward-closure operations into a chain/relation product;
5. DP-06 repeated motif — compare the new negative chain with A8 positive maximal-path coverage.

---

# 2. Lead L8 — resistant frontier is a lossless post-phase state key

A12 gives:

~~~text
D_e(A)
=
upward_closure(A intersection N_e).
~~~

Any upward-closed filter is determined by its set of minimal elements.

Candidate exact phase frontier:

~~~text
F_e(A)
=
MIN_P(A intersection N_e).
~~~

Then:

~~~text
D_e(A)
=
upward_closure(F_e(A)).
~~~

Interpretation:

One exhaustive phase advances each active branch upward until the first resistant blockers; only the minimal resistant blockers are needed to reconstruct the complete surviving active set.

This is the resistance-side dual of the terminal frontier view from A2.

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 3. Lead L9 — exact resistant-chain characterization of fixed-word failure

Take full initial active non-target set:

~~~text
A_0 = Qraw.
~~~

For word:

~~~text
T=[e_1,...,e_k],
~~~

A12 repeatedly gives:

~~~text
A_i
=
upward_closure(
    A_(i-1) intersection N_(e_i)
).
~~~

Candidate induction:

A non-target node survives after k phases iff there exist nodes:

~~~text
q_1 <=P q_2 <=P ... <=P q_k <=P q
~~~

such that:

~~~text
q_i in N_(e_i)
~~~

for every treatment position i.

In particular, some non-target node survives iff there exists a nondecreasing chain:

~~~text
q_1 <=P ... <=P q_k
~~~

with each q_i resistant to the corresponding e_i.

Therefore candidate exact acceptance dual:

~~~text
T solves
IFF
there exists no such resistant chain.
~~~

This is a negative certificate view of word failure.

**Falsifier:** a failing word with no resistance chain, or a solving word with one.

No analytic counterexample found; direct induction is available.

**Disposition:** HIGHEST-VALUE CANDIDATE.

---

# 4. Lead L10 — resistance-frontier recurrence

Define endpoint witness set:

~~~text
B_1
=
N_(e_1)

B_(i+1)
=
N_(e_(i+1))
intersection
upward_closure(B_i).
~~~

Candidate exact result:

~~~text
A_i
=
upward_closure(B_i).
~~~

Therefore:

~~~text
T solves
IFF
B_k is empty.
~~~

Only the minimal antichain:

~~~text
MIN_P(B_i)
~~~

is required to reconstruct A_i and the next B_(i+1).

This gives a deterministic antichain recognizer dual to the removed-ideal recognizer.

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 5. Lead L11 — Boolean relation / matrix product form

Let:

~~~text
R
=
reflexive descendant-before-ancestor relation <=P.

D_e
=
identity relation restricted to N_e.
~~~

A resistance chain for word [e_1,...,e_k] is exactly a relational path through:

~~~text
D_(e_1)
R
D_(e_2)
R
...
R
D_(e_k).
~~~

Candidate exact criterion:

~~~text
T fails
IFF
D_(e_1) R D_(e_2) R ... R D_(e_k)
is nonempty.

T solves
IFF
that Boolean relation product is empty.
~~~

This is an algebraic derived view.

It does not prescribe dense matrices; sparse relations/bitsets/antichains are equivalent implementation views.

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 6. Lead L12 — positive coverage and negative resistance are exact dual witnesses

A8 proves:

~~~text
T solves
IFF
every maximal non-target path
has a nondecreasing susceptibility-cover embedding.
~~~

L9 predicts:

~~~text
T fails
IFF
there exists a nondecreasing resistant chain
through all treatment positions.
~~~

These are not the same witness object.

They are dual decision certificates:

~~~text
positive:
    every maximal path is covered

negative:
    one treatment-position-spanning
    resistance chain survives.
~~~

DP should preserve both rather than force one exclusive taxonomy.

Potential value:

- positive path view exposes SCS/common-supersequence structure;
- negative chain view exposes fast falsification and relational composition.

**Disposition:** HIGH-VALUE DERIVED DUALITY.

---

# 7. Lead L13 — complement language is downward closed under subsequence

A5 proves the solving language is upward closed under treatment insertion.

Therefore the nonsolving language is downward closed:

~~~text
T fails
AND
U <=subseq T
->
U fails.
~~~

The resistance-chain witness predicts a direct reason:

restrict a resistance chain to the retained treatment positions.

Unlike the solving language, the failing language need not have a finite set of maximal raw words; useless resistant treatments can often be repeated indefinitely.

This is a residual asymmetry worth preserving.

**Disposition:** EXPECTED EXACT CONSEQUENCE.

---

# 8. Cross-pass synthesis

If L8-L13 qualify:

~~~text
positive acceptance view:
    maximal-path susceptibility coverage
    finite path bases
    finite disjunctive common-supersequence family

negative rejection view:
    treatment-position-spanning resistance chain
    antichain frontier recurrence
    Boolean relation-product nonemptiness

shared primitive source:
    same finite precedence poset
    same effective susceptibility supports.
~~~

This yields two complementary exact interfaces to the same word language.

---

# 9. Falsification priorities

Before semantic admission:

1. test the resistance-chain recurrence on small DAGs/support sets;
2. test equality of frontier recurrence and full active-filter phase execution;
3. preserve equality-index chains q_i=q_(i+1), because one resistant type may survive multiple treatment phases;
4. do not incorrectly require strict descendant motion at every phase;
5. do not infer a finite maximal basis for the failing language merely from its downward closure.

---

# 10. Next action

Attempt Core-0.19 exact admission of:

- resistant-frontier antichain;
- resistant-chain failure theorem;
- deterministic B_i recurrence;
- Boolean relation-product criterion;
- downward-closed failure language.

Then rerun NEI only on the derived exact decision/certificate values, followed by one more DP residual pass.
