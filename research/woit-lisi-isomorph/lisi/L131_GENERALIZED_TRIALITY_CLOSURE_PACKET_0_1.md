# L-SSC-131 Generalized Triality Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION  
**Source:** L05 §3 equation (9)  
**Frozen census:** `L-SSC-131`

The frozen statement is reduced into two independent structures.

First, the exact source equation-(9) transformation is represented for all six ordinary/split coefficient families, including the `sqrt(s_u s_w)` phase, triality invariance, and the canonical `u=w=1` cycle.

Second, the reflection-type classification is reduced to finite role permutations:

~~~text
same reflection type:
    even composition is T-invariant
    role permutation is identity

different reflection types:
    even composition is T-invariant
    role permutation is a nontrivial order-three cycle
~~~

Thus "rotation" and "non-rotation triality element" are derived structural labels rather than opaque leaves.

Dependency audit:

~~~text
new root files:                 2
new declared local IDs:        39
prior CLOSED_SCHEMA bodies:     4
stale namespace references:     0
unresolved references:          0
~~~

Equation-(9) finite controls are clean for C, C', H, H', and O'. The exact ordinary-O source table produces 500 invariance failures while the canonical cycle remains clean. That evidence is preserved as `INCONSISTENT_SOURCE_PROPAGATED`; no repair enters Track L.

No Woit or synthesis semantics occur in this packet.
