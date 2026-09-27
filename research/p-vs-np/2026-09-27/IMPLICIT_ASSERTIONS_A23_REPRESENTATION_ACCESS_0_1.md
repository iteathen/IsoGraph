# P versus NP implicit-assertion pass A23 — representation-relative support and accessible factorization

**Status:** admitted exact implicit assertions, round 23  
**Premise state:** A0 + corrected A1 + A2-A22  
**Experimental evidence source:** algorithm-hidden positive controls plus primitive CNF target projection  
**Purpose:** preserve the exact support/accessibility laws exposed by the controls without promoting AFE/RLEST into a universal solution architecture

Key supporting artifacts:

- research/p-vs-np/2026-09-27/positive-controls/POSITIVE_CONTROL_COMPARISON_0_1.md
- research/p-vs-np/2026-09-27/positive-controls/POSITIVE_CONTROL_COMMON_CORE_0_1.md
- research/p-vs-np/2026-09-27/target-cnf-sat/CNF_TARGET_IMPLICIT_ASSERTIONS_0_1.md
- research/p-vs-np/2026-09-27/target-cnf-sat/CNF_TARGET_AFE_DP08_RUN_0_1.md

A/F/E and RLEST remain derived discovery views only.

---

## IA-328 — exact retained-support size is representation-relative

### Body

The same exact target semantics may have materially different representation sizes under different exact support languages/factorizations.

Therefore a support-width quantity must be parameterized by its representation authority:

~~~text
W_i(R)
=
retained exact support size/width
at stage i
under representation family R.
~~~

A bare unqualified W_i is insufficient for representation-independent lower-bound claims.

### Exact witness

The CNF target family in CNF-IA-011/012 has:

- a projected function requiring exponentially many clauses in the tested explicit resolvent-CNF materialization;
- an exact compact OR-of-AND factorization of size proportional to the original group data.

### Disposition

ADMITTED EXACT.

---

## IA-329 — blowup in one exact representation is not a semantic lower bound

### Body

If exact semantics S has:

~~~text
large representation under R1
AND
small exact representation under R2,
~~~

then the R1 size lower bound does not establish a representation-independent computational lower bound for S.

### Support

IA-328 and its exact CNF witness.

### Consequence

A proof that one normal form, quotient materialization, clause set, state table, or other fixed support language becomes large must include an independent bridge showing that all admissible functional-polynomial computations are forced to pay an equivalent cost before it can support P != NP.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

---

## IA-330 — polynomial local cost in current support plus polynomial rank does not imply polynomial total cost

### Body

Suppose an exact transformation has:

1. one step polynomial in the **current** materialized support size;
2. at most polynomially many source-ranked steps.

These premises alone do not establish polynomial total cost in the **original input size**.

A retained-support bound is separately required.

### Exact witness

The CNF target one-variable elimination step generates at most quadratically many current clauses and is therefore polynomial in current support.

The CNF-IA-011 family nevertheless produces superpolynomial/exponential explicit clause support over a polynomially bounded sequence of source-ranked eliminations.

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-331 — polynomial retained support plus polynomial exact local operations and polynomial rank is sufficient

### Premises

For a bounded-existential instance of size n there is a deterministic exact support process with:

1. an initial support constructible in polynomial time;
2. every retained support encoded in at most p(n) size for one polynomial p;
3. every local exact transition/recurrence step computable in polynomial time in n and the retained support;
4. at most q(n) source-ranked stages for one polynomial q;
5. exact preservation of the target objective through every stage;
6. polynomial exact terminal extraction.

### Body

The bounded-existential projection is functionally polynomial.

### Support

Sequential composition of polynomially many polynomially bounded exact stages; use IA-093 for closure of the represented polynomial bounds.

### Disposition

ADMITTED EXACT CONDITIONAL.

### Firewall

The difficult premise is the independently established uniform retained-support/operation bound.

IA-331 does not supply it.

---

## IA-332 — compact representation without polynomial operation closure is insufficient

### Body

A representation may encode the current exact semantics in polynomial size while requiring superpolynomial expansion or work to perform the next required exact operation.

Therefore:

~~~text
polynomial representation size
    alone
does not imply
polynomial existential elimination.
~~~

The representation family must also provide polynomial access to the required next transitions, transformations, tests, or aggregate operations.

### Support

This is the representation-level analogue of IA-112:

~~~text
compact width
    !=
accessible width.
~~~

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

---

## IA-333 — transformation-local semantic certificates can justify exact replacement without a complete equivalence oracle

### Premise

For one local transformation:

~~~text
S -> T
~~~

there is an exact certificate/theorem establishing, under the declared target scope:

~~~text
TargetSemantics(S) IFF TargetSemantics(T)
~~~

for every remaining assignment/context relevant to the transformation.

### Body

T may replace S for subsequent target computation under that scope.

A complete algorithm for deciding equivalence of arbitrary S,T is not required.

### Support

Direct substitutability under exact scoped equivalence.

The PC-G row rewrite and CNF projected elimination are concrete witnesses.

### NEI firewall

The certificate may establish scoped SAME while S and T remain globally DISTINCT representations.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-334 — failure to obtain one local semantic certificate does not prove semantic inequivalence

### Body

If a chosen transformation-local certificate method is sound but incomplete, failure to produce its certificate for S,T does not establish:

~~~text
TargetSemantics(S) != TargetSemantics(T).
~~~

### Support

IA-333 supplies a sufficient certificate route, not a completeness converse.

This mirrors the simulation firewall in IA-315.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-335 — a universally accessible factorization-closed representation would imply existential closure

### Premises

For every functional-polynomial verifier V(x,w) with polynomial witness length, there is a representation family R such that:

1. the initial verifier/support representation is constructible in polynomial time;
2. one witness coordinate can be existentially projected exactly within R;
3. every such projection is polynomial-time constructible;
4. every intermediate R representation has size polynomial in the original input;
5. after all polynomially many witness coordinates are projected, the terminal Boolean result is polynomially extractable.

### Body

The bounded existential projection of V is functionally polynomial.

### Support

Apply IA-331 with one coordinate projection per source-ranked stage.

### Disposition

ADMITTED EXACT CONDITIONAL.

### Circularity firewall

Defining R by saying “store the exact projected answer compactly” does not discharge premises 1-4.

Universal accessible construction of such an R is already sufficient to settle the equality direction.

---

## IA-336 — semantic existence of compact factorization does not imply accessible construction

### Body

The statement:

~~~text
there exists a small exact representation/factorization
~~~

does not by itself provide:

- a polynomial constructor for that representation;
- a polynomial method for choosing among candidate factorizations;
- polynomial next-operation access.

### Support

Same existence-versus-construction distinction as IA-148, now applied to representations/factorizations.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

# A23 central result

The positive controls and CNF projection sharpen the campaign accessibility discipline to:

~~~text
semantic exactness
+
local polynomial operation
+
polynomial progress rank

still requires

polynomial retained support
+
polynomial operation closure
under an explicitly named representation authority.
~~~

And the lower-bound firewall becomes:

~~~text
large support in one representation
    !=
large support in every exact representation
    !=
model-wide computational lower bound.
~~~

Transformation-local exact SAME/equivalence certificates remain a non-circular way to exploit identity without globally classifying arbitrary semantic equivalence.

# Non-admission

A23 does NOT admit:

~~~text
AFE is exhaustive
RLEST characterizes P
every CNF projection has a polynomial factorization
every CNF projection requires superpolynomial support
fixed-normal-form blowup proves P != NP
compact factorization proves P = NP.
~~~

# P-vs-NP status

OPEN.
