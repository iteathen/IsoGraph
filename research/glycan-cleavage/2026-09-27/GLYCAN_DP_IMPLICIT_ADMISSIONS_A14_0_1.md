# Glycan cleavage DP-fed implicit admissions A14 — unique dominance boundary 0.1

**Status:** exact implicit assertions admitted after qualified DP run 0.3
**Date:** 2026-09-27
**Discovery parent:** GLYCAN_DP07_RUN_0_3.md
**Semantic admission authority:** qualified Core 0.19
**Prior exact closure:** G-IA001..G-IA291
**QU dependency:** none in frozen 0.1 scope

---

## Relation between B_M and B_global

### G-IA292 — every dominance-minimal solving word is raw-subsequence-minimal

Ordinary raw subsequence is the special case of <=Msub in which every matched symbol is equal and therefore mutually dominance-equivalent.

If B in B_M had a proper raw subsequence U that also solved, then:

~~~text
U <Msub B,
~~~

contradicting <=Msub minimality.

Therefore:

~~~text
B_M subseteq B_global.
~~~

### G-IA293 — B_M is exactly the <=Msub-minimal part of B_global

Let:

~~~text
MIN_M(B_global)
~~~

be the members of B_global having no distinct B' in B_global with:

~~~text
B' <=Msub B.
~~~

Then:

~~~text
B_M = MIN_M(B_global).
~~~

**First inclusion.**

G-IA292 puts B_M inside B_global.

A B_M member cannot have a smaller solving B' in B_global by definition.

**Reverse inclusion.**

Let B in B_global but B not in B_M.

Then some solving word U satisfies:

~~~text
U <Msub B.
~~~

Delete raw treatment occurrences from U while preserving solvability until a raw-subsequence-minimal solving word U0 is reached.

Then:

~~~text
U0 in B_global
U0 <=subseq U
U <=Msub B.
~~~

Hence:

~~~text
U0 <=Msub B.
~~~

The relation is strict because B was assumed not dominance-minimal.

Therefore B is not in MIN_M(B_global).

### G-IA294 — B_M is finite and uniquely determined by (L_global, <=Msub)

The exact solving language determines which raw words are solving.

The fixed effective-susceptibility preorder determines <=Msub.

Minimal elements of that exact set under that exact preorder are extensionally determined.

Therefore B_M is unique.

No enumeration order, representative choice, or solver implementation enters the value.

---

## Exact dominance-pattern language

### G-IA295 — define symbol dominance up-sets

For each raw operator a define:

~~~text
UP(a)
=
{ b in EL |
  S*_a subseteq S*_b }.
~~~

This set is nonempty because a belongs to UP(a).

It is upward closed under effective susceptibility dominance.

### G-IA296 — one dominance-basis word defines one finite set-valued subsequence pattern

For:

~~~text
B=[a_1,...,a_m],
~~~

the condition:

~~~text
B <=Msub T
~~~

holds exactly when T contains positions:

~~~text
i_1 < ... < i_m
~~~

with:

~~~text
T[i_j] in UP(a_j)
~~~

for every j.

Equivalently, its language is represented by the finite pattern:

~~~text
Sigma*
UP(a_1)
Sigma*
UP(a_2)
...
Sigma*
UP(a_m)
Sigma*.
~~~

UP(a_j) denotes a finite allowed-symbol class at that ordered position.

### G-IA297 — finite exact dominance-pattern expression for the complete solution language

Using A12 G-IA275:

~~~text
T solves
IFF
exists B in B_M:
    B <=Msub T.
~~~

Therefore:

~~~text
L_global
=
union over B=[a_1,...,a_m] in B_M of

Sigma*
UP(a_1)
Sigma*
UP(a_2)
...
Sigma*
UP(a_m)
Sigma*.
~~~

This is an exact finite representation because B_M and EL are finite.

It does not import an external regular-language theorem.

---

## Exact monotone decision boundary

### G-IA298 — the solution language is an upset of the dominance-subsequence preorder

A12 already establishes:

~~~text
U solves
AND
U <=Msub V
->
V solves.
~~~

Thus L_global is upward closed under <=Msub.

### G-IA299 — the failing language is the complementary downset under <=Msub

If:

~~~text
V fails
AND
U <=Msub V,
~~~

then U fails.

Otherwise U would solve, and G-IA298 would force V to solve.

Resistance-chain interpretation gives the same result:

- deleting word positions preserves a restricted resistant chain;
- replacing a retained treatment by a weaker operator enlarges its resistance support, so every previously resistant witness remains resistant.

### G-IA300 — B_M is the unique minimal TRUE boundary antichain

By definition and G-IA294:

~~~text
B_M
=
the exact set of <=Msub-minimal solving words.
~~~

Therefore:

- every B in B_M solves;
- no strictly smaller word under <=Msub solves;
- every solving word lies above at least one B in B_M;
- no two distinct B_M members strictly dominate one another under <=Msub.

B_M is the unique minimal TRUE boundary of the exact treatment-language decision function under the declared preorder.

### G-IA301 — no finite maximal FALSE boundary is implied

The word domain is unbounded in length.

A failing word may remain failing after arbitrarily many repetitions of treatments that do not break its resistance certificate.

Therefore the complementary downset need not possess a finite set of maximal raw failing words.

The finite TRUE boundary B_M has no automatically symmetric finite FALSE-boundary theorem.

---

## Value-search / language-boundary duality

### G-IA302 — optimum-value reduction moves upward in operator dominance

A9/A10 show:

~~~text
for optimum value or one optimum witness,
dominated operator occurrences may be upgraded
toward inclusion-maximal operators.
~~~

This preserves solution existence and length.

### G-IA303 — complete-language minimal generators lie at the lower solving boundary

B_M instead retains solving words for which no combination of:

- treatment deletion;
- symbol weakening in the effective-susceptibility order

remains solving.

Thus value-search compression and complete-language generator compression use opposite directions of the same operator preorder.

This explains, exactly, why maximal-operator restriction can preserve OPT while failing to preserve the raw optimum family or complete raw language without expansion provenance.

---

## DP-fed A14 disposition

~~~text
new exact implicit assertions:          12
cumulative exact implicit assertions: 303

B_M relation to B_global:
    exact

B_M uniqueness:
    established

complete solution language:
    finite union of dominance
    set-valued subsequence patterns

solution set:
    <=Msub upset

failure set:
    <=Msub downset

B_M:
    unique minimal TRUE boundary

finite maximal FALSE boundary:
    NOT IMPLIED

new QU dependencies:
    0
~~~

The next NEI pass must treat B_M as an exact boundary value under the fixed effective-susceptibility preorder. After that qualified DP will run one residual/no-new pass.
