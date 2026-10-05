# L05 Octonionic so(8) Source Assertion 0.1

**Status:** SOURCE-LOCAL STRUCTURAL ASSERTION / INCONSISTENT-SOURCE EVIDENCE PRESERVED  
**Native:** `LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_1.isg`  
**Target:** `L-SSC-127`

L05 states that the 28 octonionic bi-product operators span `so(8)`.

This artifact does not use the name `so(8)` as a semantic leaf.

It instantiates schema 227000 on:

- the source O quadratic carrier;
- the exact 28D bi-product operator carrier 226000;
- the source-local action 226005;
- a bracket relation 226006.

Schema 227000 means extensionally:

1. operator actions are linear and metric-skew;
2. the representation is faithful;
3. every metric-skew linear endomorphism is represented;
4. the bracket is exactly the endomorphism commutator.

That is the structural content of the source's `B8 = so(8)` statement.

## Source inconsistency

The exact version-of-record ordinary-O multiplication table is already known to conflict with other L05 composition identities.

When the exact table is propagated through the bi-product construction, deterministic controls find:

~~~text
28 bi-product span rank: 28
metric-skew failures:     14
commutators outside span: 336
~~~

Therefore the source's operator-space assertion is representable, but its exact frozen table is inconsistent with it.

No source repair is used.
