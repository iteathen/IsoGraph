# Lisi Complex-Scalar Native Interface Defect 0.1

**Status:** NATIVE INTERFACE DEFECT — CORRECTED BY SUCCESSOR  
**Predecessor:** `LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_1.isg`  
**Successor:** `LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg`

The predecessor's own field-schema instantiation assigns:

~~~text
198101 = addition
198102 = multiplication
198103 = negation
198104 = inversion
198105 = zero
198106 = one
~~~

but its four explicit scalar arithmetic facts were all emitted under relation `198103` with ternary arity.

That made the native interface inconsistent with its declared operation roles and left the distinguished source imaginary unit without a correctly routed `198102(i,i,-1)` fact.

The successor preserves the public operation IDs and replaces only the malformed arithmetic block with:

~~~text
i, -1, -i are members of the complex scalar carrier
i*i = -1                         through 198102
-(1) = -1                        through 198103
-(i) = -i                        through 198103
i^{-1} = -i                      through 198104
~~~

This is an IsoGraph rendering repair, not a change to L05.

## Closure consequence

`L-SSC-130` directly used the complex-scalar interface, and `L-SSC-131`, `132`, and `134` depend transitively on the resulting closed body chain.

Those bodies must be **revalidated against the successor native interface** before further real-form work such as L135 is promoted.

The old artifact remains preserved as defect evidence.
