# L-SSC-126 Chiral Clifford Coefficient Source Overlay 0.1

**Status:** SOURCE-FAITHFUL NATIVE COEFFICIENT RENDERING / SOURCE DISCREPANCY PRESERVED  
**Frozen census:** `L-SSC-126`  
**Native:** `LISI_L05_CHIRAL_CLIFFORD_COEFFICIENT_SOURCE_OVERLAY_0_1.isg`  
**Falsifier:** `L126_CHIRAL_CLIFFORD_SOURCE_FALSIFIER_0_1.json`

## Source construction

L05 defines the chiral Clifford coefficient matrices directly from the division/split-composition multiplication coefficients:

~~~text
Gamma_c^b_a = M_ca^(tilde b)
barGamma_c = n_cc Gamma_c^T
~~~

and asserts both the Clifford identity and the cyclic coefficient identity.

The native overlay materializes the exact finite coefficient tensor for all six source carriers:

~~~text
C, C', H, H', O, O'
~~~

using the frozen source multiplication tables and source metric signs.

Two coefficient relations are kept distinct:

- 217001 — raw `Gamma_c^b_a` sign;
- 217002 — output-index-lowered coefficient `M_ca(tilde b)`, including the source metric sign.

The source assertions of cyclicity and Clifford closure are preserved as source assertion markers 217003 and 217004. Their truth status is checked separately.

## Falsifier result

~~~text
C:   cyclic 0, Clifford 0
C':  cyclic 0, Clifford 0
H:   cyclic 0, Clifford 0
H':  cyclic 0, Clifford 0
O':  cyclic 0, Clifford 0

O:
    cyclic coefficient failures  2
    Clifford identity failures  28
~~~

The ordinary-O failures are downstream consequences of the already-preserved version-of-record multiplication-table discrepancy. They are not silently repaired.

## Core-0.21 boundary

This artifact closes the finite **coefficient construction** as exact extensional incidence.

It does not yet promote all of `L-SSC-126` to `CLOSED_SCHEMA`: the quantified source assertions corresponding to equations (3) and (4) still require a primitive formula/reconstruction packet. That packet must retain the ordinary-O inconsistency as an evidence disposition rather than changing source bytes.

No Woit or synthesis semantics are used.
