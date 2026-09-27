# Glycan cleavage NEI semantic scope contract 0.3

**Status:** successor scope contract for NEI pass 3
**Date:** 2026-09-27
**Supersedes for this campaign:** GLYCAN_NEI_SCOPE_CONTRACT_0_2.md
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1
**Inputs:** verified primitive graph + A1/A2/A3

All prior scopes remain valid. Version 0.3 adds exact recursive subtree-value scopes exposed by A3.

## Q-G-SIG — recursive treatment-structure signature value

For represented node r, SIG(r) is the exact derived triple from G-IA073:

~~~text
(
    target flag,
    exact susceptibility vector over EL,
    exact SET of direct-child SIG values
)
~~~

The identity object is this recursive value itself.

Scoped SAME means exact equality of the full recursively grounded value.

Because SIG is finite and well-founded, equality can be supported bottom-up without global raw-node identity.

## Q-G-RESP — complete subtree treatment-response value

For represented node r define RESP(r) from G-IA082:

~~~text
for every finite treatment sequence T:
    (
        root-present after T,
        local-subtree-complete after T
    )
~~~

The identity object is the entire exact response function.

Scoped SAME means pointwise equality for every finite raw treatment sequence.

G-IA082 supplies:

~~~text
Q-G-SIG SAME
->
Q-G-RESP SAME.
~~~

The converse is not assumed.

## Q-G-SUBTREE-SOLVE — local subtree solving language

For represented node r:

~~~text
L_sub(r)
=
{ T | subtree r is locally complete after T }.
~~~

Scoped SAME is exact set equality.

Q-G-RESP SAME implies Q-G-SUBTREE-SOLVE SAME.

The converse is not assumed because two subtrees may have the same completion language while exposing their roots differently during prefixes.

## Q-G-CHILD-CLASS-PRESENCE — parent-facing multiplicity value

Fix one parent and one exact Q-G-RESP child class C.

Define:

~~~text
present_class(C)
=
TRUE iff at least one direct child occurrence belongs to C.
~~~

The identity object is this Boolean value, not the raw child collection.

Any positive multiplicity:

~~~text
1,2,3,...
~~~

maps to the same TRUE value under this parent-facing scope.

Zero maps to FALSE.

This is the exact identity scope behind the multiplicity-collapse theorem.

## Q-G-CHILD-BEHAVIOR-SET — parent-facing set of child response classes

For parent p define:

~~~text
CHILDSET(p)
=
{ Q-G-RESP class of c |
  P(c,p) }.
~~~

This is a set, not a multiset.

Exact equality of CHILDSET values is scoped SAME.

When two parent roots also have equal target flags and susceptibility vectors, equality of recursively corresponding child SIG/response sets can support equal higher-level treatment behavior.

## Global identity boundary

Q-G-SIG SAME, Q-G-RESP SAME, Q-G-SUBTREE-SOLVE SAME, and Q-G-CHILD-CLASS-PRESENCE SAME do not identify raw node occurrences globally.

Multiple raw sibling branches may remain distinct represented objects while contributing one parent-facing behavior class.

No raw multiplicity fact is deleted from source provenance; the quotient simply proves that multiplicity above zero is irrelevant to the declared treatment-trajectory obligation.

## QU boundary

The 0.1 model remains exact/closed for these scopes.

If future susceptibility or transition behavior is uncertain, Q-G-RESP and all scopes derived from it require the applicable QU realization family.

Absent authority means INCOMPLETE, not semantic UNKNOWN.
