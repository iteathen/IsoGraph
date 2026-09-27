# Glycan cleavage NEI pass 4 — raw/quotient identity audit 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** verified raw primitive graph + A1/A2/A3/A4 + NEI passes 1-3
**Authority:** qualified NEI 0.4 + QU 0.1

This pass asks only whether the raw represented problem and the derived SIG quotient have exact identity under the treatment-trajectory scopes actually proved in A4.

## Q-G-INSTANCE-SOLUTION-LANGUAGE

Fix one concrete well-formed instance and its exact SIG quotient Q.

Identity object:

~~~text
the exact set of raw treatment-operator sequences
that reach the declared target.
~~~

G-IA096 proves equality of those values.

## Q-G-INSTANCE-OPTIMUM-FAMILY

Identity object:

~~~text
the exact set of raw minimum-length solving
treatment-operator sequences.
~~~

G-IA097/G-IA098 prove equality of those values.

## Q-G-TYPE-STATE

Fix the source occurrence-to-SIG-type map.

For a reachable raw state S define its type-active representation:

~~~text
A(S)
=
{ q |
  raw occurrences of type q are present in S }.
~~~

By G-IA089/G-IA094, every occurrence of one type is synchronized.

With the fixed occurrence-to-type map, A(S) reconstructs reachable S exactly:

~~~text
r in S
IFF
SIG(r) in A(S).
~~~

The identity object is therefore the same reachable state value expressed across two representations.

---

## G-N037 — raw instance and SIG quotient are solution-language SAME

Under Q-G-INSTANCE-SOLUTION-LANGUAGE:

~~~text
raw problem instance
and
derived SIG quotient

are scoped SAME.
~~~

Support: exact language equality G-IA096.

This is cross-representation value identity.

It is not global structural identity of the two artifacts.

## G-N038 — raw instance and SIG quotient are optimum-family SAME

Under Q-G-INSTANCE-OPTIMUM-FAMILY:

~~~text
raw problem instance
and
derived SIG quotient

are scoped SAME.
~~~

Support: G-IA097/G-IA098.

Every raw minimum treatment sequence is retained with the same raw operator identities and order.

## G-N039 — reachable raw state and active-type state are exact representation-equivalent values

Under Q-G-TYPE-STATE and the fixed occurrence/type correspondence:

~~~text
raw reachable state S
<->
active SIG-type set A(S)
~~~

is lossless.

Therefore the paired representations are scoped SAME as representations of the current reachable state value.

This theorem does not identify raw node occurrences with SIG-type nodes.

## G-N040 — quotient structural artifact is not globally SAME to the raw source structure

The raw tree retains:

- occurrence identity;
- duplicate multiplicity;
- raw parent incidences;
- microscopic trace possibilities.

The quotient intentionally collapses some of those distinctions.

Therefore treatment-language SAME and reachable-state representation equivalence do not imply global natural identity of the artifacts.

Any global artifact-identity query remains separate/incomplete unless supplied its own authority.

## G-N041 — no additional SIG-class merges follow generically

NEI pass 3 permits Q-G-RESP to be coarser than Q-G-SIG.

A4 supplies no exact theorem that two unequal SIG values must have equal RESP values for every instance.

Therefore no additional generic SIG-class merge is admitted.

Concrete instances may establish such merges with exact evidence later.

## G-N042 — no new operator identity follows from the structural quotient

The SIG quotient preserves the raw operator alphabet.

It does not turn objective-dominating, commuting, or phase-transformer-equivalent operator objects into global natural coidentity.

All previous operator identity boundaries remain in force.

## G-N043 — no semantic UNKNOWN is introduced

Every result in this pass follows from exact cross-representation equality.

No unresolved identity-relevant structure exists inside the frozen 0.1 scopes.

Missing stronger global identity authority remains INCOMPLETE, not UNKNOWN.

## Pass-4 NEI disposition

~~~text
new cross-representation scoped SAME laws: 3
new global raw-identity results:             0
new generic SIG merges:                      0
semantic UNKNOWN results:                    0
QU refinements:                              0
~~~

No new identity relation in this pass changes the mathematical closure already represented by A4.

The next required step is a complete implicit re-pass over the selected campaign scope to test for a no-new-assertion operational fixed point.
