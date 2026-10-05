# W02 Minkowski Hermitian Vector 0.1/0.2 correction

**Status:** PREDECESSORS REJECTED FOR CURRENT CLOSURE SUPPORT

Strict re-audit found that 0.2 still contained defects after its earlier e3 repair:

- complex scalar MUL/NEG handles were used with the wrong IDs;
- Pauli-matrix intermediate handles were indexed inconsistently with the matrix-unit schema;
- the determinant/metric relation used an incorrect scalar relation instead of explicit real-to-complex embedding followed by complex negation.

Revision 0.3 is rebuilt from the governing schemas and source equations rather than patched in place.

No currently qualified W frozen-census closure depended on W02 Minkowski-vector 0.2 at discovery time; restored W02 census obligations in SSC 0.2 remain incomplete pending 0.3-based closure packets.
