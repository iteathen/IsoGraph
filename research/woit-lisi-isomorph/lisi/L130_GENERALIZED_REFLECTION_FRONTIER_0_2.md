# L-SSC-130 Generalized-Reflection Frontier 0.2

**Status:** PARTIAL NATIVE SUPPORT / WHOLE ITEM OPEN  
**Current target:** `LISI_FULL_RENDERING_0_2`  
**Predecessor:** `L130_GENERALIZED_REFLECTION_FRONTIER_0_1.*`

## Spacelike branch

The authoritative `s_u=+1` branch remains:

`LISI_L05_SPACELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_2.isg`.

It contains the three typed odd-reflection formulas, involution, typed cubic anti-invariance, and invariant even compositions. The ordinary-O source inconsistency remains preserved.

## Time-like branch

The `s_u=-1` branch is now native for C', H', and O':

- corrected complexified role carriers: `LISI_L05_COMPLEXIFIED_ROLE_CARRIERS_0_2.isg`;
- typed maps: `LISI_L05_TIMELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.isg`;
- scalar-extended anti-invariance: `LISI_L05_TIMELIKE_REFLECTION_ANTIINVARIANCE_0_1.isg`.

The represented phase is exactly the source imaginary unit:

~~~text
sqrt(-1) = i
i*i = embed(-1).
~~~

Finite controls over every negative-norm basis direction and every basis triple give:

~~~text
C':   8 cases/reflection,    0 real-core cubic failures
H': 128 cases/reflection,    0 real-core cubic failures
O': 2048 cases/reflection,   0 real-core cubic failures
~~~

Each time-like odd reflection has two explicit `i`-scaled outputs, so the preserved real coefficient core acquires the required minus sign.

## Remaining boundary

The complete frozen census item is still open.

The remaining load-bearing structure is:

1. extend the reflection maps from the embedded real roles to arbitrary elements of the complexified role carriers;
2. represent arbitrary even compositions involving time-like reflections on that complex domain;
3. separately determine whether L05's later alternate anti-linear real-structure statement is required for this census item or belongs only to the later real-form/automorphism obligations.

No real-form identification will be inferred merely because a map has complex coefficients.

DP remains blocked.
