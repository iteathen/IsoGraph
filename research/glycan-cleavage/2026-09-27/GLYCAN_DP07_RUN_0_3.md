# Glycan cleavage Discovery Protocol 0.1–0.7 run 0.3

**Status:** third discovery pass over admitted phase/resistance algebra
**Date:** 2026-09-27
**Authority:** qualified cumulative DP 0.1–0.7
**Inputs:** A12/NEI12 + A13/NEI13

This pass targets minimal generating structure and the residual boundary between optimization-value reduction and complete-language representation.

---

# 1. Current exact dual structure

Positive side:

~~~text
solving language
    upward closed under:
        raw symbol insertion
        susceptibility-dominating substitution.
~~~

Negative side:

~~~text
failing language
    downward closed under:
        raw symbol deletion
        susceptibility-weakening substitution.
~~~

Exact word preorder from A12:

~~~text
u <=Msub v
~~~

when u embeds into v with every embedded symbol dominated by the corresponding v symbol.

A12 defines B_M as <=Msub-minimal solving words and proves it finite and complete.

DP now asks whether B_M is the unique exact boundary antichain and how it relates to B_global.

---

# 2. Lead L14 — B_M is the minimal subset of B_global under dominance-subsequence

Candidate facts:

1. Every B_M member is raw-subsequence-minimal, because ordinary subsequence is the equality-symbol special case of <=Msub.
2. Therefore:

~~~text
B_M subseteq B_global.
~~~

3. If a raw B_global word is not <=Msub-minimal among B_global, it is not in B_M.
4. Conversely if B in B_global is not globally <=Msub-minimal, take a smaller solving u <=Msub B and reduce u by ordinary deletion to some u0 in B_global. Then:

~~~text
u0 <=Msub B.
~~~

Thus:

~~~text
B_M
=
the <=Msub-minimal elements of B_global.
~~~

This would make B_M directly computable from the already finite raw basis without searching arbitrary long words.

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 3. Lead L15 — B_M is unique

Minimal elements of an exact set under a fixed preorder are extensionally determined by that set/preorder.

Therefore B_M should be unique for the frozen:

~~~text
(L_global, <=Msub)
~~~

pair.

This would strengthen Q-G-DOMINANCE-LANGUAGE-BASIS from "a finite basis" to "the unique minimal basis under the declared generalized order."

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 4. Lead L16 — finite set-valued subsequence-pattern expression

For raw operator a define its dominance up-set:

~~~text
UP(a)
=
{ b in EL |
  S*_a subseteq S*_b }.
~~~

For basis word:

~~~text
B=[a_1,...,a_m],
~~~

the language:

~~~text
{ T | B <=Msub T }
~~~

is exactly the set of raw words containing, in order, one symbol from:

~~~text
UP(a_1),...,UP(a_m)
~~~

at strictly increasing positions.

Therefore candidate exact expression:

~~~text
L_global
=
union over B in B_M of

Sigma*
UP(a_1)
Sigma*
UP(a_2)
...
Sigma*
UP(a_m)
Sigma*.
~~~

Here UP(a_i) is a finite symbol class, not one literal symbol.

This may be the smallest exact finite pattern-language view exposed so far.

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 5. Lead L17 — generalized word order is the exact monotonicity order of acceptance

A12 proves:

~~~text
u solves
AND
u <=Msub v
->
v solves.
~~~

A13 predicts the exact dual:

~~~text
v fails
AND
u <=Msub v
->
u fails.
~~~

because u is obtained by deleting treatment opportunities and/or weakening retained operators.

Resistance-chain witness:

- delete positions from v's resistant chain;
- when a retained symbol is weakened, its resistance set only grows, so the same node remains resistant.

Thus <=Msub may be the exact declared order making:

~~~text
solutions = an upset
failures  = its complementary downset.
~~~

**Disposition:** HIGH-VALUE CANDIDATE.

---

# 6. Lead L18 — unique boundary antichain

If L14-L17 hold, B_M is exactly the set of minimal TRUE points of the treatment-language decision function under <=Msub.

There is no analogous finite maximal FALSE antichain requirement because the word poset is unbounded upward and failing words may repeat ineffective weak symbols arbitrarily.

This asymmetry is structural, not a missing theorem.

**Disposition:** EXPECTED DERIVED VIEW.

---

# 7. Optimization versus complete-language residual

DP preserves a useful tension.

For optimum value / one witness:

~~~text
move symbols UP the susceptibility preorder
toward maximal operators.
~~~

For minimal complete-language generators:

~~~text
retain the minimal solving boundary
under the same preorder.
~~~

Thus:

~~~text
value search compression
and
language-generator compression
move in opposite order directions.
~~~

Neither subsumes the other.

This explains why deleting dominated raw operators is safe for one optimum witness but unsafe for the complete raw trajectory family.

**Disposition:** HIGH-VALUE SYNTHESIS VIEW.

---

# 8. Derived cross-domain views

The primitive/admitted structure now supports several overlapping higher-level views:

### Finite closure-system view

~~~text
order ideals
+
meet-preserving closure operators
+
shortest generator word to top.
~~~

### Monotone planning view

~~~text
actions only add removed facts
never restore them
goal = top ideal.
~~~

### Partially ordered recognizer view

~~~text
all transitions move upward
no nontrivial state cycles.
~~~

### Positive finite subsequence-pattern view

~~~text
finite minimal solving patterns
+
symbol dominance classes.
~~~

### Positive/negative certificate view

~~~text
positive:
    susceptibility path coverage

negative:
    spanning resistant chain.
~~~

These are derived views, not imported ontologies or external equivalence claims.

No external novelty conclusion is drawn.

---

# 9. Falsification targets before admission

Reject or narrow the leads if:

1. a B_M word has a proper solving raw subsequence;
2. a B_global word has no smaller B_global dominance-predecessor but is still not B_M;
3. generalized dominance-subsequence weakening can turn a known failing word into a solution;
4. the set-valued pattern expression accepts a word outside L_global;
5. the same (L_global,<=Msub) pair admits two different minimal basis sets.

No such structural counterexample is currently visible.

---

# 10. Next action

Attempt Core-0.19 admission of L14-L17.

Then rerun NEI on:

- unique dominance-aware basis value;
- solution-upset / failure-downset identity;
- finite set-valued pattern representation.

After that run one DP residual/no-new pass.

If no new load-bearing lead survives that pass within the frozen 0.1 scope, stop the DP campaign and report the discovered structures plus falsifiers/residual boundaries.
