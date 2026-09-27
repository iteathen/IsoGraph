# CNF target implicit assertion closure 0.1

**Status:** target-local exact implicit assertions and falsifiers
**Primitive premise:** CNF_TARGET_PRIMITIVE_0_1.isg
**Source premise:** CNF_TARGET_SOURCE_FREEZE_0_1.md
**Purpose:** project the positive-control A/F/E leads without importing a solver

No assertion below is source-explicit.

## CNF-IA-001 — witness-list identity factors through assignment membership

Two witness lists that contain exactly the same VL variables give the same truth value to every source clause.

**Disposition:** ADMITTED EXACT.

## CNF-IA-002 — tautological clause deletion is exact

If one clause contains both:

~~~text
POS(c,x)
NEG(c,x)
~~~

for the same variable x, then the clause is true under every assignment.

Deleting that clause preserves the complete satisfying-assignment set of the conjunction.

**Disposition:** ADMITTED EXACT.

## CNF-IA-003 — clause subsumption supplies an exact local redundancy law

Represent a non-tautological clause by its signed literal set.

If signed literal set C is a subset of signed literal set D, then every assignment satisfying C also satisfies D.

Therefore, in a conjunction containing both C and D, D may be deleted without changing the complete satisfying-assignment set.

**Disposition:** ADMITTED EXACT.

### NEI firewall

The two clause objects are not globally SAME.

D is redundant only in the containing conjunction scope where C is retained.

## CNF-IA-004 — exact aggregate split on one variable

For one variable x and all remaining variables y:

~~~text
exists x:
    F(x,y)

IFF

F(0,y)
OR
F(1,y).
~~~

This is pure existential case splitting over the exact two-value Boolean carrier.

**Disposition:** ADMITTED EXACT.

**AFE connector:** A = exact aggregation of the two x alternatives by OR.

### Complexity firewall

The equality does not imply polynomial retained support under repeated splitting.

Materializing both branches at each uneliminated coordinate permits a binary expansion unless further exact sharing/factorization is independently recovered.

## CNF-IA-005 — exact local forcing from a single unresolved literal

Consider a partial assignment.

If one clause has:

- every but one literal already false;
- one remaining unassigned literal l;

then every satisfying extension must make l true.

If all literals of a clause are already false, no satisfying extension exists.

**Support:** direct source OR semantics.

**Disposition:** ADMITTED EXACT.

**AFE connector:** F = sound local forcing.

## CNF-IA-006 — local forcing is incomplete

Take:

~~~text
(x OR y)
AND
(NOT x OR NOT y).
~~~

Under the empty partial assignment:

- no clause is false;
- neither clause has only one unresolved literal;
- no value of x or y is locally forced by CNF-IA-005;
- the formula is not decided.

Yet satisfying assignments exist.

Thus local forcing may stall while the existential target remains unresolved.

**Disposition:** ADMITTED EXACT FALSIFIER.

## CNF-IA-007 — prepare exact elimination of one variable

First delete tautological clauses by CNF-IA-002.

For variable x partition the remaining clauses into:

~~~text
P_x = clauses containing positive x
N_x = clauses containing negative x
U_x = clauses containing neither sign of x.
~~~

For C in P_x, let C^- remove positive x.

For D in N_x, let D^- remove negative x.

Define the pair resolvent:

~~~text
RES(C,D)
=
C^- union D^-.
~~~

If RES(C,D) contains both signs of any variable, it is tautological and may be omitted.

Define:

~~~text
ELIM_x(F)
=
U_x
AND
all non-tautological RES(C,D)
for C in P_x, D in N_x.
~~~

This is a derived support transformation over signed literal sets.

## CNF-IA-008 — one-variable elimination preserves the exact projected solution set

For every assignment y to all variables except x:

~~~text
exists x:
    F(x,y)

IFF

ELIM_x(F)(y).
~~~

### Forward proof

Assume one x value satisfies F.

All U_x clauses are satisfied.

For each C in P_x and D in N_x:

- if x=0, C cannot rely on positive x, so C^- is satisfied;
- if x=1, D cannot rely on negative x, so D^- is satisfied.

Thus C^- OR D^- is satisfied in either case.

### Reverse proof

Assume ELIM_x(F)(y).

If every C^- for C in P_x is satisfied, choose x=0:

- every P_x clause is satisfied by C^-;
- every N_x clause is satisfied by negative x;
- U_x is already satisfied.

Otherwise choose one C0 whose C0^- is false.

For every D in N_x, the resolvent C0^- OR D^- is true, so D^- must be true.

Choose x=1:

- every P_x clause is satisfied by positive x;
- every N_x clause is satisfied by D^-;
- U_x is already satisfied.

Thus some x extends y to a source model.

**Disposition:** ADMITTED EXACT.

**AFE connector:** E = exact coordinate elimination by projection-preserving transform.

## CNF-IA-009 — one local elimination step is polynomial in the current explicit clause support

Let:

~~~text
p = |P_x|
q = |N_x|
m = current clause count.
~~~

At most:

~~~text
p*q <= m^2
~~~

raw pair resolvents are generated.

Each resolvent can be constructed by finite scans of signed literal lists.

Thus one step is polynomial in the **current materialized support size**.

**Disposition:** ADMITTED EXACT.

### Important firewall

Polynomial in the current support is not yet polynomial in the original input if previous steps have expanded that support.

## CNF-IA-010 — exact one-step quadratic support growth survives tautology and subsumption pruning

For k>=1 use variables:

~~~text
x
a_1,...,a_k
b_1,...,b_k
~~~

