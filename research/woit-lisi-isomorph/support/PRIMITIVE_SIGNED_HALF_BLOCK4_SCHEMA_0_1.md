# Primitive Four-Basis Signed-Half Block / Signature Schemas 0.1

**Status:** RESEARCH-LOCAL FINITE MATRIX SUPPORT  
**Native:** `PRIMITIVE_SIGNED_HALF_BLOCK4_SCHEMA_0_1.isg`

## 239001

239001 expands a four-by-four signed-half orthogonal block into primitive scalar incidence:

- the sixteen coefficients are all exactly plus or minus one-half;
- one-half is constructed from field addition and inversion;
- the scalar dot product of distinct rows is zero;
- every row has scalar norm one.

No matrix or Hadamard name is left as a semantic leaf, and no particular sign pattern is selected.

## 239002

239002 expands the allowed four-member signature condition. Relative to supplied `ss`, `tt`, and `st` type atoms, the four labels must have either:

- exactly two `ss` and two `tt`, in any order; or
- four `st`.

No Spin, Cartan, triality, or source-specific semantics are built in.
