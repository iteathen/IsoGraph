# Primitive Parameterized Scalar-Extension Map Schema 0.1

**Status:** RESEARCH-LOCAL GENERIC SUPPORT  
**Native:** `PRIMITIVE_PARAMETERIZED_SCALAR_EXTENSION_MAP_SCHEMA_0_1.isg`

## 231000

231000 represents a parameterized real-linear map and its complex-linear extension.

Inputs:

- a field embedding `R -> C`;
- a parameter carrier with no scalar structure assumed;
- a real vector space `V_R`;
- a represented scalar extension `V_C` with real injection `J:V_R->V_C`;
- a complex target vector space `W_C`, also viewed by restriction of scalars as an R-vector space;
- a source map `F(parameter, v_R) -> w_C`;
- an extended map `F_C(parameter, v_C) -> w_C`.

The schema requires:

1. `F` is additive and R-linear in its vector input;
2. `F_C` is additive and C-linear in its vector input;
3. both maps are total/function-valued on the represented carriers;
4. on every embedded real vector, `F_C` agrees exactly with `F`.

The parameter itself is not scalar-extended.

## Intended use

When `V_C` is separately known to be an exact finite scalar extension of `V_R`, C-linearity plus exact agreement on the embedded real basis fixes the extension over the whole represented complex carrier.

This is the missing generic support for L05 time-like generalized reflections: the reflection direction stays a real source unit, while the reflected role input may already be complexified by a preceding reflection.

## Non-coverage

231000 does not assert:

- which parameter values are admissible;
- that the source/target carriers are the same role;
- invertibility or involutivity;
- preservation or anti-preservation of a trilinear form;
- a real-form condition;
- an anti-linear involution.

Those remain source-specific obligations.
