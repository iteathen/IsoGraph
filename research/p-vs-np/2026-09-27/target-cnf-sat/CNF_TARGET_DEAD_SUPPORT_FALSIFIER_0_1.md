# CNF target — dead-support filtering falsifier 0.1

**Status:** exact target-specific falsifier
**Parent target:** CNF_TARGET_IMPLICIT_ASSERTIONS_0_1.md
**Family:** CNF-IA-011 explicit-elimination support-growth family
**Purpose:** test whether the new A25 dead-support filtering mechanism explains or removes the previously observed factorization blowup

## 1. Family

Use elimination variables:

~~~text
x_1,...,x_d
~~~

and, for every sign vector:

~~~text
sigma in {+,-}^d,
~~~

private variables:

~~~text
a_(sigma,1),...,a_(sigma,k).
~~~

For each sigma and i, the source formula contains one clause:

~~~text
L_(sigma,1)
OR ...
OR
L_(sigma,d)
OR
a_(sigma,i),
~~~

where L_(sigma,j) is the sigma-selected sign of x_j.

This is exactly the family used by CNF-IA-011.

## 2. Every complete x assignment has a satisfying private-variable extension

Fix any complete truth assignment tau to:

~~~text
x_1,...,x_d.
~~~

There is exactly one sign vector sigma* whose selected literal is false under tau in every x coordinate.

For every other sigma:

~~~text
sigma != sigma*
~~~

there is at least one coordinate where the sigma-selected x literal is true.

Therefore every clause belonging to sigma != sigma* is already satisfied by the x assignment.

The only remaining clauses are:

~~~text
a_(sigma*,1)
...
a_(sigma*,k),
~~~

one per private variable in the sigma* group.

Set:

~~~text
a_(sigma*,i)=TRUE
for every i.
~~~

All remaining clauses are satisfied.

Thus every complete x assignment has an accepting continuation.

## 3. Every partial x assignment is live

Take any partial assignment to any prefix/subset of the x variables.

Extend the remaining x variables arbitrarily to a complete assignment tau.

Section 2 then constructs a private-variable completion.

Therefore every partial x assignment has at least one satisfying continuation.

In residual notation:

~~~text
E(p)=TRUE
~~~

for every residual prefix p consisting only of assignments to x variables.

## 4. Dead-support consequence

For every x-choice edge while x variables remain:

~~~text
exact DEAD(child)=FALSE.
~~~

Hence even the complete exact dead filter contains no x-choice edge.

Therefore:

~~~text
all-legal simulation obligations
=
exact live-child simulation obligations
~~~

through the x-coordinate portion of this family.

No sound DEADHAT relation can remove an x edge because no such edge is actually dead.

## 5. Interaction with the earlier support blowup

CNF-IA-011 showed that the tested exact explicit-CNF variable elimination produces:

~~~text
k^(2^d)
~~~

materialized clauses after eliminating all x variables.

CNF-IA-012 showed that the same projected function admits a compact alternate factorization.

The present result adds:

~~~text
perfect dead-support filtering
    does not reduce the x branching/support
    for this family.
~~~

Thus the three facts coexist:

~~~text
all x branches live

explicit CNF elimination blows up

compact exact factorization exists.
~~~

## 6. DP falsifier

This rejects the universal proposal:

~~~text
exact/sound dead-support filtering
alone
is sufficient to control retained support
for bounded existential projection.
~~~

Dead filtering handles semantically empty support.

It does not compress a large family of mutually live alternatives.

That burden remains with:

- dominance/inclusion where available;
- identity/equality where available;
- exact factorization;
- aggregate recurrence/sharing;
- another exact support-compression topology.

## 7. Truth status

This is a restricted exact family result.

It does not establish P=NP or P!=NP.
