# Glycan cleavage NEI pass 13 — resistance-frontier and failure-certificate identity 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0-A13 + A8 correction + NEI passes 1-12 + NEI scope contract 0.5
**Authority:** qualified NEI 0.4 + QU 0.1

## G-N103 — resistance-frontier SAME iff active-state SAME

A13 proves every valid active non-target filter A is reconstructed exactly from MIN(A).

Therefore:

~~~text
Q-G-RESISTANCE-FRONTIER SAME
IFF
Q-G-STATE SAME
~~~

under the corresponding non-target active-state view.

The antichain is an exact alternate representation, not a coarser quotient.

## G-N104 — fixed-word failure has four exact representations

For one fixed word T, the following Boolean values are equivalent:

~~~text
final non-target active state is nonempty

final resistance frontier is nonempty

a treatment-spanning resistant chain exists

A13 relation product is nonempty.
~~~

Therefore they are Q-G-FIXED-WORD-FAILURE SAME.

## G-N105 — fixed-word acceptance and failure are exact Boolean complements, not SAME

The earlier Q-G-FIXED-WORD-ACCEPTANCE value and Q-G-FIXED-WORD-FAILURE satisfy:

~~~text
ACCEPT(T)
IFF
NOT FAIL(T).
~~~

Unless the Boolean values happen to coincide under some separately changed encoding, complementarity is not identity.

The two scopes remain distinct observables.

## G-N106 — resistant-chain-family SAME is stronger than failure SAME

If:

~~~text
RC(T1)=RC(T2),
~~~

then the two words have the same failure Boolean because nonemptiness agrees.

But:

~~~text
FAIL(T1)=FAIL(T2)
~~~

does not imply equal resistant-chain families.

Many distinct nonempty witness families map to TRUE, and every empty family maps to FALSE.

Thus Q-G-RESISTANT-CHAIN-FAMILY refines Q-G-FIXED-WORD-FAILURE.

## G-N107 — positive coverage witnesses and negative resistant chains are not one identity scope

A8 positive coverage and A13 negative resistance are exact dual decision interfaces.

Their quantifier structure differs:

~~~text
positive:
    every maximal path has a covering embedding

negative:
    there exists one spanning resistant chain.
~~~

No exact bijection of witness families has been established or required.

Therefore no SAME result is asserted between the witness objects themselves.

## G-N108 — no raw-object identity, semantic UNKNOWN, or QU refinement is added

All pass-13 scopes are exact deterministic values.

Raw nodes, raw operators, raw paths, and raw witness records remain separately represented.

Result:

~~~text
new raw global identity result: 0
new semantic UNKNOWN:           0
new QU refinement:              0
~~~

## Pass-13 NEI disposition

~~~text
new exact scoped identity laws: 4
new witness-boundary laws:      2
raw-object global identity:     0
semantic UNKNOWN results:       0
QU refinements:                 0
~~~

Qualified DP may now inspect residual structure between the positive path-cover and negative resistant-chain representations.
