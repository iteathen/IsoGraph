# Glycan cleavage NEI semantic scope contract 0.1

**Status:** current identity-scope contract for the glycan 0.1 fixed-point campaign
**Date:** 2026-09-27
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1
**Primitive authority:** verified GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
**Implicit input:** GLYCAN_IMPLICIT_ASSERTIONS_A1_0_1.md

This contract defines exact identity questions without predeclaring their answers.

All SAME/DISTINCT results below are scoped value identities. They do not silently promote underlying raw carrier objects to global natural coidentity/separation.

## Q-G-STATE — extensional represented state value

Carrier presented by: duplicate-free represented state-list objects.

Identity object:

~~~text
the exact membership function
    r -> MEMBER(r,S)
over the represented raw element carrier.
~~~

Exact equality theorem:

~~~text
STATE_EQ(S1,S2)
IFF
181003(S1,S2)
IFF
S1 subset S2 AND S2 subset S1.
~~~

Therefore, for instantiated states under this scope:

~~~text
181003(S1,S2)
    -> scoped SAME

exact separating member x
    -> scoped DISTINCT
~~~

This does not assert that two distinct list referents are globally the same list object.

## Q-G-CONTINUATION — all-future treatment behavior

Fix exactly one well-formed instance:

~~~text
RL, EL, TG, root, P, M.
~~~

For one current state S define the exact continuation value:

~~~text
K_S(T) = final extensional state obtained
         by executing finite treatment suffix T from S.
~~~

G-IA019/G-IA020 make every head phase total and output-functional extensionally.
G-IA030 makes finite suffix execution depend only on current extensional state.

Exact identity theorem:

~~~text
Q-G-CONTINUATION SAME(S1,S2)
IFF
181003(S1,S2).
~~~

Proof:

- forward from 181003 to continuation equality: G-IA030;
- reverse: the admissible suffix domain contains the empty suffix, whose result is the current extensional state itself.

Thus Q-G-CONTINUATION and Q-G-STATE have the same exact classes for the frozen instance.

This is equality of the entire represented future treatment behavior, not merely equal current labels.

## Q-G-PHASE-OUTPUT — one saturated phase result

Fix one instance, one operator e, and one start state S.

Identity object:

~~~text
the final extensional state produced by a complete e phase from S.
~~~

By G-IA019 every valid complete microscopic trace has the same extensional final state.

Therefore all such trace outcomes are scoped SAME under Q-G-PHASE-OUTPUT.

Different microscopic trace objects are not thereby globally SAME.

## Q-G-HISTORY — prefix history under future-behavior observation

Fix one instance.

A prefix history is observed only through:

~~~text
current extensional state
+
all possible future finite treatment suffixes.
~~~

If two distinct treatment prefixes reach extensionally equal states, G-IA030 makes them scoped SAME under Q-G-HISTORY.

Their sequence/list identities remain separate.

If their current states differ, the empty future suffix distinguishes them, so their Q-G-HISTORY values are DISTINCT.

## Q-G-SUSCEPTIBILITY — static operator susceptibility vector

Fix one instance and its represented RL/M.

For operator e define exact vector value:

~~~text
V_e(r) = M(e,r)
for every r in RL.
~~~

Scoped SAME means pointwise equality:

~~~text
forall r in RL:
    M(e1,r) IFF M(e2,r).
~~~

One exact separating represented r proves scoped DISTINCT of the vector values.

This does not imply global natural identity of e1 and e2.

## Q-G-PHASE-TRANSFORMER — operator action on all valid states

Fix one instance.

For operator e define:

~~~text
F_e(S) = C_e(S)
~~~

over the complete finite domain of valid ancestor-closed states containing TG.

Scoped SAME means exact pointwise extensional equality of F values:

~~~text
forall valid S:
    C_e1(S) =ext C_e2(S).
~~~

G-IA036 establishes:

~~~text
Q-G-SUSCEPTIBILITY SAME
    -> Q-G-PHASE-TRANSFORMER SAME.
~~~

The converse is not assumed.

Different susceptibility tuples may be behaviorally masked by target protection or permanent blocking structure.

One valid state whose closures differ is an exact separating witness for Q-G-PHASE-TRANSFORMER DISTINCT.

## Q-G-SEQUENCE-TRANSFORMER — finite trajectory action

Fix one instance.

For finite operator sequence T define:

~~~text
F_T(S) = final extensional state from executing T from valid S.
~~~

Scoped SAME means pointwise equality over every valid S.

This scope can equate syntactically different trajectories such as:

~~~text
[e,e]
and
[e]
~~~

using G-IA031.

It does not identify the sequence objects globally.

## Q-G-OUTCOME-COST — completed optimization observable

For a completed trajectory T from the frozen initial state, define the exact observable pair:

~~~text
(final extensional state, LENGTH(T)).
~~~

Exact equality of the pair is scoped SAME under Q-G-OUTCOME-COST.

This is deliberately coarser than Q-G-SEQUENCE-TRANSFORMER and is not used to justify prefix replacement unless continuation congruence is separately established.

## Global raw-object identity boundaries

The following global natural-identity questions remain INCOMPLETE unless an independent identity theory is supplied:

- two raw residue/site identities;
- two raw operator identities;
- two distinct trace objects;
- two distinct trajectory-list objects;
- two raw relation-object identities P or M.

Neither same scoped behavior nor different SI handle is promoted here to a stronger global natural-identity conclusion.

## QU / UNKNOWN boundary

No Q-G scope above needs semantic QU for the frozen 0.1 model because the relevant relation extensions and transformation semantics are exact and closed for the query.

If a future version introduces uncertain susceptibility, kinetic outcomes, incomplete digestion, or unresolved state-dependent context, the affected identity query must carry qualified QU realization-family structure.

Missing such authority means INCOMPLETE.

It must not be relabeled semantic UNKNOWN merely because a calculation was not performed.
