# Glycan cleavage NEI semantic scope contract 0.5

**Status:** successor scope contract after DP-fed A13
**Date:** 2026-09-27
**Supersedes for current campaign routing:** GLYCAN_NEI_SCOPE_CONTRACT_0_4.md while retaining all earlier scopes
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1

Version 0.5 adds exact resistance-frontier and fixed-word rejection scopes.

## Q-G-RESISTANCE-FRONTIER

For any valid active non-target filter A, identity object:

~~~text
MIN(A)
~~~

under the fixed descendant-before-ancestor poset.

A13 proves:

~~~text
A
=
upward_closure(MIN(A)).
~~~

Therefore exact resistance-frontier equality has the same classes as exact active-state equality.

This is a lossless antichain representation, not a coarser quotient.

## Q-G-FIXED-WORD-FAILURE

Fix one instance and one raw treatment word T.

Identity object:

~~~text
FAIL(T)
=
TRUE iff T does not reach TG.
~~~

Equivalent exact representations include:

- nonempty final active non-target state;
- nonempty final resistance frontier;
- existence of one treatment-spanning resistant chain;
- nonempty A13 Boolean relation product.

All represent the same Boolean value.

## Q-G-RESISTANT-CHAIN-FAMILY

For one fixed word T define:

~~~text
RC(T)
=
the exact set of all nondecreasing resistant chains
q_1 <= ... <= q_k
matching the word's treatment positions.
~~~

Scoped SAME means exact chain-family equality under the fixed raw carrier/order.

A nonempty RC(T) determines FAIL(T)=TRUE.

But equal failure Booleans do not imply equal resistant-chain families.

Thus Q-G-RESISTANT-CHAIN-FAMILY is strictly more informative than Q-G-FIXED-WORD-FAILURE in general.

## Positive/negative witness boundary

The A8 positive witness structure is:

~~~text
for every maximal path:
    at least one susceptibility-cover embedding.
~~~

The A13 negative witness structure is:

~~~text
there exists one treatment-spanning resistant chain.
~~~

These are complementary decision certificates, not identity candidates for one another.

A truth-value relation:

~~~text
ACCEPT(T)
IFF
NOT FAIL(T)
~~~

does not identify their witness families.

## QU boundary

All scopes are exact under frozen 0.1 P/M/TG and deterministic saturation.

No QU is introduced.

Future uncertain susceptibility requires QU in both positive coverage and resistant-chain families.
