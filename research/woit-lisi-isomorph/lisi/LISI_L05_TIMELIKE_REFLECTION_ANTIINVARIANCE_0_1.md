# L05 Time-Like Reflection Triality Anti-Invariance 0.1

**Status:** SOURCE-LOCAL SCALAR-EXTENDED ANTI-INVARIANCE / PRE-QUALIFICATION  
**Native:** `LISI_L05_TIMELIKE_REFLECTION_ANTIINVARIANCE_0_1.isg`  
**Depends on:** corrected 228xxx complexified roles and 229xxx time-like reflection maps

## Scalar-extended triality

For C', H', and O', the real L129 typed cubic is extended to the corresponding complexified role carriers by generic schema `225000`.

The new complex-valued cubic relations are:

~~~text
C' : 230100
H' : 230300
O' : 230500
~~~

They agree exactly with the embedded real cubic and are trilinear over the represented complex field.

## Odd reflection anti-invariance

For each split family and each reflection direction, the source statement is rendered as:

~~~text
T_C(R_u(v,psi,chi))
    =
- T_C(v,psi,chi)
~~~

where the original real triple is first embedded in the complexified role carriers.

The direction must have represented norm `-1`.

The three assertion predicates per family are:

~~~text
C' : 230110 / 230111 / 230112
H' : 230310 / 230311 / 230312
O' : 230510 / 230511 / 230512
~~~

for vector-, negative-spinor-, and positive-spinor-directed generalized reflections.

## Finite control

The coefficient core of every time-like reflection was tested over all negative-norm basis directions and all basis triples:

~~~text
C' :   8 cases per reflection type,   0 failures
H' : 128 cases per reflection type,   0 failures
O' : 2048 cases per reflection type,  0 failures
~~~

Each time-like reflection has two explicit `i`-scaled outputs. Since `i^2=-1`, preservation of the real coefficient cubic by the core formulas gives the required complex anti-invariance.

## Remaining L-SSC-130 boundary

The explicit time-like formulas and odd anti-invariance are now represented.

Whole-item closure still requires a source-faithful representation of:

- arbitrary even compositions involving time-like reflections as transformations on the complexified domain;
- the alternate anti-linear real structure under which the source later treats the complex-coefficient transformations as real automorphisms.

No Woit or synthesis semantics are used.
