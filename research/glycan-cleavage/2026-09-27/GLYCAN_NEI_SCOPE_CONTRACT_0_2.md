# Glycan cleavage NEI semantic scope contract 0.2

**Status:** successor scope contract for NEI pass 2
**Date:** 2026-09-27
**Supersedes for this campaign:** GLYCAN_NEI_SCOPE_CONTRACT_0_1.md
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1
**Inputs:** verified primitive graph + A1 + A2

All 0.1 scopes remain valid. Version 0.2 adds objective and rooted-subtree quotient scopes exposed by A2.

## Q-G-FRONTIER — exact lossless frontier value

For a valid state S define:

~~~text
FR(S) = exact set of terminal represented nodes in S.
~~~

G-IA043 establishes:

~~~text
FR(S1)=FR(S2)
IFF
181003(S1,S2).
~~~

Therefore Q-G-FRONTIER has exactly the same classes as Q-G-STATE and Q-G-CONTINUATION.

It is an alternate exact representation, not a coarser identity.

## Q-G-SOLVE-LANGUAGE — target-reaching continuation language

Fix one well-formed instance.

For valid state S define:

~~~text
L(S)
=
{ finite treatment sequences T |
  execute(T,S) =ext TG }.
~~~

The identity object is the exact set L(S).

Scoped SAME:

~~~text
L(S1)=L(S2).
~~~

Scoped DISTINCT is established by one exact separating treatment sequence:

~~~text
T in L(S1)
AND
T notin L(S2)

or conversely.
~~~

This scope may identify extensionally different current states.

It is objective-specific and must not be promoted to Q-G-STATE SAME.

## Q-G-MIN-REMAIN — minimum remaining treatment value

Fix one well-formed instance.

Define exact aggregate:

~~~text
D(S)
=
minimum LENGTH(T) over T in L(S),
or INF when L(S) is empty.
~~~

The identity object is the exact value D(S).

Scoped SAME means exact equality of D values.

Q-G-SOLVE-LANGUAGE SAME implies Q-G-MIN-REMAIN SAME.

The converse is not assumed: two states can have the same optimum length while permitting different solving suffixes.

## Q-G-PREFIX-SEARCH-NODE — optimization-search state

For minimum-value search define the exact pair:

~~~text
(current Q-G-STATE value, accumulated prefix length).
~~~

Equality of both components is scoped SAME.

Same state with unequal accumulated lengths is not SAME under this pair scope; the lower-cost node dominates the higher-cost node by G-IA050.

This scope is search bookkeeping, not global identity of prefix histories.

## Q-G-LOCAL-ACTION-VALUE — one-step objective value

Fix valid state S.

For treatment operator e define:

~~~text
A_S(e)
=
D(C_e(S)).
~~~

The one-treatment cost is common to every candidate e, so equality of A_S values is exact equality of the remaining optimum-value observable after one treatment.

Scoped SAME of A_S does not imply phase-transformer SAME and does not make operators interchangeable under arbitrary suffix sets.

It is useful only for the minimum-value objective at this state.

## Q-G-ROOTED-SUBTREE-STRUCTURE — exact rooted labeled descendant structure

Fix the parent authority P, target set TG, operator carrier EL, and susceptibility relation M.

For represented node r define its rooted descendant structure as:

- raw root position r;
- all represented descendants of r;
- parent incidence restricted to that descendant carrier;
- target-membership flag of every descendant;
- exact susceptibility vector over EL for every descendant.

Two such rooted structures have scoped SAME when there exists an exact root-preserving bijection that preserves and reflects:

~~~text
parent incidence
target membership
every M(e,node) incidence
~~~

This is structural quotient identity.

It does not assert global natural identity of the raw nodes or subtrees.

## Q-G-ROOTED-SUBTREE-BEHAVIOR — all-treatment rooted behavior

Fix one instance and one represented rooted descendant region.

For its root r define the exact behavior value as the response of that rooted region to every finite global treatment sequence, including:

- which represented positions survive after each prefix, modulo the rooted structural correspondence;
- in particular whether the subtree root survives after each prefix.

Two rooted subtrees are scoped SAME when these exact response functions agree under a root-preserving correspondence.

Exact Q-G-ROOTED-SUBTREE-STRUCTURE SAME is a sufficient certificate for Q-G-ROOTED-SUBTREE-BEHAVIOR SAME because the transition rules use only preserved P, TG, and M structure.

The converse is not assumed.

## Q-G-PHASE-DOMINANCE remains a preorder, not identity

For operators e1,e2 define:

~~~text
e2 dominates e1
IFF
forall valid S:
    C_e2(S) subset C_e1(S).
~~~

This is an ordinary preorder.

Mutual phase dominance implies pointwise extensional equality and therefore Q-G-PHASE-TRANSFORMER SAME.

One-way dominance does not imply SAME.

## Q-G-SOLVE-DOMINANCE remains a preorder, not identity

For valid states define:

~~~text
S1 dominates S2
IFF
L(S2) subset L(S1).
~~~

G-IA047 gives one sufficient theorem:

~~~text
S1 subset S2
-> S1 dominates S2.
~~~

Mutual solve dominance is exactly Q-G-SOLVE-LANGUAGE SAME.

One-way solve dominance is not an NEI SAME result.

## Global identity and QU boundaries

The global raw-object INCOMPLETE dispositions from 0.1 remain unchanged.

No semantic UNKNOWN is introduced merely because calculating one of the exact quotient values may be expensive.

Future uncertainty in P, TG, M, reaction outcome, or state transition would require qualified QU before the affected identity scope could be classified.
