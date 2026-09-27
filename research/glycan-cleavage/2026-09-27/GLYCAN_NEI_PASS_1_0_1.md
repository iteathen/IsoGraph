# Glycan cleavage NEI pass 1 — 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** verified primitive graph + A0 + A1 + GLYCAN_NEI_SCOPE_CONTRACT_0_1.md
**Authority:** qualified NEI 0.4 + QU 0.1

## G-N001 — extensional state equality gives exact scoped SAME

Under Q-G-STATE:

~~~text
181003(S1,S2)
    -> SAME.
~~~

A represented membership witness in one state and not the other gives Q-G-STATE DISTINCT.

No raw list-object global identity is inferred.

## G-N002 — current-state equality is exactly future-continuation identity

Under Q-G-CONTINUATION:

~~~text
SAME(S1,S2)
IFF
181003(S1,S2).
~~~

Reason:

- same extensional state gives identical future behavior by G-IA030;
- empty suffix exposes the current state and separates unequal state values.

This licenses exact search-state merging at equal extensional states for the frozen instance.

## G-N003 — microscopic deletion order is irrelevant to phase-output identity

Fix e and S.

Every complete same-e trace is Q-G-PHASE-OUTPUT SAME because G-IA019 proves one unique extensional final state.

The traces themselves remain separate objects unless another global identity theory says otherwise.

## G-N004 — converged prefix histories are future-behavior SAME

If two treatment prefixes reach extensionally equal current states, they are Q-G-HISTORY SAME.

Different path/order/provenance does not prevent this scoped equality.

If the current states differ, the empty suffix makes the Q-G-HISTORY values DISTINCT.

## G-N005 — equal susceptibility vectors are scoped SAME

Under Q-G-SUSCEPTIBILITY:

~~~text
forall r in RL:
    M(e1,r) IFF M(e2,r)
~~~

forces SAME of the exact vector values.

One exact differing incidence forces DISTINCT of those vector values.

Raw operator identity remains unresolved globally.

## G-N006 — equal susceptibility implies equal phase-transformer value

G-N005 plus G-IA036 gives:

~~~text
Q-G-SUSCEPTIBILITY SAME
    ->
Q-G-PHASE-TRANSFORMER SAME.
~~~

This is a one-way theorem only.

## G-N007 — exact phase-transformer identity can be coarser than susceptibility identity

Q-G-PHASE-TRANSFORMER compares only exact behavior on valid states.

A difference in M that is permanently masked by target protection or structural blocking need not separate the transformer values.

Therefore:

~~~text
Q-G-PHASE-TRANSFORMER SAME
    -/-> Q-G-SUSCEPTIBILITY SAME.
~~~

This preserves the distinction between represented chemistry/incidence and the smaller behavioral quotient relevant to trajectory execution.

## G-N008 — adjacent duplicate sequences are sequence-transformer SAME

G-IA031 gives:

~~~text
[e,e]
and
[e]
~~~

Q-G-SEQUENCE-TRANSFORMER SAME.

They remain different finite list objects.

## G-N009 — exact state-transform-equivalent sequences are interchangeable only under the transformer scope

If an exact theorem establishes Q-G-SEQUENCE-TRANSFORMER SAME(T1,T2), then T1 and T2 have the same final extensional state from every valid current state.

This supports transformation-local substitution.

It does not establish raw sequence-object coidentity.

## G-N010 — global operator identity remains INCOMPLETE

Even if e1 and e2 are Q-G-SUSCEPTIBILITY SAME or Q-G-PHASE-TRANSFORMER SAME, the current graph supplies no complete natural-identity theory for raw operator objects.

Disposition:

~~~text
global raw-operator NEI:
    INCOMPLETE
not
    SAME
not
    UNKNOWN.
~~~

## G-N011 — global residue identity remains INCOMPLETE

Structural similarity or equal local susceptibility behavior does not yet provide one qualified global natural-identity model family for raw residue/site objects.

Disposition: INCOMPLETE unless a later scoped quotient explicitly asks identity of a derived subtree/behavior value.

## G-N012 — no semantic UNKNOWN is created in pass 1

All exact quotient scopes above have exact represented equality/separation criteria.

Global questions lacking authority are INCOMPLETE.

Therefore this pass creates no qualified semantic UNKNOWN state.

## Pass-1 NEI result

~~~text
new exact scoped identity laws:  9
explicit global-INCOMPLETE laws: 3
semantic UNKNOWN results:        0
probabilistic identity evidence: 0
QU refinements:                  0
~~~

The next step is implicit-assertion pass 2 using these scoped identity results.
