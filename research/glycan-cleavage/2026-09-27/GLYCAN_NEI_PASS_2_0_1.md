# Glycan cleavage NEI pass 2 — 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0 + A1 + NEI pass 1 + A2 + NEI scope contract 0.2
**Authority:** qualified NEI 0.4 + QU 0.1

## G-N013 — frontier identity adds no new state classes

Under Q-G-FRONTIER:

~~~text
SAME
IFF
Q-G-STATE SAME
IFF
Q-G-CONTINUATION SAME.
~~~

The frontier is therefore a lossless alternate representative of the existing exact state quotient.

## G-N014 — target-solving continuation identity can merge distinct states

Under Q-G-SOLVE-LANGUAGE:

~~~text
SAME(S1,S2)
IFF
L(S1)=L(S2).
~~~

This relation is generally coarser than Q-G-STATE.

Different current states may have the same exact set of treatment suffixes that reach TG.

No current-state identity is inferred.

## G-N015 — mutual solve dominance equals solve-language SAME

Because solve dominance is set inclusion:

~~~text
S1 dominates S2
AND
S2 dominates S1

IFF

L(S1)=L(S2).
~~~

Thus mutual dominance supplies an exact Q-G-SOLVE-LANGUAGE SAME theorem.

One-way dominance remains nonidentity.

## G-N016 — solve-language SAME implies minimum-remaining SAME

~~~text
Q-G-SOLVE-LANGUAGE SAME
->
Q-G-MIN-REMAIN SAME.
~~~

The implication follows because equal solving suffix sets have equal minimum sequence lengths, including the shared empty/INF cases.

## G-N017 — minimum-remaining SAME is strictly weaker in general

Equality of D(S) alone does not establish equality of L(S).

Therefore:

~~~text
Q-G-MIN-REMAIN SAME
-/-> Q-G-SOLVE-LANGUAGE SAME.
~~~

This prevents an objective-value quotient from being reused as a complete continuation quotient.

## G-N018 — same state plus same accumulated cost is exact search-node SAME

Under Q-G-PREFIX-SEARCH-NODE, two prefix histories with:

~~~text
Q-G-STATE SAME
AND
equal prefix length
~~~

are scoped SAME search nodes.

Different raw prefix sequences remain distinct histories.

## G-N019 — local action-value SAME is objective-only

At fixed S:

~~~text
D(C_e1(S)) = D(C_e2(S))
~~~

gives Q-G-LOCAL-ACTION-VALUE SAME.

This says the two one-treatment choices have equal optimum value from that state.

It does not prove:

- equal next state;
- equal solving suffix language;
- equal phase transformer;
- global raw operator identity.

## G-N020 — rooted labeled subtree isomorphism gives exact structural SAME

Any exact root-preserving bijection satisfying the Q-G-ROOTED-SUBTREE-STRUCTURE contract gives scoped SAME of the rooted structural values.

Different raw node SIs do not block this scoped result.

They are still separate represented referents globally.

## G-N021 — rooted structural SAME implies rooted all-treatment behavior SAME

The primitive transition law is invariant under a bijection preserving:

~~~text
P
TG membership
M incidence
root correspondence.
~~~

Therefore exact Q-G-ROOTED-SUBTREE-STRUCTURE SAME implies Q-G-ROOTED-SUBTREE-BEHAVIOR SAME.

The proof is induction over treatment prefixes and same-operator microscopic closure.

## G-N022 — behavior SAME may be coarser than structural SAME

Two structurally different rooted subtrees may still respond identically to every treatment sequence because some represented distinctions can be behaviorally masked.

Therefore:

~~~text
Q-G-ROOTED-SUBTREE-BEHAVIOR SAME
-/-> Q-G-ROOTED-SUBTREE-STRUCTURE SAME.
~~~

The behavior quotient is the relevant coarser search scope.

## G-N023 — duplicate raw sibling subtrees can be globally distinct while behavior-SAME

Two sibling subtrees with separate raw identities can be Q-G-ROOTED-SUBTREE-BEHAVIOR SAME.

This is compatible with global raw-subtree identity remaining INCOMPLETE or DISTINCT under a separately supplied stronger identity theory.

Scoped behavioral sameness is all that the trajectory problem needs.

## G-N024 — mutual phase dominance equals phase-transformer SAME

If:

~~~text
forall valid S:
    C_e1(S) subset C_e2(S)
AND
    C_e2(S) subset C_e1(S)
~~~

then the phase outputs are extensionally equal for every valid state.

Thus mutual phase dominance is exactly Q-G-PHASE-TRANSFORMER SAME.

One-way phase dominance remains an ordinary preorder.

## G-N025 — no new global natural-identity result is licensed

Pass 2 does not establish global natural coidentity of raw sites, operators, traces, or trajectories.

All such stronger queries remain controlled by their own missing/independent identity authority.

## G-N026 — no semantic UNKNOWN is created in pass 2

Every admitted new scope has exact value equality/separation semantics over the frozen deterministic model.

Computation difficulty does not become semantic UNKNOWN.

Missing stronger identity authority remains INCOMPLETE.

## Pass-2 NEI result

~~~text
new exact scoped identity laws:  12
new coarser objective scopes:     3
new rooted-subtree scopes:        2
new preorder/identity boundaries: 3
semantic UNKNOWN results:         0
QU refinements:                   0
~~~

The rooted-subtree behavior identity exposed here is the main new input to implicit pass 3.
