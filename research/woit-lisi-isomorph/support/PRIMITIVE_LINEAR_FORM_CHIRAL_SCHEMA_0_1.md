# Primitive Linear / Form / Chiral Schema 0.1

**Status:** research-local reusable schema support; not qualified Core authority
**Native:** PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg

## Pinned dependencies

- Primitive Logic Kernel 0.1 native blob: 2630336da5c4117a15a43c1dc0847536b33ed083
- Primitive Data Constructors 0.5 native blob: c0479ac1de1a1c8ff5737221133601618b1a56cf
- Primitive Field / Vector Schema 0.1 native blob: f234db03e52a0141a6a9fea80af7badd76751d7f

## Local IDs

| ID | Gloss | Closure |
|---|---|---|
| 183001 | involutive scalar conjugation schema | CLOSED_SCHEMA |
| 183002 | linear map schema | CLOSED_SCHEMA |
| 183003 | bilinear scalar-valued form schema | CLOSED_SCHEMA |
| 183004 | Hermitian form schema | CLOSED_SCHEMA |
| 183005 | vector subspace schema | CLOSED_SCHEMA |
| 183006 | direct-sum chiral grading with linear chirality operator | CLOSED_SCHEMA |

## Conjugation

183001 requires a commutative field, a total unary scalar map, involution, additive and multiplicative preservation, and fixed zero/one.

This is only the algebraic conjugation interface. It does not assert that the map is the standard complex conjugation, nor any topology/continuity.

## Linear map

183002 requires source and target vector-space schemas, a total unary graph, preservation of vector addition, scalar multiplication, and zero.

## Bilinear form

183003 is linear in each argument and total into the scalar carrier.

It does not include symmetry, antisymmetry, nondegeneracy, or signature.

## Hermitian form

183004 uses the convention:
- conjugate-linear in the first argument;
- linear in the second;
- H(u,v) = conjugate(H(v,u)).

It does not include nondegeneracy or signature. Those remain separate source obligations.

## Subspace and chirality

183005 defines a subspace through zero membership and closure under addition, additive inverse, and scalar action.

183006 defines a genuine direct-sum grading rather than a disjoint set partition:
- V+ and V- are subspaces;
- their intersection is exactly the zero vector;
- every vector has a unique decomposition p+m;
- CHI is linear;
- CHI fixes V+ and negates V-.

This avoids the incorrect assertion that the two chiral subspaces are disjoint as sets.

## Current disposition

~~~text
M02 algebraic conjugation interface:
    PARTIAL / SCHEMA-CLOSED
M04 linear maps:
    ABSTRACT SCHEMA CLOSED
M05 bilinear/Hermitian form interface:
    PARTIAL / SCHEMA-CLOSED
M11 chiral direct-sum interface:
    ABSTRACT SCHEMA CLOSED

topology, signature, nondegeneracy, standard R/C identity,
source instantiation, Lie/Clifford semantics:
    OPEN
~~~

No Woit or Lisi source claim is closed merely by this support file.
