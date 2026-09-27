# P versus NP primitive truth kernel 0.2 — carrier correction audit

**Status:** unqualified successor  
**Predecessor:** `P_VS_NP_PRIMITIVE_TRUTH_KERNEL_0_1.isg`

0.2 removes the separate state/symbol carrier and binds all finite transition data to the primitive universal raw-data carrier `7400`.

Its primitive support set is now:

- `PRIMITIVE_LOGIC_KERNEL_0_1.isg`;
- `PRIMITIVE_NATURAL_ARITHMETIC_0_3.isg`;
- `PRIMITIVE_DATA_CONSTRUCTORS_0_3.isg`;
- `PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_4.isg`.

The native truth formula still contains no high-level domain labels.

The remaining material issue is not a high-level semantic leaf inside the formula. It is qualification of the chosen finite-control tape model against the exact official P-vs-NP convention.
