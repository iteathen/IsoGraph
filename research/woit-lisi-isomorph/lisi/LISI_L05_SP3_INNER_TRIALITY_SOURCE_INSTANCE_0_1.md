# L05 Quaternionic 3×3 Inner-Triality Source Instance 0.1

**Status:** SOURCE-LOCAL MATRIX/TRIALITY RENDERING / PRE-QUALIFICATION  
**Frozen target:** `L-SSC-134`  
**Native:** `LISI_L05_SP3_INNER_TRIALITY_SOURCE_INSTANCE_0_1.isg`

## Quaternionic matrix realization

The three compact 3D factors already rendered inside `tri(H)` are linearly injected into the quaternion coefficient carrier by:

~~~text
242010 : M-factor -> Im(H)
242011 : P-factor -> Im(H)
242012 : V-factor -> Im(H)
~~~

with each source basis mapped to the exact quaternion basis `i,j,k`.

The three role carriers are the already-closed L128 H roles:

~~~text
V       = 218200
Qminus  = 218220
Qplus   = 218240
~~~

with coefficient maps 218260–218262.

Relation 242000 reconstructs the source matrix

~~~text
[[M,           -KAPPA(v),   psi],
 [v,            P,          -KAPPA(chi)],
 [-KAPPA(psi),  chi,         V]]
~~~

entry by entry over the represented quaternion carrier.

No named `sp(3)` object is used to define the matrix.

## Printed inner automorphism

The source prints

~~~text
g_t = [[0,0,1],
       [1,0,0],
       [0,1,0]]

A' = g_t A g_t^{-1}.
~~~

Relation 242020 defines this action only by the exact primitive entry permutation 243100.

The source matrix itself is recorded by 242091; 242092 links it to the finite conjugation schema.

## Textual generator cycle

Relation 242021 encodes the source's separately written generator-arrow direction:

~~~text
gamma -> Qminus -> Qplus -> gamma
T_M   -> T_V    -> T_P    -> T_M.
~~~

At coordinate level this is:

~~~text
(M,P,V,v,psi,chi)
  -> (P,V,M,chi,v,psi).
~~~

## Orientation discrepancy

Relation 242022 records that the printed-matrix action and the textual-arrow action are inverses.

This is the source-local orientation discrepancy established independently by `L134_INNER_TRIALITY_ORIENTATION_AUDIT_0_1.*`.

Both maps are order three. No source statement is silently rewritten.

## Root-phase guard

242090 is a source guard preserving L05's statement that a root-space rotation alone does not determine the phases of the corresponding root-vector maps.

The guard is not expanded into invented phase data.

## Boundary

This artifact renders the quaternionic 3×3 realization and canonical inner triality action. The full parent Lie bracket is owned by `L-SSC-133` and is not imported here.

No Woit or synthesis semantics are used.
