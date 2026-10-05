# L05 Chiral Clifford Coefficient Source Overlay 0.2

**Status:** SOURCE-FAITHFUL FINITE COEFFICIENT RENDERING / SOURCE DISCREPANCY PRESERVED  
**Predecessor:** `LISI_L05_CHIRAL_CLIFFORD_COEFFICIENT_SOURCE_OVERLAY_0_1.isg`

Revision 0.2 adds the source's signature-adjusted transpose explicitly.

Native relation:

~~~text
217005(carrier,c,a,b,sign)
~~~

represents the coefficient:

~~~text
(barGamma_c)^a_b = n_cc (Gamma_c)^b_a.
~~~

The existing relations remain:

- 217001: `(Gamma_c)^b_a = M_ca^(tilde b)`;
- 217002: output-index-lowered coefficient `M_ca(tilde b)`.

All entries are finite exact extensional incidence derived from the frozen source multiplication tables and metric signs.

The ordinary-O table remains unchanged and inconsistent with the simultaneously represented cyclic/Clifford source assertions.
