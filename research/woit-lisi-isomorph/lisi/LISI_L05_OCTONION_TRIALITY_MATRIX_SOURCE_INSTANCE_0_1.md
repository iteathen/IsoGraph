# L05 so(8) / so(4,4) Triality-Matrix Source Instance 0.1

**Status:** SOURCE-LOCAL COMPLETE FINITE MATERIALIZATION / PRE-QUALIFICATION  
**Frozen target:** `L-SSC-136`  
**Native:** `LISI_L05_OCTONION_TRIALITY_MATRIX_SOURCE_INSTANCE_0_1.isg`

## 28 bivector basis

The source so(8) and so(4,4) carriers are the already-closed metric-skew endomorphism Lie carriers `237400` and `237500`.

This file introduces 28 explicit source bivectors in each carrier, indexed by the 28 pairs `a<b`. Their action on the eight source coefficient basis vectors is materialized from the source bivector bracket:

~~~text
[gamma_ab, gamma_c]
    = 2(-n_bc gamma_a + n_ac gamma_b).
~~~

Each 28-element family instantiates exact basis schema `225001`.

## Triality coefficients

The two complete 28×28 coefficient relations are materialized from the source formula

~~~text
t_ab^(cd) = (sign / 2) (barGamma^c Gamma^d)_ab.
~~~

For the split carrier the implementation retains both required metric effects:

- the lower input spinor index contributes `n_aa`;
- the raised output Clifford index contributes `n_dd`.

The scalar coefficient relation therefore contains exactly `0`, `+1/2`, or `-1/2`.

## Seven four-dimensional blocks

Support connectivity of the exact source coefficient relation produces seven disjoint four-bivector sets in each 28-dimensional carrier.

Each set:

- is materialized as a block-incidence relation;
- is asserted pairwise commuting in the source Lie bracket;
- instantiates neutral signed-half orthogonal-block schema `239001`.

For split O', each block also instantiates `239002`. The three compact-Cartan blocks have two `ss` and two `tt` bivectors; the remaining four blocks contain four `st` bivectors.

## Source discrepancy

The exact version-of-record ordinary-O multiplication table propagates into this construction.

The table-derived O matrix still has four nonzero signed-half entries per row and a seven-block support partition, but it fails the source rotation/Hadamard assertions. Those failures are retained as `INCONSISTENT_SOURCE`.

The split-O' controls are clean, including orthogonality and order three.

No table repair is used.

## Sign variants

The neutral block schema fixes only signed-half orthogonality, not one hard-coded sign pattern. The exact canonical source-derived pattern is materialized separately. This preserves the source statement that block signs can vary with multiplication-table convention or noncanonical triality choice without promoting any one alternate pattern.

No Woit or synthesis semantics are used.
