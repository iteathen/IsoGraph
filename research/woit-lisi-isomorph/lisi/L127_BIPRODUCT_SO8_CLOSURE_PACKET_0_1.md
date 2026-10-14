# L-SSC-127 Octonion Bi-Product / so(8) Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION  
**Source:** L05 §2  
**Frozen census:** `L-SSC-127`

The source body is reduced without leaving `octonion` or `so(8)` as opaque semantic labels.

## Associativity boundary

- C is represented as an associative unital algebra.
- H is represented by an exact quaternion presentation with associativity.
- O has an explicit source-table nonassociativity witness.

## Operator-space boundary

The source O bi-products are represented as an exact 28D vector space of operators:

~~~text
B_cd(x) = (x e_d) tilde(e_c),  c<d.
~~~

The seven ordinary imaginary right multiplications form a separate exact 7D carrier injected as `B_0i`.

An explicit source-local witness keeps a non-`B_0i` operator outside that injection image.

## Structural so(8)

The named Lie algebra is reconstructed by schema 227000:

~~~text
all and only metric-skew linear endomorphisms
+ faithful action
+ commutator bracket
~~~

rather than by the name or dimension alone.

## Source inconsistency

The exact version-of-record O table still spans 28 independent bi-product operators, but it produces:

~~~text
metric-skew failures:     14
commutators outside span: 336
~~~

These are downstream consequences of the preserved ordinary-O table defect.

Thus:

~~~text
representation closure:
    CANDIDATE CLOSED_SCHEMA

source consistency:
    INCONSISTENT_SOURCE

source repair:
    NONE
~~~

No Woit or synthesis semantics are used.
