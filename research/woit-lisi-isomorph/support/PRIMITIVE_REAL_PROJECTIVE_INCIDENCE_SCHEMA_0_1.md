# Primitive Real-Structure / Projective / Incidence Schema 0.1

**Status:** research-local reusable schema support; not qualified Core authority
**Native:** PRIMITIVE_REAL_PROJECTIVE_INCIDENCE_SCHEMA_0_1.isg

## Local IDs

| ID | Gloss | Closure |
|---|---|---|
| 186001 | vector antilinear involution over scalar conjugation | CLOSED_SCHEMA |
| 186002 | fixed-point real-form carrier of 186001 | CLOSED_SCHEMA |
| 186003 | nonzero-vector subcarrier | CLOSED_SCHEMA |
| 186004 | projective quotient by nonzero scalar rescaling | CLOSED_SCHEMA |
| 186005 | family of represented linear subspaces | CLOSED_SCHEMA |
| 186006 | incidence of projective points with represented subspaces | CLOSED_SCHEMA |

## Real structure

186001 requires an algebraic scalar conjugation, vector-space structure, an additive conjugate-linear total map J, and J²=id.

186002 defines the fixed carrier exactly by J(v)=v.

This closes only the algebraic fixed-point interface. It does not establish any source carrier as the usual real form, nor a signature, topology, or analytic continuation.

## Projective quotient

186003 defines nonzero vectors exactly.

186004 defines projective equivalence by nonzero scalar rescaling, a quotient-point carrier, a total class map, the equality/equivalence correspondence, and representative surjectivity.

Dimension is not imported.

## Subspace incidence

186005 treats subspace objects themselves as relation objects satisfying the previously closed subspace schema.

186006 defines a projective point as incident with a subspace exactly when it has a nonzero representative lying in that subspace.

This is sufficient for a future twistor-incidence instantiation, but it does not claim:
- ambient complex dimension four;
- subspace dimension two;
- projective space CP3;
- line CP1;
- any Woit source identification.

Those require explicit dimension/basis schemas and source mapping.

## Current disposition

~~~text
M12 projective quotient:
    ABSTRACT SCHEMA CLOSED

M13 incidence skeleton:
    PARTIAL / SCHEMA-CLOSED
    dimension-specific Grassmannian/twistor semantics OPEN

M14 algebraic real structure:
    PARTIAL / SCHEMA-CLOSED
    named real forms, Hermitian signature and orbit structure OPEN
~~~