and clauses:

~~~text
(x OR a_i)       for i=1..k
(NOT x OR b_j)   for j=1..k.
~~~

The input has 2k clauses.

Eliminating x yields all:

~~~text
(a_i OR b_j)
~~~

for i,j in 1..k.

There are k^2 distinct clauses.

None is tautological.

All have exactly two distinct positive literals, so no distinct one subsumes another.

Therefore exact clause-list support can grow quadratically in one rank-consuming step even after the local pruning laws CNF-IA-002/003.

**Disposition:** ADMITTED EXACT FALSIFIER.

## CNF-IA-011 — a multi-level family produces exponential materialized clause growth for the frozen source order

Choose d elimination variables:

~~~text
x_1,...,x_d
~~~

and for every sign vector:

~~~text
sigma in {+,-}^d
~~~

create k private variables:

~~~text
a_(sigma,1),...,a_(sigma,k).
~~~

For each sigma and i create one clause containing:

- the sigma-selected sign of every x_j;
- positive private literal a_(sigma,i).

There are:

~~~text
2^d * k
~~~

input clauses.

Freeze VL order with x_1,...,x_d before the private variables.

### Eliminate x_1

A resolvent between opposite x_1 groups is non-tautological only when all remaining x_2...x_d signs match.

Any mismatch contributes both signs of a later x_j and is removed as tautological.

For each remaining sign vector, the surviving group therefore contains:

~~~text
k^2
~~~

clauses.

### Induction

After eliminating x_1,...,x_r, for each remaining sign vector on x_(r+1)...x_d there are exactly:

~~~text
k^(2^r)
~~~

surviving clauses.

Each clause contains one positive private variable selected from each of the 2^r predecessor sign groups.

Eliminating x_(r+1) pairwise combines the two opposite-sign predecessor groups, yielding:

~~~text
(k^(2^r))^2
=
k^(2^(r+1)).
~~~

Cross-group sign mismatches remain tautological and are omitted.

### After d eliminations

There are:

~~~text
k^(2^d)
~~~

distinct non-tautological clauses.

Each clause has the same number of positive private literals and a distinct selection tuple, so no distinct clause subsumes another.

For fixed k=2:

~~~text
input clause count = 2^(d+1)

output clause count = 2^(2^d),
~~~

which is exponential in the input clause count.

**Disposition:** ADMITTED EXACT FALSIFIER OF EXPLICIT CLAUSE-LIST WIDTH FOR THIS ELIMINATION ORDER.

### Scope restriction

This does **not** prove that every elimination order or every exact representation must blow up.

It falsifies only the claim that exact local elimination + polynomial source rank automatically keeps explicit CNF support polynomial.

## CNF-IA-012 — the exponential clause family has a compact alternate factorization

For the family in CNF-IA-011, after all x variables are existentially removed, let each original sign group sigma have private variables:

~~~text
A_sigma = {a_(sigma,1),...,a_(sigma,k)}.
~~~

The huge resolvent CNF says:

> for every tuple choosing one private variable from each sign group, at least one chosen variable is true.

This is false exactly when every sign group contains at least one false private variable.

Therefore it is equivalent to the compact factorization:

~~~text
OR over sigma:
    AND over i=1..k:
        a_(sigma,i).
~~~

That factorized form has size proportional to the original 2^d*k private-literal data.

**Disposition:** ADMITTED EXACT.

### Discovery significance

The CNF-IA-011 explosion is representation-dependent.

It is **not** a representation-independent semantic lower bound.

The alternate factorization is an exact DP-required competing interpretation and prevents a false lower-bound inference.

## CNF-IA-013 — retained-support width is representation-relative

CNF-IA-011 and CNF-IA-012 exhibit one semantic projection with:

~~~text
exponential explicit CNF clause support
AND
polynomial compact factorized support.
~~~

Therefore the campaign quantity W_i must name its representation/factorization authority.

Raw clause count cannot be used as a universal measure of semantic complexity.

**Disposition:** ADMITTED EXACT.

## CNF-IA-014 — exact factorization still needs accessible future operations

A compact factorization at one stage is useful only if subsequent coordinate elimination, target extraction, and identity/redundancy operations remain polynomial over that representation.

A compact description that requires expansion before the next exact step has not discharged the accessibility burden.

**Disposition:** ADMITTED EXACT SUPPORT RESTRICTION.

## CNF-IA-015 — empty clause is an exact rejection invariant

Any retained support containing an empty clause has no satisfying assignment.

This gives a local exact NO certificate.

**Disposition:** ADMITTED EXACT.

## CNF-IA-016 — complete assignment truth is polynomially checkable but does not solve existential selection

Given one complete witness assignment, every clause can be checked by finite scans.

This is the source verifier property.

It does not construct a satisfying witness or establish absence of all witnesses.

**Disposition:** ADMITTED EXACT SUPPORT RESTRICTION.

# Projection synthesis

The target recovers all three A/F/E local modes:

~~~text
A:
    exact Boolean case aggregation

F:
    exact local forced literal

E:
    exact projected clause elimination.
~~~

But none yet supplies the missing universal polynomial retained-support theorem:

- A can branch without recovered sharing;
- F can stall;
- E can blow up in explicit CNF representation;
- E's blowup may itself factor compactly, so it is not a semantic lower bound.

The sharpened open target is:

~~~text
find a polynomially constructible exact factorized representation
whose size remains polynomial
and whose next local operations remain polynomial
throughout source-ranked existential elimination.
~~~

# Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
