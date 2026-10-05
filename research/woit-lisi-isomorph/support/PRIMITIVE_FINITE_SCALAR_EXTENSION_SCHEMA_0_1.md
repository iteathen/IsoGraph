# Primitive Finite-Dimensional Scalar Extension Schema 0.1

**Status:** RESEARCH-LOCAL GENERIC SUPPORT  
**Native:** `PRIMITIVE_FINITE_SCALAR_EXTENSION_SCHEMA_0_1.isg`

This schema represents the exact finite-dimensional scalar extension needed when a source real vector carrier is embedded into a vector space over an explicitly represented larger field.

Variants:

- `222000` — 2-element basis;
- `222001` — 4-element basis;
- `222002` — 8-element basis.

Each variant requires:

1. an exact field embedding `R -> C` through schema `193302`;
2. an exact 2/4/8-element basis for the source `R`-vector space;
3. an exact basis of the same size for the target `C`-vector space;
4. restriction of target scalars along the field embedding through `193303`;
5. an injective `R`-linear map from the source carrier to the restricted target carrier through `193400`;
6. basis-by-basis identification under that injection.

Because the target basis spans over `C`, this is an exact finite presentation of scalar extension for the represented source basis.

The schema does not assume a complex field in particular. It does not add algebra multiplication, conjugation, chirality, a real-form condition, or a physical interpretation.

For L05 generalized reflections, the intended instance is the already-rendered Lisi real field embedded in the Lisi-local algebraic complex field with its source imaginary unit.
